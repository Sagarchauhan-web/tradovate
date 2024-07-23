import { useState } from 'react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import { Link } from 'react-router-dom';

const GetSupport = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className='fixed bottom-16 sm:bottom-16 left-4 z-10'>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              onClick={() => setIsModalOpen(true)}
              className='inline-flex h-12 items-center 
              justify-center rounded-full bg-primary px-5 
              text-m font-medium text-primary-foreground 
              shadow transition-colors hover:bg-primary/90
               focus-visible:outline-none focus-visible:ring-1 
               focus-visible:ring-ring disabled:pointer-events-none
                disabled:opacity-50'
              prefetch={false}
            >
              <CircleHelpIcon className='mr-2 h-5 w-5' />
              Get Support
            </Link>
          </TooltipTrigger>
          <TooltipContent>Contact our support team</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader className={'mb-2'}>
            <DialogTitle className='text-center'>Get Support</DialogTitle>
            <DialogDescription className='text-center'>
              For immediate assistance, please contact our support team
            </DialogDescription>
          </DialogHeader>

          <div className='space-y-4'>
            <div className='flex items-center gap-3 justify-between'>
              <div className='flex items-center gap-3'>
                <PhoneIcon className='h-8 w-8 text-green-500' />
                <div>
                  <p className='text-sm font-medium'>WhatsApp</p>
                  <a
                    href='#'
                    className='text-sm text-muted-foreground hover:underline'
                  >
                    +91 78388 73492
                  </a>
                </div>
              </div>
              <div>
                <a
                  className='w-full h-full'
                  href='whatsapp://send?phone=917838873492'
                >
                  <Button type='button' variant='outline'>
                    Connect
                  </Button>
                </a>
              </div>
            </div>

            <div className='flex items-center gap-3 justify-between'>
              <div className='flex items-center gap-3'>
                <MailOpenIcon className='h-8 w-8 text-primary' />
                <div>
                  <p className='text-sm font-medium'>Email</p>
                  <a
                    href='#'
                    className='text-sm text-muted-foreground hover:underline'
                  >
                    support@pickmytrade.com
                  </a>
                </div>
              </div>
              <div>
                <a
                  className='w-full h-full'
                  href='mailto:support@pickmytrade.com'
                >
                  <Button type='button' variant='outline'>
                    Connect
                  </Button>
                </a>
              </div>
            </div>
          </div>
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GetSupport;

function MailOpenIcon(props) {
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
      <path d='M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z' />
      <path d='m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10' />
    </svg>
  );
}

function CircleHelpIcon(props) {
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
      <path d='M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3' />
      <path d='M12 17h.01' />
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
