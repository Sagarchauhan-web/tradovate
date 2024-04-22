import LogoutButton from '@/components/LogoutButton/LogoutButton';
import MaxWidthWrapper from '@/components/MaxWithWrapper';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import CreateTrade from '../CreateTrade/CreateTrade';
import { DataTable } from '../TradeTable/TradeTable';
import ConnectionNotifier from '@/components/ConnectionNotifier/ConnectionNotifier';

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className='h-screen flex flex-col'>
      <div className='h-[500px] bg-primary '></div>
      <div className='flex-1 bg-[#e7e8ec]'></div>
      <MaxWidthWrapper>
        <div className='bg-white rounded-sm h-[85%] w-3/4 top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 absolute'>
          <ul className='flex justify-between items-center px-10 py-[8px] border-b'>
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
                <ConnectionNotifier />
              </li>
              <li>
                <LogoutButton />
              </li>
            </div>
          </ul>
          <ScrollArea className='h-full px-10 py-4 pb-12'>
            <Tabs defaultValue='trades' className='w-full'>
              <TabsList className='grid w-[400px] grid-cols-2'>
                <TabsTrigger value='trades'>Trades</TabsTrigger>
                <TabsTrigger value='create'>Create Trade</TabsTrigger>
              </TabsList>
              <TabsContent value='trades'>
                <DataTable />
              </TabsContent>
              <TabsContent value='create'>
                <CreateTrade />
              </TabsContent>
            </Tabs>
          </ScrollArea>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}

export default Dashboard;
