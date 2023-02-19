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
import ViewFeedback from './ViewFeedback';

export const Feedback = () => {
  const { id } = useParams();

  const { data, isLoading, refetch, isFetching } = useFeedback({ id: id ?? '' });
  const createBtnRef = useRef<HTMLButtonElement | null>(null);
  const [feedback, setFeedback] = useState<IFeedback>({} as IFeedback);
  const { close, open, isOpen } = useDisclosure();

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

  return (
    <ContentLayout title="Feedback">
      <Card shadow>
        <div>
          <div className="d-flex justify-content-between align-items-center p-2">
            <div className="w-25">
              <b>Employee</b>: {data?.employee?.name}
            </div>
            {/* <CreateReview onSuccess={() => refetch()} /> */}
          </div>
          <div className="m-3">
            {!isLoading && !isFetching && (
              <Table<IFeedback>
                data={data?.feedbacks ?? []}
                columns={[
                  {
                    title: 'Reviewer',
                    field: 'employee',
                    Cell({ entry: { reviewer } }) {
                      return <span>{reviewer.name}</span>;
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
                          {entry?.note?.length <= 40 ? (
                            <span>
                              <i>{entry.note}</i>
                            </span>
                          ) : (
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
      <ViewFeedback close={close} isOpen={isOpen} feedback={feedback}></ViewFeedback>
    </ContentLayout>
  );
};
