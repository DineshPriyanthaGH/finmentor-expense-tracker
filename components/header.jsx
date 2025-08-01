
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, PenBox, Menu } from "lucide-react";
import { checkUser } from "@/lib/checkUser";

const Header = async() => {
  await checkUser();

  return (
    <div className="fixed top-0 w-full bg-white/95 backdrop-blur-lg z-50 border-b border-blue-100 shadow-lg"> 
      <nav className="container mx-auto flex justify-between items-center py-4 px-4">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <Image
            src={"/logo.png"}
            alt="FinMentor"
            width={200}
            height={60}
            className="h-12 w-auto object-contain"
            priority
          />
        </Link>

        <div className="flex items-center space-x-3">
          <SignedIn>
            <Link href="/dashboard">
              <Button 
                variant="outline" 
                className="border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 flex items-center gap-2"
              >
                <LayoutDashboard size={18} />
                <span className="hidden md:inline">Dashboard</span>
              </Button>
            </Link>

            <Link href="/transaction/create">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-2">
                <PenBox size={18} />
                <span className="hidden md:inline">Add Transaction</span>
              </Button>
            </Link>
          </SignedIn>

          <SignedOut>
            <Link href="/sign-in">
              <Button 
                variant="outline" 
                className="border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
              >
                Login
              </Button>
            </Link>
            
            <Link href="/sign-up">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200">
                Get Started
              </Button>
            </Link>
          </SignedOut>

          <SignedIn>
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10 ring-2 ring-blue-200 hover:ring-blue-300 transition-all duration-200",
                  userButtonPopoverCard: "shadow-xl border-blue-100",
                  userButtonPopoverActions: "text-blue-700"
                }
              }}
            />
          </SignedIn>
        </div>
      </nav>
    </div>
  );
};

export default Header;