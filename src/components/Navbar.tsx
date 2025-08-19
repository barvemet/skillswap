"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "./LanguageSelector";
import { ThemeToggle } from "./ThemeToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/lib/supabase";
import { AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<{name?: string} | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Supabase session'ı kontrol et
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser({ name: session.user.user_metadata?.full_name || session.user.email });
        }
      } catch (error) {
        console.error("Session check error:", error);
      }
    };

    checkSession();

    // Auth state değişikliklerini dinle
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser({ name: session.user.user_metadata?.full_name || session.user.email });
        } else {
          setUser(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-700"
          : "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              SkillSwap
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#categories"
              className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
            >
              {t('nav.categories')}
            </a>
            <a
              href="#how-it-works"
              className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
            >
              {t('nav.howItWorks')}
            </a>
            <a
              href="#testimonials"
              className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
            >
              {t('nav.testimonials')}
            </a>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            <ThemeToggle />

            {user ? (
              <div className="flex items-center space-x-3">
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  {user.name}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-gray-700 dark:text-gray-300 hover:text-red-600"
                >
                  {t('nav.logout')}
                </Button>
              </div>
            ) : (
              <>
                <Button
                  variant="ghost"
                  className="text-gray-900 dark:text-gray-100 hover:text-blue-600 hover:bg-blue-50 dark:hover:text-primary dark:hover:bg-transparent"
                  onClick={() => {
                    const currentLang = localStorage.getItem('skillswap_language') || 'tr';
                    window.location.href = `/${currentLang}/login`;
                  }}
                >
                  {t('nav.login')}
                </Button>
                <Button
                  className="bg-primary hover:bg-primary/90 text-white"
                  onClick={() => {
                    const currentLang = localStorage.getItem('skillswap_language') || 'tr';
                    window.location.href = `/${currentLang}/register`;
                  }}
                >
                  {t('nav.register')}
                </Button>
              </>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200 dark:border-gray-700"
            >
              <div className="py-4 space-y-4">
                <a
                  href="#categories"
                  className="block text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('nav.categories')}
                </a>
                <a
                  href="#how-it-works"
                  className="block text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('nav.howItWorks')}
                </a>
                <a
                  href="#testimonials"
                  className="block text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t('nav.testimonials')}
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
