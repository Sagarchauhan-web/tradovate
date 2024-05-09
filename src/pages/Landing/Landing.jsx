import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import HeroImage from '../../assets/hero.jpeg';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

export default function Landing() {
  const featuresRef = useRef(null);
  const contactRef = useRef(null);
  const aboutRef = useRef(null);
  const navigate = useNavigate();

  return (
    <div className='flex flex-col min-h-[100dvh]'>
      <header className='px-4 lg:px-6 h-14 flex items-center'>
        <div className='flex items-center justify-center' href='#'>
          <div className='flex justify-center items-center'>
            <img src='/logo.png' alt='logo' className='w-10 h-8' />
            <p className='text-gray-800 font-bold'>PickMyTrade</p>
          </div>

          <span className='sr-only'>Trading Platform</span>
        </div>
        <nav className='ml-auto flex gap-4 sm:gap-6'>
          <div
            className='text-sm font-medium hover:underline underline-offset-4 text-primary'
            onClick={() =>
              window.scrollTo({
                top: featuresRef.current.offsetTop,
                behavior: 'smooth',
              })
            }
          >
            Features
          </div>
          {/* <div
            className='text-sm font-medium hover:underline underline-offset-4 text-primary'
            href='#'
          >
            Pricing
          </div> */}
          <div
            className='text-sm font-medium hover:underline underline-offset-4 text-primary'
            onClick={() =>
              window.scrollTo({
                top: aboutRef.current.offsetTop,
                behavior: 'smooth',
              })
            }
          >
            About
          </div>
          <div
            className='text-sm font-medium hover:underline underline-offset-4 text-primary'
            onClick={() =>
              window.scrollTo({
                top: contactRef.current.offsetTop,
                behavior: 'smooth',
              })
            }
          >
            Contact
          </div>
        </nav>
      </header>
      <main className='flex-1'>
        <section className='w-full py-12 md:py-24 lg:py-24 xl:py-24'>
          <div className='container px-4 md:px-6 space-y-10 xl:space-y-16'>
            <div className='grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16'>
              <div className=' flex justify-center flex-col py-5'>
                <h1
                  className='lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl 
                xl:text-[3.4rem] 2xl:text-[3.75rem] text-primary pb-12'
                >
                  Unlock Your Trading Potential
                </h1>
                <p className='mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400'>
                  Discover our cutting-edge trading platform and take your
                  investments to new heights.
                </p>
                <div className='space-x-4 mt-6'>
                  <div
                    onClick={() => navigate('/')}
                    className='inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm 
                    font-medium text-gray-50 shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1
                     focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-primary
                      dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300 cursor-pointer'
                    href='#'
                  >
                    Get Started
                  </div>
                  {/* <div
                    className='inline-flex h-9 items-center justify-center rounded-md border border-primary cursor-pointer
                     bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-primary focus-visible:outline-none focus-visible:ring-1
                      focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800
                       dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300'
                    href='#'
                  >
                    Learn More
                  </div> */}
                </div>
              </div>
              <div className='flex flex-col items-start space-y-4'>
                <img
                  alt='Hero'
                  className='mx-auto overflow-hidden rounded-xl object-cover'
                  height='300'
                  src={HeroImage}
                  width='1270'
                />
              </div>
            </div>
          </div>
        </section>
        <section
          ref={featuresRef}
          className='w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800'
        >
          <div className='container grid items-center justify-center gap-4 px-4 md:px-6'>
            <div className='space-y-3'>
              <div className='inline-block rounded-lg bg-primary px-3 py-1 text-sm text-gray-50'>
                Key Features
              </div>
              <h2 className='text-3xl font-bold tracking-tighter md:text-4xl/tight text-primary'>
                Elevate Your Trading Experience
              </h2>
              <p className='max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400'>
                Our platform offers a comprehensive suite of tools and features
                to help you make informed trading decisions.
              </p>
            </div>
            <div className='mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3'>
              <div className='grid gap-1'>
                <h3 className='text-lg font-bold text-primary'>
                  Real-Time Market Data
                </h3>
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                  Stay on top of the latest market trends with our real-time
                  data feeds.
                </p>
              </div>
              <div className='grid gap-1'>
                <h3 className='text-lg font-bold text-primary'>
                  Advanced Analytics
                </h3>
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                  Leverage our powerful analytics tools to identify
                  opportunities and manage risk.
                </p>
              </div>
              <div className='grid gap-1'>
                <h3 className='text-lg font-bold text-primary'>
                  Customizable Dashboards
                </h3>
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                  Personalize your trading experience with our customizable
                  dashboards.
                </p>
              </div>
              <div className='grid gap-1'>
                <h3 className='text-lg font-bold text-primary'>
                  Automated Strategies
                </h3>
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                  Streamline your trading with our advanced algorithmic
                  strategies.
                </p>
              </div>
              <div className='grid gap-1'>
                <h3 className='text-lg font-bold text-primary'>
                  Secure Trading Environment
                </h3>
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                  Trade with confidence in our secure and regulated platform.
                </p>
              </div>
              <div className='grid gap-1'>
                <h3 className='text-lg font-bold text-primary'>
                  Dedicated Support
                </h3>
                <p className='text-sm text-gray-500 dark:text-gray-400'>
                  Our expert team is here to assist you every step of the way.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section ref={aboutRef} className='w-full py-12 md:py-24 lg:py-32'>
          <div className='container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10'>
            <div className='space-y-3'>
              <div className='inline-block rounded-lg bg-primary px-3 py-1 text-sm text-gray-50'>
                Testimonials
              </div>
              <h2 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary'>
                What Our Clients Say
              </h2>
              <p className='mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400'>
                Hear from our satisfied customers about their experience with
                our trading platform.
              </p>
            </div>
            <div className='divide-y rounded-lg border'>
              <div className='grid w-full grid-cols-1 items-stretch justify-center divide-x md:grid-cols-3'>
                <div className='mx-auto flex w-full items-center justify-center p-4 sm:p-8'>
                  <div className='space-y-2 text-center'>
                    <blockquote className='text-lg font-semibold leading-snug lg:text-xl lg:leading-normal xl:text-2xl text-primary'>
                      “The platform's advanced analytics have been a game
                      changer for my trading strategy.”
                    </blockquote>
                    <div>
                      <div className='font-semibold'>John Doe</div>
                      <div className='text-sm text-gray-500 dark:text-gray-400'>
                        Trader, ABC Investments
                      </div>
                    </div>
                  </div>
                </div>
                <div className='mx-auto flex w-full items-center justify-center p-4 sm:p-8'>
                  <div className='space-y-2 text-center'>
                    <blockquote className='text-lg font-semibold leading-snug lg:text-xl lg:leading-normal xl:text-2xl text-primary'>
                      “The platform's user-friendly interface and customization
                      options have made my trading experience seamless.”
                    </blockquote>
                    <div>
                      <div className='font-semibold'>Jane Smith</div>
                      <div className='text-sm text-gray-500 dark:text-gray-400'>
                        Trader, XYZ Capital
                      </div>
                    </div>
                  </div>
                </div>
                <div className='mx-auto flex w-full items-center justify-center p-8'>
                  <div className='space-y-2 text-center'>
                    <blockquote className='text-lg font-semibold leading-snug lg:text-xl lg:leading-normal xl:text-2xl text-primary'>
                      “The platform's real-time market data and automated
                      strategies have significantly improved my trading
                      performance.”
                    </blockquote>
                    <div>
                      <div className='font-semibold'>Michael Johnson</div>
                      <div className='text-sm text-gray-500 dark:text-gray-400'>
                        Trader, DEF Investments
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='grid w-full grid-cols-1 items-stretch justify-center divide-x md:grid-cols-3'>
                <div className='mx-auto flex w-full items-center justify-center p-4 sm:p-8'>
                  <div className='space-y-2 text-center'>
                    <blockquote className='text-lg font-semibold leading-snug lg:text-xl lg:leading-normal xl:text-2xl text-primary'>
                      “The platform's secure trading environment and dedicated
                      support team have given me peace of mind.”
                    </blockquote>
                    <div>
                      <div className='font-semibold'>Sarah Lee</div>
                      <div className='text-sm text-gray-500 dark:text-gray-400'>
                        Trader, GHI Investments
                      </div>
                    </div>
                  </div>
                </div>
                <div className='mx-auto flex w-full items-center justify-center p-4 sm:p-8'>
                  <div className='space-y-2 text-center'>
                    <blockquote className='text-lg font-semibold leading-snug lg:text-xl lg:leading-normal xl:text-2xl text-primary'>
                      “The platform's customizable dashboards have allowed me to
                      tailor my trading experience to my specific needs.”
                    </blockquote>
                    <div>
                      <div className='font-semibold'>David Kim</div>
                      <div className='text-sm text-gray-500 dark:text-gray-400'>
                        Trader, JKL Investments
                      </div>
                    </div>
                  </div>
                </div>
                <div className='mx-auto flex w-full items-center justify-center p-4 sm:p-8'>
                  <div className='space-y-2 text-center'>
                    <blockquote className='text-lg font-semibold leading-snug lg:text-xl lg:leading-normal xl:text-2xl text-primary'>
                      “The platform's automated strategies have saved me
                      valuable time and improved my trading consistency.”
                    </blockquote>
                    <div>
                      <div className='font-semibold'>Emily Chen</div>
                      <div className='text-sm text-gray-500 dark:text-gray-400'>
                        Trader, MNO Investments
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section
          ref={contactRef}
          className='w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800'
        >
          <div className='container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10'>
            <div className='space-y-2'>
              <h2 className='text-3xl font-bold tracking-tighter md:text-4xl/tight text-primary'>
                Join Our Trading Community
              </h2>
              <p className='max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400'>
                Sign up today and start your journey to financial success.
              </p>
            </div>
            <div className='mx-auto w-full max-w-sm space-y-2'>
              <form className='flex space-x-2'>
                <Input
                  className='max-w-lg flex-1'
                  placeholder='Enter your email'
                  type='email'
                />
                <Button
                  className='bg-primary hover:bg-primary/90 text-gray-50'
                  type='submit'
                >
                  Sign Up
                </Button>
              </form>
              <p className='text-xs text-gray-500 dark:text-gray-400'>
                Sign up to our newsletter.
                <div className='underline underline-offset-2' href='#' />
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
