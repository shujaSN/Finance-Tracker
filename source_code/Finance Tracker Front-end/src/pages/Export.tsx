import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  FileText, 
  Calendar, 
  Filter,
  CheckCircle,
  Clock,
  AlertCircle
} from "lucide-react";
import { useFinance } from "@/contexts/FinanceContext";

// Mock data for export history
const exportHistory = [
  { 
    id: 1, 
    filename: "transactions_2024_01.csv", 
    type: "Transactions", 
    dateRange: "Jan 2024", 
    size: "2.4 KB",
    status: "completed",
    createdAt: "2024-01-15 10:30 AM"
  },
  { 
    id: 2, 
    filename: "budgets_report_2024.pdf", 
    type: "Budget Report", 
    dateRange: "2024", 
    size: "156 KB",
    status: "completed",
    createdAt: "2024-01-10 2:15 PM"
  },
  { 
    id: 3, 
    filename: "categories_analysis.xlsx", 
    type: "Categories", 
    dateRange: "Last 6 months", 
    size: "45 KB",
    status: "processing",
    createdAt: "2024-01-08 9:45 AM"
  },
  { 
    id: 4, 
    filename: "financial_summary_2023.pdf", 
    type: "Annual Summary", 
    dateRange: "2023", 
    size: "892 KB",
    status: "failed",
    createdAt: "2024-01-05 4:20 PM"
  },
];

