import { BarChart3, Users, CreditCard, TrendingUp } from "lucide-react";

const DashboardView = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Resumen general del sistema de inscripciones.</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Prospectos Totales", value: "1,284", icon: Users, change: "+8.2%" },
          { label: "Órdenes del Mes", value: "342", icon: BarChart3, change: "+12%" },
          { label: "Ingresos del Mes", value: "S/ 128,450", icon: CreditCard, change: "+15.3%" },
          { label: "Tasa de Conversión", value: "22.4%", icon: TrendingUp, change: "+3.1%" },
        ].map((s, i) => (
          <div key={i} className="rounded-xl bg-card border border-border p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{s.label}</p>
              <s.icon size={18} className="text-primary" />
            </div>
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs font-semibold text-emerald-500 mt-1">{s.change} vs mes anterior</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-card border border-border p-6 h-64 flex items-center justify-center">
        <p className="text-muted-foreground">Gráficas y métricas detalladas próximamente.</p>
      </div>
    </div>
  );
};

export default DashboardView;
