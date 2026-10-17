"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface Props {
  message: string
  actionLabel?: string
  onAction?: () => void
}

export default function QuizError({ message, actionLabel = "Go to Login", onAction }: Props) {
  const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <Card className="max-w-md w-full border-0 shadow-xl">
        <CardContent className="p-8 text-center">
          <p className="text-red-600 font-medium mb-4">{message}</p>
          <Button onClick={onAction || (() => router.push("/login"))}>
            {actionLabel}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}