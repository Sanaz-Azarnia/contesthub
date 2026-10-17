"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FormState {
  category: string
  type: string
  difficulty: string
  questionText: string
  correctAnswer: string
  incorrectAnswers: string[]
}

interface Props {
  form: FormState
  setForm: (f: FormState | ((p: FormState) => FormState)) => void
}

export default function QuestionForm({ form, setForm }: Props) {
  const update = (field: keyof FormState, value: any) =>
    setForm((p) => ({ ...p, [field]: value }))

  const updateIncorrect = (i: number, value: string) => {
    const arr = [...form.incorrectAnswers]
    arr[i] = value
    update("incorrectAnswers", arr)
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Category</Label>
          <Input value={form.category} onChange={(e) => update("category", e.target.value)} required />
        </div>
        <div>
          <Label>Difficulty</Label>
          <Select value={form.difficulty} onValueChange={(v) => update("difficulty", v)}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="easy">Easy</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="hard">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label>Type</Label>
        <Select value={form.type} onValueChange={(v) => update("type", v)}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="multiple">Multiple Choice</SelectItem>
            <SelectItem value="boolean">True/False</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Question Text</Label>
        <Textarea value={form.questionText} onChange={(e) => update("questionText", e.target.value)} required />
      </div>
      <div>
        <Label>Correct Answer</Label>
        <Input value={form.correctAnswer} onChange={(e) => update("correctAnswer", e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label>Incorrect Answers</Label>
        {form.incorrectAnswers.map((ans, i) => (
          <Input key={i} value={ans} onChange={(e) => updateIncorrect(i, e.target.value)} placeholder={`Incorrect answer ${i + 1}`} />
        ))}
      </div>
    </div>
  )
}
