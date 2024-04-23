import { useNavigate } from 'react-router-dom';
import ConnectionNotifier from '../ConnectionNotifier/ConnectionNotifier';
import LogoutButton from '../LogoutButton/LogoutButton';
import LiveOrDemo from '../LiveOrDemo/LiveOrDemo';

function Navbar() {
  const navigate = useNavigate();

  return (
    <ul className='flex justify-between items-center  px-10 py-[8px] border-b'>
      <div className='flex gap-6 text-white'>
        <li
          onClick={() => navigate('/dashboard/home')}
          className='bg-primary text-white px-4 py-1 rounded-sm cursor-pointere'
        >
          Home
        </li>
        <li
          onClick={() => navigate('/dashboard/payments')}
          className='text-black px-4 py-1 rounded-sm cursor-pointer'
        >
          Payments
        </li>
      </div>

      <div className='flex gap-2'>
        <li>
          <LiveOrDemo />
        </li>
        <li>
          <ConnectionNotifier />
        </li>
        <li>
          <LogoutButton />
        </li>
      </div>
    </ul>
  );
}

export default Navbar;
