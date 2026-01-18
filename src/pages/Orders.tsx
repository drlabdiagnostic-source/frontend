import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Calendar, 
  MapPin, 
  Clock, 
  ChevronRight, 
  Package,
  CheckCircle2,
  XCircle,
  Truck,
  FlaskConical
} from "lucide-react";

const mockOrders = [
  {
    id: "ORD-2024-001",
    testName: "Complete Blood Count (CBC)",
    partner: "PathCare Labs",
    date: "2024-01-15",
    time: "9:00 AM - 10:00 AM",
    address: "123, Main Street, Mumbai",
    status: "completed",
    amount: 399,
  },
  {
    id: "ORD-2024-002",
    testName: "Thyroid Profile",
    partner: "HealthFirst Diagnostics",
    date: "2024-01-18",
    time: "10:00 AM - 11:00 AM",
    address: "456, Park Avenue, Mumbai",
    status: "sample_collected",
    amount: 599,
  },
  {
    id: "ORD-2024-003",
    testName: "Lipid Profile",
    partner: "MediScan Labs",
    date: "2024-01-20",
    time: "8:00 AM - 9:00 AM",
    address: "789, Lake Road, Mumbai",
    status: "scheduled",
    amount: 499,
  },
  {
    id: "ORD-2024-004",
    testName: "Vitamin D Test",
    partner: "PathCare Labs",
    date: "2024-01-10",
    time: "11:00 AM - 12:00 PM",
    address: "123, Main Street, Mumbai",
    status: "cancelled",
    amount: 799,
  },
];

const statusConfig = {
  scheduled: {
    label: "Scheduled",
    color: "bg-blue-500/10 text-blue-600",
    icon: Calendar,
  },
  sample_collected: {
    label: "Sample Collected",
    color: "bg-amber-500/10 text-amber-600",
    icon: FlaskConical,
  },
  processing: {
    label: "Processing",
    color: "bg-purple-500/10 text-purple-600",
    icon: Truck,
  },
  completed: {
    label: "Completed",
    color: "bg-green-500/10 text-green-600",
    icon: CheckCircle2,
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-red-500/10 text-red-600",
    icon: XCircle,
  },
};

export default function Orders() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch = order.testName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    return matchesSearch && order.status === activeTab;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 md:pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">My Orders</h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Track and manage your test bookings
            </p>
          </div>

          {/* Search & Filters */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by test name or order ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full max-w-2xl grid grid-cols-3 md:grid-cols-5 mb-6">
              <TabsTrigger value="all" className="text-xs md:text-sm">All</TabsTrigger>
              <TabsTrigger value="scheduled" className="text-xs md:text-sm">Scheduled</TabsTrigger>
              <TabsTrigger value="sample_collected" className="text-xs md:text-sm hidden md:block">In Progress</TabsTrigger>
              <TabsTrigger value="completed" className="text-xs md:text-sm">Completed</TabsTrigger>
              <TabsTrigger value="cancelled" className="text-xs md:text-sm hidden md:block">Cancelled</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-0">
              {filteredOrders.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <Package className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No orders found</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {searchQuery ? "Try a different search term" : "You haven't placed any orders yet"}
                    </p>
                    <Link to="/tests">
                      <Button>Browse Tests</Button>
                    </Link>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {filteredOrders.map((order) => {
                    const status = statusConfig[order.status as keyof typeof statusConfig];
                    const StatusIcon = status.icon;
                    
                    return (
                      <Card key={order.id} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4 md:p-6">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex flex-wrap items-center gap-2 mb-2">
                                <span className="text-xs text-muted-foreground font-mono">{order.id}</span>
                                <Badge className={status.color}>
                                  <StatusIcon className="w-3 h-3 mr-1" />
                                  {status.label}
                                </Badge>
                              </div>
                              
                              <h3 className="font-semibold text-base md:text-lg mb-1">{order.testName}</h3>
                              <p className="text-sm text-muted-foreground mb-3">{order.partner}</p>
                              
                              <div className="flex flex-wrap gap-4 text-xs md:text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-3.5 h-3.5" />
                                  <span>{order.date}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3.5 h-3.5" />
                                  <span>{order.time}</span>
                                </div>
                                <div className="flex items-center gap-1 hidden md:flex">
                                  <MapPin className="w-3.5 h-3.5" />
                                  <span className="truncate max-w-[200px]">{order.address}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start gap-2">
                              <p className="font-bold text-lg">₹{order.amount}</p>
                              <Link to={`/reports`}>
                                <Button variant="outline" size="sm" className="gap-1">
                                  View Details
                                  <ChevronRight className="w-4 h-4" />
                                </Button>
                              </Link>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
