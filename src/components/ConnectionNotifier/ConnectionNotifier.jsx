import { useState } from 'react';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader } from '../ui/dialog';
import { ConfirmationDialog } from './ConfirmationDialog';
import TermConditions from './TermConditions';
import Privacy from './Privacy';

function ConnectionNotifier({ isConnected, onTradovateDisconnectedClick }) {
  const [dialogBox, setDialogBox] = useState(false);
  const [policy, setPolicy] = useState('terms');
  const [confirmation, setConfirmation] = useState(false);

  return (
    <div>
      <Dialog open={dialogBox} onOpenChange={setDialogBox}>
        {(policy === 'terms' || policy === 'privacy') && (
          <DialogContent className='max-w-full h-[95%] w-[95%] overflow-y-scroll rounded-xl'>
            <DialogHeader>
              {policy === 'privacy' && <Privacy />}
              {policy === 'terms' && <TermConditions />}
            </DialogHeader>
          </DialogContent>
        )}
      </Dialog>
      <ConfirmationDialog
        setDialogBox={setDialogBox}
        confirmation={confirmation}
        setConfirmation={setConfirmation}
        setPolicy={setPolicy}
        onTradovateDisconnectedClick={() => onTradovateDisconnectedClick()}
      />
      <Button
        onClick={() => {
          setConfirmation(true);
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
