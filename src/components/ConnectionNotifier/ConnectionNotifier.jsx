import { Button } from '../ui/button';

function ConnectionNotifier({ isConnected, onTradovateDisconnectedClick }) {
  return (
    <Button
      onClick={() => {
        onTradovateDisconnectedClick(isConnected);
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
  );
}

export default ConnectionNotifier;
