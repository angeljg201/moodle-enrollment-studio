import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, SlidersHorizontal, Download, ChevronLeft, ChevronRight, TrendingUp, CheckCircle2, XCircle, Eye } from "lucide-react";
import PaymentForm from "@/components/PaymentForm";

const payments = [
  { id: "PAY-001", code: "#ORD-2931", initials: "JC", name: "Jorge Castillo", email: "j.castillo@email.com", amount: "1,200.00", method: "YAPE", type: "PAGO ÚNICO", status: "Confirmado", confirmed: true },
  { id: "PAY-002", code: "#ORD-2944", initials: "AM", name: "Ana Mendoza", email: "a.mendoza@email.com", amount: "450.00", method: "TRANSFERENCIA", type: "CUOTAS", status: "Fallido", confirmed: false },
  { id: "PAY-003", code: "#ORD-2950", initials: "RS", name: "Roberto Sánchez", email: "r.sanchez@email.com", amount: "2,100.00", method: "POS", type: "PAGO ÚNICO", status: "Confirmado", confirmed: true },
  { id: "PAY-004", code: "#ORD-2962", initials: "LP", name: "Lucía Paredes", email: "l.paredes@email.com", amount: "500.00", method: "EFECTIVO", type: "CUOTAS", status: "Confirmado", confirmed: true },
];

const PaymentsView = () => {
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Registro de Pagos</h1>
          <p className="text-sm text-muted-foreground mt-1">Administra y valida los ingresos provenientes de las inscripciones activas y nuevas matrículas.</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-primary">
          <Plus size={18} /> Registrar Pago
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-xl bg-card border border-border p-5">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Total Hoy</p>
          <p className="text-2xl font-bold text-foreground mt-2">S/ 4,250.00</p>
          <p className="text-xs font-semibold text-emerald-500 flex items-center gap-1 mt-2"><TrendingUp size={12} /> +12% vs ayer</p>
        </div>
        <div className="rounded-xl bg-card border border-border p-5">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Pendientes Validación</p>
          <p className="text-2xl font-bold text-foreground mt-2">08</p>
          <p className="text-xs text-muted-foreground mt-2">Última actualización: hace 5 min</p>
        </div>
        <div className="rounded-xl bg-card border border-border p-5">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Meta Mensual</p>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-bold text-foreground">S/ 48,000</span>
            <span className="text-sm text-muted-foreground">/ S/ 60,000</span>
          </div>
          <div className="h-2.5 rounded-full bg-muted overflow-hidden mt-3">
            <div className="h-full rounded-full bg-primary" style={{ width: "80%" }} />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl bg-card border border-border overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="font-bold text-foreground">Pagos Recientes</h2>
          <div className="flex items-center gap-2">
            <button className="h-9 w-9 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:bg-muted"><SlidersHorizontal size={16} /></button>
            <button className="h-9 w-9 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:bg-muted"><Download size={16} /></button>
          </div>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Código Orden</th>
              <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Cliente</th>
              <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Monto</th>
              <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Método</th>
              <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Tipo</th>
              <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Estado</th>
              <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p, i) => (
              <tr key={i} onClick={() => navigate(`/pagos/${p.id}`)} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors cursor-pointer">
                <td className="px-6 py-4 text-primary font-semibold cursor-pointer" onClick={(e) => { e.stopPropagation(); navigate(`/pagos/${p.id}`); }}>{p.code}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">{p.initials}</div>
                    <div>
                      <p className="font-medium text-foreground">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold text-foreground">S/ {p.amount}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center rounded-md bg-muted px-2.5 py-1 text-[11px] font-bold tracking-wide text-muted-foreground uppercase">{p.method}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-[11px] font-bold tracking-wide uppercase ${
                    p.type === "PAGO ÚNICO" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                  }`}>{p.type}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`flex items-center gap-1.5 text-sm font-medium ${p.confirmed ? "text-emerald-600" : "text-destructive"}`}>
                    {p.confirmed ? <CheckCircle2 size={16} /> : <XCircle size={16} />} {p.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={(e) => { e.stopPropagation(); navigate(`/pagos/${p.id}`); }}
                    className="flex items-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    <Eye size={14} /> Ver Detalle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between border-t border-border px-6 py-3">
          <span className="text-sm text-muted-foreground">Mostrando 4 de 128 registros</span>
          <div className="flex items-center gap-1">
            <button className="h-8 w-8 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:bg-muted"><ChevronLeft size={16} /></button>
            <button className="h-8 w-8 rounded-md bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">1</button>
            <button className="h-8 w-8 rounded-md border border-border flex items-center justify-center text-sm text-muted-foreground hover:bg-muted">2</button>
            <button className="h-8 w-8 rounded-md border border-border flex items-center justify-center text-sm text-muted-foreground hover:bg-muted">3</button>
            <button className="h-8 w-8 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:bg-muted"><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>

      <PaymentForm open={showForm} onClose={() => setShowForm(false)} onSubmit={() => setShowForm(false)} />
    </div>
  );
};

export default PaymentsView;
