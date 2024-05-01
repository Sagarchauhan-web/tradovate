import Loader from '@/components/Loader/Loader';
import SomethingWentWrong from '@/components/SomethingWentWrong/SomethingWentWrong';
import Success from '@/components/Success/Success';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { refreshOauthUrl } from '@/services/Auth/auth';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { IoArrowBackOutline } from 'react-icons/io5';
import { MdErrorOutline } from 'react-icons/md';
import { useNavigate, useSearchParams } from 'react-router-dom';

function TokenRefresh() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const [searchParams] = useSearchParams();
  const [error, setError] = useState(false);
  const [code] = useState(searchParams.get('code'));

  console.log(searchParams.get('code'), 'State');

  useEffect(() => {
    if (!code) return;
    const callRefreshUrl = async () => {
      setLoader(true);
      try {
        const response = await refreshOauthUrl(code);
        setError(response.error);

        if (response.error || response instanceof AxiosError) {
          toast({
            className: cn(
              'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
            ),
            duration: 3000,
            position: 'top-center',
            title: 'Something went wrong',
            description: response.data,
            action: <MdErrorOutline className='text-4xl text-red-500' />,
          });
        }
      } catch (error) {
        console.log(error);
      }
      setLoader(false);
    };

    callRefreshUrl();
  }, []);

  return (
    <div className='h-screen flex flex-col'>
      <div className='px-10 py-8'>
        <div className='flex flex-row items-center space-x-5'>
          <Button
            variant='outline'
            className='mt-1.5 gap-2'
            onClick={() => navigate('/dashboard/home')}
          >
            <IoArrowBackOutline />
            Home Page
          </Button>
        </div>
      </div>
      <div className='flex justify-center items-center h-full'>
        <TokenRefresBody loader={loader} error={error} navigate={navigate} />
      </div>
    </div>
  );
}

function TokenRefresBody({ loader, error, navigate }) {
  if (loader) return <Loader />;
  if (error)
    return <SomethingWentWrong goHome={() => navigate('/dashboard/home')} />;

  return <Success goHome={() => navigate('/dashboard/home')} />;
}

export default TokenRefresh;
