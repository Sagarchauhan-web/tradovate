import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PaymentSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/dashboard/home');
    }, 5000);
  }, []);

  return (
    <div className='h-[60vh] flex justify-center items-center'>
      <div className='flex flex-col items-center justify-center h-full dark:bg-gray-900 p-4'>
        <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full'>
          <div className='flex flex-col items-center space-y-4'>
            <div className='relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-green-500 rounded-full flex items-center justify-center'>
              <CheckIcon className='w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white' />
              <div className='absolute inset-0 rounded-full bg-green-500 animate-ping' />
            </div>
            <h1 className='text-3xl font-bold text-gray-900 dark:text-gray-100'>
              Payment Successful
            </h1>
            <p className='text-gray-600 dark:text-gray-400 text-center'>
              Congratulations! Your payment has been processed successfully.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M20 6 9 17l-5-5' />
    </svg>
  );
}
