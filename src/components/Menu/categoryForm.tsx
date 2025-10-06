import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { createCategory } from "@/features/menuSlice";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

interface CategoryFormData {
    categoryName: string;
}

export function CategoryForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<CategoryFormData>()
    const dispatch = useDispatch<AppDispatch>()
    const { error } = useSelector((state: RootState) => state.menu)

    useEffect(() => {
        if (error) {
            toast.error(error.message)
        }
    }, [error])

    const onSubmit: SubmitHandler<CategoryFormData> = (data: any) => {
        dispatch(createCategory(data))
    }
    return (
        <>
            <Card className="w-full mb-5 max-w-sm">
                <CardHeader>
                    <CardTitle>Add New Category</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="categoryName">Category Name</Label>
                                <Input
                                    id="categoryName"
                                    type="text"
                                    placeholder="e.g., Appetizers"
                                    required
                                    {...register("categoryName", { required: "Category name is required" })}
                                />
                            </div>
                            <div className="">
                                <Button type="submit" className="w-full">
                                    Add Category
                                </Button>
                            </div>
                        </div>
                    </form>
                </CardContent>
            </Card>
            <Toaster />
        </>
    )
}