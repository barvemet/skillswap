"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useLanguage } from "@/contexts/LanguageContext";


const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<{name?: string} | null>(null);
  const { t } = useLanguage();



  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Kullanıcı bilgisini localStorage'dan al
    const userData = localStorage.getItem('skillswap_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('skillswap_session');
    localStorage.removeItem('skillswap_user');
    setUser(null);
    window.location.href = "/";
  };

  const navItems = [
    { name: t('nav.categories'), href: "#categories" },
    { name: t('nav.howItWorks'), href: "#how-it-works" },
    { name: t('nav.blog'), href: "#blog" },
  ];

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-700"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Skill<span className="text-primary">Swap</span>
            </h1>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="text-gray-900 dark:text-gray-100 hover:text-primary px-3 py-2 text-sm font-medium transition-colors duration-200"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSelector />
            <ThemeToggle />
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {user.name || "Kullanıcı"}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="text-gray-900 dark:text-gray-100 hover:text-red-600 hover:bg-red-50 dark:hover:text-red-400"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Çıkış
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
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-900 dark:text-gray-100 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
            >
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          height: isMobileMenuOpen ? "auto" : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-900 dark:text-gray-100 hover:text-primary block px-3 py-2 text-base font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
          <div className="flex flex-col space-y-2 px-3 pt-4">
            <div className="flex justify-center space-x-4 pb-2">
              <LanguageSelector />
              <ThemeToggle />
            </div>
            {user ? (
              <div className="space-y-2">
                <div className="flex items-center space-x-2 px-3 py-2">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {user.name || "Kullanıcı"}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="text-gray-900 dark:text-gray-100 hover:text-red-600 hover:bg-primary dark:hover:text-primary justify-start w-full"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Çıkış
                </Button>
              </div>
            ) : (
              <>
                <Button
                  variant="ghost"
                  className="text-gray-900 dark:text-gray-100 hover:text-blue-600 hover:bg-primary dark:hover:text-primary dark:hover:bg-transparent justify-start"
                  onClick={() => window.location.href = "/tr/login"}
                >
                  {t('nav.login')}
                </Button>
                <Button 
                  className="bg-primary hover:bg-primary/90 text-white w-full"
                  onClick={() => window.location.href = "/tr/register"}
                >
                  {t('nav.register')}
                </Button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
