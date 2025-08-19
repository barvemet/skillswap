"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface AuthWrapperProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export function AuthWrapper({ children, requireAuth = false }: AuthWrapperProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    // Supabase session'ı kontrol et
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          setError(error);
        } else {
          setSession(session);
        }
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  // Error handling
  useEffect(() => {
    if (error) {
      console.error("Session error:", error);
      // Error durumunda session'ı temizle
      if (typeof window !== "undefined") {
        try {
          localStorage.removeItem("next-auth.session-token");
          localStorage.removeItem("next-auth.csrf-token");
          sessionStorage.clear();
        } catch (e) {
          console.error("Error clearing storage:", e);
        }
      }
    }
  }, [error]);

  // Loading durumu
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  // Authentication gerekli ve kullanıcı giriş yapmamış
  if (requireAuth && !session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Giriş Gerekli
          </h1>
          <p className="text-gray-600 mb-6">
            Bu sayfayı görüntülemek için giriş yapmanız gerekiyor.
          </p>
          <button
            onClick={() => window.location.href = "/login"}
            className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold py-3 px-6 rounded-lg"
          >
            Giriş Yap
          </button>
        </div>
      </div>
    );
  }

  // Error durumu
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Oturum Hatası
          </h1>
          <p className="text-gray-600 mb-6">
            Oturum bilgilerinizde bir hata oluştu. Lütfen tekrar giriş yapın.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold py-3 px-6 rounded-lg"
          >
            Sayfayı Yenile
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
