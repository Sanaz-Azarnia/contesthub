import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Trophy } from "lucide-react"

const topPlayers = [
  { rank: 1, name: "Alex Chen", score: 9850, avatar: "AC" },
  { rank: 2, name: "Sarah Kim", score: 9420, avatar: "SK" },
  { rank: 3, name: "Mike Ross", score: 9100, avatar: "MR" },
]

export default function TopPlayersSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Top Champions</h2>
          <p className="text-slate-400">The best of the best this week</p>
        </div>
        
        <div className="flex flex-col md:flex-row items-end justify-center gap-4 md:gap-6">
          {/* Rank 2 */}
          <div className="flex flex-col items-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 w-full md:w-56">
            <div className="h-16 w-16 rounded-full bg-slate-300 flex items-center justify-center text-slate-700 font-bold text-xl mb-3">
              {topPlayers[1].avatar}
            </div>
            <div className="text-2xl font-bold text-slate-300 mb-1">#2</div>
            <p className="font-semibold">{topPlayers[1].name}</p>
            <p className="text-amber-400 font-bold">{topPlayers[1].score.toLocaleString()} pts</p>
          </div>
          
          {/* Rank 1 */}
          <div className="flex flex-col items-center p-8 rounded-2xl bg-gradient-to-b from-amber-500/20 to-transparent border border-amber-500/30 w-full md:w-64 md:-mt-8">
            <div className="h-20 w-20 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 flex items-center justify-center text-amber-900 font-bold text-2xl mb-3 shadow-lg shadow-amber-500/30">
              {topPlayers[0].avatar}
            </div>
            <Trophy className="h-6 w-6 text-amber-400 mb-2" />
            <div className="text-3xl font-bold text-amber-400 mb-1">#1</div>
            <p className="font-semibold text-lg">{topPlayers[0].name}</p>
            <p className="text-amber-400 font-bold text-lg">{topPlayers[0].score.toLocaleString()} pts</p>
          </div>
          
          {/* Rank 3 */}
          <div className="flex flex-col items-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 w-full md:w-56">
            <div className="h-16 w-16 rounded-full bg-amber-700/50 flex items-center justify-center text-amber-200 font-bold text-xl mb-3">
              {topPlayers[2].avatar}
            </div>
            <div className="text-2xl font-bold text-amber-700 mb-1">#3</div>
            <p className="font-semibold">{topPlayers[2].name}</p>
            <p className="text-amber-400 font-bold">{topPlayers[2].score.toLocaleString()} pts</p>
          </div>
        </div>
        
        <div className="text-center mt-10">
          <Link href="/leaderboard">
            <Button variant="outline" className="border-white/20 text-black hover:text-white hover:bg-white/10 rounded-xl px-6">
              View Full Leaderboard
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}