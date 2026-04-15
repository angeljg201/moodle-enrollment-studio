import { useState } from "react";
import { Plus, ArrowRight, BarChart3, Building2, Hash, Clock, Shield, Settings, Download } from "lucide-react";
import EditionPricingForm from "@/components/EditionPricingForm";

const courses = [
  {
    icon: BarChart3, code: "DATSC1", name: "Data Science Fundamentals", price: 1250,
    editions: [
      { name: "Edición Q1 2026", mode: "Online" },
      { name: "Edición intensiva", mode: "Híbrida" },
    ],
  },
  {
    icon: Building2, code: "EXCEL2", name: "Advanced Excel for Finance", price: 450,
    editions: [
      { name: "Edición Feb-Mar 2026", mode: "Online" },
    ],
  },
  {
    icon: Hash, code: "PMGT5", name: "Strategic Project Management", price: 2100,
    editions: [
      { name: "Global Edition 2026", mode: "Presencial" },
      { name: "Corporate Track", mode: "Híbrida" },
    ],
  },
];

const modeColors: Record<string, string> = {
  Online: "bg-primary/10 text-primary",
  Presencial: "bg-emerald-100 text-emerald-700",
  "Híbrida": "bg-purple-100 text-purple-700",
};

const CoursesView = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Gestión Académica</h1>
          <p className="text-sm text-muted-foreground mt-1">Administra el catálogo de formación y el control de ediciones activas.</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-primary">
          <Plus size={18} /> Nuevo Curso
        </button>
      </div>

      {/* Course Cards */}
      <div className="grid grid-cols-3 gap-5">
        {courses.map((c, i) => (
          <div key={i} className="rounded-xl bg-card border border-border p-6 flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <c.icon size={24} />
              </div>
              <span className="rounded-md bg-muted px-2.5 py-1 text-[11px] font-bold tracking-wider text-muted-foreground uppercase">{c.code}</span>
            </div>
            <h3 className="font-bold text-foreground text-lg mb-4">{c.name}</h3>

            <div className="rounded-lg bg-muted/50 border border-border p-3 mb-4 flex-1">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                <BarChart3 size={12} /> Ediciones Activas
              </div>
              {c.editions.map((e, j) => (
                <div key={j} className="flex items-center justify-between py-1.5">
                  <span className="text-sm text-foreground">{e.name}</span>
                  <span className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${modeColors[e.mode] || "bg-muted text-muted-foreground"}`}>{e.mode}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-border">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Precio Base</p>
                <p className="text-xl font-bold text-foreground">${c.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
              </div>
              <button className="h-10 w-10 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Featured course */}
      <div className="rounded-xl bg-card border border-border overflow-hidden flex">
        <div className="w-[380px] bg-gradient-to-br from-sidebar to-sidebar-accent flex items-end p-6 relative shrink-0">
          <span className="absolute top-4 left-4 rounded-md bg-primary px-3 py-1 text-xs font-bold text-primary-foreground uppercase">Destacado</span>
        </div>
        <div className="flex-1 p-8">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold uppercase tracking-wider text-primary">Catálogo 2026</p>
            <span className="rounded-md bg-muted px-2.5 py-1 text-[11px] font-bold tracking-wider text-muted-foreground">CYBER8</span>
          </div>
          <h3 className="text-2xl font-bold text-foreground">Cybersecurity Architecture & Defense</h3>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">Programa avanzado enfocado en la infraestructura crítica y respuesta ante incidentes en entornos corporativos de alta demanda.</p>
          <div className="flex gap-3 mt-4">
            <span className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs text-foreground"><Clock size={14} /> 120 Horas Lectivas</span>
            <span className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs text-foreground"><Shield size={14} /> Certificación Internacional</span>
          </div>
          <div className="flex items-end justify-between mt-6">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Matrícula General</p>
              <p className="text-3xl font-bold text-primary">$3,450.00</p>
            </div>
            <button className="btn-secondary"><Settings size={16} /> Gestionar Programa</button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-4">
        <p className="text-sm text-muted-foreground">Visualizando 4 programas académicos activos.</p>
        <div className="flex items-center justify-center gap-3 mt-2">
          <button className="text-sm text-primary font-semibold flex items-center gap-1"><Download size={14} /> Exportar Reporte</button>
          <span className="text-muted-foreground">•</span>
          <button className="text-sm text-primary font-semibold flex items-center gap-1"><Settings size={14} /> Configuración de Precios</button>
        </div>
      </div>

      <EditionPricingForm open={showForm} onClose={() => setShowForm(false)} onSubmit={() => setShowForm(false)} />
    </div>
  );
};


export default CoursesView;
