import { Auth } from './pages/Auth/Auth';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import TradeDetails from './pages/TradeDetails/TradeDetails';
import Payments from './pages/Payments/Payments';
import TokenRefresh from './pages/TokenRefresh/TokenRefresh';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path='/dashboard/home' element={<Dashboard />} />
        <Route path='/dashboard/tradedetails' element={<TradeDetails />} />
        <Route path='/dashboard/payments' element={<Payments />} />
        <Route path='/oauth/tradovate/callback' element={<TokenRefresh />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
