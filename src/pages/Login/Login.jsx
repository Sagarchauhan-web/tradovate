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
import { login } from '@/services/auth/auth';
import { useRef, useState } from 'react';
import { CiWarning } from 'react-icons/ci';
import { MdErrorOutline } from 'react-icons/md';
import { FaCheckCircle } from 'react-icons/fa';
import { register } from '@/services/auth/register';

export function Login() {
  const [isRegisterPage, setIsRegisterPage] = useState(true);
  const nameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const { toast } = useToast();

  async function onSubmit(e) {
    e.preventDefault();

    const username = nameRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef?.current?.value;

    if (isRegisterPage) {
      if (password !== confirmPassword) {
        return toast({
          className: cn(
            'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
          ),
          duration: 3000,
          title: 'Warning',
          description: 'Passwords do not match',
          action: <CiWarning className='text-4xl font-bold text-yellow-500' />,
        });
      }
    }

    if (!username) {
      return toast({
        className: cn(
          'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
        ),
        duration: 3000,
        title: 'Warning',
        description: 'Enter username',
        action: <CiWarning className='text-4xl font-bold text-yellow-500' />,
      });
    }

    if (!password) {
      return toast({
        className: cn(
          'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
        ),
        duration: 3000,
        title: 'Warning',
        description: 'Enter password',
        action: <CiWarning className='text-4xl font-bold text-yellow-500' />,
      });
    }

    let response;

    if (isRegisterPage) {
      response = await register({
        email: username,
        password,
      });
    } else {
      response = await login({
        username,
        password,
      });
    }

    console.log(response, 'here response');

    if (response.error) {
      toast({
        className: cn(
          'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
        ),
        duration: 3000,
        position: 'top-center',
        title: 'Something went wrong',
        description: response.data,
        action: <MdErrorOutline className='text-4xl text-red-500' />,
      });
    } else {
      toast({
        className: cn(
          'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
        ),
        duration: 3000,
        position: 'top-center',
        title: 'Succesfull',
        description: response.data,
        action: <FaCheckCircle className='text-4xl text-green-500' />,
      });
    }
  }

  return (
    <div className='min-h-screen flex justify-center items-center'>
      <div className='w-full h-[730px] flex flex-row py-[40px] md:mx-10'>
        <Card className='flex-1 space-between rounded-none mx-10 md:m-0'>
          <div className='w-full md:w-3/4 m-auto'>
            <CardHeader className='mb-6'>
              <CardTitle className='text-3xl mt-14'>
                {isRegisterPage ? 'Register' : 'Login'}
              </CardTitle>
              <CardDescription>
                Unlock the power of markets and start your trading adventure!
              </CardDescription>
            </CardHeader>
            <form onSubmit={onSubmit}>
              <CardContent className='pb-0'>
                <div className='grid w-full items-center gap-4'>
                  <div className='flex flex-col space-y-1.5'>
                    <Label htmlFor='name'>
                      {isRegisterPage ? 'Email*' : 'Username*'}
                    </Label>
                    <Input
                      ref={nameRef}
                      className='rounded-full'
                      id='name'
                      placeholder={`Enter${
                        isRegisterPage ? ' Email' : ' username'
                      }`}
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
                  {isRegisterPage && (
                    <div className='flex flex-col space-y-1.5'>
                      <Label htmlFor='framework'>Confirm Password*</Label>
                      <Input
                        ref={confirmPasswordRef}
                        className='rounded-full'
                        id='name'
                        placeholder='Enter Password Again'
                      />
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className='w-full mt-5 flex flex-col space-between'>
                <div className='mb-12 w-full'>
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
                  {isRegisterPage ? 'Register' : 'Login'}
                </Button>
                <p className='text-sm w-full mt-5'>
                  {isRegisterPage
                    ? 'Already registered?'
                    : 'Not registered yet?'}{' '}
                  <span
                    className='text-primary cursor-pointer'
                    onClick={() => setIsRegisterPage(!isRegisterPage)}
                  >
                    {isRegisterPage ? 'Sign in' : 'Create an Account?'}{' '}
                  </span>
                </p>
              </CardFooter>
            </form>
          </div>
        </Card>
        <div className='flex-1 hidden flex-row space-between md:block bg-primary'></div>
      </div>
    </div>
  );
}
