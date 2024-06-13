import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PaymentFailed() {
  const [dialogBox, setDialogBox] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/dashboard/home');
    }, 5000);
  }, []);

  return (
    <div className='h-[60vh] flex justify-center items-center'>
      <Dialog open={dialogBox} onOpenChange={setDialogBox}>
        <DialogContent className='sm:max-w-[525px] p-5'>
          <DialogHeader>
            <main className='flex flex-col items-center justify-center p-10 bg-gray-100 dark:bg-gray-900 px-4 md:px-6'>
              <div className='max-w-md w-full space-y-6'>
                <div className='text-center'>
                  <h1 className='text-3xl font-bold text-gray-900 dark:text-gray-100'>
                    Payment
                  </h1>
                </div>
                <Card className='bg-white dark:bg-gray-800 shadow-md rounded-lg p-6'>
                  <p>
                    If your facing any issue with payment.Please Make a payment
                    of at Paypal address{' '}
                    <a
                      href='https://paypal.me/bhavishyagoyal'
                      className={'text-blue-500 cursor-pointer'}
                    >
                      @bhavisyagoyal
                    </a>
                  </p>{' '}
                  <br />
                  <p>
                    Once payment done please send message on whatsapp{' '}
                    <a
                      href='https://wa.me/+917838873492'
                      className={'text-blue-500 cursor-pointer'}
                    >
                      +91 7838873492
                    </a>
                  </p>
                </Card>
              </div>
            </main>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <div className='flex flex-col items-center justify-center h-full dark:bg-gray-900 p-4'>
        <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full'>
          <div className='flex flex-col items-center space-y-4'>
            <div className='relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-red-500 rounded-full flex items-center justify-center'>
              <XIcon className='w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white' />
              <div className='absolute inset-0 rounded-full bg-red-500 animate-ping' />
            </div>
            <h1 className='text-3xl font-bold text-gray-900 dark:text-gray-100'>
              Payment Failed
            </h1>
            <p className='text-gray-600 dark:text-gray-400 text-center'>
              Oops, there was an issue processing your payment. Please try
              again.
            </p>
            <div className='border border-gray-200 p-2'>
              <p
                className='min-w-48 cursor-pointer text-primary'
                onClick={() => setDialogBox(true)}
              >
                Payment issue? click here
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
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
