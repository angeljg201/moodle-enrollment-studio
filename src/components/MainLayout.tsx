import { Outlet, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  CreditCard,
  Megaphone,
  GraduationCap,
  Settings,
  LogOut,
  Search,
  Bell,
  HelpCircle,
} from "lucide-react";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/prospectos", label: "Prospectos", icon: Users },
  { to: "/ordenes", label: "Órdenes de Venta", icon: FileText },
  { to: "/pagos", label: "Pagos", icon: CreditCard },
  { to: "/campanas", label: "Campañas", icon: Megaphone },
  { to: "/cursos", label: "Cursos", icon: GraduationCap },
];

const MainLayout = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar */}
      <aside className="flex w-[220px] flex-col bg-sidebar text-sidebar-foreground shrink-0">
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
            M
          </div>
          <div>
            <p className="text-sm font-bold text-sidebar-accent-foreground">Moodle Manager</p>
            <p className="text-[10px] uppercase tracking-widest text-sidebar-foreground/60">Enrollment Suite</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col gap-0.5 px-3 mt-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground border-l-[3px] border-primary -ml-[3px] pl-[calc(0.75rem+3px)]"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
                }`
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom */}
        <div className="border-t border-sidebar-border px-3 py-3 space-y-0.5">
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-sidebar-foreground hover:bg-sidebar-accent/60 transition-colors">
            <Settings size={18} />
            Ajustes
          </button>
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-sidebar-foreground hover:bg-sidebar-accent/60 transition-colors">
            <LogOut size={18} />
            Cerrar Sesión
          </button>
        </div>

        {/* User */}
        <div className="flex items-center gap-3 border-t border-sidebar-border px-4 py-4">
          <div className="h-9 w-9 rounded-full bg-sidebar-accent flex items-center justify-center text-xs font-semibold text-sidebar-accent-foreground">
            ER
          </div>
          <div>
            <p className="text-sm font-medium text-sidebar-accent-foreground">Elena Rodríguez</p>
            <p className="text-[10px] uppercase tracking-wider text-sidebar-foreground/60">SALES_REP</p>
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
              placeholder="Buscar prospectos..."
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
              <span className="text-xs text-muted-foreground">Rol: SALES_REP</span>
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
