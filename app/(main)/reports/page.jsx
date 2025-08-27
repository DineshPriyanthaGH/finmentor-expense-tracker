import { getUserAccounts, getDashboardData } from "@/actions/dashboard";
import { SimplePDFReport } from "@/components/simple-pdf-report";
import { EmailNotificationSetup } from "@/components/email-notification-setup";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Mail, 
  BarChart3, 
  Calendar,
  TrendingUp,
  DollarSign,
  Activity
} from "lucide-react";

export default async function ReportsPage() {
  const [accountsData, transactionsData] = await Promise.all([
    getUserAccounts(),
    getDashboardData(),
  ]);

  // Serialize the data to avoid Decimal issues
  const accounts = accountsData?.map(account => ({
    ...account,
    balance: typeof account.balance === 'object' ? parseFloat(account.balance.toString()) : account.balance
  })) || [];
  
  const transactions = transactionsData?.map(transaction => ({
    ...transaction,
    amount: typeof transaction.amount === 'object' ? parseFloat(transaction.amount.toString()) : transaction.amount
  })) || [];

  const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });
  
  // Calculate some quick stats
  const totalBalance = accounts?.reduce((sum, account) => sum + account.balance, 0) || 0;
  const monthlyTransactions = transactions?.length || 0;
  const monthlyExpenses = transactions?.filter(t => t.type === 'EXPENSE').reduce((sum, t) => sum + t.amount, 0) || 0;
  const monthlyIncome = transactions?.filter(t => t.type === 'INCOME').reduce((sum, t) => sum + t.amount, 0) || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-[#385b93] text-white p-6 rounded-2xl mb-8 shadow-xl">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
              <FileText className="h-8 w-8" />
              Financial Reports & Notifications
            </h1>
            <p className="text-blue-100 text-lg">Download reports and setup automated notifications</p>
          </div>
          
          <div className="flex gap-3">
            <Badge className="bg-white/20 text-white px-4 py-2">
              <Calendar className="h-4 w-4 mr-2" />
              {currentMonth}
            </Badge>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gray-50 border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#385b93] text-sm font-medium">Total Balance</p>
                <p className="text-2xl font-bold text-[#385b93]">
                  LKR {totalBalance.toLocaleString()}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-[#385b93]" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Monthly Income</p>
                <p className="text-2xl font-bold text-blue-700">
                  LKR {monthlyIncome.toLocaleString()}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-50 border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-600 text-sm font-medium">Monthly Expenses</p>
                <p className="text-2xl font-bold text-red-700">
                  LKR {monthlyExpenses.toLocaleString()}
                </p>
              </div>
              <Activity className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-50 border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[#385b93] text-sm font-medium">Transactions</p>
                <p className="text-2xl font-bold text-[#385b93]">
                  {monthlyTransactions}
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-[#385b93]" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* PDF Report Download Section */}
        <SimplePDFReport accounts={accounts} transactions={transactions} />

        {/* Email Notification Setup */}
        <EmailNotificationSetup />
      </div>

      {/* Additional Features Section */}
      <div className="mt-8">
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800">Automated Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 border border-[#385b93] rounded-lg bg-blue-50">
                <div className="flex items-center gap-3 mb-3">
                  <Calendar className="h-6 w-6 text-[#385b93]" />
                  <h3 className="font-semibold text-[#385b93]">Monthly Reports</h3>
                </div>
                <p className="text-[#385b93] text-sm">
                  Automatically generated reports sent to your email every month with detailed financial insights.
                </p>
              </div>

              <div className="p-4 border border-[#385b93] rounded-lg bg-gray-50">
                <div className="flex items-center gap-3 mb-3">
                  <Mail className="h-6 w-6 text-[#385b93]" />
                  <h3 className="font-semibold text-[#385b93]">Smart Alerts</h3>
                </div>
                <p className="text-[#385b93] text-sm">
                  AI-powered notifications that alert you about unusual spending patterns and budget limits.
                </p>
              </div>

              <div className="p-4 border border-[#385b93] rounded-lg bg-blue-50">
                <div className="flex items-center gap-3 mb-3">
                  <BarChart3 className="h-6 w-6 text-[#385b93]" />
                  <h3 className="font-semibold text-[#385b93]">Analytics</h3>
                </div>
                <p className="text-[#385b93] text-sm">
                  Advanced analytics and insights to help you make better financial decisions and achieve your goals.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
