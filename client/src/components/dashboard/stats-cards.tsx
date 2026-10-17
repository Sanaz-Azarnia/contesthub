"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Trophy, Target, CheckCircle, Percent } from "lucide-react"
import type { Stats } from "@/types/dashboard"

const items = [
  { key: "totalScore", label: "Total Score", icon: Trophy, color: "indigo" , format: "" },
  { key: "totalContests", label: "Contests", icon: Target, color: "emerald" , format: "" },
  { key: "correctAnswers", label: "Correct", icon: CheckCircle, color: "amber", format: (s: Stats) => `${s.correctAnswers}/${s.totalQuestions}` },
  { key: "accuracy", label: "Accuracy", icon: Percent, color: "rose", format: (s: Stats) => `${s.accuracy}%` },
] as const

interface Props {
  stats: Stats | null
}

export default function StatsCards({ stats }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      {items.map(({ key, label, icon: Icon, color, format }) => (
        <Card key={key}>
          <CardContent className="p-6 flex items-center gap-4">
            <div className={`h-12 w-12 bg-${color}-100 rounded-xl flex items-center justify-center`}>
              <Icon className={`h-6 w-6 text-${color}-600`} />
            </div>
            <div>
              <p className="text-2xl font-bold">
                {stats ? (format ? format(stats) : stats[key]) : 0}
              </p>
              <p className="text-sm text-slate-500">{label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}