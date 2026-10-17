"use client"

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Calendar, Trophy } from "lucide-react"
import type { Contest } from "@/types/dashboard"

interface Props {
  contests: Contest[]
}

export default function ContestHistory({ contests }: Props) {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Contest History
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!contests.length ? (
          <p className="text-center text-slate-500 py-8">No contests yet. Start competing!</p>
        ) : (
          <div className="space-y-3">
            {contests.map((contest, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                    <Trophy className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">{contest.category}</p>
                    <p className="text-sm text-slate-500">{new Date(contest.date).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-indigo-600">+{contest.score}</p>
                  <p className="text-sm text-slate-500">{contest.correctCount}/{contest.questionsAnswered} correct</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}