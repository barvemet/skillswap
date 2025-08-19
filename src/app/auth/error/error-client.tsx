"use client";

import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowLeft, RefreshCw } from "lucide-react";

function getErrorMessage(errorCode: string | null) {
  switch (errorCode) {
    case "Configuration":
      return "Sunucu yapılandırma hatası. Lütfen daha sonra tekrar deneyin.";
    case "AccessDenied":
      return "Erişim reddedildi. Giriş yapmaya çalıştığınız hesap bu uygulamaya erişim izni yok.";
    case "Verification":
      return "Doğrulama hatası. E-posta doğrulama linki geçersiz veya süresi dolmuş.";
    default:
      return "Kimlik doğrulama sırasında bir hata oluştu. Lütfen tekrar deneyin.";
  }
}

export default function ErrorClient() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const handleRetry = () => (window.location.href = "/login");
  const handleGoHome = () => (window.location.href = "/");

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center space-y-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4"
            >
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </motion.div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Kimlik Doğrulama Hatası
            </CardTitle>
            <CardDescription className="text-gray-600">
              {getErrorMessage(error)}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {error && (
              <div className="p-4 bg-gray-100 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Hata Kodu:</strong> {error}
                </p>
              </div>
            )}

            <div className="space-y-3">
              <Button
                onClick={handleRetry}
                className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold py-3"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Tekrar Dene
              </Button>

              <Button
                variant="outline"
                onClick={handleGoHome}
                className="w-full border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Ana Sayfaya Dön
              </Button>
            </div>

            <div className="text-center text-sm text-gray-500">
              Sorun devam ederse lütfen destek ekibiyle iletişime geçin.
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
