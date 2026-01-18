import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getTests, addTest, updateTest, deleteTest, getPartners, TestWithPricing, TestParameter, PartnerPricing } from "@/lib/adminData";
import { Plus, Pencil, Trash2, Search, IndianRupee } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function AdminTests() {
  const [tests, setTests] = useState<TestWithPricing[]>([]);
  const [partners, setPartners] = useState<{ id: string; name: string }[]>([]);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTest, setEditingTest] = useState<TestWithPricing | null>(null);
  const { toast } = useToast();

  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "blood",
    basePrice: 0,
    reportTime: "",
    fasting: "",
    sampleType: "Blood",
    status: "active" as const,
    parameters: [] as TestParameter[],
    partnerPricing: [] as PartnerPricing[],
  });

  const [newParameter, setNewParameter] = useState({ name: "", unit: "", normalRange: "" });

  useEffect(() => {
    setTests(getTests());
    setPartners(getPartners().map(p => ({ id: p.id, name: p.name })));
  }, []);

  const resetForm = () => {
    setForm({
      name: "", description: "", category: "blood", basePrice: 0, reportTime: "", fasting: "", sampleType: "Blood",
      status: "active", parameters: [], partnerPricing: [],
    });
    setEditingTest(null);
    setNewParameter({ name: "", unit: "", normalRange: "" });
  };

  const addParameter = () => {
    if (newParameter.name) {
      setForm({ ...form, parameters: [...form.parameters, newParameter] });
      setNewParameter({ name: "", unit: "", normalRange: "" });
    }
  };

  const removeParameter = (index: number) => {
    setForm({ ...form, parameters: form.parameters.filter((_, i) => i !== index) });
  };

  const updatePartnerPrice = (partnerId: string, partnerName: string, price: number) => {
    const existing = form.partnerPricing.find(p => p.partnerId === partnerId);
    if (existing) {
      setForm({
        ...form,
        partnerPricing: form.partnerPricing.map(p =>
          p.partnerId === partnerId ? { ...p, price, discount: Math.round((1 - price / form.basePrice) * 100) } : p
        ),
      });
    } else if (price > 0) {
      setForm({
        ...form,
        partnerPricing: [...form.partnerPricing, {
          partnerId, partnerName, price, discount: Math.round((1 - price / form.basePrice) * 100)
        }],
      });
    }
  };

  const handleSubmit = () => {
    if (!form.name || !form.basePrice) {
      toast({ title: "Error", description: "Please fill required fields", variant: "destructive" });
      return;
    }

    if (editingTest) {
      updateTest(editingTest.id, form);
      toast({ title: "Test updated successfully" });
    } else {
      addTest(form);
      toast({ title: "Test added successfully" });
    }

    setTests(getTests());
    setDialogOpen(false);
    resetForm();
  };

  const handleEdit = (test: TestWithPricing) => {
    setEditingTest(test);
    setForm({
      name: test.name,
      description: test.description,
      category: test.category,
      basePrice: test.basePrice,
      reportTime: test.reportTime,
      fasting: test.fasting,
      sampleType: test.sampleType,
      status: test.status as "active" | "inactive",
      parameters: test.parameters,
      partnerPricing: test.partnerPricing,
    });
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this test?")) {
      deleteTest(id);
      setTests(getTests());
      toast({ title: "Test deleted" });
    }
  };

  const filteredTests = tests.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout title="Tests">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle>Manage Tests</CardTitle>
          <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button><Plus className="w-4 h-4 mr-2" /> Add Test</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingTest ? "Edit Test" : "Add New Test"}</DialogTitle>
              </DialogHeader>
              <Tabs defaultValue="basic" className="mt-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="basic">Basic Info</TabsTrigger>
                  <TabsTrigger value="parameters">Parameters</TabsTrigger>
                  <TabsTrigger value="pricing">Partner Pricing</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4 mt-4">
                  <div>
                    <Label>Test Name *</Label>
                    <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Category</Label>
                      <select
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                        className="w-full h-10 px-3 rounded-md border border-input bg-background"
                      >
                        <option value="blood">Blood</option>
                        <option value="heart">Heart</option>
                        <option value="hormone">Hormone</option>
                        <option value="imaging">Imaging</option>
                        <option value="nutrition">Nutrition</option>
                        <option value="bone">Bone</option>
                      </select>
                    </div>
                    <div>
                      <Label>Base Price (₹) *</Label>
                      <Input type="number" value={form.basePrice} onChange={(e) => setForm({ ...form, basePrice: parseInt(e.target.value) || 0 })} />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label>Report Time</Label>
                      <Input value={form.reportTime} onChange={(e) => setForm({ ...form, reportTime: e.target.value })} placeholder="e.g., 24 hours" />
                    </div>
                    <div>
                      <Label>Fasting</Label>
                      <Input value={form.fasting} onChange={(e) => setForm({ ...form, fasting: e.target.value })} placeholder="e.g., Not required" />
                    </div>
                    <div>
                      <Label>Sample Type</Label>
                      <Input value={form.sampleType} onChange={(e) => setForm({ ...form, sampleType: e.target.value })} />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="parameters" className="space-y-4 mt-4">
                  <div className="grid grid-cols-4 gap-2">
                    <Input placeholder="Name" value={newParameter.name} onChange={(e) => setNewParameter({ ...newParameter, name: e.target.value })} />
                    <Input placeholder="Unit" value={newParameter.unit} onChange={(e) => setNewParameter({ ...newParameter, unit: e.target.value })} />
                    <Input placeholder="Normal Range" value={newParameter.normalRange} onChange={(e) => setNewParameter({ ...newParameter, normalRange: e.target.value })} />
                    <Button onClick={addParameter}>Add</Button>
                  </div>
                  <div className="border rounded-lg divide-y">
                    {form.parameters.map((param, index) => (
                      <div key={index} className="flex items-center justify-between p-3">
                        <div>
                          <span className="font-medium">{param.name}</span>
                          <span className="text-muted-foreground ml-2">({param.unit})</span>
                          <span className="text-sm text-muted-foreground ml-2">Range: {param.normalRange}</span>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => removeParameter(index)}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    ))}
                    {form.parameters.length === 0 && (
                      <p className="p-4 text-center text-muted-foreground">No parameters added</p>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="pricing" className="space-y-4 mt-4">
                  <p className="text-sm text-muted-foreground">Set prices for each partner (discounts calculated from base price)</p>
                  <div className="space-y-3">
                    {partners.map((partner) => {
                      const existingPrice = form.partnerPricing.find(p => p.partnerId === partner.id);
                      return (
                        <div key={partner.id} className="flex items-center gap-4 p-3 border rounded-lg">
                          <span className="flex-1 font-medium">{partner.name}</span>
                          <div className="flex items-center gap-2">
                            <IndianRupee className="w-4 h-4 text-muted-foreground" />
                            <Input
                              type="number"
                              className="w-24"
                              placeholder="Price"
                              value={existingPrice?.price || ""}
                              onChange={(e) => updatePartnerPrice(partner.id, partner.name, parseInt(e.target.value) || 0)}
                            />
                          </div>
                          {existingPrice && (
                            <span className="text-sm text-green-500">{existingPrice.discount}% off</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </TabsContent>
              </Tabs>

              <Button onClick={handleSubmit} className="w-full mt-4">
                {editingTest ? "Update Test" : "Add Test"}
              </Button>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search tests..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Test Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Base Price</TableHead>
                  <TableHead>Parameters</TableHead>
                  <TableHead>Partners</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTests.map((test) => (
                  <TableRow key={test.id}>
                    <TableCell className="font-medium">{test.name}</TableCell>
                    <TableCell className="capitalize">{test.category}</TableCell>
                    <TableCell>₹{test.basePrice}</TableCell>
                    <TableCell>{test.parameters.length}</TableCell>
                    <TableCell>{test.partnerPricing.length}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        test.status === "active" ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                      }`}>
                        {test.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(test)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(test.id)}>
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
