"use client"

import { useState, useEffect, useCallback } from "react"
import FilterBar from "@/components/contests/filter-bar"
import QuestionGrid from "@/components/quiz/question-grid" // ✅ بازگشت به QuestionGrid
import PaginationControls from "@/components/common/pagination-controls"
import { fetchQuestions } from "@/lib/contest-fetch"
import type { PagedResult, Question } from "@/types/contests"

interface Props {
  initialQuestions: Question[]
  initialTotalPages: number
  categories: string[]
  difficulties: string[]
  initialCategory: string
}

const pageSize = 12

export default function ContestsClient({
  initialQuestions,
  initialTotalPages,
  categories,
  difficulties,
  initialCategory,
}: Props) {
  const [questions, setQuestions] = useState(initialQuestions)
  const [totalPages, setTotalPages] = useState(initialTotalPages)
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [selectedDifficulty, setSelectedDifficulty] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const params: Record<string, string> = {
        page: page.toString(),
        pageSize: pageSize.toString(),
      }
      if (selectedCategory) params.category = selectedCategory
      if (selectedDifficulty) params.difficulty = selectedDifficulty
      if (searchQuery) params.search = searchQuery

      // ✅ فراخوانی fetchQuestions به جای fetchContests
      const data: PagedResult<Question> = await fetchQuestions(params)
      
      setQuestions(data.items || [])
      setTotalPages(data.totalPages || 1)
    } catch (error) {
      console.error("Failed to fetch questions:", error)
    } finally {
      setLoading(false)
    }
  }, [page, selectedCategory, selectedDifficulty, searchQuery])

  useEffect(() => {
    load()
  }, [load])

  const handleCategoryChange = (v: string) => {
    setSelectedCategory(v)
    setPage(1)
  }

  const handleDifficultyChange = (v: string) => {
    setSelectedDifficulty(v)
    setPage(1)
  }

  const handleSearchChange = (v: string) => {
    setSearchQuery(v)
    setPage(1)
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Contests</h1>
          <p className="text-slate-500">Choose a question and test your knowledge</p>
        </div>

        <FilterBar
          categories={categories}
          difficulties={difficulties}
          selectedCategory={selectedCategory}
          selectedDifficulty={selectedDifficulty}
          searchQuery={searchQuery}
          onCategoryChange={handleCategoryChange}
          onDifficultyChange={handleDifficultyChange}
          onSearchChange={handleSearchChange}
        />

        {/* ✅ استفاده از QuestionGrid */}
        <QuestionGrid questions={questions} loading={loading} pageSize={pageSize} />

        {!loading && totalPages > 1 && (
          <PaginationControls
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
      </div>
    </div>
  )
}