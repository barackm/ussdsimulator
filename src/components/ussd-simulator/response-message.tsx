import React, { useRef, useState } from "react";

interface ResponseMessageProps {
  responseMessage: string;
  ussdCode: string;
  setUssdCode: (value: string) => void;
  setResponseMessage: (value: string) => void;
  clearMessage: () => void;
  sendUssd: () => void;
}

const ResponseMessage: React.FC<ResponseMessageProps> = ({
  responseMessage,
  ussdCode,
  setUssdCode,
  clearMessage,
  sendUssd,
  setResponseMessage,
}) => {
  const [editMode, setEditMode] = useState(false);
  const ussdInputRef = useRef<HTMLInputElement>(null);

  const keepFocus = () => {
    ussdInputRef.current?.focus();
  };

  const formattedMessge = responseMessage.replace(/(CON|END|ERROR)/g, "").trim();
  const canReply = responseMessage.includes("CON");

  return (
    <div className='absolute inset-0 z-50 flex flex-col bg-gray-800'>
      {editMode ? (
        <div className='flex items-center justify-between text-white text-sm bg-gray-800 pt-[50px]'>
          <button
            className='text-blue-500 font-medium py-2 px-6'
            onClick={() => {
              setEditMode(false);
              setUssdCode("");
              setResponseMessage("");
            }}
          >
            Cancel
          </button>
          <button className='text-blue-500 font-medium py-4 px-6 ml-4' onClick={sendUssd}>
            Reply
          </button>
        </div>
      ) : null}

      <div className='flex-grow flex flex-col justify-center items-center text-white px-2'>
        <div className='text-center text-white text-base font-normal leading-relaxed whitespace-pre-wrap'>
          {formattedMessge}
        </div>

        {editMode && (
          <div className='mt-4 w-full px-4'>
            <input
              ref={ussdInputRef}
              value={ussdCode}
              onChange={(e) => setUssdCode(e.target.value)}
              onBlur={keepFocus}
              type='text'
              className='w-full h-8 px-1 rounded-md bg-transparent text-white border border-gray-300 focus:outline-none'
            />
          </div>
        )}
      </div>

      {!editMode && (
        <div className='flex justify-between items-center px-8 pb-6 gap-4'>
          <button className='flex-1 bg-white text-black font-medium py-2 rounded-lg shadow-md' onClick={clearMessage}>
            Dismiss
          </button>
          {canReply && (
            <button
              className='flex-1 bg-black text-white font-medium py-2 rounded-lg shadow-md'
              onClick={() => setEditMode(true)}
            >
              Reply
            </button>
          )}
        </div>
      )}

      <div className='h-1 w-16 bg-white rounded-full mx-auto mb-8'></div>
    </div>
  );
};

export default ResponseMessage;
