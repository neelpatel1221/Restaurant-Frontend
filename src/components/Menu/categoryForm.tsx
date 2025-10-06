import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { createCategory, getMenuCategorys, updateCategory } from "@/features/menuSlice";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

interface CategoryFormData {
    categoryName: string;
}

interface CategoryFormProps {
    showAsDialog?: boolean;
    showAsCard?: boolean;
    onClose?: () => void;
    id?: string | null;

}
export function CategoryForm({ showAsDialog = false, showAsCard = false , onClose, id = null }: CategoryFormProps) {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<CategoryFormData>()
    const { categories } = useSelector((state: RootState) => state.menu)
    const dispatch = useDispatch<AppDispatch>()
    const { error } = useSelector((state: RootState) => state.menu)

    useEffect(() => {
        if (error) {
            toast.error(error.message)
        }
    }, [error])

    useEffect(() => {
        if (id) {
            const category = categories?.find((cat) => cat._id === id)
            if(category){
                setValue("categoryName",  category?.categoryName)
            }
        }
    }, [id])

    const onSubmit: SubmitHandler<CategoryFormData> = async (data: any) => {

        if(!id){
            await dispatch(createCategory(data))
        } else {
            await dispatch(updateCategory({id, data}))
            await dispatch(getMenuCategorys())
            onClose()
        }
    }

    const formContent = (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
            <div className="grid gap-2">
                <Label htmlFor="categoryName">Category Name</Label>
                <Input
                    id="categoryName"
                    type="text"
                    placeholder="e.g., Appetizers"
                    {...register("categoryName", {
                        required: "Category name is required",
                    })}
                />
                {errors.categoryName && (
                    <p className="text-sm text-red-500">
                        {errors.categoryName.message}
                    </p>
                )}
            </div>

            <div>
                <Button type="submit" className="w-full">
                     {id ? 'Update Category' : 'Add Category'} 
                </Button>
            </div>
        </form>
    );


    if (showAsDialog) {
        return (
            <>
                <Dialog open={showAsDialog} onOpenChange={onClose}>
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle>Update Category</DialogTitle>
                        </DialogHeader>
                        {formContent}
                    </DialogContent>
                </Dialog>
                <Toaster />
            </>
        );
    }
    return (
        <>
        {
            (showAsCard) &&
            <Card className="w-full mb-5 max-w-sm">
                <CardHeader>
                    <CardTitle>Add New Category</CardTitle>
                </CardHeader>
                <CardContent>
                    {formContent}
                </CardContent>
                <CardFooter />
            </Card>
    }
            <Toaster />
        </>
    );
}