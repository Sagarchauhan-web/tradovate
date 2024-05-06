import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getOrderInit } from '@/services/Payments/payments';

export default function PaymentCards({ subscriptions }) {
  const firstPaymentCard = subscriptions?.anb1234;
  const secondPaymentCard = subscriptions?.bf5jhg;

  const initiateOrder = async (paymentInfo, key) => {
    const user = JSON.parse(localStorage.getItem('user'));

    const payload = { email: user.username, subscription_id: key };
    const response = await getOrderInit(payload);
    console.log(response, 'order response', payload);

    if (!response.error) {
      setTimeout(() => {
        callRazorpay(response, key, user.username);
      }, 5000);
    }
  };

  const callRazorpay = (response, key, email) => {
    var options = {
      key: response.razorpay_key, // Enter the Key ID generated from the Dashboard
      subscription_id: key, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      name: email,
      description: 'Test Transaction',
      image: 'https://example.com/your_logo',
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name: 'PickMyTrade',
        email: email,
        contact: '9896063832',
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#3399cc',
      },
    };
    // eslint-disable-next-line no-undef
    var rzp1 = new Razorpay(options);
    rzp1.open();
    // rzp1.on('payment.failed', function (response) {
    //   alert(response.error.code);
    //   alert(response.error.description);
    //   alert(response.error.source);
    //   alert(response.error.step);
    //   alert(response.error.reason);
    //   alert(response.error.metadata.order_id);
    //   alert(response.error.metadata.payment_id);
    // });
  };

  return (
    <div className='flex items-center justify-center bg-[#f5f5f5] p-4'>
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
            <div className='flex items-center gap-3'>
              <div className='bg-[#f8f8fc] p-1.5 rounded-full'>
                <CheckIcon className='h-5 w-5 text-primary ' />
              </div>{' '}
              <span>5GB storage</span>
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
                /{' ' + secondPaymentCard.expiry_day} days
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
            <div className='flex items-center gap-3'>
              <div className='bg-[#f8f8fc] p-1.5 rounded-full'>
                <CheckIcon className='h-5 w-5 text-primary ' />
              </div>{' '}
              <span>50GB storage</span>
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
