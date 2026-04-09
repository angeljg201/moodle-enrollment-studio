import { useState } from "react";
import { Search, Users, ShoppingCart, Trash2, Plus, Check, LayoutGrid, SlidersHorizontal } from "lucide-react";

const selectedProspects = [
  { initials: "MA", name: "Miguel Angel", email: "m.angel@example.com" },
  { initials: "LS", name: "Lucía Suárez", email: "lsuarez@corp.com" },
];

const courses = [
  { name: "Data Science Avanzado", desc: "Dominio de Python, R y modelos predictivos para entornos corporativos.", price: 1250, hours: 60 },
  { name: "Marketing Estratégico", desc: "Gestión de campañas omnicanal y análisis de ROI en tiempo real.", price: 890, hours: 45 },
  { name: "Liderazgo y Equipos", desc: "Desarrollo de habilidades directivas y gestión de equipos de alto rendimiento.", price: 450, hours: 20 },
  { name: "Ciberseguridad Avanzada", desc: "Protección de infraestructura crítica y respuesta ante incidentes.", price: 1800, hours: 55 },
];

const cartItems = [
  { name: "Data Science Avanzado", qty: 1, price: 1250 },
  { name: "Liderazgo y Equipos", qty: 1, price: 450 },
];

const OrdersView = () => {
  const [discount] = useState(0);
  const subtotal = cartItems.reduce((s, c) => s + c.price * c.qty, 0);
  const discountAmount = subtotal * (discount / 100);
  const total = subtotal - discountAmount;

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="text-sm text-muted-foreground">
        Ventas &gt; Órdenes &gt; <span className="text-primary font-medium">Nueva Orden</span>
      </div>
      <h1 className="text-2xl font-bold text-foreground">Nueva Orden de Venta</h1>

      <div className="flex gap-6">
        {/* Left */}
        <div className="flex-1 space-y-6">
          {/* Step 1 */}
          <div className="rounded-xl bg-card border border-border p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary"><Users size={20} /></div>
                <h2 className="text-lg font-bold text-foreground">Seleccionar Prospecto</h2>
              </div>
              <span className="rounded-md bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700 uppercase tracking-wider">Paso 1</span>
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-muted px-4 py-2.5 mb-4">
              <Users size={16} className="text-muted-foreground" />
              <input className="bg-transparent text-sm outline-none w-full placeholder:text-muted-foreground" placeholder="Buscar por nombre, correo o ID de prospecto..." />
            </div>
            <div className="flex gap-3">
              {selectedProspects.map((p, i) => (
                <div key={i} className="flex items-center gap-3 rounded-lg border border-border px-4 py-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">{p.initials}</div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Courses */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground">Cursos Disponibles</h2>
              <div className="flex items-center gap-2">
                <button className="h-9 w-9 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:bg-muted"><SlidersHorizontal size={16} /></button>
                <button className="h-9 w-9 rounded-md border border-border flex items-center justify-center text-muted-foreground hover:bg-muted"><LayoutGrid size={16} /></button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {courses.map((c, i) => (
                <div key={i} className="rounded-xl bg-card border border-border overflow-hidden">
                  <div className="relative h-40 bg-gradient-to-br from-sidebar to-sidebar-accent flex items-center justify-center">
                    <span className="absolute top-3 right-3 rounded-md bg-card/80 px-2 py-1 text-xs font-medium text-foreground">{c.hours} Horas</span>
                  </div>
                  <div className="p-4 space-y-2">
                    <h3 className="font-bold text-foreground">{c.name}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{c.desc}</p>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-lg font-bold text-foreground">${c.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                      <button className="btn-primary text-xs px-4 py-2"><Plus size={14} /> Agregar</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="w-[320px] shrink-0">
          <div className="rounded-xl overflow-hidden border border-border sticky top-0">
            <div className="bg-sidebar text-sidebar-accent-foreground p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg">Resumen de Orden</h3>
                  <p className="text-[10px] uppercase tracking-widest text-sidebar-foreground/60 mt-0.5">Enrollment Details</p>
                </div>
                <ShoppingCart size={22} />
              </div>
            </div>
            <div className="bg-card p-5 space-y-4">
              {cartItems.map((item, i) => (
                <div key={i} className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-foreground">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.qty} Unidad • ${item.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
                  </div>
                  <button className="text-destructive hover:text-destructive/80"><Trash2 size={16} /></button>
                </div>
              ))}
              <div className="pt-4">
                <label className="text-xs text-muted-foreground">Código de Descuento</label>
                <input className="form-input mt-1" placeholder="Ej: BUNDLE2024" />
              </div>
              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">${subtotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-primary">Descuento ({discount}%)</span>
                  <span className="text-primary">-${discountAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between items-baseline pt-2">
                  <span className="text-sm font-medium text-foreground">Total a Cobrar</span>
                  <span className="text-xl font-bold text-primary">${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
              <button className="btn-primary w-full justify-center mt-2">
                <Check size={16} /> Procesar Orden
              </button>
              <p className="text-[11px] text-center text-muted-foreground">Al procesar, se generará una factura y se enviará un correo de confirmación al prospecto.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersView;
