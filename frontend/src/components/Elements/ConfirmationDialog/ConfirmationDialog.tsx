import { ExclamationIcon, InformationCircleIcon } from '@heroicons/react/outline';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import React from 'react';

import { Button } from '@/components/Elements/Button';
import { useDisclosure } from '@/hooks/useDisclosure';

export type ConfirmationDialogProps = {
  triggerButton: React.ReactElement;
  confirmButton: React.ReactElement;
  title: string;
  body?: string;
  cancelButtonText?: string;
  icon?: 'danger' | 'info';
  isDone?: boolean;
};

export const ConfirmationDialog = ({
  triggerButton,
  confirmButton,
  title,
  body = '',
  cancelButtonText = 'Cancel',
  icon = 'danger',
  isDone = false,
}: ConfirmationDialogProps) => {
  const { close, open, isOpen } = useDisclosure();

  React.useEffect(() => {
    if (isDone) {
      close();
    }
  }, [isDone, close]);

  const trigger = React.cloneElement(triggerButton, {
    onClick: open,
  });

  return (
    <>
      {trigger}
      <Dialog
        maxWidth="md"
        open={isOpen}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <div className="d-flex dialog-width">
            {icon === 'danger' && (
              <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
              </div>
            )}
            {icon === 'info' && (
              <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                <InformationCircleIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
              </div>
            )}
            <div className="ms-3">
              <h4>
                <b>{title}</b>
              </h4>
              {body && <p>{body}</p>}
            </div>
          </div>
        </DialogContent>
        <DialogActions className="px-4 pb-4">
          <Button variant="inverse" onClick={close}>
            {cancelButtonText}
          </Button>
          {confirmButton}
        </DialogActions>
      </Dialog>
    </>
  );
};
