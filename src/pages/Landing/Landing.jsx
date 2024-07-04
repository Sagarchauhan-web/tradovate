import ContactUs from '@/components/Footer/ContactUs';
import Policy from '@/components/Footer/Policy';
import TermsAndServices from '@/components/Footer/TermsAndServices';
import PaymentCards from '@/components/PaymentCards/PaymentCards';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { getSubscriptions } from '@/services/Payments/payments';
import { useEffect, useRef, useState } from 'react';
import { BiSolidOffer, BiSupport } from 'react-icons/bi';
import { FaCreditCard } from 'react-icons/fa';
import { IoMdInfinite } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import CustomCode from '../../assets/CustomCode.webp';
import HomePageBanner from '../../assets/HomePageBanner.png';
import IFTTT from '../../assets/IFTTT.webp';
import MetaSpider from '../../assets/MetaTrader5.webp';
import TradovateSymbol from '../../assets/TradingView.webp';
import Tradovate from '../../assets/Tradovate.png';
import TrendSpider from '../../assets/TrendSpider.webp';
import Zapier from '../../assets/Zapier.webp';
import Home from '../../assets/homepage.png';

export default function Landing() {
  const featuresRef = useRef(null);
  const contactRef = useRef(null);
  const pricingRef = useRef(null);
  const navigate = useNavigate();
  const [dialogBox, setDialogBox] = useState(false);
  const [policy, setPolicy] = useState('');

  const [subscriptions, setSubscriptions] = useState({});

  useEffect(() => {
    const getSubscriptionsData = async () => {
      const response = await getSubscriptions();

      console.log(response, 'response');
      if (!response.error) {
        setSubscriptions(response.data);
      }
    };
    getSubscriptionsData();
  }, []);

  return (
    <div className='flex flex-col min-h-[100dvh]'>
      <Dialog open={dialogBox} onOpenChange={setDialogBox}>
        {(policy === 'terms' || policy === 'privacy') && (
          <DialogContent className='max-w-full h-[95%] w-[95%] overflow-y-scroll rounded-xl'>
            <DialogHeader>
              {policy === 'terms' && <TermsAndServices />}
              {policy === 'privacy' && <Policy />}
            </DialogHeader>
          </DialogContent>
        )}
        {policy === 'contactus' && (
          <DialogContent className='sm:max-w-[525px] p-5'>
            <DialogHeader>
              <ContactUs />
            </DialogHeader>
          </DialogContent>
        )}
      </Dialog>
      <header className='px-6 py-10 lg:px-8 h-28 md:h-14 flex items-center border-b-2'>
        <div
          className='flex items-start justify-between w-full
           flex-col space-y-3 sm:flex-row sm:items-center'
          href='#'
        >
          <div className='flex items-center justify-center gap-5'>
            <div className='flex justify-center items-center'>
              <img src='/logo.png' alt='logo' className='w-10 h-8' />
              <p className='text-gray-800 font-bold'>PickMyTrade</p>
            </div>
            <nav className='ml-auto flex gap-4 sm:gap-6'>
              <div
                className='text-sm font-bold hover:underline underline-offset-4 
                text-primary cursor-pointer hidden lg:block'
                onClick={() =>
                  window.scrollTo({
                    top: featuresRef.current.offsetTop,
                    behavior: 'smooth',
                  })
                }
              >
                How it works
              </div>
              <div
                className='text-sm font-bold hover:underline underline-offset-4 
                text-primary cursor-pointer hidden lg:block'
                onClick={() =>
                  window.scrollTo({
                    top: pricingRef.current.offsetTop,
                    behavior: 'smooth',
                  })
                }
              >
                Pricing
              </div>
              <div
                className='text-sm font-bold hover:underline underline-offset-4 text-primary cursor-pointer'
                onClick={() => navigate('/documentation?page=alert')}
              >
                Documentation
              </div>
            </nav>
          </div>
          <div className='flex gap-5'>
            <div
              onClick={() => navigate('/auth', { state: { toRegister: true } })}
              className='w-48 inline-flex h-9 items-center justify-center rounded-md bg-blue-700 px-4 py-2 text-sm 
                    font-medium text-gray-50 shadow transition-colors hover:bg-blue-700/90 focus-visible:outline-none focus-visible:ring-1
                     focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50  cursor-pointer'
              href='#'
            >
              Sign Up for Free
            </div>
            <div
              onClick={() =>
                navigate('/auth', { state: { toRegister: false } })
              }
              className='w-48 inline-flex h-9 items-center justify-center rounded-md border border-primary cursor-pointer
                     bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-blue-700 hover:text-white focus-visible:outline-none focus-visible:ring-1
                      focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50'
              href='#'
            >
              Login
            </div>
          </div>
        </div>
      </header>
      <main className='flex-1'>
        <section className='w-full py-4 md:py-16 lg:py-18 xl:py-18'>
          <div className='container'>
            <div className='grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16'>
              <div className=' flex justify-center flex-col'>
                <h1
                  className='lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl 
                xl:text-[3.4rem] 2xl:text-[3.75rem] text-primary pb-4 '
                >
                  Automated Trading
                </h1>
                <p className='mx-auto max-w-[700px]  md:text-xl'>
                  PickMyTrade specializes in automating trading bots, enabling
                  seamless strategy execution for futures from platforms like
                  TradingView, across well-known brokers such as Tradovate.
                </p>
                <div className='mt-8'>
                  <div className='mx-auto w-full space-y-4'>
                    <form className='flex space-x-2'>
                      {/* <Input
                        className='max-w-lg flex-1'
                        placeholder='Enter your email'
                        type='email'
                      /> */}

                      <div className='flex space-x-8 items-center justify-center'>
                        <div
                          onClick={() =>
                            navigate('/auth', { state: { toRegister: true } })
                          }
                          className='w-48 inline-flex h-18 items-center justify-center rounded-md bg-blue-700 px-4 py-4 text-sm 
                                            font-medium text-gray-50 shadow transition-colors hover:bg-blue-700/90 focus-visible:outline-none focus-visible:ring-1
                                             focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50  cursor-pointer'
                          href='#'
                        >
                          Sign Up for Free
                        </div>
                        <div className='flex space-x-6'>
                          <div className='space-y-2'>
                            <div className='flex items-center space-x-2'>
                              <div className='h-6 w-6 bg-primary rounded-full flex items-center justify-center'>
                                <BiSolidOffer className='text-white h-4 w-4' />
                              </div>
                              <div className='text-gray-400 text-sm font-semibold'>
                                5-day free trial
                              </div>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <div className='h-6 w-6 bg-primary rounded-full flex items-center justify-center'>
                                <FaCreditCard className='text-white h-3 w-3' />
                              </div>
                              <div className='text-gray-400 text-sm font-semibold'>
                                No Card Required
                              </div>
                            </div>
                          </div>
                          <div className='space-y-2'>
                            <div className='flex items-center space-x-2'>
                              <div className='h-6 w-6 bg-primary rounded-full flex items-center justify-center'>
                                <IoMdInfinite className='text-white h-4 w-4' />
                              </div>
                              <div className='text-gray-400 text-sm font-semibold'>
                                Unlimited Trade
                              </div>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <div className='h-6 w-6 bg-primary rounded-full flex items-center justify-center'>
                                <BiSupport className='text-white h-4 w-4' />
                              </div>
                              <div className='text-gray-400 text-sm font-semibold'>
                                Free Support
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                    <p className='text-xs max-w-sm'>
                      Start your free paper account. By providing your email,
                      you agree to our{' '}
                      <span
                        className='underline cursor-pointer'
                        onClick={() => {
                          setDialogBox(true);
                          setPolicy('terms');
                        }}
                      >
                        terms of service
                      </span>{' '}
                      and{' '}
                      <span
                        className='underline cursor-pointer'
                        onClick={() => {
                          setDialogBox(true);
                          setPolicy('privacy');
                        }}
                      >
                        privacy policy
                      </span>
                      .
                      <div className='underline underline-offset-2' href='#' />
                    </p>
                  </div>
                </div>
              </div>
              <div className='flex flex-col items-start space-y-4'>
                <div className='relative mx-auto w-full rounded-lg lg:max-w-md shadow-md'>
                  <a
                    href='https://youtu.be/JyNaiafnBkw?si=V-3J9mfFqQ3rOkl5'
                    target='_blank'
                    className='relative block w-full bg-white rounded-lg overflow-hidden'
                  >
                    <span className='sr-only'>
                      Watch our video to learn more
                    </span>
                    <img
                      alt='Hero'
                      className='mx-auto object-cover h-72 '
                      height='200'
                      src={HomePageBanner}
                      width='1270'
                    />
                    <div
                      className='absolute inset-0 w-full h-full flex items-center justify-center'
                      aria-hidden='true'
                    >
                      <svg
                        className='h-20 w-20 text-primary'
                        fill='currentColor'
                        viewBox='0 0 84 84'
                      >
                        <circle
                          opacity='0.9'
                          cx='42'
                          cy='42'
                          r='42'
                          fill='white'
                        ></circle>
                        <path d='M55.5039 40.3359L37.1094 28.0729C35.7803 27.1869 34 28.1396 34 29.737V54.263C34 55.8604 35.7803 56.8131 37.1094 55.9271L55.5038 43.6641C56.6913 42.8725 56.6913 41.1275 55.5039 40.3359Z'></path>
                      </svg>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          ref={featuresRef}
          className='w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800'
        >
          <div className='container grid items-center justify-center gap-4 px-4 md:px-6'>
            <div className='space-y-4 text-center'>
              <h2 className='text-4xl font-bold tracking-tighter md:text-6xl/tight'>
                How It Works
              </h2>
              <div className='flex justify-center  text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400'>
                <div className='max-w-xl'>
                  PickMyTrade Streamline your trading journey. Craft your
                  strategy, and let us seamlessly integrate it with your broker
                  for effortless execution.
                </div>
              </div>
            </div>
            <div className='relative'>
              <div className='relative isolate overflow-hidden bg-gray-50 border 2xl:mt-16 sm:mt-14 mt-10 rounded-xl'>
                <div className='p-5 sm:px-8 sm:py-7 lg:px-16 lg:py-20 relative'>
                  <div className='flex xl:flex-row flex-col items-center xl:justify-between xl:gap-20 sm:gap-12 gap-8'>
                    <div className='xl:max-w-lg shrink-0 w-full'>
                      <div>
                        <h2 className='text-2xl font-bold tracking-tight text-gray-800 sm:text-4xl'>
                          <span className='text-green-500 text-5xl'>01.</span>{' '}
                          Develop your action plan
                        </h2>
                        <p className='max-w-xl sm:mt-5 mt-3 sm:text-lg leading-8 text-gray-600'>
                          Craft and evaluate your market tactics with the
                          charting tools you trust the most, such as TradingView
                          or TrendSpider.
                        </p>
                      </div>
                    </div>
                    <div className='w-full'>
                      <div className='grid 2xl:grid-cols-3 xl:grid-cols-2 sm:grid-cols-3 grid-cols-1 gap-3 w-full'>
                        <div className='border border-gray-200 bg-gray-50 rounded-xl px-5 py-4 flex justify-center items-center hover:border-gray-400 transition-colors ease-in-out duration-150'>
                          <img
                            alt='TradingView'
                            className='object-contain h-10'
                            src={TradovateSymbol}
                          />
                        </div>
                        <div className='border border-gray-200 bg-gray-50 rounded-xl px-5 py-4 flex justify-center items-center hover:border-gray-400 transition-colors ease-in-out duration-150'>
                          <img
                            alt='TrendSpider'
                            className='object-contain h-10'
                            src={TrendSpider}
                          />
                        </div>
                        <div className='border border-gray-200 bg-gray-50 rounded-xl px-5 py-4 flex justify-center items-center hover:border-gray-400 transition-colors ease-in-out duration-150'>
                          <img
                            alt='Meta Trader 5'
                            className='object-contain h-10'
                            src={MetaSpider}
                          />
                        </div>
                        <div className='border border-gray-200 bg-gray-50 rounded-xl px-5 py-4 flex justify-center items-center hover:border-gray-400 transition-colors ease-in-out duration-150'>
                          <img
                            alt='Custom Code'
                            className='object-contain h-10'
                            src={CustomCode}
                          />
                        </div>
                        <div className='border border-gray-200 bg-gray-50 rounded-xl px-5 py-4 flex justify-center items-center hover:border-gray-400 transition-colors ease-in-out duration-150'>
                          <img
                            alt='Zapier'
                            className='object-contain h-10'
                            src={Zapier}
                          />
                        </div>

                        <div className='border border-gray-200 bg-gray-50 rounded-xl px-5 py-4 flex justify-center items-center hover:border-gray-400 transition-colors ease-in-out duration-150'>
                          <img
                            alt='IFTTT'
                            className='object-contain h-10'
                            src={IFTTT}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='relative'>
              <div className='relative isolate overflow-hidden bg-gray-50 border sm:mt-20 mt-12 rounded-xl'>
                <div className='p-5 sm:px-8 sm:py-7 lg:px-16 lg:py-20 relative'>
                  <div className='flex xl:flex-row-reverse flex-col items-center justify-between xl:gap-20 sm:gap-12 gap-8 w-full h-full'>
                    <div className='xl:max-w-xl xl:shrink-0 w-full '>
                      <div>
                        <h2 className='text-2xl font-bold tracking-tight text-gray-800 sm:text-4xl'>
                          <span className='text-green-500 text-5xl'>02.</span>{' '}
                          Channel trade alerts
                        </h2>
                        <p className=' max-w-xl sm:mt-5 mt-3 sm:text-lg leading-8 text-gray-600'>
                          Organize your trading tactics to send timely alert
                          webhooks to PickMyTrade, aligning with your decision
                          to execute a trade.
                        </p>
                      </div>
                    </div>
                    <div className='w-full xl:px-6 xl:py-5 xl:-mx-16 xl:-my-[74px]'>
                      <div className='bg-black/90 h-full w-full lg:p-14 sm:p-10 p-5 rounded-xl sm:text-xl text-base font-extralight leading-9 text-gray-100'>
                        <code>
                          {'{'}
                          <br />
                          &nbsp;&nbsp; &quot;symbol&quot;: &quot;6BM2024&quot;,
                          <br />
                          &nbsp;&nbsp; &quot;date&quot;: &quot;12/6&quot;,
                          <br />
                          &nbsp;&nbsp; &quot;data&quot;: &quot;buy&quot;
                          <br />
                          &nbsp;&nbsp; &quot;quantity&quot;: &quot;3&quot;
                          <br />
                          &nbsp;&nbsp; &quot;risk_percentage&quot;:
                          &quot;0&quot;
                          <br />
                          &nbsp;&nbsp; &quot;price&quot;: &quot;5&quot;
                          <br />
                          &nbsp;&nbsp; &quot;tp&quot;: &quot;0&quot;
                          <br />
                          &nbsp;&nbsp; &quot;sl&quot;: &quot;0&quot;
                          <br />
                          &nbsp;&nbsp; &quot;trail&quot;: &quot;0&quot;
                          <br />
                          &nbsp;&nbsp; &quot;update_tp&quot;: &quot;false&quot;
                          <br />
                          &nbsp;&nbsp; &quot;update_sl&quot;: &quot;false&quot;
                          <br />
                          &nbsp;&nbsp; &quot;reverse_order_close&quot;:
                          &quot;true&quot;
                          <br />
                          {'}'}
                        </code>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='relative'>
              <div className='relative isolate overflow-hidden bg-gray-50 border sm:mt-20 mt-12 rounded-xl'>
                <div className='p-5 sm:px-8 sm:py-7 lg:px-16 lg:py-20 relative'>
                  <div className='flex xl:flex-row flex-col items-center justify-between xl:gap-20 sm:gap-12 gap-8'>
                    <div className='xl:max-w-lg xl:shrink-0 w-full'>
                      <div>
                        <h2 className='text-2xl font-bold tracking-tight text-gray-800 sm:text-4xl'>
                          <span className='text-green-500 text-5xl'>03.</span>{' '}
                          Establish a connection to your Tradovate Account
                        </h2>
                        <p className='max-w-xl sm:mt-5 mt-3 sm:text-lg leading-8 text-gray-600'>
                          Safely establish a one-click connection between your
                          Tradovate account and PickMyTrade, enabling automatic
                          trade execution in your account when alerts are
                          triggered.
                        </p>
                      </div>
                    </div>
                    <div className='w-full xl:max-w-lg'>
                      <div className='flex flex-wrap lg:gap-5 sm:gap-3 gap-5 xl:justify-center lg:justify-between justify-center'>
                        <div className='hover:scale-110 transition-all ease-in-out duration-300  rounded-full lg:w-24 lg:h-24 w-20 h-20 shrink-0 flex justify-center items-center'>
                          <img
                            alt='Alpaca'
                            className=' rounded-full object-contain w-full h-full'
                            src={Tradovate}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='relative'>
              <div className='relative isolate overflow-hidden bg-gray-50 border sm:mt-20 mt-12 rounded-xl'>
                <div className='p-5 sm:px-8 sm:py-7 lg:px-16 lg:py-20 relative'>
                  <div className='flex flex-col items-start justify-between xl:gap-20 sm:gap-12 gap-8 w-full h-full'>
                    <div className='xl:max-w-lg shrink-0 w-full'>
                      <div>
                        <h2 className='text-2xl font-bold tracking-tight text-gray-800 sm:text-4xl'>
                          <span className='text-green-500 text-5xl'>04.</span>{' '}
                          Track your trade movements with precision
                        </h2>
                        <p className='max-w-xl sm:mt-5 mt-3 sm:text-lg leading-8 text-gray-600'>
                          Conveniently track your market dealings while
                          coordinating your positions and commands across
                          numerous accounts through one intuitive interface.
                        </p>
                      </div>
                    </div>
                    <div className='w-full xl:space-y-6 space-y-4 shadow-xl'>
                      <img src={Home} className='rounded-md' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          ref={pricingRef}
          className='w-full py-12 md:py-24 lg:py-28 bg-gray-100 dark:bg-gray-800'
        >
          <div className='space-y-4 text-center mb-16'>
            <h2 className='text-4xl mb-8 font-bold tracking-tighter md:text-6xl/tight'>
              Pricing
            </h2>
            <div className='flex justify-center  text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400'>
              <div className='max-w-xl'>
                Choose the plan that’s right for your business. Our transparent
                pricing ensures there are no hidden fees ever. Explore our
                options and find the perfect fit for your needs.
              </div>
            </div>
          </div>
          {Object.values(subscriptions).length ? (
            <PaymentCards
              subscriptions={subscriptions}
              isFromHomePage={true}
              transferToLogin={() =>
                navigate('/auth', {
                  state: { toRegister: false, paymentNotification: true },
                })
              }
            />
          ) : (
            ''
          )}
        </section>
        <section ref={contactRef} className='w-full bg-primary'>
          <div className='bg-primary border-t border-b'>
            <div className='lg:pt-20 lg:pb-20 sm:pt-16 sm:pb-8 pt-14 pb-4'>
              <div className='container'>
                <div className='mx-auto max-w-3xl lg:max-w-none'>
                  <div className='text-center'>
                    <h2 className='text-3xl font-bold tracking-tight text-white sm:text-4xl'>
                      Trusted by traders from all over the world
                    </h2>
                  </div>
                  <dl className='mt-16 grid lg:divide-x lg:divide-y-0 divide-y divide-gray-300 overflow-hidden gap-0.5 rounded-2xl text-center grid-cols-1 lg:grid-cols-3 lg:max-w-full max-w-sm mx-auto'>
                    <div className='flex flex-col gap-1 p-8'>
                      <dt className='text-base font-semibold leading-6 text-white'>
                        Under Management
                      </dt>
                      <dd className='order-first sm:text-6xl text-5xl font-bold tracking-tight text-white'>
                        $1M+
                      </dd>
                    </div>
                    <div className='flex flex-col gap-1 p-8'>
                      <dt className='text-base font-semibold leading-6 text-white'>
                        Traders
                      </dt>
                      <dd className='order-first sm:text-6xl text-5xl font-bold tracking-tight text-white'>
                        100+
                      </dd>
                    </div>
                    <div className='flex flex-col gap-1 p-8'>
                      <dt className='text-base font-semibold leading-6 text-white'>
                        Trades Executed{' '}
                      </dt>
                      <dd className='order-first sm:text-6xl text-5xl font-bold tracking-tight text-white'>
                        1M+
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          ref={contactRef}
          className='w-full py-12 md:py-14 lg:py-18 bg-gray-100 dark:bg-gray-800'
        >
          <div className='container py-16 sm:py-24 lg:py-20 relative'>
            <div className='xl:grid xl:grid-cols-3 xl:gap-8'>
              <div className='space-y-8 w-full flex flex-col items-center'>
                <div className='flex justify-center items-center'>
                  <img src='/logo.png' alt='logo' className='h-9' />
                  <p className='text-gray-800 font-bold'>PickMyTrade</p>
                </div>
                <p className='text-sm leading-6 text-gray-600 max-w-sm text-center'>
                  Empower your trading endeavors with PickMyTrade, automating
                  strategies for futures from analytical tools such as
                  TradingView or TrendSpider, in collaboration with prominent
                  brokers like Tradovate.
                </p>
              </div>
              <div className='mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0'>
                <div className='md:grid md:grid-cols-2 md:gap-8'>
                  <div>
                    <h3 className='text-lg font-semibold leading-6 text-gray-800'>
                      Brokers
                    </h3>
                    <ul role='list' className='mt-6 space-y-4'>
                      <li>
                        <div className='text-sm leading-6 text-gray-600 hover:text-gray-800'>
                          Tradovate
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className='mt-10 md:mt-0'>
                    <h3 className='text-lg font-semibold leading-6 text-gray-800'>
                      Support
                    </h3>
                    <ul role='list' className='mt-6 space-y-4'>
                      <li>
                        <div className='text-sm leading-6 text-gray-600 hover:text-gray-800'>
                          Pricing
                        </div>
                      </li>
                      <li>
                        <div
                          target='_blank'
                          className='text-sm leading-6 text-gray-600 hover:text-gray-800'
                        >
                          Documentation
                        </div>
                      </li>
                      <li>
                        <div className='text-sm leading-6 text-gray-600 hover:text-gray-800'>
                          FAQ
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className='md:grid md:grid-cols-2 md:gap-8'>
                  <div>
                    <h3 className='text-lg font-semibold leading-6 text-gray-800'>
                      Company
                    </h3>
                    <ul role='list' className='mt-6 space-y-4'>
                      <li>
                        <div className='text-sm leading-6 text-gray-600 hover:text-gray-800'>
                          About Us
                        </div>
                      </li>
                      <li>
                        <a
                          onClick={() => {
                            setDialogBox(true);
                            setPolicy('contactus');
                          }}
                          className='text-sm leading-6 cursor-pointer text-gray-600 hover:text-gray-800'
                        >
                          Contact Us
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className='mt-10 md:mt-0'>
                    <h3 className='text-lg font-semibold leading-6 text-gray-800'>
                      Legal
                    </h3>
                    <ul role='list' className='mt-6 space-y-4'>
                      <li>
                        <a
                          onClick={() => {
                            setDialogBox(true);
                            setPolicy('privacy');
                          }}
                          className='text-sm cursor-pointer leading-6 text-gray-600 hover:text-gray-800'
                        >
                          Privacy{' '}
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={() => {
                            setDialogBox(true);
                            setPolicy('terms');
                          }}
                          className='text-sm cursor-pointer leading-6 text-gray-600 hover:text-gray-800'
                        >
                          Terms &amp; Conditions
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className='text-sm text-gray-600 pt-12 uppercase'>
              <p className='mb-4'>
                PickMyTrade stands as an autonomous trading facilitator that
                doesn’t take custody of user assets. It empowers traders to link
                alert mechanisms from charting platforms they prefer, directly
                to their chosen brokers or exchanges. By steering clear of
                handling, holding, or managing client capital, it encompasses a
                broad spectrum of assets, from conventional markets to the
                crypto realm. Entities like the SEC, FINRA, or FinCEN usually
                mandate registration for those dealing with client funds. To
                maintain compliance, PickMyTrade proactively liaises with
                regulatory bodies, ensuring its operations are in lockstep with
                pertinent regulations at both the local and national levels.
              </p>
              <p className='mb-4'>
                PickMyTrade stands as a facilitator for self-directed traders
                and investors, offering a platform that supports independent
                decision-making based on user-generated alerts. It refrains from
                issuing any form of alerts, signals, research, analysis, or
                trading recommendations. The service does not engage in advising
                on the purchase or sale of securities, nor does it partake in
                providing investment guidance. All features, capabilities, and
                tools of the platform are made available ‘as-is’, devoid of any
                guarantees.
              </p>
              <p className='mb-4'>
                Engaging with automated trading platforms comes with intrinsic
                uncertainties, encompassing the possibility of substantial
                monetary setbacks. Such systems function on fixed algorithms
                which might not be agile enough to accommodate evolving market
                dynamics, rendering them potentially inappropriate for certain
                investors. It’s prudent for individuals to conduct a
                comprehensive evaluation of their fiscal standing and appetite
                for risk prior to utilizing this technology.
              </p>
            </div>
          </div>
        </section>
        <div className='sm:py-5 py-2 bg-primary relative'>
          <div className='container'>
            <div className='flex items-center justify-center text-center gap-5'>
              <p className='text-sm leading-5 text-white'>
                © 2024 PickMyTrade, Inc. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
