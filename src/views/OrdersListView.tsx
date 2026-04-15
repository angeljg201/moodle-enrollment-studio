import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, Eye, Filter } from "lucide-react";
import NewOrderModal from "@/components/NewOrderModal";

const orders = [
  { id: "ORD-001", prospect: "Carlos Mendoza", course: "Data Science Avanzado", total: 1250, paymentType: "Contado", status: "Completada", date: "2024-06-28" },
  { id: "ORD-002", prospect: "Ana García", course: "UI/UX Bootcamp", total: 1800, paymentType: "Cuotas", status: "Pendiente", date: "2024-06-25" },
  { id: "ORD-003", prospect: "Luis Torres", course: "Liderazgo y Equipos", total: 450, paymentType: "Contado", status: "Completada", date: "2024-06-22" },
  { id: "ORD-004", prospect: "Rosa Díaz", course: "Ciberseguridad Avanzada", total: 2100, paymentType: "Cuotas", status: "Procesando", date: "2024-06-20" },
  { id: "ORD-005", prospect: "Jorge Paredes", course: "Data Science Avanzado", total: 1250, paymentType: "Contado", status: "Completada", date: "2024-06-18" },
  { id: "ORD-006", prospect: "Elena Vargas", course: "Marketing Estratégico", total: 890, paymentType: "Cuotas", status: "Pendiente", date: "2024-06-15" },
  { id: "ORD-007", prospect: "Roberto Sánchez", course: "Data Science Avanzado", total: 1250, paymentType: "Contado", status: "Cancelada", date: "2024-06-12" },
];

const statusStyles: Record<string, string> = {
  Completada: "bg-emerald-100 text-emerald-700",
  Pendiente: "bg-yellow-100 text-yellow-700",
  Procesando: "bg-blue-100 text-blue-700",
  Cancelada: "bg-red-100 text-red-700",
};

const OrdersListView = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [showNewOrder, setShowNewOrder] = useState(false);

  const filtered = orders.filter(o =>
    o.prospect.toLowerCase().includes(search.toLowerCase()) ||
    o.id.toLowerCase().includes(search.toLowerCase())
  );

  const totalRevenue = orders.filter(o => o.status === "Completada").reduce((s, o) => s + o.total, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Gestión de Órdenes</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {orders.length} órdenes registradas • Ingresos completados: S/ {totalRevenue.toLocaleString()}
          </p>
        </div>
        <button onClick={() => setShowNewOrder(true)} className="btn-primary">
          <Plus size={18} /> Nueva Orden de Venta
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Órdenes", value: orders.length, sub: "Este mes" },
          { label: "Completadas", value: orders.filter(o => o.status === "Completada").length, sub: "Pagadas" },
          { label: "Pendientes", value: orders.filter(o => o.status === "Pendiente").length, sub: "Por cobrar" },
          { label: "Ingresos", value: `S/ ${totalRevenue.toLocaleString()}`, sub: "Confirmados" },
        ].map((kpi, i) => (
          <div key={i} className="rounded-xl bg-card border border-border p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{kpi.label}</p>
            <p className="text-2xl font-bold text-foreground mt-1">{kpi.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{kpi.sub}</p>
          </div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-lg bg-muted px-4 py-2.5 flex-1">
          <Search size={16} className="text-muted-foreground" />
          <input
            className="bg-transparent text-sm outline-none w-full placeholder:text-muted-foreground"
            placeholder="Buscar por prospecto o ID de orden..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <button className="btn-secondary"><Filter size={16} /> Filtrar</button>
      </div>

      {/* Table */}
      <div className="rounded-xl bg-card border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-6 py-3">ID</th>
              <th className="text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-6 py-3">Prospecto</th>
              <th className="text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-6 py-3">Curso</th>
              <th className="text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-6 py-3">Tipo Pago</th>
              <th className="text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-6 py-3">Total</th>
              <th className="text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-6 py-3">Estado</th>
              <th className="text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-6 py-3">Fecha</th>
              <th className="text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-6 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order) => (
              <tr
                key={order.id}
                onClick={() => navigate(`/ordenes/${order.id}`)}
                className="border-b border-border last:border-0 hover:bg-muted/30 cursor-pointer transition-colors"
              >
                <td className="px-6 py-4 text-sm font-mono font-semibold text-primary">{order.id}</td>
                <td className="px-6 py-4 text-sm font-medium text-foreground">{order.prospect}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{order.course}</td>
                <td className="px-6 py-4">
                  <span className="text-xs font-semibold text-foreground">{order.paymentType}</span>
                </td>
                <td className="px-6 py-4 text-sm font-bold text-foreground">S/ {order.total.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-[11px] font-bold tracking-wide ${statusStyles[order.status]}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{order.date}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={(e) => { e.stopPropagation(); navigate(`/ordenes/${order.id}`); }}
                    className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    <Eye size={14} /> Ver Detalle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <NewOrderModal open={showNewOrder} onClose={() => setShowNewOrder(false)} />
    </div>
  );
};

export default OrdersListView;
