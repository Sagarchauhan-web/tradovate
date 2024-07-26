import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';

import OverlapLoader from '@/components/Loader/OverlapLoader';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  getAccountList,
  getAccountMaxLoss,
} from '@/services/Liquidity/liquidity';
import { useEffect, useState } from 'react';
import { LiquidityModal } from './LiquidityModal';
function Liquidity() {
  const [data, setData] = useState([]);
  const [dropdownData, setDropdownData] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [open, setOpen] = useState(false);
  const [defaultData, setDefaultData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [userAccountSelected, setUserAccountSelected] = useState('');

  useEffect(() => {
    const getAllOrdersAccountList = async () => {
      setIsLoading(true);
      const response = await getAccountList();

      setDropdownData(response.data);
      setIsLoading(false);
    };
    getAllOrdersAccountList();
  }, []);

  const getAccountMaxLossList = async (userAccountSelected) => {
    setIsLoading(true);
    const response = await getAccountMaxLoss({
      account_id: userAccountSelected,
    });

    setData([response.data]);
    setIsLoading(false);
  };
  useEffect(() => {
    if (!userAccountSelected) {
      return;
    }
    getAccountMaxLossList(userAccountSelected);
  }, [userAccountSelected]);

  const columns = [
    {
      accessorKey: 'id',
      header: 'Id',
      cell: ({ row }) => <div>{row.getValue('id')}</div>,
    },
    {
      accessorKey: 'daily_loss',
      header: 'Daily Loss',
      cell: ({ row }) => (
        <div>
          {row.getValue('daily_loss') ? row.getValue('daily_loss') : '-'}
        </div>
      ),
    },
    {
      accessorKey: 'daily_profit',
      header: 'Daily Profit',
      cell: ({ row }) => <div>{row.getValue('daily_profit')}</div>,
    },
    {
      accessorKey: 'weekly_loss',
      header: 'Weekly Loss',
      cell: ({ row }) => <div>{row.getValue('weekly_loss')}</div>,
    },
    {
      accessorKey: 'weekly_profit',
      header: 'Weekly Profit',
      cell: ({ row }) => <div>{row.getValue('weekly_profit')}</div>,
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: (values) => {
        console.log(values.row.original);
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
                onClick={async () => {
                  setOpen(true);
                  setDefaultData(values.row.original);
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
    <>
      <LiquidityModal
        open={open}
        setOpen={setOpen}
        defaultData={defaultData}
        getAccountMaxLossList={getAccountMaxLossList}
      />
      <div className='flex items-center justify-between pt-4 mb-20'>
        <h1 className='scroll-m-20 w-max text-2xl font-semibold tracking-tight first:mt-0'>
          Liquidity
        </h1>

        <Select
          value={userAccountSelected}
          onValueChange={(value) => {
            setUserAccountSelected(value);
            console.log(value);
          }}
        >
          <SelectTrigger className='h-full w-[150px]'>
            <SelectValue placeholder='Select Account' />
          </SelectTrigger>
          <SelectContent>
            {dropdownData.map((item) => (
              <SelectItem value={item.id} key={item.id}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <OverlapLoader loader={isLoading}>
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
      </OverlapLoader>
    </>
  );
}

export default Liquidity;
