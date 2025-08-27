"use server";

import { checkUser } from "@/lib/checkUser";
import { db } from "@/lib/prisma";

// Email notification service
export async function setupEmailNotifications(email, preferences) {
  try {
    const user = await checkUser();
    
    // Save notification preferences to database using EmailPreference model
    await db.emailPreference.upsert({
      where: { userId: user.id },
      update: {
        budgetAlerts: preferences.budgetAlerts || true,
        monthlyReports: preferences.monthlyReport || true,
        transactionReminders: preferences.transactionNotifications || false,
        goalAchievements: preferences.goalAchievements || true,
        weeklyDigest: preferences.weeklyDigest || false,
        emailFrequency: "IMMEDIATE"
      },
      create: {
        userId: user.id,
        budgetAlerts: preferences.budgetAlerts || true,
        monthlyReports: preferences.monthlyReport || true,
        transactionReminders: preferences.transactionNotifications || false,
        goalAchievements: preferences.goalAchievements || true,
        weeklyDigest: preferences.weeklyDigest || false,
        emailFrequency: "IMMEDIATE"
      }
    });

    return { success: true };
  } catch (error) {
    console.error("Error setting up email notifications:", error);
    return { error: "Failed to setup email notifications" };
  }
}

export async function sendMonthlyReport(userId) {
  try {
    const user = await checkUser();
    
    // Get user's financial data for the month
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    
    const endOfMonth = new Date();
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);
    endOfMonth.setDate(0);
    endOfMonth.setHours(23, 59, 59, 999);

    const transactions = await db.transaction.findMany({
      where: {
        userId: user.id,
        date: {
          gte: startOfMonth,
          lte: endOfMonth
        }
      },
      include: {
        account: true
      }
    });

    const accounts = await db.account.findMany({
      where: { userId: user.id }
    });

    // Calculate monthly statistics
    const monthlyStats = {
      totalIncome: transactions
        .filter(t => t.type === 'INCOME')
        .reduce((sum, t) => sum + t.amount, 0),
      totalExpenses: transactions
        .filter(t => t.type === 'EXPENSE')
        .reduce((sum, t) => sum + t.amount, 0),
      transactionCount: transactions.length,
      accountsCount: accounts.length,
      topCategories: getTopCategories(transactions)
    };

    return monthlyStats;
  } catch (error) {
    console.error("Error generating monthly report:", error);
    return { error: "Failed to generate monthly report" };
  }
}

function getTopCategories(transactions) {
  const categoryTotals = {};
  
  transactions.forEach(transaction => {
    if (transaction.type === 'EXPENSE') {
      categoryTotals[transaction.category] = 
        (categoryTotals[transaction.category] || 0) + transaction.amount;
    }
  });

  return Object.entries(categoryTotals)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5)
    .map(([category, amount]) => ({ category, amount }));
}

export async function generateFinancialReport(userId, format = 'PDF') {
  try {
    const user = await checkUser();
    
    const accounts = await db.account.findMany({
      where: { userId: user.id },
      include: {
        transactions: {
          orderBy: { date: 'desc' },
          take: 100
        }
      }
    });

    const reportData = {
      user: {
        name: user.name,
        email: user.email
      },
      generatedAt: new Date(),
      accounts: accounts.map(account => ({
        name: account.name,
        balance: account.balance,
        type: account.type,
        transactionCount: account.transactions.length,
        recentTransactions: account.transactions.slice(0, 10)
      })),
      summary: {
        totalBalance: accounts.reduce((sum, acc) => sum + acc.balance, 0),
        totalAccounts: accounts.length,
        totalTransactions: accounts.reduce((sum, acc) => sum + acc.transactions.length, 0)
      }
    };

    return reportData;
  } catch (error) {
    console.error("Error generating financial report:", error);
    return { error: "Failed to generate financial report" };
  }
}

export async function createNotification(userId, type, title, message) {
  try {
    const notification = await db.notification.create({
      data: {
        userId,
        type,
        title,
        message,
        isRead: false
      }
    });

    return notification;
  } catch (error) {
    console.error("Error creating notification:", error);
    return { error: "Failed to create notification" };
  }
}

// Create sample notifications for new users
export async function createSampleNotifications() {
  try {
    const user = await checkUser();
    
    const sampleNotifications = [
      {
        type: "BUDGET_ALERT",
        title: "Welcome to FinMentor!",
        message: "Start by setting up your budget and tracking your expenses.",
        priority: "NORMAL"
      },
      {
        type: "MONTHLY_REPORT", 
        title: "Monthly Report Ready",
        message: "Your financial insights are ready. Check your dashboard for details.",
        priority: "NORMAL"
      },
      {
        type: "GOAL_ACHIEVED",
        title: "Account Setup Complete!",
        message: "Great job! You've successfully set up your FinMentor account.",
        priority: "HIGH"
      }
    ];

    for (const notif of sampleNotifications) {
      await db.notification.create({
        data: {
          userId: user.id,
          type: notif.type,
          title: notif.title,
          message: notif.message,
          priority: notif.priority,
          isRead: false
        }
      });
    }

    return { success: true };
  } catch (error) {
    console.error("Error creating sample notifications:", error);
    return { error: "Failed to create sample notifications" };
  }
}

export async function getUserNotifications() {
  try {
    const user = await checkUser();
    
    const notifications = await db.notification.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      take: 10
    });

    return notifications;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return [];
  }
}

export async function markNotificationAsRead(notificationId) {
  try {
    const user = await checkUser();
    
    await db.notification.update({
      where: { 
        id: notificationId,
        userId: user.id 
      },
      data: { isRead: true }
    });

    return { success: true };
  } catch (error) {
    console.error("Error marking notification as read:", error);
    return { error: "Failed to mark notification as read" };
  }
}
