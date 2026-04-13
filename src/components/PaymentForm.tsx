import { useState, useRef, DragEvent } from "react";
import { Users, ChevronDown, DollarSign, Info, Upload, FileImage, X } from "lucide-react";
import ModalWrapper from "./ModalWrapper";

interface PaymentData {
  clienteOrden: string;
  metodoPago: string;
  tipoPago: string;
  numeroCuotas: string;
  monto: string;
  idTransaccion: string;
}

interface PaymentFormProps {
  open: boolean;
  onClose: () => void;
  initialData?: PaymentData;
  onSubmit: (data: PaymentData) => void;
}

const emptyData: PaymentData = {
  clienteOrden: "", metodoPago: "", tipoPago: "total",
  numeroCuotas: "", monto: "0.00", idTransaccion: "",
};

const PaymentForm = ({ open, onClose, initialData, onSubmit }: PaymentFormProps) => {
  const isEdit = !!initialData;
  const [form, setForm] = useState<PaymentData>(initialData || emptyData);
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const set = (key: keyof PaymentData, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleFile = (f: File) => {
    const valid = ["image/png", "image/jpeg", "application/pdf"];
    if (valid.includes(f.type) && f.size <= 5 * 1024 * 1024) setFile(f);
  };

  const onDrop = (e: DragEvent) => { e.preventDefault(); setIsDragging(false); if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); };

  const handleSubmit = () => {
    onSubmit(form);
    onClose();
    if (!isEdit) { setForm(emptyData); setFile(null); }
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
      {/* Cliente */}
      <div className="mb-5">
        <label className="form-label">Buscar Orden o Cliente</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"><Users size={16} /></span>
          <input className="form-input pl-10" placeholder="Ej: Mariana Velásquez o MOOD-9921" value={form.clienteOrden} onChange={(e) => set("clienteOrden", e.target.value)} />
        </div>
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

      {/* Cuotas */}
      <div className="mb-5">
        <label className="form-label">Número de Cuotas</label>
        <div className="grid grid-cols-2 gap-4">
          <input className="form-input" placeholder="Ej: 3" value={form.numeroCuotas} onChange={(e) => set("numeroCuotas", e.target.value)} />
          <p className="flex items-center text-xs text-muted-foreground">Se generarán comprobantes mensuales automáticos.</p>
        </div>
      </div>

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
