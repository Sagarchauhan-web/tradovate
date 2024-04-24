import MaxWidthWrapper from '@/components/MaxWithWrapper';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CreateTrade from '../CreateTrade/CreateTrade';
import { DataTable } from '../TradeTable/TradeTable';
import Navbar from '@/components/Navbar/Navbar';
import { OrderTable } from '../OrdersTable/OrdersTable';
import { AlertsTable } from '../AlertsTable/AlertsTable';

function Dashboard() {
  return (
    <div className='h-screen flex flex-col'>
      <MaxWidthWrapper>
        <Navbar />
        <ScrollArea className='h-full px-10 py-4 pb-12'>
          <Tabs defaultValue='trades' className='w-full'>
            <TabsList className='grid grid-cols-4'>
              <TabsTrigger value='create'>Create Settings</TabsTrigger>
              <TabsTrigger value='trades'>Settings</TabsTrigger>
              <TabsTrigger value='orders'>Orders</TabsTrigger>
              <TabsTrigger value='alerts'>Alerts</TabsTrigger>
            </TabsList>
            <TabsContent value='create'>
              <CreateTrade />
            </TabsContent>
            <TabsContent value='trades'>
              <DataTable />
            </TabsContent>
            <TabsContent value='orders'>
              <OrderTable />
            </TabsContent>
            <TabsContent value='alerts'>
              <AlertsTable />
            </TabsContent>
          </Tabs>
        </ScrollArea>
      </MaxWidthWrapper>
    </div>
  );
}

export default Dashboard;
