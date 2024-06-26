import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';

export function DashboardLayout() {
  return (
    <div className='h-full min-h-[100vh] flex flex-col'>
      <div className='flex-1'>
        <Navbar />
        <div className='h-full px-10 py-4 '>
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}
