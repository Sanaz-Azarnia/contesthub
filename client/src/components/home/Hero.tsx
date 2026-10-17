import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Flame, ArrowRight } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 text-white py-24 px-4">
      {/* Pattern Background - Fixed with single quotes */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />
      
      <div className="max-w-7xl mx-auto relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
          <Flame className="h-4 w-4 text-amber-300" />
          <span className="text-sm font-medium">Join 1,000+ Players</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
          Test Your <span className="text-amber-300">Knowledge</span>
          <br />Climb the Ranks
        </h1>
        
        <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto mb-10">
          Compete in thousands of trivia questions across multiple categories. 
          Track your scores, challenge friends, and become the ultimate champion.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contests">
            <Button size="lg" className="bg-white text-indigo-700 hover:bg-indigo-50 font-semibold px-8 py-6 text-lg rounded-xl shadow-xl shadow-black/20 hover:shadow-2xl hover:-translate-y-1 transition-all">
              Start Competing
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/leaderboard">
            <Button size="lg" variant="outline" className="border-white/30 text-black hover:text-white hover:bg-white/10 font-semibold px-8 py-6 text-lg rounded-xl backdrop-blur-sm">
              View Leaderboard
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}