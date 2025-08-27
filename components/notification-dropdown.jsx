"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Bell, 
  Settings, 
  Check,
  Mail,
  Calendar,
  TrendingUp,
  AlertTriangle
} from "lucide-react";
import { getUserNotifications, markNotificationAsRead } from "@/actions/notifications";
import { setupEmailNotifications } from "@/actions/notifications";

export function NotificationDropdown() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showEmailSetup, setShowEmailSetup] = useState(false);
  const [emailPreferences, setEmailPreferences] = useState({
    monthlyReport: true,
    budgetAlerts: true,
    transactionNotifications: true,
    weeklyDigest: true,
    goalAchievements: true,
    securityAlerts: true
  });

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const userNotifications = await getUserNotifications();
      setNotifications(userNotifications || []);
      const unread = userNotifications?.filter(n => !n.isRead).length || 0;
      setUnreadCount(unread);
    } catch (error) {
      console.error("Error loading notifications:", error);
    }
  };

  const handleMarkAsRead = async (notificationId) => {
    try {
      await markNotificationAsRead(notificationId);
      setNotifications(prev => 
        prev.map(notif => 
          notif.id === notificationId ? { ...notif, isRead: true } : notif
        )
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const handleEmailSetup = async () => {
    try {
      const result = await setupEmailNotifications("user@example.com", emailPreferences);
      if (result.success) {
        alert("Email notifications setup successfully!");
        setShowEmailSetup(false);
      } else {
        alert("Failed to setup email notifications");
      }
    } catch (error) {
      console.error("Error setting up email notifications:", error);
      alert("Error setting up email notifications");
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'BUDGET_ALERT':
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case 'MONTHLY_REPORT':
        return <Calendar className="h-4 w-4 text-blue-500" />;
      case 'GOAL_ACHIEVED':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'HIGH':
        return 'bg-red-500';
      case 'NORMAL':
        return 'bg-blue-500';
      case 'LOW':
        return 'bg-gray-500';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          Notifications
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowEmailSetup(!showEmailSetup)}
          >
            <Settings className="h-4 w-4" />
          </Button>
        </DropdownMenuLabel>
        
        {showEmailSetup && (
          <>
            <DropdownMenuSeparator />
            <div className="p-4 space-y-3">
              <h4 className="font-semibold text-sm">Email Preferences</h4>
              
              <div className="space-y-2">
                {[
                  { key: 'monthlyReport', label: 'Monthly Reports' },
                  { key: 'budgetAlerts', label: 'Budget Alerts' },
                  { key: 'transactionNotifications', label: 'Transaction Notifications' },
                  { key: 'weeklyDigest', label: 'Weekly Digest' },
                  { key: 'goalAchievements', label: 'Goal Achievements' },
                  { key: 'securityAlerts', label: 'Security Alerts' }
                ].map(({ key, label }) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm">{label}</span>
                    <input
                      type="checkbox"
                      checked={emailPreferences[key]}
                      onChange={(e) => 
                        setEmailPreferences(prev => ({ 
                          ...prev, 
                          [key]: e.target.checked 
                        }))
                      }
                      className="rounded"
                    />
                  </div>
                ))}
              </div>
              
              <Button 
                onClick={handleEmailSetup}
                size="sm"
                className="w-full bg-[#385b93] hover:bg-blue-700"
              >
                <Mail className="h-4 w-4 mr-2" />
                Save Preferences
              </Button>
            </div>
          </>
        )}
        
        <DropdownMenuSeparator />
        
        <div className="max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No notifications</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={`p-4 cursor-pointer ${!notification.isRead ? 'bg-blue-50' : ''}`}
                onClick={() => !notification.isRead && handleMarkAsRead(notification.id)}
              >
                <div className="flex items-start space-x-3 w-full">
                  <div className="flex-shrink-0">
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium truncate">
                        {notification.title}
                      </p>
                      <div className="flex items-center space-x-1">
                        <div className={`w-2 h-2 rounded-full ${getPriorityColor(notification.priority)}`} />
                        {!notification.isRead && (
                          <Check className="h-3 w-3 text-gray-400" />
                        )}
                      </div>
                    </div>
                    
                    <p className="text-xs text-gray-600 mb-1">
                      {notification.message}
                    </p>
                    
                    <p className="text-xs text-gray-400">
                      {new Date(notification.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </DropdownMenuItem>
            ))
          )}
        </div>
        
        {notifications.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-center text-sm text-gray-500">
              View all notifications
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
