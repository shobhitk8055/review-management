import React, { useEffect, useState } from 'react';
import 'react-phone-number-input/style.css';

import { Button, ConfirmationDialog, Dialog, DialogTitle } from '@/components/Elements';
import { User } from '@/types';
import { Entry } from '@/components/Elements/Card/Entry';
import { formatDate } from '@/utils/format';
import { makeAdminApi, removeAdminApi } from '@/api/getUsers';
import { useNotificationStore } from '@/stores/notifications';

const ViewEmployee = ({
  user,
  close,
  onSuccess,
  isOpen,
}: {
  user?: User;
  close: () => void;
  onSuccess: () => void;
  isOpen: boolean;
}) => {
  const cancelButtonRef = React.useRef(null);
  
  const makeAdmin = async () => {
    await makeAdminApi(user?.id ?? '');
    close();
    onSuccess();
    useNotificationStore.getState().addNotification({
      type: 'success',
      title: 'success',
      message: 'This employee has admin access now!',
    });
  };

  const removeAdmin = async () => {
    await removeAdminApi(user?.id ?? '');
    close();
    onSuccess();
    useNotificationStore.getState().addNotification({
      type: 'success',
      title: 'success',
      message: 'This employee can no longer login as admin!',
    });
  };

  return (
    <div>
      <Dialog isOpen={isOpen} onClose={close} initialFocus={cancelButtonRef}>
        <div className="inline-block align-top bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="mt-1 mb-4 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <DialogTitle as="h3" className="text-lg leading-6 font-medium text-gray-900">
              View Employee
            </DialogTitle>
          </div>
          <div className="border-t border-gray-200 px-4 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-200">
              <Entry label="First Name" value={user?.name ?? ''} />
              <Entry label="Email Address" value={user?.email ?? ''} />
              <Entry label="Phone Number" value={user?.phone ?? ''} />
              <Entry label="Role" value="Employee" />
              <Entry label="Joined" value={formatDate(user?.createdAt ?? '')} />
              <Entry
                label="Admin Access"
                value={
                  <>
                    {user?.privileges?.includes('admin') ? (
                      <div className="d-flex align-items-center">
                        Yes
                        <div className="ms-2">
                          <ConfirmationDialog
                            icon="danger"
                            title="Confirmation"
                            body="Are you sure you want to remove admin access?"
                            confirmButton={
                              <Button onClick={removeAdmin} className="bg-red-500">
                                Confirm
                              </Button>
                            }
                            triggerButton={<Button>Remove Access</Button>}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="d-flex align-items-center">
                        No
                        <div className="ms-2">
                          <ConfirmationDialog
                            icon="danger"
                            title="Confirmation"
                            body="Are you sure you want to make this employee as admin?"
                            confirmButton={
                              <Button onClick={makeAdmin} className="bg-red-500">
                                Confirm
                              </Button>
                            }
                            triggerButton={<Button>Make Admin</Button>}
                          />
                        </div>
                      </div>
                    )}
                  </>
                }
              />
            </dl>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ViewEmployee;
