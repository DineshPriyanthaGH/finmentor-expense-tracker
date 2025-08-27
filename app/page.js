"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LandingPage from "@/components/landing-page";

export default function Home() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push("/dashboard");
    }
  }, [isSignedIn, isLoaded, router]);

  // Show loading while checking auth state
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-blue-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // Show landing page only for non-authenticated users
  if (!isSignedIn) {
    return <LandingPage />;
  }

  return null; // Will redirect to dashboard
}
