import React, { useRef } from "react";

interface UssdInputProps {
  ussdCode: string;
  setUssdCode: (code: string) => void;
}

const UssdInput: React.FC<UssdInputProps> = ({ ussdCode, setUssdCode }) => {
  const ussdInputRef = useRef<HTMLInputElement>(null);

  const keepFocus = () => {
    ussdInputRef.current?.focus();
  };

  return (
    <div className='h-16'>
      <input
        ref={ussdInputRef}
        value={ussdCode}
        onChange={(e) => setUssdCode(e.target.value)}
        type='text'
        className='h-full w-full outline-none text-2xl bg-white px-4 text-center text-gray-800'
        onBlur={keepFocus}
      />
    </div>
  );
};

export default UssdInput;
