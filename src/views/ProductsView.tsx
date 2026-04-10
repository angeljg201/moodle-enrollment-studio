import { useState } from "react";
import { Plus, Search, GraduationCap, Clock, Users, MoreVertical } from "lucide-react";
import EditionPricingForm from "@/components/EditionPricingForm";

const products = [
  { id: "CRS-001", name: "Data Science Avanzado", category: "Tecnología", modality: "Online", hours: 60, editions: 3, enrolled: 145, price: 1250, status: "ACTIVE" },
  { id: "CRS-002", name: "Marketing Estratégico", category: "Negocios", modality: "Híbrida", hours: 45, editions: 2, enrolled: 89, price: 890, status: "ACTIVE" },
  { id: "CRS-003", name: "Liderazgo y Equipos", category: "Soft Skills", modality: "Presencial", hours: 20, editions: 5, enrolled: 210, price: 450, status: "ACTIVE" },
  { id: "CRS-004", name: "Ciberseguridad Avanzada", category: "Tecnología", modality: "Online", hours: 55, editions: 1, enrolled: 42, price: 1800, status: "DRAFT" },
  { id: "CRS-005", name: "Python para Principiantes", category: "Tecnología", modality: "Online", hours: 30, editions: 4, enrolled: 320, price: 650, status: "ACTIVE" },
  { id: "CRS-006", name: "UI/UX Bootcamp", category: "Diseño", modality: "Híbrida", hours: 80, editions: 2, enrolled: 78, price: 2100, status: "ACTIVE" },
];

const ProductsView = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Catálogo de Productos</h1>
          <p className="text-sm text-muted-foreground mt-1">Gestiona cursos, ediciones y precios del ecosistema académico.</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-primary"><Plus size={18} /> Nuevo Producto</button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="rounded-xl bg-card border border-border p-5">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Productos Activos</p>
          <p className="text-2xl font-bold text-foreground mt-2">24</p>
        </div>
        <div className="rounded-xl bg-card border border-border p-5">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Ediciones Abiertas</p>
          <p className="text-2xl font-bold text-foreground mt-2">17</p>
        </div>
        <div className="rounded-xl bg-card border border-border p-5">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Total Inscritos</p>
          <p className="text-2xl font-bold text-foreground mt-2">884</p>
        </div>
        <div className="rounded-xl bg-card border border-border p-5">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Ingreso Promedio</p>
          <p className="text-2xl font-bold text-foreground mt-2">S/ 1,023</p>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl bg-card border border-border overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h2 className="font-bold text-foreground">Todos los Productos</h2>
          <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2 w-[280px]">
            <Search size={14} className="text-muted-foreground" />
            <input className="bg-transparent text-sm outline-none w-full placeholder:text-muted-foreground" placeholder="Buscar producto..." />
          </div>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Producto</th>
              <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Categoría</th>
              <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Modalidad</th>
              <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Ediciones</th>
              <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Inscritos</th>
              <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Precio</th>
              <th className="px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Estado</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center"><GraduationCap size={18} className="text-primary" /></div>
                    <div>
                      <p className="font-semibold text-foreground">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.id} • {p.hours}h</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-foreground">{p.category}</td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center rounded-md bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">{p.modality}</span>
                </td>
                <td className="px-6 py-4 text-foreground">{p.editions}</td>
                <td className="px-6 py-4">
                  <span className="flex items-center gap-1 text-foreground"><Users size={14} className="text-muted-foreground" /> {p.enrolled}</span>
                </td>
                <td className="px-6 py-4 font-semibold text-foreground">S/ {p.price.toLocaleString()}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center rounded-md px-2.5 py-1 text-[11px] font-bold tracking-wide ${
                    p.status === "ACTIVE" ? "bg-emerald-100 text-emerald-700" : "bg-muted text-muted-foreground"
                  }`}>{p.status === "ACTIVE" ? "ACTIVO" : "BORRADOR"}</span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-muted-foreground hover:text-foreground"><MoreVertical size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <EditionPricingForm open={showForm} onClose={() => setShowForm(false)} onSubmit={() => setShowForm(false)} />
    </div>
  );
};

export default ProductsView;
