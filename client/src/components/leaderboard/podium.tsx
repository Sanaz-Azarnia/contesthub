"use client"

import PodiumCard from "@/components/leaderboard/PodiumCard"
import type { LeaderboardEntry } from "@/types/leaderboard"

interface Props {
  entries: LeaderboardEntry[]
}

export default function Podium({ entries }: Props) {
  const top3 = entries.slice(0, 3)
  if (!top3.length) return null

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 mb-12">
      {top3[1] && (
        <PodiumCard
          rank={2}
          username={top3[1].username}
          score={top3[1].totalScore}
          accuracy={top3[1].accuracy}
        />
      )}
      {top3[0] && (
        <PodiumCard
          rank={1}
          username={top3[0].username}
          score={top3[0].totalScore}
          accuracy={top3[0].accuracy}
        />
      )}
      {top3[2] && (
        <PodiumCard
          rank={3}
          username={top3[2].username}
          score={top3[2].totalScore}
          accuracy={top3[2].accuracy}
        />
      )}
    </div>
  )
}