import { useState, useEffect, useRef } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getReports, updateReport, Report } from "@/lib/adminData";
import { Search, Upload, FileText, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-500",
  sample_collected: "bg-purple-500/10 text-purple-500",
  processing: "bg-blue-500/10 text-blue-500",
  completed: "bg-green-500/10 text-green-500",
};

export default function AdminReports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    setReports(getReports());
  }, []);

  const handleStatusChange = (reportId: string, newStatus: Report["status"]) => {
    updateReport(reportId, { status: newStatus });
    setReports(getReports());
    toast({ title: "Report status updated" });
  };

  const handleUploadReport = () => {
    if (selectedReport && fileInputRef.current?.files?.[0]) {
      // In a real app, this would upload to a server
      // For demo, we'll just mark it as completed with a fake URL
      const fileName = fileInputRef.current.files[0].name;
      updateReport(selectedReport.id, {
        reportUrl: `/reports/${fileName}`,
        status: "completed",
      });
      setReports(getReports());
      setUploadDialogOpen(false);
      toast({ title: "Report uploaded successfully" });
    }
  };

  const filteredReports = reports.filter(r => {
    const matchesSearch = r.id.toLowerCase().includes(search.toLowerCase()) ||
                          r.userName.toLowerCase().includes(search.toLowerCase()) ||
                          r.testName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusOptions: Report["status"][] = ["pending", "sample_collected", "processing", "completed"];

  return (
    <AdminLayout title="Reports">
      <Card>
        <CardHeader>
          <CardTitle>Manage Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search reports..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
            </div>
            <Tabs value={statusFilter} onValueChange={setStatusFilter}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="processing">Processing</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report ID</TableHead>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Test</TableHead>
                  <TableHead>Partner</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-mono text-sm">{report.id}</TableCell>
                    <TableCell className="font-mono text-sm text-muted-foreground">{report.orderId}</TableCell>
                    <TableCell className="font-medium">{report.userName}</TableCell>
                    <TableCell>{report.testName}</TableCell>
                    <TableCell>{report.partnerName}</TableCell>
                    <TableCell>
                      <select
                        value={report.status}
                        onChange={(e) => handleStatusChange(report.id, e.target.value as Report["status"])}
                        className={`px-2 py-1 rounded-full text-xs border-0 cursor-pointer ${statusColors[report.status]}`}
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status} className="bg-background text-foreground">
                            {status.replace("_", " ")}
                          </option>
                        ))}
                      </select>
                    </TableCell>
                    <TableCell>{report.updatedAt}</TableCell>
                    <TableCell className="text-right space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => { setSelectedReport(report); setDialogOpen(true); }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => { setSelectedReport(report); setUploadDialogOpen(true); }}
                      >
                        <Upload className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Report Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Report Details</DialogTitle>
          </DialogHeader>
          {selectedReport && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Report ID</Label>
                  <p className="font-mono">{selectedReport.id}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Order ID</Label>
                  <p className="font-mono">{selectedReport.orderId}</p>
                </div>
              </div>
              <div>
                <Label className="text-muted-foreground">Patient</Label>
                <p className="font-medium">{selectedReport.userName}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Test</Label>
                <p>{selectedReport.testName}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Partner Lab</Label>
                <p>{selectedReport.partnerName}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Status</Label>
                  <p className={`inline-block px-2 py-1 rounded-full text-xs ${statusColors[selectedReport.status]}`}>
                    {selectedReport.status.replace("_", " ")}
                  </p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Collector</Label>
                  <p>{selectedReport.collectorName || "Not assigned"}</p>
                </div>
              </div>
              {selectedReport.reportUrl && (
                <div>
                  <Label className="text-muted-foreground">Report File</Label>
                  <a
                    href={selectedReport.reportUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary hover:underline mt-1"
                  >
                    <FileText className="w-4 h-4" />
                    View Report
                  </a>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Upload Report Dialog */}
      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Report</DialogTitle>
          </DialogHeader>
          {selectedReport && (
            <div className="space-y-4 mt-4">
              <div>
                <p className="text-sm text-muted-foreground">Uploading report for:</p>
                <p className="font-medium">{selectedReport.testName}</p>
                <p className="text-sm">{selectedReport.userName}</p>
              </div>
              <div>
                <Label>Select Report File (PDF)</Label>
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  className="mt-2"
                />
              </div>
              <Button onClick={handleUploadReport} className="w-full">
                <Upload className="w-4 h-4 mr-2" />
                Upload Report
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
