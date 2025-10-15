import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { createMenuItem, getMenuItems, updateMenuItem } from "@/features/menuSlice";
import { useEffect } from "react";

interface MenuItemFormProps {
    showAsDialog?: boolean;
    showAsCard?: boolean;
    open?: boolean;
    onClose?: () => void;
    id?: string | null;
}

interface MenuItemFormData {
    itemName: string;
    description: string;
    price: number;
    category: string;
    image: FileList;
    isAvailable: boolean;
    categoryId: string;
}

export function MenuItemForm({ showAsDialog, showAsCard, id = null, onClose }: MenuItemFormProps) {
    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm<MenuItemFormData>()
    const dispatch = useDispatch<AppDispatch>()
    const { menu, categories, menuItems } = useSelector((state: RootState) => state.menu)

    useEffect(() => {
        if (id) {
            const menuItem = menuItems?.find((menu) => menu._id === id)
            if (menuItem) {
                setValue("itemName", menuItem?.itemName)
                setValue("description", menuItem?.description)
                setValue("price", menuItem?.price)
                if (typeof menuItem?.categoryId !== "string") {
                    setValue("categoryId", menuItem?.categoryId?._id);
                } else {
                    setValue("categoryId", menuItem?.categoryId);
                }
                // setValue("image",  menuItem?.image)
                setValue("isAvailable", menuItem?.isAvailable)
            }
        }
    }, [id])

    const onSubmit: SubmitHandler<MenuItemFormData> = async (data: any) => {

        const formData = new FormData();

        formData.append("itemName", data.itemName);
        formData.append("description", data.description || "");
        formData.append("price", data.price);
        formData.append("categoryId", data.categoryId);
        formData.append("isAvailable", "true");
        const fileInput = document.getElementById("image") as HTMLInputElement;
        if (fileInput?.files?.[0]) {
            formData.append("image", fileInput.files[0]);
        }
        if (!id) {
            await dispatch(createMenuItem(formData))
        } else {
            await dispatch(updateMenuItem({ id, data:formData }))
            await dispatch(getMenuItems())
            onClose()
        }
    }


    const formContent = (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="itemName">Item Name</Label>
                    <Input
                        id="itemName"
                        name="itemName"
                        type="text"
                        placeholder="e.g., Paneer Tikka Masala"
                        required
                        {...register("itemName", { required: 'Item Name is required' })}
                    />
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        name="description"
                        placeholder="Spicy gravy with small chopped paneer pieces"
                        {...register("description")}
                    />
                </div>
            </div>

            <div className="flex gap-2 mt-4">
                <div>
                    <Label htmlFor="price">Price</Label>
                    <Input id="price" name="price" type="number" placeholder="320" required  {...register("price", { required: 'Price is required' })} />
                </div>
                <div>
                    <Label htmlFor="category">Category</Label>
                    <Controller
                        name="categoryId"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {categories?.map((cat: any) => (
                                            <SelectItem key={cat._id} value={cat._id}>
                                                <p className="capitalize">{cat.categoryName}</p>
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        )}
                    />
                </div>
            </div>

            <div className="mt-4">
                <Label htmlFor="image">Image</Label>
                <Input id="image" name="image" type="file" accept="image/*" />
            </div>

            <div className="mt-4">
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
                            <DialogTitle>Update Item</DialogTitle>
                        </DialogHeader>
                        {formContent}
                    </DialogContent>
                </Dialog>
            </>
        );
    }

    return (
        <>
            {
                showAsCard &&
                <Card className="w-full max-w-sm">
                    <CardHeader>
                        <CardTitle>Add New Item</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {formContent}
                    </CardContent>
                </Card>
            }
        </>
    )
}