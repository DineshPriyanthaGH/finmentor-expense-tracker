"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Mail, 
  Bell, 
  Calendar, 
  AlertTriangle, 
  TrendingUp,
  DollarSign,
  Settings,
  CheckCircle,
  Clock
} from "lucide-react";
import { setupEmailNotifications } from "@/actions/notifications";

export function EmailNotificationSetup() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [preferences, setPreferences] = useState({
    monthlyReport: true,
    budgetAlerts: true,
    transactionNotifications: false,
    weeklyDigest: true,
    goalAchievements: true,
    securityAlerts: true
  });

  const handleSetup = async () => {
    setLoading(true);
    try {
      const result = await setupEmailNotifications(email, preferences);
      if (result.success) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        alert("Failed to setup email notifications");
      }
    } catch (error) {
      console.error("Error setting up notifications:", error);
      alert("Failed to setup email notifications");
    } finally {
      setLoading(false);
    }
  };

  const notificationTypes = [
    {
      key: "monthlyReport",
      title: "Monthly Financial Report",
      description: "Comprehensive monthly summary sent to your email",
      icon: <Calendar className="h-5 w-5 text-blue-600" />,
      badge: "Monthly",
      recommended: true
    },
    {
      key: "budgetAlerts",
      title: "Budget Alerts",
      description: "Get notified when you're approaching budget limits",
      icon: <AlertTriangle className="h-5 w-5 text-orange-600" />,
      badge: "Important",
      recommended: true
    },
    {
      key: "weeklyDigest",
      title: "Weekly Digest",
      description: "Weekly overview of your financial activity",
      icon: <TrendingUp className="h-5 w-5 text-green-600" />,
      badge: "Weekly",
      recommended: false
    },
    {
      key: "transactionNotifications",
      title: "Transaction Alerts",
      description: "Real-time notifications for each transaction",
      icon: <DollarSign className="h-5 w-5 text-purple-600" />,
      badge: "Real-time",
      recommended: false
    },
    {
      key: "goalAchievements",
      title: "Goal Achievements",
      description: "Celebrate when you reach your financial goals",
      icon: <CheckCircle className="h-5 w-5 text-green-600" />,
      badge: "Motivational",
      recommended: true
    },
    {
      key: "securityAlerts",
      title: "Security Alerts",
      description: "Important security and account notifications",
      icon: <Settings className="h-5 w-5 text-red-600" />,
      badge: "Security",
      recommended: true
    }
  ];

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Mail className="h-5 w-5" />
          Email Notifications
        </CardTitle>
      </CardHeader>
      <CardContent>
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 text-green-800">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">Email notifications setup successfully!</span>
            </div>
          </div>
        )}

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 border-blue-200 focus:border-blue-400"
            />
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-gray-800 flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notification Preferences
            </h4>
            
            <div className="grid gap-4">
              {notificationTypes.map((type) => (
                <div key={type.key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="mt-1">
                      {type.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h5 className="font-medium text-gray-900">{type.title}</h5>
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${
                            type.recommended ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {type.badge}
                        </Badge>
                        {type.recommended && (
                          <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                            Recommended
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{type.description}</p>
                    </div>
                  </div>
                  <Switch
                    checked={preferences[type.key]}
                    onCheckedChange={(checked) => 
                      setPreferences(prev => ({ ...prev, [type.key]: checked }))
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="border-t pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-800">Email Schedule</h4>
                <p className="text-sm text-gray-600">Choose when you'd like to receive emails</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>Every 1st of the month at 9:00 AM</span>
              </div>
            </div>
          </div>

          <Button 
            onClick={handleSetup}
            disabled={loading || !email}
            className="w-full bg-[#385b93] hover:bg-blue-700 text-white shadow-lg"
          >
            {loading ? (
              <>
                <Settings className="h-4 w-4 mr-2 animate-spin" />
                Setting up notifications...
              </>
            ) : (
              <>
                <Mail className="h-4 w-4 mr-2" />
                Setup Email Notifications
              </>
            )}
          </Button>

          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start gap-2">
              <Bell className="h-4 w-4 text-blue-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-blue-800 mb-1">Smart Notifications</p>
                <p className="text-blue-700">
                  Our AI will analyze your spending patterns and send personalized insights to help you make better financial decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
