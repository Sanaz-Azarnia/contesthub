"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Filter } from "lucide-react"

interface Props {
  period: string
  onPeriodChange: (v: string) => void
}

export default function FilterBar({ period, onPeriodChange }: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
      <Select value={period} onValueChange={onPeriodChange}>
        <SelectTrigger className="w-full sm:w-48">
          <Filter className="h-4 w-4 mr-2 text-slate-400" />
          <SelectValue placeholder="All Time" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Time</SelectItem>
          <SelectItem value="week">This Week</SelectItem>
          <SelectItem value="month">This Month</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}