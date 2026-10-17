import { redirect } from "next/navigation"

const BASE = process.env.NEXT_PUBLIC_BACKEND_URL

function getHeaders(token: string) {
  return { Authorization: `Bearer ${token}` }
}

async function check401(res: Response) {
  if (res.status === 401) redirect("/login")
  if (!res.ok) throw new Error(await res.text())
}

export async function fetchProfile(token: string) {
  const res = await fetch(`${BASE}/api/user/profile`, {
    headers: getHeaders(token),
    cache: "no-store",
  })
  await check401(res)
  return res.json()
}

export async function fetchStats(token: string) {
  const res = await fetch(`${BASE}/api/user/stats`, {
    headers: getHeaders(token),
    cache: "no-store",
  })
  await check401(res)
  return res.json()
}

export async function fetchContests(token: string) {
  const res = await fetch(`${BASE}/api/user/contests`, {
    headers: getHeaders(token),
    cache: "no-store",
  })
  await check401(res)
  return res.json()
}