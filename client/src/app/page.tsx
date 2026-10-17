import CategoriesSection from "@/components/home/Categories";
import HeroSection from "@/components/home/Hero";
import HowItWorksSection from "@/components/home/Howitworks";
import StatsSection from "@/components/home/Stats";
import TopPlayersSection from "@/components/home/TopPlayers";




export default function Home() {
  return (
    <div>
      <HeroSection />
      <StatsSection />
      <CategoriesSection />
      <HowItWorksSection />
      <TopPlayersSection />
       
    </div>
  );
}
