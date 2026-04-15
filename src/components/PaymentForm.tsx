import { useState, useRef, useMemo, DragEvent } from "react";
import { Users, ChevronDown, DollarSign, Info, Upload, FileImage, X, CalendarIcon, Search } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import ModalWrapper from "./ModalWrapper";

interface PaymentData {
  clienteOrden: string;
  metodoPago: string;
  tipoPago: string;
  numeroCuotas: string;
  monto: string;
  idTransaccion: string;
  dueDate?: Date;
}

interface PaymentFormProps {
  open: boolean;
  onClose: () => void;
  initialData?: PaymentData;
  onSubmit: (data: PaymentData) => void;
}

const orders = [
  { id: "#ORD-2931", client: "Jorge Castillo", email: "j.castillo@email.com", total: "1,200.00", txId: "TXN-80A31" },
  { id: "#ORD-2944", client: "Ana Mendoza", email: "a.mendoza@email.com", total: "450.00", txId: "TXN-44B92" },
  { id: "#ORD-2950", client: "Roberto Sánchez", email: "r.sanchez@email.com", total: "2,100.00", txId: "TXN-50C13" },
  { id: "#ORD-2962", client: "Lucía Paredes", email: "l.paredes@email.com", total: "500.00", txId: "TXN-62D74" },
  { id: "#ORD-2978", client: "Carlos Mendoza", email: "c.mendoza@email.com", total: "1,250.00", txId: "TXN-78E55" },
];

const emptyData: PaymentData = {
  clienteOrden: "", metodoPago: "", tipoPago: "total",
  numeroCuotas: "", monto: "0.00", idTransaccion: "",
};

