import { Button } from '../ui/button';
import { CirclePause as CirclePauseIcon, Play as PlayIcon } from 'lucide-react';

function PauseAndResume({ isPaused, onChange }) {
  return (
    <div>
      <Button
        onClick={() => {
          onChange();
        }}
        variant='outline'
        size='sm'
        className='flex flex-row justify-center items-center gap-2'
      >
        {isPaused ? (
          <CirclePauseIcon className='h-4 w-4 text-red-500 shadow-red-500' />
        ) : (
          <PlayIcon className='h-4 w-4 text-green-500 shadow-green-500' />
        )}
        {isPaused ? 'Pause' : 'Resume'}
      </Button>
    </div>
  );
}

export default PauseAndResume;
