import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEffect, useState } from 'react';
import { AlertsTable } from '../AlertsTable/AlertsTable';
import CreateTrade from '../CreateTrade/CreateTrade';
import { OrderTable } from '../OrdersTable/OrdersTable';
import { DataTable } from '../TradeTable/TradeTable';
import { useNavigate } from 'react-router-dom';
import Liquidity from '../Liquidity/Liquidity';
import TradeCopier from '../TradeCopier/TradeCopier';
// import TradeCopier from '../TradeCopier/TradeCopier';

function Dashboard() {
  const [tabsValue, setTabsValue] = useState('create');
  const [initialDataForSettings, setInitialDataForSettings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/auth');
    }
  }, []);

  return (
    <Tabs value={tabsValue} onValueChange={(value) => setTabsValue(value)}>
      <TabsList className='grid grid-cols-5 min-h-[64px] sm:min-h-[40px]'>
        <TabsTrigger value='create'>
          Create <br className='block sm:hidden' /> Settings
        </TabsTrigger>
        <TabsTrigger value='trades'>Settings</TabsTrigger>
        <TabsTrigger value='orders'>Orders</TabsTrigger>
        <TabsTrigger value='alerts'>Alerts</TabsTrigger>
        <TabsTrigger value='liquidity'>Liquidity</TabsTrigger>
        {/* <TabsTrigger value='createTradeCopier'>Create Trade Copier</TabsTrigger> */}
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
      <TabsContent value='liquidity'>
        <Liquidity />
      </TabsContent>
      {/* <TabsContent value='createTradeCopier'>
        <TradeCopier />
      </TabsContent> */}
    </Tabs>
  );
}

export default Dashboard;
