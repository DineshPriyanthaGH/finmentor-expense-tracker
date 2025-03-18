"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import HeroSection from "@/components/hero";
import { featuresData, howItWorksData, statsData } from "@/data/landing";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"; 
import { FaStar } from "react-icons/fa";
import Link from "next/link";

export default function Home() {
  const [reviews, setReviews] = useState([]);
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [image, setImage] = useState("/default-avatar.png");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleReviewSubmit = () => {
    if (name.trim() && feedback.trim() && rating > 0) {
      const newReview = { name, feedback, image, rating };
      setReviews((prevReviews) => [...prevReviews, newReview]);
      setName("");
      setFeedback("");
      setRating(0);
    }
  };

  return (
    <div className="mt-40">
      <HeroSection />

      <section>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statsData.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-800">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 text-center mb-12">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything you need to manage your finance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuresData.map((feature, index) => (
              <Card key={index} className="p-6">
                <CardContent className="space-y-4 pt-4">
                  {feature.icon}
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4 text-center mb-12">
          <h2 className="text-3xl font-bold text-center mb-12">
            How FinMentor Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {howItWorksData.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  {step.icon}
                </div>
                <h3 className="font-bold">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What FinMentor Users Say</h2>

          <div className="max-w-lg mx-auto p-6 bg-gray-100 rounded-lg shadow-md mb-8">
            <h3 className="text-xl font-semibold mb-4">Leave a Review</h3>
            <Input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mb-4"
            />
            <Textarea
              placeholder="Write your review..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="mb-4"
            />

            <div className="flex justify-center mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  size={30}
                  className={`cursor-pointer ${
                    (hover || rating) >= star ? "text-yellow-500" : "text-gray-400"
                  }`}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>

            <Button onClick={handleReviewSubmit} className="w-full">
              Submit Review
            </Button>
          </div>

          {reviews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {reviews.map((review, index) => (
                <Card key={index} className="p-6">
                  <CardContent className="space-y-4 pt-4">
                    <div className="flex items-center space-x-4">
                      <Image
                        src={review.image}
                        alt={review.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <h4 className="font-semibold">{review.name}</h4>
                      </div>
                    </div>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          size={20}
                          className={`${
                            review.rating >= star ? "text-yellow-500" : "text-gray-400"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-600">{review.feedback}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600">
              <p className="text-lg">No reviews yet. Be the first to leave a review!</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center ">
          <h2 className="text-3xl font-bold text-center mb-4">
Ready to Take Control of Your Finance?          </h2>
<p className="text-blue-100 mb-8 max-w-2xl mx-auto">
Get started with FinMentor today and start making smarter financial decisions!
</p>
<Link href="/dashboard">
<Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50
 animate-bounce    ">Start Your Save</Button>
</Link>
          
        </div>
      </section>



    </div>
  );
}
