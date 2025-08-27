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
      
      let yPosition = 110;
      
      // Accounts List
      if (accounts && accounts.length > 0) {
        doc.setFontSize(14);
        doc.setTextColor('#385b93');
        doc.text('Accounts:', 20, yPosition);
        yPosition += 15;
        
        doc.setFontSize(10);
        doc.setTextColor('#000000');
        
        accounts.forEach((account, index) => {
          if (yPosition > 270) { // Add new page if needed
            doc.addPage();
            yPosition = 20;
          }
          
          const accountText = `${index + 1}. ${account.name || 'Unnamed'} (${account.type || 'Unknown'}) - LKR ${parseFloat(account.balance || 0).toLocaleString()}`;
          doc.text(accountText, 20, yPosition);
          yPosition += 10;
        });
        
        yPosition += 10;
      }
      
      // Recent Transactions
      if (transactions && transactions.length > 0) {
        if (yPosition > 200) { // Add new page if needed
          doc.addPage();
          yPosition = 20;
        }
        
        doc.setFontSize(14);
        doc.setTextColor('#385b93');
        doc.text('Recent Transactions:', 20, yPosition);
        yPosition += 15;
        
        doc.setFontSize(10);
        doc.setTextColor('#000000');
        
        transactions.slice(0, 10).forEach((transaction, index) => {
          if (yPosition > 270) { // Add new page if needed
            doc.addPage();
            yPosition = 20;
          }
          
          const transactionText = `${index + 1}. ${new Date(transaction.date).toLocaleDateString()} - ${transaction.description || 'N/A'} (${transaction.type || 'Unknown'}) - LKR ${parseFloat(transaction.amount || 0).toLocaleString()}`;
          doc.text(transactionText, 20, yPosition);
          yPosition += 10;
        });
      }
      
      // Footer
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
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
