import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getPaypalOrderInit } from '@/services/Payments/payments';
import OverlapLoader from '../Loader/OverlapLoader';
import { useState } from 'react';

export default function PaymentCards({
  subscriptions,
  isFromHomePage,
  transferToLogin,
}) {
  const [loader, setLoader] = useState(false);
  const firstPaymentCard = subscriptions?.anb1234;
  const secondPaymentCard = subscriptions?.bf5jhg;

  const initiateOrder = async (paymentInfo, key) => {
    if (isFromHomePage) {
      transferToLogin();
      return;
    }
    const payload = { subscription_id: key };
    console.log(payload, 'payload');
    setLoader(true);
    const response = await getPaypalOrderInit(payload);
    setLoader(false);

    if (!response.error) {
      window.location.replace(response.data);
    }
  };

  return (
    <OverlapLoader loader={loader}>
      <div className='flex items-center justify-center p-4'>
        {/* <Dialog open={dialogBox} onOpenChange={setDialogBox}>
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
                    Please Make a payment of {curentlySelected?.currency}{' '}
                    {curentlySelected?.real_amount} at Paypal address{' '}
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
          </Dialog> */}
        <div className='grid w-full max-w-2xl grid-cols-1 gap-6 md:grid-cols-2'>
          {/* <Card className='col-span-2'>
            <CardHeader>Current Plan</CardHeader>
          </Card> */}
          <Card className='bg-white h-max self-end shadow-lg'>
            <CardHeader className='bg-[#F8F8FC] m-5 rounded-sm'>
              <CardTitle className='text-2xl font-normal'>Standard</CardTitle>
              <div className='text-4xl font-semibold pt-4'>
                {firstPaymentCard.currency + ' '}
                {firstPaymentCard.real_amount}
                <CardDescription className=' inline font-normal'>
                  /{' ' + firstPaymentCard.expiry_day} days
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center gap-3'>
                <div className='bg-[#f8f8fc] p-1.5 rounded-full'>
                  <CheckIcon className='h-5 w-5 text-primary ' />
                </div>{' '}
                <span>Unlimited Settings</span>
              </div>
              <div className='flex items-center gap-3'>
                <div className='bg-[#f8f8fc] p-1.5 rounded-full'>
                  <CheckIcon className='h-5 w-5 text-primary ' />
                </div>{' '}
                <span>24/7 support</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => initiateOrder(firstPaymentCard, 'anb1234')}
                className='w-full
              shadow-md rounded-full hover:translate-y-[-5px] transition-all hover:shadow-xl'
              >
                Choose this plan
              </Button>
            </CardFooter>
          </Card>
          <Card className='bg-white shadow-lg'>
            <CardHeader className='bg-[#0086D1] m-5 text-white rounded-sm'>
              <CardTitle className='text-2xl font-normal'>Premium</CardTitle>
              <div className='text-4xl font-semibold py-4'>
                {secondPaymentCard.currency + ' '}
                {secondPaymentCard.real_amount}
                <CardDescription className='text-white inline font-normal'>
                  /
                  {' ' + secondPaymentCard.expiry_day >= 365
                    ? `${secondPaymentCard.expiry_day / 365} year`
                    : `${secondPaymentCard.expiry_day} days`}{' '}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='flex items-center gap-3'>
                <div className='bg-[#f8f8fc] p-1.5 rounded-full'>
                  <CheckIcon className='h-5 w-5 text-primary ' />
                </div>
                <span>Unlimited Settings</span>
              </div>
              <div className='flex items-center gap-3'>
                <div className='bg-[#f8f8fc] p-1.5 rounded-full'>
                  <CheckIcon className='h-5 w-5 text-primary ' />
                </div>{' '}
                <span>Unlimited Trades</span>
              </div>
              <div className='flex items-center gap-3'>
                <div className='bg-[#f8f8fc] p-1.5 rounded-full'>
                  <CheckIcon className='h-5 w-5 text-primary ' />
                </div>{' '}
                <span>24/7 support</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => initiateOrder(secondPaymentCard, 'bf5jhg')}
                className='w-full
              shadow-md rounded-full hover:translate-y-[-5px] transition-all hover:shadow-xl'
              >
                Choose this plan
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </OverlapLoader>
  );
}

function CheckIcon(props) {
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
      <path d='M20 6 9 17l-5-5' />
    </svg>
  );
}
