"use client"

import { useState, useEffect, useCallback } from "react"
import LeaderboardHeader from "@/components/leaderboard/leaderboard-header"
import FilterBar from "@/components/leaderboard/leaderboard-filter-bar"
import Podium from "@/components/leaderboard/podium"
import LeaderboardTableWrapper from "@/components/leaderboard/leaderboard-table-wrapper"
import { fetchLeaderboard } from "@/lib/leaderboard-fetch"
import type { LeaderboardEntry } from "@/types/leaderboard"

interface Props {
  initialEntries: LeaderboardEntry[]
  initialPeriod: string
}

export default function LeaderboardClient({ initialEntries, initialPeriod }: Props) {
  const [entries, setEntries] = useState(initialEntries)
  const [loading, setLoading] = useState(false)
  const [period, setPeriod] = useState(initialPeriod)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const data = await fetchLeaderboard(period, "")
      setEntries(data)
    } finally {
      setLoading(false)
    }
  }, [period])

  useEffect(() => {
    load()
  }, [load])

  const rest = entries.slice(3)

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <LeaderboardHeader />
        <FilterBar period={period} onPeriodChange={setPeriod} />
        <Podium entries={entries} />
        <LeaderboardTableWrapper entries={rest} loading={loading} />
      </div>
    </div>
  )
}