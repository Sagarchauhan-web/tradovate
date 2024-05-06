import { Auth } from './pages/Auth/Auth';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import TradeDetails from './pages/TradeDetails/TradeDetails';
import TokenRefresh from './pages/TokenRefresh/TokenRefresh';
import Documentation from './pages/Documentation/Documentation';
import { DashboardLayout } from './layout/DashboardLayout/DashboardLayout';
import Payment from './pages/Payment/Payment';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path='/' element={<DashboardLayout />}>
          <Route path='/dashboard/home' element={<Dashboard />} />
          <Route path='/dashboard/documentation' element={<Documentation />} />
          <Route path='/dashboard/tradedetails' element={<TradeDetails />} />
          <Route path='/dashboard/payment' element={<Payment />} />
        </Route>
        <Route path='/oauth/tradovate/callback' element={<TokenRefresh />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
