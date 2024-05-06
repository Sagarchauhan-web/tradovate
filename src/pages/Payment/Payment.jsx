import MaxWidthWrapper from '@/components/MaxWithWrapper';
import PaymentCards from '@/components/PaymentCards/PaymentCards';
import { Button } from '@/components/ui/button';
import { getSubscriptions } from '@/services/Payments/payments';
import { useEffect, useState } from 'react';
import { IoArrowBackOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

function Payment() {
  const navigate = useNavigate();
  const [subscriptions, setSubscriptions] = useState({});

  useEffect(() => {
    const getSubscriptionsData = async () => {
      const response = await getSubscriptions();

      if (!response.error) {
        // console.log(
        //   Object.entries(response.data).map(([key, value]) =>
        //     console.log(key, value),
        //   ),
        //   'response',
        // );
        // console.log(response.data);
        setSubscriptions(response.data);
      }
    };
    getSubscriptionsData();
  }, []);

  return (
    <div className='flex h-full flex-col bg-[#f5f5f5]'>
      <MaxWidthWrapper>
        <div className='h-full px-10 py-8'>
          <div className='flex flex-row h-full items-center space-x-5'>
            <Button
              variant='outline'
              className='mt-1.5'
              onClick={() => navigate(-1)}
            >
              <IoArrowBackOutline />
            </Button>
            <h2 className='scroll-m-20 w-max text-2xl font-semibold tracking-tight first:mt-0'>
              Prices
            </h2>
          </div>

          <div className='h-full my-20'>
            {Object.values(subscriptions).length && (
              <PaymentCards subscriptions={subscriptions} />
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}

export default Payment;
