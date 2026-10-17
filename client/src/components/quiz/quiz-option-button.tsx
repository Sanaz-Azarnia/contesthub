"use client"

interface Props {
  option: string
  index: number
  selectedOption: string | null
  feedback: { isCorrect: boolean; correctAnswer: string } | null
  onSelect: (option: string) => void
}

export default function QuizOptionButton({ option, index, selectedOption, feedback, onSelect }: Props) {
  let buttonClass = "w-full p-4 rounded-xl border-2 border-slate-200 bg-white text-left font-medium hover:border-indigo-300 hover:bg-indigo-50 transition-all"

  if (selectedOption) {
    if (feedback?.correctAnswer === option) {
      buttonClass = "w-full p-4 rounded-xl border-2 border-emerald-500 bg-emerald-50 text-left font-medium text-emerald-700"
    } else if (selectedOption === option && !feedback?.isCorrect) {
      buttonClass = "w-full p-4 rounded-xl border-2 border-rose-500 bg-rose-50 text-left font-medium text-rose-700"
    } else {
      buttonClass = "w-full p-4 rounded-xl border-2 border-slate-200 bg-slate-50 text-left font-medium text-slate-400"
    }
  }

  return (
    <button
      className={buttonClass}
      onClick={() => onSelect(option)}
      disabled={!!selectedOption}
    >
      <span className="inline-flex items-center gap-3">
        <span className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-500">
          {String.fromCharCode(65 + index)}
        </span>
        {option}
      </span>
    </button>
  )
}