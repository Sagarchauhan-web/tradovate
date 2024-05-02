import MaxWidthWrapper from '@/components/MaxWithWrapper';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { IoArrowBackOutline } from 'react-icons/io5';
import { useNavigate, useLocation } from 'react-router-dom';

function TradeDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const data = state.data;
  // const isAlert = state.isAlert;
  const isOrder = state.isOrder;
  const isSetting = state.isSetting;

  console.log(data, 'data');

  return (
    <div className='h-screen flex flex-col'>
      <MaxWidthWrapper>
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
              Details
            </h2>
          </div>
          {isSetting && (
            <div className='mt-6 grid grid-cols-4 gap-x-8 gap-y-4 text-sm'>
              <div>
                <p className='font-semibold text-gray-600'>SYMBOL</p>
                <p className='mt-1 text-gray-800'>{data?.Symbol}</p>
              </div>
              {/* <div>
                <p className='font-semibold text-gray-600'>Quantity</p>
                <p className='mt-1 text-gray-800'>{data?.Quantity}</p>
              </div>
              <div>
                <p className='font-semibold text-gray-600'>Security Type</p>
                <p className='mt-1 text-gray-800'>{data?.SecurityType}</p>
              </div> */}
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
                <p className='font-semibold text-gray-600'>Min Tick</p>
                <p className='mt-1 text-gray-800'>{data?.MinTick}</p>
              </div>
              <div>
                <p className='font-semibold text-gray-600'>Lot Size</p>
                <p className='mt-1 text-gray-800'>{data?.LotSize}</p>
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
          )}
          {isOrder && (
            <div className='mt-6 grid grid-cols-4 gap-x-8 gap-y-4 text-sm'>
              <div>
                <p className='font-semibold text-gray-600'>Account ID</p>
                <p className='mt-1 text-gray-800'>{data?.account_id}</p>
              </div>
              <div>
                <p className='font-semibold text-gray-600'>Action</p>
                <p className='mt-1 text-gray-800'>{data?.action}</p>
              </div>
              <div>
                <p className='font-semibold text-gray-600'>Admin</p>
                <p className='mt-1 text-gray-800'>
                  {data?.admin ? 'Yes' : 'No'}
                </p>
              </div>

              <div>
                <p className='font-semibold text-gray-600'>Archived</p>
                <p className='mt-1 text-gray-800'>
                  {data?.archived ? 'Yes' : 'No'}
                </p>
              </div>
              <div>
                <p className='font-semibold text-gray-600'>Contract id</p>
                <p className='mt-1 text-gray-800'>{data?.contract_id}</p>
              </div>
              <div>
                <p className='font-semibold text-gray-600'>External</p>
                <p className='mt-1 text-gray-800'>
                  {data?.external ? 'Yes' : 'No'}
                </p>
              </div>
              <div>
                <p className='font-semibold text-gray-600'>
                  Execution Provider Id
                </p>
                <p className='mt-1 text-gray-800'>
                  {data?.execution_provider_id}
                </p>
              </div>
              <div>
                <p className='font-semibold text-gray-600'>oco_id</p>
                <p className='mt-1 text-gray-800'>{data?.oco_id}</p>
              </div>
              <div>
                <p className='font-semibold text-gray-600'>Order Status</p>
                <p className='mt-1 text-gray-800'>{data?.ordStatus}</p>
              </div>
              <div>
                <p className='font-semibold text-gray-600'>Order Date</p>
                <p className='mt-1 text-gray-800'>{data?.order_date}</p>
              </div>
            </div>
          )}
        </ScrollArea>
      </MaxWidthWrapper>
    </div>
  );
}

export default TradeDetails;
