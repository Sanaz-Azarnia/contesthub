"use client"

import ProfileHeader from "@/components/dashboard/profile-header"
import StatsCards from "@/components/dashboard/stats-cards"
import ContestHistory from "@/components/dashboard/contest-history"
import type { Profile, Stats, Contest } from "@/types/dashboard"

interface Props {
  profile: Profile
  stats: Stats
  contests: Contest[]
}

export default function DashboardClient({ profile, stats, contests }: Props) {
  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <ProfileHeader profile={profile} />
        <StatsCards stats={stats} />
        <ContestHistory contests={contests} />
      </div>
    </div>
  )
}