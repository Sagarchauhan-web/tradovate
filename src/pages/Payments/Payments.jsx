import LogoutButton from '@/components/LogoutButton/LogoutButton';
import MaxWidthWrapper from '@/components/MaxWithWrapper';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNavigate } from 'react-router-dom';

function Payments() {
  const navigate = useNavigate();

  return (
    <div className='h-screen flex flex-col'>
      <div className='h-[500px] bg-[#0086d1] '></div>
      <div className='flex-1 bg-[#e7e8ec]'></div>
      <MaxWidthWrapper>
        <div className='bg-white rounded-sm h-5/6 w-3/4 top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 absolute'>
          <ul className='flex justify-between items-center px-10 py-[8px] border-b'>
            <div className='flex gap-6 text-white'>
              <li
                onClick={() => navigate('/dashboard/home')}
                className='text-black px-4 py-1 rounded-sm cursor-pointer'
              >
                Home
              </li>
              <li
                className='bg-primary text-white px-4 py-1 rounded-sm cursor-pointere'
                onClick={() => navigate('/dashboard/payments')}
              >
                Payments
              </li>
            </div>
            <li>
              <LogoutButton />
            </li>
          </ul>
          <ScrollArea className='h-full px-10 py-4 pb-12'>
            <div className='flex flex-row items-center space-x-5'>
              <h2 className='scroll-m-20 w-max text-2xl font-semibold tracking-tight first:mt-0'>
                Payments
              </h2>
            </div>
          </ScrollArea>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}

export default Payments;
