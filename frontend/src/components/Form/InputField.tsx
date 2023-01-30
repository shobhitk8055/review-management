import clsx from 'clsx';
import { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper';

type InputFieldProps = FieldWrapperPassThroughProps & {
  type?: 'text' | 'email' | 'password' | 'time';
  className?: string;
  registration: Partial<UseFormRegisterReturn>;
  placeholder?: string;
};

export const InputField = (props: InputFieldProps) => {
  const { type = 'text', label, className, registration, error, placeholder } = props;
  const [show, setShow] = useState(false);
  return (
    <FieldWrapper label={label} error={error}>
      <input
        type={show ? 'text' : type}
        className={clsx('form-control', error?.message && 'is-invalid', className)}
        {...registration}
        placeholder={placeholder}
      />
      {type === 'password' && (
        <span onClick={() => setShow(!show)} className={clsx('passwordIcon')}>
          {!show ? <i className="fa-regular fa-eye" /> : <i className="fa-regular fa-eye-slash" />}
        </span>
      )}
    </FieldWrapper>
  );
};
