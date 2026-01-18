import { useState, useEffect } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getOrders, updateOrder, getUsers, Order } from "@/lib/adminData";
import { Search, Eye, UserPlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-500",
  confirmed: "bg-blue-500/10 text-blue-500",
  sample_collected: "bg-purple-500/10 text-purple-500",
  processing: "bg-indigo-500/10 text-indigo-500",
  completed: "bg-green-500/10 text-green-500",
  cancelled: "bg-red-500/10 text-red-500",
};

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [collectors, setCollectors] = useState<{ id: string; name: string }[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setOrders(getOrders());
    setCollectors(getUsers().filter(u => u.role === "collector").map(u => ({ id: u.id, name: u.name })));
  }, []);

  const handleStatusChange = (orderId: string, newStatus: Order["status"]) => {
    updateOrder(orderId, { status: newStatus });
    setOrders(getOrders());
    toast({ title: "Order status updated" });
  };

  const handleAssignCollector = (collectorId: string, collectorName: string) => {
    if (selectedOrder) {
      updateOrder(selectedOrder.id, { collectorId, collectorName, status: "confirmed" });
      setOrders(getOrders());
      setAssignDialogOpen(false);
      toast({ title: "Collector assigned successfully" });
    }
  };

  const filteredOrders = orders.filter(o => {
    const matchesSearch = o.id.toLowerCase().includes(search.toLowerCase()) ||
                          o.userName.toLowerCase().includes(search.toLowerCase()) ||
                          o.testName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusOptions: Order["status"][] = ["pending", "confirmed", "sample_collected", "processing", "completed", "cancelled"];

  return (
    <AdminLayout title="Orders">
      <Card>
        <CardHeader>
          <CardTitle>Manage Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search orders..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
            </div>
            <Tabs value={statusFilter} onValueChange={setStatusFilter} className="overflow-x-auto">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
                <TabsTrigger value="sample_collected">Collected</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Test</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Collector</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-mono text-sm">{order.id}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{order.userName}</p>
                        <p className="text-sm text-muted-foreground">{order.userPhone}</p>
                      </div>
                    </TableCell>
                    <TableCell>{order.testName}</TableCell>
                    <TableCell>₹{order.amount}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p>{order.date}</p>
                        <p className="text-muted-foreground">{order.timeSlot}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      {order.collectorName ? (
                        <span className="text-sm">{order.collectorName}</span>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => { setSelectedOrder(order); setAssignDialogOpen(true); }}
                        >
                          <UserPlus className="w-4 h-4 mr-1" />
                          Assign
                        </Button>
                      )}
                    </TableCell>
                    <TableCell>
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value as Order["status"])}
                        className={`px-2 py-1 rounded-full text-xs border-0 cursor-pointer ${statusColors[order.status]}`}
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status} className="bg-background text-foreground">
                            {status.replace("_", " ")}
                          </option>
                        ))}
                      </select>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => { setSelectedOrder(order); setDialogOpen(true); }}>
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Order Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Order ID</Label>
                  <p className="font-mono">{selectedOrder.id}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Status</Label>
                  <p className={`inline-block px-2 py-1 rounded-full text-xs ${statusColors[selectedOrder.status]}`}>
                    {selectedOrder.status.replace("_", " ")}
                  </p>
                </div>
              </div>
              <div>
                <Label className="text-muted-foreground">Customer</Label>
                <p className="font-medium">{selectedOrder.userName}</p>
                <p className="text-sm text-muted-foreground">{selectedOrder.userPhone}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Test</Label>
                <p>{selectedOrder.testName}</p>
                <p className="text-sm text-muted-foreground">{selectedOrder.partnerName}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Address</Label>
                <p className="text-sm">{selectedOrder.address}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Date</Label>
                  <p>{selectedOrder.date}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Time Slot</Label>
                  <p>{selectedOrder.timeSlot}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Amount</Label>
                  <p className="text-xl font-bold">₹{selectedOrder.amount}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Collector</Label>
                  <p>{selectedOrder.collectorName || "Not assigned"}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Assign Collector Dialog */}
      <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Assign Collector</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 mt-4">
            {collectors.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">No collectors available</p>
            ) : (
              collectors.map((collector) => (
                <Button
                  key={collector.id}
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => handleAssignCollector(collector.id, collector.name)}
                >
                  {collector.name}
                </Button>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
