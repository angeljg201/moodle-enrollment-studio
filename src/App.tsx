import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import MainLayout from "@/components/MainLayout";
import DashboardView from "@/views/DashboardView";
import ProspectsView from "@/views/ProspectsView";
import PipelineView from "@/views/PipelineView";
import OrdersView from "@/views/OrdersView";
import OrdersListView from "@/views/OrdersListView";
import ProductsView from "@/views/ProductsView";
import FinanceDashboardView from "@/views/FinanceDashboardView";
import PaymentsView from "@/views/PaymentsView";
import PaymentDetailView from "@/views/PaymentDetailView";
import PaymentPlansView from "@/views/PaymentPlansView";
import OverdueView from "@/views/OverdueView";
import MarketingDashboardView from "@/views/MarketingDashboardView";
import CampaignsView from "@/views/CampaignsView";
import CampaignDetailView from "@/views/CampaignDetailView";
import LeadSourcesView from "@/views/LeadSourcesView";
import LeadDetailView from "@/views/LeadDetailView";
import OrderDetailView from "@/views/OrderDetailView";
import UsersView from "@/auth/views/UsersView";
import CoursesAdminView from "@/orders/views/CoursesAdminView";
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
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardView />} />
            <Route path="prospectos" element={<ProspectsView />} />
            <Route path="prospectos/:id" element={<LeadDetailView />} />
            <Route path="pipeline" element={<PipelineView />} />
            <Route path="ordenes" element={<OrdersListView />} />
            <Route path="ordenes/:id" element={<OrderDetailView />} />
            <Route path="nueva-orden" element={<OrdersView />} />
            <Route path="productos" element={<ProductsView />} />
            <Route path="finanzas" element={<FinanceDashboardView />} />
            <Route path="pagos" element={<PaymentsView />} />
            <Route path="pagos/:id" element={<PaymentDetailView />} />
            <Route path="planes-pago" element={<PaymentPlansView />} />
            <Route path="morosos" element={<OverdueView />} />
            <Route path="marketing" element={<MarketingDashboardView />} />
            <Route path="campanas" element={<CampaignsView />} />
            <Route path="campanas/:id" element={<CampaignDetailView />} />
            <Route path="origen-leads" element={<LeadSourcesView />} />
            {/* Admin routes */}
            <Route path="admin/usuarios" element={<UsersView />} />
            <Route path="admin/roles" element={<div className="text-foreground"><h1 className="text-2xl font-bold">Gestión de Roles</h1><p className="text-muted-foreground mt-1">Próximamente...</p></div>} />
            <Route path="admin/cursos" element={<CoursesAdminView />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;