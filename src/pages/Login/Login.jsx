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
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { login } from '@/services/auth/login';
import { useRef } from 'react';
import { CiWarning } from 'react-icons/ci';
import { MdErrorOutline } from 'react-icons/md';

export function Login() {
  const nameRef = useRef();
  const passwordRef = useRef();
  const { toast } = useToast();

  async function onSubmit(e) {
    e.preventDefault();

    const username = nameRef.current.value;
    const password = passwordRef.current.value;

    if (!username) {
      return toast({
        className: cn(
          'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
        ),
        title: 'Warning',
        description: 'Enter username',
        action: <CiWarning className='text-4xl font-bold text-yellow-500' />,
      });
    }

    const response = await login({
      username,
      password,
    });

    if (response.error) {
      toast({
        className: cn(
          'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
        ),
        position: 'top-center',
        title: 'Something went wrong',
        description: response.data,
        action: <MdErrorOutline className='text-4xl text-red-500' />,
      });
    }
  }

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
          <form onSubmit={onSubmit}>
            <CardContent className='pb-0'>
              <div className='grid w-full items-center gap-4'>
                <div className='flex flex-col space-y-1.5'>
                  <Label htmlFor='name'>Username*</Label>
                  <Input
                    ref={nameRef}
                    className='rounded-full'
                    id='name'
                    placeholder='Enter your username'
                  />
                </div>
                <div className='flex flex-col space-y-1.5'>
                  <Label htmlFor='framework'>Password*</Label>
                  <Input
                    ref={passwordRef}
                    className='rounded-full'
                    id='name'
                    placeholder='Enter Password'
                  />
                </div>
              </div>
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
              <Button type='submit' className='w-full rounded-full'>
                Login
              </Button>
              <p className='text-sm w-full mt-5'>
                Not registered yet?{' '}
                <span className='text-primary'>Create an Account</span>
              </p>
            </CardFooter>
          </form>
        </div>
      </Card>
      <div className='flex-1 flex-row space-between bg-primary'></div>
    </div>
  );
}
