import MaxWidthWrapper from '@/components/MaxWithWrapper';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getToken } from '@/services/auth/auth';
import { useEffect } from 'react';
import CreateTrade from '../CreateTrade/CreateTrade';
import { DataTable } from '../TradeTable/TradeTable';

function Dashboard() {
  useEffect(() => {
    console.log(getToken());
    getToken();
  }, []);

  return (
    <div className='h-screen flex flex-col'>
      <div className='h-[200px] bg-[#0086d1] '></div>
      <div className='flex-1 bg-[#e7e8ec]'></div>
      <MaxWidthWrapper>
        <div className='bg-white rounded-sm h-5/6 w-3/4 top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 absolute'>
          <ScrollArea className='h-full px-10 py-8'>
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
