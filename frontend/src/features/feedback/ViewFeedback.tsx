import React, { useEffect, useState } from 'react';
import 'react-phone-number-input/style.css';

import { Dialog, DialogTitle } from '@/components/Elements';
import { Feedback, Request } from '@/types';
import { Entry } from '@/components/Elements/Card/Entry';
import { formatDate } from '@/utils/format';

const ViewFeedback = ({
  feedback,
  close,
  isOpen,
}: {
  feedback?: Feedback;
  close: () => void;
  isOpen: boolean;
}) => {
  const cancelButtonRef = React.useRef(null);

  return (
    <div>
      <Dialog isOpen={isOpen} onClose={close} initialFocus={cancelButtonRef}>
        <div className="inline-block align-top bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="mt-1 mb-4 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <DialogTitle as="h3" className="text-lg leading-6 font-medium text-gray-900">
              View Feedback
            </DialogTitle>
          </div>
          {feedback?.note ? (
            <div className="border-t border-gray-200 px-4 sm:p-0">
              <dl className="sm:divide-y sm:divide-gray-200">
                <i>{feedback?.note ?? ''}</i>
              </dl>
            </div>
          ) : (
            <p className='text-center my-4'>Not added yet</p>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default ViewFeedback;
