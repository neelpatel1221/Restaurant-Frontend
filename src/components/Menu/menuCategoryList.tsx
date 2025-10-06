import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { getMenuCategorys, Category, deleteCategory } from "@/features/menuSlice";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash } from "lucide-react";
import { TableComponent } from "../ui/TableComponent";
import { CategoryForm } from "./categoryForm";



export function MenuCategoryList() {
    const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
    const [categoryId, setCategoryId] = useState<string | null>(null);

    const dispatch = useDispatch<AppDispatch>()
    const { categories, loading, error, success } = useSelector((state: RootState) => state.menu);

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


    const columns: ColumnDef<Category>[] = [
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
                                    await dispatch(deleteCategory(row.original._id)).unwrap();
                                    dispatch(getMenuCategorys());
                                } catch (error) {
                                    console.error("Delete failed", error);
                                }
                            }

                            } >
                            <Trash className="text-red-500" />
                        </Button>

                        <Button variant="ghost" size="icon" onClick={() => openCategoryEditModal(row.original._id)}>
                            <Pencil className="text-black-500" />
                        </Button>
                    </div>
                )
            },
        },
    ]

    const closeCategoryFormModal = () => {
        setIsCategoryModalOpen(false);
        setCategoryId(null);
        setIsCategoryDialogOpen(false)

    };

    const openCategoryEditModal = (id: string) => {
        setIsCategoryDialogOpen(true)
        setCategoryId(id)
        setIsCategoryModalOpen(true);
    }

    return (
        <>
            <Card className="w-full mb-5 max-w-full">
                <CardHeader>
                    <CardTitle>Menu Categorys</CardTitle>
                </CardHeader>
                <CardContent>
                    <TableComponent
                        data={categories}
                        columns={columns}
                        showColumnToggle={true}
                    />
                    <CategoryForm
                        showAsDialog={isCategoryModalOpen}
                        showAsCard={false}
                        onClose={closeCategoryFormModal}
                        id={categoryId}
                    />
                </CardContent>
            </Card>
            <Toaster />
        </>
    )
}