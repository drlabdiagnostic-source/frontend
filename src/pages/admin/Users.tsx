import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUsers, addUser, updateUser, deleteUser, AdminUser } from "@/lib/adminData";
import { Plus, Pencil, Trash2, Search, User, Truck, Building2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const roleIcons = {
  patient: User,
  collector: Truck,
  lab: Building2,
};

const roleColors = {
  patient: "bg-blue-500/10 text-blue-500",
  collector: "bg-purple-500/10 text-purple-500",
  lab: "bg-orange-500/10 text-orange-500",
};

export default function AdminUsers() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | "patient" | "collector" | "lab">("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
  const { toast } = useToast();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "patient" as "patient" | "collector" | "lab",
    status: "active" as const,
  });

  useEffect(() => {
    setUsers(getUsers());
  }, []);

  const resetForm = () => {
    setForm({ name: "", email: "", phone: "", role: "patient", status: "active" });
    setEditingUser(null);
  };

  const handleSubmit = () => {
    if (!form.name || !form.email) {
      toast({ title: "Error", description: "Please fill required fields", variant: "destructive" });
      return;
    }

    if (editingUser) {
      updateUser(editingUser.id, form);
      toast({ title: "User updated successfully" });
    } else {
      addUser(form);
      toast({ title: "User added successfully" });
    }

    setUsers(getUsers());
    setDialogOpen(false);
    resetForm();
  };

  const handleEdit = (user: AdminUser) => {
    setEditingUser(user);
    setForm({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      status: user.status as "active" | "inactive",
    });
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      deleteUser(id);
      setUsers(getUsers());
      toast({ title: "User deleted" });
    }
  };

  const toggleStatus = (user: AdminUser) => {
    updateUser(user.id, { status: user.status === "active" ? "inactive" : "active" });
    setUsers(getUsers());
    toast({ title: `User ${user.status === "active" ? "deactivated" : "activated"}` });
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
                          u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const counts = {
    all: users.length,
    patient: users.filter(u => u.role === "patient").length,
    collector: users.filter(u => u.role === "collector").length,
    lab: users.filter(u => u.role === "lab").length,
  };

  return (
    <AdminLayout title="Users">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>Manage Users</CardTitle>
          <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button><Plus className="w-4 h-4 mr-2" /> Add User</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{editingUser ? "Edit User" : "Add New User"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Label>Full Name *</Label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div>
                  <Label>Email *</Label>
                  <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div>
                  <Label>Role</Label>
                  <select
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value as typeof form.role })}
                    className="w-full h-10 px-3 rounded-md border border-input bg-background"
                  >
                    <option value="patient">Patient</option>
                    <option value="collector">Collection Boy</option>
                    <option value="lab">Lab / Diagnostic Center</option>
                  </select>
                </div>
                <Button onClick={handleSubmit} className="w-full">
                  {editingUser ? "Update User" : "Add User"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
            </div>
            <Tabs value={roleFilter} onValueChange={(v) => setRoleFilter(v as typeof roleFilter)}>
              <TabsList>
                <TabsTrigger value="all">All ({counts.all})</TabsTrigger>
                <TabsTrigger value="patient">Patients ({counts.patient})</TabsTrigger>
                <TabsTrigger value="collector">Collectors ({counts.collector})</TabsTrigger>
                <TabsTrigger value="lab">Labs ({counts.lab})</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => {
                  const RoleIcon = roleIcons[user.role];
                  return (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-sm font-semibold text-primary">{user.name.charAt(0)}</span>
                          </div>
                          <span className="font-medium">{user.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p>{user.email}</p>
                          <p className="text-muted-foreground">{user.phone}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs ${roleColors[user.role]}`}>
                          <RoleIcon className="w-3 h-3" />
                          <span className="capitalize">{user.role}</span>
                        </span>
                      </TableCell>
                      <TableCell>
                        <button
                          onClick={() => toggleStatus(user)}
                          className={`px-2 py-1 rounded-full text-xs ${
                            user.status === "active" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                          }`}
                        >
                          {user.status}
                        </button>
                      </TableCell>
                      <TableCell>{user.createdAt}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(user)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(user.id)}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
