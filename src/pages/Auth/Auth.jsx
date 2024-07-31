import Footer from '@/components/Footer/Footer';
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
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import {
  getToken,
  login,
  register,
  resetPasswordRequest,
  saveToken,
} from '@/services/Auth/auth';
import { AxiosError } from 'axios';
import { useEffect, useRef, useState } from 'react';
import { CiWarning } from 'react-icons/ci';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { MdErrorOutline } from 'react-icons/md';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export function Auth() {
  const location = useLocation();
  const [isRegisterPage, setIsRegisterPage] = useState(false);
  const nameRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const resetEmailRef = useRef();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [dialogBox, setDialogBox] = useState(false);

  useEffect(() => {
    if (location?.state?.toRegister) {
      setIsRegisterPage(true);
    }
    if (!location?.state?.toRegister) {
      setIsRegisterPage(false);
    }
  }, [location?.state?.toLogin]);

  const checkForNotification = () => {
    return toast({
      className: cn(
        'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
      ),
      duration: 2000,
      title: 'Warning',
      description: 'Logging in is required to make payment!',
      action: <CiWarning className='text-4xl font-bold text-yellow-500' />,
    });
  };

  useEffect(() => {
    const token = getToken();

    if (token) navigate('/dashboard/home');

    if (location?.state?.paymentNotification) {
      checkForNotification();
    }
  }, []);

  const resetPasswordRequestAction = async () => {
    const resetEmail = resetEmailRef.current.value;

    if (!resetEmail) {
      return toast({
        className: cn(
          'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
        ),
        duration: 1000,
        title: 'Warning',
        description: 'Please Enter Email',
        action: <CiWarning className='text-4xl font-bold text-yellow-500' />,
      });
    }
    const response = await resetPasswordRequest(resetEmail);

    if (!response.error) {
      toast({
        className: cn(
          'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
        ),
        duration: 1000,
        position: 'top-center',
        title: 'Success',
        description: 'Email Sent',
        action: <IoIosCheckmarkCircle className='text-4xl text-green-500' />,
      });
      setDialogBox(false);
    } else {
      toast({
        className: cn(
          'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
        ),
        duration: 1000,
        position: 'top-center',
        title: 'Something went wrong',
        description: response.data,
        action: <MdErrorOutline className='text-4xl text-red-500' />,
      });
    }
    console.log(response, resetEmail);
  };

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
          duration: 1000,
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
        duration: 1000,
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
        duration: 1000,
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

    if (response.error || response instanceof AxiosError) {
      toast({
        className: cn(
          'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
        ),
        duration: 1000,
        position: 'top-center',
        title: 'Something went wrong',
        description: response.data,
        action: <MdErrorOutline className='text-4xl text-red-500' />,
      });
    } else {
      if (isRegisterPage) {
        setIsRegisterPage(!isRegisterPage);
        nameRef.current.value = '';
        passwordRef.current.value = '';
        confirmPasswordRef.current.value = '';

        toast({
          className: cn(
            'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
          ),
          duration: 2000,
          position: 'top-center',
          title: 'Email Sent For Verification',
          action: <IoIosCheckmarkCircle className='text-4xl text-green-500' />,
        });
      } else {
        saveToken(response.data);
        navigate('/dashboard/home');
        toast({
          className: cn(
            'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
          ),
          duration: 1000,
          position: 'top-center',
          title: 'Success',
          action: <IoIosCheckmarkCircle className='text-4xl text-green-500' />,
        });
      }
    }
  }

  return (
    <>
      <Helmet>
        <title>PickMyTrade - Secure Login</title>
        <meta
          name='description'
          content='Securely log in to PickMyTrade to manage your stock and futures trades with Tradovate. Access your account and start trading today!'
        />
        <meta
          name='keywords'
          content='PickMyTrade, login, secure login, stock trading, futures trading, Tradovate, trading platform'
        />
        <meta name='author' content='PickMyTrade' />
        <meta property='og:title' content='PickMyTrade - Secure Login' />
        <meta
          property='og:description'
          content='Securely log in to PickMyTrade to manage your stock and futures trades with Tradovate. Access your account and start trading today!'
        />
        <meta property='og:image' content='URL_TO_YOUR_IMAGE' />
        <meta property='og:url' content='https://www.pickmytrade.com/login' />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content='PickMyTrade - Secure Login' />
        <meta
          name='twitter:description'
          content='Securely log in to PickMyTrade to manage your stock and futures trades with Tradovate. Access your account and start trading today!'
        />
        <meta name='twitter:image' content='URL_TO_YOUR_IMAGE' />
      </Helmet>
      <header className='px-6 py-10 lg:px-8 h-28 md:h-14 flex items-center border-b-2'>
        <div
          className='flex items-start justify-between w-full
           flex-col space-y-3 sm:flex-row sm:items-center'
          href='#'
        >
          <div className='flex items-center justify-center gap-5'>
            <a href='https://pickmytrade.trade/'>
              <div className='flex justify-center items-center'>
                <img src='/logo.png' alt='logo' className='w-10 h-8' />
                <p className='text-gray-800 font-bold'>PickMyTrade</p>
              </div>
            </a>
            <nav className='ml-auto flex gap-4 sm:gap-6'></nav>
          </div>
          <div className='flex gap-5'></div>
        </div>
      </header>
      <div className='flex min-h-screen w-full flex-col justify-center items-center'>
        <Dialog open={dialogBox} onOpenChange={setDialogBox}>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <CardTitle className='text-3xl'>Reset Password</CardTitle>
              <CardDescription className='pb-8'>
                Enter your email and we will send you a link to reset your
                password
              </CardDescription>
              <div className='flex flex-col space-y-1.5 gap-1 pb-8'>
                <Label htmlFor='name'>Email*</Label>
                <Input
                  ref={resetEmailRef}
                  className='rounded-full'
                  id='name'
                  placeholder={`Enter Email`}
                />
              </div>
              <Button
                onClick={resetPasswordRequestAction}
                className='w-full rounded-full'
              >
                Reset Password
              </Button>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <div className='flex-1 flex justify-center items-center'>
          <Card className=' space-between rounded-none mx-10 md:m-0'>
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
                      <Label htmlFor='name'>Email*</Label>
                      <Input
                        ref={nameRef}
                        className='rounded-full'
                        id='name'
                        placeholder={`Enter${
                          isRegisterPage ? ' Email' : ' Email'
                        }`}
                      />
                    </div>
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
                    {isRegisterPage && (
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
                    )}
                  </div>
                </CardContent>
                <CardFooter className='w-full mt-5 flex flex-col space-between'>
                  <div className='mb-12 w-full flex justify-center items-center'>
                    <div className='flex w-full space-x-2'>
                      <Checkbox id='terms' />
                      <label
                        htmlFor='terms'
                        className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                      >
                        Remember me
                      </label>
                    </div>
                    <div>
                      <p
                        onClick={() => setDialogBox(true)}
                        className='text-sm w-max text-primary cursor-pointer'
                      >
                        Forgot Password?
                      </p>
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
                      onClick={() => {
                        setIsRegisterPage(!isRegisterPage);
                        nameRef.current.value = '';
                        passwordRef.current.value = '';
                        confirmPasswordRef.current.value = '';
                      }}
                    >
                      {isRegisterPage ? 'Sign in' : 'Create an Account?'}{' '}
                    </span>
                  </p>
                </CardFooter>
              </form>
            </div>
          </Card>
        </div>
        <Footer />
      </div>
    </>
  );
}
