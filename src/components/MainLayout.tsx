import { Outlet, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Kanban,
  FileText,
  Package,
  CreditCard,
  CalendarCheck,
  AlertTriangle,
  Megaphone,
  Target,
  Settings,
  LogOut,
  Search,
  Bell,
  HelpCircle,
  DollarSign,
  BarChart3,
} from "lucide-react";

const sidebarSections = [
  {
    title: "ADMINISTRACIÓN",
    items: [
      { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    ],
  },
  {
    title: "VENTAS",
    items: [
      { to: "/prospectos", label: "Prospectos", icon: Users },
      { to: "/pipeline", label: "Pipeline", icon: Kanban },
      { to: "/ordenes", label: "Órdenes", icon: FileText },
      { to: "/productos", label: "Productos", icon: Package },
    ],
  },
  {
    title: "FINANZAS",
    items: [
      { to: "/finanzas", label: "Dashboard", icon: DollarSign },
      { to: "/pagos", label: "Pagos", icon: CreditCard },
      { to: "/planes-pago", label: "Planes de Pago", icon: CalendarCheck },
      { to: "/morosos", label: "Morosos", icon: AlertTriangle },
    ],
  },
  {
    title: "MARKETING",
    items: [
      { to: "/marketing", label: "Dashboard", icon: BarChart3 },
      { to: "/campanas", label: "Campañas", icon: Megaphone },
      { to: "/origen-leads", label: "Origen de Leads", icon: Target },
    ],
  },
];

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium transition-colors ${
    isActive
      ? "bg-sidebar-accent text-sidebar-accent-foreground"
      : "text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
  }`;

const MainLayout = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar */}
      <aside className="flex w-[230px] flex-col bg-sidebar text-sidebar-foreground shrink-0">
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
            M
          </div>
          <div>
            <p className="text-sm font-bold text-sidebar-accent-foreground">Moodle Manager</p>
            <p className="text-[10px] uppercase tracking-widest text-sidebar-foreground/60">Enrollment Suite</p>
          </div>
        </div>

        {/* Navigation sections */}
        <nav className="flex-1 overflow-y-auto px-3 pb-4 space-y-5">
          {sidebarSections.map((section) => (
            <div key={section.title}>
              <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-[0.15em] text-sidebar-foreground/40">
                {section.title}
              </p>
              <div className="space-y-0.5">
                {section.items.map((item) => (
                  <NavLink key={item.to} to={item.to} className={navLinkClass}>
                    <item.icon size={16} />
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom */}
        <div className="border-t border-sidebar-border px-3 py-3 space-y-0.5">
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[13px] text-sidebar-foreground hover:bg-sidebar-accent/60 transition-colors">
            <Settings size={16} /> Ajustes
          </button>
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[13px] text-sidebar-foreground hover:bg-sidebar-accent/60 transition-colors">
            <LogOut size={16} /> Cerrar Sesión
          </button>
        </div>

        {/* User */}
        <div className="flex items-center gap-3 border-t border-sidebar-border px-4 py-4">
          <div className="h-9 w-9 rounded-full bg-sidebar-accent flex items-center justify-center text-xs font-semibold text-sidebar-accent-foreground">
            AD
          </div>
          <div>
            <p className="text-sm font-medium text-sidebar-accent-foreground">Admin Principal</p>
            <p className="text-[10px] uppercase tracking-wider text-sidebar-foreground/60">ADMIN</p>
          </div>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Topbar */}
        <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6 shrink-0">
          <div className="flex items-center gap-2 bg-muted rounded-lg px-4 py-2 w-[400px]">
            <Search size={16} className="text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar prospectos, órdenes, pagos..."
              className="bg-transparent text-sm outline-none w-full placeholder:text-muted-foreground"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="relative text-muted-foreground hover:text-foreground transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-destructive" />
            </button>
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <HelpCircle size={20} />
            </button>
            <div className="flex items-center gap-2 pl-2 border-l border-border">
              <span className="text-xs text-muted-foreground">Rol: ADMIN</span>
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                <Users size={14} className="text-muted-foreground" />
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-background p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
