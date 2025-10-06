import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { getMenuItems, MenuItem } from "@/features/menuSlice";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ColumnDef, ColumnFiltersState, VisibilityState } from "@tanstack/react-table";
import { deleteable, getTableQrCode, getTables } from "@/features/tableSlice";
import { Pencil, QrCode, Trash } from "lucide-react";


import { TableComponent } from "../ui/TableComponent";
import { MenuItemForm } from "./menuItemForm";



export function MenuItemList() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isMenuItemModalOpen, setIsMenuItemModalOpen] = useState(false);
  const [tableId, setTableId] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>()

  const { menus, loading, error, success } = useSelector((state: RootState) => state.menu);

  useEffect(() => {
    dispatch(getMenuItems())
    console.warn(menus);
    
  }, [])

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
    if (success) {
      toast.success(success);
    }
  }, [error, success])


  const columns: ColumnDef<MenuItem>[] = [
    {
      accessorKey: "itemName",
      header: "Item",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("itemName")}</div>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => <div className="lowercase">{row.getValue("description") ?? 2}</div>,
    },
    {
      accessorKey: "isAvailable",
      header: "Status",
      cell: ({ row }) => <div className="capitalize">{row.getValue("isAvailable") ? "Available" : "Not Available"}</div>,
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => <div className="">{row.getValue("price") ?? ''}</div>,
    },
    // {
    //   accessorKey: "qrCode",
    //   header: "Qr Code",
    //   cell: ({ row }) => <QrCode className="cursor-pointer w-10 h-10 p-2 hover:bg-accent hover:text-accent-foreground rounded-sm" onClick={() => openQrCodeModal(row.original._id)} />,
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


  const openQrCodeModal = async (id: string) => {
    try {
      dispatch(getTableQrCode(id))
      setIsQrModalOpen(true);

    } catch (error) {
      console.error("Error fetching QR code:", error);
    }
  };

  const closeTableFormModal = () => {
    setIsMenuItemModalOpen(false);
    setTableId(null);

  };

  const openEditModal = (id: string) => {
    setTableId(id)
    setIsMenuItemModalOpen(true);
  }

  return (
    <>
      <Card className="w-full mb-5 max-w-full">
        <CardHeader>
          <CardTitle>Menu Items</CardTitle>
        </CardHeader>
        <CardContent>
          <TableComponent
            data={menus}
            columns={columns}
            showColumnToggle={true}
          />

          <MenuItemForm
            showAsDialog={isMenuItemModalOpen}
            showAsCard={false}
            onClose={closeTableFormModal}
          />
        </CardContent>
      </Card>
      <Toaster />
    </>
  )
}