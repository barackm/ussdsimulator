import React from "react";

const StatusBar: React.FC = () => {
  return (
    <div className='h-10 w-full px-6 pt-5 absolute z-50 flex flex-row justify-between items-center text-gray-900 bg-white'>
      <span className='text-sm font-semibold absolute left-10 top-6'>
        {new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })}
      </span>
      <img src='status-bar.png' alt='Status Bar' className='h-10 w-full object-scale-down' />
    </div>
  );
};

export default StatusBar;