export default function Export() {
  const { exportData } = useFinance();
  const [exportType, setExportType] = useState("");
  const [fileFormat, setFileFormat] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [selectedFields, setSelectedFields] = useState<string[]>([]);

  const availableFields = [
    "Date",
    "Description", 
    "Amount",
    "Category",
    "Account",
    "Type",
    "Notes",
    "Tags"
  ];

  const handleFieldChange = (field: string, checked: boolean) => {
    if (checked) {
      setSelectedFields([...selectedFields, field]);
    } else {
      setSelectedFields(selectedFields.filter(f => f !== field));
    }
  };

  const handleExport = () => {
    if (!exportType || !fileFormat || !dateRange) {
      return;
    }
    
    exportData(exportType, fileFormat, dateRange);
  };

  const handleQuickExport = (type: string, format: string, range: string) => {
    exportData(type, format, range);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-financial-success" />;
      case "processing":
        return <Clock className="h-4 w-4 text-financial-warning" />;
      case "failed":
        return <AlertCircle className="h-4 w-4 text-financial-danger" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-financial-success/10 text-financial-success border-financial-success/20">Completed</Badge>;
      case "processing":
        return <Badge className="bg-financial-warning/10 text-financial-warning border-financial-warning/20">Processing</Badge>;
      case "failed":
        return <Badge className="bg-financial-danger/10 text-financial-danger border-financial-danger/20">Failed</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Export Data</h1>
          <p className="text-muted-foreground">Download your financial data in various formats</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Export Configuration */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5" />
                Create New Export
              </CardTitle>
              <CardDescription>Configure your data export settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Export Type */}
              <div className="space-y-2">
                <Label>Data Type</Label>
                <Select value={exportType} onValueChange={setExportType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select data to export" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="transactions">Transactions</SelectItem>
                    <SelectItem value="budgets">Budgets</SelectItem>
                    <SelectItem value="categories">Categories</SelectItem>
                    <SelectItem value="accounts">Accounts</SelectItem>
                    <SelectItem value="all">All Data</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* File Format */}
              <div className="space-y-2">
                <Label>File Format</Label>
                <Select value={fileFormat} onValueChange={setFileFormat}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select file format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="csv">CSV (.csv)</SelectItem>
                    <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                    <SelectItem value="pdf">PDF Report (.pdf)</SelectItem>
                    <SelectItem value="json">JSON (.json)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Date Range */}
              <div className="space-y-2">
                <Label>Date Range</Label>
                <Select value={dateRange} onValueChange={setDateRange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select date range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="current-month">Current Month</SelectItem>
                    <SelectItem value="last-month">Last Month</SelectItem>
                    <SelectItem value="last-3-months">Last 3 Months</SelectItem>
                    <SelectItem value="last-6-months">Last 6 Months</SelectItem>
                    <SelectItem value="current-year">Current Year</SelectItem>
                    <SelectItem value="last-year">Last Year</SelectItem>
                    <SelectItem value="all-time">All Time</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Field Selection */}
              <div className="space-y-3">
                <Label>Include Fields</Label>
                <div className="grid grid-cols-2 gap-3">
                  {availableFields.map((field) => (
                    <div key={field} className="flex items-center space-x-2">
                      <Checkbox
                        id={field}
                        checked={selectedFields.includes(field)}
                        onCheckedChange={(checked) => handleFieldChange(field, !!checked)}
                      />
                      <Label htmlFor={field} className="text-sm">{field}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Export Button */}
              <div className="flex gap-3">
                <Button 
                  className="bg-gradient-financial-primary shadow-financial flex-1"
                  disabled={!exportType || !fileFormat || !dateRange}
                  onClick={handleExport}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Generate Export
                </Button>
                <Button variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Export
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Export Options */}
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle>Quick Exports</CardTitle>
              <CardDescription>Common export formats ready to download</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-auto p-4 flex flex-col items-start gap-2" onClick={() => handleQuickExport("transactions", "csv", "current-month")}>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span className="font-medium">Current Month Transactions</span>
                  </div>
                  <span className="text-sm text-muted-foreground">CSV format with all fields</span>
                </Button>

                <Button variant="outline" className="h-auto p-4 flex flex-col items-start gap-2" onClick={() => handleQuickExport("budgets", "pdf", "current-year")}>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span className="font-medium">Budget Report</span>
                  </div>
                  <span className="text-sm text-muted-foreground">PDF with charts and analysis</span>
                </Button>

                <Button variant="outline" className="h-auto p-4 flex flex-col items-start gap-2" onClick={() => handleQuickExport("categories", "excel", "last-6-months")}>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span className="font-medium">Category Analysis</span>
                  </div>
                  <span className="text-sm text-muted-foreground">Excel with pivot tables</span>
                </Button>

                <Button variant="outline" className="h-auto p-4 flex flex-col items-start gap-2" onClick={() => handleQuickExport("all", "pdf", "current-year")}>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span className="font-medium">Annual Summary</span>
                  </div>
                  <span className="text-sm text-muted-foreground">Complete year overview</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Export History */}
        <div className="space-y-6">
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle>Export History</CardTitle>
              <CardDescription>Your recent downloads</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {exportHistory.map((export_item) => (
                  <div key={export_item.id} className="p-4 rounded-lg bg-muted/30 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <p className="font-medium text-sm">{export_item.filename}</p>
                        <p className="text-xs text-muted-foreground">{export_item.type}</p>
                      </div>
                      {getStatusIcon(export_item.status)}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Range:</span>
                        <span>{export_item.dateRange}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Size:</span>
                        <span>{export_item.size}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Created:</span>
                        <span>{export_item.createdAt}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      {getStatusBadge(export_item.status)}
                      {export_item.status === "completed" && (
                        <Button size="sm" variant="outline">
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                      )}
                      {export_item.status === "failed" && (
                        <Button size="sm" variant="outline">
                          Retry
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Export Tips */}
          <Card className="bg-gradient-card shadow-card border-primary/20">
            <CardHeader>
              <CardTitle className="text-primary">💡 Export Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p>• CSV files work best with spreadsheet applications</p>
              <p>• PDF reports include charts and visual analysis</p>
              <p>• Excel files support advanced filtering and pivot tables</p>
              <p>• JSON format is ideal for developers and custom applications</p>
              <p>• Large exports may take a few minutes to process</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}