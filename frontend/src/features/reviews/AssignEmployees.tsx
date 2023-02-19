import React, { useEffect } from 'react';
import 'react-phone-number-input/style.css';

import { Button, Dialog, DialogTitle } from '@/components/Elements';
import { Request } from '@/types';
import MultipleSelectCheckmarks from '@/components/Form/MultipleSelect';
import { useUsers } from '@/api/getUsers';
import { assignEmployees } from '@/api/getRequests';
import { useNotificationStore } from '@/stores/notifications';

const AssignEmployees = ({
  request,
  close,
  isOpen,
  onSuccess,
}: {
  request?: Request;
  close: () => void;
  onSuccess: () => void;
  isOpen: boolean;
}) => {
  const cancelButtonRef = React.useRef(null);
  const { data: allUsers } = useUsers();
  const data = allUsers?.filter((i) => i.id !== request?.employee?.id) ?? [];

  const [selectedEmp, setSelectedEmp] = React.useState<string[]>([]);
  const [empError, setEmpError] = React.useState<string>('');

  const handleChange = (entry: string[]) => {
    setEmpError('');
    setSelectedEmp(entry);
  };

  useEffect(() => {
    setSelectedEmp([]);
  }, [isOpen]);

  const handleSubmit = async () => {
    if (selectedEmp.length === 0) {
      setEmpError('Please select at least one employee!');
      return;
    }
    const employeeIds = data.filter((i) => selectedEmp.includes(i.employeeId)).map((i) => i.id);
    await assignEmployees(request?.id ?? '', employeeIds);
    useNotificationStore.getState().addNotification({
      type: 'success',
      title: 'Success',
      message: 'Employees assigned for feedback!',
    });
    onSuccess();
    close();
  };

  return (
    <div>
      <Dialog isOpen={isOpen} onClose={close} initialFocus={cancelButtonRef}>
        <div className="inline-block align-top bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="mt-1 mb-4 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <DialogTitle as="h3" className="text-lg leading-6 font-medium text-gray-900">
              Assign employees for feedback
            </DialogTitle>
          </div>
          <div className="border-t border-gray-200 px-4 sm:p-0">
            <MultipleSelectCheckmarks
              selectedEmp={selectedEmp}
              setSelectedEmp={handleChange}
              data={data}
            />
            {empError && <p className="text-danger text-sm">{empError}</p>}
          </div>
          <div className="d-flex justify-content-center mt-3">
            <Button onClick={handleSubmit} variant="primary" className="d-inline-block">
              Submit
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default AssignEmployees;
