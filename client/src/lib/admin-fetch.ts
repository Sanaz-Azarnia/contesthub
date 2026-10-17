"use server"

import { redirect } from "next/navigation"
import { auth } from "../../auth";

const BASE = process.env.NEXT_PUBLIC_BACKEND_URL;

async function getToken() {
  const session = await auth();
  return session?.backendToken as string | undefined
}

export async function fetchAdmin(path: string) {
  const token = await getToken()
  const res = await fetch(`${BASE}/api/admin/${path}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  })
  if (res.status === 401) redirect("/login")
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function fetchAllQuestions() {
  const token = await getToken()
  const res = await fetch(`${BASE}/api/admin/questions?pageSize=1000`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  })
  if (res.status === 401) redirect("/login")
  if (!res.ok) throw new Error(await res.text())
  const data = await res.json()
  return data.items || []
}

export async function deleteAdminItem(type: string, id: number) {
  const token = await getToken()
  const res = await fetch(`${BASE}/api/admin/${type}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  })
  if (res.status === 401) redirect("/login")
  if (!res.ok) throw new Error(await res.text())
}

export async function saveAdminItem(type: string, id: number | null, body: object) {
  const token = await getToken()
  const url = `${BASE}/api/admin/${type}${id ? `/${id}` : ""}`
  const res = await fetch(url, {
    method: id ? "PUT" : "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })
  if (res.status === 401) redirect("/login")
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.message || "Error saving item")
  }
}
