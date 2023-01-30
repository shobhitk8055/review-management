import clsx from 'clsx';
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
  return (
    <FieldWrapper label={label} error={error}>
      <input
        type={type}
        className={clsx('form-control', error?.message && 'is-invalid', className)}
        {...registration}
        placeholder={placeholder}
      />
    </FieldWrapper>
  );
};
