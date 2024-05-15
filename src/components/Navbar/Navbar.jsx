import { useNavigate } from 'react-router-dom';
import ConnectionNotifier from '../ConnectionNotifier/ConnectionNotifier';
import LogoutButton from '../LogoutButton/LogoutButton';
import LiveOrDemo from '../LiveOrDemo/LiveOrDemo';
import { SetAccountType, getTokenUrl, me } from '@/services/Auth/auth';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { toast } from '../ui/use-toast';
import { cn } from '@/lib/utils';
import { FaClipboard } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
function Navbar() {
  const [userData, setUserData] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  const getUser = async () => {
    const response = await me();
    localStorage.setItem('user', JSON.stringify(response.data));

    setUserData(response.data);
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
      duplicate_position_allow: false,
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
        'https://pickmytrade.trade/api/add-trade-data',
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

  return (
    <ul className='flex flex-wrap justify-between items-center  px-10 py-[8px] border-b'>
      <div className='flex gap-6 text-white mb-2 xl:mb-0'>
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
              : 'text-black'
          } px-4 py-1 rounded-sm cursor-pointer`}
        >
          Home
        </li>
        <li
          onClick={() => navigate('/dashboard/documentation')}
          className={`${
            location.pathname === '/dashboard/documentation'
              ? 'bg-primary text-white'
              : 'text-black'
          } px-4 py-1 rounded-sm cursor-pointer`}
        >
          Documentation
        </li>
        <li
          onClick={() => navigate('/dashboard/payment')}
          className={`${
            location.pathname === '/dashboard/payment'
              ? 'bg-primary text-white'
              : 'text-black'
          } px-4 py-1 rounded-sm cursor-pointer`}
        >
          Payment
        </li>
      </div>

      <div className='flex gap-2 flex-wrap'>
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
        <li>
          <LogoutButton />
        </li>
      </div>
    </ul>
  );
}

export default Navbar;
