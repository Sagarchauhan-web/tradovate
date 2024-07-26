import ContactUs from '@/components/Footer/ContactUs';
import Policy from '@/components/Footer/Policy';
import TermsAndServices from '@/components/Footer/TermsAndServices';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { useEffect, useRef, useState } from 'react';
import { BiSolidOffer, BiSupport } from 'react-icons/bi';
import { FaCreditCard } from 'react-icons/fa';
import { IoMdInfinite } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import HomePageBanner from '../../assets/HomePageBanner.png';
import { Helmet } from 'react-helmet';

export default function TradovateAutomation() {
  const contactRef = useRef(null);
  const navigate = useNavigate();
  const [dialogBox, setDialogBox] = useState(false);
  const [policy, setPolicy] = useState('');

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='flex flex-col min-h-[100dvh]'>
      <Helmet>
        <title>PickMyTrade - Advanced Trading Features with Tradovate</title>
        <meta
          name='description'
          content='Discover advanced trading features with Tradovate on PickMyTrade. Trade futures with speed, ease, and reliability using our modern trading platform.'
        />
        <meta
          name='keywords'
          content='PickMyTrade, Tradovate, futures trading, trading platform, advanced trading tools, online trading, trading features'
        />
        <meta name='author' content='PickMyTrade' />
        <meta
          property='og:title'
          content='PickMyTrade - Advanced Trading Features with Tradovate'
        />
        <meta
          property='og:description'
          content='Discover advanced trading features with Tradovate on PickMyTrade. Trade futures with speed, ease, and reliability using our modern trading platform.'
        />
        <meta property='og:image' content='URL_TO_YOUR_IMAGE' />
        <meta property='og:url' content='https://www.pickmytrade.com/product' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta
          name='twitter:title'
          content='PickMyTrade - Advanced Trading Features with Tradovate'
        />
        <meta
          name='twitter:description'
          content='Discover advanced trading features with Tradovate on PickMyTrade. Trade futures with speed, ease, and reliability using our modern trading platform.'
        />
        <meta name='twitter:image' content='URL_TO_YOUR_IMAGE' />
      </Helmet>
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
                onClick={() => navigate('/')}
              >
                Home
              </div>
              <div
                className='text-sm font-bold hover:underline underline-offset-4 text-primary cursor-pointer'
                onClick={() => navigate('/documentation?page=alert')}
              >
                Documentation
              </div>
              <a
                className='text-sm font-bold hover:underline underline-offset-4 text-primary cursor-pointer'
                href='https://blog.pickmytrade.trade/'
                target='_blank'
              >
                Blog
              </a>
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
                  Tradovate Automated Trading
                </h1>
                <p className='mx-auto max-w-[700px]  md:text-xl'>
                  Streamline your trading strategies seamlessly by integrating
                  your TradingView or TrendSpider alerts directly with
                  Tradovate. Our platform enables you to send alerts to us, and
                  in turn, we’ll execute orders on your behalf. Experience
                  efficient and automated trading with Tradovate.
                </p>
                <div className='mt-8'>
                  <div className='mx-auto w-full space-y-4'>
                    <form className='flex space-x-2'>
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

        <section>
          <div className='container p-12'>
            <div className='bg-white-50 border rounded-lg shadow-xl'>
              <div className='max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8'>
                <h2 className='text-3xl font-extrabold text-gray-800 sm:text-4xl'>
                  <span className='block'>
                    Connect to{' '}
                    <img
                      src='https://cdn.traderspost.io/images/brokers/Tradovate.png'
                      className='rounded-full inline-block align-middle mr-2 w-10 h-10 lg:w-12 lg:h-12'
                    />
                    Tradovate
                  </span>
                </h2>
                <p className='mt-4 text-lg leading-6 text-gray-600'>
                  Use the button below to get started with Tradovate and then
                  connect it to TradersPost to start automating your trading.
                </p>
                <Button variant='outline' className='mt-8'>
                  Get Tradovate
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className='space-y-4 text-center mt-8'>
            <h2 className='text-4xl font-bold tracking-tighter md:text-6xl/tight'>
              What&apos;s Available?
            </h2>
            <div className='flex justify-center  text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400'>
              <div className='max-w-xl'>
                PickMyTrade Streamline your trading journey. Craft your
                strategy, and let us seamlessly integrate it with your broker
                for effortless execution.
              </div>
            </div>
          </div>
          <div className='container p-20'>
            <div className='flex flex-col'>
              <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                <div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
                  <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg mb-12'>
                    <table className='min-w-full divide-y divide-gray-200'>
                      <thead className='bg-primary'>
                        <tr>
                          <td className='px-6 py-4 font-bold text-white'>
                            Asset Classes
                          </td>
                          <td className='py-4 font-bold text-white'>
                            Supported
                          </td>
                        </tr>
                      </thead>
                      <tbody className='bg-white divide-y divide-gray-200'>
                        <tr>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <div className='text-sm font-medium text-gray-900'>
                              <div>Futures</div>
                            </div>
                          </td>
                          <td>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='h-6 w-6 text-green-600 inline'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M5 13l4 4L19 7'
                              ></path>
                            </svg>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
                    <table className='min-w-full divide-y divide-gray-200'>
                      <thead className='bg-primary'>
                        <tr>
                          <td className='px-6 py-4 font-bold text-white'>
                            Features
                          </td>
                          <td className='py-4 font-bold text-white'>
                            Supported
                          </td>
                        </tr>
                      </thead>
                      <tbody className='bg-white divide-y divide-gray-200'>
                        <tr>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <div className='text-sm font-medium text-gray-900'>
                              Live Money Trading
                            </div>
                            <div className='text-xs text-gray-600'>
                              Supports trading with real live money.
                            </div>
                          </td>
                          <td>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='h-6 w-6 text-green-600 inline'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M5 13l4 4L19 7'
                              ></path>
                            </svg>
                          </td>
                        </tr>
                        <tr>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <div className='text-sm font-medium text-gray-900'>
                              Paper Money Trading
                            </div>
                            <div className='text-xs text-gray-600'>
                              Supports trading with paper money.
                            </div>
                          </td>
                          <td>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='h-6 w-6 text-green-600 inline'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M5 13l4 4L19 7'
                              ></path>
                            </svg>
                          </td>
                        </tr>
                        <tr>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <div className='text-sm font-medium text-gray-900'>
                              Auto Submit
                            </div>
                            <div className='text-xs text-gray-600'>
                              Supports submitting orders automatically to your
                              broker without manual intervention.
                            </div>
                          </td>
                          <td>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='h-6 w-6 text-green-600 inline'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M5 13l4 4L19 7'
                              ></path>
                            </svg>
                          </td>
                        </tr>
                        <tr>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <div className='text-sm font-medium text-gray-900'>
                              Both Sides
                            </div>
                            <div className='text-xs text-gray-600'>
                              Supports both sides so you can open both long and
                              short positions.
                            </div>
                          </td>
                          <td>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='h-6 w-6 text-green-600 inline'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M5 13l4 4L19 7'
                              ></path>
                            </svg>
                          </td>
                        </tr>
                        <tr>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <div className='text-sm font-medium text-gray-900'>
                              Stop Losses
                            </div>
                            <div className='text-xs text-gray-600'>
                              Supports manually submitting stop loss orders for
                              open positions from an order form.
                            </div>
                          </td>
                          <td>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='h-6 w-6 text-green-600 inline'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M5 13l4 4L19 7'
                              ></path>
                            </svg>
                          </td>
                        </tr>
                        <tr>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <div className='text-sm font-medium text-gray-900'>
                              Take Profits
                            </div>
                            <div className='text-xs text-gray-600'>
                              Supports manually submitting take profit orders
                              for open positions from an order form.
                            </div>
                          </td>
                          <td>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='h-6 w-6 text-green-600 inline'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M5 13l4 4L19 7'
                              ></path>
                            </svg>
                          </td>
                        </tr>
                        <tr>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <div className='text-sm font-medium text-gray-900'>
                              Trailing Stops
                            </div>
                            <div className='text-xs text-gray-600'>
                              Supports manually submitting trailing stop orders
                              for open positions from an order form.
                            </div>
                          </td>
                          <td>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='h-6 w-6 text-green-600 inline'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M5 13l4 4L19 7'
                              ></path>
                            </svg>
                          </td>
                        </tr>
                        <tr>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <div className='text-sm font-medium text-gray-900'>
                              Take Profit Legs
                            </div>
                            <div className='text-xs text-gray-600'>
                              Supports sending take profit orders attached to
                              entry orders.
                            </div>
                          </td>
                          <td>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='h-6 w-6 text-green-600 inline'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M5 13l4 4L19 7'
                              ></path>
                            </svg>
                          </td>
                        </tr>
                        <tr>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <div className='text-sm font-medium text-gray-900'>
                              Stop Loss Legs
                            </div>
                            <div className='text-xs text-gray-600'>
                              Supports sending stop loss orders attached to
                              entry orders.
                            </div>
                          </td>
                          <td>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='h-6 w-6 text-green-600 inline'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M5 13l4 4L19 7'
                              ></path>
                            </svg>
                          </td>
                        </tr>
                        <tr>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <div className='text-sm font-medium text-gray-900'>
                              Trailing Stop Legs
                            </div>
                            <div className='text-xs text-gray-600'>
                              Supports sending trailing stop loss orders
                              attached to entry orders.
                            </div>
                          </td>
                          <td>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='h-6 w-6 text-green-600 inline'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M5 13l4 4L19 7'
                              ></path>
                            </svg>
                          </td>
                        </tr>
                        <tr>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <div className='text-sm font-medium text-gray-900'>
                              Shorting
                            </div>
                            <div className='text-xs text-gray-600'>
                              Supports opening short positions.
                            </div>
                          </td>
                          <td>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='h-6 w-6 text-green-600 inline'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M5 13l4 4L19 7'
                              ></path>
                            </svg>
                          </td>
                        </tr>
                        <tr>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <div className='text-sm font-medium text-gray-900'>
                              Fractional Quantity
                            </div>
                            <div className='text-xs text-gray-600'>
                              Supports trading in fractional quantities. Crypto
                              exchanges are always fractional.
                            </div>
                          </td>
                          <td>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='h-6 w-6 text-red-600 inline'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M6 18L18 6M6 6l12 12'
                              ></path>
                            </svg>
                          </td>
                        </tr>
                        <tr>
                          <td className='px-6 py-4 whitespace-nowrap'>
                            <div className='text-sm font-medium text-gray-900'>
                              Market Data
                            </div>
                            <div className='text-xs text-gray-600'>
                              Supports market data and can be used as a market
                              data source.
                            </div>
                          </td>
                          <td>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              className='h-6 w-6 text-red-600 inline'
                              fill='none'
                              viewBox='0 0 24 24'
                              stroke='currentColor'
                            >
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2'
                                d='M6 18L18 6M6 6l12 12'
                              ></path>
                            </svg>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
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
