import { useNavigate } from 'react-router-dom';
import ConnectionNotifier from '../ConnectionNotifier/ConnectionNotifier';
import LogoutButton from '../LogoutButton/LogoutButton';
import LiveOrDemo from '../LiveOrDemo/LiveOrDemo';
import { SetAccountType, getTokenUrl, me } from '@/services/Auth/auth';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';

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

    interval = setInterval(() => {
      getUser();
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ul className='flex flex-wrap justify-between items-center  px-10 py-[8px] border-b'>
      <div className='flex gap-6 text-white'>
        <li
          onClick={() => navigate('/dashboard/home')}
          className='bg-primary text-white px-4 py-1 rounded-sm cursor-pointere'
        >
          Home
        </li>
        {/* <li
          onClick={() => navigate('/dashboard/payments')}
          className='text-black px-4 py-1 rounded-sm cursor-pointer'
        >
          Payments
        </li> */}
      </div>

      <div className='flex gap-2 flex-wrap'>
        <li>
          <Button
            variant='outline'
            size='sm'
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
