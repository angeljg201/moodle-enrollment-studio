import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, MoreVertical, User, Mail, Phone } from "lucide-react";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  course: string;
  value: number;
  daysInStage: number;
}

const pipelineColumns = [
  { id: "NEW", label: "Nuevo", color: "bg-blue-500" },
  { id: "CONTACTED", label: "Contactado", color: "bg-yellow-500" },
  { id: "QUALIFIED", label: "Calificado", color: "bg-purple-500" },
  { id: "NEGOTIATION", label: "Negociación", color: "bg-orange-500" },
  { id: "WON", label: "Ganado", color: "bg-emerald-500" },
  { id: "LOST", label: "Perdido", color: "bg-red-500" },
];

const initialLeads: Record<string, Lead[]> = {
  NEW: [
    { id: "L001", name: "Carlos Mendoza", email: "cmendoza@mail.com", phone: "987654321", course: "Data Science", value: 1250, daysInStage: 1 },
    { id: "L002", name: "María López", email: "mlopez@mail.com", phone: "912345678", course: "Marketing Digital", value: 890, daysInStage: 3 },
    { id: "L003", name: "Pedro Ruiz", email: "pruiz@mail.com", phone: "945678123", course: "Python Avanzado", value: 650, daysInStage: 0 },
  ],
  CONTACTED: [
    { id: "L004", name: "Ana García", email: "agarcia@mail.com", phone: "956789012", course: "UI/UX Bootcamp", value: 1800, daysInStage: 5 },
    { id: "L005", name: "Luis Torres", email: "ltorres@mail.com", phone: "967890123", course: "Liderazgo", value: 450, daysInStage: 2 },
  ],
  QUALIFIED: [
    { id: "L006", name: "Rosa Díaz", email: "rdiaz@mail.com", phone: "978901234", course: "Ciberseguridad", value: 2100, daysInStage: 4 },
    { id: "L007", name: "Jorge Paredes", email: "jparedes@mail.com", phone: "989012345", course: "Data Science", value: 1250, daysInStage: 7 },
  ],
  NEGOTIATION: [
    { id: "L008", name: "Elena Vargas", email: "evargas@mail.com", phone: "990123456", course: "Marketing Digital", value: 890, daysInStage: 3 },
  ],
  WON: [
    { id: "L009", name: "Roberto Sánchez", email: "rsanchez@mail.com", phone: "901234567", course: "Data Science", value: 1250, daysInStage: 0 },
    { id: "L010", name: "Lucía Herrera", email: "lherrera@mail.com", phone: "912345670", course: "Liderazgo", value: 450, daysInStage: 1 },
  ],
  LOST: [
    { id: "L011", name: "Fernando Castro", email: "fcastro@mail.com", phone: "923456701", course: "Python Avanzado", value: 650, daysInStage: 10 },
  ],
};

const PipelineView = () => {
  const navigate = useNavigate();
  const [leads] = useState(initialLeads);
  const [draggedLead, setDraggedLead] = useState<{ lead: Lead; fromCol: string } | null>(null);

  const totalValue = Object.values(leads).flat().reduce((sum, l) => sum + l.value, 0);

  const handleDragStart = (lead: Lead, fromCol: string) => {
    setDraggedLead({ lead, fromCol });
  };

  const handleDrop = (toCol: string) => {
    if (!draggedLead || draggedLead.fromCol === toCol) {
      setDraggedLead(null);
      return;
    }
    setDraggedLead(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Pipeline de Ventas</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {Object.values(leads).flat().length} leads activos • Valor total: S/ {totalValue.toLocaleString()}
          </p>
        </div>
        <button className="btn-primary"><Plus size={18} /> Nuevo Lead</button>
      </div>

      {/* Kanban */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {pipelineColumns.map((col) => {
          const colLeads = leads[col.id] || [];
          const colValue = colLeads.reduce((s, l) => s + l.value, 0);
          return (
            <div
              key={col.id}
              className="flex-shrink-0 w-[260px] rounded-xl bg-muted/50 border border-border"
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(col.id)}
            >
              {/* Column header */}
              <div className="flex items-center justify-between p-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <div className={`h-2.5 w-2.5 rounded-full ${col.color}`} />
                  <span className="text-sm font-bold text-foreground">{col.label}</span>
                  <span className="bg-muted rounded-full px-2 py-0.5 text-[10px] font-bold text-muted-foreground">{colLeads.length}</span>
                </div>
                <span className="text-xs font-semibold text-muted-foreground">S/ {colValue.toLocaleString()}</span>
              </div>

              {/* Cards */}
              <div className="p-3 space-y-3 min-h-[200px]">
                {colLeads.map((lead) => (
                  <div
                    key={lead.id}
                    draggable
                    onDragStart={() => handleDragStart(lead, col.id)}
                    className="rounded-lg bg-card border border-border p-4 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <User size={14} className="text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{lead.name}</p>
                          <p className="text-[10px] text-muted-foreground">{lead.id}</p>
                        </div>
                      </div>
                      <button className="text-muted-foreground hover:text-foreground">
                        <MoreVertical size={14} />
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{lead.course}</p>
                    <div className="flex items-center gap-3 text-[10px] text-muted-foreground mb-3">
                      <span className="flex items-center gap-1"><Mail size={10} /> {lead.email}</span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <span className="text-sm font-bold text-primary">S/ {lead.value.toLocaleString()}</span>
                      <span className="text-[10px] text-muted-foreground">{lead.daysInStage}d en etapa</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PipelineView;
