import { useState, useMemo } from "react";
import {
  Users, Plus, Search, MoreVertical, Shield, TrendingUp,
  UserCheck, Mail, Phone, Edit, Eye, UserX,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type RoleName = "ADMIN" | "SALES_REP" | "MARKETING" | "FINANCE";

interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  cellphone: string;
  is_active: boolean;
  role: { name: RoleName };
}

const users: User[] = [
  { id: "1", first_name: "Carlos", last_name: "Mendoza", email: "carlos.mendoza@empresa.com", cellphone: "+51 987 654 321", is_active: true, role: { name: "ADMIN" } },
  { id: "2", first_name: "Ana", last_name: "García", email: "ana.garcia@empresa.com", cellphone: "+51 912 345 678", is_active: true, role: { name: "SALES_REP" } },
  { id: "3", first_name: "Luis", last_name: "Torres", email: "luis.torres@empresa.com", cellphone: "+51 945 678 123", is_active: true, role: { name: "SALES_REP" } },
  { id: "4", first_name: "María", last_name: "Rodríguez", email: "maria.rodriguez@empresa.com", cellphone: "+51 956 789 234", is_active: false, role: { name: "MARKETING" } },
  { id: "5", first_name: "Pedro", last_name: "Sánchez", email: "pedro.sanchez@empresa.com", cellphone: "+51 923 456 789", is_active: true, role: { name: "FINANCE" } },
  { id: "6", first_name: "Sofía", last_name: "Vargas", email: "sofia.vargas@empresa.com", cellphone: "+51 934 567 890", is_active: true, role: { name: "SALES_REP" } },
  { id: "7", first_name: "Diego", last_name: "Flores", email: "diego.flores@empresa.com", cellphone: "+51 978 901 234", is_active: true, role: { name: "ADMIN" } },
  { id: "8", first_name: "Valentina", last_name: "Huamán", email: "valentina.huaman@empresa.com", cellphone: "+51 967 890 123", is_active: false, role: { name: "SALES_REP" } },
];

const roleConfig: Record<RoleName, { label: string; class: string }> = {
  ADMIN: { label: "Administrador", class: "bg-primary/15 text-primary border-primary/20" },
  SALES_REP: { label: "Vendedor", class: "bg-emerald-500/15 text-emerald-500 border-emerald-500/20" },
  MARKETING: { label: "Marketing", class: "bg-purple-500/15 text-purple-400 border-purple-500/20" },
  FINANCE: { label: "Finanzas", class: "bg-amber-500/15 text-amber-400 border-amber-500/20" },
};

const UsersView = () => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("ALL");

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        `${u.first_name} ${u.last_name} ${u.email}`.toLowerCase().includes(search.toLowerCase());
      const matchesRole = roleFilter === "ALL" || u.role.name === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [search, roleFilter]);

  const totalActive = users.filter((u) => u.is_active).length;
  const totalSalesRep = users.filter((u) => u.role.name === "SALES_REP").length;

  const kpis = [
    { label: "Total de Usuarios", value: users.length, icon: Users, accent: "text-primary" },
    { label: "Usuarios Activos", value: totalActive, icon: UserCheck, accent: "text-emerald-400" },
    { label: "Vendedores", value: totalSalesRep, icon: TrendingUp, accent: "text-amber-400" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Gestión de Usuarios</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Administra los usuarios del sistema, sus roles y permisos de acceso.
          </p>
        </div>
        <Button className="gap-2">
          <Plus size={18} /> Nuevo Usuario
        </Button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {kpis.map((k) => (
          <Card key={k.label} className="border-border">
            <CardContent className="p-5 flex items-center gap-4">
              <div className={`h-11 w-11 rounded-xl bg-muted flex items-center justify-center ${k.accent}`}>
                <k.icon size={20} />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{k.label}</p>
                <p className="text-2xl font-bold text-foreground mt-0.5">{k.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre o email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por Rol" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Todos los Roles</SelectItem>
            <SelectItem value="ADMIN">Administrador</SelectItem>
            <SelectItem value="SALES_REP">Vendedor</SelectItem>
            <SelectItem value="MARKETING">Marketing</SelectItem>
            <SelectItem value="FINANCE">Finanzas</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card className="border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre Completo</TableHead>
              <TableHead>Contacto</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((u) => {
              const rc = roleConfig[u.role.name];
              return (
                <TableRow key={u.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center text-xs font-semibold text-muted-foreground">
                        {u.first_name[0]}{u.last_name[0]}
                      </div>
                      <span className="font-medium text-foreground">{u.first_name} {u.last_name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-0.5">
                      <p className="text-sm text-foreground flex items-center gap-1.5"><Mail size={12} className="text-muted-foreground" />{u.email}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1.5"><Phone size={12} />{u.cellphone}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`text-[10px] font-bold border ${rc.class}`}>
                      {rc.label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`text-[10px] font-bold border ${
                        u.is_active
                          ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/20"
                          : "bg-destructive/15 text-destructive border-destructive/20"
                      }`}
                    >
                      {u.is_active ? "Activo" : "Inactivo"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="gap-2"><Edit size={14} /> Editar Perfil</DropdownMenuItem>
                        {u.role.name === "SALES_REP" && (
                          <DropdownMenuItem className="gap-2"><Eye size={14} /> Ver Rendimiento</DropdownMenuItem>
                        )}
                        <DropdownMenuItem className="gap-2 text-destructive"><UserX size={14} /> Desactivar Usuario</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default UsersView;
