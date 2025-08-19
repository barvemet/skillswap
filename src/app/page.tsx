import HeroSection from "@/components/HeroSection";
import FeaturedCategories from "@/components/FeaturedCategories";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <FeaturedCategories />
      <HowItWorks />
      <Testimonials />
    </main>
  );
}
