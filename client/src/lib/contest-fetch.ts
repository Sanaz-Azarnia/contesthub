import { redirect } from "next/navigation"

const BASE = process.env.NEXT_PUBLIC_BACKEND_URL

async function check401(res: Response) {
  if (res.status === 401) redirect("/login")
  if (!res.ok) throw new Error(await res.text())
}

 
export async function fetchCategoriesWithCount() {
  const res = await fetch(`${BASE}/api/questions/categories-with-count`, { 
    cache: "no-store" 
  })
  await check401(res)
  return res.json()
}

 
export async function fetchQuestions(searchParams: Record<string, string>) {
  const params = new URLSearchParams(searchParams)
  const res = await fetch(`${BASE}/api/questions?${params}`, { cache: "no-store" })
  await check401(res)
  return res.json()  
}

export async function fetchCategories() {
  const res = await fetch(`${BASE}/api/questions/categories`, { cache: "no-store" })
  await check401(res)
  const data = await res.json()
  return data.filter((c: string) => c)
}

export async function fetchDifficulties() {
  const res = await fetch(`${BASE}/api/questions/difficulties`, { cache: "no-store" })
  await check401(res)
  const data = await res.json()
  return data.filter((d: string) => d)
}