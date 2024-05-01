import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { MdErrorOutline } from 'react-icons/md';
import { toast } from '../ui/use-toast';
function LiveOrDemo({ isDemo, changeAccountType, isPaid }) {
  const [demo, setDemo] = useState('demo');

  useEffect(() => {
    if (isDemo) {
      setDemo('demo');
    } else {
      setDemo('live');
    }
  }, [isDemo]);
  console.log(demo);

  const onValueChange = (value) => {
    if (value === 'live') {
      if (!isPaid) {
        return toast({
          className: cn(
            'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
          ),
          duration: 3000,
          title: 'Error',
          description: 'Please upgrade your account to update to live',
          action: (
            <MdErrorOutline className='text-4xl font-bold text-red-500' />
          ),
        });
      }
      changeAccountType(false);
    }
    if (value === 'demo') {
      changeAccountType(false);
    }
  };
  return (
    <Select value={demo} defaultValue='demo' onValueChange={onValueChange}>
      <SelectTrigger className='h-full w-[150px]'>
        <SelectValue placeholder='Environment' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='live'>
          <div className='flex justify-center items-center'>
            <div
              className={`mr-2 w-2 h-2
                  rounded-full shadow-md bg-green-500 shadow-green-500`}
            />
            Live
          </div>
        </SelectItem>
        <SelectItem value='demo'>
          <div className='flex justify-center items-center'>
            <div
              className={`mr-2 w-2 h-2
              rounded-full shadow-md bg-red-500 shadow-red-500`}
            />
            Demo
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}

export default LiveOrDemo;
