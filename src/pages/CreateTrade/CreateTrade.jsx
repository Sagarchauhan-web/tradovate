import { SelectComponent } from '@/components/Select';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { createTrade } from '@/services/Trades/trade';
import { useRef, useState } from 'react';
import { MdErrorOutline } from 'react-icons/md';
import { IoIosCheckmarkCircle } from 'react-icons/io';

const SECURITYTYPE = {
  FUT: 'FUT',
  STK: 'STK',
};

const ORDERTYPE = {
  MKT: 'MKT',
  LMT: 'LMT',
  STP: 'STP',
};

const QUANTITYTYPE = {
  QUANTITY: 'quantity',
  DOLARVALUE: 'dollarvalue',
};

function CreateTrade() {
  const symbolRef = useRef();
  const [orderType, setOrderType] = useState('');
  const [securityType, setSecurityType] = useState('');
  const quantityRef = useRef();
  const [quantityType, setQuantityType] = useState('');
  const tradovateSymbolRef = useRef();
  const stopLossRef = useRef();
  const [stopLossInPercentage, setStopLossInPercentage] = useState(false);
  const takeProfitRef = useRef();
  const [takeProfitInPercentage, setTakeProfitInPercentage] = useState(false);
  const entryOffsetRef = useRef();
  const [entryOffsetInPercentage, setEntryOffsetInPercentage] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const symbol = symbolRef.current.value;
    const quantity = quantityRef.current.value;
    const tradovateSymbol = tradovateSymbolRef.current.value;
    const stopLoss = stopLossRef.current.value;
    const takeProfit = takeProfitRef.current.value;
    const entryOffset = entryOffsetRef.current.value;

    const body = {
      Symbol: symbol,
      OrderType: orderType,
      Quantity: Number(quantity),
      QuantityType: quantityType,
      LocalSymbol: tradovateSymbol,
      SecurityType: securityType,
      StopLoss: Number(stopLoss),
      TakeProfit: Number(takeProfit),
      EntryOffset: Number(entryOffset),
      TakeProfitPercentage: takeProfitInPercentage,
      StopLossPercentage: stopLossInPercentage,
      EntryOffsetInPercentage: entryOffsetInPercentage,
    };

    const response = await createTrade(body);
    if (response.error) {
      toast({
        className: cn(
          'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
        ),
        duration: 3000,
        position: 'top-center',
        title: 'Something went wrong',
        description: response.data,
        action: <MdErrorOutline className='text-4xl text-red-500' />,
      });
    } else {
      toast({
        className: cn(
          'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
        ),
        duration: 3000,
        position: 'top-center',
        title: 'Something went wrong',
        description: response.data,
        action: <IoIosCheckmarkCircle className='text-4xl text-green-500' />,
      });
    }
    console.log(response);
  };

  return (
    <div className='px-1'>
      <form onSubmit={onSubmit}>
        <div className='flex justify-between items-center'>
          <h2 className='scroll-m-20 w-max text-2xl py-4  font-semibold tracking-tight first:mt-0'>
            Create Trades
          </h2>
          <div className='space-x-2'>
            <Button>Save</Button>
          </div>
        </div>
        <div className='mt-6 grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-4 text-sm'>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='name'>Symbol</Label>
            <Input ref={symbolRef} id='name' placeholder={`Enter Symbol`} />
          </div>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='name'>Order Type</Label>
            <SelectComponent
              value={orderType}
              Label='Order Type'
              placeholder={`Enter Order Type`}
              onChange={(value) => setOrderType(value)}
              data={Object.entries(ORDERTYPE).map(([key, value]) => ({
                value,
                title: key,
              }))}
            />
          </div>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='name'>Quantity</Label>
            <Input ref={quantityRef} id='name' placeholder={`Enter Quantity`} />
          </div>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='name'>Quantity Type</Label>
            <SelectComponent
              value={quantityType}
              Label='Quantity Type'
              placeholder={`Enter Quantity Type`}
              onChange={(value) => setQuantityType(value)}
              data={Object.entries(QUANTITYTYPE).map(([key, value]) => ({
                value,
                title: key,
              }))}
            />
          </div>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='name'>Security Type</Label>
            <SelectComponent
              value={securityType}
              Label='Security Type'
              placeholder={`Enter Security Type`}
              onChange={(value) => setSecurityType(value)}
              data={Object.entries(SECURITYTYPE).map(([key, value]) => ({
                value,
                title: key,
              }))}
            />
          </div>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='name'>Tradovate Symbol</Label>
            <Input ref={tradovateSymbolRef} id='name' placeholder={`NQH2`} />
          </div>

          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='name'>Stop Loss</Label>
            <Input
              ref={stopLossRef}
              id='name'
              placeholder={`Enter Stop Loss`}
            />
            <div className='flex items-center space-x-3'>
              <Checkbox
                onCheckedChange={(value) => setStopLossInPercentage(value)}
                checked={stopLossInPercentage}
                id='stoploss'
              />
              <label
                htmlFor='stoploss'
                className='text-sm font-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                Stop loss In Percentage
              </label>
            </div>
          </div>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='name'>Take Profit</Label>
            <Input
              ref={takeProfitRef}
              id='name'
              placeholder={`Enter Profit to Take`}
            />
            <div className='flex items-center space-x-2'>
              <Checkbox
                onCheckedChange={(value) => setTakeProfitInPercentage(value)}
                checked={takeProfitInPercentage}
                id='takeprofit'
              />
              <label
                htmlFor='takeprofit'
                className='text-sm font-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                Take Profit In Percentage
              </label>
            </div>
          </div>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='name'>Entry Offset</Label>
            <Input
              ref={entryOffsetRef}
              id='name'
              placeholder={`Enter Entry Offset`}
            />
            <div className='flex items-center space-x-2'>
              <Checkbox
                onCheckedChange={(value) => setEntryOffsetInPercentage(value)}
                checked={entryOffsetInPercentage}
                id='entryoffset'
              />
              <label
                htmlFor='entryoffset'
                className='text-sm font-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
              >
                Entry Offset In Percentage
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateTrade;
