import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Basit validasyon
    if (!email || !password) {
      return NextResponse.json(
        { error: "E-posta ve şifre gerekli" },
        { status: 400 }
      );
    }

    // Supabase ile giriş yap
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Supabase login error:", error);
      return NextResponse.json(
        { error: error.message || "E-posta veya şifre hatalı" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        message: "Başarıyla giriş yapıldı!",
        user: { 
          id: data.user?.id, 
          email: data.user?.email, 
          name: data.user?.user_metadata?.name 
        },
        session: data.session
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Giriş sırasında bir hata oluştu" },
      { status: 500 }
    );
  }
}
