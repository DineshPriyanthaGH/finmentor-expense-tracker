"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { 
  Download, 
  FileText, 
  Loader2
} from "lucide-react";

export function SimplePDFReport({ accounts, transactions }) {
  const [loading, setLoading] = useState(false);

  const generatePDFReport = () => {
    setLoading(true);
    
    try {
      const doc = new jsPDF();
      
      // Header
      doc.setFontSize(20);
      doc.setTextColor('#385b93');
      doc.text('FinMentor Financial Report', 20, 30);
      
      // Date
      doc.setFontSize(12);
      doc.setTextColor('#000000');
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 45);
      
      // Account Summary
      doc.setFontSize(16);
      doc.setTextColor('#385b93');
      doc.text('Account Summary', 20, 65);
      
      const totalBalance = accounts?.reduce((sum, account) => sum + parseFloat(account.balance || 0), 0) || 0;
      
      doc.setFontSize(12);
      doc.setTextColor('#000000');
      doc.text(`Total Accounts: ${accounts?.length || 0}`, 20, 80);
      doc.text(`Total Balance: LKR ${totalBalance.toLocaleString()}`, 20, 95);
      
      // Accounts Table
      if (accounts && accounts.length > 0) {
        const accountsData = accounts.map(account => [
          account.name || 'Unnamed Account',
          account.type || 'Unknown',
          `LKR ${parseFloat(account.balance || 0).toLocaleString()}`,
          account.isDefault ? 'Yes' : 'No'
        ]);
        
        (doc as any).autoTable({
          head: [['Account Name', 'Type', 'Balance', 'Default']],
          body: accountsData,
          startY: 110,
          theme: 'grid',
          headStyles: { fillColor: [56, 91, 147] },
          styles: { fontSize: 10 }
        });
      }
      
      // Recent Transactions
      if (transactions && transactions.length > 0) {
        const lastY = (doc as any).lastAutoTable ? (doc as any).lastAutoTable.finalY + 30 : 150;
        
        doc.setFontSize(16);
        doc.setTextColor('#385b93');
        doc.text('Recent Transactions', 20, lastY);
        
        const transactionData = transactions.slice(0, 10).map(transaction => [
          new Date(transaction.date).toLocaleDateString(),
          transaction.description || 'N/A',
          transaction.type || 'Unknown',
          transaction.category || 'Uncategorized',
          `LKR ${parseFloat(transaction.amount || 0).toLocaleString()}`
        ]);
        
        (doc as any).autoTable({
          head: [['Date', 'Description', 'Type', 'Category', 'Amount']],
          body: transactionData,
          startY: lastY + 10,
          theme: 'grid',
          headStyles: { fillColor: [56, 91, 147] },
          styles: { fontSize: 9 }
        });
      }
      
      // Footer
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.setTextColor('#666666');
        doc.text(`Page ${i} of ${pageCount}`, doc.internal.pageSize.width - 40, doc.internal.pageSize.height - 10);
      }
      
      // Download
      doc.save(`FinMentor-Report-${new Date().toISOString().split('T')[0]}.pdf`);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Download className="h-5 w-5" />
          Download PDF Report
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <Button 
            onClick={generatePDFReport}
            disabled={loading}
            className="bg-[#385b93] hover:bg-blue-700 w-full"
          >
            {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <FileText className="h-4 w-4 mr-2" />}
            Generate PDF Report
          </Button>
          
          <p className="text-sm text-gray-600 mt-4">
            Generate a comprehensive PDF report with account summaries and transaction history.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
