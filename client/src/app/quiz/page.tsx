import { Suspense } from "react"
import QuizContent from "@/components/quiz/quiz-content"
import QuizLoading from "@/components/quiz/quiz-loading"

export default function QuizPage() {
  return (
    <Suspense fallback={<QuizLoading />}>
      <QuizContent />
    </Suspense>
  )
}