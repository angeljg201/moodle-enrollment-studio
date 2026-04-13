import { useState } from "react";
import { ArrowLeft, Phone, Mail, MessageCircle, Calendar, User, MapPin, Briefcase, Plus, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const leadData = {
  id: "L001",
  name: "Carlos Mendoza Salazar",
  email: "cmendoza@empresa.com",
  phone: "+51 987 654 321",
  dni: "12345678",
  gender: "Masculino",
  profession: "Ingeniero de Sistemas",
  address: "Av. Javier Prado 1234, San Isidro, Lima",
  stage: "QUALIFIED",
  source: "Facebook Ads",
  campaign: "Summer Enrollment 2024",
  assignedTo: "Elena Rodríguez",
  createdAt: "2024-05-15",
  course: "Data Science Avanzado",
  value: 1250,
};

const timeline = [
  { type: "MEETING", title: "Reunión presencial", desc: "Presentación del programa completo. El prospecto mostró alto interés en la modalidad online.", date: "2024-06-28", time: "10:30", user: "Elena Rodríguez" },
  { type: "EMAIL", title: "Envío de brochure", desc: "Se envió brochure digital con precios y horarios del curso Data Science Avanzado.", date: "2024-06-25", time: "14:15", user: "Elena Rodríguez" },
  { type: "WHATSAPP", title: "Seguimiento WhatsApp", desc: "Mensaje de follow-up después de la consulta inicial. Confirmó interés.", date: "2024-06-22", time: "09:00", user: "Elena Rodríguez" },
  { type: "CALL", title: "Llamada inicial", desc: "Primera llamada de contacto. Se presentó el programa y se agendó reunión.", date: "2024-06-20", time: "16:45", user: "Luis Torres" },
  { type: "WHATSAPP", title: "Primer contacto", desc: "Lead ingresó por campaña de Facebook. Se envió mensaje de bienvenida.", date: "2024-06-18", time: "11:00", user: "Sistema" },
];

const typeIcons: Record<string, { icon: typeof Phone; color: string; bg: string }> = {
  CALL: { icon: Phone, color: "text-blue-600", bg: "bg-blue-100" },
  WHATSAPP: { icon: MessageCircle, color: "text-emerald-600", bg: "bg-emerald-100" },
  EMAIL: { icon: Mail, color: "text-purple-600", bg: "bg-purple-100" },
  MEETING: { icon: Calendar, color: "text-orange-600", bg: "bg-orange-100" },
};

const LeadDetailView = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [newInteraction, setNewInteraction] = useState({ type: "CALL", title: "", desc: "", stageUpdate: "KEEP" });

  return (
    <div className="space-y-6">
      {/* Back */}
      <button onClick={() => navigate("/prospectos")} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft size={16} /> Volver a Prospectos
      </button>

      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-xl font-bold text-primary">
            {leadData.name.split(" ").slice(0, 2).map(n => n[0]).join("")}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">{leadData.name}</h1>
            <p className="text-sm text-muted-foreground">{leadData.id} • {leadData.source} • {leadData.campaign}</p>
            <span className={`mt-1 inline-flex items-center rounded-md px-2.5 py-1 text-[11px] font-bold tracking-wide bg-purple-100 text-purple-700`}>
              {leadData.stage}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-secondary text-xs px-3 py-2"><Phone size={14} /> Llamar</button>
          <button className="btn-secondary text-xs px-3 py-2"><MessageCircle size={14} /> WhatsApp</button>
          <button className="btn-primary text-xs px-3 py-2">Crear Orden</button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-6">
        {/* Left: Profile */}
        <div className="col-span-2 space-y-6">
          <div className="rounded-xl bg-card border border-border p-6">
            <h3 className="font-bold text-foreground mb-4">Información Personal</h3>
            <div className="space-y-4">
              {[
                { icon: User, label: "Nombre completo", value: leadData.name },
                { icon: Mail, label: "Email", value: leadData.email },
                { icon: Phone, label: "Teléfono", value: leadData.phone },
                { icon: User, label: "DNI", value: leadData.dni },
                { icon: User, label: "Género", value: leadData.gender },
                { icon: Briefcase, label: "Profesión", value: leadData.profession },
                { icon: MapPin, label: "Dirección", value: leadData.address },
              ].map((f, i) => (
                <div key={i} className="flex items-start gap-3">
                  <f.icon size={16} className="text-muted-foreground mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{f.label}</p>
                    <p className="text-sm text-foreground">{f.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-card border border-border p-6">
            <h3 className="font-bold text-foreground mb-4">Interés Comercial</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Curso de interés</span>
                <span className="font-medium text-foreground">{leadData.course}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Valor estimado</span>
                <span className="font-bold text-primary">S/ {leadData.value.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Asignado a</span>
                <span className="font-medium text-foreground">{leadData.assignedTo}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Fecha registro</span>
                <span className="font-medium text-foreground">{leadData.createdAt}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Timeline */}
        <div className="col-span-3">
          <div className="rounded-xl bg-card border border-border p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-foreground">Línea de Tiempo</h3>
              <button onClick={() => setShowModal(true)} className="btn-primary text-xs px-3 py-2">
                <Plus size={14} /> Nueva Interacción
              </button>
            </div>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-5 top-0 bottom-0 w-px bg-border" />

              <div className="space-y-6">
                {timeline.map((event, i) => {
                  const typeInfo = typeIcons[event.type];
                  const Icon = typeInfo.icon;
                  return (
                    <div key={i} className="relative flex gap-4 pl-2">
                      <div className={`relative z-10 h-10 w-10 rounded-full ${typeInfo.bg} flex items-center justify-center shrink-0`}>
                        <Icon size={16} className={typeInfo.color} />
                      </div>
                      <div className="flex-1 pb-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="text-sm font-semibold text-foreground">{event.title}</p>
                            <span className={`inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-bold tracking-wide ${typeInfo.bg} ${typeInfo.color}`}>
                              {event.type}
                            </span>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">{event.date}</p>
                            <p className="text-xs text-muted-foreground">{event.time}</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">{event.desc}</p>
                        <p className="text-xs text-muted-foreground mt-1">Por: {event.user}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Interaction Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-container max-w-lg" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-lg font-bold text-foreground">Nueva Interacción</h2>
              <button onClick={() => setShowModal(false)} className="text-muted-foreground hover:text-foreground"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="form-label">Tipo</label>
                <select className="form-select" value={newInteraction.type} onChange={(e) => setNewInteraction(p => ({ ...p, type: e.target.value }))}>
                  <option value="CALL">Llamada</option>
                  <option value="WHATSAPP">WhatsApp</option>
                  <option value="EMAIL">Email</option>
                  <option value="MEETING">Reunión</option>
                </select>
              </div>
              <div>
                <label className="form-label">Título</label>
                <input className="form-input" placeholder="Ej: Seguimiento telefónico" value={newInteraction.title} onChange={(e) => setNewInteraction(p => ({ ...p, title: e.target.value }))} />
              </div>
              <div>
                <label className="form-label">Descripción</label>
                <textarea className="form-input min-h-[100px]" placeholder="Detalle de la interacción..." value={newInteraction.desc} onChange={(e) => setNewInteraction(p => ({ ...p, desc: e.target.value }))} />
              </div>
            </div>
            <div className="flex justify-end gap-3 p-6 border-t border-border">
              <button className="btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
              <button className="btn-primary" onClick={() => setShowModal(false)}>Registrar Interacción</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadDetailView;
