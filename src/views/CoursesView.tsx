import { useState } from "react";
import {
  Plus, BookOpen, Code2, BarChart3, Palette, Brain, Globe,
  Calendar, Users, TrendingUp, Edit, Monitor, MapPin, Laptop,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import EditionPricingForm from "@/components/EditionPricingForm";

type EditionStatus = "OPEN" | "DRAFT" | "COMPLETED";
type Modality = "Online" | "Presencial" | "Híbrida";

interface Edition {
  id: string;
  editionNumber: number;
  code: string;
  startDate: string;
  endDate: string;
  status: EditionStatus;
  modality: Modality;
  enrolled: number;
  capacity: number;
}

interface Course {
  id: string;
  name: string;
  code: string;
  description: string;
  icon: React.ElementType;
  editions: Edition[];
}

const courses: Course[] = [
  {
    id: "1", name: "Python para Data Science", code: "PYTHON",
    description: "Domina Python aplicado al análisis de datos, machine learning y visualización con las librerías más demandadas del mercado.",
    icon: Code2,
    editions: [
      { id: "e1", editionNumber: 1, code: "PYTHON-2026-1", startDate: "2026-02-10", endDate: "2026-04-15", status: "OPEN", modality: "Online", enrolled: 38, capacity: 45 },
      { id: "e2", editionNumber: 2, code: "PYTHON-2026-2", startDate: "2026-05-05", endDate: "2026-07-10", status: "DRAFT", modality: "Híbrida", enrolled: 0, capacity: 30 },
    ],
  },
  {
    id: "2", name: "Marketing Digital Estratégico", code: "MKTDIG",
    description: "Estrategias avanzadas de performance marketing, SEO, paid media y analítica digital para escalar negocios.",
    icon: BarChart3,
    editions: [
      { id: "e3", editionNumber: 1, code: "MKTDIG-2026-1", startDate: "2026-03-01", endDate: "2026-05-30", status: "OPEN", modality: "Online", enrolled: 52, capacity: 60 },
      { id: "e4", editionNumber: 3, code: "MKTDIG-2025-3", startDate: "2025-09-01", endDate: "2025-12-15", status: "COMPLETED", modality: "Presencial", enrolled: 28, capacity: 30 },
    ],
  },
  {
    id: "3", name: "UX/UI Design Bootcamp", code: "UXUI",
    description: "Programa intensivo de diseño de interfaces y experiencia de usuario con Figma, research y design systems.",
    icon: Palette,
    editions: [
      { id: "e5", editionNumber: 1, code: "UXUI-2026-1", startDate: "2026-04-20", endDate: "2026-07-20", status: "OPEN", modality: "Híbrida", enrolled: 22, capacity: 35 },
    ],
  },
  {
    id: "4", name: "Liderazgo y Gestión de Equipos", code: "LEADER",
    description: "Desarrolla habilidades de liderazgo, comunicación efectiva y gestión del cambio en entornos corporativos.",
    icon: Brain,
    editions: [
      { id: "e6", editionNumber: 2, code: "LEADER-2026-2", startDate: "2026-06-01", endDate: "2026-08-15", status: "DRAFT", modality: "Presencial", enrolled: 0, capacity: 25 },
      { id: "e7", editionNumber: 1, code: "LEADER-2026-1", startDate: "2026-01-15", endDate: "2026-03-30", status: "OPEN", modality: "Online", enrolled: 41, capacity: 50 },
    ],
  },
  {
    id: "5", name: "Ciberseguridad Aplicada", code: "CYBER",
    description: "Fundamentos y prácticas avanzadas de seguridad informática, ethical hacking y respuesta ante incidentes.",
    icon: Globe,
    editions: [
      { id: "e8", editionNumber: 1, code: "CYBER-2026-1", startDate: "2026-03-15", endDate: "2026-06-15", status: "OPEN", modality: "Online", enrolled: 19, capacity: 40 },
    ],
  },
  {
    id: "6", name: "Full-Stack JavaScript", code: "FULLJS",
    description: "De cero a producción: React, Node.js, bases de datos y despliegue en la nube con proyectos reales.",
    icon: BookOpen,
    editions: [
      { id: "e9", editionNumber: 1, code: "FULLJS-2026-1", startDate: "2026-05-12", endDate: "2026-08-12", status: "DRAFT", modality: "Online", enrolled: 0, capacity: 50 },
      { id: "e10", editionNumber: 2, code: "FULLJS-2026-2", startDate: "2026-09-01", endDate: "2026-12-01", status: "DRAFT", modality: "Híbrida", enrolled: 0, capacity: 35 },
    ],
  },
];

const statusConfig: Record<EditionStatus, { label: string; class: string }> = {
  OPEN: { label: "Abierta", class: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20" },
  DRAFT: { label: "Borrador", class: "bg-amber-500/15 text-amber-400 border-amber-500/20" },
  COMPLETED: { label: "Finalizada", class: "bg-muted text-muted-foreground border-border" },
};

const modalityIcon: Record<Modality, React.ElementType> = {
  Online: Monitor,
  Presencial: MapPin,
  "Híbrida": Laptop,
};

const totalCourses = courses.length;
const openEditions = courses.flatMap((c) => c.editions).filter((e) => e.status === "OPEN").length;
const upcomingStarts = courses.flatMap((c) => c.editions).filter((e) => new Date(e.startDate) > new Date()).length;
const modalityCounts = courses.flatMap((c) => c.editions).reduce<Record<string, number>>((acc, e) => {
  acc[e.modality] = (acc[e.modality] || 0) + 1;
  return acc;
}, {});
const topModality = Object.entries(modalityCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "—";

const kpis = [
  { label: "Total de Cursos", value: totalCourses, icon: BookOpen, accent: "text-primary" },
  { label: "Ediciones Activas", value: openEditions, icon: TrendingUp, accent: "text-emerald-400" },
  { label: "Próximos Inicios", value: upcomingStarts, icon: Calendar, accent: "text-amber-400" },
  { label: "Modalidad Popular", value: topModality, icon: Users, accent: "text-purple-400" },
];

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("es-PE", { day: "2-digit", month: "short", year: "numeric" });

const CoursesView = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Gestión Académica</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Administra el catálogo de cursos master y controla las ediciones activas del ecosistema formativo.
          </p>
        </div>
        <Button onClick={() => setShowForm(true)} className="gap-2">
          <Plus size={18} /> Nuevo Curso Master
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <Card key={k.label} className="border-border">
            <CardContent className="p-5 flex items-center gap-4">
              <div className={`h-11 w-11 rounded-xl bg-muted flex items-center justify-center ${k.accent}`}>
                <k.icon size={20} />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{k.label}</p>
                <p className="text-2xl font-bold text-foreground mt-0.5">{k.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {courses.map((course) => {
          const Icon = course.icon;
          return (
            <Card key={course.id} className="border-border flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <Icon size={22} />
                    </div>
                    <div>
                      <CardTitle className="text-base leading-tight">{course.name}</CardTitle>
                    </div>
                  </div>
                  <Badge variant="outline" className="font-mono text-[11px] tracking-wider shrink-0">
                    {course.code}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mt-2">{course.description}</p>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col gap-4 pt-0">
                {/* Editions List */}
                <div className="rounded-lg bg-muted/50 border border-border p-3 space-y-0">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                    <Calendar size={12} /> Ediciones ({course.editions.length})
                  </p>
                  {course.editions.map((ed, idx) => {
                    const st = statusConfig[ed.status];
                    const ModalIcon = modalityIcon[ed.modality];
                    return (
                      <div key={ed.id}>
                        {idx > 0 && <Separator className="my-2" />}
                        <div className="flex items-center justify-between gap-2">
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">{ed.code}</p>
                            <p className="text-xs text-muted-foreground">{formatDate(ed.startDate)}</p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="flex items-center gap-1 text-xs text-muted-foreground">
                              <ModalIcon size={12} /> {ed.modality}
                            </span>
                            <Badge variant="outline" className={`text-[10px] font-bold border ${st.class}`}>
                              {st.label}
                            </Badge>
                          </div>
                        </div>
                        {ed.status === "OPEN" && (
                          <div className="mt-1.5">
                            <div className="flex items-center justify-between text-[11px] text-muted-foreground mb-1">
                              <span>Inscritos</span>
                              <span>{ed.enrolled}/{ed.capacity}</span>
                            </div>
                            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                              <div
                                className="h-full rounded-full bg-primary transition-all"
                                style={{ width: `${(ed.enrolled / ed.capacity) * 100}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Footer */}
                <div className="flex items-center gap-2 mt-auto pt-2">
                  <Button variant="outline" className="flex-1 gap-2 text-sm">
                    <Plus size={16} /> Abrir Nueva Edición
                  </Button>
                  <Button variant="outline" size="icon" className="shrink-0">
                    <Edit size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <EditionPricingForm open={showForm} onClose={() => setShowForm(false)} onSubmit={() => setShowForm(false)} />
    </div>
  );
};

export default CoursesView;
