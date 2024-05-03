import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { deleteTrade, getTrades } from '@/services/Trades/trade';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

export function DataTable({ changeToEditMode }) {
  const [data, setData] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const navigate = useNavigate();

  const getAllTrades = async () => {
    const response = await getTrades();
    if (!response.error) {
      setData(response.data);
    }
  };

  useEffect(() => {
    getAllTrades();
  }, []);

  const columns = [
    {
      accessorKey: 'Symbol',
      header: ({ column }) => {
        return (
          <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Symbol
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className='uppercase'>{row.getValue('Symbol')}</div>
      ),
    },
    {
      accessorKey: 'OrderType',
      header: 'Order Type',
      cell: ({ row }) => (
        <div className='capitalize'>{row.getValue('OrderType')}</div>
      ),
    },
    {
      accessorKey: 'Quantity',
      header: 'Quantity',
      cell: ({ row }) => (
        <div className='capitalize'>{row.getValue('Quantity')}</div>
      ),
    },
    {
      accessorKey: 'StopLoss',
      header: 'Stop Loss',
      cell: ({ row }) => (
        <div className='capitalize'>{row.getValue('StopLoss')}</div>
      ),
    },
    {
      accessorKey: 'StopLossPercentage',
      header: 'Stop Loss In %',
      cell: ({ row }) => (
        <div className='capitalize'>
          {row.getValue('StopLossPercentage') ? 'Yes' : 'No'}
        </div>
      ),
    },
    {
      accessorKey: 'TakeProfit',
      header: 'Take Profit',
      cell: ({ row }) => (
        <div className='capitalize'>{row.getValue('TakeProfit')}</div>
      ),
    },
    {
      accessorKey: 'TakeProfitPercentage',
      header: 'Take Profit In %',
      cell: ({ row }) => (
        <div className='capitalize'>
          {row.getValue('TakeProfitPercentage') ? 'Yes' : 'No'}
        </div>
      ),
    },
    {
      accessorKey: 'EntryOffset',
      header: 'Entry Offset',
      cell: ({ row }) => (
        <div className='capitalize'>{row.getValue('EntryOffset')}</div>
      ),
    },
    {
      accessorKey: 'EntryOffsetInPercentage',
      header: 'Entry Offset In %',
      cell: ({ row }) => (
        <div className='capitalize'>
          {row.getValue('EntryOffsetInPercentage') ? 'Yes' : 'No'}
        </div>
      ),
    },
    {
      accessorKey: 'LocalSymbol',
      header: 'Local Symbol',
      cell: ({ row }) => (
        <div className='capitalize'>{row.getValue('EntryOffset')}</div>
      ),
    },
    {
      accessorKey: 'LotSize',
      header: 'Lot Size',
      cell: ({ row }) => (
        <div className='capitalize'>{row.getValue('LotSize')}</div>
      ),
    },
    {
      accessorKey: 'MinTick',
      header: 'Min Tick',
      cell: ({ row }) => (
        <div className='capitalize'>{row.getValue('MinTick')}</div>
      ),
    },
    {
      accessorKey: 'MinTick',
      header: 'Min Tick',
      cell: ({ row }) => (
        <div className='capitalize'>{row.getValue('MinTick')}</div>
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
                      isOrder: false,
                      isSetting: true,
                    },
                  });
                }}
              >
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={async () => {
                  await deleteTrade({ symbol: values.row.getValue('Symbol') });
                  getAllTrades();
                }}
              >
                Delete
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={async () => {
                  changeToEditMode(data[values.row.index]);
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

  return (
    <div className='w-full'>
      <h2 className='scroll-m-20 w-max text-2xl pt-4  font-semibold tracking-tight first:mt-0'>
        Settings
      </h2>
      <div className='flex items-center py-4 justify-end'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='ml-auto'>
              Columns <ChevronDown className='ml-2 h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className='capitalize'
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        <Input
          placeholder='Filter symbol...'
          value={table.getColumn('Symbol')?.getFilterValue() ?? ''}
          onChange={(event) =>
            table.getColumn('Symbol')?.setFilterValue(event.target.value)
          }
          className='max-w-sm mx-2'
        />
      </div>
      <div className='rounded-md border'>
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
}
