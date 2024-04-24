import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { format, subDays } from 'date-fns';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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
import { useNavigate } from 'react-router-dom';
import { DatePickerWithRange } from '@/components/DatePicker/DatePicker';

export function OrderTable() {
  const [date, setDate] = useState({
    from: subDays(new Date(), 7),
    to: format(new Date(), 'yyyy-MM-dd'),
  });
  const [data, setData] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getAllOrders = async () => {
      const response = await getOrders({
        from_date: format(date.from, 'yyyy-MM-dd'),
        to_date: format(date.to, 'yyyy-MM-dd'),
      });

      setData(response.data);
    };
    getAllOrders();
  }, [date]);

  const columns = [
    {
      accessorKey: 'account_id',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Account Id
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className='uppercase'>{row.getValue('account_id')}</div>
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
      accessorKey: 'contract_id',
      header: 'Contract Id',
      cell: ({ row }) => (
        <div className='capitalize'>{row.getValue('contract_id')}</div>
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
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  navigate('/dashboard/tradedetails', {
                    state: {
                      data: data[values.row.index],
                      isAlert: false,
                      isOrder: true,
                      isSetting: false,
                    },
                  });
                }}
              >
                View Details
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

  return (
    <div className='w-full'>
      <div className='flex items-center justify-between pt-4'>
        <h2 className='scroll-m-20 w-max text-2xl font-semibold tracking-tight first:mt-0'>
          Orders
        </h2>
        <DatePickerWithRange date={date} setDate={setDate} />
      </div>
      <div className='flex items-center py-4 justify-end'></div>
      <div className='rounded-md border'>
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
}
