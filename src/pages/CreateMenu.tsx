import { CategoryForm } from "@/components/Menu/categoryForm";
import { MenyCategoryList } from "@/components/Menu/menuCategoryList";
import { MenuItemForm } from "@/components/Menu/menuItemForm";
import { MenyItemList } from "@/components/Menu/menyItemList";

export function CreateMenu() {
    return (
        <div className="grid grid-cols- md:grid-cols-6 gap-6 p-4">
            <div className="md:col-span-2">
                <CategoryForm />
                <MenuItemForm />
            </div>
            <div className="md:col-span-4">
                <MenyCategoryList />
                <MenyItemList />
            </div>
        </div>
    );
}
