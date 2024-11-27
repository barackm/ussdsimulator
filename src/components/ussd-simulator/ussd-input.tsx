import React, { useRef } from "react";

interface UssdInputProps {
  inputValue: string;
  setInputValue: (code: string) => void;
}

const UssdInput: React.FC<UssdInputProps> = ({
  inputValue: inputValue,
  setInputValue,
}) => {
  const ussdInputRef = useRef<HTMLInputElement>(null);

  const keepFocus = () => {
    ussdInputRef.current?.focus();
  };

  return (
    <div className="h-16">
      <input
        ref={ussdInputRef}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        type="text"
        className="h-full w-full outline-none text-2xl bg-white px-4 text-center text-gray-800"
        onBlur={keepFocus}
      />
    </div>
  );
};

export default UssdInput;
