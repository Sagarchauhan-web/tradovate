import MaxWidthWrapper from '@/components/MaxWithWrapper';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CreateTrade from '../CreateTrade/CreateTrade';
import { DataTable } from '../TradeTable/TradeTable';
import Navbar from '@/components/Navbar/Navbar';
import { OrderTable } from '../OrdersTable/OrdersTable';
import { AlertsTable } from '../AlertsTable/AlertsTable';
import { useState } from 'react';
import Footer from '@/components/Footer/Footer';

function Dashboard() {
  const [tabsValue, setTabsValue] = useState('create');
  const [initialDataForSettings, setInitialDataForSettings] = useState([]);

  return (
    <div className='h-screen flex flex-col'>
      <MaxWidthWrapper>
        <Navbar />
        <ScrollArea className='h-full px-10 py-4'>
          <Tabs
            value={tabsValue}
            className='w-full'
            onValueChange={(value) => setTabsValue(value)}
          >
            <TabsList className='grid grid-cols-4'>
              <TabsTrigger value='create'>Create Settings</TabsTrigger>
              <TabsTrigger value='trades'>Settings</TabsTrigger>
              <TabsTrigger value='orders'>Orders</TabsTrigger>
              <TabsTrigger value='alerts'>Alerts</TabsTrigger>
            </TabsList>
            <TabsContent value='create'>
              <CreateTrade
                goToSettings={() => setTabsValue('trades')}
                initialDataForSettings={initialDataForSettings}
                setInitialDataForSettings={setInitialDataForSettings}
              />
            </TabsContent>
            <TabsContent value='trades'>
              <DataTable
                changeToEditMode={(data) => {
                  setTabsValue('create');
                  setInitialDataForSettings(data);
                }}
              />
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
      <Footer />
    </div>
  );
}

export default Dashboard;
