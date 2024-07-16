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
    <div className='fixed bottom-16 right-6 z-10'>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              onClick={() => setIsModalOpen(true)}
              className='inline-flex h-14 items-center 
              justify-center rounded-full bg-primary px-8 
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
          <DialogHeader>
            <DialogTitle className='text-center'>Get Support</DialogTitle>
            <DialogDescription className='text-center'>
              For immediate assistance, please contact our support team
            </DialogDescription>
          </DialogHeader>
          <div className='flex flex-col items-center justify-center gap-4 py-8'>
            <PhoneIcon className='size-12 text-green-500' />
            <p className='text-lg font-medium'>+91 78388 73492</p>
            <p className='text-muted-foreground'>
              Click to open WhatsApp and chat with us.
            </p>
          </div>
          <DialogFooter>
            <div className='w-full'>
              <a
                className='w-full h-full'
                href='whatsapp://send?phone=917838873492'
              >
                <Button type='button' className='w-full '>
                  Click to chat on WhatsApp
                </Button>
              </a>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GetSupport;

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
