import { Suspense } from "react";
import { getUserAccounts } from "@/actions/dashboard";
import { getDashboardData } from "@/actions/dashboard";
import { getCurrentBudget } from "@/actions/budget";
import { AccountCard } from "./_components/account-card";
import { CreateAccountDrawer } from "@/components/create-account-drawer";
import { BudgetProgress } from "./_components/budget-progress";
import { AdvancedNotificationCenter } from "@/components/advanced-notification-center";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Bell, 
  Download, 
  TrendingUp, 
  DollarSign, 
  Activity,
  CreditCard,
  Users,
  Calendar,
  Mail,
  FileText,
  BarChart3,
  PieChart,
  Zap,
  Target,
  ArrowUpRight,
  ArrowDownLeft,
  Settings,
  Trophy
} from "lucide-react";
import { DashboardOverview } from "./_components/transaction-overview";
import Link from "next/link";

export default async function DashboardPage() {
  const [accounts, transactions] = await Promise.all([
    getUserAccounts(),
    getDashboardData(),
  ]);

  const defaultAccount = accounts?.find((account) => account.isDefault);

  // Get budget for default account
  let budgetData = null;
  if (defaultAccount) {
    budgetData = await getCurrentBudget(defaultAccount.id);
  }

  // Mock data for enhanced features
  const dashboardStats = {
    totalBalance: accounts?.reduce((sum, account) => sum + account.balance, 0) || 0,
    monthlyIncome: 2500,
    monthlyExpenses: 1800,
    totalTransactions: transactions?.length || 0,
    savingsGoal: budgetData?.budget || 1000,
    currentSavings: budgetData?.budget ? budgetData.budget - (budgetData.currentExpenses || 0) : 0
  };

  const notifications = [
    {
      id: 1,
      type: "info",
      title: "Monthly Report Ready",
      message: "Your financial report for this month is ready to download",
      time: "2 min ago",
      icon: <FileText className="h-4 w-4" />
    },
    {
      id: 2,
      type: "warning",
      title: "Budget Alert",
      message: "You've spent 80% of your monthly budget",
      time: "1 hour ago",
      icon: <Target className="h-4 w-4" />
    },
    {
      id: 3,
      type: "success",
      title: "Goal Achievement",
      message: "Congratulations! You've reached your savings goal",
      time: "1 day ago",
      icon: <Trophy className="h-4 w-4" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-2xl mb-8 shadow-xl">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome Back! 👋</h1>
            <p className="text-blue-100 text-lg">Here's what's happening with your finances today</p>
          </div>
          
          <div className="flex gap-3">
            <Link href="/reports">
              <Button 
                variant="secondary" 
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </Button>
            </Link>
            <Button 
              variant="secondary" 
              className="bg-white/20 hover:bg-white/30 text-white border-white/30"
            >
              <Bell className="h-4 w-4 mr-2" />
              Notifications
              <Badge className="ml-2 bg-red-500 text-white">3</Badge>
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">Total Balance</p>
                <p className="text-2xl font-bold text-green-700">
                  ${dashboardStats.totalBalance.toLocaleString()}
                </p>
                <p className="text-green-600 text-xs mt-1 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  +12.5% from last month
                </p>
              </div>
              <div className="bg-green-500/20 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Monthly Income</p>
                <p className="text-2xl font-bold text-blue-700">
                  ${dashboardStats.monthlyIncome.toLocaleString()}
                </p>
                <p className="text-blue-600 text-xs mt-1 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  +8.2% from last month
                </p>
              </div>
              <div className="bg-blue-500/20 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm font-medium">Monthly Expenses</p>
                <p className="text-2xl font-bold text-purple-700">
                  ${dashboardStats.monthlyExpenses.toLocaleString()}
                </p>
                <p className="text-red-600 text-xs mt-1 flex items-center">
                  <ArrowDownLeft className="h-3 w-3 mr-1" />
                  -3.1% from last month
                </p>
              </div>
              <div className="bg-purple-500/20 p-3 rounded-full">
                <Activity className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:shadow-lg transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-600 text-sm font-medium">Transactions</p>
                <p className="text-2xl font-bold text-orange-700">
                  {dashboardStats.totalTransactions}
                </p>
                <p className="text-orange-600 text-xs mt-1 flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  This month
                </p>
              </div>
              <div className="bg-orange-500/20 p-3 rounded-full">
                <CreditCard className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Budget Progress Enhanced */}
        <div className="lg:col-span-2">
          <Card className="h-full shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold text-gray-800">Budget Overview</CardTitle>
                <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                  Current Month
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <BudgetProgress
                initialBudget={budgetData?.budget}
                currentExpenses={budgetData?.currentExpenses || 0}
              />
              
              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <Link href="/transaction/create">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Transaction
                  </Button>
                </Link>
                <Button variant="outline" className="w-full border-blue-200 text-blue-700 hover:bg-blue-50">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notifications Panel */}
        <div>
          <AdvancedNotificationCenter />
        </div>
      </div>

      {/* Dashboard Overview */}
      <div className="mb-8">
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800">Financial Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <DashboardOverview
              accounts={accounts}
              transactions={transactions || []}
            />
          </CardContent>
        </Card>
      </div>

      {/* Accounts Grid */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-gray-800">Your Accounts</CardTitle>
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              {accounts?.length || 0} Active
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <CreateAccountDrawer>
              <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-dashed border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-blue-100">
                <CardContent className="flex flex-col items-center justify-center text-blue-600 h-full pt-5">
                  <div className="bg-blue-500/20 p-4 rounded-full mb-3">
                    <Plus className="h-8 w-8" />
                  </div>
                  <p className="font-medium">Add New Account</p>
                  <p className="text-sm text-blue-500 mt-1">Connect your bank account</p>
                </CardContent>
              </Card>
            </CreateAccountDrawer>
            {accounts?.length > 0 &&
              accounts?.map((account) => (
                <AccountCard key={account.id} account={account} />
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
