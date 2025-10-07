import { useEffect, useState } from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import { ChevronDown, Pencil, Plus, QrCode, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/store/store"
import { deleteable, getTableQrCode, getTables } from "@/features/tableSlice"
import { QrCodeModal } from "./qrCodeModal";
import axiosInstance from "@/utils/axiosInstance"
import { TableForm } from "./TableForm"
import toast, { Toaster } from "react-hot-toast"


export type Payment = {
  _id: string
  tableNumber: number
  isAvailable: boolean
  qrCode: string
  seating: number
}


export function DataTableDemo() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [tableId, setTableId] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>()
  const { tables, loading, error, qrCode, success } = useSelector((state: RootState) => state.tables);

  useEffect(() => {
    dispatch(getTables())
  }, [])

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error])
  useEffect(() => {
    if (success) {
      toast.success(success);
    }
  }, [success])


  const columns: ColumnDef<Payment>[] = [
    //   {
    //     id: "select",
    //     header: ({ table }) => (
    //       <Checkbox
    //         checked={
    //           table.getIsAllPageRowsSelected() ||
    //           (table.getIsSomePageRowsSelected() && "indeterminate")
    //         }
    //         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //         aria-label="Select all"
    //       />
    //     ),
    //     cell: ({ row }) => (
    //       <Checkbox
    //         checked={row.getIsSelected()}
    //         onCheckedChange={(value) => row.toggleSelected(!!value)}
    //         aria-label="Select row"
    //       />
    //     ),
    //     enableSorting: false,
    //     enableHiding: false,
    //   },
    {
      accessorKey: "tableNumber",
      header: "Table Number",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("tableNumber")}</div>
      ),
    },
    {
      accessorKey: "seating",
      header: "Seating Capacity",
      cell: ({ row }) => <div className="lowercase">{row.getValue("seating") ?? 2}</div>,
    },
    {
      accessorKey: "isAvailable",
      header: "Status",
      cell: ({ row }) => <div className="capitalize">{row.getValue("isAvailable") ? "Active" : "In Active"}</div>,
    },
    //   {
    //     accessorKey: "email",
    //     header: ({ column }) => {
    //       return (
    //         <Button
    //           accessKey="seating"
    //           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //         >
    //           Email
    //           <ArrowUpDown />
    //         </Button>
    //       )
    //     },
    //     cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    //   },
    {
      accessorKey: "qrCode",
      header: "Qr Code",
      cell: ({ row }) => <QrCode className="cursor-pointer w-10 h-10 p-2 hover:bg-accent hover:text-accent-foreground rounded-sm" onClick={() => openQrCodeModal(row.original._id)} />,
    },
    {
      id: "actions",
      header: "Actions",
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <div className="flex">
            <Button variant="ghost" size="icon"
              onClick={async () => {
                try {
                  await dispatch(deleteable(row.original._id)).unwrap();
                  dispatch(getTables());
                } catch (error) {
                  console.error("Delete failed", error);
                }
              }

              } >
              <Trash className="text-red-500" />
            </Button>

            <Button variant="ghost" size="icon" onClick={() => openEditModal(row.original._id)}>
              <Pencil className="text-black-500" />
            </Button>
          </div>
        )
      },
    },
  ]

  const table = useReactTable({
    data: tables as Payment[],
    columns,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  const openQrCodeModal = async (id: string) => {
    try {
      dispatch(getTableQrCode(id))
      setIsQrModalOpen(true);

    } catch (error) {
      console.error("Error fetching QR code:", error);
    }
  };

  const handleAddTable = () => {
    setIsTableModalOpen(true);
  }

  const closeQrCodeModal = () => {
    setIsQrModalOpen(false);
  };
  const closeTableFormModal = () => {
    setIsTableModalOpen(false);
    setTableId(null);

  };

  const openEditModal = (id: string)=>{
    setTableId(id)
    setIsTableModalOpen(true);
  }

  const handleDownload = () => {
    if (!qrCode) return;

    const link = document.createElement("a");
    link.href = qrCode;
    link.download = "qr-code.png";
    link.click();
  };

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Button variant="default" onClick={handleAddTable}> <Plus /> Add Table</Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-hidden rounded-md border">
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
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
      <QrCodeModal
        isOpen={isQrModalOpen}
        onClose={closeQrCodeModal}
        onDownload={handleDownload}
      />
      <TableForm
        isOpen={isTableModalOpen}
        onClose={closeTableFormModal}
        id = {tableId}
      />
    <Toaster />
    </div>
  )
}
