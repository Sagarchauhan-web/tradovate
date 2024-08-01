import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Settings } from 'lucide-react';
import { FaUserCircle } from 'react-icons/fa';
import { MdOutlinePayment } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import ConnectionNotifier from '../ConnectionNotifier/ConnectionNotifier';
import LiveOrDemo from '../LiveOrDemo/LiveOrDemo';
import LogoutButton from '../LogoutButton/LogoutButton';
import PauseAndResume from '../PauseAndResume/PauseAndResume';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  copyTextToClipboardWebhook,
  userData,
  copyTextToClipboardForBuyAndSell,
  copyTextToClipboard,
  changeAccountType,
  onTradovateDisconnectedClick,
  trialDays,
  setDialogBox,
  changeAccountSettings,
}) {
  const navigate = useNavigate();
  return (
    <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <SheetContent
        side='left'
        className='flex h-full w-full max-w-xs flex-col bg-background sm:hidden overflow-y-scroll'
      >
        <div className='flex h-14 items-center justify-between border-b px-4'>
          <div className='flex items-center gap-2 font-semibold'>
            <li
              className='flex justify-center items-center'
              onClick={() => setSidebarOpen(false)}
            >
              <img src='/logo.png' alt='logo' className='w-6 h-5' />
            </li>
          </div>

          {/* <SheetClose asChild>
            <Button variant='ghost' size='icon' className='rounded-full'>
              <XIcon className='h-6 w-6' />
              <span className='sr-only'>Close Menu</span>
            </Button>
          </SheetClose> */}
          <div>
            <p className='p-2 text-sm text-center'>{userData?.username}</p>
          </div>
        </div>
        <nav className='flex-1 '>
          {trialDays > 10 && (
            <>
              <div className='flex justify-end items-center'>
                <div className='max-w-[300px] w-full bg-green-500 py-3 shadow-lg text-center text-white font-medium'>
                  <p>Account Validity {trialDays} Days</p>
                </div>
              </div>
              <DropdownMenuSeparator />
            </>
          )}
          <div className='inline-block rounded-lg bg-muted px-3 py-1 text-sm mb-3'>
            Pages
          </div>
          <div className='grid gap-4'>
            <li
              onClick={() => {
                navigate('/dashboard/home');
                setSidebarOpen(false);
              }}
              className='flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-all hover:text-primary'
            >
              <HomeIcon className='h-4 w-4' />
              Home
            </li>
            <li
              onClick={() => {
                navigate('/dashboard/payment');
                setSidebarOpen(false);
              }}
              className='flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-all hover:text-primary'
            >
              <MdOutlinePayment className='h-4 w-4' />
              Payment
            </li>
            <li
              onClick={() => {
                navigate('/documentation?page=alert');
                setSidebarOpen(false);
              }}
              className='flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-all hover:text-primary'
            >
              <PackageIcon className='h-4 w-4' />
              Documentation
            </li>
            <a
              onClick={() => {
                setSidebarOpen(false);
              }}
              href='https://blog.pickmytrade.trade/'
              target='_blank'
              className='flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-all hover:text-primary'
            >
              <MountainIcon className='h-4 w-4' />
              Blog
            </a>
            <div
              onClick={() => {
                setDialogBox(true);
                setSidebarOpen(false);
              }}
              target='_blank'
              className='flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-all hover:text-primary'
            >
              <Settings className='h-4 w-4' />
              Settings
            </div>
          </div>
          <div className='inline-block rounded-lg bg-muted px-3 py-1 text-sm my-4'>
            Others
          </div>
          <ul className='flex gap-2 flex-col'>
            <li>
              <Button
                variant='outline'
                size='sm'
                onClick={() => copyTextToClipboardWebhook()}
                className='flex flex-row justify-center items-center gap-2 text-gray-600'
              >
                Webhook
              </Button>
            </li>
            <li>
              <Button
                disabled={!userData?.user_key}
                variant='outline'
                size='sm'
                onClick={() =>
                  copyTextToClipboardForBuyAndSell('buy', userData?.user_key)
                }
                className='flex flex-row justify-center items-center gap-2 text-gray-600'
              >
                Buy Alert
              </Button>
            </li>
            <li>
              <Button
                disabled={!userData?.user_key}
                variant='outline'
                size='sm'
                onClick={() =>
                  copyTextToClipboardForBuyAndSell('sell', userData?.user_key)
                }
                className='flex flex-row justify-center items-center gap-2 text-gray-600'
              >
                Sell Alert
              </Button>
            </li>
            <li>
              <Button
                disabled={!userData?.user_key}
                variant='outline'
                size='sm'
                onClick={() => copyTextToClipboard(userData?.user_key)}
                className='flex flex-row justify-center items-center gap-2 text-gray-600'
              >
                Token: {userData?.user_key}
              </Button>
            </li>
            <li>
              <LiveOrDemo
                isDemo={userData?.demo}
                changeAccountType={changeAccountType}
                isPaid={userData?.paid}
              />
            </li>
            <li>
              <ConnectionNotifier
                isConnected={userData?.is_tradovate_connected}
                onTradovateDisconnectedClick={onTradovateDisconnectedClick}
              />
            </li>

            <div onClick={async () => {}}>
              <PauseAndResume
                isPaused={userData?.pause}
                onChange={changeAccountSettings}
              />
            </div>
            <div>
              <LogoutButton />
            </div>
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}

function HomeIcon(props) {
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
      <path d='m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' />
      <polyline points='9 22 9 12 15 12 15 22' />
    </svg>
  );
}

function MountainIcon(props) {
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
      <path d='m8 3 4 8 5-5 5 15H2L8 3z' />
    </svg>
  );
}

function PackageIcon(props) {
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
      <path d='m7.5 4.27 9 5.15' />
      <path d='M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z' />
      <path d='m3.3 7 8.7 5 8.7-5' />
      <path d='M12 22V12' />
    </svg>
  );
}
