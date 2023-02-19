import * as z from 'zod';
import React, { useEffect, useState } from 'react';
import 'react-phone-number-input/style.css';

import { Button, Dialog, DialogTitle } from '@/components/Elements';
import { Feedback, Request } from '@/types';
import { Entry } from '@/components/Elements/Card/Entry';
import { formatDate } from '@/utils/format';
import { Form, InputField, TextAreaField } from '@/components/Form';
import { createFeedback } from '@/api/getFeedback';
import { useNotificationStore } from '@/stores/notifications';

type FormValues = {
  note: string;
};

const schema = z.object({
  note: z.string().min(1, 'Note is required'),
});

const AddFeedback = ({
  feedback,
  close,
  isOpen,
  onSuccess
}: {
  feedback?: Feedback;
  close: () => void;
  isOpen: boolean;
  onSuccess: () => void;
}) => {
  const cancelButtonRef = React.useRef(null);

  const handleSubmit = async (values: FormValues) => {
    await createFeedback(feedback?.id ?? '', values);
    useNotificationStore.getState().addNotification({
      title: 'Success',
      type: 'success',
      message: 'Feedback added successfully!',
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
              Add Feedback
            </DialogTitle>
          </div>
          <div className="border-t border-gray-200 px-4 pt-4 sm:p-0">
            <Form<FormValues, typeof schema> onSubmit={handleSubmit} id="my-form" schema={schema}>
              {({ register, formState }) => (
                <>
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

export default AddFeedback;
