"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import QuizTimer from "@/components/quiz/quizTimer"
import QuizProgress from "@/components/quiz/quizProgress"
import QuizLoading from "@/components/quiz/quiz-loading"
import QuizError from "@/components/quiz/quiz-error"
import QuizResult from "@/components/quiz/quiz-result"
import QuizQuestion from "@/components/quiz/quiz-question"
import { fetchQuestions, submitAnswer as submitAnswerApi } from "@/lib/quiz-fetch"
import type { GameplayQuestion, SubmitResult } from "@/types/quiz"

const QUESTIONS_PER_QUIZ = 10
const TIME_PER_QUESTION = 30

export default function QuizContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { data: session } = useSession()

  const category = searchParams.get("category") || ""
  const difficulty = searchParams.get("difficulty") || ""

  const [questions, setQuestions] = useState<GameplayQuestion[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<boolean[]>([])
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [timerKey, setTimerKey] = useState(0)
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; correctAnswer: string } | null>(null)

  const selectedOptionRef = useRef(selectedOption)
  const currentIndexRef = useRef(currentIndex)
  const questionsRef = useRef(questions)
  const sessionRef = useRef(session)

  useEffect(() => { selectedOptionRef.current = selectedOption }, [selectedOption])
  useEffect(() => { currentIndexRef.current = currentIndex }, [currentIndex])
  useEffect(() => { questionsRef.current = questions }, [questions])
  useEffect(() => { sessionRef.current = session }, [session])

  // Load questions
  useEffect(() => {
    const load = async () => {
      if (!session?.backendToken) {
        setError("Please login first")
        setLoading(false)
        return
      }

      try {
        const data = await fetchQuestions(session.backendToken as string, category, difficulty, QUESTIONS_PER_QUIZ)
        if (!data || data.length === 0) {
          setError("No questions found for this category.")
          setLoading(false)
          return
        }
        setQuestions(data)
        setLoading(false)
      } catch (err: any) {
        setError(err.message || "Failed to load questions")
        setLoading(false)
      }
    }

    load()
  }, [category, difficulty, session])

  // LocalStorage
  useEffect(() => {
    if (questions.length === 0 || showResult) return
    const state = { currentIndex, score, answers }
    localStorage.setItem("quiz-progress", JSON.stringify(state))
  }, [currentIndex, score, answers, questions, showResult])

  useEffect(() => {
    if (questions.length === 0) return
    const saved = localStorage.getItem("quiz-progress")
    if (saved) {
      try {
        const state = JSON.parse(saved)
        if (state.currentIndex < questions.length) {
          setCurrentIndex(state.currentIndex)
          setScore(state.score)
          setAnswers(state.answers)
        }
      } catch { /* ignore */ }
    }
  }, [questions])

  const submitAnswer = useCallback(async (option: string, timeTaken: number) => {
    if (selectedOptionRef.current !== null || !sessionRef.current?.backendToken) return

    const currentQ = questionsRef.current[currentIndexRef.current]

    try {
      const result: SubmitResult = await submitAnswerApi(
        sessionRef.current.backendToken as string,
        currentQ.id,
        option,
        timeTaken
      )

      setFeedback({ isCorrect: result.isCorrect, correctAnswer: result.correctAnswer })
      setAnswers(prev => [...prev, result.isCorrect])
      if (result.isCorrect) setScore(prev => prev + result.points)

      setTimeout(() => {
        setCurrentIndex(prevIndex => {
          if (prevIndex + 1 < questionsRef.current.length) {
            setSelectedOption(null)
            setFeedback(null)
            setTimerKey(k => k + 1)
            return prevIndex + 1
          } else {
            setShowResult(true)
            localStorage.removeItem("quiz-progress")
            return prevIndex
          }
        })
      }, 2000)
    } catch (err: any) {
      setFeedback({ isCorrect: false, correctAnswer: "" })
    }
  }, [])

  const handleTimeUp = useCallback(() => {
    if (selectedOptionRef.current !== null) return
    submitAnswer("", TIME_PER_QUESTION)
  }, [submitAnswer])

  const restart = () => {
    setCurrentIndex(0)
    setScore(0)
    setAnswers([])
    setSelectedOption(null)
    setShowResult(false)
    setFeedback(null)
    setTimerKey(prev => prev + 1)
    localStorage.removeItem("quiz-progress")
  }

  if (loading) return <QuizLoading />
  if (error) return <QuizError message={error} />
  if (questions.length === 0) return <QuizError message="No questions available." actionLabel="Back to Contests" onAction={() => router.push("/contests")} />
  if (showResult) return <QuizResult score={score} answers={answers} onRestart={restart} />

  const currentQ = questions[currentIndex]
  if (!currentQ) return <QuizLoading />

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <QuizProgress current={currentIndex + 1} total={questions.length} />
        <QuizTimer duration={TIME_PER_QUESTION} onTimeUp={handleTimeUp} key={timerKey} />

        <QuizQuestion
          question={currentQ}
          selectedOption={selectedOption}
          feedback={feedback}
          onSelect={(option) => submitAnswer(option, TIME_PER_QUESTION)}
        />
      </div>
    </div>
  )
}