import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { createCategory, getMenuCategorys, Menu } from "@/features/menuSlice";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, VisibilityState } from "@tanstack/react-table";
import { deleteable, getTableQrCode, getTables } from "@/features/tableSlice";
import { ChevronDown, Pencil, Plus, QrCode, Trash } from "lucide-react";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { TableForm } from "../Tables/TableForm";
import { QrCodeModal } from "../Tables/qrCodeModal";
import { TableComponent } from "../ui/TableComponent";

// export type Menu = {
//     _id: string
//     categoryName: number
//     description: string
//     isActive: boolean
// }


export function MenyCategoryList() {
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
    const { menus, loading, error, success } = useSelector((state: RootState) => state.menu);

    useEffect(() => {
        dispatch(getMenuCategorys())
    }, [])

    useEffect(() => {
        if (error) {
            toast.error(error.message);
        }
        if (success) {
            toast.success(success);
        }
    }, [error, success])


    const columns: ColumnDef<Menu>[] = [
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
            accessorKey: "categoryName",
            header: "Category",
            cell: ({ row }) => (
                <div className="capitalize">{row.getValue("categoryName")}</div>
            ),
        },
        {
            accessorKey: "description",
            header: "Description",
            cell: ({ row }) => <div className="capitalize">{row.getValue("description")}</div>,
        },
        {
            accessorKey: "isActive",
            header: "Status",
            cell: ({ row }) => <div className="capitalize">{row.getValue("isActive") ? "Active" : "In Active"}</div>,
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
        // {
        //     accessorKey: "qrCode",
        //     header: "Qr Code",
        //     cell: ({ row }) => <QrCode className="cursor-pointer w-10 h-10 p-2 hover:bg-accent hover:text-accent-foreground rounded-sm" onClick={() => openQrCodeModal(row.original._id)} />,
        // },
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
        data: menus as Menu[],
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

    const openEditModal = (id: string) => {
        setTableId(id)
        setIsTableModalOpen(true);
    }

    // const handleDownload = () => {
    //     if (!qrCode) return;

    //     const link = document.createElement("a");
    //     link.href = qrCode;
    //     link.download = "qr-code.png";
    //     link.click();
    // };
    return (
        <>
            <Card className="w-full mb-5 max-w-full">
                <CardHeader>
                    <CardTitle>Menu Categorys</CardTitle>
                </CardHeader>
                <CardContent>
                    <TableComponent
                        data={menus}
                        columns={columns}
                        showColumnToggle={true}
                    />
                    {/* <QrCodeModal
                        isOpen={isQrModalOpen}
                        onClose={closeQrCodeModal}
                        onDownload={handleDownload}
                    /> */}
                    <TableForm
                        isOpen={isTableModalOpen}
                        onClose={closeTableFormModal}
                        id={tableId}
                    />
                </CardContent>
            </Card>
            <Toaster />
        </>
    )
}