const PaymentForm = ({ open, onClose, initialData, onSubmit }: PaymentFormProps) => {
  const isEdit = !!initialData;
  const [form, setForm] = useState<PaymentData>(initialData || emptyData);
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [dueDate, setDueDate] = useState<Date | undefined>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const set = (key: keyof PaymentData, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  const filteredOrders = useMemo(() => {
    if (!searchQuery) return orders;
    const q = searchQuery.toLowerCase();
    return orders.filter(o => o.id.toLowerCase().includes(q) || o.client.toLowerCase().includes(q));
  }, [searchQuery]);

  const selectedOrder = useMemo(() => orders.find(o => o.id === form.clienteOrden), [form.clienteOrden]);

  const selectOrder = (order: typeof orders[0]) => {
    setForm(prev => ({
      ...prev,
      clienteOrden: order.id,
      monto: order.total,
      idTransaccion: order.txId,
    }));
    setSearchOpen(false);
    setSearchQuery("");
  };

  const handleFile = (f: File) => {
    const valid = ["image/png", "image/jpeg", "application/pdf"];
    if (valid.includes(f.type) && f.size <= 5 * 1024 * 1024) setFile(f);
  };

  const onDrop = (e: DragEvent) => { e.preventDefault(); setIsDragging(false); if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); };

  const handleSubmit = () => {
    onSubmit({ ...form, dueDate });
    onClose();
    if (!isEdit) { setForm(emptyData); setFile(null); setDueDate(undefined); }
  };

  return (
    <ModalWrapper
      open={open}
      onClose={onClose}
      title={isEdit ? "Editar Pago" : "Nuevo Pago"}
      subtitle="Registre el ingreso de fondos para una inscripción activa."
      maxWidth="max-w-lg"
      footer={
        <>
          <button className="btn-secondary" onClick={onClose}>Cancelar</button>
          <button className="btn-primary" onClick={handleSubmit}>{isEdit ? "Actualizar" : "Registrar Pago"}</button>
        </>
      }
    >
      {/* Selector de Orden / Cliente */}
      <div className="mb-5">
        <label className="form-label">Buscar Orden o Cliente</label>
        <div className="relative">
          <div
            onClick={() => setSearchOpen(!searchOpen)}
            className="form-input pl-10 cursor-pointer flex items-center min-h-[40px]"
          >
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"><Search size={16} /></span>
            {selectedOrder ? (
              <div className="flex items-center gap-2">
                <span className="text-primary font-semibold text-sm">{selectedOrder.id}</span>
                <span className="text-foreground text-sm">— {selectedOrder.client}</span>
              </div>
            ) : (
              <span className="text-muted-foreground text-sm">Ej: #ORD-2931 o Mariana Velásquez</span>
            )}
          </div>
          {searchOpen && (
            <div className="absolute z-50 top-full left-0 right-0 mt-1 rounded-lg bg-card border border-border shadow-lg overflow-hidden">
              <div className="p-2 border-b border-border">
                <input
                  autoFocus
                  className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none px-2 py-1.5"
                  placeholder="Buscar por orden o cliente..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="max-h-48 overflow-y-auto">
                {filteredOrders.map((o) => (
                  <button
                    key={o.id}
                    onClick={() => selectOrder(o)}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/50 transition-colors text-left"
                  >
                    <div>
                      <span className="text-primary font-semibold text-sm">{o.id}</span>
                      <p className="text-xs text-foreground">{o.client}</p>
                      <p className="text-[10px] text-muted-foreground">{o.email}</p>
                    </div>
                    <span className="text-sm font-bold text-foreground">S/ {o.total}</span>
                  </button>
                ))}
                {filteredOrders.length === 0 && (
                  <p className="px-4 py-3 text-sm text-muted-foreground text-center">Sin resultados</p>
                )}
              </div>
            </div>
          )}
        </div>
        {selectedOrder && (
          <div className="mt-2 p-3 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users size={14} className="text-primary" />
                <span className="text-sm font-medium text-foreground">{selectedOrder.client}</span>
              </div>
              <span className="text-sm font-bold text-primary">S/ {selectedOrder.total}</span>
            </div>
            <p className="text-[10px] text-muted-foreground mt-1">TX: {selectedOrder.txId} • {selectedOrder.email}</p>
          </div>
        )}
      </div>

      {/* Método de Pago */}
      <div className="mb-5">
        <label className="form-label">Método de Pago</label>
        <div className="relative">
          <select className="form-select pr-10" value={form.metodoPago} onChange={(e) => set("metodoPago", e.target.value)}>
            <option value="">Seleccione una opción</option>
            <option value="yape">Yape</option>
            <option value="transferencia">Transferencia</option>
            <option value="pos">POS</option>
            <option value="efectivo">Efectivo</option>
          </select>
          <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      {/* Tipo de Pago */}
      <div className="mb-5">
        <label className="form-label">Tipo de Pago</label>
        <div className="grid grid-cols-2 gap-3 mt-1.5">
          <button
            onClick={() => set("tipoPago", "total")}
            className={`py-4 rounded-lg text-left px-4 transition-all ${
              form.tipoPago === "total"
                ? "border-2 border-primary bg-primary/5"
                : "border-2 border-transparent bg-muted"
            }`}
          >
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${form.tipoPago === "total" ? "border-primary" : "border-muted-foreground"}`}>
                {form.tipoPago === "total" && <div className="w-2 h-2 rounded-full bg-primary" />}
              </div>
              <span className="font-semibold text-sm text-foreground">Pago Total</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1 ml-6">Un solo desembolso</p>
          </button>
          <button
            onClick={() => set("tipoPago", "cuotas")}
            className={`py-4 rounded-lg text-left px-4 transition-all ${
              form.tipoPago === "cuotas"
                ? "border-2 border-primary bg-primary/5"
                : "border-2 border-transparent bg-muted"
            }`}
          >
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${form.tipoPago === "cuotas" ? "border-primary" : "border-muted-foreground"}`}>
                {form.tipoPago === "cuotas" && <div className="w-2 h-2 rounded-full bg-primary" />}
              </div>
              <span className="font-semibold text-sm text-foreground">Pago en Cuotas</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1 ml-6">Plan de financiamiento</p>
          </button>
        </div>
      </div>

      {/* Cuotas + DatePicker condicional */}
      {form.tipoPago === "cuotas" && (
        <div className="mb-5 space-y-4">
          <div>
            <label className="form-label">Número de Cuotas</label>
            <div className="grid grid-cols-2 gap-4">
              <input className="form-input" placeholder="Ej: 3" value={form.numeroCuotas} onChange={(e) => set("numeroCuotas", e.target.value)} />
              <p className="flex items-center text-xs text-muted-foreground">Se generarán comprobantes mensuales automáticos.</p>
            </div>
          </div>
          <div>
            <label className="form-label">Fecha Límite de Pago (due_date)</label>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className={cn(
                    "form-input flex items-center gap-2 w-full text-left",
                    !dueDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon size={16} className="text-muted-foreground shrink-0" />
                  {dueDate ? format(dueDate, "PPP", { locale: es }) : "Seleccionar fecha límite"}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dueDate}
                  onSelect={setDueDate}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      )}

      {/* Monto + ID */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div>
          <label className="form-label">Monto a Pagar</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm"><DollarSign size={14} /></span>
            <input className="form-input pl-8" placeholder="0.00" value={form.monto} onChange={(e) => set("monto", e.target.value)} />
          </div>
        </div>
        <div>
          <label className="form-label">ID de Transacción</label>
          <input className="form-input" placeholder="Ref. de pago" value={form.idTransaccion} onChange={(e) => set("idTransaccion", e.target.value)} />
        </div>
      </div>

      {/* Comprobante Upload */}
      <div className="mb-5">
        <label className="form-label">Comprobante de Pago (Voucher)</label>
        <input
          ref={fileInputRef}
          type="file"
          accept=".png,.jpg,.jpeg,.pdf"
          className="hidden"
          onChange={(e) => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }}
        />
        {file ? (
          <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-muted/50 px-4 py-3">
            <div className="flex items-center gap-3 min-w-0">
              <FileImage size={20} className="text-primary shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(0)} KB</p>
              </div>
            </div>
            <button onClick={() => { setFile(null); if (fileInputRef.current) fileInputRef.current.value = ""; }} className="p-1 rounded hover:bg-muted text-muted-foreground"><X size={16} /></button>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={onDrop}
            className={`flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed py-8 cursor-pointer transition-colors ${
              isDragging ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"
            }`}
          >
            <Upload size={24} className="text-muted-foreground" />
            <p className="text-sm text-foreground font-medium">Haz clic o arrastra el comprobante de pago (Voucher)</p>
            <p className="text-xs text-muted-foreground">PNG, JPG o PDF. Máx 5MB</p>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex items-start gap-2.5 p-4 bg-muted rounded-lg text-sm text-muted-foreground">
        <Info size={16} className="text-primary mt-0.5 shrink-0" />
        <p>Al confirmar el pago y adjuntar el comprobante, el sistema emitirá automáticamente la factura correspondiente.</p>
      </div>
    </ModalWrapper>
  );
};

export default PaymentForm;
