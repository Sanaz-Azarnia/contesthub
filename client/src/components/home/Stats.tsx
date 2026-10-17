import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Users, Target } from "lucide-react"

const stats = [
  { label: "Questions", value: "3,997", icon: BookOpen },
  { label: "Players", value: "1,240", icon: Users },
  { label: "Contests", value: "156", icon: Target },
]

export default function StatsSection() {
  return (
    <section className="py-12 px-4 bg-white border-b">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-0 shadow-lg shadow-slate-200/50 bg-gradient-to-br from-slate-50 to-white">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="h-12 w-12 rounded-xl bg-indigo-100 flex items-center justify-center">
                <stat.icon className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}