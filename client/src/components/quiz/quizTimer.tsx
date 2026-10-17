"use client"

import { useEffect, useState, useRef } from "react"

interface QuizTimerProps {
  duration: number
  onTimeUp: () => void
}

export default function QuizTimer({ duration, onTimeUp }: QuizTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration)
  const onTimeUpRef = useRef(onTimeUp)

  // همیشه آخرین نسخه onTimeUp را داخل ref نگه می‌داریم
  onTimeUpRef.current = onTimeUp

  useEffect(() => {
    setTimeLeft(duration)
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          onTimeUpRef.current() // از ref استفاده می‌کنیم نه مستقیم
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [duration]) // فقط duration — onTimeUp دیگر اینجا نیست!

  const percentage = (timeLeft / duration) * 100

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-3 bg-slate-200 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-1000 ${
            timeLeft > 10 ? "bg-indigo-500" : "bg-rose-500"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className={`font-mono font-bold text-lg ${
        timeLeft <= 10 ? "text-rose-500" : "text-slate-700"
      }`}>
        {timeLeft}s
      </span>
    </div>
  )
}