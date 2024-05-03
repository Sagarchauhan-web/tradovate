import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { format, subDays } from 'date-fns';

import { DatePickerWithRange } from '@/components/DatePicker/DatePicker';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getOrders } from '@/services/Orders/orders';
import { useEffect, useState } from 'react';

export function OrderTable() {
  const [date, setDate] = useState({
    from: subDays(new Date(), 7),
    to: format(new Date(), 'yyyy-MM-dd'),
  });
  const [data, setData] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});

  useEffect(() => {
    const getAllOrders = async () => {
      const response = await getOrders({
        from_date: format(date?.from, 'yyyy-MM-dd'),
        to_date: format(date?.to, 'yyyy-MM-dd'),
      });

      setData(response.data);
    };
    getAllOrders();
  }, [date]);

  const columns = [
    {
      accessorKey: 'timestamp',
      header: 'Date Time',
      cell: ({ row }) => (
        <div className='capitalize'>{row.getValue('timestamp')}</div>
      ),
    },
    {
      accessorKey: 'symbol',
      header: 'Symbol',
      cell: ({ row }) => (
        <div className='uppercase'>{row.getValue('symbol')}</div>
      ),
    },
    {
      accessorKey: 'action',
      header: 'Action',
      cell: ({ row }) => (
        <div className='capitalize'>{row.getValue('action')}</div>
      ),
    },
    {
      accessorKey: 'order_type',
      header: 'Order Type',
      cell: ({ row }) => (
        <div className='capitalize'>{row.getValue('order_type')}</div>
      ),
    },
    {
      accessorKey: 'quantity',
      header: 'Quantity',
      cell: ({ row }) => (
        <div className='capitalize'>{row.getValue('quantity')}</div>
      ),
    },
    {
      accessorKey: 'ordStatus',
      header: 'Order Status',
      cell: ({ row }) => (
        <div className='capitalize'>{row.getValue('ordStatus')}</div>
      ),
    },
    {
      accessorKey: 'parent_id',
      header: 'Parent Id',
      cell: ({ row }) => (
        <div className='capitalize'>{row.getValue('parent_id')}</div>
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
    //                   isOrder: true,
    //                   isSetting: false,
    //                 },
    //               });
    //             }}
    //           >
    //             View Details
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
    <>
      <div className='flex items-center justify-between pt-4 mb-4'>
        <h2 className='scroll-m-20 w-max text-2xl font-semibold tracking-tight first:mt-0'>
          Orders
        </h2>
        <DatePickerWithRange date={date} setDate={setDate} />
      </div>
      <ScrollArea className={`w-full whitespace-nowrap rounded-md border`}>
        <Table className='display-none'>
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
    </>
  );
}
