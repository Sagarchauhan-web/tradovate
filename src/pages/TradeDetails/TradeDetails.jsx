import MaxWidthWrapper from '@/components/MaxWithWrapper';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { IoArrowBackOutline } from 'react-icons/io5';
import { useNavigate, useLocation } from 'react-router-dom';

function TradeDetails() {
  const { state: data } = useLocation();
  const navigate = useNavigate();
  console.log(data);

  return (
    <div className='h-screen flex flex-col'>
      <div className='h-[500px] bg-[#0086d1] '></div>
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
                Trade Details
              </h2>
            </div>
            <div className='mt-6 grid grid-cols-4 gap-x-8 gap-y-4 text-sm'>
              <div>
                <p className='font-semibold text-gray-600'>SYMBOL</p>
                <p className='mt-1 text-gray-800'>{data?.Symbol}</p>
              </div>
              <div>
                <p className='font-semibold text-gray-600'>Quantity</p>
                <p className='mt-1 text-gray-800'>{data?.Quantity}</p>
              </div>
              <div>
                <p className='font-semibold text-gray-600'>Security Type</p>
                <p className='mt-1 text-gray-800'>{data?.SecurityType}</p>
              </div>

              <div>
                <p className='font-semibold text-gray-600'>Take Profit</p>
                <p className='mt-1 text-gray-800'>{data?.TakeProfit}</p>
              </div>
              <div>
                <p className='font-semibold text-gray-600'>Stop Loss</p>
                <p className='mt-1 text-gray-800'>{data?.StopLoss}</p>
              </div>
              <div>
                <p className='font-semibold text-gray-600'>
                  Take Profit Percentage
                </p>
                <p className='mt-1 text-gray-800'>
                  {data?.TakeProfitPercentage ? 'Yes' : 'No'}
                </p>
              </div>
              <div>
                <p className='font-semibold text-gray-600'>
                  Stop Loss Percentage
                </p>
                <p className='mt-1 text-gray-800'>
                  {data?.StopLossPercentage ? 'Yes' : 'No'}
                </p>
              </div>
              <div>
                <p className='font-semibold text-gray-600'>
                  Entry Offset in Percentage
                </p>
                <p className='mt-1 text-gray-800'>
                  {data?.EntryOffsetInPercentage ? 'Yes' : 'No'}
                </p>
              </div>
              <div>
                <p className='font-semibold text-gray-600'>Entry Offset</p>
                <p className='mt-1 text-gray-800'>{data?.EntryOffset}</p>
              </div>
              <div>
                <p className='font-semibold text-gray-600'>Local Symbol</p>
                <p className='mt-1 text-gray-800'>{data?.LocalSymbol}</p>
              </div>
              <div>
                <p className='font-semibold text-gray-600'>Quantity Type</p>
                <p className='mt-1 text-gray-800'>{data?.QuantityType}</p>
              </div>
              <div>
                <p className='font-semibold text-gray-600'>ORDERTYPE</p>
                <p className='mt-1 text-gray-800'>{data?.OrderType}</p>
              </div>
            </div>
          </ScrollArea>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}

export default TradeDetails;
