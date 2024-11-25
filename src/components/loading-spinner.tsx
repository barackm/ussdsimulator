import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const LoadingSpinner: React.FC = () => {
  return (
    <div className='animate-spin'>
      <AiOutlineLoading3Quarters />
    </div>
  );
};

export default LoadingSpinner;
