"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { 
  BarChart3, 
  Receipt, 
  PieChart, 
  CreditCard, 
  Zap, 
  ShieldCheck,
  Star,
  TrendingUp,
  Users,
  Award,
  ChevronRight,
  Play,
  Check
} from "lucide-react";
import { FaStar } from "react-icons/fa";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

// Sample data for the enhanced landing page
const heroImages = [
  "/banner.png",
  "/hero-1.jpeg",
  "/hero-2.jpg",
];

const features = [
  {
    icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
    title: "Advanced Analytics",
    description: "Get detailed insights into your spending patterns with AI-powered analytics",
    color: "bg-blue-50 border-blue-200"
  },
  {
    icon: <Receipt className="h-8 w-8 text-green-600" />,
    title: "Smart Receipt Scanner",
    description: "Extract data automatically from receipts using advanced AI technology",
    color: "bg-green-50 border-green-200"
  },
  {
    icon: <PieChart className="h-8 w-8 text-purple-600" />,
    title: "Budget Planning",
    description: "Create and manage budgets with intelligent recommendations",
    color: "bg-purple-50 border-purple-200"
  },
  {
    icon: <CreditCard className="h-8 w-8 text-orange-600" />,
    title: "Multiple Accounts",
    description: "Track expenses across different accounts and payment methods",
    color: "bg-orange-50 border-orange-200"
  },
  {
    icon: <Zap className="h-8 w-8 text-yellow-600" />,
    title: "Real-time Sync",
    description: "Instant synchronization across all your devices",
    color: "bg-yellow-50 border-yellow-200"
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-red-600" />,
    title: "Bank-level Security",
    description: "Your financial data is protected with enterprise-grade security",
    color: "bg-red-50 border-red-200"
  }
];

const stats = [
  { value: "50K+", label: "Active Users", icon: <Users className="h-6 w-6" /> },
  { value: "$2B+", label: "Transactions Tracked", icon: <TrendingUp className="h-6 w-6" /> },
  { value: "99.9%", label: "Uptime", icon: <Zap className="h-6 w-6" /> },
  { value: "4.9/5", label: "User Rating", icon: <Star className="h-6 w-6" /> }
];

const initialReviews = [
  {
    name: "Amira Perera",
    rating: 5,
    comment: "FinMentor has completely transformed how I manage my university expenses. The AI-powered insights helped me save 30% on my monthly budget!",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5ad?w=100&h=100&fit=crop&crop=face",
    university: "University of Colombo"
  },
  {
    name: "Kasun Silva",
    rating: 5,
    comment: "As a student with limited income, this app helps me track every rupee. The receipt scanner is a game-changer!",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    university: "University of Peradeniya"
  },
  {
    name: "Nimali Fernando",
    rating: 4,
    comment: "Love the intuitive interface and the detailed analytics. Perfect for university students like me!",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    university: "SLIIT"
  },
  {
    name: "Rajitha Bandara",
    rating: 5,
    comment: "The budgeting features are incredible. I can finally plan my expenses properly and save for important things.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    university: "University of Moratuwa"
  },
  {
    name: "Sachini Kumari",
    rating: 5,
    comment: "FinMentor made financial planning so simple. The AI suggestions are spot-on!",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    university: "University of Kelaniya"
  }
];

