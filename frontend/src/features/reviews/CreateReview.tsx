import React, { useEffect, useState } from 'react';
import 'react-phone-number-input/style.css';

import { Value, isValidPhoneNumber } from 'react-phone-number-input';
import * as z from 'zod';

import { useUsers } from '@/api/getUsers';
import { PlusIcon } from '@heroicons/react/outline';
import { Button, Dialog, DialogTitle } from '@/components/Elements';
import { useDisclosure } from '@/hooks/useDisclosure';
import { Form, InputField, SelectField, TextAreaField } from '@/components/Form';
import { useNotificationStore } from '@/stores/notifications';
import { Request, User } from '@/types';
import { createRequest, CreateRequestDTO, updateRequest } from '@/api/getRequests';

type FormValues = {
  note: string;
  employee: string;
};

const schema = z.object({
  note: z.string().min(1, 'Note is required'),
  employee: z.string().min(1, 'Employee is required'),
});

const editSchema = z.object({
  note: z.string().min(1, 'Note is required'),
  employee: z.string().min(1, 'Employee is required'),
});

const CreateReview = ({
  request,
  onSuccess,
  children,
}: {
  request?: Request;
  onSuccess: () => void;
  children?: React.ReactElement;
}) => {
  const cancelButtonRef = React.useRef(null);
  const { close, open, isOpen } = useDisclosure();
  const [value, setValue] = useState<Value>();
  const { data, isLoading } = useUsers();

  const handleSubmit = async (values: FormValues) => {
    let message;
    const payload: CreateRequestDTO = values;
    if (request) {
      await updateRequest(request.id, payload);
      message = 'Request updated successfully!';
    } else {
      await createRequest(payload);
      message = 'Request added successfully!';
    }
    useNotificationStore.getState().addNotification({
      type: 'success',
      title: 'Success',
      message,
    });
    onSuccess();
    close();
  };
  const mainSchema = request ? editSchema : schema;
  return (
    <div>
      {children ? (
        <span onClick={open}>{children}</span>
      ) : (
        <Button onClick={open} startIcon={<PlusIcon style={{ width: '20px' }} />}>
          Create Review Request
        </Button>
      )}
      <Dialog isOpen={isOpen} onClose={close} initialFocus={cancelButtonRef}>
        <div className="inline-block align-top bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="mt-1 mb-4 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <DialogTitle as="h3" className="text-lg leading-6 font-medium text-gray-900">
              {request ? 'Edit' : 'Create New'} Review
            </DialogTitle>
          </div>
          <div>
            <Form<FormValues, typeof mainSchema>
              onSubmit={handleSubmit}
              id="my-form"
              schema={mainSchema}
              options={{
                defaultValues: {
                  note: request?.note,
                  employee: request?.employee?.id,
                },
              }}
            >
              {({ register, formState }) => (
                <>
                  <SelectField
                    label="Employee"
                    error={formState.errors['employee']}
                    registration={register('employee')}
                    options={
                      data?.map((type) => ({
                        label: `${type.name} - ${type.employeeId} `,
                        value: type.id,
                      })) ?? []
                    }
                  />
                  <TextAreaField
                    label="Note"
                    error={formState.errors['note']}
                    registration={register('note')}
                  />
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <Button type="submit" className="ms-3">
                      Submit
                    </Button>
                    <Button type="button" variant="inverse" onClick={close} ref={cancelButtonRef}>
                      Cancel
                    </Button>
                  </div>
                </>
              )}
            </Form>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default CreateReview;
