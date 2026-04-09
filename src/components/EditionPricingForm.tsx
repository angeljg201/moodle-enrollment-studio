import { useState } from "react";
import { GraduationCap, Globe, Building, Users, ChevronDown, DollarSign, Info } from "lucide-react";
import ModalWrapper from "./ModalWrapper";

interface EditionData {
  curso: string;
  fechaInicio: string;
  fechaFin: string;
  modalidad: string;
  precioContado: string;
  precioCuotas: string;
  precioDescuento: string;
}

interface EditionPricingFormProps {
  open: boolean;
  onClose: () => void;
  initialData?: EditionData;
  onSubmit: (data: EditionData) => void;
}

const emptyData: EditionData = {
  curso: "", fechaInicio: "", fechaFin: "", modalidad: "online",
  precioContado: "0.00", precioCuotas: "0.00", precioDescuento: "0.00",
};

const modalidades = [
  { value: "online", label: "Online", icon: Globe },
  { value: "presencial", label: "Presencial", icon: Building },
  { value: "hibrido", label: "Híbrido", icon: Users },
];

const EditionPricingForm = ({ open, onClose, initialData, onSubmit }: EditionPricingFormProps) => {
  const isEdit = !!initialData;
  const [form, setForm] = useState<EditionData>(initialData || emptyData);

  const set = (key: keyof EditionData, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = () => {
    onSubmit(form);
    onClose();
    if (!isEdit) setForm(emptyData);
  };

  return (
    <ModalWrapper
      open={open}
      onClose={onClose}
      title={isEdit ? "Editar Edición y Precio" : "Nueva Edición y Precio"}
      subtitle="Configura los parámetros académicos y comerciales de la nueva cohorte."
      footer={
        <>
          <button className="btn-secondary" onClick={onClose}>Cancelar</button>
          <button className="btn-primary" onClick={handleSubmit}>{isEdit ? "Actualizar" : "Crear Edición"}</button>
        </>
      }
    >
      {/* Detalles Académicos */}
      <div className="mb-8">
        <div className="section-title mb-5">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <GraduationCap size={16} className="text-primary" />
          </div>
          DETALLES ACADÉMICOS
        </div>

        <div className="mb-4">
          <label className="form-label">Curso</label>
          <div className="relative">
            <select className="form-select pr-10" value={form.curso} onChange={(e) => set("curso", e.target.value)}>
              <option value="">Selecciona un programa académico...</option>
              <option value="data-science">Data Science Fundamentals</option>
              <option value="excel">Advanced Excel for Finance</option>
              <option value="project-mgmt">Strategic Project Management</option>
              <option value="cybersecurity">Cybersecurity Architecture</option>
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <label className="form-label">Fecha de Inicio</label>
            <input type="date" className="form-input" value={form.fechaInicio} onChange={(e) => set("fechaInicio", e.target.value)} />
          </div>
          <div>
            <label className="form-label">Fecha de Fin</label>
            <input type="date" className="form-input" value={form.fechaFin} onChange={(e) => set("fechaFin", e.target.value)} />
          </div>
        </div>

        <div>
          <label className="form-label">Modalidad</label>
          <div className="grid grid-cols-3 gap-3 mt-1.5">
            {modalidades.map((m) => {
              const Icon = m.icon;
              return (
                <button
                  key={m.value}
                  onClick={() => set("modalidad", m.value)}
                  className={`flex items-center justify-center gap-2 py-3.5 rounded-lg text-sm font-medium transition-all ${
                    form.modalidad === m.value
                      ? "bg-primary/10 border-2 border-primary text-primary"
                      : "bg-muted border-2 border-transparent text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  <Icon size={16} />
                  {m.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Precios */}
      <div>
        <div className="section-title mb-5">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <DollarSign size={16} className="text-primary" />
          </div>
          CONFIGURACIÓN DE PRODUCTO (PRECIOS)
        </div>

        <div className="grid grid-cols-3 gap-4 mb-4">
          {[
            { key: "precioContado" as const, label: "Precio al Contado" },
            { key: "precioCuotas" as const, label: "Precio en Cuotas" },
            { key: "precioDescuento" as const, label: "Precio con Descuento" },
          ].map((p) => (
            <div key={p.key}>
              <label className="form-label">{p.label}</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                <input className="form-input pl-7" placeholder="0.00" value={form[p.key]} onChange={(e) => set(p.key, e.target.value)} />
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-start gap-2.5 p-4 bg-muted rounded-lg text-sm text-muted-foreground">
          <Info size={16} className="text-primary mt-0.5 shrink-0" />
          <p>Los precios configurados aquí se aplicarán automáticamente a todos los formularios de inscripción y facturas generadas para esta edición. Puedes ajustarlos individualmente por alumno más adelante.</p>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default EditionPricingForm;
