import React from "react";

interface ActionButtonsProps {
  ussdCode: string;
  sendUssd: () => void;
  handleDelete: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ ussdCode, sendUssd, handleDelete }) => {
  return (
    <div className='col-span-3 py-3 flex justify-center items-center relative'>
      <button
        className='h-16 w-16 rounded-full shadow-md justify-center items-center bg-green-600 flex text-white cursor-pointer hover:bg-green-500 transition duration-150 ease-in-out'
        onClick={sendUssd}
      >
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='h-6 pointer-events-none fill-current'>
          <path d='M0 0h24v24H0z' fill='none' />
          <path d='M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z' />
        </svg>
      </button>
      {ussdCode.length > 0 && (
        <button className='w-10 absolute right-[20%]' onClick={handleDelete}>
          <img src='delete.png' alt='Delete' className='w-full h-full transition duration-150 ease-in-out' />
        </button>
      )}
    </div>
  );
};

export default ActionButtons;
