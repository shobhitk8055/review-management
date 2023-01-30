import React, { useEffect, useState } from 'react';
import 'react-phone-number-input/style.css';

import PhoneInput, { Value, isValidPhoneNumber } from 'react-phone-number-input';
import * as z from 'zod';

import { PlusIcon } from '@heroicons/react/outline';
import { Button, Dialog, DialogTitle } from '@/components/Elements';
import { useDisclosure } from '@/hooks/useDisclosure';
import { Form, InputField } from '@/components/Form';
import { type } from 'os';
import { createPhone, updatePhone } from '@/api/getPhones';
import { useNotificationStore } from '@/stores/notifications';
import { Phone } from '@/types';

type FormValues = {
  name: string;
  email: string;
};

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email Address is required').email('Please enter valid email address'),
});

const CreatePhone = ({
  phone,
  onSuccess,
  children,
}: {
  phone?: Phone;
  onSuccess: () => void;
  children?: React.ReactElement;
}) => {
  const cancelButtonRef = React.useRef(null);
  const { close, open, isOpen } = useDisclosure();
  const [value, setValue] = useState<Value>();
  const [numberError, setNumberError] = useState<string>('');

  const handleChange = (value?: Value) => {
    setNumberError('');
    setValue(value);
  };

  useEffect(() => {
    if (phone) {
      setValue(phone.phone_number);
    }
  }, [phone]);

  const checkNumber = () => {
    if (!value) {
      setNumberError('Please enter phone number');
      return false;
    }
    if (!isValidPhoneNumber(value)) {
      setNumberError('Please enter a valid phone number');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (checkNumber()) {
      let message;
      const values = { phone_number: value?.toString() ?? '' };
      if (phone) {
        await updatePhone(phone.id, values);
        message = 'Phone number updated successfully!';
      } else {
        await createPhone(values);
        message = 'Phone number added successfully!';
      }
      useNotificationStore.getState().addNotification({
        type: 'success',
        title: 'Success',
        message,
      });
      onSuccess();
      close();
    }
  };

  return (
    <div>
      {children ? (
        <span onClick={open}>{children}</span>
      ) : (
        <Button onClick={open} startIcon={<PlusIcon style={{ width: '20px' }} />}>
          Add Employee
        </Button>
      )}
      <Dialog isOpen={isOpen} onClose={close} initialFocus={cancelButtonRef}>
        <div className="inline-block align-top bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="mt-1 mb-4 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <DialogTitle as="h3" className="text-lg leading-6 font-medium text-gray-900">
              {phone ? 'Edit' : 'Add New'} Employee
            </DialogTitle>
          </div>
          <div>
            <Form<FormValues, typeof schema> onSubmit={handleSubmit} id="my-form" schema={schema}>
              {({ register, formState }) => (
                <>
                  <InputField
                    label="Name"
                    error={formState.errors['name']}
                    registration={register('name')}
                  />
                  <InputField
                    label="Email"
                    error={formState.errors['email']}
                    registration={register('email')}
                  />
                  <label
                    className="block text-sm font-medium text-gray-700"
                    style={{ marginBottom: '-18px' }}
                  >
                    Phone Number
                  </label>
                  <PhoneInput
                    className="form-control"
                    placeholder="Enter phone number"
                    value={value}
                    onChange={handleChange}
                  />
                  {numberError && (
                    <div
                      role="alert"
                      aria-label={numberError}
                      className="text-sm font-semibold text-red-500"
                      style={{ marginTop: '2px' }}
                    >
                      {numberError}
                    </div>
                  )}
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <Button type="submit" onClick={checkNumber} className="ms-3">
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

export default CreatePhone;
