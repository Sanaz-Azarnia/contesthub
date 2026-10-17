"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import QuestionSelector from "@/components/quiz/question-selector"
import type { Question } from "@/types/admin"

interface FormState {
  title: string
  description: string
  category: string
  difficulty: string
  startDate: string
  endDate: string
  isActive: boolean
  questionIds: number[]
}

interface Props {
  form: FormState
  setForm: (f: FormState | ((p: FormState) => FormState)) => void
  questions: Question[]
}

export default function ContestForm({ form, setForm, questions }: Props) {
  const update = (field: keyof FormState, value: any) =>
    setForm((p) => ({ ...p, [field]: value }))

  const toggleQuestion = (id: number) =>
    setForm((p) => ({
      ...p,
      questionIds: p.questionIds.includes(id)
        ? p.questionIds.filter((x) => x !== id)
        : [...p.questionIds, id],
    }))

  return (
    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
      <div className="col-span-2">
        <Label className="text-sm font-medium mb-1.5 block">Title</Label>
        <Input value={form.title} onChange={(e) => update("title", e.target.value)} placeholder="Enter contest title" required />
      </div>
      <div className="col-span-2">
        <Label className="text-sm font-medium mb-1.5 block">Description</Label>
        <Textarea value={form.description} onChange={(e) => update("description", e.target.value)} placeholder="Enter contest description" rows={2} />
      </div>
      <div>
        <Label className="text-sm font-medium mb-1.5 block">Category</Label>
        <Input value={form.category} onChange={(e) => update("category", e.target.value)} placeholder="e.g. General Knowledge" required />
      </div>
      <div>
        <Label className="text-sm font-medium mb-1.5 block">Difficulty</Label>
        <Select value={form.difficulty} onValueChange={(v) => update("difficulty", v)}>
          <SelectTrigger><SelectValue placeholder="Select difficulty" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="hard">Hard</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="text-sm font-medium mb-1.5 block">Start Date</Label>
        <Input type="datetime-local" value={form.startDate} onChange={(e) => update("startDate", e.target.value)} required />
      </div>
      <div>
        <Label className="text-sm font-medium mb-1.5 block">End Date</Label>
        <Input type="datetime-local" value={form.endDate} onChange={(e) => update("endDate", e.target.value)} required />
      </div>
      <div className="col-span-2 flex items-center gap-2 py-1">
        <input type="checkbox" id="isActive" checked={form.isActive} onChange={(e) => update("isActive", e.target.checked)} className="h-4 w-4 rounded border-gray-300" />
        <Label htmlFor="isActive" className="text-sm font-medium cursor-pointer">Active</Label>
      </div>
      <QuestionSelector questions={questions} selected={form.questionIds} onToggle={toggleQuestion} />
    </div>
  )
}
