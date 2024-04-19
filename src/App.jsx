import { Auth } from './pages/Auth/Auth';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import TradeDetails from './pages/TradeDetails/TradeDetails';

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        index: true,
        element: <Auth />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'dashboard/tradedetails',
        element: <TradeDetails />,
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
