import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react';
import * as React from 'react';

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

const data = [
  {
    id: 'm5gr84i9',
    symbol: 'COMMON',
    orderType: 'success',
    quantity: '1',
    quantityType: 'shares',
    account: 'A123',
  },
  {
    id: 'k2hd71a2',
    symbol: 'PREMIUM',
    orderType: 'pending',
    quantity: '3',
    quantityType: 'shares',
    account: 'A123',
  },
  {
    id: 'u7js91k3',
    symbol: 'STANDARD',
    orderType: 'failed',
    quantity: '5',
    quantityType: 'bonds',
    account: 'B456',
  },
  {
    id: 'g5mt82j4',
    symbol: 'ELITE',
    orderType: 'success',
    quantity: '2',
    quantityType: 'futures',
    account: 'C789',
  },
  {
    id: 's8qh63l5',
    symbol: 'BASIC',
    orderType: 'cancelled',
    quantity: '10',
    quantityType: 'options',
    account: 'D012',
  },
  {
    id: 'w9er54m6',
    symbol: 'GOLD',
    orderType: 'success',
    quantity: '8',
    quantityType: 'shares',
    account: 'E345',
  },
  {
    id: 'v6tn45n7',
    symbol: 'SILVER',
    orderType: 'pending',
    quantity: '6',
    quantityType: 'bonds',
    account: 'F678',
  },
  {
    id: 'q3ol26p8',
    symbol: 'BRONZE',
    orderType: 'failed',
    quantity: '4',
    quantityType: 'futures',
    account: 'G901',
  },
  {
    id: 'z0xw97q9',
    symbol: 'PLATINUM',
    orderType: 'success',
    quantity: '7',
    quantityType: 'options',
    account: 'H234',
  },
  {
    id: 'x1cv68r1',
    symbol: 'DIAMOND',
    orderType: 'cancelled',
    quantity: '9',
    quantityType: 'shares',
    account: 'I567',
  },
  {
    id: 'c2bv59s2',
    symbol: 'RUBY',
    orderType: 'pending',
    quantity: '11',
    quantityType: 'bonds',
    account: 'J890',
  },
];

export function DataTable() {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const navigate = useNavigate();

  const columns = [
    {
      accessorKey: 'symbol',
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
        <div className='uppercase'>{row.getValue('symbol')}</div>
      ),
    },
    {
      accessorKey: 'orderType',
      header: 'Order Type',
      cell: ({ row }) => (
        <div className='capitalize'>{row.getValue('orderType')}</div>
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
      accessorKey: 'quantityType',
      header: 'Quantity Type',
      cell: ({ row }) => (
        <div className='capitalize'>{row.getValue('quantityType')}</div>
      ),
    },
    {
      accessorKey: 'account',
      header: 'Account',
      cell: ({ row }) => (
        <div className='capitalize'>{row.getValue('account')}</div>
      ),
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: () => {
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
                  navigate('/dashboard/tradedetails', { state: {} });
                }}
              >
                View Details
              </DropdownMenuItem>
              {/* <DropdownMenuSeparator /> */}
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
        Trades
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
          value={table.getColumn('symbol')?.getFilterValue() ?? ''}
          onChange={(event) =>
            table.getColumn('symbol')?.setFilterValue(event.target.value)
          }
          className='max-w-sm mx-2'
        />
      </div>
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
