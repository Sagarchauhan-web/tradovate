import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { setAccountMaxLoss } from '@/services/Liquidity/liquidity';
import { useEffect, useState } from 'react';

export function LiquidityModal({
  open,
  setOpen,
  defaultData,
  getAccountMaxLossList,
}) {
  const [formValues, setFormValues] = useState();

  useEffect(() => {
    setFormValues({
      daily_loss: defaultData?.daily_loss,
      daily_profit: defaultData?.daily_profit,
      id: defaultData?.id,
      weekly_loss: defaultData?.weekly_loss,
      weekly_profit: defaultData?.weekly_profit,
    });
  }, [defaultData]);

  const submitData = async (formValues) => {
    const obj = {
      account_id: Number(formValues?.account_id),
      daily_profit: Number(formValues?.daily_profit),
      daily_loss: Number(formValues?.daily_loss),
      weekly_profit: Number(formValues?.weekly_profit),
      weekly_loss: Number(formValues?.weekly_loss),
    };
    const response = await setAccountMaxLoss(obj);

    if (!response.error) {
      setOpen(false);
      getAccountMaxLossList(Number(formValues?.account_id));
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Edit Liquidity Details</DialogTitle>
          <DialogDescription>
            Make changes to your Liquidity details here. Click save when done.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='daily_loss' className='text-right'>
              Daily Loss
            </Label>
            <Input
              id='daily_loss'
              defaultValue={defaultData?.daily_loss}
              onChange={(e) => {
                setFormValues({ ...formValues, daily_loss: e.target.value });
              }}
              className='col-span-3'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='daily_profit' className='text-right'>
              Daily Profit
            </Label>
            <Input
              id='daily_profit'
              onChange={(e) => {
                setFormValues({ ...formValues, daily_profit: e.target.value });
              }}
              defaultValue={defaultData?.daily_profit}
              className='col-span-3'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='weekly_loss' className='text-right'>
              Weekly Loss
            </Label>
            <Input
              id='weekly_loss'
              defaultValue={defaultData?.weekly_loss}
              onChange={(e) => {
                console.log(e.target.value);
                setFormValues({ ...formValues, weekly_loss: e.target.value });
              }}
              className='col-span-3'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='weekly_profit' className='text-right'>
              Weekly Profit
            </Label>
            <Input
              id='weekly_profit'
              defaultValue={defaultData?.weekly_profit}
              onChange={(e) => {
                setFormValues({ ...formValues, weekly_profit: e.target.value });
              }}
              className='col-span-3'
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type='submit'
            onClick={async () => {
              await submitData({ ...formValues, account_id: defaultData?.id });
              setOpen(false);
            }}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
