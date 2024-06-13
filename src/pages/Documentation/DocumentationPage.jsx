// import a from "next/link"
import { Card } from '@/components/ui/card';

import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/dark.css';
import image1 from '../../assets/1.png';
import image2 from '../../assets/2.png';
import image3 from '../../assets/3.png';
import image4 from '../../assets/4.png';
import image5 from '../../assets/5.png';
import image6 from '../../assets/6.png';
import AlertBanner from '../../assets/alertbanner.png';
import Configure from '../../assets/configure.png';
import Settings from '../../assets/settings.png';

import { ListCollapse, Menu, Package2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import CopyButtonPlugin from 'highlightjs-copy';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

hljs.registerLanguage('javascript', javascript);
export function DoumentationPage() {
  const navigate = useNavigate();
  const codeRef = useRef(null);
  const [page, setPage] = useState('alert');

  useEffect(() => {
    hljs.addPlugin(new CopyButtonPlugin({ hook: (text) => text }));
    hljs.highlightBlock(codeRef.current);
  }, []);

  const handlePageChange = (pageName) => {
    if (pageName === page)
      return 'flex items-center gap-3 rounded-lg cursor-pointer bg-muted px-3 py-2 text-primary transition-all hover:text-primary';

    return 'flex items-center gap-3 rounded-lg cursor-pointer px-3 py-2 text-muted-foreground transition-all hover:text-primary';
  };

  return (
    <div className='grid min-h-screen max-w-screen md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
      <div className='hidden border-r bg-muted/40 md:block'>
        <div className='flex h-full max-h-screen flex-col gap-2'>
          <div className='flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6'>
            <a href='/' className='flex items-center gap-2 font-semibold'>
              <Package2 className='h-6 w-6' />
              <span className=''>Documentation</span>
            </a>
          </div>
          <div className='flex-1'>
            <nav className='grid items-start px-2 text-sm font-medium lg:px-4'>
              <a
                onClick={() => setPage('alert')}
                className={handlePageChange('alert')}
              >
                Alert Format Explanation
              </a>
              <a
                onClick={() => setPage('configure')}
                className={handlePageChange('configure')}
              >
                How To Configure Alerts
              </a>
              <a
                onClick={() => setPage('setting')}
                className={handlePageChange('setting')}
              >
                Setting windows
              </a>
            </nav>
          </div>
        </div>
      </div>
      <div className='flex flex-col'>
        <header className='flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6'>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant='outline'
                size='icon'
                className='shrink-0 md:hidden'
              >
                <Menu className='h-5 w-5' />
                <span className='sr-only'>Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side='left' className='flex flex-col'>
              <nav className='grid items-start px-2 text-sm font-medium lg:px-4'>
                <a
                  onClick={() => setPage('alert')}
                  className={handlePageChange('alert')}
                >
                  Alert Format Explanation
                </a>
                <a
                  onClick={() => setPage('configure')}
                  className={handlePageChange('configure')}
                >
                  How To Configure Alerts
                </a>
                <a
                  onClick={() => setPage('setting')}
                  className={handlePageChange('setting')}
                >
                  Setting windows
                </a>
              </nav>
            </SheetContent>
          </Sheet>
          <div className='w-full flex-1'></div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='secondary' size='icon' className='rounded-full'>
                <ListCollapse className='h-5 w-5' />
                <span className='sr-only'>Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/')}>
                Home Page
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/dashboard/home')}>
                Dashboard
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
          <div className='max-w-full'>
            {page === 'alert' && (
              <>
                <h1 className='mt-5 mb-10 scroll-m-20 text-1xl font-bold tracking-tight lg:text-3xl'>
                  Alert format Explanation :{' '}
                </h1>
                <div className='flex flex-col items-start space-y-4 pb-4'>
                  <div className='relative mx-auto w-full rounded-lg shadow-md'>
                    <a
                      href='https://youtu.be/FAWSkWodkLs'
                      target='_blank'
                      className='relative block w-full bg-white 
                      rounded-lg overflow-hidden'
                    >
                      <span className='sr-only'>
                        Watch our video to learn more
                      </span>
                      <img
                        alt='Hero'
                        className='mx-auto object-cover h-72 object-fit'
                        height='200'
                        src={AlertBanner}
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

                <pre>
                  <code className='javascript' ref={codeRef}>
                    {`
    symbol: '{{ticker}}',
    date: '{{timenow}}',
    data: 'buy',
    quantity: 3,
    risk_percentage: 0,
    price: '{{close}}',
    tp: 0,
    sl: 0,
    trail: 0,
    update_tp: false,
    update_sl: false,
    token: 'Ct8tPtDt32EtYtCtVtVtUtL',
    duplicate_position_allow: false,
    reverse_order_close: true
    `}
                  </code>
                </pre>

                <h3 className='mt-8 text-2xl font-semibold tracking-tight'>
                  Symbol
                </h3>
                <h4 className='leading-7 [&:not(:first-child)]:mt-2'>
                  {`This would be symbol of Trading View symbol. We would give
            mapping in setting screen of pickmytrade.trade . When this symbol trade
            would come it would pick setting based on that sysmbol and would find
            out what is tradovate symbol for that and what is tp and sl setting etc.
            In case Tradigview alert you can use PlaceHolder {{ ticker }}`}
                </h4>
                <Card className='m-10 flex justify-center items-center'>
                  <img src={image1} alt='Description' />
                </Card>
                <h3 className='mt-8 text-2xl font-semibold tracking-tight'>
                  Date
                </h3>
                <h4 className='leading-7 [&:not(:first-child)]:mt-2'>
                  {`is used to identify
            duplicate alert in case of Tradingview alert you can use placeholder
            "{{timenow}}" `}
                </h4>
                <h3 className='mt-8 text-2xl font-semibold tracking-tight'>
                  data
                </h3>
                <h4 className='leading-7 [&:not(:first-child)]:mt-2'>
                  {`There we would give direction like buy or sell .
             in case of alert is configured on strategy than you can use
              placeholder ",//{{strategy.order.action}} `}
                </h4>
                <h3 className='mt-8 text-2xl font-semibold tracking-tight'>
                  quantities
                </h3>
                <h4 className='leading-7 [&:not(:first-child)]:mt-2'>
                  {`you can give quantity in absolute
             no of contract you want to buy or sell for this alert `}
                </h4>
                <h3 className='mt-8 text-2xl font-semibold tracking-tight'>
                  risk percentage
                </h3>
                <h4 className='leading-7 [&:not(:first-child)]:mt-2'>
                  {`it could be used to calculate quantity based on
            account value and stop loss. In case you set that than pass quantity
            as 0 and stop loss value should be passed . it calculate quantity =
             ((account_value_in_tradovate X risk_percentage)/100) / abs(sl price-entry price)/ lotsize `}
                </h4>
                <h3 className='mt-8 text-2xl font-semibold tracking-tight'>
                  price
                </h3>
                <h4 className='leading-7 [&:not(:first-child)]:mt-2'>
                  {`This is used at two place first in case setting you
             configured order type as LMT then it would place limit
              price as price and another it used to calculate if risk_percentage is set `}
                </h4>
                <Card className='m-10 flex justify-center items-center'>
                  <img src={image2} alt='Description' />
                </Card>
                <h3 className='mt-8 text-2xl font-semibold tracking-tight'>
                  tp
                </h3>
                <h4 className='leading-7 [&:not(:first-child)]:mt-2'>
                  {`it’s used to place Take profit order in case you don’t
            want to set take profit price. you can set in setting windows as
            absolute no of tick or in percentage. It would first check if TP come in
            alerts then place trade on that and if TP comes as 0 then would
            check in setting windows and if there is also zero than tp would not be placed  `}
                </h4>
                <h3 className='mt-8 text-2xl font-semibold tracking-tight'>
                  sl
                </h3>
                <h4 className='leading-7 [&:not(:first-child)]:mt-2'>
                  {`it’s used to place Stop Loss  order in case you don’t want to set
            stop loss price. you can set in setting windows as absolute no of tick or in
            percentage. It would first check if sl come in alerts then place trade on that
             and if sl  comes as 0 then would check in setting windows and if there is also
             zero than sl  would not be placed. This would be used in account value calculation
             if risk percentage is used . `}
                </h4>
                <h3 className='mt-8 text-2xl font-semibold tracking-tight'>
                  trail
                </h3>
                <h4 className='leading-7 [&:not(:first-child)]:mt-2'>
                  {`There you can specify trail percentage and if you pass this then you need to
            pass sl as well so trail stop order would be sent instead of normal stop order `}
                </h4>
                <h3 className='mt-8 text-2xl font-semibold tracking-tight'>
                  update_tp
                </h3>
                <h4 className='leading-7 [&:not(:first-child)]:mt-2'>
                  {`by default it’s value would be false but in case you
            want to update tp of existing trade than you pass update_tp as True and
            it would update price of take profit order with  current alert tp price `}
                </h4>
                <h3 className='mt-8 text-2xl font-semibold tracking-tight'>
                  token
                </h3>

                <h4 className='leading-7 [&:not(:first-child)]:mt-2'>
                  {`you need to pass your account token here which
            you can get for there . Don’t share this with anyone.
            Since this is unique to you for trade. `}
                </h4>
                <h3 className='mt-8 text-2xl font-semibold tracking-tight'>
                  duplicate_position_allow
                </h3>
                <h4 className='leading-7 [&:not(:first-child)]:mt-2'>
                  {`it can have value as true or false if it’s false it would not allow same position to be created again. Let’s say if you have buy position and you again get alert for buy then it would ignore new alerts and if you set it true then it would allow to create that `}
                </h4>
                <h3 className='mt-8 text-2xl font-semibold tracking-tight'>
                  reverse_order_close
                </h3>
                <h4 className='leading-7 [&:not(:first-child)]:mt-2'>
                  {`it can have value as true or false.
    you have buy position and sell open order and you get alert for sell it would close open orders and close position as well. In case it’s value is set as True and if it’s false then it would not change existing open orders and positions.
     `}
                </h4>
                <Card className='m-10 flex justify-center items-center'>
                  <img src={image3} alt='Description' />
                </Card>
              </>
            )}

            {page === 'configure' && (
              <>
                <h1 className='mt-5 mb-10 scroll-m-20 text-1xl font-bold tracking-tight lg:text-3xl'>
                  How to configure alerts{' '}
                </h1>
                <div className='flex flex-col items-start space-y-4 pb-4'>
                  <div className='relative mx-auto w-full rounded-lg shadow-md'>
                    <a
                      href='https://youtu.be/Gqd64Gu7oJw'
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
                        src={Configure}
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
                <h4 className='leading-7 [&:not(:first-child)]:mt-6 underline'></h4>
                <ul className='my-6 ml-6 list-disc [&>li]:mt-2'>
                  <li>Open alert window </li>
                  <li>Create alert. </li>
                  <li>In Condition select your indicator or strategy </li>
                  <li>
                    In alert text you need to enter alert text for buy and sell
                    alerts{' '}
                  </li>
                  <li>
                    Enter webhook url in notification tab:-
                    https://pickmytrade.trade/api/add-trade-data{' '}
                  </li>
                </ul>
                <Card className='m-10 flex justify-center items-center'>
                  <img src={image4} alt='Description' />
                </Card>
                <Card className='m-10 flex justify-center items-center'>
                  <img src={image5} alt='Description' />
                </Card>
              </>
            )}

            {page === 'setting' && (
              <>
                <h1 className='mt-5 mb-10 scroll-m-20 text-1xl font-bold tracking-tight lg:text-3xl'>
                  Setting windows:{' '}
                </h1>
                <div className='flex flex-col items-start space-y-4 pb-4'>
                  <div className='relative mx-auto w-full rounded-lg shadow-md'>
                    <a
                      href='https://youtu.be/rY5x3sCvgyA'
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
                        src={Settings}
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
                <h4 className='leading-7 [&:not(:first-child)]:mt-0'></h4>
                <Card className='m-10 flex justify-center items-center'>
                  <img src={image6} alt='Description' />
                </Card>
                <h3 className='mt-8 text-2xl font-semibold tracking-tight'>
                  Symbol
                </h3>
                <h4 className='leading-7 [&:not(:first-child)]:mt-2'>
                  There we define the symbol for which we are defining settings.
                  Symbol would be the same whater is coming from tardingview{' '}
                </h4>
                <h3 className='mt-8 text-2xl font-semibold tracking-tight'>
                  Order Type
                </h3>
                <h4 className='leading-7 [&:not(:first-child)]:mt-2'>
                  We can configure entry order type as Market or Limit order .
                  In case of Limit order would place Limit order for the price
                  which would come from tardingview{' '}
                </h4>
                <h3 className='mt-8 text-2xl font-semibold tracking-tight'>
                  Quantity
                </h3>
                <h4 className='leading-7 [&:not(:first-child)]:mt-2'>
                  In case you don’t pass quantity from alert it would take trade
                  based on whatever quantity you configured there .{' '}
                </h4>
                <h3 className='mt-8 text-2xl font-semibold tracking-tight'>
                  Tradovate Symbol
                </h3>
                <h4 className='leading-7 [&:not(:first-child)]:mt-2'>
                  There we defined for Tradingview symbol what tradovate trade
                  need to be placed{' '}
                </h4>
                <h3 className='mt-8 text-2xl font-semibold tracking-tight'>
                  Stop Loss
                </h3>
                <h4 className='leading-7 [&:not(:first-child)]:mt-2'>
                  You enter value in absolute tick and in case you checked stop
                  loss in percentage than it would place in percentage based on
                  entry price{' '}
                </h4>
                <h3 className='mt-8 text-2xl font-semibold tracking-tight'>
                  Take Profit
                </h3>
                <h4 className='leading-7 [&:not(:first-child)]:mt-2'>
                  You enter value in absolute tick and in case you checked take
                  profit in percentage than it would place in percentage based
                  on entry price{' '}
                </h4>
                <h3 className='mt-8 text-2xl font-semibold tracking-tight'>
                  Entry offset
                </h3>
                <h4 className='leading-7 [&:not(:first-child)]:mt-2 mb-10'>
                  This is useful for Limit order. You can specify no of tick
                  above/below the price which comes from alert. Eg : In case Buy
                  alert of NQ at 17500 and you specified 10 then you entry Limit
                  order would be place 17500 + (10 X 0.25) = 17502.25. In case
                  you specify -10 then Limit order would be placed 17500 + (-10
                  X 0.25) = 17497.75{' '}
                </h4>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
