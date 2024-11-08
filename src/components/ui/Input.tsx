import React, { forwardRef } from 'react';

interface InputFieldProps {
  placeholder: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: string;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(({ placeholder, onChange, value }, ref) => {
  return (
    <input
      ref={ref}
      className="input"
      type="text"
      placeholder="Escribe tu mensaje"
      onChange={onChange}
      value={value}
    />
  );
});

InputField.displayName = 'InputField';

export default InputField;
