"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const { t } = useLanguage();

  const testimonials = [
    {
      id: 1,
      name: t('testimonials.users.ayse.name'),
      title: t('testimonials.users.ayse.title'),
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: t('testimonials.users.ayse.text'),
      skill_given: t('testimonials.users.ayse.skillGiven'),
      skill_received: t('testimonials.users.ayse.skillReceived'),
      duration: t('testimonials.users.ayse.duration'),
    },
    {
      id: 2,
      name: t('testimonials.users.mehmet.name'),
      title: t('testimonials.users.mehmet.title'),
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: t('testimonials.users.mehmet.text'),
      skill_given: t('testimonials.users.mehmet.skillGiven'),
      skill_received: t('testimonials.users.mehmet.skillReceived'),
      duration: t('testimonials.users.mehmet.duration'),
    },
    {
      id: 3,
      name: t('testimonials.users.zeynep.name'),
      title: t('testimonials.users.zeynep.title'),
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: t('testimonials.users.zeynep.text'),
      skill_given: t('testimonials.users.zeynep.skillGiven'),
      skill_received: t('testimonials.users.zeynep.skillReceived'),
      duration: t('testimonials.users.zeynep.duration'),
    },
    {
      id: 4,
      name: t('testimonials.users.can.name'),
      title: t('testimonials.users.can.title'),
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: t('testimonials.users.can.text'),
      skill_given: t('testimonials.users.can.skillGiven'),
      skill_received: t('testimonials.users.can.skillReceived'),
      duration: t('testimonials.users.can.duration'),
    },
    {
      id: 5,
      name: t('testimonials.users.elif.name'),
      title: t('testimonials.users.elif.title'),
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: t('testimonials.users.elif.text'),
      skill_given: t('testimonials.users.elif.skillGiven'),
      skill_received: t('testimonials.users.elif.skillReceived'),
      duration: t('testimonials.users.elif.duration'),
    },
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-900" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('testimonials.title')} <span className="text-primary">{t('testimonials.titleHighlight')}</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial Card */}
          <div className="relative h-96 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Card className="h-full bg-gradient-to-br from-primary/5 to-accent/5 border-0 shadow-xl">
                  <CardContent className="p-8 h-full flex flex-col justify-center">
                    <div className="text-center">
                      {/* Quote Icon */}
                      <Quote className="w-12 h-12 text-primary/30 mx-auto mb-6" />
                      
                      {/* Rating */}
                      <div className="flex justify-center mb-6">
                        {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>

                      {/* Testimonial Text */}
                      <blockquote className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8 italic">
                        &quot;{testimonials[currentIndex].text}&quot;
                      </blockquote>

                      {/* User Info */}
                      <div className="flex items-center justify-center space-x-4">
                        <img
                          src={testimonials[currentIndex].avatar}
                          alt={testimonials[currentIndex].name}
                          className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                        />
                        <div className="text-left">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {testimonials[currentIndex].name}
                          </h4>
                          <p className="text-gray-600 dark:text-gray-400">
                            {testimonials[currentIndex].title}
                          </p>
                        </div>
                      </div>

                      {/* Skills Exchange Info */}
                      <div className="mt-6 flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-600">
                        <div className="flex items-center space-x-2">
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            {t('testimonials.skillLabels.taught')} {testimonials[currentIndex].skill_given}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            {t('testimonials.skillLabels.learned')} {testimonials[currentIndex].skill_received}
                          </span>
                        </div>
                        <div className="text-gray-500 dark:text-gray-400">
                          {testimonials[currentIndex].duration}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 shadow-lg border-gray-200 dark:border-gray-600"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 shadow-lg border-gray-200 dark:border-gray-600"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-primary scale-125"
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center"
        >
                     {[
             { number: "10,000+", label: t('testimonials.stats.happyUsers'), color: "text-green-600" },
             { number: "25,000+", label: t('testimonials.stats.successfulSwaps'), color: "text-blue-600" },
             { number: "4.9/5", label: t('testimonials.stats.averageRating'), color: "text-yellow-600" },
           ].map((stat, index) => (
            <motion.div
              key={index}
              className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className={`text-4xl font-bold mb-2 ${stat.color}`}>
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-300 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
