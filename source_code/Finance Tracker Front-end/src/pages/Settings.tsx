import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Database,
  Download,
  Trash2,
  Save,
  Eye,
  EyeOff
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function Settings() {
  const [showPassword, setShowPassword] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe", 
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    budgetAlerts: true,
    weeklyReports: true,
    monthlyReports: true,
  });

  const [preferences, setPreferences] = useState({
    currency: "USD",
    dateFormat: "MM/DD/YYYY",
    theme: "system",
    language: "en",
  });

  const handleSaveProfile = () => {
    if (profileData.newPassword && profileData.newPassword !== profileData.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleSavePreferences = () => {
    toast({
      title: "Preferences Saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const handleSaveNotifications = () => {
    toast({
      title: "Notifications Updated", 
      description: "Your notification settings have been saved.",
    });
  };

  const handleExportData = () => {
    toast({
      title: "Export Started",
      description: "Your data export has been initiated. Download will start shortly.",
    });
  };

  const handleCreateBackup = () => {
    toast({
      title: "Backup Created",
      description: "Your data has been backed up successfully.",
    });
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      toast({
        title: "Account Deletion",
        description: "Account deletion process has been initiated. You will receive a confirmation email.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your account and application preferences</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Settings */}
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
              <CardDescription>Update your personal details and profile</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input 
                    id="firstName" 
                    value={profileData.firstName} 
                    onChange={(e) => setProfileData(prev => ({...prev, firstName: e.target.value}))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input 
                    id="lastName" 
                    value={profileData.lastName}
                    onChange={(e) => setProfileData(prev => ({...prev, lastName: e.target.value}))}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={profileData.email}
                  onChange={(e) => setProfileData(prev => ({...prev, email: e.target.value}))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  value={profileData.phone}
                  onChange={(e) => setProfileData(prev => ({...prev, phone: e.target.value}))}
                />
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <div className="relative">
                  <Input 
                    id="currentPassword" 
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter current password"
                    value={profileData.currentPassword}
                    onChange={(e) => setProfileData(prev => ({...prev, currentPassword: e.target.value}))}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input 
                    id="newPassword" 
                    type="password" 
                    placeholder="New password" 
                    value={profileData.newPassword}
                    onChange={(e) => setProfileData(prev => ({...prev, newPassword: e.target.value}))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input 
                    id="confirmPassword" 
                    type="password" 
                    placeholder="Confirm password" 
                    value={profileData.confirmPassword}
                    onChange={(e) => setProfileData(prev => ({...prev, confirmPassword: e.target.value}))}
                  />
                </div>
              </div>
              
              <Button className="bg-gradient-financial-success" onClick={handleSaveProfile}>
                <Save className="h-4 w-4 mr-2" />
                Save Profile Changes
              </Button>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SettingsIcon className="h-5 w-5" />
                Preferences
              </CardTitle>
              <CardDescription>Customize your application experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Currency</Label>
                  <Select value={preferences.currency} onValueChange={(value) => 
                    setPreferences({...preferences, currency: value})
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                      <SelectItem value="JPY">JPY (¥)</SelectItem>
                      <SelectItem value="CAD">CAD (C$)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Date Format</Label>
                  <Select value={preferences.dateFormat} onValueChange={(value) =>
                    setPreferences({...preferences, dateFormat: value})
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <Select value={preferences.theme} onValueChange={(value) =>
                    setPreferences({...preferences, theme: value})
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select value={preferences.language} onValueChange={(value) =>
                    setPreferences({...preferences, language: value})
                  }>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button className="bg-gradient-financial-primary" onClick={handleSavePreferences}>
                <Save className="h-4 w-4 mr-2" />
                Save Preferences
              </Button>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
              <CardDescription>Configure how you receive alerts and updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={notifications.email}
                  onCheckedChange={(checked) => 
                    setNotifications({...notifications, email: checked})
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive browser notifications</p>
                </div>
                <Switch
                  id="push-notifications"
                  checked={notifications.push}
                  onCheckedChange={(checked) => 
                    setNotifications({...notifications, push: checked})
                  }
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="budget-alerts">Budget Alerts</Label>
                  <p className="text-sm text-muted-foreground">Get notified when approaching budget limits</p>
                </div>
                <Switch
                  id="budget-alerts"
                  checked={notifications.budgetAlerts}
                  onCheckedChange={(checked) => 
                    setNotifications({...notifications, budgetAlerts: checked})
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="weekly-reports">Weekly Reports</Label>
                  <p className="text-sm text-muted-foreground">Receive weekly spending summaries</p>
                </div>
                <Switch
                  id="weekly-reports"
                  checked={notifications.weeklyReports}
                  onCheckedChange={(checked) => 
                    setNotifications({...notifications, weeklyReports: checked})
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="monthly-reports">Monthly Reports</Label>
                  <p className="text-sim text-muted-foreground">Receive monthly financial analysis</p>
                </div>
                <Switch
                  id="monthly-reports"
                  checked={notifications.monthlyReports}
                  onCheckedChange={(checked) => 
                    setNotifications({...notifications, monthlyReports: checked})
                  }
                />
              </div>
              
              <Button className="bg-gradient-financial-primary" onClick={handleSaveNotifications}>
                <Save className="h-4 w-4 mr-2" />
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          {/* Security */}
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Two-Factor Authentication</Label>
                <div className="flex items-center justify-between">
                  <Badge className="bg-financial-danger/10 text-financial-danger border-financial-danger/20">
                    Disabled
                  </Badge>
                  <Button size="sm" variant="outline">Enable</Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Active Sessions</Label>
                <p className="text-sm text-muted-foreground">3 active sessions</p>
                <Button size="sm" variant="outline">Manage Sessions</Button>
              </div>
              
              <div className="space-y-2">
                <Label>Login History</Label>
                <Button size="sm" variant="outline">View History</Button>
              </div>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Data Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Data Export</Label>
                <Button size="sm" variant="outline" onClick={handleExportData} className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Export All Data
                </Button>
              </div>
              
              <div className="space-y-2">
                <Label>Data Backup</Label>
                <p className="text-sm text-muted-foreground">Last backup: Jan 15, 2024</p>
                <Button size="sm" variant="outline" className="w-full" onClick={handleCreateBackup}>
                  Create Backup
                </Button>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <Label className="text-destructive">Danger Zone</Label>
                <Button size="sm" variant="destructive" className="w-full" onClick={handleDeleteAccount}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Account
                </Button>
                <p className="text-xs text-muted-foreground">
                  This action cannot be undone
                </p>
              </div>
            </CardContent>
          </Card>

          {/* System Info */}
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle>System Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Version</span>
                <span>2.1.0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Update</span>
                <span>Jan 10, 2024</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Storage Used</span>
                <span>45 MB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">License</span>
                <Badge>Pro</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}