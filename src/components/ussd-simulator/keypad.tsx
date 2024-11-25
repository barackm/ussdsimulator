import React from "react";

interface KeypadProps {
  appendToUssdCode: (value: string) => void;
}

const keys = [
  { value: "1", label: "", class: "text-2xl text-blue-600" },
  { value: "2", label: "abc", class: "text-2xl text-blue-600" },
  { value: "3", label: "def", class: "text-2xl text-blue-600" },
  { value: "4", label: "ghi", class: "text-2xl text-blue-600" },
  { value: "5", label: "jkl", class: "text-2xl text-blue-600" },
  { value: "6", label: "mno", class: "text-2xl text-blue-600" },
  { value: "7", label: "pqrs", class: "text-2xl text-blue-600" },
  { value: "8", label: "tuv", class: "text-2xl text-blue-600" },
  { value: "9", label: "wxyz", class: "text-2xl text-blue-600" },
  { value: "*", label: "", class: "text-2xl text-gray-600" },
  { value: "0", label: "+", class: "text-2xl text-blue-600" },
  { value: "#", label: "", class: "text-2xl text-gray-600" },
];

const Keypad: React.FC<KeypadProps> = ({ appendToUssdCode }) => {
  return (
    <div className='grid grid-cols-3 bg-white gap-3 py-4 px-12'>
      {keys.map((key) => (
        <div key={key.value} className='flex justify-center items-center'>
          <button
            className='flex flex-col justify-center items-center h-16 w-16 rounded-full bg-gray-200 text-black cursor-pointer hover:bg-gray-300 transition duration-150 ease-in-out'
            onClick={() => appendToUssdCode(key.value)}
          >
            <span className='font-medium text-3xl'>{key.value}</span>
            {key.label && <span className='text-[0.6rem] text-gray-700 font-semibold uppercase'>{key.label}</span>}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Keypad;
