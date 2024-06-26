import MaxWidthWrapper from '@/components/MaxWithWrapper';
import PaymentCards from '@/components/PaymentCards/PaymentCards';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  getActiveSubscription,
  getActiveSubscriptionCancelled,
  getSubscriptions,
} from '@/services/Payments/payments';
import { useEffect, useState } from 'react';
import { IoArrowBackOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { ImCancelCircle } from 'react-icons/im';
import { me, setAccountUserCoupon } from '@/services/Auth/auth';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { MdErrorOutline } from 'react-icons/md';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';

const options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  timeZone: 'UTC',
};

function Payment() {
  const [subscriptions, setSubscriptions] = useState({});
  const [activeSubscription, setActiveSubscription] = useState([]);
  const [tokenInput, setTokenInput] = useState('');
  const [token, setToken] = useState('');
  const [tabsValue, setTabsValue] = useState('active');

  const getSubscriptionsData = async () => {
    const response = await getSubscriptions();

    if (!response.error) {
      setSubscriptions(response.data);
    }
  };

  const getActiveSubscriptionAction = async () => {
    const response = await getActiveSubscription();

    if (!response.error) {
      setActiveSubscription(response.data);
    }
  };

  const getActiveSubscriptionCancelledAction = async () => {
    const response = await getActiveSubscriptionCancelled();

    if (!response.error) {
      toast({
        className: cn(
          'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
        ),
        duration: 1000,
        position: 'top-center',
        title: 'Success',
        action: <IoIosCheckmarkCircle className='text-4xl text-green-500' />,
      });
      getSubscriptionsData();
    }
  };

  useEffect(() => {
    getSubscriptionsData();
    getActiveSubscriptionAction();
  }, []);

  useEffect(() => {
    const initialTokenCheck = async () => {
      const response = await getUserCoupon();

      if (response) {
        setToken(response);
      }
    };
    initialTokenCheck();
  }, []);

  const getUserCoupon = async () => {
    const response = await me();
    return response.data.discount_code;
  };

  const setAccountUserCouponAction = async (code) => {
    const body = { code };
    const response = await setAccountUserCoupon(body);

    if (!response.error) {
      console.log(response);
      toast({
        className: cn(
          'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
        ),
        duration: 1000,
        position: 'top-center',
        title: 'Success',
        action: <IoIosCheckmarkCircle className='text-4xl text-green-500' />,
      });
      setToken(await getUserCoupon());
      getSubscriptionsData();
    } else {
      toast({
        className: cn(
          'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
        ),
        duration: 1000,
        position: 'top-center',
        title: 'Error',
        description: response.data,
        action: <MdErrorOutline className='text-4xl text-red-500' />,
      });
    }
  };

  return (
    <div className='flex h-full flex-col'>
      <Tabs value={tabsValue} onValueChange={(value) => setTabsValue(value)}>
        <TabsList className='grid grid-cols-2'>
          <TabsTrigger value='active'>Active</TabsTrigger>
          <TabsTrigger value='all'>All Plans</TabsTrigger>
        </TabsList>

        <TabsContent value='active'>
          <MaxWidthWrapper>
            <div className='h-full px-10 py-8'>
              <div className='flex flex-row h-full w-full items-center justify-between space-x-5'>
                <div className='flex flex-row h-full w-full items-center space-x-5'>
                  <h2 className='text-center w-full text-2xl font-semibold tracking-tight first:mt-0'>
                    Active Plan
                  </h2>
                </div>
              </div>

              {activeSubscription.length ? (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto p-6 md:p-10'>
                  <div className='bg-white rounded-lg shadow-md dark:bg-gray-800 dark:text-gray-50 p-6 space-y-8'>
                    <div className='flex items-center justify-between'>
                      <h2 className='text-xl font-semibold'>
                        Billing Information
                      </h2>
                      {/* <Button variant='outline' size='sm'>
                    Update
                  </Button> */}
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                      <div>
                        <p className='text-gray-500 dark:text-gray-400'>
                          Last Payment
                        </p>
                        <p className='text-2xl font-semibold'>
                          {
                            activeSubscription[0].billing_info.last_payment
                              .amount.currency_code
                          }{' '}
                          {
                            activeSubscription[0].billing_info.last_payment
                              .amount.value
                          }
                        </p>
                      </div>
                      <div>
                        <p className='text-gray-500 dark:text-gray-400'>
                          Last Payment Date
                        </p>
                        <p className='text-2xl font-semibold'>
                          {format(
                            new Date(
                              activeSubscription[0].billing_info.last_payment.time,
                            ),
                            'MMMM d, yyyy',
                          )}
                        </p>
                      </div>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                      <div>
                        <p className='text-gray-500 dark:text-gray-400'>
                          Next Billing Date
                        </p>
                        <p className='text-2xl font-semibold'>
                          {format(
                            new Date(
                              activeSubscription[0].billing_info.next_billing_time,
                            ),
                            'MMMM d, yyyy',
                          )}
                        </p>
                      </div>
                      <div>
                        <p className='text-gray-500 dark:text-gray-400'>
                          Start Time
                        </p>
                        <p className='text-2xl font-semibold'>
                          {format(
                            new Date(activeSubscription[0].start_time),
                            'MMMM d, yyyy',
                          )}
                        </p>
                      </div>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                      <div>
                        <p className='text-gray-500 dark:text-gray-400'>
                          Subscriber
                        </p>
                        <p className='text-lg font-medium'>
                          {activeSubscription[0].subscriber.name.given_name}{' '}
                          {activeSubscription[0].subscriber.name.surname}
                        </p>
                        <p className='text-gray-500 dark:text-gray-400'>
                          {activeSubscription[0].subscriber.email_address}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='bg-white rounded-lg shadow-md dark:bg-gray-800 dark:text-gray-50 p-6 space-y-8'>
                    <div className='flex items-center justify-between'>
                      <h2 className='text-xl font-semibold'>
                        Subscription Plan
                      </h2>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() => getActiveSubscriptionCancelledAction()}
                      >
                        Cancel Subscription
                      </Button>
                    </div>
                    <div className='grid'>
                      <div>
                        <p className='text-gray-500 dark:text-gray-400'>
                          Plan ID
                        </p>
                        <p className='text-lg font-medium w-full'>
                          {activeSubscription[0].plan_id}
                        </p>
                      </div>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                      <div>
                        <p className='text-gray-500 dark:text-gray-400'>
                          Shipping
                        </p>
                        <p className='text-lg font-medium'>
                          {activeSubscription[0].shipping_amount.currency_code}{' '}
                          {activeSubscription[0].shipping_amount.value}
                        </p>
                      </div>
                      <div>
                        <p className='text-gray-500 dark:text-gray-400'>
                          Status
                        </p>
                        <p className='text-lg font-medium'>
                          {activeSubscription[0].status}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className='mx-auto w-full mt-5 max-w-md rounded-lg border border-gray-200 bg-white p-8 shadow-md dark:border-gray-800 dark:bg-gray-900'>
                  <div className='space-y-4'>
                    <div className='text-center'>
                      <h1 className='text-3xl font-bold text-gray-900 dark:text-gray-50'>
                        No Active Plan
                      </h1>
                      <p className='mt-2 text-gray-500 dark:text-gray-400'>
                        You currently don't have an active subscription plan.
                      </p>
                    </div>

                    <div className='text-center'>
                      <Button
                        className='w-full'
                        onClick={() => setTabsValue('all')}
                      >
                        Subscribe to a Plan
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </MaxWidthWrapper>
        </TabsContent>
        <TabsContent value='all'>
          <MaxWidthWrapper>
            <div className='h-full px-10 py-8'>
              <div className='flex flex-row h-full w-full items-center justify-between space-x-5'>
                <div className='flex flex-row h-full  items-center  space-x-5'>
                  {/* <Button
                    variant='outline'
                    className='mt-1.5'
                    onClick={() => navigate(-1)}
                  >
                    <IoArrowBackOutline />
                  </Button> */}
                  <h2 className='scroll-m-20 w-max text-2xl font-semibold tracking-tight first:mt-0'>
                    Prices
                  </h2>
                </div>
                <div className='flex flex-row h-full items-center space-x-5'>
                  {!token ? (
                    <>
                      <Input
                        className='min-w-44'
                        placeholder='Enter the coupon code'
                        onChange={(e) => {
                          setTokenInput(e.target.value);
                        }}
                      />
                      <Button
                        className='w-full'
                        onClick={() => setAccountUserCouponAction(tokenInput)}
                      >
                        Apply
                      </Button>
                    </>
                  ) : (
                    <Badge
                      className={'rounded-sm text-base cursor-pointer'}
                      variant={'secondary'}
                      onClick={() => setAccountUserCouponAction('')}
                    >
                      Coupon Applied: {token + '   '}
                      <ImCancelCircle className='ml-2' />
                    </Badge>
                  )}
                </div>
              </div>

              <div className='h-full my-20'>
                {Object.values(subscriptions).length ? (
                  <PaymentCards subscriptions={subscriptions} />
                ) : (
                  ''
                )}
              </div>
            </div>
          </MaxWidthWrapper>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Payment;
