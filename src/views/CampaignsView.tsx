import { useState } from "react";
import { Plus, SlidersHorizontal, Download, TrendingUp, BarChart3 } from "lucide-react";
import CampaignForm from "@/components/CampaignForm";
import CampaignDetailModal from "@/components/CampaignDetailModal";

const campaigns = [
  { name: "Summer Enrollment 2024", id: "CAMP-9231", course: "Data Science Mastery", platform: "Facebook", platformColor: "bg-blue-500", budget: "$12,000", spent: "$8,420", status: "ACTIVE" },
  { name: "B2B Awareness Program", id: "CAMP-8842", course: "Agile Leadership", platform: "Instagram", platformColor: "bg-pink-500", budget: "$5,500", spent: "$5,490", status: "PAUSED" },
  { name: "Gen Z Skills Push", id: "CAMP-1042", course: "Python for Beginners", platform: "TikTok", platformColor: "bg-foreground", budget: "$8,000", spent: "$2,100", status: "ACTIVE" },
  { name: "Remarketing Core", id: "CAMP-0955", course: "UI/UX Bootcamp", platform: "Facebook", platformColor: "bg-blue-500", budget: "$15,000", spent: "$11,200", status: "ACTIVE" },
  { name: "Influencer Collab", id: "CAMP-7721", course: "Marketing Digital", platform: "Instagram", platformColor: "bg-pink-500", budget: "$4,500", spent: "$1,240", status: "ACTIVE" },
];

const CampaignsView = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<typeof campaigns[0] | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Campañas</h1>
          <p className="text-sm text-muted-foreground mt-1">Gestiona y analiza el rendimiento de tus campañas de captación.</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-primary">
          <Plus size={18} /> Nueva Campaña
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-xl bg-card border border-border p-5">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Presupuesto Total</p>
            <BarChart3 size={18} className="text-primary" />
          </div>
          <p className="text-2xl font-bold text-foreground mt-2">$45,000</p>
          <span className="inline-flex mt-2 rounded-md bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">+12% vs last month</span>
        </div>
        <div className="rounded-xl bg-card border border-border p-5">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Total Gastado</p>
            <BarChart3 size={18} className="text-muted-foreground" />
          </div>
          <div className="flex items-baseline gap-3 mt-2">
            <span className="text-2xl font-bold text-foreground">$28,450</span>
            <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
              <div className="h-full rounded-full bg-foreground" style={{ width: "63%" }} />
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-card border border-border p-5">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Campañas Activas</p>
            <TrendingUp size={18} className="text-muted-foreground" />
          </div>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-2xl font-bold text-foreground">12</span>
            <span className="text-sm text-muted-foreground">de 15 totales</span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl bg-card border border-border overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="font-bold text-foreground">Listado de Campañas</h2>
          <div className="flex items-center gap-2">
            <button className="btn-secondary text-xs px-3 py-2"><SlidersHorizontal size={14} /> Filtrar</button>
            <button className="btn-secondary text-xs px-3 py-2"><Download size={14} /> Exportar</button>
          </div>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Nombre de Campaña</th>
              <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Curso Asociado</th>
              <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Plataforma</th>
              <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Presupuesto</th>
              <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Gastado</th>
              <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Estado</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c, i) => (
              <tr
                key={i}
                onClick={() => setSelectedCampaign(c)}
                className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <td className="px-6 py-4">
                  <p className="font-semibold text-foreground">{c.name}</p>
                  <p className="text-xs text-muted-foreground">ID: {c.id}</p>
                </td>
                <td className="px-6 py-4 text-foreground">{c.course}</td>
                <td className="px-6 py-4">
                  <span className="flex items-center gap-2 text-foreground">
                    <span className={`h-2 w-2 rounded-full ${c.platformColor}`} />
                    {c.platform}
                  </span>
                </td>
                <td className="px-6 py-4 text-foreground">{c.budget}</td>
                <td className="px-6 py-4 text-foreground">{c.spent}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-[11px] font-bold tracking-wide border ${
                    c.status === "ACTIVE" ? "border-emerald-200 text-emerald-700" : "border-border text-muted-foreground"
                  }`}>{c.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex items-center justify-between border-t border-border px-6 py-3">
          <span className="text-sm text-muted-foreground">Mostrando 5 de 15 campañas</span>
          <div className="flex items-center gap-2 text-sm">
            <span className="font-bold text-primary">1</span>
            <span className="text-muted-foreground">2</span>
            <span className="text-muted-foreground">3</span>
            <span className="text-muted-foreground">Siguiente &gt;</span>
          </div>
        </div>
      </div>

      {/* AI Banner */}
      <div className="rounded-xl bg-card border border-border p-6 flex items-center gap-6">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-foreground">Maximiza tus Leads</h3>
          <p className="text-sm text-muted-foreground mt-1">El algoritmo de Precise Scholar sugiere que tus campañas en TikTok tienen un 24% más de conversión para cursos técnicos. Considera redistribuir $2,000 del presupuesto de Instagram.</p>
          <button className="btn-primary mt-4 text-xs px-4 py-2">Ver Recomendaciones AI</button>
        </div>
        <div className="w-48 h-28 rounded-lg bg-muted flex items-center justify-center">
          <BarChart3 size={48} className="text-primary/30" />
        </div>
      </div>

      <CampaignForm open={showForm} onClose={() => setShowForm(false)} onSubmit={() => setShowForm(false)} />
      <CampaignDetailModal open={!!selectedCampaign} onClose={() => setSelectedCampaign(null)} campaign={selectedCampaign} />
    </div>
  );
};

export default CampaignsView;
