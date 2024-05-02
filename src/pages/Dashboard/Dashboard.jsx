import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/Navbar/Navbar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';
import { AlertsTable } from '../AlertsTable/AlertsTable';
import CreateTrade from '../CreateTrade/CreateTrade';
import { OrderTable } from '../OrdersTable/OrdersTable';
import { DataTable } from '../TradeTable/TradeTable';

function Dashboard() {
  const [tabsValue, setTabsValue] = useState('create');
  const [initialDataForSettings, setInitialDataForSettings] = useState([]);

  return (
    <Tabs value={tabsValue} onValueChange={(value) => setTabsValue(value)}>
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
  );
}

export default Dashboard;
