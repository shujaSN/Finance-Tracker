import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Tag, 
  Edit,
  Trash2,
  BarChart3,
  TrendingUp,
  TrendingDown
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { useFinance } from "@/contexts/FinanceContext";

const monthlyData = [
  { month: "Jan", Groceries: 450, Transportation: 320, Entertainment: 280, Shopping: 680, Utilities: 185 },
  { month: "Feb", Groceries: 420, Transportation: 290, Entertainment: 320, Shopping: 520, Utilities: 190 },
  { month: "Mar", Groceries: 480, Transportation: 350, Entertainment: 250, Shopping: 720, Utilities: 180 },
  { month: "Apr", Groceries: 390, Transportation: 310, Entertainment: 290, Shopping: 580, Utilities: 195 },
];

export default function Categories() {
  const { categories, addCategory, deleteCategory } = useFinance();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"all" | "income" | "expense">("all");
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    color: "#22c55e"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.type) {
      return;
    }

    addCategory({
      name: formData.name,
      type: formData.type as 'income' | 'expense',
      color: formData.color
    });

    // Reset form
    setFormData({
      name: "",
      type: "",
      color: "#22c55e"
    });
    
    setIsAddDialogOpen(false);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      deleteCategory(id);
    }
  };

  const filteredCategories = categories.filter(category => 
    viewMode === "all" || category.type === viewMode
  );

  const incomeCategories = categories.filter(cat => cat.type === "income");
  const expenseCategories = categories.filter(cat => cat.type === "expense");

  const totalIncome = incomeCategories.reduce((sum, cat) => sum + cat.totalAmount, 0);
  const totalExpenses = expenseCategories.reduce((sum, cat) => sum + cat.totalAmount, 0);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-financial-success" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-financial-danger" />;
      default:
        return <div className="h-4 w-4 rounded-full bg-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Categories</h1>
          <p className="text-muted-foreground">Organize and analyze your financial transactions</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-financial-primary shadow-financial">
              <Plus className="h-4 w-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Category</DialogTitle>
              <DialogDescription>
                Add a new category to organize your transactions.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Name</Label>
                <Input 
                  id="name" 
                  placeholder="Category name..." 
                  className="col-span-3" 
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">Type</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({...prev, type: value}))}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="color" className="text-right">Color</Label>
                <div className="col-span-3 flex gap-2">
                  {["#22c55e", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"].map(color => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-full border-2 ${formData.color === color ? 'border-primary' : 'border-muted'}`}
                      style={{ backgroundColor: color }}
                      onClick={() => setFormData(prev => ({...prev, color}))}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button className="bg-gradient-financial-success" onClick={handleSubmit}>Create Category</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-card shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories.length}</div>
            <p className="text-sm text-muted-foreground">
              {incomeCategories.length} income, {expenseCategories.length} expense
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Income Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-financial-success">${totalIncome.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">
              Across {incomeCategories.length} categories
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Expense Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-financial-danger">${totalExpenses.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">
              Across {expenseCategories.length} categories
            </p>
          </CardContent>
        </Card>
      </div>

      {/* View Toggle */}
      <Card className="bg-gradient-card shadow-card">
        <CardContent className="pt-6">
          <div className="flex gap-2">
            <Button 
              variant={viewMode === "all" ? "default" : "outline"}
              onClick={() => setViewMode("all")}
              size="sm"
            >
              All Categories
            </Button>
            <Button 
              variant={viewMode === "income" ? "default" : "outline"}
              onClick={() => setViewMode("income")}
              size="sm"
            >
              Income Only
            </Button>
            <Button 
              variant={viewMode === "expense" ? "default" : "outline"}
              onClick={() => setViewMode("expense")}
              size="sm"
            >
              Expenses Only
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <Card key={category.id} className="bg-gradient-card shadow-card hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: category.color }}
                  />
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                </div>
                <Badge variant={category.type === "income" ? "default" : "secondary"}>
                  {category.type}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Amount</span>
                <span className={`font-semibold ${
                  category.type === "income" ? "text-financial-success" : "text-financial-danger"
                }`}>
                  ${category.totalAmount.toLocaleString()}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Transactions</span>
                <span className="font-medium">{category.transactionCount}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Average</span>
                <span className="font-medium">${category.avgTransaction.toLocaleString()}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Trend</span>
                <div className="flex items-center gap-1">
                  {getTrendIcon(category.trend)}
                  <span className="text-sm capitalize">{category.trend}</span>
                </div>
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => console.log('Edit category', category.id)}>
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="flex-1" onClick={() => handleDelete(category.id)}>
                  <Trash2 className="h-3 w-3 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle>Expense Distribution</CardTitle>
            <CardDescription>Current month spending by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={expenseCategories}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="totalAmount"
                  >
                    {expenseCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Trends */}
        <Card className="bg-gradient-card shadow-card">
          <CardHeader>
            <CardTitle>Category Trends</CardTitle>
            <CardDescription>Monthly spending patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="Groceries" fill="#3b82f6" />
                  <Bar dataKey="Transportation" fill="#8b5cf6" />
                  <Bar dataKey="Shopping" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}