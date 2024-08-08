import { PlanTooltip } from '@/components/ToolTip/ToolTip';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { CodeClipboard } from '@/pages/Documentation/CodeRenderer';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import { FaRegQuestionCircle } from 'react-icons/fa';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import { SelectComponent } from '../../components/Select';
import { CiWarning } from 'react-icons/ci';
import AutocompleteInput from '@/components/Autocomplete/Autocomplete';
import { getAccountList } from '@/services/Liquidity/liquidity';

const ALERTTYPE = {
  INDICATOR: 'INDICATOR',
  STRATEGY: 'STRATEGY',
};

const IndicatorType = {
  BUY: 'BUY',
  SELL: 'SELL',
  CLOSE: 'CLOSE',
};

const YesOrNo = {
  YES: 'YES',
  NO: 'NO',
};

const QUANTITYORRISK = {
  QUANTITY: 'QUANTITY',
  RISK_PERCENTAGE: 'RISK_PERCENTAGE',
};

const STOPLOSSTYPE = {
  DOLLAR: 'DOLLAR',
  PERCENTAGE: 'PERCENTAGE',
  PRICE: 'PRICE',
};

const TAKEPROFITTYPE = {
  DOLLAR: 'DOLLAR',
  PERCENTAGE: 'PERCENTAGE',
  PRICE: 'PRICE',
};

const TRAILORSTOPTYPE = {
  TRAIL_STOP_LOSS: 'TRAIL_STOP_LOSS',
  STOP_LOSS: 'STOP_LOSS',
};

