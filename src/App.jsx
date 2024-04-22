import { Auth } from './pages/Auth/Auth';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import TradeDetails from './pages/TradeDetails/TradeDetails';
import Payments from './pages/Payments/Payments';

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        index: true,
        element: <Auth />,
      },
      {
        path: 'dashboard/home',
        element: <Dashboard />,
      },
      {
        path: 'dashboard/tradedetails',
        element: <TradeDetails />,
      },
      {
        path: 'dashboard/payments',
        element: <Payments />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
