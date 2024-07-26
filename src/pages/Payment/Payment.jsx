import MaxWidthWrapper from '@/components/MaxWithWrapper';
import PaymentCards from '@/components/PaymentCards/PaymentCards';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  getActiveSubscription,
  getActiveSubscriptionCancelled,
  getPaymentRefereshed,
  getSubscriptions,
} from '@/services/Payments/payments';
import { useEffect, useState } from 'react';
import { ImCancelCircle } from 'react-icons/im';
import { me, setAccountUserCoupon } from '@/services/Auth/auth';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { MdErrorOutline } from 'react-icons/md';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import OverlapLoader from '@/components/Loader/OverlapLoader';
import { FaInfoCircle } from 'react-icons/fa';
import { TooltipComp } from '@/components/ToolTip/ToolTip';
import { Helmet } from 'react-helmet';

function Payment() {
  const [subscriptions, setSubscriptions] = useState({});
  const [activeSubscription, setActiveSubscription] = useState([]);
  const [tokenInput, setTokenInput] = useState('');
  const [token, setToken] = useState('');
  const [tabsValue, setTabsValue] = useState('active');
  const [dialogBox, setDialogBox] = useState(false);
  const [activePlanLoader, setActivePlanLoader] = useState(false);
  const [paymentDataRefreshLoader, setPaymentDataRefreshLoader] =
    useState(false);

  const getSubscriptionsData = async () => {
    const response = await getSubscriptions();

    if (!response.error) {
      setSubscriptions(response.data);
    }
  };

  const getRefreshPaymentData = async () => {
    setPaymentDataRefreshLoader(true);
    const response = await getPaymentRefereshed();

    console.log(response, 'getPaymentRefereshed');

    if (!response.error) {
      console.log('here');
    }
    setPaymentDataRefreshLoader(false);
  };

  const getActiveSubscriptionAction = async () => {
    setActivePlanLoader(true);

    const response = await getActiveSubscription();

    if (!response.error) {
      setActiveSubscription(response.data);
      setActivePlanLoader(false);
    }
    setActivePlanLoader(false);
  };

  const getActiveSubscriptionCancelledAction = async () => {
    setActivePlanLoader(true);
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
      getActiveSubscriptionAction();
      setActivePlanLoader(false);
    }
    setActivePlanLoader(false);
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
      <Helmet>
        <title>PickMyTrade - Secure Payment</title>
        <meta
          name='description'
          content='Complete your payment securely on PickMyTrade. Manage your subscriptions and transactions with ease and confidence.'
        />
        <meta
          name='keywords'
          content='PickMyTrade, payment, secure payment, subscriptions, transactions, stock trading, futures trading, Tradovate'
        />
        <meta name='author' content='PickMyTrade' />
        <meta property='og:title' content='PickMyTrade - Secure Payment' />
        <meta
          property='og:description'
          content='Complete your payment securely on PickMyTrade. Manage your subscriptions and transactions with ease and confidence.'
        />
        <meta property='og:image' content='URL_TO_YOUR_IMAGE' />
        <meta property='og:url' content='https://www.pickmytrade.com/payment' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content='PickMyTrade - Secure Payment' />
        <meta
          name='twitter:description'
          content='Complete your payment securely on PickMyTrade. Manage your subscriptions and transactions with ease and confidence.'
        />
        <meta name='twitter:image' content='URL_TO_YOUR_IMAGE' />
      </Helmet>
      {activeSubscription.length <= 0 && <BottomPopup />}
      <Dialog open={dialogBox} onOpenChange={setDialogBox}>
        <DialogContent className='sm:max-w-[525px] p-5'>
          <DialogHeader>
            <main className='flex flex-col items-center justify-center p-10 bg-gray-100 dark:bg-gray-900 px-4 md:px-6'>
              <div className='max-w-md w-full space-y-6'>
                <div className='text-center'>
                  <h1 className='text-3xl font-bold text-gray-900 dark:text-gray-100'>
                    Payment
                  </h1>
                </div>
                <Card className='bg-white dark:bg-gray-800 shadow-md rounded-lg p-6'>
                  <p>
                    If your facing any issue with payment.Please Make a payment
                    of at Paypal address{' '}
                    <a
                      href='https://paypal.me/bhavishyagoyal'
                      className={'text-blue-500 cursor-pointer'}
                    >
                      @bhavisyagoyal
                    </a>
                  </p>{' '}
                  <br />
                  <p>
                    Once payment done please send message on whatsapp{' '}
                    <a
                      href='https://wa.me/+917838873492'
                      className={'text-blue-500 cursor-pointer'}
                    >
                      +91 7838873492
                    </a>
                  </p>
                </Card>
              </div>
            </main>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Tabs value={tabsValue} onValueChange={(value) => setTabsValue(value)}>
        <TabsList className='grid grid-cols-2'>
          <TabsTrigger value='active'>Active</TabsTrigger>
          <TabsTrigger value='all'>All Plans</TabsTrigger>
        </TabsList>

        <TabsContent value='active'>
          <OverlapLoader loader={activePlanLoader}>
            <MaxWidthWrapper>
              <div className='h-full sm:px-10 py-8'>
                <div className='flex flex-row h-full w-full items-center justify-between space-x-5'>
                  <div className='flex flex-row h-full w-full items-center space-x-5'>
                    <div className='flex sm:flex-row flex-col h-full w-full items-center justify-between space-x-5'>
                      <div className='flex flex-row h-full  items-center  space-x-5'>
                        <h2 className='text-center w-full mb-4 sm:mb-0 text-2xl font-semibold tracking-tight first:mt-0'>
                          Active Plan
                        </h2>
                      </div>
                      <div className='flex flex-row h-full items-center space-x-2'>
                        <TooltipComp
                          button={
                            <FaInfoCircle
                              fontSize={24}
                              className='font-bold text-yellow-500'
                            />
                          }
                          tooltip={
                            'Refreshing Payment Details Might take up to 15 minutes to Refresh Details'
                          }
                        />
                        <OverlapLoader loader={paymentDataRefreshLoader}>
                          <Button
                            className='w-full'
                            onClick={() => getRefreshPaymentData()}
                          >
                            Refresh Payment Details
                          </Button>
                        </OverlapLoader>
                      </div>
                    </div>
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
                                activeSubscription[0]?.billing_info?.next_billing_time,
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
                          You currently don&apos;t have an active subscription
                          plan.
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
          </OverlapLoader>
        </TabsContent>
        <TabsContent value='all'>
          <MaxWidthWrapper>
            <div className='h-full sm:px-10 sm:py-8'>
              <div className='flex flex-col sm:flex-row h-full w-full items-center justify-between space-x-5'>
                <div className='flex flex-row h-full items-center space-x-5 mb-4 sm:mb-0'>
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
                <div className='flex sm:flex-row flex-col h-full items-center sm:space-x-5'>
                  <div className='border border-gray-200 p-2 mb-4 sm:mb-0'>
                    <p
                      className='min-w-48 cursor-pointer text-primary '
                      onClick={() => setDialogBox(true)}
                    >
                      Payment issue? click here
                    </p>
                  </div>
                  {!token ? (
                    <>
                      <Input
                        className='min-w-44 mb-2 sm:mb-0'
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

function BottomPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [userName, setUserName] = useState('sagar');

  useEffect(() => {
    const interval = setInterval(() => {
      setShowPopup(true);
      setUserName(getRandomUserName());
      setTimeout(() => {
        setShowPopup(false);
      }, 30000);
    }, 500000);
    return () => clearInterval(interval);
  }, []);

  function getRandomUserName() {
    const names = [
      'John Doe',
      'Jane Smith',
      'Michael Johnson',
      'Emily Davis',
      'David Lee',
      'Sarah Brown',
      'James Wilson',
      'Linda Martinez',
      'Robert Anderson',
      'Patricia Taylor',
      'Charles Thomas',
      'Barbara Jackson',
      'Christopher White',
      'Susan Harris',
      'Daniel Martin',
      'Jessica Thompson',
      'Matthew Garcia',
      'Karen Martinez',
      'Anthony Robinson',
      'Nancy Clark',
      'Mark Rodriguez',
      'Lisa Lewis',
      'Paul Walker',
      'Betty Hall',
      'Steven Allen',
      'Sandra Young',
      'Andrew King',
      'Donna Wright',
      'Joshua Scott',
      'Carol Green',
      'Kevin Adams',
      'Michelle Baker',
      'Brian Gonzalez',
      'Dorothy Nelson',
      'George Carter',
      'Amanda Mitchell',
      'Edward Perez',
      'Helen Roberts',
      'Ronald Turner',
      'Kimberly Phillips',
      'Timothy Campbell',
      'Deborah Parker',
      'Jason Evans',
      'Stephanie Edwards',
      'Jeffrey Collins',
      'Rebecca Stewart',
      'Ryan Sanchez',
      'Laura Morris',
      'Jacob Rogers',
      'Cynthia Reed',
      'Gary Cook',
      'Kathleen Morgan',
      'Nicholas Bell',
      'Amy Murphy',
      'Eric Bailey',
      'Shirley Rivera',
      'Jonathan Cooper',
      'Angela Richardson',
      'Larry Cox',
      'Melissa Howard',
      'Scott Ward',
      'Brenda Torres',
      'Frank Peterson',
      'Pamela Gray',
      'Justin Ramirez',
      'Virginia James',
      'Brandon Watson',
      'Katherine Brooks',
      'Raymond Kelly',
      'Ruth Sanders',
      'Gregory Price',
      'Maria Bennett',
      'Benjamin Wood',
      'Frances Barnes',
      'Samuel Ross',
      'Evelyn Henderson',
      'Patrick Coleman',
      'Martha Jenkins',
      'Alexander Perry',
      'Diane Powell',
      'Jack Long',
      'Alice Patterson',
      'Dennis Hughes',
      'Julie Flores',
      'Jerry Washington',
      'Megan Butler',
      'Tyler Simmons',
      'Gloria Foster',
      'Aaron Gonzales',
      'Teresa Bryant',
      'Henry Alexander',
      'Sara Russell',
      'Douglas Griffin',
      'Janet Diaz',
      'Adam Hayes',
      'Carolyn Myers',
      'Nathan Ford',
      'Rachel Hamilton',
      'Zachary Graham',
      'Marilyn Fisher',
    ];
    return names[Math.floor(Math.random() * names.length)];
  }

  if (!showPopup) {
    return null;
  }

  return (
    <div
      className={`fixed bottom-32 sm:bottom-16 right-2 z-50  sm:w-96 sm:animate-bounce`}
    >
      <div className='shadow-lg rounded-xl p-4'>
        <div className='flex items-center'>
          <div className='bg-primary rounded-full w-8 h-8 flex items-center justify-center text-primary-foreground mr-3'>
            <ShoppingCartIcon className='h-5 w-5' />
          </div>
          <div>
            <p className='text-sm font-medium'>
              {userName} purchased a montly plan.
            </p>
            <p className='text-xs text-muted-foreground'>Just now!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShoppingCartIcon(props) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <circle cx='8' cy='21' r='1' />
      <circle cx='19' cy='21' r='1' />
      <path d='M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12' />
    </svg>
  );
}
