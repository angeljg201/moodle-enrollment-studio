import { useState, useMemo } from "react";
import { Trash2, Plus } from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const prospects = [
  { id: "L001", name: "Carlos Mendoza" },
  { id: "L002", name: "Ana García" },
  { id: "L003", name: "Luis Torres" },
  { id: "L004", name: "Rosa Díaz" },
  { id: "L005", name: "Jorge Paredes" },
  { id: "L006", name: "Elena Vargas" },
];

const courses = [
  { id: "C001", name: "Data Science Avanzado", price: 1250 },
  { id: "C002", name: "Marketing Estratégico", price: 890 },
  { id: "C003", name: "Liderazgo y Equipos", price: 450 },
  { id: "C004", name: "Ciberseguridad Avanzada", price: 1800 },
  { id: "C005", name: "UI/UX Bootcamp", price: 1500 },
];

interface OrderLine {
  courseId: string;
  price: number;
}

interface NewOrderModalProps {
  open: boolean;
  onClose: () => void;
}

const NewOrderModal = ({ open, onClose }: NewOrderModalProps) => {
  const [leadId, setLeadId] = useState("");
  const [lines, setLines] = useState<OrderLine[]>([{ courseId: "", price: 0 }]);
  const [discountCode, setDiscountCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);

  const subtotal = useMemo(() => lines.reduce((s, l) => s + l.price, 0), [lines]);
  const total = Math.max(0, subtotal - discountAmount);

  const handleCourseChange = (index: number, courseId: string) => {
    const course = courses.find((c) => c.id === courseId);
    setLines((prev) =>
      prev.map((l, i) => (i === index ? { courseId, price: course?.price ?? 0 } : l))
    );
  };

  const addLine = () => setLines((prev) => [...prev, { courseId: "", price: 0 }]);

  const removeLine = (index: number) => {
    if (lines.length <= 1) return;
    setLines((prev) => prev.filter((_, i) => i !== index));
  };

  const resetAndClose = () => {
    setLeadId("");
    setLines([{ courseId: "", price: 0 }]);
    setDiscountCode("");
    setDiscountAmount(0);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && resetAndClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">Nueva Orden de Venta</DialogTitle>
          <DialogDescription>Selecciona el cliente, agrega productos y aplica descuentos.</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-2">
          {/* 1. Cliente */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Cliente (Prospecto)
            </Label>
            <Select value={leadId} onValueChange={setLeadId}>
              <SelectTrigger>
                <SelectValue placeholder="Buscar y seleccionar cliente..." />
              </SelectTrigger>
              <SelectContent>
                {prospects.map((p) => (
                  <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 2. Productos */}
          <div className="space-y-3">
            <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Detalle de Productos
            </Label>
            <div className="space-y-2">
              {lines.map((line, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex-1">
                    <Select value={line.courseId} onValueChange={(v) => handleCourseChange(i, v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Seleccionar curso..." />
                      </SelectTrigger>
                      <SelectContent>
                        {courses.map((c) => (
                          <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Input
                    className="w-32 text-right font-semibold"
                    value={line.price ? `S/ ${line.price.toLocaleString("es-PE", { minimumFractionDigits: 2 })}` : "S/ 0.00"}
                    readOnly
                    disabled
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive/80 shrink-0"
                    onClick={() => removeLine(i)}
                    disabled={lines.length <= 1}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              ))}
            </div>
            <Button type="button" variant="outline" size="sm" className="text-primary" onClick={addLine}>
              <Plus size={14} /> Agregar otro producto
            </Button>
          </div>

          {/* 3. Descuentos */}
          <div className="space-y-2">
            <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Descuentos
            </Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Código de Descuento</Label>
                <Input
                  placeholder="Ej: BUNDLE2024"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Descuento (S/)</Label>
                <Input
                  type="number"
                  min={0}
                  placeholder="0.00"
                  value={discountAmount || ""}
                  onChange={(e) => setDiscountAmount(Number(e.target.value))}
                />
              </div>
            </div>
          </div>

          {/* 4. Resumen */}
          <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-foreground">S/ {subtotal.toLocaleString("es-PE", { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-primary">Descuento</span>
              <span className="text-primary">- S/ {discountAmount.toLocaleString("es-PE", { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="border-t border-border pt-2 flex justify-between items-baseline">
              <span className="text-sm font-medium text-foreground">Total a Cobrar</span>
              <span className="text-xl font-bold text-primary">S/ {total.toLocaleString("es-PE", { minimumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={resetAndClose}>Cancelar</Button>
          <Button onClick={resetAndClose}>Crear Orden</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewOrderModal;
