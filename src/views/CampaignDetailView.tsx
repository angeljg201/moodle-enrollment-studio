import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Edit, Trash2, UserPlus, Calendar, Monitor, Users, DollarSign, TrendingUp, BarChart3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const campaignsData: Record<string, any> = {
  "CAMP-9231": {
    name: "Summer Enrollment 2024", id: "CAMP-9231", platform: "Facebook", status: "ACTIVE",
    budget: 12000, spent: 8420, startDate: "2024-05-01", endDate: "2024-08-31",
    edition: { course: "Data Science Mastery", modality: "Online en Vivo", schedule: "Lun, Mié, Vie — 19:00 a 21:00", capacity: 40, enrolled: 28, startDate: "2024-09-02" },
    sellers: [
      { name: "María López", leads: 45, conversions: 12, rate: "26.7%" },
      { name: "Carlos Rivera", leads: 38, conversions: 9, rate: "23.7%" },
      { name: "Ana Martínez", leads: 52, conversions: 18, rate: "34.6%" },
    ],
  },
  "CAMP-8842": {
    name: "B2B Awareness Program", id: "CAMP-8842", platform: "Instagram", status: "PAUSED",
    budget: 5500, spent: 5490, startDate: "2024-03-15", endDate: "2024-06-15",
    edition: { course: "Agile Leadership", modality: "Presencial", schedule: "Sáb 09:00 a 13:00", capacity: 30, enrolled: 30, startDate: "2024-07-06" },
    sellers: [
      { name: "Jorge Paredes", leads: 22, conversions: 8, rate: "36.4%" },
      { name: "Elena Vargas", leads: 19, conversions: 5, rate: "26.3%" },
    ],
  },
};

const CampaignDetailView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const campaign = campaignsData[id || ""] || campaignsData["CAMP-9231"];

  const spentPercent = Math.round((campaign.spent / campaign.budget) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/campanas")}>
          <ArrowLeft size={20} />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-foreground">{campaign.name}</h1>
            <Badge className={campaign.status === "ACTIVE" ? "bg-emerald-100 text-emerald-700 border-emerald-200" : "bg-muted text-muted-foreground"}>
              {campaign.status}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">ID: {campaign.id} • Plataforma: {campaign.platform}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm"><UserPlus size={16} className="mr-1" /> Asignar Vendedor</Button>
          <Button variant="outline" size="sm"><Edit size={16} className="mr-1" /> Editar Campaña</Button>
          <Button variant="destructive" size="sm"><Trash2 size={16} className="mr-1" /> Eliminar</Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-5 gap-4">
        {[
          { label: "Presupuesto", value: `$${campaign.budget.toLocaleString()}`, icon: DollarSign, sub: "Total asignado" },
          { label: "Gastado", value: `$${campaign.spent.toLocaleString()}`, icon: BarChart3, sub: `${spentPercent}% utilizado` },
          { label: "Estado", value: campaign.status, icon: TrendingUp, sub: campaign.platform },
          { label: "Inicio", value: campaign.startDate, icon: Calendar, sub: "Fecha de inicio" },
          { label: "Fin", value: campaign.endDate, icon: Calendar, sub: "Fecha de cierre" },
        ].map((kpi, i) => (
          <Card key={i}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{kpi.label}</p>
                <kpi.icon size={16} className="text-primary" />
              </div>
              <p className="text-xl font-bold text-foreground mt-2">{kpi.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{kpi.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edition Info */}
      <Card>
        <CardHeader className="flex-row items-center justify-between pb-4">
          <CardTitle className="text-lg">Edición del Curso</CardTitle>
          <Button variant="outline" size="sm"><Edit size={14} className="mr-1" /> Editar Edición</Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Curso</p>
              <p className="font-semibold text-foreground">{campaign.edition.course}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Modalidad</p>
              <div className="flex items-center gap-2">
                <Monitor size={14} className="text-primary" />
                <p className="text-foreground">{campaign.edition.modality}</p>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Horario</p>
              <p className="text-foreground">{campaign.edition.schedule}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Capacidad</p>
              <div className="flex items-center gap-2">
                <Users size={14} className="text-primary" />
                <p className="text-foreground">{campaign.edition.enrolled} / {campaign.edition.capacity} inscritos</p>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Inicio de Clases</p>
              <p className="text-foreground">{campaign.edition.startDate}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sellers Table */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Vendedores Asignados</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Vendedor</th>
                <th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Leads Asignados</th>
                <th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Conversiones</th>
                <th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Tasa</th>
              </tr>
            </thead>
            <tbody>
              {campaign.sellers.map((s: any, i: number) => (
                <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">{s.name}</td>
                  <td className="px-6 py-4 text-foreground">{s.leads}</td>
                  <td className="px-6 py-4 text-foreground">{s.conversions}</td>
                  <td className="px-6 py-4">
                    <Badge variant="secondary" className="font-mono">{s.rate}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
};

export default CampaignDetailView;
