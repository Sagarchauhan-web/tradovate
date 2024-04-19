import { SelectComponent } from '@/components/Select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
  QUANTITY: 'Quantity',
  DOLARVALUE: 'Dollar Value',
};

function CreateTrade() {
  return (
    <div>
      <div className='flex justify-between items-center'>
        <h2 className='scroll-m-20 w-max text-2xl py-4  font-semibold tracking-tight first:mt-0'>
          Create Trades
        </h2>
        <div className='space-x-2'>
          <Button>Save</Button>
        </div>
      </div>
      <div className='mt-6 grid grid-cols-4 gap-x-8 gap-y-4 text-sm'>
        <div className='flex flex-col space-y-1.5'>
          <Label htmlFor='name'>Symbol</Label>
          <Input id='name' placeholder={`Enter Symbol`} />
        </div>
        <div className='flex flex-col space-y-1.5'>
          <Label htmlFor='name'>Order Type</Label>
          <SelectComponent
            Label='Order Type'
            placeholder={`Enter Order Type`}
            onChange={(value) => console.log('here', value)}
            data={Object.entries(ORDERTYPE).map(([key, value]) => ({
              value,
              title: key,
            }))}
          />
        </div>
        <div className='flex flex-col space-y-1.5'>
          <Label htmlFor='name'>Quantity</Label>
          <Input id='name' placeholder={`Enter Quantity`} />
        </div>
        <div className='flex flex-col space-y-1.5'>
          <Label htmlFor='name'>Quantity Type</Label>
          <SelectComponent
            Label='Order Type'
            placeholder={`Enter Order Type`}
            onChange={(value) => console.log('here', value)}
            data={Object.entries(QUANTITYTYPE).map(([key, value]) => ({
              value,
              title: key,
            }))}
          />
        </div>
        <div className='flex flex-col space-y-1.5'>
          <Label htmlFor='name'>Security Type</Label>
          <SelectComponent
            Label='Order Type'
            placeholder={`Enter Order Type`}
            onChange={(value) => console.log('here', value)}
            data={Object.entries(SECURITYTYPE).map(([key, value]) => ({
              value,
              title: key,
            }))}
          />
        </div>
        <div className='flex flex-col space-y-1.5'>
          <Label htmlFor='name'>Tradovate Symbol</Label>
          <Input id='name' placeholder={`NQH2`} />
        </div>
        <div className='flex flex-col space-y-1.5'>
          <Label htmlFor='name'>Stop Loss</Label>
          <Input id='name' placeholder={`Enter Stop Loss`} />
        </div>
        <div className='flex flex-col space-y-1.5'>
          <Label htmlFor='name'>Take Profit</Label>
          <Input id='name' placeholder={`Enter Profit to Take`} />
        </div>
        <div className='flex flex-col space-y-1.5'>
          <Label htmlFor='name'>Entry Offset</Label>
          <Input id='name' placeholder={`Enter Entry Offset`} />
        </div>
        <div className='flex flex-col space-y-1.5'>
          <Label htmlFor='name'>Min Tick</Label>
          <Input id='name' placeholder={`Enter Min Tick`} />
        </div>
      </div>
    </div>
  );
}

export default CreateTrade;
