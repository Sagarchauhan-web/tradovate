import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertsTable } from '../AlertsTable/AlertsTable';
import CreateTrade from '../CreateTrade/CreateTrade';
import Liquidity from '../Liquidity/Liquidity';
import { OrderTable } from '../OrdersTable/OrdersTable';
import TradeCopier from '../TradeCopier/TradeCopier';
import { DataTable } from '../TradeTable/TradeTable';
import { Helmet } from 'react-helmet';

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
    <>
      <Helmet>
        <title>PickMyTrade Dashboard - Manage Your Trades and Settings</title>
        <meta
          name='description'
          content='Access the PickMyTrade dashboard to manage your trades, create settings, set alerts, monitor liquidity, and use the trade copier feature. Enhance your trading experience with our comprehensive tools.'
        />
        <meta
          name='keywords'
          content='PickMyTrade, dashboard, trading settings, trade alerts, liquidity monitoring, trade copier, stock trading, futures trading, Tradovate'
        />
        <meta name='author' content='PickMyTrade' />
        <meta
          property='og:title'
          content='PickMyTrade Dashboard - Manage Your Trades and Settings'
        />
        <meta
          property='og:description'
          content='Access the PickMyTrade dashboard to manage your trades, create settings, set alerts, monitor liquidity, and use the trade copier feature. Enhance your trading experience with our comprehensive tools.'
        />
        <meta property='og:image' content='URL_TO_YOUR_IMAGE' />
        <meta
          property='og:url'
          content='https://www.pickmytrade.com/dashboard'
        />
        <meta name='twitter:card' content='summary_large_image' />
        <meta
          name='twitter:title'
          content='PickMyTrade Dashboard - Manage Your Trades and Settings'
        />
        <meta
          name='twitter:description'
          content='Access the PickMyTrade dashboard to manage your trades, create settings, set alerts, monitor liquidity, and use the trade copier feature. Enhance your trading experience with our comprehensive tools.'
        />
        <meta name='twitter:image' content='URL_TO_YOUR_IMAGE' />
      </Helmet>
      <Tabs value={tabsValue} onValueChange={(value) => setTabsValue(value)}>
        <TabsList className='grid grid-cols-2 px-2 sm:grid-cols-6 min-h-[154px] sm:min-h-[40px]'>
          <TabsTrigger value='create'>
            Create <br className='block sm:hidden' /> Settings
          </TabsTrigger>
          <TabsTrigger value='trades'>Settings</TabsTrigger>
          <TabsTrigger value='orders'>Orders</TabsTrigger>
          <TabsTrigger value='alerts'>Alerts</TabsTrigger>
          <TabsTrigger value='liquidity'>Liquidity</TabsTrigger>
          <TabsTrigger value='createTradeCopier'>Trade Copier</TabsTrigger>
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
        <TabsContent value='createTradeCopier'>
          <TradeCopier />
        </TabsContent>
      </Tabs>
    </>
  );
}

export default Dashboard;
