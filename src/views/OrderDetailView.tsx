import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Edit, Ban, CreditCard, Plus, Pencil, User, CalendarDays, ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PaymentForm from "@/components/PaymentForm";

const ordersData: Record<string, any> = {
  "ORD-001": {
    id: "ORD-001", status: "Completada", date: "2024-06-28", paymentType: "Contado",
    prospect: { name: "Carlos Mendoza", email: "carlos@mail.com", phone: "+51 987 654 321" },
    seller: "María López",
    courses: [
      { name: "Data Science Avanzado", edition: "Edición Julio 2024", price: 1250, discount: 0 },
    ],
    discount: 0, discountCode: "",
  },
  "ORD-002": {
    id: "ORD-002", status: "Pendiente", date: "2024-06-25", paymentType: "Cuotas",
    prospect: { name: "Ana García", email: "ana.garcia@mail.com", phone: "+51 912 345 678" },
    seller: "Carlos Rivera",
    courses: [
      { name: "UI/UX Bootcamp", edition: "Edición Agosto 2024", price: 1200, discount: 0 },
      { name: "Marketing Estratégico", edition: "Edición Sept 2024", price: 890, discount: 100 },
    ],
    discount: 290, discountCode: "PROMO2024",
  },
  "ORD-003": {
    id: "ORD-003", status: "Completada", date: "2024-06-22", paymentType: "Contado",
    prospect: { name: "Luis Torres", email: "ltorres@mail.com", phone: "+51 945 678 901" },
    seller: "Ana Martínez",
    courses: [
      { name: "Liderazgo y Equipos", edition: "Edición Julio 2024", price: 450, discount: 0 },
    ],
    discount: 0, discountCode: "",
  },
};

const statusStyles: Record<string, string> = {
  Completada: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Pendiente: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Procesando: "bg-blue-100 text-blue-700 border-blue-200",
  Cancelada: "bg-red-100 text-red-700 border-red-200",
};

const OrderDetailView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showPayment, setShowPayment] = useState(false);

  const order = ordersData[id || ""] || ordersData["ORD-001"];
  const subtotal = order.courses.reduce((s: number, c: any) => s + c.price, 0);
  const total = subtotal - order.discount;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/ordenes")}>
          <ArrowLeft size={20} />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-foreground">Orden #{order.id}</h1>
            <Badge className={statusStyles[order.status]}>{order.status}</Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">Creada el {order.date} • Tipo de pago: {order.paymentType}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm"><Edit size={16} className="mr-1" /> Editar Orden</Button>
          <Button variant="destructive" size="sm"><Ban size={16} className="mr-1" /> Anular Orden</Button>
          <Button size="sm" onClick={() => setShowPayment(true)}><CreditCard size={16} className="mr-1" /> Registrar Pago</Button>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <User size={16} className="text-primary" />
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Prospecto</p>
            </div>
            <p className="font-semibold text-foreground">{order.prospect.name}</p>
            <p className="text-sm text-muted-foreground mt-1">{order.prospect.email}</p>
            <p className="text-sm text-muted-foreground">{order.prospect.phone}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <ShoppingCart size={16} className="text-primary" />
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Vendedor</p>
            </div>
            <p className="font-semibold text-foreground">{order.seller}</p>
            <p className="text-sm text-muted-foreground mt-1">Ejecutivo de ventas</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <CalendarDays size={16} className="text-primary" />
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Fechas</p>
            </div>
            <p className="text-sm text-foreground"><span className="text-muted-foreground">Creación:</span> {order.date}</p>
            <p className="text-sm text-foreground mt-1"><span className="text-muted-foreground">Tipo:</span> {order.paymentType}</p>
            {order.discountCode && (
              <p className="text-sm text-foreground mt-1"><span className="text-muted-foreground">Código:</span> {order.discountCode}</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Courses Table */}
      <Card>
        <CardHeader className="flex-row items-center justify-between pb-4">
          <CardTitle className="text-lg">Cursos de la Orden</CardTitle>
          <Button variant="outline" size="sm"><Plus size={14} className="mr-1" /> Agregar Curso a la Orden</Button>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Curso</th>
                <th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Edición</th>
                <th className="px-6 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Precio</th>
                <th className="px-6 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Descuento</th>
                <th className="px-6 py-3 text-center text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {order.courses.map((c: any, i: number) => (
                <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">{c.name}</td>
                  <td className="px-6 py-4 text-muted-foreground">{c.edition}</td>
                  <td className="px-6 py-4 text-right font-semibold text-foreground">S/ {c.price.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right text-muted-foreground">- S/ {c.discount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-center">
                    <Button variant="ghost" size="icon" className="h-8 w-8"><Pencil size={14} /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Financial Summary */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center justify-between w-72">
              <span className="text-sm text-muted-foreground">Subtotal</span>
              <span className="text-sm font-semibold text-foreground">S/ {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between w-72">
              <span className="text-sm text-muted-foreground">Descuento</span>
              <span className="text-sm font-semibold text-destructive">- S/ {order.discount.toLocaleString()}</span>
            </div>
            <div className="border-t border-border w-72 pt-2 flex items-center justify-between">
              <span className="font-bold text-foreground">Total a Cobrar</span>
              <span className="text-xl font-bold text-foreground">S/ {total.toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <PaymentForm open={showPayment} onClose={() => setShowPayment(false)} onSubmit={() => setShowPayment(false)} />
    </div>
  );
};

export default OrderDetailView;
