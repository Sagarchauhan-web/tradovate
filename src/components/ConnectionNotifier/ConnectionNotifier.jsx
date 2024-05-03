import { useState } from 'react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader } from '../ui/dialog';

function ConnectionNotifier({ isConnected, onTradovateDisconnectedClick }) {
  const [dialogBox, setDialogBox] = useState(false);
  const [policy, setPolicy] = useState('terms');

  return (
    <div>
      <Dialog open={dialogBox} onOpenChange={setDialogBox}>
        {(policy === 'terms' || policy === 'privacy') && (
          <DialogContent className='max-w-full h-[95%] w-[95%] overflow-y-scroll rounded-xl'>
            <DialogHeader>
              {/* {policy === 'terms' && <TermsAndServices />} */}
              TradersPost offers the powerful ability to fully automate the
              execution of trades through webhooks connecting your broker and
              exchange accounts. It&aposs important to keep in mind that doing
              so may come with certain risks. While experienced traders are
              likely to possess the requisite knowledge and expertise to use
              TradersPost safely, it&aposs important to note that not all users
              may be able to do so effectively. Regardless of your level of
              expertise, it&aposs essential to exercise caution when automating
              trades through TradersPost and be aware of any potential risks
              that may arise. BY USING TRADERSPOST, YOU HEREBY ACKNOWLEDGE AND
              CONFIRM THAT YOU ARE AWARE OF THE INHERENT RISKS INVOLVED IN USING
              TRADERSPOST AND WILLINGLY ACCEPT THESE RISKS. By using
              TradersPost, you agree to absolve the company, its parent company,
              affiliated businesses, and employees from any and all claims,
              demands, suits, causes of action, liabilities, costs, losses,
              expenses, and damages that may arise from or be related to your
              use of TradersPost, including but not limited to any issues
              arising from errors, malfunctions, or downtime in the TradersPost
              system or those of its vendors. It is your responsibility to
              monitor your positions and ensure that your signals are being
              executed effectively at all times. Your use of TradersPost
              confirms your acceptance of this waiver and confirms that you have
              read, comprehended, and agree to the TradersPost Terms of Service
              and Privacy Policy, which includes additional disclaimers and
              restrictions.
            </DialogHeader>
          </DialogContent>
        )}
      </Dialog>
      <Button
        onClick={() => {
          onTradovateDisconnectedClick(isConnected);
          // setDialogBox(true);
        }}
        variant='outline'
        size='sm'
        className='flex flex-row justify-center items-center gap-2'
      >
        <div
          className={`flex justify-center items-center w-2 h-2
              rounded-full shadow-md ${
                isConnected
                  ? 'bg-green-500 shadow-green-500'
                  : 'bg-red-500 shadow-red-500'
              }`}
        />
        {isConnected ? 'Tradovate Connected' : 'Tradovate Disconnected'}
      </Button>
    </div>
  );
}

export default ConnectionNotifier;
