"use client"

import { Trophy } from "lucide-react"

export default function LeaderboardHeader() {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-4">
        <Trophy className="h-4 w-4" />
        Leaderboard
      </div>
      <h1 className="text-4xl font-bold text-slate-900 mb-2">Top Champions</h1>
      <p className="text-slate-500">See who is leading the competition</p>
    </div>
  )
}