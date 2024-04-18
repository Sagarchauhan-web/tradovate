import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function Login() {
  return (
    <div className='w-full h-screen flex flex-row py-[40px] m-auto'>
      <Card className='flex-1 space-between rounded-none'>
        <div className='w-3/4 m-auto'>
          <CardHeader className='mb-6'>
            <CardTitle className='text-3xl mt-14'>Login</CardTitle>
            <CardDescription>
              Unlock the power of markets and start your trading adventure!
            </CardDescription>
          </CardHeader>
          <CardContent className='pb-0'>
            <form>
              <div className='grid w-full items-center gap-4'>
                <div className='flex flex-col space-y-1.5'>
                  <Label htmlFor='name'>Email*</Label>
                  <Input
                    className='rounded-full'
                    id='name'
                    placeholder='Enter your name'
                  />
                </div>
                <div className='flex flex-col space-y-1.5'>
                  <Label htmlFor='framework'>Password*</Label>
                  <Input
                    className='rounded-full'
                    id='name'
                    placeholder='Enter Password'
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className='w-full mt-5 flex flex-col space-between'>
            <div className='mb-16 w-full'>
              <div className='flex w-full space-x-2'>
                <Checkbox id='terms' />
                <label
                  htmlFor='terms'
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  Remember me
                </label>
              </div>
            </div>
            <Button className='w-full rounded-full'>Login</Button>
            <p className='text-sm w-full mt-5'>
              Not registered yet?{' '}
              <span className='text-primary'>Create an Account</span>
            </p>
          </CardFooter>
        </div>
      </Card>
      <div className='flex-1 flex-row space-between bg-primary'></div>
    </div>
  );
}
