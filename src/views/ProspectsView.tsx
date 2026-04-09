import { useState } from "react";
import { Plus, MoreVertical, ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";
import ProspectForm from "@/components/ProspectForm";

const prospects = [
  { initials: "JP", name: "Juan Pérez", email: "jperez@email.com", phone: "987654321", dni: "12345678", origin: "Web", status: "ACTIVE" },
  { initials: "MG", name: "María García", email: "mgarcia@email.com", phone: "912345678", dni: "87654321", origin: "WhatsApp", status: "ACTIVE" },
  { initials: "CL", name: "Carlos López", email: "clopez@email.com", phone: "933445566", dni: "11223344", origin: "Facebook", status: "INACTIVE" },
  { initials: "AM", name: "Ana Martínez", email: "amartinez@email.com", phone: "955667788", dni: "44332211", origin: "Web", status: "ACTIVE" },
];

const stats = [
  { label: "NUEVOS HOY", value: "24", change: "+12%", positive: true },
  { label: "TASA DE CONVERSIÓN", value: "18.5%", change: "+2.4%", positive: true },
  { label: "CANAL PRINCIPAL", value: "WhatsApp" },
  { label: "INSCRIPCIONES META", progress: 72 },
];

const ProspectsView = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Gestión de Prospectos</h1>
          <p className="text-sm text-muted-foreground mt-1">Administra y da seguimiento a los leads de inscripción.</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-primary">
          <Plus size={18} /> + Nuevo Prospecto
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-end gap-4 rounded-xl bg-card p-5 border border-border">
        <div className="flex-1">
          <label className="form-label">Campaña</label>
          <select className="form-select">
            <option>Todas las Campañas</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="form-label">Estado</label>
          <select className="form-select">
            <option>Cualquier Estado</option>
          </select>
        </div>
        <button className="btn-secondary whitespace-nowrap">Limpiar Filtros</button>
      </div>

      {/* Table */}
      <div className="rounded-xl bg-card border border-border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Nombre Completo</th>
              <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Contacto</th>
              <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">DNI</th>
              <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Origen</th>
              <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Estado</th>
              <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {prospects.map((p, i) => (
              <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
                      {p.initials}
                    </div>
                    <span className="font-medium text-foreground">{p.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-foreground">{p.email}</div>
                  <div className="text-muted-foreground text-xs">{p.phone}</div>
                </td>
                <td className="px-6 py-4 text-foreground">{p.dni}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">{p.origin}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-[11px] font-bold tracking-wide ${
                    p.status === "ACTIVE" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                  }`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-muted-foreground hover:text-foreground"><MoreVertical size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between border-t border-border px-6 py-3">
          <span className="text-sm text-muted-foreground">Mostrando 4 de 128 prospectos</span>
          <div className="flex items-center gap-1">
            <button className="h-8 w-8 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:bg-muted"><ChevronLeft size={16} /></button>
            <button className="h-8 w-8 rounded-md bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">1</button>
            <button className="h-8 w-8 rounded-md border border-border flex items-center justify-center text-sm text-muted-foreground hover:bg-muted">2</button>
            <button className="h-8 w-8 rounded-md border border-border flex items-center justify-center text-sm text-muted-foreground hover:bg-muted">3</button>
            <button className="h-8 w-8 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:bg-muted"><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="rounded-xl bg-card border border-border p-5">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{s.label}</p>
            {s.progress !== undefined ? (
              <div className="mt-3">
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${s.progress}%` }} />
                </div>
                <p className="text-xs text-muted-foreground mt-2">{s.progress}% Completado</p>
              </div>
            ) : (
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-2xl font-bold text-foreground">{s.value}</span>
                {s.change && (
                  <span className="text-xs font-semibold text-emerald-500 flex items-center gap-0.5">
                    <TrendingUp size={12} /> {s.change}
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <ProspectForm open={showForm} onClose={() => setShowForm(false)} onSubmit={() => setShowForm(false)} />
    </div>
  );
};

export default ProspectsView;
