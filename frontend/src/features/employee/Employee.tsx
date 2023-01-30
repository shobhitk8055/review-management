import { deletePhone } from '@/api/getPhones';
import { useUsers } from '@/api/user/getUsers';
import { Card, Button, Table, ConfirmationDialog } from '@/components/Elements';
import { ContentLayout } from '@/components/Layout';
import { Phone as PhoneType, User } from '@/types';
import React from 'react';
import CreateEmployee from './CreateEmployee';
import { useNotificationStore } from '@/stores/notifications';
import { formatPhoneNumber } from 'react-phone-number-input';

import './phone.css';

export const Employee = () => {
  const { data, isLoading, refetch } = useUsers();
  console.log(data);
  
  const deleteEntry = async (id: string) => {
    await deletePhone(id);
    useNotificationStore.getState().addNotification({
      type: 'success',
      title: 'Success',
      message: 'Phone number deleted successfully!',
    });
    refetch();
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
                    title: 'Phone Number',
                    field: 'phone',
                    Cell({ entry }) {
                      return <span>{formatPhoneNumber(entry.phone)}</span>;
                    },
                  },
                  {
                    title: 'Actions',
                    field: 'id',
                    Cell({ entry }) {
                      return (
                        <div className="d-flex cursor-pointer">
                          <CreateEmployee onSuccess={() => refetch()}>
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
                            body="Are you sure you want to delete this number?"
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
    </ContentLayout>
  );
};
