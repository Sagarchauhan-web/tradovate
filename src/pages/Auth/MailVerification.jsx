import OverlapLoader from '@/components/Loader/OverlapLoader';
import { Button } from '@/components/ui/button';
import { getAcountEmailVerified } from '@/services/Auth/auth';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function MailVerification() {
  const [verificationFailed, setVerificationFailed] = useState(false);
  const [verificationLoader, setVerificationLoader] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get('token');

  useEffect(() => {
    if (token) {
      getAcountEmailVerifiedAction();
    }
  }, [token]);

  const getAcountEmailVerifiedAction = async () => {
    setVerificationLoader(true);
    const response = await getAcountEmailVerified({ token });

    if (!response.error) {
      setVerificationFailed(false);
    } else {
      setVerificationFailed(true);
    }
    setVerificationLoader(false);
  };

  if (verificationLoader)
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='bg-white p-8 rounded-lg shadow-md text-center w-full max-w-md'>
          <div className='flex items-center justify-center mb-4'>
            <div className='w-16 h-16'>
              <div className='w-full h-full rounded-full bg-gray-200 animate-pulse' />
            </div>
          </div>
          <div className='mb-2'>
            <div className='h-6 bg-gray-200 rounded w-32 mx-auto animate-pulse' />
          </div>
          <div className='mb-4'>
            <div className='h-4 bg-gray-200 rounded w-64 mx-auto animate-pulse' />
          </div>
          <div className='mb-4'>
            <div className='h-4 bg-gray-200 rounded w-64 mx-auto animate-pulse' />
          </div>
          <div className='mb-4'>
            <div className='h-4 bg-gray-200 rounded w-64 mx-auto animate-pulse' />
          </div>
        </div>
      </div>
    );

  return (
    <div className='h-[90vh] flex justify-center items-center'>
      <div className='flex flex-col items-center justify-center h-full dark:bg-gray-900 p-4'>
        <OverlapLoader loader={verificationLoader}>
          <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full'>
            {!verificationFailed ? (
              <div className='flex flex-col items-center space-y-4'>
                <div className='relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-green-500 rounded-full flex items-center justify-center'>
                  <CheckIcon className='w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white' />
                  <div className='absolute inset-0 rounded-full bg-green-500 animate-ping' />
                </div>
                <h1 className='text-3xl font-bold text-gray-900 dark:text-gray-100'>
                  Email Verified
                </h1>
                <p className='text-gray-600 dark:text-gray-400 text-center'>
                  Congratulations! Your email address has been verified.
                </p>
                <Button
                  variant='outline'
                  onClick={() =>
                    navigate('/auth', { state: { toRegister: false } })
                  }
                >
                  Go to login page
                </Button>
              </div>
            ) : (
              <div className='flex flex-col items-center space-y-4'>
                <div className='relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-red-500 rounded-full flex items-center justify-center'>
                  <XIcon className='w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white' />
                  <div className='absolute inset-0 rounded-full bg-red-500 animate-ping' />
                </div>
                <h1 className='text-3xl font-bold text-gray-900 dark:text-gray-100'>
                  Unable To Verify Email
                </h1>
                <p className='text-gray-600 dark:text-gray-400 text-center'>
                  Oops, there was an issue Verifying. Please try again.
                </p>
                <Button
                  variant='outline'
                  onClick={() =>
                    navigate('/auth', { state: { toRegister: true } })
                  }
                >
                  Go to sign up page
                </Button>
              </div>
            )}
          </div>
        </OverlapLoader>
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

function XIcon(props) {
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
      <path d='M18 6L6 18M6 6l12 12' />
    </svg>
  );
}
