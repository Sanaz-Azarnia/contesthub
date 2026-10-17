import { Trophy, Medal, Award } from "lucide-react"

interface PodiumCardProps {
  rank: number
  username: string
  score: number
  accuracy: number
}

export default function PodiumCard({ rank, username, score, accuracy }: PodiumCardProps) {
  const configs = {
    1: {
      icon: Trophy,
      bg: "bg-gradient-to-b from-amber-400 to-amber-600",
      text: "text-amber-900",
      border: "border-amber-400",
      shadow: "shadow-amber-400/30",
      height: "h-32",
      size: "h-20 w-20 text-2xl",
    },
    2: {
      icon: Medal,
      bg: "bg-gradient-to-b from-slate-300 to-slate-400",
      text: "text-slate-800",
      border: "border-slate-300",
      shadow: "shadow-slate-400/20",
      height: "h-24",
      size: "h-16 w-16 text-xl",
    },
    3: {
      icon: Award,
      bg: "bg-gradient-to-b from-amber-700 to-amber-800",
      text: "text-amber-100",
      border: "border-amber-700",
      shadow: "shadow-amber-700/20",
      height: "h-20",
      size: "h-16 w-16 text-xl",
    },
  }

  const config = configs[rank as keyof typeof configs]
  const Icon = config.icon

  return (
    <div className={`flex flex-col items-center flex-1 ${rank === 1 ? "md:-mt-8" : ""}`}>
      <div className={`${config.height} w-full flex items-end justify-center mb-4`}>
        <div className={`${config.size} rounded-full ${config.bg} flex items-center justify-center font-bold shadow-lg ${config.shadow}`}>
          <Icon className={`h-8 w-8 ${rank === 1 ? "text-amber-100" : "text-white"}`} />
        </div>
      </div>
      <div className={`w-full p-6 rounded-2xl bg-white border-2 ${config.border} shadow-xl text-center`}>
        <div className={`text-3xl font-bold mb-1 ${rank === 1 ? "text-amber-500" : rank === 2 ? "text-slate-500" : "text-amber-700"}`}>
          #{rank}
        </div>
        <p className="font-semibold text-slate-900 mb-1">{username}</p>
        <p className="text-2xl font-bold text-indigo-600 mb-1">{score.toLocaleString()}</p>
        <p className="text-sm text-slate-500">{accuracy}% accuracy</p>
      </div>
    </div>
  )
}