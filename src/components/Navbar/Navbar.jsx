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
function Navbar() {
  const [userData, setUserData] = useState();
  const navigate = useNavigate();
  const getUser = async () => {
    const response = await me();

    setUserData(response.data);
  };

  const changeAccountType = async (liveOrDemo) => {
    const body = {
      live: liveOrDemo,
    };
    const response = await SetAccountType(body);

    if (!response.error) {
      getUser();
    }
  };

  const onTradovateDisconnectedClick = async (is_tradovate_connected) => {
    if (!is_tradovate_connected) {
      const tokenUrl = await getTokenUrl();

      if (!tokenUrl.error) {
        window.location.href = tokenUrl.data;
      }
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

  return (
    <ul className='flex flex-wrap justify-between items-center  px-10 py-[8px] border-b'>
      <div className='flex gap-6 text-white'>
        <li
          onClick={() => navigate('/dashboard/home')}
          className='bg-primary text-white px-4 py-1 rounded-sm cursor-pointere'
        >
          Home
        </li>
      </div>

      <div className='flex gap-2 flex-wrap'>
        <li>
          <Button
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
