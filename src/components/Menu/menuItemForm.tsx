import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { DropdownMenu } from "../ui/dropdown-menu";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";

export function MenuItemForm() {
    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Add New Item</CardTitle>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="flex flex-col gap-6">
                        <div className="grid gap-2">
                            <Label htmlFor="itemName">Item Name</Label>
                            <Input
                                id="itemName"
                                name="itemName"
                                type="text"
                                placeholder="e.g., Panner Tikka Masala"
                                required
                            />
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Spicy gravy with small chopped panner pieces"
                            />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <div className="">
                            <Label htmlFor="price">Price</Label>
                            <Input
                                id="pice"
                                name="price"
                                type="number"
                                placeholder="320"
                                required
                            />
                        </div>
                        <div className="">
                            <Label htmlFor="category">Category</Label>
                            <Select>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a fruit" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Fruits</SelectLabel>
                                        <SelectItem value="apple">Apple</SelectItem>
                                        <SelectItem value="banana">Banana</SelectItem>
                                        <SelectItem value="blueberry">Blueberry</SelectItem>
                                        <SelectItem value="grapes">Grapes</SelectItem>
                                        <SelectItem value="pineapple">Pineapple</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                        <div className="">
                            <Label htmlFor="categoryName">Image</Label>

                        </div>
                </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
                <Button type="submit" className="w-full">
                    Add Category
                </Button>
            </CardFooter>
        </Card>
    )
}