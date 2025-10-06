import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch"

import { createTable, getTables, updateTable } from "@/features/tableSlice";
import { Toaster } from "react-hot-toast";
interface TableForm {
  tableNumber: number;
  isAvailable: boolean;
  seating: number;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  id?: string | null;
}


export const TableForm: React.FC<ModalProps> = ({ isOpen, onClose, id }) => {
  const { loading, tables, error } = useSelector((state: RootState) => state.tables)
  const { register, handleSubmit, control, setValue,formState: { errors } } = useForm<TableForm>();
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit: SubmitHandler<TableForm> = (data: any) => {
    if(!id){
      dispatch(createTable(data));
    }else{
      dispatch(updateTable({id, data}))
      dispatch(getTables())
    }
    onClose();
  }

  useEffect(()=>{
    if(id){
      const table = tables.find((table) =>table._id === id)
      if(table){
        // Populate form with existing table data
        setValue("tableNumber", table.tableNumber);
        setValue("isAvailable", table.isAvailable);
        setValue("seating", table.seating);
      }
    }
  }, [id, tables])

  return (
<>
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {id ? "Update Table" : "Add New Table"}
            </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tableNumber">Table Number</Label>
            <Input
              id="tableNumber"
              type="number"
              {...register("tableNumber", { required: "Table number is required", valueAsNumber: true })}
              placeholder="Eg: 101"
            />
            {errors.tableNumber && (
              <p className="text-sm text-red-500">{errors.tableNumber.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="seating">Seating Capacity</Label>
            <Input
              id="seating"
              type="number"
              {...register("seating", { required: "Seating is required", valueAsNumber: true })}
              placeholder="Eg: 4"
            />
            {errors.seating && (
              <p className="text-sm text-red-500">{errors.seating.message}</p>
            )}
          </div>

          <div className="flex items-center justify-between space-y-2">
            <Label htmlFor="isAvailable" className="text-sm">
              Status
            </Label>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">In Active</span>

              <Controller
                name="isAvailable"
                control={control}
                defaultValue={true}
                render={({ field }) => (
                  <Switch
                    id="isAvailable"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />

              <span className="text-sm text-muted-foreground">Active</span>
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Creating..." : "Save"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
    <Toaster />
</>
  )
}