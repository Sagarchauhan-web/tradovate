import { Card } from '@/components/ui/card';
import image1 from '../../assets/1.png';
import image2 from '../../assets/2.png';
import image3 from '../../assets/3.png';
import image4 from '../../assets/4.png';
import image5 from '../../assets/5.png';
import image6 from '../../assets/6.png';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Documentation() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
    }
  }, []);

  return (
    <div>
      <h1 className='mt-5 mb-10 scroll-m-20 text-1xl font-bold tracking-tight lg:text-3xl'>
        Following is the alert format we would explain Alert format:{' '}
      </h1>
      <h2 className='leading-7 [&:not(:first-child)]:mt-6'>
        {JSON.stringify({
          symbol: '{{ticker}}',

          date: '{{timenow}}',

          data: 'buy',

          quantity: 3,

          risk_percentage: 0,

          price: '{{close}}',

          tp: 5170,

          sl: 4065,

          trail: 0,

          update_tp: false,

          update_sl: false,

          token: 'Ct8tPtDtZt1tEtYtCtVtVtUtL',
        })}
      </h2>
      <h4 className='leading-7 [&:not(:first-child)]:mt-6'>
        {`1 Symbol : This would be symbol of Trading View symbol. We would give
        mapping in setting screen of pickmytrade.trade . When this symbol trade
        would come it would pick setting based on that sysmbol and would find
        out what is tradovate symbol for that and what is tp and sl setting etc.
        In case Tradigview alert you can use PlaceHolder {{ ticker }}`}
      </h4>
      <Card className='m-10 flex justify-center items-center'>
        <img src={image1} alt='Description' />
      </Card>
      <h4 className='leading-7 [&:not(:first-child)]:mt-6'>
        {`2 Date is used to identify 
        duplicate alert in case of Tradingview alert you can use placeholder 
        "{{timenow}}" `}
      </h4>
      <h4 className='leading-7 [&:not(:first-child)]:mt-6'>
        {`3 data: There we would give direction like buy or sell .
         in case of alert is configured on strategy than you can use
          placeholder ",//{{strategy.order.action}} `}
      </h4>
      <h4 className='leading-7 [&:not(:first-child)]:mt-6'>
        {`4 quantities:  you can give quantity in absolute
         no of contract you want to buy or sell for this alert `}
      </h4>
      <h4 className='leading-7 [&:not(:first-child)]:mt-6'>
        {`5 risk percentage: it could be used to calculate quantity based on 
        account value and stop loss. In case you set that than pass quantity 
        as 0 and stop loss value should be passed . it calculate quantity =
         ((account_value_in_tradovate X risk_percentage)/100) / abs(sl price-entry price)/ lotsize `}
      </h4>
      <h4 className='leading-7 [&:not(:first-child)]:mt-6'>
        {`6 price: This is used at two place first in case setting you
         configured order type as LMT then it would place limit
          price as price and another it used to calculate if risk_percentage is set `}
      </h4>
      <Card className='m-10 flex justify-center items-center'>
        <img src={image2} alt='Description' />
      </Card>
      <h4 className='leading-7 [&:not(:first-child)]:mt-6'>
        {`7 tp : it’s used to place Take profit order in case you don’t 
        want to set take profit price. you can set in setting windows as 
        absolute no of tick or in percentage. It would first check if TP come in 
        alerts then place trade on that and if TP comes as 0 then would 
        check in setting windows and if there is also zero than tp would not be placed  `}
      </h4>
      <h4 className='leading-7 [&:not(:first-child)]:mt-6'>
        {`8 sl : it’s used to place Stop Loss  order in case you don’t want to set 
        stop loss price. you can set in setting windows as absolute no of tick or in 
        percentage. It would first check if sl come in alerts then place trade on that
         and if sl  comes as 0 then would check in setting windows and if there is also 
         zero than sl  would not be placed. This would be used in account value calculation 
         if risk percentage is used . `}
      </h4>
      <h4 className='leading-7 [&:not(:first-child)]:mt-6'>
        {`9 trail: There you can specify trail percentage and if you pass this then you need to 
        pass sl as well so trail stop order would be sent instead of normal stop order `}
      </h4>
      <h4 className='leading-7 [&:not(:first-child)]:mt-6'>
        {`10 update_tp : by default it’s value would be false but in case you 
        want to update tp of existing trade than you pass update_tp as True and 
        it would update price of take profit order with  current alert tp price `}
      </h4>
      <h4 className='leading-7 [&:not(:first-child)]:mt-6'>
        {`11 update_sl : by default it’s value would be false but in case you want
         to update sl of existing trade than you pass update_sl as 
        True and it would update price of stop loss order but current alert sl price `}
      </h4>
      <h4 className='leading-7 [&:not(:first-child)]:mt-6'>
        {`12 "token": you need to pass your account token here which 
        you can get for there . Don’t share this with anyone. 
        Since this is unique to you for trade. `}
      </h4>
      <Card className='m-10 flex justify-center items-center'>
        <img src={image3} alt='Description' />
      </Card>
      <h4 className='leading-7 [&:not(:first-child)]:mt-6 underline'>
        How to configure alerts
      </h4>
      <ul className='my-6 ml-6 list-disc [&>li]:mt-2'>
        <li>Open alert window </li>
        <li>Create alert. </li>
        <li>In Condition select your indicator or strategy </li>
        <li>
          In alert text you need to enter alert text for buy and sell alerts{' '}
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

      <h4 className='leading-7 [&:not(:first-child)]:mt-6'>
        Setting windows: -{' '}
      </h4>
      <Card className='m-10 flex justify-center items-center'>
        <img src={image6} alt='Description' />
      </Card>
      <h4 className='leading-7 [&:not(:first-child)]:mt-6'>
        1 Symbol : There we define the symbol for which we are defining
        settings. Symbol would be the same whater is coming from tardingview{' '}
      </h4>
      <h4 className='leading-7 [&:not(:first-child)]:mt-6'>
        2 Order Type : We can configure entry order type as Market or Limit
        order . In case of Limit order would place Limit order for the price
        which would come from tardingview{' '}
      </h4>
      <h4 className='leading-7 [&:not(:first-child)]:mt-6'>
        3 Quantity : In case you don’t pass quantity from alert it would take
        trade based on whatever quantity you configured there .{' '}
      </h4>
      <h4 className='leading-7 [&:not(:first-child)]:mt-6'>
        4 Tradovate Symbol: There we defined for Tradingview symbol what
        tradovate trade need to be placed{' '}
      </h4>
      <h4 className='leading-7 [&:not(:first-child)]:mt-6'>
        5 Stop Loss : You enter value in absolute tick and in case you checked
        stop loss in percentage than it would place in percentage based on entry
        price{' '}
      </h4>
      <h4 className='leading-7 [&:not(:first-child)]:mt-6'>
        6 Take Profit : You enter value in absolute tick and in case you checked
        take profit in percentage than it would place in percentage based on
        entry price{' '}
      </h4>
      <h4 className='leading-7 [&:not(:first-child)]:mt-6 mb-10'>
        7 Entry offset: This is useful for Limit order. You can specify no of
        tick above/below the price which comes from alert. Eg : In case Buy
        alert of NQ at 17500 and you specified 10 then you entry Limit order
        would be place 17500 + (10 X 0.25) = 17502.25. In case you specify -10
        then Limit order would be placed 17500 + (-10 X 0.25) = 17497.75{' '}
      </h4>
    </div>
  );
}

export default Documentation;
