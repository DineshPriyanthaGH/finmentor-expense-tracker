"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  Home, 
  CreditCard, 
  TrendingUp, 
  FileText, 
  Plus,
  Settings
} from "lucide-react";

const NavLink = ({ href, icon: Icon, children }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
        isActive
          ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      )}
    >
      <Icon className="h-5 w-5" />
      {children}
    </Link>
  );
};

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="flex">
        {/* Sidebar Navigation */}
        <div className="w-64 bg-white/80 backdrop-blur-sm border-r border-gray-200 min-h-screen p-6 hidden lg:block">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800">FinMentor</h2>
            <p className="text-sm text-gray-600">Expense Tracker</p>
          </div>
          
          <nav className="space-y-2">
            <NavLink href="/dashboard" icon={Home}>
              Dashboard
            </NavLink>
            <NavLink href="/account" icon={CreditCard}>
              Accounts
            </NavLink>
            <NavLink href="/transaction/create" icon={Plus}>
              Add Transaction
            </NavLink>
            <NavLink href="/reports" icon={FileText}>
              Reports
            </NavLink>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="container mx-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
