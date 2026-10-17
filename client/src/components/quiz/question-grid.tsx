"use client"

import QuestionCard from "@/components/contests/questionCard"
import QuestionSkeleton from "@/components/contests/questionSkeleton"
import type { Question } from "@/types/contests"

interface Props {
  questions: Question[]
  loading: boolean
  pageSize: number
}

export default function QuestionGrid({ questions, loading, pageSize }: Props) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: pageSize }).map((_, i) => (
          <QuestionSkeleton key={i} />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {questions.map((q) => (
        <QuestionCard key={q.id} question={q} />
      ))}
    </div>
  )
}