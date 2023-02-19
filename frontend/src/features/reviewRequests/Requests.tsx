import { deleteRequest, useRequest } from '@/api/getRequests';
import { useUsers } from '@/api/getUsers';
import { Card, Button, Table, ConfirmationDialog } from '@/components/Elements';
import { ContentLayout } from '@/components/Layout';
import { Feedback as IFeedback, Request, User } from '@/types';
import { useRef, useState } from 'react';
import { useNotificationStore } from '@/stores/notifications';

import { useDisclosure } from '@/hooks/useDisclosure';
import { Link, useParams } from 'react-router-dom';
import { useFeedback } from '@/api/getFeedback';
import { useReviewRequests } from '@/api/getReviewRequests';
import AddFeedback from './AddFeedback';
import ViewFeedback from '../feedback/ViewFeedback';
// import ViewFeedback from './ViewFeedback';

export const Requests = () => {
  const { data, isLoading, refetch, isFetching } = useReviewRequests();
  const createBtnRef = useRef<HTMLButtonElement | null>(null);
  const [feedback, setFeedback] = useState<IFeedback>({} as IFeedback);
  const { close, open, isOpen } = useDisclosure();
  const { close: closeView, open: openView, isOpen: isOpenView } = useDisclosure();

  const deleteEntry = async (id: string) => {
    await deleteRequest(id);
    useNotificationStore.getState().addNotification({
      type: 'success',
      title: 'Success',
      message: 'Review request deleted successfully!',
    });
    refetch();
  };

  const handleOpen = (entry: IFeedback) => {
    setFeedback(entry);
    open();
  };

  const handleOpenView = (entry: IFeedback) => {
    setFeedback(entry);
    openView();
  };

  return (
    <ContentLayout title="Review Requests">
      <Card shadow>
        <div>
          <div className="d-flex justify-content-between align-items-center p-2">
            {/* <div className="w-25"><b>Employee</b>: {data?.employee?.name}</div> */}
            {/* <CreateReview onSuccess={() => refetch()} /> */}
          </div>
          <div className="m-3">
            {!isLoading && !isFetching && (
              <Table<IFeedback>
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
                    title: 'Admin Note',
                    field: 'employee',
                    Cell({ entry: { request } }) {
                      return <span>{request.note}</span>;
                    },
                  },
                  {
                    title: 'Status',
                    field: 'status',
                  },
                  {
                    title: 'Feedback',
                    field: 'note',
                    Cell({ entry }) {
                      return (
                        <>
                          {entry.status === 'pending' ? (
                            <Button onClick={() => handleOpen(entry)}>Add Feedback</Button>
                          ) : (
                            <>
                              {entry.note.length <= 40 ? (
                                <span><i>{entry.note}</i></span>
                              ) : (
                                <span
                                  role="button"
                                  tabIndex={-1}
                                  onKeyDown={() => handleOpenView(entry)}
                                  onClick={() => handleOpenView(entry)}
                                  className="icon me-2"
                                  title="View"
                                >
                                  <i className="fa-regular fa-eye" />
                                </span>
                              )}
                            </>
                          )}
                        </>
                      );
                    },
                  },
                ]}
              />
            )}
          </div>
        </div>
      </Card>
      {/* <CreateReview request={request} onSuccess={() => refetch()}>
        <button className="d-none" ref={createBtnRef}></button>
      </CreateReview>*/}
      <AddFeedback
        onSuccess={() => refetch()}
        close={close}
        isOpen={isOpen}
        feedback={feedback}
      ></AddFeedback>

      <ViewFeedback close={closeView} isOpen={isOpenView} feedback={feedback}></ViewFeedback>
    </ContentLayout>
  );
};
