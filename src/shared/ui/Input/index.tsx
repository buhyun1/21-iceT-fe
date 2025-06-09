import React from 'react';

type InputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  type?: string;
};

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder = '',
  className = '',
  type = 'text',
}) => {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      className={`bg-input rounded-lg py-2 px-2 outline-none text-sm ${className}`}
    />
  );
};

export default Input;
