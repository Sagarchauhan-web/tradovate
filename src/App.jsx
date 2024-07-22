import { Auth } from './pages/Auth/Auth';
import {
  HashRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import TradeDetails from './pages/TradeDetails/TradeDetails';
import TokenRefresh from './pages/TokenRefresh/TokenRefresh';
import Documentation from './pages/Documentation/Documentation';
import { DashboardLayout } from './layout/DashboardLayout/DashboardLayout';
import Payment from './pages/Payment/Payment';
import ResetPassword from './pages/Auth/ResetPassword';
import Landing from './pages/Landing/Landing';
import PaymentSuccess from './pages/Payment/PaymentSuccess';
import PaymentFailed from './pages/Payment/PaymentFailed';
import { useEffect } from 'react';
import MailVerification from './pages/Auth/MailVerification';
import TradovateAutomation from './pages/TradovateAutomation/TradovateAutomation';

function NotFoundPage() {
  const navigate = useNavigate();
  const path = useLocation();

  useEffect(() => {
    if (path.pathname.includes('/paymentsuccess')) {
      navigate('/dashboard/paymentsuccess');
    } else {
      navigate('/dashboard/paymentfailed');
    }
  }, []);

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div className='space-y-4 text-center'>
        <h1 className='text-4xl font-bold'>404 - Page Not Found</h1>
        <p className='text-gray-500 text-lg'>
          Oops, the page you&apos;re looking for doesn&apos;t exist.
        </p>
        <div
          onClick={() => navigate('/dashboard/home')}
          className='inline-flex items-center justify-center h-10 px-6 rounded-md bg-gray-900 text-gray-50 font-medium transition-colors hover:bg-gray-900/90 focus:outline-none focus:ring-1 focus:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus:ring-gray-300'
        >
          Go to Homepage
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route exact path='/' element={<Landing />} />
        <Route
          exact
          path='/tradovateautomation'
          element={<TradovateAutomation />}
        />
        <Route exact path='/auth' element={<Auth />} />
        <Route exact path='/documentation' element={<Documentation />} />
        <Route
          exact
          path='/oauth/tradovate/callback'
          element={<TokenRefresh />}
        />
        <Route exact path='/reset/password' element={<ResetPassword />} />
        <Route exact path='/mail_verified' element={<MailVerification />} />
        <Route exact path='/dashboard' element={<DashboardLayout />}>
          <Route exact path='/dashboard/home' element={<Dashboard />} />
          <Route
            exact
            path='/dashboard/tradedetails'
            element={<TradeDetails />}
          />
          <Route exact path='/dashboard/payment' element={<Payment />} />
          <Route
            exact
            path='/dashboard/paymentsuccess'
            element={<PaymentSuccess />}
          />
          <Route
            exact
            path='/dashboard/paymentfailed'
            element={<PaymentFailed />}
          />
        </Route>
        <Route path='*' element={<NotFoundPage />} />{' '}
      </Routes>
    </HashRouter>
  );
}

export default App;
