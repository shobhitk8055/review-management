import { deleteRequest, useRequest } from '@/api/getRequests';
import { useUsers } from '@/api/getUsers';
import { Card, Button, Table, ConfirmationDialog } from '@/components/Elements';
import { ContentLayout } from '@/components/Layout';
import { Request, User } from '@/types';
import { useRef, useState } from 'react';
import CreateReview from './CreateReview';
import { useNotificationStore } from '@/stores/notifications';

import { useDisclosure } from '@/hooks/useDisclosure';
import ViewReview from './ViewReview';
import { Link, useNavigate } from 'react-router-dom';
import AssignEmployees from './AssignEmployees';

export const Reviews = () => {
  const navigate = useNavigate();
  const { data, isLoading, refetch, isFetching } = useRequest();
  const createBtnRef = useRef<HTMLButtonElement | null>(null);
  const [request, setRequest] = useState<Request>({} as Request);
  const { close, open, isOpen } = useDisclosure();
  const { close: closeAssign, open: openAssign, isOpen: isOpenAssign } = useDisclosure();

  const deleteEntry = async (id: string) => {
    await deleteRequest(id);
    useNotificationStore.getState().addNotification({
      type: 'success',
      title: 'Success',
      message: 'Review request deleted successfully!',
    });
    refetch();
  };

  const handleOpen = (entry: Request) => {
    setRequest(entry);
    open();
  };

  const handleAssign = (entry: Request) => {
    setRequest(entry);
    openAssign();
  };

  const handleEdit = (entry: Request) => {
    setRequest(entry);
    createBtnRef?.current?.click();
  };

  return (
    <ContentLayout title="Review requests">
      <Card shadow>
        <div>
          <div className="d-flex justify-content-between align-items-center p-2">
            <div className="w-25"></div>
            <CreateReview onSuccess={() => refetch()} />
          </div>
          <div className="m-3">
            {!isLoading && !isFetching && (
              <Table<Request>
                data={data ?? []}
                columns={[
                  {
                    title: 'Employee',
                    field: 'employee',
                    Cell({ entry: { employee } }) {
                      return <span>{employee.name}</span>;
                    },
                  },
                  {
                    title: 'Notes',
                    field: 'note',
                    Cell({ entry: { note } }) {
                      return <span>{note.substring(0, 70)}</span>;
                    },
                  },
                  {
                    title: 'Feedback',
                    field: 'note',
                    Cell({ entry }) {
                      return (
                        <>
                          {entry.status === 'pending' ? (
                            <Button onClick={() => handleAssign(entry)} variant="inverse">
                              Assign Employees
                            </Button>
                          ) : (
                            <Button
                              onClick={() => navigate(`/app/feedback/${entry.id}`)}
                              variant="inverse"
                            >
                              View Feedback
                            </Button>
                          )}
                        </>
                      );
                    },
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
                          <span
                            role="button"
                            tabIndex={-1}
                            onKeyDown={() => handleEdit(entry)}
                            onClick={() => handleEdit(entry)}
                            className="icon me-2"
                            title="Edit"
                          >
                            <i className="fa-solid fa-pen" />
                          </span>

                          <ConfirmationDialog
                            icon="danger"
                            title="Confirmation"
                            body="Are you sure you want to delete this review?"
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
      <CreateReview request={request} onSuccess={() => refetch()}>
        <button className="d-none" ref={createBtnRef}></button>
      </CreateReview>
      <ViewReview close={close} isOpen={isOpen} request={request}></ViewReview>
      <AssignEmployees
        onSuccess={refetch}
        close={closeAssign}
        isOpen={isOpenAssign}
        request={request}
      ></AssignEmployees>
    </ContentLayout>
  );
};
