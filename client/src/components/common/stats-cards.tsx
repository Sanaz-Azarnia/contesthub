"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users, BookOpen, Trophy } from "lucide-react"
import type { Stats } from "@/types/admin"

const items = [
  { key: "totalUsers", label: "Users", icon: Users, color: "indigo" },
  { key: "totalQuestions", label: "Questions", icon: BookOpen, color: "emerald" },
  { key: "totalContests", label: "Contests", icon: Trophy, color: "amber" },
  { key: "totalScores", label: "Scores", icon: Users, color: "rose" },
] as const

export default function StatsCards({ stats }: { stats: Stats | null }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      {items.map(({ key, label, icon: Icon, color }) => (
        <Card key={key}>
          <CardContent className="p-6 flex items-center gap-4">
            <div className={`h-12 w-12 bg-${color}-100 rounded-xl flex items-center justify-center`}>
              <Icon className={`h-6 w-6 text-${color}-600`} />
            </div>
            <div>
              <p className="text-2xl font-bold">{stats?.[key] ?? 0}</p>
              <p className="text-sm text-slate-500">{label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
