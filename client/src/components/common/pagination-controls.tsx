"use client"

import { Button } from "@/components/ui/button"

interface Props {
  page: number
  totalPages: number
  onPageChange: (p: number) => void
}

export default function PaginationControls({ page, totalPages, onPageChange }: Props) {
  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      <Button
        variant="outline"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
      >
        Previous
      </Button>
      <span className="text-sm text-slate-600">
        Page {page} of {totalPages}
      </span>
      <Button
        variant="outline"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Next
      </Button>
    </div>
  )
}