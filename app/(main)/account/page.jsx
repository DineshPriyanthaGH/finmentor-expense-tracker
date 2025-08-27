import { getUserAccounts } from "@/actions/dashboard";
import { CreateAccountDrawer } from "@/components/create-account-drawer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, CreditCard, TrendingUp, DollarSign, Eye } from "lucide-react";
import Link from "next/link";

export default async function AccountsPage() {
  const accounts = await getUserAccounts();

  const totalBalance = accounts?.reduce((sum, account) => sum + parseFloat(account.balance), 0) || 0;
  const totalAccounts = accounts?.length || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-[#385b93] text-white p-6 rounded-2xl mb-8 shadow-xl">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Your Accounts</h1>
            <p className="text-blue-100 text-lg">Manage all your financial accounts in one place</p>
          </div>
          
          <div className="flex gap-3">
            <CreateAccountDrawer>
              <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30">
                <Plus className="h-4 w-4 mr-2" />
                Add Account
              </Button>
            </CreateAccountDrawer>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-green-50 border-green-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">Total Balance</p>
                <p className="text-2xl font-bold text-green-700">
                  LKR {totalBalance.toLocaleString()}
                </p>
              </div>
              <div className="bg-green-500 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Total Accounts</p>
                <p className="text-2xl font-bold text-blue-700">
                  {totalAccounts}
                </p>
              </div>
              <div className="bg-blue-500 p-3 rounded-full">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm font-medium">Average Balance</p>
                <p className="text-2xl font-bold text-purple-700">
                  LKR {totalAccounts > 0 ? (totalBalance / totalAccounts).toLocaleString() : '0'}
                </p>
              </div>
              <div className="bg-purple-500 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Accounts Grid */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-gray-800">All Accounts</CardTitle>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              {totalAccounts} Active
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {accounts && accounts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {accounts.map((account) => (
                <Card key={account.id} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <CreditCard className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">{account.name}</h3>
                          <p className="text-sm text-gray-600 capitalize">
                            {account.type.toLowerCase()} Account
                          </p>
                        </div>
                      </div>
                      {account.isDefault && (
                        <Badge className="bg-green-100 text-green-700 border-green-300">
                          Default
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600">Current Balance</p>
                        <p className="text-2xl font-bold text-gray-800">
                          LKR {parseFloat(account.balance).toLocaleString()}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Transactions</span>
                        <span className="font-medium">{account._count?.transactions || 0}</span>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Created</span>
                        <span>{new Date(account.createdAt).toLocaleDateString()}</span>
                      </div>

                      <Link href={`/account/${account.id}`}>
                        <Button className="w-full mt-4 bg-[#385b93] hover:bg-[#2d4a7a] text-white">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Add Account Card */}
              <CreateAccountDrawer>
                <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-dashed border-2 border-blue-300 bg-blue-50">
                  <CardContent className="flex flex-col items-center justify-center text-blue-600 h-full pt-5">
                    <div className="bg-blue-500/20 p-4 rounded-full mb-3">
                      <Plus className="h-8 w-8" />
                    </div>
                    <p className="font-medium">Add New Account</p>
                    <p className="text-sm text-blue-500 mt-1">Connect your bank account</p>
                  </CardContent>
                </Card>
              </CreateAccountDrawer>
            </div>
          ) : (
            <div className="text-center py-12">
              <CreditCard className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No accounts found</h3>
              <p className="text-gray-500 mb-6">Create your first account to get started</p>
              <CreateAccountDrawer>
                <Button className="bg-[#385b93] text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Account
                </Button>
              </CreateAccountDrawer>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
