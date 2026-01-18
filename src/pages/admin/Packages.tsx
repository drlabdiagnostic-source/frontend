import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { getPackages, addPackage, updatePackage, deletePackage, getTests, Package } from "@/lib/adminData";
import { Plus, Pencil, Trash2, Search, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminPackages() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [availableTests, setAvailableTests] = useState<{ id: string; name: string }[]>([]);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);
  const { toast } = useToast();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 0,
    originalPrice: 0,
    discount: 0,
    tests: [] as string[],
    testCount: 0,
    icon: "Heart",
    popular: false,
    status: "active" as const,
  });

  useEffect(() => {
    setPackages(getPackages());
    setAvailableTests(getTests().map(t => ({ id: t.id, name: t.name })));
  }, []);

  const resetForm = () => {
    setForm({
      name: "", description: "", price: 0, originalPrice: 0, discount: 0,
      tests: [], testCount: 0, icon: "Heart", popular: false, status: "active",
    });
    setEditingPackage(null);
  };

  const calculateDiscount = (price: number, originalPrice: number) => {
    if (originalPrice > 0) {
      return Math.round((1 - price / originalPrice) * 100);
    }
    return 0;
  };

  const handleSubmit = () => {
    if (!form.name || !form.price) {
      toast({ title: "Error", description: "Please fill required fields", variant: "destructive" });
      return;
    }

    const packageData = {
      ...form,
      discount: calculateDiscount(form.price, form.originalPrice),
      testCount: form.tests.length,
    };

    if (editingPackage) {
      updatePackage(editingPackage.id, packageData);
      toast({ title: "Package updated successfully" });
    } else {
      addPackage(packageData);
      toast({ title: "Package added successfully" });
    }

    setPackages(getPackages());
    setDialogOpen(false);
    resetForm();
  };

  const handleEdit = (pkg: Package) => {
    setEditingPackage(pkg);
    setForm({
      name: pkg.name,
      description: pkg.description,
      price: pkg.price,
      originalPrice: pkg.originalPrice,
      discount: pkg.discount,
      tests: pkg.tests,
      testCount: pkg.testCount,
      icon: pkg.icon,
      popular: pkg.popular,
      status: pkg.status as "active" | "inactive",
    });
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this package?")) {
      deletePackage(id);
      setPackages(getPackages());
      toast({ title: "Package deleted" });
    }
  };

  const toggleTest = (testId: string) => {
    setForm({
      ...form,
      tests: form.tests.includes(testId)
        ? form.tests.filter(t => t !== testId)
        : [...form.tests, testId],
    });
  };

  const filteredPackages = packages.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout title="Packages">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>Manage Packages</CardTitle>
          <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button><Plus className="w-4 h-4 mr-2" /> Add Package</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingPackage ? "Edit Package" : "Add New Package"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <Label>Package Name *</Label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Price (₹) *</Label>
                    <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: parseInt(e.target.value) || 0 })} />
                  </div>
                  <div>
                    <Label>Original Price (₹)</Label>
                    <Input type="number" value={form.originalPrice} onChange={(e) => setForm({ ...form, originalPrice: parseInt(e.target.value) || 0 })} />
                  </div>
                  <div>
                    <Label>Discount</Label>
                    <Input disabled value={`${calculateDiscount(form.price, form.originalPrice)}%`} />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="popular"
                    checked={form.popular}
                    onCheckedChange={(checked) => setForm({ ...form, popular: !!checked })}
                  />
                  <Label htmlFor="popular" className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    Mark as Popular
                  </Label>
                </div>
                <div>
                  <Label>Select Tests</Label>
                  <div className="border rounded-lg max-h-60 overflow-y-auto mt-2">
                    {availableTests.map((test) => (
                      <div key={test.id} className="flex items-center gap-3 p-3 border-b last:border-0 hover:bg-muted/50">
                        <Checkbox
                          id={test.id}
                          checked={form.tests.includes(test.id)}
                          onCheckedChange={() => toggleTest(test.id)}
                        />
                        <Label htmlFor={test.id} className="flex-1 cursor-pointer">{test.name}</Label>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{form.tests.length} tests selected</p>
                </div>
                <Button onClick={handleSubmit} className="w-full">
                  {editingPackage ? "Update Package" : "Add Package"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search packages..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Package Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Tests</TableHead>
                  <TableHead>Popular</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPackages.map((pkg) => (
                  <TableRow key={pkg.id}>
                    <TableCell className="font-medium">{pkg.name}</TableCell>
                    <TableCell>
                      <div>
                        <span className="font-semibold">₹{pkg.price}</span>
                        <span className="text-sm text-muted-foreground line-through ml-2">₹{pkg.originalPrice}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-green-500">{pkg.discount}% off</span>
                    </TableCell>
                    <TableCell>{pkg.testCount} tests</TableCell>
                    <TableCell>
                      {pkg.popular && <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />}
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        pkg.status === "active" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                      }`}>
                        {pkg.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(pkg)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(pkg.id)}>
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
