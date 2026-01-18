import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Download, 
  Eye, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Search,
  Filter,
  Calendar,
  MapPin,
  Truck,
  FlaskConical,
  FileCheck2,
  Share2
} from "lucide-react";

const mockBookings = [
  {
    id: "BK001",
    testName: "Complete Blood Count (CBC)",
    date: "2024-01-15",
    time: "9:00 AM - 10:00 AM",
    status: "completed",
    reportStatus: "ready",
    partner: "HealthPlus Labs",
    price: 399,
    collectorName: "Rajesh Kumar",
    collectorPhone: "+91 98765 43210",
  },
  {
    id: "BK002",
    testName: "Lipid Profile",
    date: "2024-01-14",
    time: "8:00 AM - 9:00 AM",
    status: "processing",
    reportStatus: "processing",
    partner: "MedLife Diagnostics",
    price: 499,
    collectorName: "Amit Singh",
    collectorPhone: "+91 98765 43211",
  },
  {
    id: "BK003",
    testName: "Thyroid Panel",
    date: "2024-01-16",
    time: "10:00 AM - 11:00 AM",
    status: "sample_collected",
    reportStatus: "pending",
    partner: "Apollo Diagnostics",
    price: 599,
    collectorName: "Priya Sharma",
    collectorPhone: "+91 98765 43212",
  },
  {
    id: "BK004",
    testName: "Vitamin Profile",
    date: "2024-01-17",
    time: "7:00 AM - 8:00 AM",
    status: "scheduled",
    reportStatus: "pending",
    partner: "Dr. Lal PathLabs",
    price: 1299,
    collectorName: "Vikram Patel",
    collectorPhone: "+91 98765 43213",
  },
];

const statusConfig = {
  scheduled: { label: "Scheduled", color: "bg-blue-500", icon: Calendar },
  collector_assigned: { label: "Collector Assigned", color: "bg-purple-500", icon: Truck },
  sample_collected: { label: "Sample Collected", color: "bg-orange-500", icon: FlaskConical },
  processing: { label: "Processing", color: "bg-yellow-500", icon: Clock },
  completed: { label: "Completed", color: "bg-success", icon: CheckCircle2 },
};

const reportStatusConfig = {
  pending: { label: "Pending", color: "text-muted-foreground", bgColor: "bg-muted" },
  processing: { label: "Processing", color: "text-warning", bgColor: "bg-warning/10" },
  ready: { label: "Ready", color: "text-success", bgColor: "bg-success/10" },
};

const Reports = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);

  const filteredBookings = mockBookings.filter(
    (booking) =>
      booking.testName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedBookingData = mockBookings.find((b) => b.id === selectedBooking);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              My <span className="text-gradient">Reports & Bookings</span>
            </h1>
            <p className="text-muted-foreground">
              Track your bookings and download your reports
            </p>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by test name or booking ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-12 pr-4 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <Button variant="outline" className="h-12">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Bookings List */}
            <div className="lg:col-span-2 space-y-4">
              {filteredBookings.length === 0 ? (
                <div className="text-center py-16 bg-card rounded-2xl border border-border">
                  <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No bookings found</h3>
                  <p className="text-muted-foreground mb-4">You haven't made any bookings yet</p>
                  <Link to="/tests">
                    <Button>Book a Test</Button>
                  </Link>
                </div>
              ) : (
                filteredBookings.map((booking, index) => {
                  const StatusIcon = statusConfig[booking.status as keyof typeof statusConfig]?.icon || Clock;
                  const reportConfig = reportStatusConfig[booking.reportStatus as keyof typeof reportStatusConfig];
                  
                  return (
                    <div
                      key={booking.id}
                      className={`bg-card rounded-2xl p-6 border transition-all duration-300 animate-fade-in cursor-pointer ${
                        selectedBooking === booking.id 
                          ? "border-primary shadow-glow" 
                          : "border-border hover:border-primary/20"
                      }`}
                      style={{ animationDelay: `${index * 0.05}s` }}
                      onClick={() => setSelectedBooking(booking.id)}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-medium text-muted-foreground">#{booking.id}</span>
                            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${reportConfig.bgColor} ${reportConfig.color}`}>
                              Report: {reportConfig.label}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold">{booking.testName}</h3>
                          <p className="text-sm text-muted-foreground">{booking.partner}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-primary">₹{booking.price}</p>
                        </div>
                      </div>

                      {/* Status Timeline */}
                      <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
                        {Object.entries(statusConfig).map(([key, config], i) => {
                          const isActive = Object.keys(statusConfig).indexOf(booking.status) >= i;
                          const Icon = config.icon;
                          return (
                            <div key={key} className="flex items-center gap-2 flex-shrink-0">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                isActive ? config.color : "bg-muted"
                              }`}>
                                <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-muted-foreground"}`} />
                              </div>
                              {i < Object.keys(statusConfig).length - 1 && (
                                <div className={`w-8 h-0.5 ${isActive ? "bg-primary" : "bg-muted"}`} />
                              )}
                            </div>
                          );
                        })}
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {booking.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {booking.time}
                        </span>
                      </div>

                      {/* Actions */}
                      {booking.reportStatus === "ready" && (
                        <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                          <Button size="sm" className="flex-1">
                            <Download className="w-4 h-4 mr-2" />
                            Download Report
                          </Button>
                          <Button size="sm" variant="outline">
                            <Share2 className="w-4 h-4 mr-2" />
                            Share
                          </Button>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Booking Details Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl p-6 border border-border sticky top-28">
                {selectedBookingData ? (
                  <>
                    <h3 className="font-bold mb-4">Booking Details</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Booking ID</p>
                        <p className="font-semibold">#{selectedBookingData.id}</p>
                      </div>
                      
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Test Name</p>
                        <p className="font-semibold">{selectedBookingData.testName}</p>
                      </div>
                      
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Partner Lab</p>
                        <p className="font-semibold">{selectedBookingData.partner}</p>
                      </div>
                      
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Scheduled Date & Time</p>
                        <p className="font-semibold">{selectedBookingData.date}</p>
                        <p className="text-sm text-primary">{selectedBookingData.time}</p>
                      </div>

                      <div className="p-4 rounded-xl bg-muted/50">
                        <p className="text-xs text-muted-foreground mb-2">Sample Collector</p>
                        <p className="font-semibold">{selectedBookingData.collectorName}</p>
                        <p className="text-sm text-primary">{selectedBookingData.collectorPhone}</p>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <span className="text-muted-foreground">Status</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
                          statusConfig[selectedBookingData.status as keyof typeof statusConfig]?.color
                        }`}>
                          {statusConfig[selectedBookingData.status as keyof typeof statusConfig]?.label}
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileCheck2 className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Select a booking to view details</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Reports;