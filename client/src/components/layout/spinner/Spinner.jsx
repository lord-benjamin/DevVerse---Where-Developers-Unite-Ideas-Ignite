import React from 'react';

const Spinner = () => {
  return (
    // <div className='min-h-[calc(100vh-125px)] md:min-h-[calc(100vh-195px)] flex items-center justify-center pb-[40px] md:pb-[70px]'>
    //     <div className='bg-gradient-to-r from-dark via-black h-max to-light w-max p-2 md:p-3 animate-spinning rounded-full'>
    //         <div className='h-8 w-8 md:h-10 md:w-10 bg-white rounded-full'></div>
    //     </div>
    // </div>
    <div className='fixed top-0 right-0 left-0 h-1 md:h-[6px] bg-gradient-to-r from-dark to-light animate-loading text-black mb-10 w-screen z-20'></div>
  );
};

export default Spinner;
