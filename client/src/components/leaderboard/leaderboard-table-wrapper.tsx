"use client"

import { Skeleton } from "@/components/ui/skeleton"
import LeaderboardTable from "@/components/leaderboard/LeaderboardTable"
import type { LeaderboardEntry } from "@/types/leaderboard"

interface Props {
  entries: LeaderboardEntry[]
  loading: boolean
}

export default function LeaderboardTableWrapper({ entries, loading }: Props) {
  if (loading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full rounded-xl" />
        ))}
      </div>
    )
  }

  if (!entries.length) {
    return (
      <div className="text-center py-12 text-slate-500">
        No entries yet. Be the first to compete!
      </div>
    )
  }

  return <LeaderboardTable entries={entries} />
}