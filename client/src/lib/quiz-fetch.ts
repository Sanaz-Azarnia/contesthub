import { redirect } from "next/navigation"

const BASE = process.env.NEXT_PUBLIC_BACKEND_URL

function getHeaders(token: string) {
  return { Authorization: `Bearer ${token}` }
}

async function check401(res: Response) {
  if (res.status === 401) redirect("/login")
  if (!res.ok) throw new Error(await res.text())
}

export async function fetchQuestions(token: string, category: string, difficulty: string, count: number = 10) {
  const params = new URLSearchParams()
  params.append("count", count.toString())
  if (category) params.append("category", category)
  if (difficulty) params.append("difficulty", difficulty)

  const res = await fetch(`${BASE}/api/gameplay/questions?${params}`, {
    headers: getHeaders(token),
    cache: "no-store",
  })
  await check401(res)
  return res.json()
}

export async function submitAnswer(token: string, questionId: number, selectedAnswer: string, timeTaken: number) {
  const res = await fetch(`${BASE}/api/gameplay/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getHeaders(token),
    },
    body: JSON.stringify({ questionId, selectedAnswer, timeTaken }),
  })
  await check401(res)
  return res.json()
}