function Alerts() {
  const user = JSON.parse(localStorage.getItem('user'));

  const [alertName, setAlertName] = useState();
  const [alertType, setAlertType] = useState();

  // Trail and stop loss
  const [stopLossOrTrailStop, setStopLossOrTrailStop] = useState('');
  const [stopLossType, setStopLossType] = useState();
  const [stopLoss, setStopLoss] = useState();

  const [trailStop, setTrailStop] = useState();
  const [trailTrigger, setTrailTrigger] = useState();
  const [trailFreq, setTrailFreq] = useState();

  // Take Profit
  const [wantTakeProfit, setWantTakeProfit] = useState();
  const [takeProfitType, setTakeProfitType] = useState();
  const [takeProfit, setTakeProfit] = useState();

  const [QuantityOrRiskPercentage, setQuantityOrRiskPercentage] = useState();
  const [quantity, setQuantity] = useState();
  const [risk, setRisk] = useState();
  const [mutipleAccountForIndication, setMutipleAccountForIndication] =
    useState();

  const [generatedObject, setGeneratedObject] = useState(false);

  const [data, setData] = useState([]);

  // Stratergy
  const [multipleAccountForStratergy, setMultipleAccountForStratergy] =
    useState('');

  const [priceAlertModel, setPriceAlertModel] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const checkValidation = () => {
    if (alertName === 'INDICATOR') {
      if (QuantityOrRiskPercentage === 'RISK_PERCENTAGE') {
        // if RISK_PERCENTAGE Either Trail stop or Stop loss is required
        if (stopLossOrTrailStop === 'TRAIL_STOP_LOSS') {
          if (!trailStop || !trailTrigger || !trailFreq || !stopLoss) {
            return toast({
              className: cn(
                'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
              ),
              duration: 5000,
              title: 'Warning',
              description:
                'Quantity is RISK_PERCENTAGE: The Stop Loss value, Trail Stop value, Trail Trigger and Trail Frequency are required',
              action: (
                <CiWarning className='text-4xl font-bold text-yellow-500' />
              ),
            });
          }
        }

        if (stopLossOrTrailStop === 'STOP_LOSS') {
          if (!stopLoss) {
            return toast({
              className: cn(
                'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
              ),
              duration: 5000,
              title: 'Warning',
              description:
                'Quantity is RISK_PERCENTAGE: the Stop Loss is required',
              action: (
                <CiWarning className='text-4xl font-bold text-yellow-500' />
              ),
            });
          }
        }
      }

      if (
        (stopLossOrTrailStop === 'STOP_LOSS' ||
          stopLossOrTrailStop === 'TRAIL_STOP_LOSS') &&
        wantTakeProfit === 'YES'
      ) {
        if (stopLossType === 'DOLLAR') {
          if (takeProfitType !== 'DOLLAR') {
            return toast({
              className: cn(
                'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
              ),
              duration: 5000,
              title: 'Warning',
              description: 'Stop Loss is DOLLAR: Take Profit must be DOLLAR',
              action: (
                <CiWarning className='text-4xl font-bold text-yellow-500' />
              ),
            });
          }
        }

        if (takeProfitType === 'DOLLAR') {
          if (stopLossType !== 'DOLLAR') {
            return toast({
              className: cn(
                'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
              ),
              duration: 5000,
              title: 'Warning',
              description: 'Take Profit is DOLLAR: Stop Loss must be DOLLAR',
              action: (
                <CiWarning className='text-4xl font-bold text-yellow-500' />
              ),
            });
          }
        }

        if (!stopLoss || !takeProfit) {
          return toast({
            className: cn(
              'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
            ),
            duration: 5000,
            title: 'Warning',
            description: 'Enter Stop Loss and Take Profit',
            action: (
              <CiWarning className='text-4xl font-bold text-yellow-500' />
            ),
          });
        }
      }

      setGeneratedObject(true);
    }

    if (alertName === 'STRATEGY') {
      setGeneratedObject(true);
    }
  };

  console.log(alertType, 'alertType');

  return (
    <div className='container mb-20'>
      <Dialog open={priceAlertModel} onOpenChange={setPriceAlertModel}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle className='mb-1'>Note</DialogTitle>
            <DialogDescription>{modalMessage}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <div className='flex items-center justify-between pt-4 mb-5'>
        <h1 className='scroll-m-20 w-max text-2xl font-semibold tracking-tight first:mt-0'>
          Alerts Creation
        </h1>
      </div>
      <div className='gap-4 py-4 '>
        <div>
          <Label htmlFor='alert' className='flex items-center'>
            Alert
            <PlanTooltip
              button={<FaRegQuestionCircle className='inline-block ml-2 ' />}
              tooltip='Choose either a strategy or indicator that you want to automate. The selected option will generate the corresponding alert for you.'
            />
          </Label>
          <SelectComponent
            Label='Alert'
            placeholder={`Select Alert`}
            value={alertName}
            onChange={(value) => {
              setAlertName(value);
              setGeneratedObject(false);
              setAlertType('');
              setStopLossOrTrailStop('');
              setStopLossType('');
              setTakeProfitType('');
              setWantTakeProfit('');
              setQuantityOrRiskPercentage('');
              setStopLoss('');
              setTrailFreq('');
              setTrailStop('');
              setTrailTrigger('');
              setMutipleAccountForIndication('');
              setMultipleAccountForStratergy('');
            }}
            data={Object.entries(ALERTTYPE).map(([key, value]) => ({
              value,
              title: key,
            }))}
          />
        </div>

        {alertName === 'INDICATOR' && (
          <>
            <div className='grid sm:grid-cols-3 gap-3'>
              <div className='mt-4'>
                <Label htmlFor='alertType' className='flex  items-center'>
                  Alert Type
                  <PlanTooltip
                    button={
                      <FaRegQuestionCircle className='inline-block ml-2 ' />
                    }
                    tooltip={
                      <div>
                        <h1 className='mb-1'>
                          We support the following actions:
                        </h1>
                        <p>
                          Buy: Opens a new Buy position, closing any previous
                          position and open orders. <br /> Sell: Opens a new
                          Sell position, closing any previous position and open
                          orders. <br /> Close: Closes any previous position and
                          open orders without opening new positions.
                        </p>
                      </div>
                    }
                  />
                </Label>
                <SelectComponent
                  Label='Alert Type'
                  placeholder={`Enter Alert Type`}
                  value={alertType}
                  onChange={(value) => {
                    setAlertType(value);

                    if (value === 'CLOSE') {
                      setStopLossOrTrailStop('');
                      setStopLossType('');
                      setTakeProfitType('');
                      setWantTakeProfit('');
                      setQuantityOrRiskPercentage('');
                      setStopLoss('');
                      setTrailFreq('');
                      setTrailStop('');
                      setTrailTrigger('');
                      setMutipleAccountForIndication('');
                      setMultipleAccountForStratergy('');
                      setData([]);
                    }
                  }}
                  data={Object.entries(IndicatorType).map(([key, value]) => ({
                    value,
                    title: key,
                  }))}
                />
              </div>

              {/* Quantity */}
              {alertType && (
                <div className='mt-4'>
                  <Label
                    htmlFor='quantityriskpercentage'
                    className='flex  items-center'
                  >
                    Quantity Type
                    <PlanTooltip
                      button={
                        <FaRegQuestionCircle className='inline-block ml-2 ' />
                      }
                      tooltip={
                        <div>
                          {' '}
                          You can specify an exact quantity for each trade, or
                          choose to base it on a risk percentage. <br /> If
                          selecting risk percentage, you must also provide a
                          stop loss value to calculate the risk amount.
                          <br /> The calculation formula is:
                          ((account_value_in_tradovate X risk_percentage) / 100)
                          / abs(sl_price - entry_price) / lot_size
                        </div>
                      }
                    />
                  </Label>
                  <SelectComponent
                    disabled={alertType === 'CLOSE'}
                    Label='Quantity Type'
                    placeholder={`Quantity Type`}
                    value={QuantityOrRiskPercentage}
                    onChange={(value) => {
                      setQuantityOrRiskPercentage(value);
                    }}
                    data={Object.entries(QUANTITYORRISK).map(
                      ([key, value]) => ({
                        value,
                        title: key,
                      }),
                    )}
                  />
                </div>
              )}

              {QuantityOrRiskPercentage === 'RISK_PERCENTAGE' && (
                <div className='mt-4'>
                  <Label
                    htmlFor='riskPercentage'
                    className='flex  items-center'
                  >
                    Risk Percentage Value
                    <PlanTooltip
                      button={
                        <FaRegQuestionCircle className='inline-block ml-2 ' />
                      }
                      tooltip='Risk Percentage Value'
                    />
                  </Label>
                  <Input
                    disabled={alertType === 'CLOSE'}
                    value={risk}
                    onChange={(e) => {
                      setRisk(e.target.value);
                    }}
                    id='riskPercentage'
                    placeholder={`Enter Risk Percentage Value`}
                    className='col-span-3'
                  />
                </div>
              )}

              {QuantityOrRiskPercentage === 'QUANTITY' && (
                <div className='mt-4'>
                  <Label htmlFor='quantity' className='flex  items-center'>
                    Quantity Value
                    <PlanTooltip
                      button={
                        <FaRegQuestionCircle className='inline-block ml-2 ' />
                      }
                      tooltip='Quantity Value'
                    />
                  </Label>
                  <Input
                    disabled={alertType === 'CLOSE'}
                    value={quantity}
                    onChange={(e) => {
                      setQuantity(e.target.value);
                    }}
                    id='quantity'
                    placeholder={`Enter Quantity Value`}
                    className='col-span-3'
                  />
                </div>
              )}

              {/* Trail Stop And Stop Loss */}
              {alertType && (
                <div className='mt-4'>
                  <Label htmlFor='trailstop' className='flex  items-center'>
                    Stop Loss Type
                    <PlanTooltip
                      button={
                        <FaRegQuestionCircle className='inline-block ml-2 ' />
                      }
                      tooltip={
                        <div>
                          You can choose between Trail or SL. For Trail, you
                          must also specify an initial SL value,
                          <br /> which will act as your starting stop loss
                          before the trailing stop takes over.
                        </div>
                      }
                    />
                  </Label>
                  <SelectComponent
                    disabled={alertType === 'CLOSE'}
                    Label='Stop Loss Type'
                    placeholder={`Stop Loss Type`}
                    value={stopLossOrTrailStop}
                    onChange={(value) => {
                      setStopLossOrTrailStop(value);
                    }}
                    data={Object.entries(TRAILORSTOPTYPE).map(
                      ([key, value]) => ({
                        value,
                        title: key,
                      }),
                    )}
                  />
                </div>
              )}

              {stopLossOrTrailStop === 'TRAIL_STOP_LOSS' && (
                <>
                  <div className='mt-4'>
                    <Label
                      htmlFor='trailStopvalue'
                      className='flex  items-center'
                    >
                      Trail Stop Value
                      <PlanTooltip
                        button={
                          <FaRegQuestionCircle className='inline-block ml-2 ' />
                        }
                        tooltip='Trailing distance relative to the current price. Enter the value in dollars.'
                      />
                    </Label>
                    <Input
                      disabled={alertType === 'CLOSE'}
                      value={trailStop}
                      onChange={(e) => {
                        setTrailStop(e.target.value);
                      }}
                      id='trailStop'
                      placeholder={`Enter Trail Stop Value`}
                      className='col-span-3'
                    />
                  </div>
                  <div className='mt-4'>
                    <Label
                      htmlFor='trailTrigger'
                      className='flex  items-center'
                    >
                      Trail Trigger Value
                      <PlanTooltip
                        button={
                          <FaRegQuestionCircle className='inline-block ml-2 ' />
                        }
                        tooltip='Amount of profit in price-value before the auto-trail converts your stop to a trailing stop. Enter the value in dollars.'
                      />
                    </Label>
                    <Input
                      disabled={alertType === 'CLOSE'}
                      value={trailTrigger}
                      onChange={(e) => {
                        setTrailTrigger(e.target.value);
                      }}
                      id='trailTrigger'
                      placeholder={`Enter Trail Trigger Value`}
                      className='col-span-3'
                    />
                  </div>
                  <div className='mt-4'>
                    <Label htmlFor='trailFreq' className='flex  items-center'>
                      Trail Freq Value
                      <PlanTooltip
                        button={
                          <FaRegQuestionCircle className='inline-block ml-2 ' />
                        }
                        tooltip={
                          <div>
                            The amount of change in price before the trailing
                            stop will move, or the granularity of updates.{' '}
                            <br /> If set to the instrument tick size, this will
                            cause the stop to move on every positive tick
                            (relative to your current position). <br />
                            Enter the value in dollars.
                          </div>
                        }
                      />
                    </Label>
                    <Input
                      disabled={alertType === 'CLOSE'}
                      value={trailFreq}
                      onChange={(e) => {
                        setTrailFreq(e.target.value);
                      }}
                      id='trailFreq'
                      placeholder={`Enter Trail Freq Value`}
                      className='col-span-3'
                    />
                  </div>
                </>
              )}

              {(stopLossOrTrailStop === 'STOP_LOSS' ||
                stopLossOrTrailStop === 'TRAIL_STOP_LOSS') && (
                <div className='mt-4'>
                  <Label htmlFor='stopLossType' className='flex  items-center'>
                    Stop Loss Type
                    <PlanTooltip
                      button={
                        <FaRegQuestionCircle className='inline-block ml-2 ' />
                      }
                      tooltip={
                        <div>
                          <h1 className='mb-1'>
                            You can select one of three types:
                          </h1>
                          <p>
                            Dollar Value: Enter a dollar amount to be added or
                            deducted from the entry price based on Buy or Sell
                            trade. <br /> Percentage Value: Enter a percentage
                            to be added or deducted from the entry price based
                            on Buy or Sell trade. <br /> Price: Provide the
                            variable name from TradingView that holds the stop
                            loss value.
                          </p>
                        </div>
                      }
                    />
                  </Label>
                  <SelectComponent
                    disabled={alertType === 'CLOSE'}
                    Label='Stop Loss Type'
                    placeholder={`Stop Loss Type`}
                    value={stopLossType}
                    onChange={(value) => {
                      if (value === 'PRICE') {
                        setModalMessage(
                          'The Stop Loss price will be determined by TradingView Indicator. Please ensure you enter the plot variable name that contains your take stop loss price.',
                        );
                        setPriceAlertModel(true);
                      }
                      setStopLossType(value);
                    }}
                    data={Object.entries(STOPLOSSTYPE).map(([key, value]) => ({
                      value,
                      title: key,
                    }))}
                  />
                </div>
              )}

              {stopLossType && (
                <div className='mt-4'>
                  <Label htmlFor='stopLossvalue' className='flex  items-center'>
                    Enter Stop Loss
                    <PlanTooltip
                      button={
                        <FaRegQuestionCircle className='inline-block ml-2 ' />
                      }
                      tooltip='Stop Loss'
                    />
                  </Label>
                  <Input
                    disabled={alertType === 'CLOSE'}
                    value={stopLoss}
                    onChange={(e) => {
                      setStopLoss(e.target.value);
                    }}
                    id='alertType'
                    placeholder={`Enter Stop Loss`}
                    className='col-span-3'
                  />
                </div>
              )}

              {/* Take Profit */}
              {alertType && (
                <div className='mt-4'>
                  <Label htmlFor='takeProfit' className='flex  items-center'>
                    Do You Want Take Profit As well?
                    <PlanTooltip
                      button={
                        <FaRegQuestionCircle className='inline-block ml-2 ' />
                      }
                      tooltip='Take Profit'
                    />
                  </Label>

                  <SelectComponent
                    disabled={alertType === 'CLOSE'}
                    Label='Do You Want Take Profit As well?'
                    placeholder={`Do You Want Take Profit As well?`}
                    value={wantTakeProfit}
                    onChange={(value) => {
                      setWantTakeProfit(value);
                    }}
                    data={Object.entries(YesOrNo).map(([key, value]) => ({
                      value,
                      title: key,
                    }))}
                  />
                </div>
              )}

              {wantTakeProfit === 'YES' && (
                <div className='mt-4'>
                  <Label
                    htmlFor='takeProfittype'
                    className='flex  items-center'
                  >
                    Take Profit Type
                    <PlanTooltip
                      button={
                        <FaRegQuestionCircle className='inline-block ml-2 ' />
                      }
                      tooltip={
                        <div>
                          <h1 className='mb-1'>
                            You can select one of three types:
                          </h1>
                          <p>
                            Dollar Value: Enter a dollar amount to be added or
                            deducted from the entry price based on Buy or Sell
                            trade. <br /> Percentage Value: Enter a percentage
                            to be added or deducted from the entry price based
                            on Buy or Sell trade. <br /> Price: Provide the
                            variable name from TradingView that holds the stop
                            loss value.
                          </p>
                        </div>
                      }
                    />
                  </Label>
                  <SelectComponent
                    disabled={alertType === 'CLOSE'}
                    Label='Take Profit Type'
                    placeholder={`Take Profit Type`}
                    value={takeProfitType}
                    onChange={(value) => {
                      if (value === 'PRICE') {
                        setModalMessage(
                          'The take profit price will be determined by TradingView Indicator. Please ensure you enter the plot variable name that contains your take profit price.',
                        );
                        setPriceAlertModel(true);
                      }
                      setTakeProfitType(value);
                    }}
                    data={Object.entries(TAKEPROFITTYPE).map(
                      ([key, value]) => ({
                        value,
                        title: key,
                      }),
                    )}
                  />
                </div>
              )}

              {takeProfitType && (
                <div className='mt-4'>
                  <Label
                    htmlFor='takeProfitvalue'
                    className='flex  items-center'
                  >
                    Enter Take Profit
                    <PlanTooltip
                      button={
                        <FaRegQuestionCircle className='inline-block ml-2 ' />
                      }
                      tooltip='Take Profit'
                    />
                  </Label>
                  <Input
                    disabled={alertType === 'CLOSE'}
                    value={takeProfit}
                    onChange={(e) => {
                      setTakeProfit(e.target.value);
                    }}
                    id='takeProfit'
                    placeholder={`Enter Take Profit`}
                    className='col-span-3'
                  />
                </div>
              )}
            </div>

            {/* Multiple Account */}
            {alertType && (
              <div className='mt-4'>
                <Label htmlFor='multipleAcc' className='flex  items-center'>
                  Do You Want To Add Multiple Account?
                  <PlanTooltip
                    button={
                      <FaRegQuestionCircle className='inline-block ml-2 ' />
                    }
                    tooltip={
                      <div>
                        token: The unique token identifying the user's account.
                        (e.g., your client's token or the token for an account
                        you manage) <br />
                        <br />
                        account_id: The specific Tradovate account ID where the
                        trade should be placed for that user <br />
                        <br />
                        risk_percentage: Control trade quantity based on account
                        value and stop loss. If used, set quantity to 0. The
                        calculation for quantity is: <br /> quantity =
                        ((account_value_in_tradovate * risk_percentage) / 100) /
                        abs(sl_price - entry_price) / lot_size <br /> <br />
                        quantity_multiplier: Adjust the quantity for individual
                        accounts. If the main quantity is 3 and you want 50% for
                        this account, set it to 0.5.
                      </div>
                    }
                  />
                </Label>

                <SelectComponent
                  disabled={alertType === 'CLOSE'}
                  Label='Do you want to add multiple account?'
                  placeholder={`Do you want to add multiple account?`}
                  value={mutipleAccountForIndication}
                  onChange={(value) => {
                    setMutipleAccountForIndication(value);
                    setData([]);
                  }}
                  data={Object.entries(YesOrNo).map(([key, value]) => ({
                    value,
                    title: key,
                  }))}
                />
              </div>
            )}

            {mutipleAccountForIndication === 'YES' && (
              <AlertsTable data={data} setData={setData} />
            )}
          </>
        )}

        {alertName === 'STRATEGY' && (
          <>
            <div className='mt-4'>
              <Label
                htmlFor='multipleAccforstratergy'
                className='flex  items-center'
              >
                Do You Want To Add Multiple Account?
                <PlanTooltip
                  button={
                    <FaRegQuestionCircle className='inline-block ml-2 ' />
                  }
                  tooltip={
                    <div>
                      token: The unique token identifying the user's account.
                      (e.g., your client's token or the token for an account you
                      manage) <br />
                      <br />
                      account_id: The specific Tradovate account ID where the
                      trade should be placed for that user <br />
                      <br />
                      risk_percentage: Control trade quantity based on account
                      value and stop loss. If used, set quantity to 0. The
                      calculation for quantity is: <br /> quantity =
                      ((account_value_in_tradovate * risk_percentage) / 100) /
                      abs(sl_price - entry_price) / lot_size <br /> <br />
                      quantity_multiplier: Adjust the quantity for individual
                      accounts. If the main quantity is 3 and you want 50% for
                      this account, set it to 0.5.
                    </div>
                  }
                />
              </Label>

              <SelectComponent
                Label='Do you want to add multiple account?'
                placeholder={`Do you want to add multiple account?`}
                value={multipleAccountForStratergy}
                onChange={(value) => {
                  setMultipleAccountForStratergy(value);
                  setData([]);
                }}
                data={Object.entries(YesOrNo).map(([key, value]) => ({
                  value,
                  title: key,
                }))}
              />
            </div>

            {multipleAccountForStratergy === 'YES' && (
              <AlertsTable data={data} setData={setData} />
            )}
            <div className='w-full flex justify-end mt-4'>
              <Button type='submit' onClick={() => checkValidation()}>
                Generate Alert
              </Button>
            </div>
            {generatedObject && (
              <>
                <div className='mt-4'>
                  <CodeClipboard
                    codeString={`
              {
                "symbol": "{{ticker}}",
                "date": "{{timenow}}",
                "data": "{{strategy.order.action}}",
                "quantity": "{{strategy.order.contracts}}",
                "risk_percentage": 0,
                "price": "{{close}}",
                "tp": 0,
                "sl": 0,
                "trail": 0,
                "update_tp": false,
                "update_sl": false,
                "token": ${`"${user?.user_key}"`},
                "duplicate_position_allow": true,
                "reverse_order_close": true${data.length > 0 ? `,` : ''}
                ${
                  data.length > 0
                    ? `"multiple_accounts": ${`[
                            ${data.map(
                              (item) =>
                                // prettier-ignore
                                `     {
                    "token": ${item.token ? `"${item.token}"` : `""`},
                    "account_id": ${item.accoungId ? `"${item.accoungId}"` : `""`},
                    "risk_percentage": ${
                      item.riskPercentage ? item.riskPercentage : 0
                    },
                    "quantity_multiplier": ${item.quantity ? item.quantity : 0}
                  }`,
                            )}
                ]`}`
                    : ''
                }
              }
                      `}
                  />
                </div>
              </>
            )}
          </>
        )}

        {alertName === 'INDICATOR' && (
          <div className='w-full flex justify-end mt-4'>
            <Button type='submit' onClick={() => checkValidation()}>
              Generate Alert
            </Button>
          </div>
        )}
        {generatedObject && alertName === 'INDICATOR' && (
          <>
            <div className='mt-4'>
              <CodeClipboard
                codeString={`
                 {
                  "symbol": "{{ticker}}",
                  "date": "{{timenow}}",
                  "data": ${
                    // prettier-ignore
                    alertType === "BUY" ? `"buy"` : alertType === "SELL" ? `"sell"` : `"close"`
                  },
                  "quantity": ${
                    QuantityOrRiskPercentage === 'QUANTITY' ? quantity || 0 : 0
                  },
                  "risk_percentage": ${
                    QuantityOrRiskPercentage === 'RISK_PERCENTAGE'
                      ? risk || 0
                      : 0
                  },
                  "price": "{{close}}",
                  "tp": ${
                    wantTakeProfit === 'YES'
                      ? takeProfitType === 'PRICE'
                        ? takeProfit || 0
                        : 0
                      : 0
                  },
                  "percentage_tp": ${
                    wantTakeProfit === 'YES'
                      ? takeProfitType === 'PERCENTAGE'
                        ? takeProfit || 0
                        : 0
                      : 0
                  },
                  "dollar_tp": ${
                    wantTakeProfit === 'YES'
                      ? takeProfitType === 'DOLLAR'
                        ? takeProfit || 0
                        : 0
                      : 0
                  },
                  "sl": ${
                    stopLossOrTrailStop === 'STOP_LOSS' ||
                    stopLossOrTrailStop === 'TRAIL_STOP_LOSS'
                      ? stopLossType === 'PRICE'
                        ? stopLoss || 0
                        : 0
                      : 0
                  },
                  "dollar_sl": ${
                    stopLossOrTrailStop === 'STOP_LOSS' ||
                    stopLossOrTrailStop === 'TRAIL_STOP_LOSS'
                      ? stopLossType === 'DOLLAR'
                        ? stopLoss || 0
                        : 0
                      : 0
                  },
                  "percentage_sl": ${
                    stopLossOrTrailStop === 'STOP_LOSS' ||
                    stopLossOrTrailStop === 'TRAIL_STOP_LOSS'
                      ? stopLossType === 'PERCENTA"E'
                        ? stopLoss || 0
                        : 0
                      : 0
                  },
                  "trail": ${
                    stopLossOrTrailStop === 'TRAIL_STOP_LOSS'
                      ? trailStop || 0
                      : 0
                  },
                  "trail_trigger": ${
                    stopLossOrTrailStop === 'TRAIL_STOP_LOSS'
                      ? trailTrigger || 0
                      : 0
                  },
                  "trail_freq": ${
                    stopLossOrTrailStop === 'TRAIL_STOP_LOSS'
                      ? trailFreq || 0
                      : 0
                  },
                  "update_tp": false,
                  "update_sl": false,
                  "token": ${`"${user?.user_key}"`},
                  "duplicate_position_allow": true,
                  "reverse_order_close": true${data.length > 0 ? `,` : ''}
                  ${
                    data.length > 0
                      ? `"multiple_accounts": ${`[
                  ${data.map(
                    (item) =>
                      // prettier-ignore
                      `{
                    "token": ${item.token ? `"${item.token}"` : `""`},
                    "account_id": ${item.accoungId ? `"${item.accoungId}"` : `""`},
                    "risk_percentage": ${
                      item.riskPercentage ? item.riskPercentage : 0
                    },
                    "quantity_multiplier": ${item.quantity ? item.quantity : 0}
                  }`,
                  )}
                ]`}`
                      : ''
                  }
            }`}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const RISKORQUANTITY = {
  RISKPERCENTAGE: 'RISKPERCENTAGE',
  QUANTITYMULTIPLIER: 'QUANTITYMULTIPLIER',
};

const AlertsTable = ({ data, setData }) => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});

  // Model
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isRisk, setIsRisk] = useState(true);
  const [token, setToken] = useState('');
  const [account, setAccount] = useState('');
  const [riskPercentage, setRiskPercentage] = useState('');
  const [quantity, setQuantity] = useState('');
  const [optionValue, setOptionValue] = useState('RISKPERCENTAGE');

  const [inEditingMode, setInEditingMode] = useState(false);
  const [suggestions, setSuggestions] = useState();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('user'))?.user_key) {
      setToken(JSON.parse(localStorage.getItem('user'))?.user_key);
    }
  }, []);

  const columns = [
    {
      accessorKey: 'token',
      header: 'Token',
      cell: ({ row }) => (
        <div className='capitalize'>{row.getValue('token')}</div>
      ),
    },
    {
      accessorKey: 'accoungId',
      header: 'Account Name',
      cell: ({ row }) => (
        <div className='capitalize'>{row.getValue('accoungId')}</div>
      ),
    },
    {
      accessorKey: 'riskPercentage',
      header: 'Risk Percentage',
      cell: ({ row }) => (
        <div className='capitalize'>
          {row.getValue('riskPercentage')
            ? row.getValue('riskPercentage')
            : '-'}
        </div>
      ),
    },
    {
      accessorKey: 'quantity',
      header: 'Quantity Multiplier',
      cell: ({ row }) => (
        <div className='capitalize'>
          {row.getValue('quantity') ? row.getValue('quantity') : '-'}
        </div>
      ),
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: (values) => {
        return (
          <>
            {/* <button
              className='bg-blue-500 mr-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              onClick={async () => {
                setInEditingMode(true);
                setToken(values.row.original.token);
                setAccount(values.row.original.accoungId);
                setRiskPercentage(values.row.original.riskPercentage);
                setQuantity(values.row.original.quantity);
                setIdForUpdate(values.row.original.id);
                setIsDialogOpen(true);
                setIsRisk(
                  values.row.original.riskPercentage > 0 ? true : false,
                );

                setOptionValue(
                  values.row.original.riskPercentage > 0
                    ? 'RISKPERCENTAGE'
                    : 'QUANTITYMULTIPLIER',
                );
              }}
            >
              <MdEdit />
            </button> */}
            <button
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
              onClick={async () => {
                setData(
                  data.filter(
                    (d) =>
                      d.idForDeletion !== values.row.original.idForDeletion,
                  ),
                );
              }}
            >
              <MdDelete />
            </button>
          </>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  const onSaveAcount = async (d) => {
    console.log(d, 'd');
    if (!d.token) {
      toast({
        className: cn(
          'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
        ),
        duration: 1000,
        position: 'top-center',
        title: 'Please select token',
        action: <IoIosCheckmarkCircle className='text-4xl text-red-500' />,
      });
      return;
    }
    if (optionValue === 'QUANTITYMULTIPLIER') {
      if (!Number(d.quantity)) {
        toast({
          className: cn(
            'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
          ),
          duration: 1000,
          position: 'top-center',
          title: 'Please enter quantity multiplier',
          action: <IoIosCheckmarkCircle className='text-4xl text-red-500' />,
        });
        return;
      }
    }
    if (optionValue === 'RISKPERCENTAGE') {
      if (!Number(d.riskPercentage)) {
        toast({
          className: cn(
            'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
          ),
          duration: 1000,
          position: 'top-center',
          title: 'Please enter risk percentage',
          action: <IoIosCheckmarkCircle className='text-4xl text-red-500' />,
        });
        return;
      }
    }

    // const obj = {
    //   id: 0,
    //   token: d.token,
    //   account_id: d.accoungId,
    //   risk_percentage: d.riskPercentage ? Number(d.riskPercentage) : 0,
    //   quantity_multiplier: d.quantity ? Number(d.quantity) : 0,
    // };

    // setToken('');
    setAccount('');
    setRiskPercentage('');
    setQuantity('');

    setData([...data, d]);
    setIsDialogOpen(false);
    toast({
      className: cn(
        'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
      ),
      duration: 1000,
      position: 'top-center',
      title: 'Edited Successfully',
      action: <IoIosCheckmarkCircle className='text-4xl text-green-500' />,
    });
  };

  const addDataInTable = () => {
    const obj = {
      idForDeletion: data.length + 1,
      token,
      accoungId: account,
      riskPercentage,
      quantity,
    };

    onSaveAcount(obj);
  };

  const onEditAcount = async () => {};

  useEffect(() => {
    const getAllOrdersAccountList = async () => {
      const response = await getAccountList();

      if (!response.error) {
        setSuggestions(response.data.map((item) => item.name));
      }
    };
    getAllOrdersAccountList();
  }, []);

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className='sm:max-w-[525px]'>
          <DialogHeader>
            <DialogTitle>Add User Settings</DialogTitle>
            <DialogDescription>
              Make changes to your User here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <div className='flex justify-end items-center'>
                <Label htmlFor='token' className='text-right'>
                  Token
                </Label>
                <PlanTooltip
                  button={
                    <FaRegQuestionCircle className='inline-block ml-2 ' />
                  }
                  tooltip={`The unique token identifying the user's account. (e.g., your client's token or the token for an account you manage)`}
                />
              </div>
              <Input
                id='token'
                onChange={(e) => setToken(e.target.value)}
                value={token}
                // defaultValue='Pedro Duarte'
                className='col-span-3'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <div className='flex justify-center items-center'>
                <Label htmlFor='accountId' className='text-right'>
                  Account Name
                </Label>
                <PlanTooltip
                  button={
                    <FaRegQuestionCircle className='inline-block ml-2 ' />
                  }
                  tooltip={`The specific Tradovate account ID where the trade should be placed for that user.`}
                />
              </div>
              {JSON.parse(localStorage.getItem('user'))?.user_key === token ? (
                <AutocompleteInput
                  data={suggestions}
                  inputValue={account}
                  setInputValue={setAccount}
                  onBlur={() => {}}
                />
              ) : (
                <Input
                  id='accountId'
                  onChange={(e) => setAccount(e.target.value)}
                  value={account}
                  // defaultValue='@peduarte'
                  className='col-span-3'
                />
              )}
            </div>
            <div className='ml-12  flex items-center'>
              <div className='flex justify-center items-center mr-2'>
                <Label htmlFor='direction'>Option</Label>
                <PlanTooltip
                  button={<FaRegQuestionCircle className='inline-block ml-2' />}
                  tooltip={`Options: RISKPERCENTAGE / QUANTITY`}
                />
              </div>
              <SelectComponent
                className='col-span-8 w-20'
                Label='Order Type'
                value={optionValue}
                placeholder={`Enter Direction`}
                onChange={(value) => {
                  setOptionValue(value);
                  setRiskPercentage(0);
                  setQuantity(0);
                  if (value === 'RISKPERCENTAGE') {
                    setIsRisk(true);
                  } else {
                    setIsRisk(false);
                  }
                }}
                data={Object.entries(RISKORQUANTITY).map(([key, value]) => ({
                  value,
                  title: key,
                }))}
              />
            </div>
            {isRisk ? (
              <div className='grid grid-cols-4 items-center gap-4'>
                <div className='flex justify-center items-center mr-2 '>
                  <Label htmlFor='accountId' className='text-center'>
                    Risk Percentage
                  </Label>
                  <PlanTooltip
                    button={
                      <FaRegQuestionCircle className='inline-block ml-2' />
                    }
                    tooltip={
                      <div>
                        Control trade quantity based on account value and stop
                        loss. If used, set quantity to 0. <br /> The calculation
                        for quantity is: quantity = ((account_value_in_tradovate
                        * risk_percentage) / 100) / abs(sl_price - entry_price)
                        / lot_size
                      </div>
                    }
                  />
                </div>
                <Input
                  id='riskPercentage'
                  value={riskPercentage}
                  onChange={(e) => setRiskPercentage(e.target.value)}
                  className='col-span-3'
                />
              </div>
            ) : (
              <div className='grid grid-cols-4 items-center gap-4'>
                <div className='flex justify-center items-center'>
                  <Label htmlFor='accountId' className='text-right'>
                    Quantity Multiplier
                  </Label>
                  <PlanTooltip
                    button={
                      <FaRegQuestionCircle className='inline-block ml-2' />
                    }
                    tooltip={
                      <div>
                        Adjust the quantity for individual accounts. If the main
                        quantity is 3 and you want 50% for this account, set it
                        to 0.5.
                      </div>
                    }
                  />
                </div>
                <Input
                  id='riskPercentage'
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className='col-span-3'
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              type='submit'
              onClick={inEditingMode ? onEditAcount : addDataInTable}
            >
              {inEditingMode ? 'Edit' : 'Save'} changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className='flex justify-end mt-5'>
        <Button variant='outline' onClick={() => setIsDialogOpen(true)}>
          Add User
        </Button>
      </div>
      <div className='rounded-md border mt-5'>
        <ScrollArea className={`w-full whitespace-nowrap rounded-md border`}>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className='h-24 text-center'
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <ScrollBar orientation='horizontal' />
        </ScrollArea>
      </div>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <div className='space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Alerts;
