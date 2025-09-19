import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PiggyBank, TrendingUp, Users, Shield, Database, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-dashboard">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-8">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-gradient-financial-primary rounded-2xl flex items-center justify-center shadow-financial">
              <PiggyBank className="h-10 w-10 text-primary-foreground" />
            </div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Personal Finance Tracker
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Take control of your finances with our comprehensive multi-user platform. 
              Track expenses, manage budgets, and achieve your financial goals.
            </p>
          </div>

          <div className="flex gap-4 justify-center">
            <Link to="/">
              <Button size="lg" className="bg-gradient-financial-primary shadow-financial">
                Get Started
              </Button>
            </Link>
            <Link to="/export">
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </Link>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
          <Card className="bg-gradient-card shadow-card hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-financial-success rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-financial-success-foreground" />
              </div>
              <CardTitle>Smart Analytics</CardTitle>
              <CardDescription>
                Get deep insights into your spending patterns with interactive charts and trends analysis.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/">
                <Button variant="ghost" className="w-full">View Dashboard</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-gradient-financial-primary rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="h-6 w-6 text-primary-foreground" />
              </div>
              <CardTitle>Budget Management</CardTitle>
              <CardDescription>
                Set and track budgets across categories. Get alerts when you're approaching limits.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/budgets">
                <Button variant="ghost" className="w-full">Manage Budgets</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Multi-User Support</CardTitle>
              <CardDescription>
                Collaborate with family or team members with role-based access and permissions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/users">
                <Button variant="ghost" className="w-full">Manage Users</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-financial-warning/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-financial-warning" />
              </div>
              <CardTitle>Secure & Private</CardTitle>
              <CardDescription>
                Your financial data is encrypted and secure with enterprise-grade security measures.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/settings">
                <Button variant="ghost" className="w-full">Security Settings</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Database className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Data Export</CardTitle>
              <CardDescription>
                Export your data in multiple formats including CSV, Excel, and PDF reports.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/export">
                <Button variant="ghost" className="w-full">Export Data</Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card shadow-card hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-financial-success/10 rounded-lg flex items-center justify-center mb-4">
                <PiggyBank className="h-6 w-6 text-financial-success" />
              </div>
              <CardTitle>Goal Tracking</CardTitle>
              <CardDescription>
                Set financial goals and track your progress with visual indicators and milestones.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/">
                <Button variant="ghost" className="w-full">Track Goals</Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20 space-y-6">
          <h2 className="text-3xl font-bold">Ready to take control of your finances?</h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of users who have transformed their financial management
          </p>
          <Link to="/">
            <Button size="lg" className="bg-gradient-financial-success shadow-success">
              Start Your Journey
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
