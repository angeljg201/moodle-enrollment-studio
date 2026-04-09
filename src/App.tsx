import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import MainLayout from "@/components/MainLayout";
import DashboardView from "@/views/DashboardView";
import ProspectsView from "@/views/ProspectsView";
import OrdersView from "@/views/OrdersView";
import PaymentsView from "@/views/PaymentsView";
import CampaignsView from "@/views/CampaignsView";
import CoursesView from "@/views/CoursesView";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Navigate to="/prospectos" replace />} />
            <Route path="dashboard" element={<DashboardView />} />
            <Route path="prospectos" element={<ProspectsView />} />
            <Route path="ordenes" element={<OrdersView />} />
            <Route path="pagos" element={<PaymentsView />} />
            <Route path="campanas" element={<CampaignsView />} />
            <Route path="cursos" element={<CoursesView />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
