import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { resetPassword } from '@/services/Auth/auth';
import { useRef, useState } from 'react';
import { CiWarning } from 'react-icons/ci';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { useNavigate, useSearchParams } from 'react-router-dom';

function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [code] = useState(searchParams.get('code'));
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!code) return;

    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef?.current?.value;

    if (!password) {
      return toast({
        className: cn(
          'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
        ),
        duration: 1000,
        title: 'Warning',
        description: 'Enter password',
        action: <CiWarning className='text-4xl font-bold text-yellow-500' />,
      });
    }

    if (password !== confirmPassword) {
      return toast({
        className: cn(
          'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
        ),
        duration: 1000,
        title: 'Warning',
        description: 'Passwords do not match',
        action: <CiWarning className='text-4xl font-bold text-yellow-500' />,
      });
    }

    const payload = {
      code: code,
      password: password,
    };

    const response = await resetPassword(payload);

    if (!response.error) {
      toast({
        className: cn(
          'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
        ),
        duration: 1000,
        position: 'top-center',
        title: 'Success',
        action: <IoIosCheckmarkCircle className='text-4xl text-green-500' />,
      });
      navigate('/');
    }
  };

  return (
    <div className='h-screen flex flex-col'>
      <div className='flex justify-center items-center h-full'>
        <Card className=' space-between rounded-none mx-10 md:m-0'>
          <div className='w-full md:w-3/4 m-auto'>
            <CardHeader className='mb-6'>
              <CardTitle className='text-3xl mt-14'>Reset Password</CardTitle>
              <CardDescription>
                Unlock the power of markets and start your trading adventure!
              </CardDescription>
            </CardHeader>
            <form onSubmit={onSubmit}>
              <CardContent className='pb-0'>
                <div className='grid w-full items-center gap-4'>
                  <div className='flex flex-col space-y-1.5'>
                    <Label htmlFor='framework'>Password*</Label>
                    <Input
                      ref={passwordRef}
                      type='password'
                      className='rounded-full'
                      id='name'
                      placeholder='Enter Password'
                    />
                  </div>

                  <div className='flex flex-col space-y-1.5'>
                    <Label htmlFor='framework'>Confirm Password*</Label>
                    <Input
                      ref={confirmPasswordRef}
                      type='password'
                      className='rounded-full'
                      id='name'
                      placeholder='Enter Password Again'
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className='w-full mt-5 flex flex-col space-between'>
                <Button type='submit' className='w-full rounded-full'>
                  Reset
                </Button>
              </CardFooter>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default ResetPassword;
