"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import type { Question } from "@/types/admin"

interface Props {
  questions: Question[]
  selected: number[]
  onToggle: (id: number) => void
}

export default function QuestionSelector({ questions, selected, onToggle }: Props) {
  return (
    <div className="col-span-2 border rounded-lg p-4 bg-slate-50/50">
      <Label className="text-sm font-semibold mb-3 block">
        Select Questions ({selected.length} selected)
      </Label>
      <div className="max-h-52 overflow-y-auto space-y-1 pr-1">
        {!questions.length ? (
          <p className="text-sm text-slate-500 py-2">No questions available.</p>
        ) : (
          questions.map((q) => (
            <div
              key={q.id}
              className="flex items-start gap-3 p-2.5 rounded-md hover:bg-white border border-transparent hover:border-slate-200 transition-all"
            >
              <Checkbox
                checked={selected.includes(q.id)}
                onCheckedChange={() => onToggle(q.id)}
                className="mt-0.5"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800 leading-snug">{q.questionText}</p>
                <div className="flex gap-2 mt-1.5">
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-4">{q.category}</Badge>
                  <Badge className={
                    q.difficulty === "easy" ? "bg-emerald-100 text-emerald-700 text-[10px] px-1.5 py-0 h-4 border-0" :
                    q.difficulty === "medium" ? "bg-amber-100 text-amber-700 text-[10px] px-1.5 py-0 h-4 border-0" :
                    "bg-rose-100 text-rose-700 text-[10px] px-1.5 py-0 h-4 border-0"
                  }>
                    {q.difficulty}
                  </Badge>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
