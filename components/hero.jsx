"use client";

import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Banknote, BarChart3, ShieldCheck,Zap ,CreditCard,PieChart} from "lucide-react";

const HeroSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 100) {
        imageElement?.classList.add("scrolled");
      } else {
        imageElement?.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative bg-gradient-to-b from-gray-900 to-gray-800 text-white py-20 px-4">
      <div className="container mx-auto text-center">
        {/* Header Section */}
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
  Take Control of Your Student Finances  
  <br /> with Smart Expense Tracking
</h1>
<p className="text-lg text-bold text-gray-300 max-w-2xl mx-auto mt-4">
  A simple and powerful tool designed to help Sri Lankan university students manage their daily expenses, track spending, and save for the future.
</p>

{/* CTA Buttons */}
<div className="flex justify-center mt-6 space-x-4">
  <Link href="/dashboard">
    <Button size="lg" className="bg-blue-600 text-white px-8 font-semibold shadow-md hover:bg-blue-500">
      Start Tracking Now
    </Button>
  </Link>
  <Link href="/learn-more">
    <Button size="lg" variant="outline" className="border-white text-black px-8 hover:bg-white/20">
      Learn More
    </Button>
  </Link>
</div>


        {/* Hero Image */}
        <div className="mt-12 relative">
          <div ref={imageRef} className="hero-image transform transition duration-500 hover:scale-105">
            <Image
              src="/banner.png"
              alt="University Budgeting Dashboard"
              width={1280}
              height={780}
              className="rounded-lg shadow-xl mx-auto border border-gray-700"
              priority
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="flex flex-col items-center text-center p-6 bg-gray-700/40 rounded-lg">
            <Banknote size={40} className="text-blue-400" />
            <h3 className="text-xl font-semibold mt-4">Smart Budgeting</h3>
            <p className="text-gray-300 mt-2">Set monthly spending limits and track your expenses in real time.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-gray-700/40 rounded-lg">
    <BarChart3 size={40} className="text-blue-600" />
    <h3 className="text-xl font-semibold mt-4">Advanced Analytics</h3>
    <p className="text-gray-300 mt-2">Get detailed insights into your spending patterns with AI-powered analytics.</p>
  </div>
          <div className="flex flex-col items-center text-center p-6 bg-gray-700/40 rounded-lg">
            <ShieldCheck size={40} className="text-yellow-400" />
            <h3 className="text-xl font-semibold mt-4">Secure & Private</h3>
            <p className="text-gray-300 mt-2">Your financial data is encrypted and securely stored.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-gray-700/40 rounded-lg">
    <Zap size={40} className="text-blue-600" />
    <h3 className="text-xl font-semibold mt-4">Automated Insights</h3>
    <p className="text-gray-300 mt-2">Get automated financial insights and recommendations to improve your spending habits.</p>
  </div>
  <div className="flex flex-col items-center text-center p-6 bg-gray-700/40 rounded-lg">
    <CreditCard size={40} className="text-blue-600" />
    <h3 className="text-xl font-semibold mt-4">Multi-Account Support</h3>
    <p className="text-gray-300 mt-2">Manage multiple accounts and credit cards in one place for better control.</p>
  </div>
  <div className="flex flex-col items-center text-center p-6 bg-gray-700/40 rounded-lg">
    <PieChart size={40} className="text-blue-600" />
    <h3 className="text-xl font-semibold mt-4">Budget Planning</h3>
    <p className="text-gray-300 mt-2">Create and manage budgets with intelligent recommendations tailored for students.</p>
  </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
