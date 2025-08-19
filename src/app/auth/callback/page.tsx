"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

export default function AuthCallback() {
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Auth callback error:", error);
          toast({
            variant: "destructive",
            title: "Hata",
            description: "Kimlik doğrulama sırasında bir hata oluştu",
          });
          router.push("/login");
          return;
        }

        if (data.session) {
          // Kullanıcı bilgilerini localStorage'a kaydet
          const user = data.session.user;
          localStorage.setItem('skillswap_session', JSON.stringify(data.session));
          localStorage.setItem('skillswap_user', JSON.stringify({
            id: user.id,
            email: user.email,
            name: user.user_metadata?.name || user.email?.split('@')[0]
          }));

          toast({
            title: "Başarılı!",
            description: "Google ile başarıyla giriş yapıldı",
          });

          // Ana sayfaya yönlendir
          setTimeout(() => {
            router.push("/");
          }, 1500);
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error("Auth callback error:", error);
        router.push("/login");
      }
    };

    handleAuthCallback();
  }, [router, toast]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl font-bold text-white">S</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Giriş Yapılıyor
        </h1>
        <p className="text-gray-600 mb-4">
          Google hesabınızla giriş yapılıyor, lütfen bekleyin...
        </p>
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  );
}
