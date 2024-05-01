import { Card } from '@/components/ui/card';

export default function ContactUs() {
  return (
    <main className='flex flex-col items-center justify-center p-10 bg-gray-100 dark:bg-gray-900 px-4 md:px-6'>
      <div className='max-w-md w-full space-y-6'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-gray-100'>
            Contact Us
          </h1>
        </div>
        <Card className='bg-white dark:bg-gray-800 shadow-md rounded-lg p-6'>
          <div className='grid gap-4'>
            <div className='flex items-center gap-4'>
              <PhoneIcon className='h-6 w-6 text-gray-500 dark:text-gray-400' />
              <div>
                <div className='text-gray-900 dark:text-gray-100 font-medium'>
                  Phone
                </div>
                <div className='text-gray-500 dark:text-gray-400'>
                  +917838873492
                </div>
              </div>
            </div>
            <div className='flex items-center gap-4'>
              <MailIcon className='h-6 w-6 text-gray-500 dark:text-gray-400' />
              <div>
                <div className='text-gray-900 dark:text-gray-100 font-medium'>
                  Email
                </div>
                support@pickmytrade.com
              </div>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}

function MailIcon(props) {
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
      <rect width='20' height='16' x='2' y='4' rx='2' />
      <path d='m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7' />
    </svg>
  );
}

function PhoneIcon(props) {
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
      <path d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z' />
    </svg>
  );
}
