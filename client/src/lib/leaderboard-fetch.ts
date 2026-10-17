"use server"

import { redirect } from "next/navigation"

const BASE = process.env.NEXT_PUBLIC_BACKEND_URL

async function check401(res: Response) {
  if (res.status === 401) redirect("/login")
  if (!res.ok) throw new Error(await res.text())
}

export async function fetchLeaderboard(period: string, category: string) {
  const params = new URLSearchParams()
  if (period && period !== "all") params.append("period", period)
  if (category) params.append("category", category)

  const res = await fetch(`${BASE}/api/leaderboard?${params}`, { cache: "no-store" })
  await check401(res)
  return res.json()
}