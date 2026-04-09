import { useState } from "react";
import { Contact, ChevronDown } from "lucide-react";
import ModalWrapper from "./ModalWrapper";

interface ProspectData {
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  dni: string;
  email: string;
  celular: string;
  genero: string;
  profesion: string;
}

interface ProspectFormProps {
  open: boolean;
  onClose: () => void;
  initialData?: ProspectData;
  onSubmit: (data: ProspectData) => void;
}

const emptyData: ProspectData = {
  nombres: "", apellidoPaterno: "", apellidoMaterno: "", dni: "",
  email: "", celular: "", genero: "", profesion: "",
};

const ProspectForm = ({ open, onClose, initialData, onSubmit }: ProspectFormProps) => {
  const isEdit = !!initialData;
  const [form, setForm] = useState<ProspectData>(initialData || emptyData);

  const set = (key: keyof ProspectData, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = () => {
    onSubmit(form);
    onClose();
    if (!isEdit) setForm(emptyData);
  };

  return (
    <ModalWrapper
      open={open}
      onClose={onClose}
      title={isEdit ? "Editar Prospecto" : "Nuevo Prospecto"}
      subtitle="Registra la información del nuevo interesado en el ecosistema Moodle."
      footer={
        <>
          <button className="btn-secondary" onClick={onClose}>Cancelar</button>
          <button className="btn-primary" onClick={handleSubmit}>{isEdit ? "Actualizar" : "Guardar Prospecto"}</button>
        </>
      }
    >
      {/* Datos Personales */}
      <div className="mb-8">
        <div className="section-title mb-5">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Contact size={16} className="text-primary" />
          </div>
          Datos Personales
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="form-label">Nombres</label>
            <input className="form-input" placeholder="Ej: Ricardo Javier" value={form.nombres} onChange={(e) => set("nombres", e.target.value)} />
          </div>
          <div>
            <label className="form-label">Apellido Paterno</label>
            <input className="form-input" placeholder="Ej: Mendoza" value={form.apellidoPaterno} onChange={(e) => set("apellidoPaterno", e.target.value)} />
          </div>
          <div>
            <label className="form-label">Apellido Materno</label>
            <input className="form-input" placeholder="Ej: Salazar" value={form.apellidoMaterno} onChange={(e) => set("apellidoMaterno", e.target.value)} />
          </div>
          <div>
            <label className="form-label">DNI</label>
            <input className="form-input" placeholder="8 dígitos" maxLength={8} value={form.dni} onChange={(e) => set("dni", e.target.value)} />
          </div>
        </div>
      </div>

      {/* Contacto */}
      <div className="mb-8">
        <div className="section-title mb-5">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Contact size={16} className="text-primary" />
          </div>
          Contacto
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="form-label">Email Principal</label>
            <div className="relative">
              <input className="form-input pl-10" placeholder="nombre@ejemplo.com" value={form.email} onChange={(e) => set("email", e.target.value)} />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">✉</span>
            </div>
          </div>
          <div>
            <label className="form-label">Celular</label>
            <div className="relative">
              <input className="form-input pl-10" placeholder="+51 900 000 000" value={form.celular} onChange={(e) => set("celular", e.target.value)} />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">📱</span>
            </div>
          </div>
        </div>
      </div>

      {/* Clasificación */}
      <div>
        <div className="section-title mb-5">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Contact size={16} className="text-primary" />
          </div>
          Clasificación
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="form-label">Género</label>
            <div className="relative">
              <select className="form-select pr-10" value={form.genero} onChange={(e) => set("genero", e.target.value)}>
                <option value="">Seleccionar género</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
                <option value="otro">Otro</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="form-label">Profesión</label>
            <div className="relative">
              <select className="form-select pr-10" value={form.profesion} onChange={(e) => set("profesion", e.target.value)}>
                <option value="">Seleccionar profesión</option>
                <option value="ingeniero">Ingeniero</option>
                <option value="abogado">Abogado</option>
                <option value="medico">Médico</option>
                <option value="contador">Contador</option>
                <option value="otro">Otro</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ProspectForm;
