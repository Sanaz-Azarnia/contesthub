"use client"

import { Search } from "lucide-react"

interface FilterBarProps {
  categories: string[]
  difficulties: string[]
  selectedCategory: string
  selectedDifficulty: string
  searchQuery: string
  onCategoryChange: (value: string) => void
  onDifficultyChange: (value: string) => void
  onSearchChange: (value: string) => void
}

export default function FilterBar({
  categories,
  difficulties,
  selectedCategory,
  selectedDifficulty,
  searchQuery,
  onCategoryChange,
  onDifficultyChange,
  onSearchChange,
}: FilterBarProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        {/* ✅ جستجو */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        {/* ✅ فیلتر دسته‌بندی - فقط categories.map */}
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="px-4 py-2.5 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 min-w-[180px]"
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* ✅ فیلتر سختی - فقط difficulties.map */}
        <select
          value={selectedDifficulty}
          onChange={(e) => onDifficultyChange(e.target.value)}
          className="px-4 py-2.5 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 min-w-[180px]"
        >
          <option value="">All Difficulties</option>
          {difficulties.map((diff) => (
            <option key={diff} value={diff}>
              {diff}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}