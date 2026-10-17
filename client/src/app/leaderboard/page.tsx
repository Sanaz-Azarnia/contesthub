import { fetchLeaderboard } from "@/lib/leaderboard-fetch"
import LeaderboardClient from "@/components/leaderboard/leaderboard-client"

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function LeaderboardPage({ searchParams }: Props) {
  const params = await searchParams
  const period = typeof params.period === "string" ? params.period : "all"

  const entries = await fetchLeaderboard(period, "")

  return (
    <LeaderboardClient
      initialEntries={entries}
      initialPeriod={period}
    />
  )
}