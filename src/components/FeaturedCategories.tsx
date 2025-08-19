"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Music, 
  Code, 
  Globe, 
  Palette, 
  TrendingUp, 
  Heart,
  Camera,
  BookOpen
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const FeaturedCategories = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const categories = [
    {
      icon: Music,
      title: t('categories.items.music.title'),
      description: t('categories.items.music.description'),
      count: t('categories.items.music.count'),
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50",
      hoverColor: "hover:bg-pink-100",
    },
    {
      icon: Code,
      title: t('categories.items.technology.title'),
      description: t('categories.items.technology.description'),
      count: t('categories.items.technology.count'),
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      hoverColor: "hover:bg-blue-100",
    },
    {
      icon: Globe,
      title: t('categories.items.language.title'),
      description: t('categories.items.language.description'),
      count: t('categories.items.language.count'),
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      hoverColor: "hover:bg-green-100",
    },
    {
      icon: Palette,
      title: t('categories.items.design.title'),
      description: t('categories.items.design.description'),
      count: t('categories.items.design.count'),
      color: "from-purple-500 to-violet-500",
      bgColor: "bg-purple-50",
      hoverColor: "hover:bg-purple-100",
    },
    {
      icon: TrendingUp,
      title: t('categories.items.marketing.title'),
      description: t('categories.items.marketing.description'),
      count: t('categories.items.marketing.count'),
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      hoverColor: "hover:bg-orange-100",
    },
    {
      icon: Heart,
      title: t('categories.items.personal.title'),
      description: t('categories.items.personal.description'),
      count: t('categories.items.personal.count'),
      color: "from-teal-500 to-cyan-500",
      bgColor: "bg-teal-50",
      hoverColor: "hover:bg-teal-100",
    },
    {
      icon: Camera,
      title: t('categories.items.photography.title'),
      description: t('categories.items.photography.description'),
      count: t('categories.items.photography.count'),
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-50",
      hoverColor: "hover:bg-indigo-100",
    },
    {
      icon: BookOpen,
      title: t('categories.items.education.title'),
      description: t('categories.items.education.description'),
      count: t('categories.items.education.count'),
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-50",
      hoverColor: "hover:bg-amber-100",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="categories" className="py-20 bg-gray-50 dark:bg-gray-800" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('categories.title')} <span className="text-primary">{t('categories.titleHighlight')}</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('categories.subtitle')}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                className="group cursor-pointer"
              >
                <Card className={`h-full ${category.bgColor} dark:bg-gray-700 ${category.hoverColor} dark:hover:bg-gray-600 border-0 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:border-primary/20`}>
                  <CardContent className="p-6 text-center">
                    {/* Icon Container */}
                    <motion.div
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${category.color} text-white mb-4 shadow-lg`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8 }}
                    >
                      <Icon className="w-8 h-8" />
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 leading-relaxed">
                      {category.description}
                    </p>
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 group-hover:text-primary/80 transition-colors">
                      {category.count}
                    </p>

                    {/* Hover Effect Indicator */}
                    <motion.div
                      className="w-0 h-0.5 bg-gradient-to-r from-primary to-accent mx-auto mt-4 group-hover:w-12 transition-all duration-300"
                    />
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-lg max-w-4xl mx-auto border border-gray-100 dark:border-gray-600">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              {t('categories.ctaTitle')}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-6 leading-relaxed">
              {t('categories.ctaDescription')}
            </p>
            <motion.button
              className="bg-gradient-to-r from-primary to-accent text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('categories.ctaButton')}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
