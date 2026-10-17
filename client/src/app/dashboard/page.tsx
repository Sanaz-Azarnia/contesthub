import { redirect } from "next/navigation"
import { auth } from "../../../auth"
import { fetchProfile, fetchStats, fetchContests } from "@/lib/dashboard-fetch"
import DashboardClient from "@/components/dashboard/dashboard-client"

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user) redirect("/login")

  const token = session.backendToken as string

  const [profile, stats, contests] = await Promise.all([
    fetchProfile(token),
    fetchStats(token),
    fetchContests(token),
  ])

  return (
    <DashboardClient
      profile={profile}
      stats={stats}
      contests={contests}
    />
  )
}