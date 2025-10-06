import { AppSidebar } from "../components/ui/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";
import { Outlet } from "react-router-dom";

export default function SidebarLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 p-4">
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
