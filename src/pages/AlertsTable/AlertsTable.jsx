import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getAlerts } from '@/services/Alerts/alerts';
import { useEffect, useState } from 'react';

export function AlertsTable() {
  const [data, setData] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});

  useEffect(() => {
    const getAllAlerts = async () => {
      const response = await getAlerts();
      console.log(response.data);
      if (!response.error) {
        setData(response.data);
      }
    };
    getAllAlerts();
  }, []);

  const columns = [
    {
      accessorKey: 'alert_data',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Alert Data
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className='uppercase'>{row.getValue('alert_data')}</div>
      ),
    },
    {
      accessorKey: 'buy_sell',
      header: 'Buy/Sell',
      cell: ({ row }) => (
        <div className='capitalize'>{row.getValue('buy_sell')}</div>
      ),
    },
    {
      accessorKey: 'local_symbol',
      header: 'Local Symbol',
      cell: ({ row }) => (
        <div className='capitalize'>{row.getValue('local_symbol')}</div>
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
      accessorKey: 'trade_time',
      header: 'Trade Time',
      cell: ({ row }) => (
        <div className='capitalize'>{row.getValue('trade_time')}</div>
      ),
    },
    {
      accessorKey: 'symbol',
      header: 'Symbol',
      cell: ({ row }) => (
        <div className='capitalize'>{row.getValue('symbol')}</div>
      ),
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
      <h2 className='scroll-m-20 w-max text-2xl pt-4  font-semibold tracking-tight first:mt-0'>
        Alerts
      </h2>
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
