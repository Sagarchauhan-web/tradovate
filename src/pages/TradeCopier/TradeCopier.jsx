import OverlapLoader from '@/components/Loader/OverlapLoader';
import { SelectComponent } from '@/components/Select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { MoreHorizontal } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  addAccountTradeCopierData,
  deleteAccountTradeCopierData,
  getAccountTradeCopierData,
  saveAccountTradeCopier,
} from '@/services/TradeCopier/TradeCopier';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';

const DIRECTIONTYPE = {
  BUY: 'BUY',
  SELL: 'SELL',
  CLOSE: 'CLOSE',
};

const RISKORQUANTITY = {
  RISKPERCENTAGE: 'RISKPERCENTAGE',
  QUANTITYMULTIPLIER: 'QUANTITYMULTIPLIER',
};

const TradeCopier = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  // Form
  const [directionValue, setDirectionValue] = useState('');
  const [symbol, setSymbol] = useState('');
  const [qty, setQty] = useState('');
  const [riskPerc, setRiskPerc] = useState('');
  const [price, setPrice] = useState('');
  const [tp, setTp] = useState('');
  const [sl, setSl] = useState('');
  const [trail, setTrail] = useState('');
  const [trailStop, setTrailStop] = useState('');
  const [trailTrigger, setTrailTrigger] = useState('');
  const [trailFreq, setTrailFreq] = useState('');
  const [mainToken, setMainToken] = useState(user?.user_key);
  const [updateSl, setUpdateSl] = useState('');
  const [updateTp, setUpdateTp] = useState('');

  // Table
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isRisk, setIsRisk] = useState(true);
  const [token, setToken] = useState('');
  const [account, setAccount] = useState('');
  const [riskPercentage, setRiskPercentage] = useState('');
  const [quantity, setQuantity] = useState('');
  const [optionValue, setOptionValue] = useState('RISKPERCENTAGE');

  const [inEditingMode, setInEditingMode] = useState(false);
  const [idForUpdate, setIdForUpdate] = useState('');

  const onSubmit = async () => {
    const obj = {
      symbol: symbol,
      data: directionValue,
      quantity: Number(qty),
      price: Number(price),
      tp: Number(tp),
      sl: Number(sl),
      trail: Number(trail),
      trail_stop: trailStop ? Number(trailStop) : 0,
      trail_trigger: trailTrigger ? Number(trailTrigger) : 0,
      trail_freq: trailFreq ? Number(trailFreq) : 0,
      update_tp: Boolean(updateTp),
      update_sl: Boolean(updateSl),
      risk_percentage: !Number(qty) ? Number(riskPerc) : 0,
      token: mainToken,
      duplicate_position_allow: true,
      reverse_order_close: true,
      account_id: '',
      multiple_accounts: data.map((d) => ({
        token: d.token,
        account_id: d.accoungId,
        risk_percentage: d.riskPercentage ? Number(d.riskPercentage) : 0,
        quantity_multiplier: d.quantity ? Number(d.quantity) : 0,
      })),
    };
    const response = await addAccountTradeCopierData(obj);

    if (!response.error) {
      toast({
        className: cn(
          'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
        ),
        duration: 1000,
        position: 'top-center',
        title: 'Added Successfully',
        action: <IoIosCheckmarkCircle className='text-4xl text-green-500' />,
      });

      setSymbol('');
      setMainToken('');
      setRiskPerc('');
      setQty('');
      setPrice('');
      setTp('');
      setSl('');
      setTrail('');
      setTrailFreq('');
      setTrailStop('');
      setTrailTrigger('');
    }
  };

  const onSaveAcount = async (d) => {
    setIsLoading(true);
    const obj = {
      id: 0,
      token: d.token,
      account_id: d.accoungId,
      risk_percentage: d.riskPercentage ? Number(d.riskPercentage) : 0,
      quantity_multiplier: d.quantity ? Number(d.quantity) : 0,
    };

    const response = await saveAccountTradeCopier(obj);
    if (!response.error) {
      getInitialData();
      toast({
        className: cn(
          'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
        ),
        duration: 1000,
        position: 'top-center',
        title: 'Edited Successfully',
        action: <IoIosCheckmarkCircle className='text-4xl text-green-500' />,
      });
    }

    setIsLoading(false);
  };
  const onEditAcount = async () => {
    setIsLoading(true);
    const obj = {
      id: idForUpdate,
      token: token,
      account_id: account,
      risk_percentage: riskPercentage ? Number(riskPercentage) : 0,
      quantity_multiplier: quantity ? Number(quantity) : 0,
    };

    const response = await saveAccountTradeCopier(obj);
    if (!response.error) {
      setInEditingMode(false);
      setIdForUpdate('');
      setIsDialogOpen(false);
      setToken('');
      setAccount('');
      setRiskPercentage('');
      setQuantity('');

      getInitialData();
      toast({
        className: cn(
          'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
        ),
        duration: 1000,
        position: 'top-center',
        title: 'Edited Successfully',
        action: <IoIosCheckmarkCircle className='text-4xl text-green-500' />,
      });
    }

    setIsLoading(false);
  };

  const deleteTradeCopier = async (id) => {
    setIsLoading(true);
    const response = await deleteAccountTradeCopierData(id);
    setIsLoading(false);
    if (!response.error) {
      toast({
        className: cn(
          'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
        ),
        duration: 1000,
        position: 'top-center',
        title: 'Deleted Successfully',
        action: <IoIosCheckmarkCircle className='text-4xl text-green-500' />,
      });
      getInitialData();
    }
  };

  const getInitialData = async () => {
    setIsLoading(true);
    const response = await getAccountTradeCopierData({});
    setIsLoading(false);
    if (!response.error) {
      setData(
        response.data.map((d) => ({
          id: d.id,
          token: d.token,
          accoungId: d.account_id,
          riskPercentage: d.risk_percentage,
          quantity: d.quantity_multiplier,
        })),
      );
    }
  };
  useEffect(() => {
    getInitialData();
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
      header: 'Account Id',
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem
                onClick={async () => {
                  console.log(values.row.original, 'values');
                  deleteTradeCopier(values.row.original.id);
                }}
              >
                Delete
              </DropdownMenuItem>
              <DropdownMenuItem
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
                  console.log(values.row.original, 'values.row.original');
                }}
              >
                Edit
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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

  const addDataInTable = () => {
    const obj = {
      idForDeletion: data.length + 1,
      token,
      accoungId: account,
      riskPercentage,
      quantity,
    };

    setToken('');
    setAccount('');
    setRiskPercentage('');
    setQuantity('');

    setData([...data, obj]);
    setIsDialogOpen(false);
    onSaveAcount(obj);
  };

  return (
    <div className='px-1'>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className='sm:max-w-[525px]'>
          <DialogHeader>
            <DialogTitle>Add User</DialogTitle>
            <DialogDescription>
              Make changes to your User here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='token' className='text-right'>
                Token
              </Label>
              <Input
                id='token'
                onChange={(e) => setToken(e.target.value)}
                value={token}
                // defaultValue='Pedro Duarte'
                className='col-span-3'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='accountId' className='text-right'>
                account Id
              </Label>
              <Input
                id='accountId'
                onChange={(e) => setAccount(e.target.value)}
                value={account}
                // defaultValue='@peduarte'
                className='col-span-3'
              />
            </div>
            <div className='grid grid-cols-4 items-center'>
              <Label htmlFor='direction'>Option</Label>
              <SelectComponent
                className='col-span-5 w-20'
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
                <Label htmlFor='accountId' className='text-right'>
                  Risk Percentage
                </Label>
                <Input
                  id='riskPercentage'
                  value={riskPercentage}
                  onChange={(e) => setRiskPercentage(e.target.value)}
                  className='col-span-3'
                />
              </div>
            ) : (
              <div className='grid grid-cols-4 items-center gap-4'>
                <Label htmlFor='accountId' className='text-right'>
                  Quantity Multiplier
                </Label>
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

      <form>
        <div className='flex justify-between items-center'>
          <h2 className='scroll-m-20 w-max text-2xl py-4  font-semibold tracking-tight first:mt-0'>
            Create Trade Copier
          </h2>
          <div className='space-x-2'>
            <Button onClick={() => onSubmit()}>Submit</Button>
          </div>
        </div>
        <div className='mt-6 grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-4 text-sm'>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='name'>Symbol</Label>
            <Input
              // onBlur={symbolOnBlur}
              // ref={symbolRef}
              value={symbol}
              onChange={(e) => setSymbol(e.target.value)}
              id='name'
              placeholder={`Enter Symbol`}
            />
          </div>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='token'>Token</Label>
            <Input
              // onBlur={symbolOnBlur}
              // ref={symbolRef}
              value={mainToken}
              onChange={(e) => setMainToken(e.target.value)}
              id='token'
              placeholder={`Enter Token`}
            />
          </div>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='direction'>Direction</Label>
            <SelectComponent
              value={directionValue}
              Label='Order Type'
              placeholder={`Enter Direction`}
              onChange={(value) => {
                setDirectionValue(value);
              }}
              data={Object.entries(DIRECTIONTYPE).map(([key, value]) => ({
                value,
                title: key,
              }))}
            />
          </div>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='quantity'>Quantity</Label>
            <Input
              //  ref={quantityRef}
              disabled={riskPerc}
              onChange={(e) => setQty(e.target.value)}
              value={qty}
              id='quantity'
              placeholder={`Enter Quantity`}
            />
          </div>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='riskPercentage'>Risk Percentage</Label>
            <Input
              disabled={qty}
              //  ref={quantityRef}
              onChange={(e) => setRiskPerc(e.target.value)}
              value={riskPerc}
              id='riskPercentage'
              placeholder={`Enter Risk Percentage`}
            />
          </div>

          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='price'>Price</Label>
            <Input
              // ref={MinTickRef}
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              id='price'
              placeholder={`Enter Price`}
            />
          </div>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='tp'>TP</Label>
            <Input
              // ref={LotRef}
              onChange={(e) => setTp(e.target.value)}
              value={tp}
              id='tp'
              placeholder={`TP`}
            />
          </div>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='sl'>SL</Label>
            <Input
              // ref={tradovateSymbolRef}
              onChange={(e) => setSl(e.target.value)}
              value={sl}
              id='sl'
              placeholder={`SL`}
            />
          </div>

          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='updateTP'>Update TP</Label>
            <SelectComponent
              value={updateTp}
              placeholder={`Select`}
              onChange={(value) => {
                setUpdateTp(value);
              }}
              data={[true, false].map((value) => ({
                value: String(value),
                title: String(value),
              }))}
            />
          </div>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='updateSl'>Update SL</Label>
            <SelectComponent
              value={updateSl}
              placeholder={`Select`}
              onChange={(value) => {
                setUpdateSl(value);
              }}
              data={[true, false].map((value) => ({
                value: String(value),
                title: String(value),
              }))}
            />
          </div>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='trail'>Trail</Label>
            <Input
              // ref={stopLossRef}
              onChange={(e) => setTrail(e.target.value)}
              value={trail}
              id='trail'
              placeholder={`Enter Trail`}
            />
          </div>
          {Number(trail) === 1 ? (
            <>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='trailstop'>Trail Stop</Label>
                <Input
                  // ref={stopLossRef}
                  onChange={(e) => setTrailStop(e.target.value)}
                  value={trailStop}
                  id='trailstop'
                  placeholder={`Enter Trail Stop`}
                />
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='trailfrequence'>Trail Frequence</Label>
                <Input
                  // ref={stopLossRef}
                  onChange={(e) => setTrailFreq(e.target.value)}
                  value={trailFreq}
                  id='trailfrequence'
                  placeholder={`Enter Trail Frequency`}
                />
              </div>
              <div className='flex flex-col space-y-1.5'>
                <Label htmlFor='trailTrigger'>Trail Trigger</Label>
                <Input
                  // ref={stopLossRef}
                  onChange={(e) => setTrailTrigger(e.target.value)}
                  value={trailTrigger}
                  id='trailTrigger'
                  placeholder={`Enter Trail Trigger`}
                />
              </div>
            </>
          ) : (
            ''
          )}
        </div>
      </form>
      <div className='flex justify-between items-center mt-8'>
        <h2 className='scroll-m-20 w-max text-2xl py-4  font-semibold tracking-tight first:mt-0'>
          Add Accounts
        </h2>
        <div className='space-x-2'>
          <Button onClick={() => setIsDialogOpen(true)}>Add</Button>
        </div>
      </div>
      <div className='rounded-md border'>
        <OverlapLoader loader={isLoading}>
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
        </OverlapLoader>
      </div>
    </div>
  );
};

export default TradeCopier;
