import { redirect } from "next/navigation"
import { auth } from "../../../auth"
import { fetchAdmin } from "@/lib/admin-fetch"
import AdminDashboardClient from "@/components/admin/admin-dashboard-client"
import type { Stats } from "@/types/admin"

export default async function AdminDashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session.user.role !== "Admin") redirect("/");

  const stats: Stats = await fetchAdmin("stats");
  const users = await fetchAdmin("users");

  return <AdminDashboardClient initialStats={stats} 
  initialData={Array.isArray(users) ? users : []} />
}
