"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import ContestForm from "@/components/contests/contest-form"
import QuestionForm from "@/components/quiz/question-form"
import UserForm from "@/components/common/user-form"
import type { Question } from "@/types/admin"

interface Props {
  open: boolean
  onOpenChange: (v: boolean) => void
  activeTab: string
  editingItem: any
  forms: {
    contest: [any, any]
    question: [any, any]
    user: [any, any]
  }
  questions: Question[]
  onSubmit: (e: React.SubmitEvent) => void
}

export default function AdminDialog({ open, onOpenChange, activeTab, editingItem, forms, questions, onSubmit }: Props) {
  const title = `${editingItem ? "Edit" : "Add New"} ${activeTab.slice(0, -1)}`

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl w-full p-0 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="px-6 pb-6 space-y-4 overflow-visible">
          {activeTab === "contests" && <ContestForm form={forms.contest[0]} setForm={forms.contest[1]} questions={questions} />}
          {activeTab === "questions" && <QuestionForm form={forms.question[0]} setForm={forms.question[1]} />}
          {activeTab === "users" && <UserForm form={forms.user[0]} setForm={forms.user[1]} editing={!!editingItem} />}
          <div className="flex gap-2 justify-end pt-4 border-t mt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit">{editingItem ? "Update" : "Create"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
