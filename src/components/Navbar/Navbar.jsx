import { cn } from '@/lib/utils';
import {
  SetAccountSettings,
  SetAccountType,
  deletePauseNewsTrade,
  getPauseNewsTrade,
  getTokenUrl,
  me,
  savePauseNewsTrade,
} from '@/services/Auth/auth';
import { differenceInDays } from 'date-fns';
import { useEffect, useState } from 'react';
import { FaClipboard, FaUserCircle } from 'react-icons/fa';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { useLocation, useNavigate } from 'react-router-dom';
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
import { toast } from '../ui/use-toast';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Settings } from 'lucide-react';
import { MdDelete } from 'react-icons/md';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { getSymbols } from '@/services/Trades/trade';
import { Sidebar } from './Sidebar';

function MenuIcon(props) {
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
      <line x1='4' x2='20' y1='12' y2='12' />
      <line x1='4' x2='20' y1='6' y2='6' />
      <line x1='4' x2='20' y1='18' y2='18' />
    </svg>
  );
}

function Navbar() {
  const [userData, setUserData] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const [trialDays, setTrialDays] = useState();

  // News Pause Trade
  const [dialogBox, setDialogBox] = useState(false);
  const [symbolsDataDialog, setSymbolsDataDialog] = useState(false);
  const [symbolsData, setSymbolsData] = useState([]);
  const [newsPauseTradeData, setNewsPauseTradeData] = useState([]);
  const [stopBeforeInMin, setStopBeforeInMin] = useState(0);
  const [startAfterInMin, setStartAfterInMin] = useState(0);
  const [closePositionOpenOrder, setClosePositionOpenOrder] = useState('Yes');

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getUser = async () => {
    const response = await me();
    localStorage.setItem('user', JSON.stringify(response.data));

    setTrialDays(differenceInDays(response.data.demo_Expiry, new Date()));
    setUserData(response.data);
  };

  const getSymbolsAction = async () => {
    const response = await getSymbols();

    if (!response.error) {
      setSymbolsData(response.data);
    }
  };

  useEffect(() => {
    getSymbolsAction();
  }, []);

  const changeAccountSettings = async () => {
    const body = {
      pause: userData?.pause ? false : true,
      profit_amount: 0,
      loss_amount: 0,
    };
    const response = await SetAccountSettings(body);

    if (!response.error) {
      getUser();
      toast({
        className: cn(
          'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
        ),
        duration: 1000,
        position: 'top-center',
        title: 'Success',
        action: <IoIosCheckmarkCircle className='text-4xl text-green-500' />,
      });
    }
  };

  const getPauseNewsTradeAction = async () => {
    const response = await getPauseNewsTrade();

    if (!response.error) {
      setNewsPauseTradeData(response.data);
      if (response.data.length > 0) {
        setStopBeforeInMin(response.data[0].stop_before_in_minute);
        setStartAfterInMin(response.data[0].start_after_in_minute);
        setClosePositionOpenOrder(
          response.data[0].closed_position_open_order ? 'Yes' : 'No',
        );
      }
    }
  };

  const savePauseNewsTradeAction = async () => {
    const obj = {
      stop_before_in_minute: stopBeforeInMin,
      start_after_in_minute: startAfterInMin,
      closed_position_open_order: closePositionOpenOrder === 'Yes',
    };
    const response = await savePauseNewsTrade(obj);

    if (!response.error) {
      toast({
        className: cn(
          'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
        ),
        duration: 1000,
        position: 'top-center',
        title: 'Success',
        action: <IoIosCheckmarkCircle className='text-4xl text-green-500' />,
      });
      getPauseNewsTradeAction();
    }
  };

  const deletePauseNewsTradeAction = async () => {
    const response = await deletePauseNewsTrade();

    if (!response.error) {
      setNewsPauseTradeData([]);
      setClosePositionOpenOrder('Yes');
      setStartAfterInMin(0);
      setStopBeforeInMin(0);

      toast({
        className: cn(
          'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
        ),
        duration: 1000,
        position: 'top-center',
        title: 'Success',
        action: <IoIosCheckmarkCircle className='text-4xl text-green-500' />,
      });
      getPauseNewsTradeAction();
    }
  };

  const changeAccountType = async (liveOrDemo) => {
    const body = {
      live: liveOrDemo,
    };
    await SetAccountType(body);

    // if (!response.error) {
    getUser();
    // }
  };

  const onTradovateDisconnectedClick = async () => {
    const tokenUrl = await getTokenUrl();

    if (!tokenUrl.error) {
      window.location.href = tokenUrl.data;
    }
  };

  useEffect(() => {
    let interval;
    getUser();
    getPauseNewsTradeAction();

    interval = setInterval(() => {
      getUser();
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  const copyTextToClipboard = async (textToCopy) => {
    if (!textToCopy) return;

    try {
      await navigator.clipboard.writeText(textToCopy);
      toast({
        className: cn(
          'top-0 right-0 flex fixed max-w-[220px] max-h-[60px] md:top-4 md:right-4',
        ),

        duration: 1000,
        position: 'top-center',
        title: 'Copied!',
        action: <FaClipboard className='text-2xl' />,
      });
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };
  const copyTextToClipboardForBuyAndSell = async (textToCopy, token) => {
    const body = {
      symbol: '{{ticker}}',
      date: '{{timenow}}',
      data: textToCopy,
      quantity: 3,
      risk_percentage: 0,
      price: '{{close}}',
      tp: 0,
      sl: 0,
      trail: 0,
      update_tp: false,
      update_sl: false,
      duplicate_position_allow: true,
      reverse_order_close: true,
      token: token,
      account_id: '',
    };

    try {
      await navigator.clipboard.writeText(JSON.stringify(body));
      toast({
        className: cn(
          'top-0 right-0 flex fixed max-w-[220px] max-h-[60px] md:top-4 md:right-4',
        ),

        duration: 1000,
        position: 'top-center',
        title: 'Copied!',
        action: <FaClipboard className='text-2xl' />,
      });
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const copyTextToClipboardWebhook = async () => {
    try {
      await navigator.clipboard.writeText(
        'https://api.pickmytrade.trade/api/add-trade-data',
      );
      toast({
        className: cn(
          'top-0 right-0 flex fixed max-w-[220px] max-h-[60px] md:top-4 md:right-4',
        ),

        duration: 1000,
        position: 'top-center',
        title: 'Copied!',
        action: <FaClipboard className='text-2xl' />,
      });
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const ClipboardAndDropDown = () => {
    return (
      <div className='hidden sm:flex gap-2 flex-wrap'>
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

        {/* <li>
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
        </li> */}
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
        <li>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' className='h-8 w-8 p-0'>
                {userData?.username ? (
                  userData?.username.charAt(0).toUpperCase()
                ) : (
                  <FaUserCircle className='w-8 h-8 text-primary rounded-full' />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
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
              {/* <DropdownMenuLabel>Username</DropdownMenuLabel> */}
              <p className='p-2 text-sm text-center'>{userData?.username}</p>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  setDialogBox(true);
                }}
              >
                <Settings className='mr-2 h-4 w-4' />
                Settings
              </DropdownMenuItem>
              <DropdownMenuLabel>Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className='p-2' onClick={async () => {}}>
                <PauseAndResume
                  isPaused={userData?.pause}
                  onChange={changeAccountSettings}
                />
              </div>
              <div className='p-2'>
                <LogoutButton />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </li>
      </div>
    );
  };

  return (
    <>
      <Dialog open={symbolsDataDialog} onOpenChange={setSymbolsDataDialog}>
        <DialogContent className='sm:max-w-[625px]'>
          <DialogHeader>
            <DialogTitle>Symbols</DialogTitle>
            <DialogDescription>
              This data specifies a currency code and a trading symbol for a
              financial instrument.
            </DialogDescription>
            <Table className='my-4'>
              <TableHeader>
                <TableRow>
                  <TableHead>Country</TableHead>
                  <TableHead>Symbol</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {symbolsData.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell className='font-medium'>
                      {item.country}
                    </TableCell>
                    <TableCell>{item.tradovate_root_symbol}</TableCell>
                  </TableRow>
                ))}
                {symbolsData.length <= 0 && (
                  <TableRow>
                    <TableCell colSpan={12} className='h-24 text-center'>
                      No Data
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Dialog open={dialogBox} onOpenChange={setDialogBox}>
        <DialogContent className='sm:max-w-[625px]'>
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
            <DialogDescription>
              Make changes to your settings here. Click save when you&apos;re
              done.{' '}
              <span
                onClick={() => setSymbolsDataDialog(true)}
                className='cursor-pointer text-blue-500 font-bold'
              >
                Click here
              </span>{' '}
              to check symbols list.
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className=''>
              <Label htmlFor='stopBefore' className='text-right'>
                Stop Trading Before in Minute
              </Label>
              <Input
                id='stopBefore'
                value={stopBeforeInMin}
                onChange={(e) => setStopBeforeInMin(e.target.value)}
                className='col-span-3'
              />
            </div>
            <div className=''>
              <Label htmlFor='startAfter' className='text-right'>
                Start Trading After in Minute
              </Label>
              <Input
                id='startAfter'
                value={startAfterInMin}
                onChange={(e) => setStartAfterInMin(e.target.value)}
                className='col-span-3'
              />
            </div>
            <div className=''>
              <Label htmlFor='closePositionOpenOrder' className='text-right'>
                Closed Position and Open Order
              </Label>

              <Select
                value={closePositionOpenOrder}
                onValueChange={(value) => {
                  console.log(value, 'value');
                  if (value === 'Yes') {
                    setClosePositionOpenOrder('Yes');
                  } else {
                    setClosePositionOpenOrder('No');
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value='Yes'>Yes</SelectItem>
                    <SelectItem value='No'>No</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <Button className='m-8' onClick={savePauseNewsTradeAction}>
              Save changes
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Closed Position Open Order</TableHead>
                <TableHead>Start After In Minute</TableHead>
                <TableHead>Stop Before In Minute</TableHead>
                <TableHead className='text-right'>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {newsPauseTradeData.map((item, i) => (
                <TableRow key={i}>
                  <TableCell className='font-medium'>
                    {item.closed_position_open_order ? 'Yes' : 'No'}
                  </TableCell>
                  <TableCell>{item.start_after_in_minute}</TableCell>
                  <TableCell>{item.stop_before_in_minute}</TableCell>
                  <TableCell className='text-right'>
                    <Button
                      variant='outline'
                      className='text-red-500 hover:text-red-600'
                      onClick={async () => {
                        deletePauseNewsTradeAction();
                      }}
                    >
                      <MdDelete />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {newsPauseTradeData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={12} className='h-24 text-center'>
                    No Data
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
      <ul className='flex flex-wrap justify-between items-center px-2 sm:px-10 py-[8px] border-b'>
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          ClipboardAndDropDown={ClipboardAndDropDown}
          copyTextToClipboardWebhook={copyTextToClipboardWebhook}
          userData={userData}
          copyTextToClipboardForBuyAndSell={copyTextToClipboardForBuyAndSell}
          copyTextToClipboard={copyTextToClipboard}
          changeAccountType={changeAccountType}
          onTradovateDisconnectedClick={onTradovateDisconnectedClick}
          trialDays={trialDays}
          setDialogBox={setDialogBox}
          changeAccountSettings={changeAccountSettings}
        />
        <div className='flex flex-wrap gap-2 sm:gap-6 text-white mb-2'>
          <li
            className='flex justify-center items-center'
            onClick={() => navigate('/dashboard/home')}
          >
            <img src='/logo.png' alt='logo' className='w-10 h-8' />
            <p className='text-gray-800 font-bold'>PickMyTrade</p>
          </li>
          <li
            onClick={() => navigate('/dashboard/home')}
            className={`${
              location.pathname === '/dashboard/home'
                ? 'bg-primary text-white'
                : 'text-black bg-gray-100'
            } px-4 py-1 rounded-sm cursor-pointer hidden sm:flex`}
          >
            Home
          </li>
          <li
            onClick={() => navigate('/dashboard/payment')}
            className={`${
              location.pathname === '/dashboard/payment'
                ? 'bg-primary text-white'
                : 'text-black bg-gray-100'
            } px-4 py-1 rounded-sm cursor-pointer hidden sm:flex`}
          >
            Payment
          </li>
          <li
            onClick={() => navigate('/documentation?page=alert')}
            className={`${
              location.pathname === '/documentation'
                ? 'bg-primary text-white'
                : 'text-black bg-gray-100'
            } px-4 py-1 rounded-sm cursor-pointer hidden sm:flex`}
          >
            Documentation
          </li>
          <li
            className={`${
              location.pathname === '/dashboard/blog'
                ? 'bg-primary text-white'
                : 'text-black bg-gray-100'
            } px-4 py-1 rounded-sm cursor-pointer hidden sm:flex`}
          >
            <a href='https://blog.pickmytrade.trade/' target='_blank'>
              Blog
            </a>
          </li>
          <li
            onClick={() => navigate('/dashboard/alerts')}
            className={`${
              location.pathname === '/dashboard/alerts'
                ? 'bg-primary text-white'
                : 'text-black bg-gray-100'
            } px-4 py-1 rounded-sm cursor-pointer hidden sm:flex`}
          >
            Generate Alert
          </li>
        </div>
        <ClipboardAndDropDown />
        <Button
          onClick={() => setSidebarOpen(true)}
          variant='outline'
          size='icon'
          className='absolute right-4 top-2 z-50 rounded-full sm:hidden'
        >
          <MenuIcon className='h-6 w-6' />
          <span className='sr-only'>Toggle Menu</span>
        </Button>
      </ul>

      {trialDays < 10 && trialDays > 0 && (
        <div className='flex justify-end items-center'>
          <div className='max-w-[300px] w-full bg-red-500 py-3 shadow-lg text-center text-white font-medium'>
            <p>Account Expires in {trialDays} Days</p>
          </div>
        </div>
      )}
      {trialDays <= 0 && (
        <div className='flex justify-end items-center'>
          <div className='max-w-[300px] w-full bg-red-500 py-3 shadow-lg text-center text-white font-medium'>
            <p>Account Expired</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
