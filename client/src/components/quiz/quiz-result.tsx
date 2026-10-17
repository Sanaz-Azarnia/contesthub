"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Trophy, RotateCcw, Home } from "lucide-react"

interface Props {
  score: number
  answers: boolean[]
  onRestart: () => void
}

export default function QuizResult({ score, answers, onRestart }: Props) {
  const router = useRouter()
  const correctCount = answers.filter(a => a).length

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        <Card className="border-0 shadow-xl">
          <CardContent className="p-8 text-center">
            <div className="h-20 w-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy className="h-10 w-10 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Quiz Complete!</h2>
            <div className="grid grid-cols-2 gap-4 my-6">
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-3xl font-bold text-indigo-600">{score}</p>
                <p className="text-sm text-slate-500">Score</p>
              </div>
              <div className="bg-slate-50 rounded-xl p-4">
                <p className="text-3xl font-bold text-emerald-600">{correctCount}/{answers.length}</p>
                <p className="text-sm text-slate-500">Correct</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={onRestart}>
                <RotateCcw className="mr-2 h-4 w-4" /> Retry
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => router.push("/contests")}>
                <Home className="mr-2 h-4 w-4" /> Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}