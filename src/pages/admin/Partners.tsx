import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getPartners, addPartner, updatePartner, deletePartner, Partner } from "@/lib/adminData";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminPartners() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const { toast } = useToast();

  const [form, setForm] = useState({
    name: "",
    logo: "🏥",
    tests: 0,
    locations: "",
    discount: "",
    email: "",
    phone: "",
    status: "active" as const,
  });

  useEffect(() => {
    setPartners(getPartners());
  }, []);

  const resetForm = () => {
    setForm({ name: "", logo: "🏥", tests: 0, locations: "", discount: "", email: "", phone: "", status: "active" });
    setEditingPartner(null);
  };

  const handleSubmit = () => {
    if (!form.name || !form.email) {
      toast({ title: "Error", description: "Please fill required fields", variant: "destructive" });
      return;
    }

    if (editingPartner) {
      updatePartner(editingPartner.id, form);
      toast({ title: "Partner updated successfully" });
    } else {
      addPartner(form);
      toast({ title: "Partner added successfully" });
    }

    setPartners(getPartners());
    setDialogOpen(false);
    resetForm();
  };

  const handleEdit = (partner: Partner) => {
    setEditingPartner(partner);
    setForm({
      name: partner.name,
      logo: partner.logo,
      tests: partner.tests,
      locations: partner.locations,
      discount: partner.discount,
      email: partner.email,
      phone: partner.phone,
      status: partner.status as "active" | "inactive",
    });
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this partner?")) {
      deletePartner(id);
      setPartners(getPartners());
      toast({ title: "Partner deleted" });
    }
  };

  const filteredPartners = partners.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout title="Partners">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>Manage Partners</CardTitle>
          <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button><Plus className="w-4 h-4 mr-2" /> Add Partner</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{editingPartner ? "Edit Partner" : "Add New Partner"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Label>Partner Name *</Label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Logo Emoji</Label>
                    <Input value={form.logo} onChange={(e) => setForm({ ...form, logo: e.target.value })} />
                  </div>
                  <div>
                    <Label>Tests Count</Label>
                    <Input type="number" value={form.tests} onChange={(e) => setForm({ ...form, tests: parseInt(e.target.value) || 0 })} />
                  </div>
                </div>
                <div>
                  <Label>Locations</Label>
                  <Input value={form.locations} onChange={(e) => setForm({ ...form, locations: e.target.value })} placeholder="e.g., 50+ Cities" />
                </div>
                <div>
                  <Label>Discount</Label>
                  <Input value={form.discount} onChange={(e) => setForm({ ...form, discount: e.target.value })} placeholder="e.g., Up to 40%" />
                </div>
                <div>
                  <Label>Email *</Label>
                  <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
                <Button onClick={handleSubmit} className="w-full">
                  {editingPartner ? "Update Partner" : "Add Partner"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search partners..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Partner</TableHead>
                  <TableHead>Tests</TableHead>
                  <TableHead>Locations</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPartners.map((partner) => (
                  <TableRow key={partner.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{partner.logo}</span>
                        <span className="font-medium">{partner.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{partner.tests}+</TableCell>
                    <TableCell>{partner.locations}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>{partner.email}</p>
                        <p className="text-muted-foreground">{partner.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        partner.status === "active" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                      }`}>
                        {partner.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(partner)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(partner.id)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
