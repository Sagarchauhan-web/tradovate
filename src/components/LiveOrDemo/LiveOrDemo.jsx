import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
function LiveOrDemo() {
  return (
    <Select>
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
