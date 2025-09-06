
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import OrderStatus from "./pages/OrderStatus";
import AdminDashboard from "./pages/AdminDashboard";
import AdminMenu from "./pages/AdminMenu";
import AdminOrders from "./pages/AdminOrders";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/order-status" element={<OrderStatus />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/menu" element={<AdminMenu />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
