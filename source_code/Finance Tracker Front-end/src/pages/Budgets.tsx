import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Target, 
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Edit,
  Trash2
} from "lucide-react";
import { useFinance } from "@/contexts/FinanceContext";

const categories = ["Groceries", "Transportation", "Entertainment", "Shopping", "Utilities", "Healthcare", "Dining", "Travel", "Education"];

export default function Budgets() {
  const { budgets, addBudget, deleteBudget } = useFinance();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    category: "",
    budgeted: "",
    period: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.category || !formData.budgeted || !formData.period) {
      return;
    }

    const colors = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    addBudget({
      category: formData.category,
      budgeted: parseFloat(formData.budgeted),
      period: formData.period as 'weekly' | 'monthly' | 'quarterly' | 'yearly',
      color: randomColor
    });

    // Reset form
    setFormData({
      category: "",
      budgeted: "",
      period: ""
    });
    
    setIsAddDialogOpen(false);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this budget?')) {
      deleteBudget(id);
    }
  };

  const totalBudgeted = budgets.reduce((sum, budget) => sum + budget.budgeted, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.spent, 0);
  const overBudgetCount = budgets.filter(budget => budget.status === "over-budget").length;
  const onTrackCount = budgets.filter(budget => budget.status === "on-track").length;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "over-budget":
        return <AlertTriangle className="h-4 w-4 text-financial-danger" />;
      case "on-track":
        return <CheckCircle className="h-4 w-4 text-financial-success" />;
      case "under-budget":
        return <TrendingUp className="h-4 w-4 text-primary" />;
      default:
        return <Target className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "over-budget":
        return <Badge className="bg-financial-danger/10 text-financial-danger border-financial-danger/20">Over Budget</Badge>;
      case "on-track":
        return <Badge className="bg-financial-success/10 text-financial-success border-financial-success/20">On Track</Badge>;
      case "under-budget":
        return <Badge className="bg-primary/10 text-primary border-primary/20">Under Budget</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Budgets</h1>
          <p className="text-muted-foreground">Track your spending against your budget goals</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-financial-primary shadow-financial">
              <Plus className="h-4 w-4 mr-2" />
              Create Budget
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Budget</DialogTitle>
              <DialogDescription>
                Set up a new budget category with spending limits.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">Category</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({...prev, category: value}))}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="amount" className="text-right">Budget Amount</Label>
                <Input 
                  id="amount" 
                  type="number" 
                  placeholder="0.00" 
                  className="col-span-3" 
                  value={formData.budgeted}
                  onChange={(e) => setFormData(prev => ({...prev, budgeted: e.target.value}))}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="period" className="text-right">Period</Label>
                <Select value={formData.period} onValueChange={(value) => setFormData(prev => ({...prev, period: value}))}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button className="bg-gradient-financial-success" onClick={handleSubmit}>Create Budget</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-card shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Budgeted</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">${totalBudgeted.toLocaleString()}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">${totalSpent.toLocaleString()}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Remaining</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totalBudgeted - totalSpent >= 0 ? 'text-financial-success' : 'text-financial-danger'}`}>
              ${(totalBudgeted - totalSpent).toLocaleString()}
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Budget Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <div className="text-sm text-financial-success">{onTrackCount} On Track</div>
              <div className="text-sm text-financial-danger">{overBudgetCount} Over Budget</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Budget Overview */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader>
          <CardTitle>Budget Overview</CardTitle>
          <CardDescription>Current month progress across all budget categories</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {budgets.map((budget) => {
              const percentage = Math.min((budget.spent / budget.budgeted) * 100, 100);
              const isOverBudget = budget.spent > budget.budgeted;
              
              return (
                <div key={budget.id} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: budget.color }}
                      />
                      <h3 className="font-medium">{budget.category}</h3>
                      {getStatusIcon(budget.status)}
                      {getStatusBadge(budget.status)}
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-semibold">
                          ${budget.spent.toLocaleString()} / ${budget.budgeted.toLocaleString()}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          ${(budget.budgeted - budget.spent).toLocaleString()} remaining
                        </p>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" onClick={() => console.log('Edit budget', budget.id)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(budget.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Progress 
                      value={percentage} 
                      className="h-3"
                      style={{
                        backgroundColor: isOverBudget ? 'hsl(var(--financial-danger) / 0.2)' : undefined
                      }}
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{percentage.toFixed(1)}% used</span>
                      <span>{budget.period}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Budget Recommendations */}
      <Card className="bg-gradient-card shadow-card border-financial-warning/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-financial-warning" />
            Budget Recommendations
          </CardTitle>
          <CardDescription>Suggestions to help you stay on track</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-financial-danger/5 border border-financial-danger/20">
              <h4 className="font-medium text-financial-danger mb-2">⚠️ Over Budget Alert</h4>
              <p className="text-sm text-muted-foreground">
                You're over budget in {overBudgetCount} categories. Consider reducing spending in Shopping and Entertainment.
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-financial-success/5 border border-financial-success/20">
              <h4 className="font-medium text-financial-success mb-2">✅ Good Progress</h4>
              <p className="text-sm text-muted-foreground">
                You're doing well with Healthcare and Utilities. You have extra room in these budgets.
              </p>
            </div>
            
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <h4 className="font-medium text-primary mb-2">💡 Tip</h4>
              <p className="text-sm text-muted-foreground">
                Set up automatic alerts when you reach 80% of your budget to avoid overspending.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}