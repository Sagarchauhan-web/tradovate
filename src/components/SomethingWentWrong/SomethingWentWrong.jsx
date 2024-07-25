export default function SomethingWentWrong({ goHome, errormsg }) {
  return (
    <main className='flex w-full items-center justify-center  px-4 dark:bg-gray-900'>
      <div className='mx-auto flex max-w-md flex-col items-center justify-center space-y-6 text-center'>
        <AlertCircleIcon className='h-16 w-16 text-red-700 dark:text-gray-400' />
        <div className='space-y-2'>
          <h1 className='text-3xl font-bold tracking-tighter text-gray-900 dark:text-gray-50'>
            Something Went Wrong
          </h1>
          <p className='text-gray-500 dark:text-gray-400'>{errormsg}</p>
        </div>
        <div
          onClick={goHome}
          className='inline-flex h-10 items-center justify-center 
        rounded-md bg-primary px-6 text-sm font-medium text-gray-50 shadow
         transition-colors hover:opacity-90 cursor-pointer focus-visible:outline-none focus-visible:ring-1
          focus-visible:ring-gray-950  '
        >
          Go to Homepage
        </div>
      </div>
    </main>
  );
}

function AlertCircleIcon(props) {
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
      <circle cx='12' cy='12' r='10' />
      <line x1='12' x2='12' y1='8' y2='12' />
      <line x1='12' x2='12.01' y1='16' y2='16' />
    </svg>
  );
}
