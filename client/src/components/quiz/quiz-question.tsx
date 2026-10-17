"use client"

import { Card, CardContent } from "@/components/ui/card"
import QuizOptionButton from "./quiz-option-button"
import type { GameplayQuestion } from "@/types/quiz"

interface Props {
  question: GameplayQuestion
  selectedOption: string | null
  feedback: { isCorrect: boolean; correctAnswer: string } | null
  onSelect: (option: string) => void
}

export default function QuizQuestion({ question, selectedOption, feedback, onSelect }: Props) {
  return (
    <Card className="border-0 shadow-xl">
      <CardContent className="p-6 md:p-8">
        <span className="inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold mb-4">
          {question.category}
        </span>
        <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-8 leading-relaxed">
          {question.questionText}
        </h3>

        <div className="grid grid-cols-1 gap-3">
          {question.options.map((option, idx) => (
            <QuizOptionButton
              key={idx}
              option={option}
              index={idx}
              selectedOption={selectedOption}
              feedback={feedback}
              onSelect={onSelect}
            />
          ))}
        </div>

        {feedback && (
          <div className={`mt-4 p-4 rounded-xl text-center font-medium ${
            feedback.isCorrect ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
          }`}>
            {feedback.isCorrect ? "Correct! 🎉" : `Wrong! The answer was: ${feedback.correctAnswer}`}
          </div>
        )}
      </CardContent>
    </Card>
  )
}