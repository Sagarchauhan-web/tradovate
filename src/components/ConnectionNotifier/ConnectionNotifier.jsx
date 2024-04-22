import { Button } from '../ui/button';

function ConnectionNotifier() {
  const connect = true;
  return (
    <Button
      variant='outline'
      size='sm'
      className='flex flex-row justify-center items-center gap-2'
    >
      {connect ? 'Connected' : 'Connect'}
      {connect && (
        <div
          className={`flex justify-center items-center w-2 h-2
          rounded-full shadow-md ${
            connect
              ? 'bg-green-500 shadow-green-500'
              : 'bg-red-500 shadow-red-500'
          }`}
        />
      )}
    </Button>
  );
}

export default ConnectionNotifier;
