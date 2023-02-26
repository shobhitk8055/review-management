import { useUsers, deleteEmployee } from '@/api/getUsers';
import { Card, Button, Table, ConfirmationDialog } from '@/components/Elements';
import { ContentLayout } from '@/components/Layout';
import { User } from '@/types';
import { useState } from 'react';
import CreateEmployee from './CreateEmployee';
import { useNotificationStore } from '@/stores/notifications';
import { formatPhoneNumber } from 'react-phone-number-input';

import ViewEmployee from './ViewEmployee';
import { useDisclosure } from '@/hooks/useDisclosure';

export const Employee = () => {
  const { data, isLoading, refetch } = useUsers();
  const [user, setUser] = useState<User>({} as User);
  const { close, open, isOpen } = useDisclosure();

  const deleteEntry = async (id: string) => {
    await deleteEmployee(id);
    useNotificationStore.getState().addNotification({
      type: 'success',
      title: 'Success',
      message: 'Employee deleted successfully!',
    });
    refetch();
  };

  const handleOpen = (entry: User) => {
    setUser(entry);
    open();
  };
  return (
    <ContentLayout title="Employees">
      <Card shadow>
        <div>
          <div className="d-flex justify-content-between align-items-center p-2">
            <div className="w-25"></div>
            <CreateEmployee onSuccess={() => refetch()} />
          </div>
          <div className="m-3">
            {!isLoading && (
              <Table<User>
                data={data ?? []}
                columns={[
                  {
                    title: 'Employee Id',
                    field: 'employeeId',
                  },
                  {
                    title: 'Name',
                    field: 'name',
                  },
                  {
                    title: 'Email Address',
                    field: 'email',
                  },
                  {
                    title: 'Actions',
                    field: 'id',
                    Cell({ entry }) {
                      return (
                        <div className="d-flex cursor-pointer">
                          <span
                            role="button"
                            tabIndex={-1}
                            onKeyDown={() => handleOpen(entry)}
                            onClick={() => handleOpen(entry)}
                            className="icon me-2"
                            title="View"
                          >
                            <i className="fa-regular fa-eye" />
                          </span>
                          <CreateEmployee user={entry} onSuccess={() => refetch()}>
                            <span
                              role="button"
                              tabIndex={-1}
                              onKeyDown={() => null}
                              onClick={() => null}
                              className="icon me-2"
                              title="Edit"
                            >
                              <i className="fa-solid fa-pen" />
                            </span>
                          </CreateEmployee>

                          <ConfirmationDialog
                            icon="danger"
                            title="Confirmation"
                            body="Are you sure you want to delete this employee?"
                            confirmButton={
                              <Button onClick={() => deleteEntry(entry.id)} className="bg-red-500">
                                Confirm
                              </Button>
                            }
                            triggerButton={
                              <span
                                role="button"
                                tabIndex={-1}
                                onKeyDown={() => null}
                                onClick={() => null}
                                className="icon me-2"
                                title="Edit"
                              >
                                <i className="fa-solid fa-trash" />
                              </span>
                            }
                          />
                        </div>
                      );
                    },
                  },
                ]}
              />
            )}
          </div>
        </div>
      </Card>
      <ViewEmployee onSuccess={refetch} close={close} isOpen={isOpen} user={user}></ViewEmployee>
    </ContentLayout>
  );
};
