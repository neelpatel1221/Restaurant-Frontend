import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { deleteMenuItem, getMenuItems, MenuItem } from "@/features/menuSlice";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash } from "lucide-react";
import { TableComponent } from "../ui/TableComponent";
import { MenuItemForm } from "./menuItemForm";

export function MenuItemList() {
  const [isMenuItemModalOpen, setIsMenuItemModalOpen] = useState(false);
  const [menuId, setMenuId] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const { menuItems, loading, error, success } = useSelector((state: RootState) => state.menu);

  useEffect(() => {
    dispatch(getMenuItems());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error.message, { style: { backgroundColor: "#f8d7da", color: "#721c24" } });
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      toast.success(success, { style: { backgroundColor: "#d4edda", color: "#155724" } });
    }
  }, [success]);

  const columns: ColumnDef<MenuItem>[] = [
    {
      accessorKey: "imageUrl",
      header: "Image",
      cell: ({ row }) => (
        <div className="w-24 h-24 overflow-hidden rounded-lg shadow-md">
          <img className="object-cover w-full h-full" src={row.getValue("imageUrl")} alt={row.getValue("itemName")} />
        </div>
      ),
    },
    {
      accessorKey: "itemName",
      header: "Item",
      cell: ({ row }) => (
        <div className="capitalize font-semibold text-lg">{row.getValue("itemName")}</div>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => (
        <div className="text-sm text-gray-500">{row.getValue("description") ?? 'No description available'}</div>
      ),
    },
    {
      accessorKey: "isAvailable",
      header: "Status",
      cell: ({ row }) => (
        <div className={`capitalize font-semibold ${row.getValue("isAvailable") ? 'text-green-500' : 'text-red-500'}`}>
          {row.getValue("isAvailable") ? "Available" : "Not Available"}
        </div>
      ),
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => (
        <div className="text-sm font-medium text-gray-700">{row.getValue("price") ? `$${row.getValue("price")}` : 'N/A'}</div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      enableHiding: false,
      cell: ({ row }) => (
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={async () => {
              try {
                await dispatch(deleteMenuItem(row.original._id)).unwrap();
                dispatch(getMenuItems());
                toast.success("Item deleted successfully!", { style: { backgroundColor: "#d4edda", color: "#155724" } });
              } catch (error) {
                toast.error("Delete failed", { style: { backgroundColor: "#f8d7da", color: "#721c24" } });
              }
            }}
          >
            <Trash className="text-red-500" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => openEditModal(row.original._id)}
          >
            <Pencil className="text-blue-500" />
          </Button>
        </div>
      ),
    },
  ];

  const closeTableFormModal = () => {
    setIsMenuItemModalOpen(false);
    setMenuId(null);
  };

  const openEditModal = (id: string) => {
    setMenuId(id);
    setIsMenuItemModalOpen(true);
  };

  return (
    <Card className="w-full mb-5 max-w-full shadow-lg rounded-lg">
      <CardHeader className="bg-gradient-to-r p-4 rounded-t-lg">
        <CardTitle className="text-2xl font-semibold">Menu Items</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <TableComponent
          data={menuItems}
          columns={columns}
          showColumnToggle={true}
          // tableClassName="min-w-full bg-white shadow-md rounded-lg overflow-hidden"
        />

        <MenuItemForm
          showAsDialog={isMenuItemModalOpen}
          showAsCard={false}
          onClose={closeTableFormModal}
          id={menuId}
        />
      </CardContent>
    </Card>
  );
}
