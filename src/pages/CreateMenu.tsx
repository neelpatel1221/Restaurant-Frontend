import { Toaster } from "react-hot-toast";
import { CategoryForm } from "../components/Menu/categoryForm";
import { MenuCategoryList } from "../components/Menu/menuCategoryList";
import { MenuItemForm } from "../components/Menu/menuItemForm";
import { MenuItemList } from "../components/Menu/menuItemList";

export function CreateMenu() {
    return (
        <div className="grid grid-cols- md:grid-cols-6 gap-6 p-4">
            <div className="md:col-span-2">
                <CategoryForm 
                    showAsCard={true}
                    showAsDialog={false}
                />
                <MenuItemForm 
                    showAsCard={true}
                    showAsDialog={false}
                />
            </div>
            <div className="md:col-span-4">
                <MenuCategoryList />
                <MenuItemList />
            </div>
            <Toaster />
        </div>
    );
}
