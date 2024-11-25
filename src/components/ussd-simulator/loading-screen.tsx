import LoadingSpinner from "../loading-spinner";

const LoadingScreen = () => {
  return (
    <div className='absolute inset-0 z-50 flex flex-col bg-gray-800'>
      <div className='flex-grow flex flex-col justify-center items-center text-white'>
        <LoadingSpinner />
        <span className='text-sm font-medium -mt-2'>Please Wait...</span>
      </div>
      <div className='h-1 w-16 bg-white rounded-full mx-auto mb-6'></div>
    </div>
  );
};

export default LoadingScreen;
