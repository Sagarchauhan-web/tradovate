import OverlapLoader from '@/components/Loader/OverlapLoader';
import { SelectComponent } from '@/components/Select';
import { Button } from '@/components/ui/button';
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
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const DIRECTIONTYPE = {
  BUY: 'BUY',
  SELL: 'SELL',
  CLOSE: 'CLOSE',
};

const RISKORQUANTITY = {
  RISKPERCENTAGE: 'RISKPERCENTAGE',
  QUANTITY: 'QUANTITY',
};

const TradeCopier = () => {
  // Form
  const [directionValue, setDirectionValue] = useState('');

  // Table
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isRisk, setIsRisk] = useState(false);

  const onSubmit = () => {};

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
        <div className='capitalize'>{row.getValue('riskPercentage')}</div>
      ),
    },
    {
      accessorKey: 'quantity',
      header: 'Quantity',
      cell: ({ row }) => (
        <div className='capitalize'>{row.getValue('Quantity')}</div>
      ),
    },
    // {
    //   id: 'actions',
    //   enableHiding: false,
    //   cell: (values) => {
    //     return (
    //       <DropdownMenu>
    //         <DropdownMenuTrigger asChild>
    //           <Button variant='ghost' className='h-8 w-8 p-0'>
    //             <span className='sr-only'>Open menu</span>
    //             <MoreHorizontal className='h-4 w-4' />
    //           </Button>
    //         </DropdownMenuTrigger>
    //         <DropdownMenuContent align='end'>
    //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
    //           <DropdownMenuItem
    //             onClick={() => {
    //               navigate('/dashboard/tradedetails', {
    //                 state: {
    //                   data: data[values.row.index],
    //                   isAlert: false,
    //                   isOrder: false,
    //                   isSetting: true,
    //                 },
    //               });
    //             }}
    //           >
    //             View Details
    //           </DropdownMenuItem>
    //           <DropdownMenuItem
    //             onClick={async () => {
    //               await deleteTrade({ symbol: values.row.getValue('Symbol') });
    //               getAllTrades();
    //             }}
    //           >
    //             Delete
    //           </DropdownMenuItem>
    //           <DropdownMenuItem
    //             onClick={async () => {
    //               changeToEditMode(data[values.row.index]);
    //             }}
    //           >
    //             Edit
    //           </DropdownMenuItem>
    //         </DropdownMenuContent>
    //       </DropdownMenu>
    //     );
    //   },
    // },
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

  return (
    <div className='px-1'>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className='sm:max-w-[425px]'>
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
                // defaultValue='@peduarte'
                className='col-span-3'
              />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='direction'>Option</Label>
              <SelectComponent
                className='col-span-3 w-7'
                value={isRisk}
                Label='Order Type'
                placeholder={`Enter Direction`}
                onChange={(value) => {
                  setIsRisk(value);
                }}
                data={Object.entries(RISKORQUANTITY).map(([key, value]) => ({
                  value,
                  title: key,
                }))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type='submit'>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <form onSubmit={onSubmit}>
        <div className='flex justify-between items-center'>
          <h2 className='scroll-m-20 w-max text-2xl py-4  font-semibold tracking-tight first:mt-0'>
            Create Trade Copier
          </h2>
          <div className='space-x-2'>
            <Button>Submit</Button>
          </div>
        </div>
        <div className='mt-6 grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-4 text-sm'>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='name'>Symbol</Label>
            <Input
              // onBlur={symbolOnBlur}
              // ref={symbolRef}
              id='name'
              placeholder={`Enter Symbol`}
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
              id='quantity'
              placeholder={`Enter Quantity`}
            />
          </div>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='riskPercentage'>Risk Percentage</Label>
            <Input
              //  ref={quantityRef}
              id='riskPercentage'
              placeholder={`Enter Risk Percentage`}
            />
          </div>

          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='price'>Price</Label>
            <Input
              // ref={MinTickRef}
              id='price'
              placeholder={`Enter Price`}
            />
          </div>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='tp'>TP</Label>
            <Input
              // ref={LotRef}
              id='tp'
              placeholder={`TP`}
            />
          </div>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='sl'>SL</Label>
            <Input
              // ref={tradovateSymbolRef}
              id='sl'
              placeholder={`SL`}
            />
          </div>

          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='trail'>Trail</Label>
            <Input
              // ref={stopLossRef}
              id='trail'
              placeholder={`Enter Trail`}
            />
          </div>
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
