// import a from "next/link"
import { Card } from '@/components/ui/card';

import image1 from '../../assets/1.png';
import image2 from '../../assets/2.png';
import image3 from '../../assets/3.png';
import image4 from '../../assets/4.png';
import image5 from '../../assets/5.png';
import image6 from '../../assets/6.png';
import AlertBanner from '../../assets/alertbanner.png';
import Configure from '../../assets/configure.png';
import Settings from '../../assets/settings.png';
import PlaceTrade from '../../assets/placetrade.jpg';

import { ListCollapse, Menu, Package2 } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
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
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CodeClipboard } from './CodeRenderer';

export function DoumentationPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const activePage = searchParams.get('page');

  const navigate = useNavigate();
  const [page, setPage] = useState(activePage);

  const handlePageChange = (pageName) => {
    if (pageName === page)
      return 'flex items-center gap-3 rounded-lg cursor-pointer bg-muted px-3 py-2 text-primary transition-all hover:text-primary ';

    return 'flex items-center gap-3 rounded-lg cursor-pointer px-3 py-2 text-muted-foreground transition-all hover:text-primary';
  };

  const CustomBadge = ({ BadgeText }) => {
    return (
      <Badge className={'text-sm cursor-pointer bg-gray-400 rounded-sm'}>
        {BadgeText}
      </Badge>
    );
  };

  const Paragraph = ({ BadgeText, children }) => {
    return (
      <div className='mt-8'>
        <h3 className=' font-semibold tracking-tight'>
          <CustomBadge BadgeText={BadgeText} />
        </h3>
        <h4 className='leading-7 [&:not(:first-child)]:mt-2'>{children}</h4>
      </div>
    );
  };

  return (
    <div className='grid min-h-screen max-w-screen md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] '>
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
                onClick={() => {
                  navigate('/documentation?page=alert');
                  setPage('alert');
                }}
                className={handlePageChange('alert')}
              >
                Alert Format Explanation
              </a>
              <a
                onClick={() => {
                  navigate('/documentation?page=configure');
                  setPage('configure');
                }}
                className={handlePageChange('configure')}
              >
                How To Configure Alerts
              </a>
              <a
                onClick={() => {
                  navigate('/documentation?page=configureTS');
                  setPage('configureTS');
                }}
                className={handlePageChange('configureTS')}
              >
                How To Configure Trail Stop
              </a>
              <a
                onClick={() => {
                  navigate('/documentation?page=placetrade');
                  setPage('placetrade');
                }}
                className={handlePageChange('placetrade')}
              >
                Place Trades in Multiple Accounts
              </a>
              <a
                onClick={() => {
                  navigate('/documentation?page=setting');
                  setPage('setting');
                }}
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
          <>
            {page === 'alert' && (
              <>
                <h1 className='mt-5 mb-5 scroll-m-20 text-1xl font-bold tracking-tight lg:text-3xl rounded-sm'>
                  Alert format Explanation: Video Explanation
                </h1>
                <div className='flex flex-col items-center justify-center space-y-4 pb-4 '>
                  <div className='relative mx-auto w-full rounded-lg shadow-md max-w-[1270px]'>
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
                        className='mx-auto h-96 object-fit'
                        height='500'
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
                <CodeClipboard
                  codeString={`
   {
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
    }
    `}
                />

                <Paragraph BadgeText='Symbol'>
                  {`This would be symbol of Trading View symbol. We would give
                              mapping in setting screen of pickmytrade.trade . When this symbol trade
                              would come it would pick setting based on that sysmbol and would find
                              out what is tradovate symbol for that and what is tp and sl setting etc.
                              In case Tradigview alert you can use PlaceHolder {{ ticker }}`}
                </Paragraph>

                <Card className='my-10 flex justify-center items-center shadow-lg'>
                  <img src={image1} alt='Description' />
                </Card>

                <Paragraph BadgeText='Date'>
                  {`Is used to identify
            duplicate alert in case of Tradingview alert you can use placeholder
            "{{timenow}}" `}
                </Paragraph>
                <Paragraph BadgeText='data'>
                  {`There we would give direction like buy or sell or Close . in case of alert is configured on strategy than you can use placeholder "{{strategy.order.action}}" In case you want to close only existing position and don't want to open new position then new to send "close" `}
                </Paragraph>
                <Paragraph BadgeText='quantities'>
                  {`you can give quantity in absolute
             no of contract you want to buy or sell for this alert `}
                </Paragraph>
                <Paragraph BadgeText='risk_percentage'>
                  {`it could be used to calculate quantity based on
            account value and stop loss. In case you set that than pass quantity
            as 0 and stop loss value should be passed . it calculate quantity =
             ((account_value_in_tradovate X risk_percentage)/100) / abs(sl price-entry price)/ lotsize `}
                </Paragraph>
                <Paragraph BadgeText='price'>
                  {`This is used at two place first in case setting you
             configured order type as LMT then it would place limit
              price as price and another it used to calculate if risk_percentage is set `}
                </Paragraph>

                <Card className='my-10 flex justify-center items-center shadow-lg'>
                  <img src={image2} alt='Description' />
                </Card>

                <Paragraph BadgeText='tp'>
                  {`it’s used to place Take profit order in case you don’t
                              want to set take profit price. you can set in setting windows as
                              absolute no of tick or in percentage. It would first check if TP come in
                              alerts then place trade on that and if TP comes as 0 then would
                              check in setting windows and if there is also zero than tp would not be placed  `}
                </Paragraph>
                <Paragraph BadgeText='sl'>
                  {`it’s used to place Stop Loss  order in case you don’t want to set
                              stop loss price. you can set in setting windows as absolute no of tick or in
                              percentage. It would first check if sl come in alerts then place trade on that
                               and if sl  comes as 0 then would check in setting windows and if there is also
                               zero than sl  would not be placed. This would be used in account value calculation
                               if risk percentage is used . `}
                </Paragraph>
                <Paragraph BadgeText='update_tp'>
                  {`There you can specify trail percentage and if you pass this then you need to
                              pass sl as well so trail stop order would be sent instead of normal stop order `}
                </Paragraph>
                <Paragraph BadgeText='trail'>
                  {`by default it’s value would be false but in case you
                              want to update tp of existing trade than you pass update_tp as True and
                              it would update price of take profit order with  current alert tp price `}
                </Paragraph>
                <Paragraph BadgeText='token'>
                  {`you need to pass your account token here which
                              you can get for there . Don’t share this with anyone.
                              Since this is unique to you for trade. `}
                </Paragraph>
                <Paragraph BadgeText='duplicate_position_allow'>
                  {`it can have value as true or false if it’s false it would not allow same position to be created again. Let’s say if you have buy position and you again get alert for buy then it would ignore new alerts and if you set it true then it would allow to create that `}
                </Paragraph>
                <Paragraph BadgeText='reverse_order_close'>
                  {`it can have value as true or false.
                      you have buy position and sell open order and you get alert for sell it would close open orders and close position as well. In case it’s value is set as True and if it’s false then it would not change existing open orders and positions.
                       `}
                </Paragraph>

                <Card className='mt-10 flex justify-center items-center shadow-lg'>
                  <img src={image3} alt='Description' />
                </Card>
              </>
            )}

            {page === 'configure' && (
              <>
                <h1 className='mt-5 mb-5 scroll-m-20 text-1xl font-bold tracking-tight lg:text-3xl'>
                  How to configure alerts: Video Explanation{' '}
                </h1>
                <div className='flex flex-col items-start space-y-4 pb-4'>
                  <div className='relative mx-auto w-full rounded-lg shadow-md max-w-[1270px]'>
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
                        className='mx-auto h-96 object-fit'
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
                <Paragraph BadgeText='Steps'>
                  <ul className='my-6 ml-6 list-disc [&>li]:mt-2'>
                    <li>Open alert window </li>
                    <li>Create alert. </li>
                    <li>In Condition select your indicator or strategy </li>
                    <li>
                      In alert text you need to enter alert text for buy and
                      sell alerts{' '}
                    </li>
                    <li>
                      Enter webhook url in notification tab:-{' '}
                      <CustomBadge
                        BadgeText={
                          'https://pickmytrade.trade/api/add-trade-data'
                        }
                      />
                    </li>
                  </ul>
                </Paragraph>

                <Card className='my-10 flex justify-center items-center shadow-lg'>
                  <img src={image4} alt='Description' />
                </Card>
                <Card className='my-10 flex justify-center items-center shadow-lg'>
                  <img src={image5} alt='Description' />
                </Card>
              </>
            )}

            {page === 'placetrade' && (
              <>
                <h1 className='mt-5 scroll-m-20 text-1xl font-bold tracking-tight lg:text-3xl'>
                  How to Place Trades in Multiple Accounts from a Single Alert
                </h1>
                <div className='flex flex-col items-start space-y-4 pb-4'>
                  <div className='relative mx-auto w-full rounded-lg shadow-md max-w-[1270px]'>
                    <a
                      href='https://youtu.be/RzHY879W3OM'
                      target='_blank'
                      className='relative block w-full bg-white rounded-lg overflow-hidden'
                    >
                      <span className='sr-only'>
                        Watch our video to learn more
                      </span>
                      <img
                        alt='Hero'
                        className='mx-auto h-96 object-fit'
                        height='200'
                        src={PlaceTrade}
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

                <Paragraph
                  BadgeText='How to Place Trades in Multiple Accounts from a Single
                      Alert'
                >
                  We've introduced a powerful feature that streamlines your
                  trading process: the ability to execute trades across multiple
                  accounts using a single alert. Whether you're managing 10 or
                  100 client accounts, this feature simplifies your workflow.
                </Paragraph>
                <Paragraph BadgeText='How It Works'>
                  <ul className='my-3 ml-6 list-disc [&>li]:mt-2'>
                    <li>
                      Enhance Your Alerts: Add the multiple_accounts tag to your
                      existing alerts. Within this tag, specify the account
                      token and account ID for each user you want to include.
                    </li>
                    <li>
                      Trade Mirroring: When the alert triggers, the same trade
                      will be executed in all the accounts listed within the
                      multiple_accounts tag.
                    </li>
                  </ul>
                </Paragraph>

                <h4 className='leading-7 text-2xl font-semibold my-10'>
                  Example Alert Structure
                </h4>
                <CodeClipboard
                  codeString={`
      {
        "symbol": "{{ticker}}",
        "date": "{{timenow}}",
        "data": "buy",
        "quantity": 3,
        "risk_percentage": 0,
        "price": "{{close}}",
        "tp": 0,
        "sl": 0,
        "trail": 0,
        "update_tp": false,
        "update_sl": false,
        "duplicate_position_allow": false,
        "reverse_order_close": true,
        "token": "At1tGt9tTt8tWtEt8tYtMtRt7",
        "account_id": "",
        "multiple_accounts": [
        {
          "token": "At1tGt9tTt8tWtEt8tYtMtRt7",
          "account_id": "DEMO291396",
          "risk_percentage": 0,
          "quantity_multiplier": 2
        },
        {
          "token": "At1tGt9tTt8tWtEt8tYtMtRt7",
          "account_id": "DEMO291396",
          "risk_percentage": 0,
          "quantity_multiplier": 2
        }
      ]
    }
                    `}
                />

                <Paragraph BadgeText='Understanding the multiple_accounts Tag'>
                  <ul className='my-3 ml-6 list-disc [&>li]:mt-2'>
                    <li>
                      token: The unique token identifying the user's account.
                      (e.g., your client's token or the token for an account you
                      manage)
                    </li>
                    <li>
                      account_id: The specific Tradovate account ID where the
                      trade should be placed for that user.
                    </li>
                    <li>
                      risk_percentage: (Optional) Control trade quantity based
                      on account value and stop loss. If used, set quantity to 0
                      and. Calculation for qty would be like this : quantity =
                      ((account_value_in_tradovate * risk_percentage) / 100) /
                      abs(sl price - entry price) / lotsize
                    </li>
                    <li>
                      quantity_multiplier: (Optional) Adjust the quantity for
                      individual accounts. If the main quantity is 3 and you
                      want 50% for this account, set it to 0.5.
                    </li>
                  </ul>
                </Paragraph>
                <Paragraph BadgeText='Important Notes'>
                  <ul className='my-3 ml-6 list-disc [&>li]:mt-2'>
                    <li>
                      Unlimited Accounts: The multiple_accounts tag can
                      accommodate an unlimited number of accounts.
                    </li>
                    <li>
                      Specify All Accounts: When using multiple_accounts,
                      include all your target accounts within this tag. Don't
                      leave any out
                    </li>
                  </ul>
                </Paragraph>
              </>
            )}

            {page === 'configureTS' && (
              <>
                <h1 className='mt-5 mb-5 scroll-m-20 text-1xl font-bold tracking-tight lg:text-3xl'>
                  How To Configure Trail Stop: Video Explanation
                </h1>
                <div className='flex flex-col items-center justify-center space-y-4 pb-4 '>
                  <div className='relative mx-auto w-full rounded-lg shadow-md max-w-[1270px]'>
                    <a
                      href='https://www.youtube.com/watch?v=pNakaSRxW5o'
                      target='_blank'
                      className='relative block w-full bg-white 
                      rounded-lg overflow-hidden'
                    >
                      <span className='sr-only'>
                        Watch our video to learn more
                      </span>
                      <img
                        alt='Hero'
                        className='mx-auto h-96 object-fit'
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
                <CodeClipboard
                  codeString={`
        {
          "symbol":"{{ticker}}",
          "date":"{{timenow}}",
          "data":"buy",
          "quantity":3,
          "risk_percentage":0,
          "price":"{{close}}",
          "tp":0,
          "sl":0,
          "update_tp":false,
          "update_sl":false,
          "duplicate_position_allow":false,
          "reverse_order_close":true,
          "Token":"At1tGt9tTt8tWtEt8tYtMtRt7",
          "account_id":"", 
          "trail":0,
          "trail_stop":0.25, 
          "trail_trigger":0.25, 
          "trail_freq":0.25
        }
                    `}
                />

                <Paragraph BadgeText='trail_stopLoss'>
                  {`Trailing distance relative to the current price`}
                </Paragraph>
                <Paragraph BadgeText='trail_trigger'>
                  {`Amount of profit in price-value before the auto-trail converts your stop to a trailing stop`}
                </Paragraph>
                <Paragraph BadgeText='trail_freq'>
                  {` the amount of change that must occur before the trailing stop will move, or the granularity of updates. If set to the instrument tick size, this will cause the stop to move on every positive tick ("positive" relative to your current position).`}
                </Paragraph>
                <Paragraph BadgeText='trail'>
                  <ul className='my-3 ml-6 list-disc [&>li]:mt-2'>
                    <li>
                      if trail is set to 0 it will not place the trade stop.
                      order
                    </li>
                    <li>
                      if trail is set to 1 it will place the trade stop order.
                    </li>
                  </ul>
                </Paragraph>
              </>
            )}

            {page === 'setting' && (
              <>
                <h1 className='mt-5 mb-5 scroll-m-20 text-1xl font-bold tracking-tight lg:text-3xl'>
                  Setting windows: Video Explanation{' '}
                </h1>
                <div className='flex flex-col items-start space-y-4 pb-4'>
                  <div className='relative mx-auto w-full rounded-lg shadow-md max-w-[1270px]'>
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
                        className='mx-auto h-96 object-fit'
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
                <Card className='my-10 flex justify-center items-center shadow-lg'>
                  <img src={image6} alt='Description' />
                </Card>

                <Paragraph BadgeText='Symbol'>
                  There we define the symbol for which we are defining settings.
                  Symbol would be the same whater is coming from tardingview
                </Paragraph>
                <Paragraph BadgeText='Order Type'>
                  We can configure entry order type as Market or Limit order .
                  In case of Limit order would place Limit order for the price
                  which would come from tardingview
                </Paragraph>
                <Paragraph BadgeText='Quantity'>
                  In case you don’t pass quantity from alert it would take trade
                  based on whatever quantity you configured there.
                </Paragraph>
                <Paragraph BadgeText='Tradovate Symbol'>
                  There we defined for Tradingview symbol what tradovate trade
                  need to be placed.
                </Paragraph>
                <Paragraph BadgeText='Stop Loss'>
                  You enter value in absolute tick and in case you checked stop
                  loss in percentage than it would place in percentage based on
                  entry price.
                </Paragraph>
                <Paragraph BadgeText='Take Profit'>
                  You enter value in absolute tick and in case you checked take
                  profit in percentage than it would place in percentage based
                  on entry price.
                </Paragraph>
                <Paragraph BadgeText='Entry offset'>
                  This is useful for Limit order. You can specify no of tick
                  above/below the price which comes from alert. Eg : In case Buy
                  alert of NQ at 17500 and you specified 10 then you entry Limit
                  order would be place 17500 + (10 X 0.25) = 17502.25. In case
                  you specify -10 then Limit order would be placed 17500 + (-10
                  X 0.25) = 17497.75.
                </Paragraph>
              </>
            )}
          </>
        </main>
      </div>
    </div>
  );
}
