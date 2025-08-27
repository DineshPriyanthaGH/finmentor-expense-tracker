"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getUserNotifications, markNotificationAsRead } from "@/actions/notifications";
import { 
  Bell, 
  X, 
  Check, 
  AlertTriangle, 
  Info, 
  CheckCircle,
  Clock,
  TrendingUp,
  DollarSign,
  Mail,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";

const NotificationItem = ({ notification, onMarkAsRead, onDelete }) => {
  const getIcon = (type) => {
    switch (type) {
      case "BUDGET_ALERT":
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case "MONTHLY_REPORT":
        return <TrendingUp className="h-5 w-5 text-blue-500" />;
      case "TRANSACTION_REMINDER":
        return <Clock className="h-5 w-5 text-purple-500" />;
      case "GOAL_ACHIEVED":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Info className="h-5 w-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "CRITICAL":
        return "bg-red-100 border-red-200";
      case "HIGH":
        return "bg-orange-100 border-orange-200";
      case "NORMAL":
        return "bg-blue-100 border-blue-200";
      case "LOW":
        return "bg-gray-100 border-gray-200";
      default:
        return "bg-blue-100 border-blue-200";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className={cn(
        "p-4 border rounded-lg transition-all duration-200",
        notification.isRead ? "bg-gray-50 border-gray-200" : getPriorityColor(notification.priority),
        !notification.isRead && "shadow-sm"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1">
          {getIcon(notification.type)}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className={cn(
                "font-medium text-sm",
                notification.isRead ? "text-gray-600" : "text-gray-900"
              )}>
                {notification.title}
              </h4>
              {!notification.isRead && (
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              )}
            </div>
            <p className={cn(
              "text-sm",
              notification.isRead ? "text-gray-500" : "text-gray-700"
            )}>
              {notification.message}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-gray-500">
                {new Date(notification.createdAt).toLocaleDateString()}
              </span>
              {notification.priority !== "NORMAL" && (
                <Badge variant="outline" className="text-xs">
                  {notification.priority}
                </Badge>
              )}
              {notification.isEmailed && (
                <Badge variant="outline" className="text-xs">
                  <Mail className="h-3 w-3 mr-1" />
                  Emailed
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-1">
          {!notification.isRead && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onMarkAsRead(notification.id)}
              className="h-8 w-8 p-0"
            >
              <Check className="h-4 w-4" />
            </Button>
          )}
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onDelete(notification.id)}
            className="h-8 w-8 p-0 text-gray-400 hover:text-red-500"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export const AdvancedNotificationCenter = () => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch real notifications from database
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setIsLoading(true);
        const result = await getUserNotifications();
        setNotifications(result || []);
      } catch (error) {
        console.error("Error fetching notifications:", error);
        // Fallback to empty array
        setNotifications([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (id) => {
    try {
      await markNotificationAsRead(id);
      setNotifications(prev =>
        prev.map(notification =>
          notification.id === id ? { ...notification, isRead: true } : notification
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const handleDelete = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === "unread") return !notification.isRead;
    if (filter === "read") return notification.isRead;
    return true;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  if (isLoading) {
    return (
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
            {unreadCount > 0 && (
              <Badge className="bg-red-500 text-white">
                {unreadCount}
              </Badge>
            )}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setFilter(filter === "all" ? "unread" : "all")}
            >
              {filter === "all" ? "Show Unread" : "Show All"}
            </Button>
            {unreadCount > 0 && (
              <Button
                size="sm"
                variant="outline"
                onClick={handleMarkAllAsRead}
              >
                Mark All Read
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Bell className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p>No notifications to show</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            <AnimatePresence>
              {filteredNotifications.map(notification => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={handleMarkAsRead}
                  onDelete={handleDelete}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
