import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export function ConfirmationDialog({
  confirmation,
  setConfirmation,
  setPolicy,
  onTradovateDisconnectedClick,
  setDialogBox,
}) {
  const openPolicy = (policy) => {
    setPolicy(policy);
    setDialogBox(true);
  };
  return (
    <Dialog open={confirmation} onOpenChange={setConfirmation}>
      <DialogContent className='max-w-full h-[95%] w-[95%] overflow-y-scroll rounded-xl'>
        <DialogHeader>
          <DialogTitle>Connect</DialogTitle>
        </DialogHeader>
        <div>
          PickMyTrade offers the powerful ability to fully automate the
          execution of trades through webhooks connecting your broker and
          exchange accounts. It&aposs important to keep in mind that doing so
          may come with certain risks. While experienced traders are likely to
          possess the requisite knowledge and expertise to use PickMyTrade
          safely, it&aposs important to note that not all users may be able to
          do so effectively. Regardless of your level of expertise, it&aposs
          essential to exercise caution when automating trades through
          PickMyTrade and be aware of any potential risks that may arise.
          <br />
          <br />
          BY USING PICKMYTRADE, YOU HEREBY ACKNOWLEDGE AND CONFIRM THAT YOU ARE
          AWARE OF THE INHERENT RISKS INVOLVED IN USING PickMyTrade AND
          WILLINGLY ACCEPT THESE RISKS.
          <br />
          <br />
          By using PickMyTrade, you agree to absolve the company, its parent
          company, affiliated businesses, and employees from any and all claims,
          demands, suits, causes of action, liabilities, costs, losses,
          expenses, and damages that may arise from or be related to your use of
          PickMyTrade, including but not limited to any issues arising from
          errors, malfunctions, or downtime in the PickMyTrade system or those
          of its vendors. It is your responsibility to monitor your positions
          and ensure that your signals are being executed effectively at all
          times. Your use of PickMyTrade confirms your acceptance of this waiver
          and confirms that you have read, comprehended, and agree to the
          PickMyTrade{' '}
          <span
            className='underline decoration-blue-800 text-blue-800 cursor-pointer'
            onClick={() => openPolicy('terms')}
          >
            Terms of Service
          </span>{' '}
          and{' '}
          <span
            className='underline decoration-blue-800 text-blue-800 cursor-pointer'
            onClick={() => openPolicy('privacy')}
          >
            Privacy Policy
          </span>{' '}
          , which includes additional disclaimers and restrictions.
        </div>
        <DialogFooter className={'flex flex-wrap gap-2'}>
          <Button
            type='submit'
            className='bg-green-600 w-[10rem] hover:bg-green-700'
            onClick={() => onTradovateDisconnectedClick()}
          >
            I agree
          </Button>
          <Button
            className='bg-red-600 w-[10rem] hover:bg-red-700'
            onClick={() => setConfirmation(false)}
          >
            I don&apos;t agree
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
