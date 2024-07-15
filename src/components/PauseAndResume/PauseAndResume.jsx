import { Button } from '../ui/button';
import { CirclePause as CirclePauseIcon, Play as PlayIcon } from 'lucide-react';

function PauseAndResume({ isPaused, onChange }) {
  return (
    <div className='flex gap-2'>
      <Button
        onClick={() => {
          onChange();
        }}
        variant='outline'
        size='sm'
        className='flex flex-row justify-center items-center gap-2'
      >
        {isPaused ? (
          <PlayIcon className='h-4 w-4 text-green-500 shadow-green-500' />
        ) : (
          <CirclePauseIcon className='h-4 w-4 text-red-500 shadow-red-500' />
        )}
        {isPaused ? 'Resume' : 'Pause'}
      </Button>
      <div className='w-[0.9px] bg-gray-200' />
      <Button
        variant='outline'
        size='sm'
        className='flex flex-row pl-0 justify-center items-center gap-2 border-0 pointer-events-none'
      >
        <div
          className={`flex justify-center items-center w-2 h-2
              rounded-full shadow-md ${
                isPaused
                  ? 'bg-red-500 shadow-red-500'
                  : 'bg-green-500 shadow-green-500'
              }`}
        />
        {isPaused ? 'Account Paused' : 'Account Running'}
      </Button>
    </div>
  );
}

export default PauseAndResume;