const LandingPage = () => {
  const [reviews, setReviews] = useState(initialReviews);
  const [newReview, setNewReview] = useState({ name: "", comment: "", rating: 0, university: "" });
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmitReview = () => {
    if (newReview.name && newReview.comment && newReview.rating > 0 && newReview.university) {
      const review = {
        ...newReview,
        avatar: `https://images.unsplash.com/photo-unique-id?w=100&h=100&fit=crop&crop=face` // Replaced Date.now() with a static unique identifier
      };
      setReviews([review, ...reviews]);
      setNewReview({ name: "", comment: "", rating: 0, university: "" });
      setHoverRating(0);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Sliding Images */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <Badge className="mb-6 bg-blue-600/20 text-blue-200 border-blue-400">
                🎓 Built for Sri Lankan Students
              </Badge>
              
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
                Take Control of Your{" "}
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Student Finances
                </span>
              </h1>
              
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                The most advanced expense tracking platform designed specifically for Sri Lankan university students. 
                Track, analyze, and optimize your spending with AI-powered insights.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/sign-up">
                  <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                    Start Free Today
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg backdrop-blur-sm"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </div>

              {/* Stats */}
              <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="flex justify-center mb-2 text-blue-300">
                      {stat.icon}
                    </div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-blue-200 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Content - Sliding Images */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <Swiper
                modules={[Navigation, Pagination, Autoplay, EffectFade]}
                effect="fade"
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                pagination={{
                  clickable: true,
                }}
                className="rounded-2xl shadow-2xl overflow-hidden"
              >
                {heroImages.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative h-96 lg:h-[500px]">
                      <Image
                        src={image}
                        alt={`FinMentor Feature ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-blue-100 text-blue-800">
              ✨ Powerful Features
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Everything You Need to Master Your Finances
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the tools that make FinMentor the choice of thousands of Sri Lankan students
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Card className={`h-full border-2 ${feature.color} hover:shadow-xl transition-all duration-300`}>
                  <CardContent className="p-8">
                    <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Auto-sliding Reviews Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-yellow-100 text-yellow-800">
              ⭐ Student Reviews
            </Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              What Sri Lankan Students Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of students who are already mastering their finances with FinMentor
            </p>
          </motion.div>

          {/* Auto-sliding Reviews */}
          <div className="mb-16">
            <Swiper
              modules={[Autoplay, Navigation]}
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
              }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              className="pb-12"
            >
              {reviews.map((review, index) => (
                <SwiperSlide key={index}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <Card className="h-full hover:shadow-xl transition-shadow duration-300">
                      <CardContent className="p-8">
                        <div className="flex items-center mb-4">
                          <Image
                            src={review.avatar}
                            alt={review.name}
                            width={60}
                            height={60}
                            className="rounded-full mr-4"
                          />
                          <div>
                            <h4 className="font-bold text-gray-900">{review.name}</h4>
                            <p className="text-sm text-blue-600">{review.university}</p>
                          </div>
                        </div>
                        
                        <div className="flex mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${
                                i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        
                        <p className="text-gray-600 italic leading-relaxed">"{review.comment}"</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Add Review Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-center mb-6 text-gray-900">
                  Share Your Experience
                </h3>
                
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Your Name"
                      value={newReview.name}
                      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                      className="border-2 border-blue-200 focus:border-blue-400"
                    />
                    <Input
                      placeholder="Your University"
                      value={newReview.university}
                      onChange={(e) => setNewReview({ ...newReview, university: e.target.value })}
                      className="border-2 border-blue-200 focus:border-blue-400"
                    />
                  </div>
                  
                  <Textarea
                    placeholder="Write your review..."
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    className="border-2 border-blue-200 focus:border-blue-400 min-h-[120px]"
                  />
                  
                  <div className="flex justify-center items-center space-x-2">
                    <span className="text-gray-700 font-medium">Rating:</span>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        size={24}
                        className={`cursor-pointer transition-colors ${
                          (hoverRating || newReview.rating) >= star 
                            ? "text-yellow-400" 
                            : "text-gray-300"
                        }`}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                      />
                    ))}
                  </div>
                  
                  <Button 
                    onClick={handleSubmitReview}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3"
                    disabled={!newReview.name || !newReview.comment || !newReview.rating || !newReview.university}
                  >
                    <Check className="mr-2 h-5 w-5" />
                    Submit Review
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-300/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to Transform Your Financial Future?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join over 50,000 Sri Lankan students who are already taking control of their finances with FinMentor. 
              Start your journey to financial freedom today!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/sign-up">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-12 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  Start Your Free Journey
                  <Award className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            <div className="mt-8 flex justify-center items-center space-x-8 text-blue-200">
              <div className="flex items-center">
                <Check className="h-5 w-5 mr-2" />
                Free Forever
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 mr-2" />
                No Credit Card Required
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 mr-2" />
                Start in 30 Seconds
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
