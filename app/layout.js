import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "FinMentor",
  description: "Smart Expense Tracker",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/logo-sm.png" sizes="any" />
        </head>
        <body className={`${inter.className}`}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Toaster richColors />

            {/* Footer */}
            <footer className="bg-blue-50 text-black py-8">
  <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
    {/* Logo and Copyright */}
    <div className="mb-4 md:mb-0">
      <h2 className="text-2xl font-semibold">FinMentor</h2>
      <p className="text-sm opacity-80">© 2025 FinMentor. All Rights Reserved.</p>
    </div>

    {/* Navigation Links */}
    <div className="flex space-x-6 text-sm">
      <a href="#" className="hover:text-black transition">About</a>
      <a href="#" className="hover:text-black transition">Services</a>
      <a href="#" className="hover:text-black transition">Contact</a>
      <a href="#" className="hover:text-black transition">Privacy Policy</a>
    </div>

    {/* Social Media Icons */}
    <div className="flex space-x-4 mt-4 md:mt-0">
      <a href="#" className="hover:text-black transition">
        <i className="fab fa-facebook-f"></i>
      </a>
      <a href="#" className="hover:text-black transition">
        <i className="fab fa-twitter"></i>
      </a>
      <a href="#" className="hover:text-black transition">
        <i className="fab fa-linkedin-in"></i>
      </a>
      <a href="#" className="hover:text-black transition">
        <i className="fab fa-instagram"></i>
      </a>
    </div>
  </div>
</footer>

        </body>
      </html>
    </ClerkProvider>
  );
}
