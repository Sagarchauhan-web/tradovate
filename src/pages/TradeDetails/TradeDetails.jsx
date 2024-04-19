import MaxWidthWrapper from '@/components/MaxWithWrapper';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { IoArrowBackOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

function TradeDetails() {
  const navigate = useNavigate();

  return (
    <div className='h-screen flex flex-col'>
      <div className='h-[200px] bg-[#0086d1] '></div>
      <div className='flex-1 bg-[#e7e8ec]'></div>
      <MaxWidthWrapper>
        <div className='bg-white rounded-sm h-5/6 w-3/4 top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 absolute'>
          <ScrollArea className='h-full px-10 py-8'>
            <div className='flex flex-row items-center space-x-5'>
              <Button
                variant='outline'
                className='mt-1.5'
                onClick={() => navigate(-1)}
              >
                <IoArrowBackOutline />
              </Button>
              <h2 className='scroll-m-20 w-max text-2xl font-semibold tracking-tight first:mt-0'>
                Trades
              </h2>
            </div>
            <div className='mt-6 grid grid-cols-4 gap-x-8 gap-y-4 text-sm'>
              <div>
                <p className='font-semibold text-gray-600'>SYMBOL</p>
                <p className='mt-1 text-gray-800'>APPL</p>
              </div>
              <div>
                <p className='font-semibold text-gray-600'>Quantity</p>
                <p className='mt-1 text-gray-800'>100</p>
              </div>
              <div>
                <p className='font-semibold text-gray-600'>Security Type</p>
                <p className='mt-1 text-gray-800'>Stock</p>
              </div>
              <div>
                <p className='font-semibold text-gray-600'>Maturity Date</p>
                <p className='mt-1 text-gray-800'>2023-01-01</p>
              </div>
              <div>
                <p className='font-semibold text-gray-600'>Take Profit</p>
                <p className='mt-1 text-gray-800'>$150.00</p>
              </div>
              <div>
                <p className='font-semibold text-gray-600'>Stop Loss</p>
                <p className='mt-1 text-gray-800'>$140.00</p>
              </div>
              <div>
                <p className='font-semibold text-gray-600'>
                  Trailing Stop Percentage
                </p>
                <p className='mt-1 text-gray-800'>10%</p>
              </div>
              <div>
                <p className='font-semibold text-gray-600'>
                  Take Profit Percentage
                </p>
                <p className='mt-1 text-gray-800'>5%</p>
              </div>
              <div>
                <p className='font-semibold text-gray-600'>
                  Stop Loss Percentage
                </p>
                <p className='mt-1 text-gray-800'>5%</p>
              </div>
              <div>
                <p className='font-semibold text-gray-600'>Maximum Order</p>
                <p className='mt-1 text-gray-800'>1</p>
              </div>
              <div>
                <p className='font-semibold text-gray-600'>RTH</p>
                <p className='mt-1 text-gray-800'>Yes</p>
              </div>
              <div>
                <p className='font-semibold text-gray-600'>Currency</p>
                <p className='mt-1 text-gray-800'>USD</p>
              </div>
              <div>
                <p className='font-semibold text-gray-600'>Exit Time</p>
                <p className='mt-1 text-gray-800'>2023-01-01 09:30</p>
              </div>
              <div>
                <p className='font-semibold text-gray-600'>
                  Entry Offset in Percentage
                </p>
                <p className='mt-1 text-gray-800'>60</p>
              </div>
              <div>
                <p className='font-semibold text-gray-600'>Entry Offset</p>
                <p className='mt-1 text-gray-800'>10%</p>
              </div>
              <div>
                <p className='font-semibold text-gray-600'>Date Validation</p>
                <p className='mt-1 text-gray-800'>Yes</p>
              </div>
              <div>
                <p className='font-semibold text-gray-600'>Min Tick</p>
                <p className='mt-1 text-gray-800'>0.01</p>
              </div>
              <div>
                <p className='font-semibold text-gray-600'>
                  Duplicate Position
                </p>
                <p className='mt-1 text-gray-800'>No</p>
              </div>
              <div>
                <p className='font-semibold text-gray-600'>STTP Exit Time</p>
                <p className='mt-1 text-gray-800'>2023-01-01 09:31</p>
              </div>
              <div>
                <p className='font-semibold text-gray-600'>Account</p>
                <p className='mt-1 text-gray-800'>My Account</p>
              </div>
              <div>
                <p className='font-semibold text-gray-600'>Local Symbol</p>
                <p className='mt-1 text-gray-800'>APPL</p>
              </div>
              <div>
                <p className='font-semibold text-gray-600'>MOC Order</p>
                <p className='mt-1 text-gray-800'>Yes</p>
              </div>
              <div>
                <p className='font-semibold text-gray-600'>Quantity Type</p>
                <p className='mt-1 text-gray-800'>Shares</p>
              </div>
              <div>
                <p className='font-semibold text-gray-600'>Timezone</p>
                <p className='mt-1 text-gray-800'>EST</p>
              </div>
              <div>
                <p className='font-semibold text-gray-600'>Time in Force</p>
                <p className='mt-1 text-gray-800'>Day</p>
              </div>
              <div>
                <p className='font-semibold text-gray-600'>Exchange</p>
                <p className='mt-1 text-gray-800'>NYSE</p>
              </div>
              <div>
                <p className='font-semibold text-gray-600'>Position Trade</p>
                <p className='mt-1 text-gray-800'>No</p>
              </div>
              <div>
                <p className='font-semibold text-gray-600'>ORDERTYPE</p>
                <p className='mt-1 text-gray-800'>Market</p>
              </div>
              <div>
                <p className='font-semibold text-gray-600'>Trailing Stop</p>
                <p className='mt-1 text-gray-800'>Yes</p>
              </div>
              <div>
                <p className='font-semibold text-gray-600'>From Date Time</p>
                <p className='mt-1 text-gray-800'>No</p>
              </div>
              <div>
                <p className='font-semibold text-gray-600'>To Date Time</p>
                <p className='mt-1 text-gray-800'>Yes</p>
              </div>
              <div>
                <p className='font-semibold text-gray-600'>Reverse Trade</p>
                <p className='mt-1 text-gray-800'>No</p>
              </div>
            </div>
          </ScrollArea>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}

export default TradeDetails;
