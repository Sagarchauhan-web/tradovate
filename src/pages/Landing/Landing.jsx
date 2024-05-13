import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import TradovateSymbol from '../../assets/TradingView.webp';
import TrendSpider from '../../assets/TrendSpider.webp';
import MetaSpider from '../../assets/MetaTrader5.webp';
import CustomCode from '../../assets/CustomCode.webp';
import Zapier from '../../assets/Zapier.webp';
import IFTTT from '../../assets/IFTTT.webp';
import Tradovate from '../../assets/Tradovate.png';
import Home from '../../assets/homepage.png';
import Homepagebanner from '../../assets/homepagebanner.jpeg';
import { useRef } from 'react';

export default function Landing() {
  const featuresRef = useRef(null);
  const contactRef = useRef(null);
  // const aboutRef = useRef(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   navigate('/auth');
  // }, []);

  return (
    <div className='flex flex-col min-h-[100dvh]'>
      <header className='px-6 py-10 lg:px-8 h-14 flex items-center border-b-2'>
        <div className='flex items-center justify-between w-full' href='#'>
          <div className='flex items-center justify-center gap-5'>
            <div className='flex justify-center items-center'>
              <img src='/logo.png' alt='logo' className='w-10 h-8' />
              <p className='text-gray-800 font-bold'>PickMyTrade</p>
            </div>
            <nav className='ml-auto flex gap-4 sm:gap-6'>
              <div
                className='text-sm font-bold hover:underline underline-offset-4 text-primary cursor-pointer'
                onClick={() =>
                  window.scrollTo({
                    top: featuresRef.current.offsetTop,
                    behavior: 'smooth',
                  })
                }
              >
                How it works
              </div>
              {/* <div
              className='text-sm font-medium hover:underline underline-offset-4 text-primary'
              href='#'
            >
              Pricing
            </div> */}
              <div
                className='text-sm font-bold hover:underline underline-offset-4 text-primary cursor-pointer'
                onClick={() =>
                  window.scrollTo({
                    top: contactRef.current.offsetTop,
                    behavior: 'smooth',
                  })
                }
              >
                Community
              </div>
            </nav>
          </div>
          <div className='flex gap-5'>
            <div
              onClick={() => navigate('/auth')}
              className='w-32 inline-flex h-9 items-center justify-center rounded-md bg-blue-700 px-4 py-2 text-sm 
                    font-medium text-gray-50 shadow transition-colors hover:bg-blue-700/90 focus-visible:outline-none focus-visible:ring-1
                     focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50  cursor-pointer'
              href='#'
            >
              Register
            </div>
            <div
              className='w-32 inline-flex h-9 items-center justify-center rounded-md border border-primary cursor-pointer
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
        <section className='w-full py-4 md:py-16 lg:py-18 xl:py-18 bg-gradient-to-r from-violet-600 to-indigo-600'>
          <div className='container'>
            <div className='grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16'>
              <div className=' flex justify-center flex-col'>
                <h1
                  className='lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl 
                xl:text-[3.4rem] 2xl:text-[3.75rem] text-primary pb-4 text-white'
                >
                  Automated Trading
                </h1>
                <p className='mx-auto max-w-[700px] text-white md:text-xl'>
                  PickMyTrade can automate trading bots with stocks, crypto,
                  options and futures trading strategies from TradingView or
                  TrendSpider in popular brokers like TDAmeritrade,
                  TradeStation, Coinbase, Interactive Brokers and Alpaca.
                </p>
                <div className='mt-6'>
                  <div className='mx-auto w-full space-y-2'>
                    <form className='flex space-x-2'>
                      <Input
                        className='max-w-lg flex-1'
                        placeholder='Enter your email'
                        type='email'
                      />

                      <button
                        className='w-32 inline-flex items-center justify-center rounded-md border border-primary cursor-pointer
                     bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-200/90'
                        href='#'
                      >
                        Register
                      </button>
                    </form>
                    <p className='text-xs text-white max-w-sm'>
                      Start your free paper account. By providing your email,
                      you agree to our{' '}
                      <span className='underline'>terms of service</span> and{' '}
                      <span className='underline'>privacy policy</span>.
                      <div className='underline underline-offset-2' href='#' />
                    </p>
                  </div>
                </div>
              </div>
              <div className='flex flex-col items-start space-y-4'>
                <div className='relative mx-auto w-full rounded-lg lg:max-w-md'>
                  <a
                    href='https://www.youtube.com/watch?v=BBroNGGERBU'
                    target='_blank'
                    className='relative block w-full bg-white rounded-lg overflow-hidden'
                  >
                    <span className='sr-only'>
                      Watch our video to learn more
                    </span>
                    <img
                      alt='Hero'
                      className='mx-auto object-cover h-72'
                      height='200'
                      src={Homepagebanner}
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
            <div className='space-y-3'>
              <h2 className='text-3xl font-bold tracking-tighter md:text-4xl/tight text-primary'>
                How It Works
              </h2>
              <p className='max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400'>
                PickMyTrade is simple and easy to use. You focus on building
                your strategy and we take care of executing it directly in your
                broker.
              </p>
            </div>
            <div className='relative'>
              <div className='absolute right-0 sm:-bottom-24 -bottom-16'>
                <svg
                  className='sm:h-28 sm:w-28 w-20 h-20 text-[#0084d1] stroke-[0.8]'
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  strokeWidth='2'
                  stroke='currentColor'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='M12 5l0 14'></path>
                  <path d='M16 15l-4 4'></path>
                  <path d='M8 15l4 4'></path>
                </svg>
              </div>
              <div className='relative isolate overflow-hidden bg-gray-50 border 2xl:mt-16 sm:mt-14 mt-10 rounded-xl'>
                <p className='sm:text-[300px] text-[250px] absolute left-0 xl:top-auto xl:-bottom-14 -top-10 mb-0 leading-none -ml-6 text-primary/15 font-bold'>
                  01
                </p>
                <div className='p-5 sm:px-8 sm:py-7 lg:px-16 lg:py-20 relative'>
                  <div className='flex xl:flex-row flex-col items-center xl:justify-between xl:gap-20 sm:gap-12 gap-8'>
                    <div className='xl:max-w-lg shrink-0 w-full'>
                      <div>
                        <h2 className='text-2xl font-bold tracking-tight text-gray-800 sm:text-4xl'>
                          Build Your Strategy
                        </h2>
                        <p className='sm:mt-5 mt-3 sm:text-lg leading-8 text-gray-600'>
                          Build and backtest your trading strategy using your
                          preferred charting software like TradingView or
                          TrendSpider.
                        </p>
                      </div>
                    </div>
                    <div className='w-full'>
                      <div className='grid 2xl:grid-cols-3 xl:grid-cols-2 sm:grid-cols-3 grid-cols-1 gap-3 w-full'>
                        <a
                          href='/signals/tradingview'
                          className='border border-gray-200 bg-gray-50 rounded-xl px-5 py-4 flex justify-center items-center hover:border-gray-400 transition-colors ease-in-out duration-150'
                        >
                          <img
                            alt='TradingView'
                            className='object-contain h-10'
                            src={TradovateSymbol}
                          />
                        </a>
                        <a
                          href='/signals/trendspider'
                          className='border border-gray-200 bg-gray-50 rounded-xl px-5 py-4 flex justify-center items-center hover:border-gray-400 transition-colors ease-in-out duration-150'
                        >
                          <img
                            alt='TrendSpider'
                            className='object-contain h-10'
                            src={TrendSpider}
                          />
                        </a>
                        <a
                          href='/signals/metatrader5'
                          className='border border-gray-200 bg-gray-50 rounded-xl px-5 py-4 flex justify-center items-center hover:border-gray-400 transition-colors ease-in-out duration-150'
                        >
                          <img
                            alt='Meta Trader 5'
                            className='object-contain h-10'
                            src={MetaSpider}
                          />
                        </a>
                        <a
                          href='/signals/customcode'
                          className='border border-gray-200 bg-gray-50 rounded-xl px-5 py-4 flex justify-center items-center hover:border-gray-400 transition-colors ease-in-out duration-150'
                        >
                          <img
                            alt='Custom Code'
                            className='object-contain h-10'
                            src={CustomCode}
                          />
                        </a>
                        <a
                          href='/signals/zapier'
                          className='border border-gray-200 bg-gray-50 rounded-xl px-5 py-4 flex justify-center items-center hover:border-gray-400 transition-colors ease-in-out duration-150'
                        >
                          <img
                            alt='Zapier'
                            className='object-contain h-10'
                            src={Zapier}
                          />
                        </a>

                        <a
                          href='/signals/ifttt'
                          className='border border-gray-200 bg-gray-50 rounded-xl px-5 py-4 flex justify-center items-center hover:border-gray-400 transition-colors ease-in-out duration-150'
                        >
                          <img
                            alt='IFTTT'
                            className='object-contain h-10'
                            src={IFTTT}
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='relative'>
              <div className='absolute left-0 sm:-bottom-24 -bottom-16'>
                <svg
                  className='sm:h-28 sm:w-28 w-20 h-20 text-[#0084d1] stroke-[0.8]'
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  strokeWidth='2'
                  stroke='currentColor'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='M12 5l0 14'></path>
                  <path d='M16 15l-4 4'></path>
                  <path d='M8 15l4 4'></path>
                </svg>
              </div>
              <div className='relative isolate overflow-hidden bg-gray-50 border sm:mt-20 mt-12 rounded-xl'>
                <p className='sm:text-[300px] text-[250px] absolute right-0 xl:top-auto xl:-bottom-14 -top-10 leading-none -mr-6 text-primary/15 font-bold'>
                  02
                </p>
                <div className='p-5 sm:px-8 sm:py-7 lg:px-16 lg:py-20 relative'>
                  <div className='flex xl:flex-row-reverse flex-col items-center justify-between xl:gap-20 sm:gap-12 gap-8 w-full h-full'>
                    <div className='xl:max-w-xl xl:shrink-0 w-full '>
                      <div>
                        <h2 className='text-2xl font-bold tracking-tight text-gray-800 sm:text-4xl'>
                          Send Alerts to PickMyTrade
                        </h2>
                        <p className='sm:mt-5 mt-3 sm:text-lg leading-8 text-gray-600'>
                          Setup your strategy to send alert webhooks to
                          PickMyTrade when you want to execute a trade.
                        </p>
                      </div>
                    </div>
                    <div className='w-full xl:px-6 xl:py-5 xl:-mx-16 xl:-my-[74px]'>
                      <div className='bg-black/90 h-full w-full lg:p-14 sm:p-10 p-5 rounded-xl sm:text-xl text-base font-extralight leading-9 text-gray-100'>
                        <code>
                          {'{'}
                          <br />
                          &nbsp;&nbsp; &quot;ticker&quot;: &quot;Apple&quot;,
                          <br />
                          &nbsp;&nbsp; &quot;action&quot;: &quot;buy&quot;,
                          <br />
                          &nbsp;&nbsp; &quot;price&quot;: &quot;9999&quot;
                          <br />
                          {'{'}
                        </code>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='relative'>
              <div className='absolute right-0 sm:-bottom-24 -bottom-16'>
                <svg
                  className='sm:h-28 sm:w-28 w-20 h-20 text-[#0084d1] stroke-[0.8]'
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  strokeWidth='2'
                  stroke='currentColor'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='M12 5l0 14'></path>
                  <path d='M16 15l-4 4'></path>
                  <path d='M8 15l4 4'></path>
                </svg>
              </div>
              <div className='relative isolate overflow-hidden bg-gray-50 border sm:mt-20 mt-12 rounded-xl'>
                <div className='sm:text-[300px] text-[250px] absolute left-0 xl:top-auto xl:-bottom-14 -top-10 leading-none -ml-6 text-primary/15 font-bold'>
                  03
                </div>
                <div className='p-5 sm:px-8 sm:py-7 lg:px-16 lg:py-20 relative'>
                  <div className='flex xl:flex-row flex-col items-center justify-between xl:gap-20 sm:gap-12 gap-8'>
                    <div className='xl:max-w-lg xl:shrink-0 w-full'>
                      <div>
                        <h2 className='text-2xl font-bold tracking-tight text-gray-800 sm:text-4xl'>
                          Connect Your Broker
                        </h2>
                        <p className='sm:mt-5 mt-3 sm:text-lg leading-8 text-gray-600'>
                          Securely connect your broker to PickMyTrade with one
                          click and execute trades automatically in your account
                          when your strategy sends an alert.
                        </p>
                      </div>
                    </div>
                    <div className='w-full xl:max-w-lg'>
                      <div className='flex flex-wrap lg:gap-5 sm:gap-3 gap-5 xl:justify-center lg:justify-between justify-center'>
                        <a
                          href='/broker/alpaca'
                          className='hover:scale-110 transition-all ease-in-out duration-300  rounded-full lg:w-24 lg:h-24 w-20 h-20 shrink-0 flex justify-center items-center'
                        >
                          <img
                            alt='Alpaca'
                            className=' rounded-full object-contain w-full h-full'
                            src={Tradovate}
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='relative'>
              <div className='relative isolate overflow-hidden bg-gray-50 border sm:mt-20 mt-12 rounded-xl'>
                <p className='sm:text-[300px] text-[250px] absolute right-0 xl:top-auto xl:-bottom-14 -top-10 leading-none -mr-6 text-primary/15 font-bold'>
                  04
                </p>
                <div className='p-5 sm:px-8 sm:py-7 lg:px-16 lg:py-20 relative'>
                  <div className='flex flex-col items-start justify-between xl:gap-20 sm:gap-12 gap-8 w-full h-full'>
                    <div className='xl:max-w-lg shrink-0 w-full'>
                      <div>
                        <h2 className='text-2xl font-bold tracking-tight text-gray-800 sm:text-4xl'>
                          Monitor Your Trades
                        </h2>
                        <p className='sm:mt-5 mt-3 sm:text-lg leading-8 text-gray-600'>
                          Easily monitor your trades and manage all your
                          positions and orders across multiple accounts from one
                          easy to use user interface.
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
          ref={contactRef}
          className='w-full  bg-gray-100 dark:bg-gray-800'
        >
          <div className='bg-gray-100 border-t border-b'>
            <div className='lg:pt-20 lg:pb-20 sm:pt-16 sm:pb-8 pt-14 pb-4'>
              <div className='container'>
                <div className='mx-auto max-w-3xl lg:max-w-none'>
                  <div className='text-center'>
                    <h2 className='text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl'>
                      Trusted by traders from all over the world
                    </h2>
                  </div>
                  <dl className='mt-16 grid lg:divide-x lg:divide-y-0 divide-y divide-gray-300 overflow-hidden gap-0.5 rounded-2xl text-center grid-cols-1 lg:grid-cols-3 lg:max-w-full max-w-sm mx-auto'>
                    <div className='flex flex-col gap-1 p-8'>
                      <dt className='text-base font-semibold leading-6 text-gray-600'>
                        Under Management
                      </dt>
                      <dd className='order-first sm:text-6xl text-5xl font-bold tracking-tight text-indigo-600'>
                        $1M+
                      </dd>
                    </div>
                    <div className='flex flex-col gap-1 p-8'>
                      <dt className='text-base font-semibold leading-6 text-gray-600'>
                        Traders
                      </dt>
                      <dd className='order-first sm:text-6xl text-5xl font-bold tracking-tight text-indigo-600'>
                        1000+
                      </dd>
                    </div>
                    <div className='flex flex-col gap-1 p-8'>
                      <dt className='text-base font-semibold leading-6 text-gray-600'>
                        Trades Executed{' '}
                      </dt>
                      <dd className='order-first sm:text-6xl text-5xl font-bold tracking-tight text-indigo-600'>
                        1M+
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <section
          ref={contactRef}
          className='w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800'
        >
          <div className='container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10'>
            <div className='space-y-2'>
              <h2 className='text-3xl font-bold tracking-tighter md:text-4xl/tight text-primary'>
                Join Our Trading Community
              </h2>
              <p className='max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400'>
                Sign up today and start your journey to financial success.
              </p>
            </div>
            <div className='mx-auto w-full max-w-sm space-y-2'>
              <form className='flex space-x-2'>
                <Input
                  className='max-w-lg flex-1'
                  placeholder='Enter your email'
                  type='email'
                />
                <Button
                  className='bg-primary hover:bg-primary/90 text-gray-50'
                  type='submit'
                >
                  Sign Up
                </Button>
              </form>
              <p className='text-xs text-gray-500 dark:text-gray-400'>
                Sign up to our newsletter.
                <div className='underline underline-offset-2' href='#' />
              </p>
            </div>
          </div>
        </section> */}
      </main>
    </div>
  );
}
