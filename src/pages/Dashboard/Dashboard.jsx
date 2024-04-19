import MaxWidthWrapper from '@/components/MaxWithWrapper';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getToken } from '@/services/auth/auth';
import { useEffect } from 'react';
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
                {/* <div className='flex justify-between items-center'> */}
                <h2 className='scroll-m-20 w-max text-2xl pt-4  font-semibold tracking-tight first:mt-0'>
                  Trades
                </h2>
                {/* <div className='space-x-2'>
                    <Button>Add New</Button>
                    <Button>Save</Button>
                  </div>
                </div> */}

                <DataTable />
              </TabsContent>
              <TabsContent value='create'>
                <Card>
                  <CardContent className='space-y-2'>
                    <div className='space-y-1'>
                      <Label htmlFor='current'>Current password</Label>
                      <Input id='current' type='password' />
                    </div>
                    <div className='space-y-1'>
                      <Label htmlFor='new'>New password</Label>
                      <Input id='new' type='password' />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </ScrollArea>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}

export default Dashboard;
