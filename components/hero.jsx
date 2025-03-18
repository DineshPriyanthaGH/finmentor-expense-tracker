"use client";

import Link from "next/link"; // Correct import
import React, { useEffect, useRef } from "react"; // Import useEffect here
import { Button } from "@/components/ui/button";
import Image from "next/image";

const HeroSection = () => {
  const imageRef = useRef();
  
  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      }else{
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);


    return () => {
        window.removeEventListener("scroll", handleScroll);
    }

    // Cleanup the event listener when component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array to only run once on mount

  return (
    <div className="pb-20 px-4">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl md:text-8xl lg:text-[105px] pb-6 gradient-title">
          Manage Your Expenses
          <br /> Intelligently with AI-powered Insights
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          FinMentor - Harness the power of AI to track, analyze, and optimize your
          spending. Get smart recommendations, detect patterns, and make informed
          financial decisions effortlessly!
        </p>
        <div className="flex justify-center ">
          <Link href="/dashboard">
            <Button size="lg" className="px-8">Get Started</Button>
          </Link>
        </div>
        <div className="hero-image-wrapper">
          <div ref={imageRef} className="hero-image">
            <Image 
              src="/banner.png"
              alt="Dashboard Preview"
              width={1280}
              height={780}
              className="rounded-lg shadow-2xl border mx-auto" // Fixed typo "boarder" to "border"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
