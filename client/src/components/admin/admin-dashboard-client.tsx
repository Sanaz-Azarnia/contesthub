"use client"

import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus } from "lucide-react"
import StatsCards from "@/components/common/stats-cards"
import DataTable from "@/components/common/data-table"
import AdminDialog from "@/components/admin/admin-dialog"
import { fetchAdmin, fetchAllQuestions, deleteAdminItem, saveAdminItem } from "@/lib/admin-fetch"
import type { Stats, Question, Contest, UserItem } from "@/types/admin"

const emptyContest = {
  title: "", description: "", category: "", difficulty: "medium",
  startDate: "", endDate: "", isActive: true, questionIds: [] as number[]
}

const emptyQuestion = {
  category: "", type: "multiple", difficulty: "medium",
  questionText: "", correctAnswer: "", incorrectAnswers: ["", "", ""]
}

const emptyUser = { username: "", email: "", password: "", role: "User" }

export default function AdminDashboardClient({ initialStats, initialData }: { initialStats: Stats; initialData: any[] }) {
  const [activeTab, setActiveTab] = useState("users")
  const [data, setData] = useState<any[]>(initialData)
  const [stats, setStats] = useState<Stats>(initialStats)
  const [loading, setLoading] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [allQuestions, setAllQuestions] = useState<Question[]>([])

  const [contestForm, setContestForm] = useState(emptyContest)
  const [questionForm, setQuestionForm] = useState(emptyQuestion)
  const [userForm, setUserForm] = useState(emptyUser)

  const loadData = async () => {
    setLoading(true)
    try {
      const [s, d] = await Promise.all([
        fetchAdmin("stats"),
        fetchAdmin(activeTab),
      ])
      setStats(s)
      setData(Array.isArray(d) ? d : d.items || d.results || [])
      if (activeTab === "contests") {
        const q = await fetchAllQuestions()
        setAllQuestions(q)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [activeTab])

  const resetForms = () => {
    setContestForm(emptyContest)
    setQuestionForm(emptyQuestion)
    setUserForm(emptyUser)
  }

  const openAdd = () => {
    setEditingItem(null)
    resetForms()
    if (activeTab === "contests") fetchAllQuestions().then(setAllQuestions)
    setDialogOpen(true)
  }

  const openEdit = (item: any) => {
    setEditingItem(item)
    if (activeTab === "contests") {
      setContestForm({
        title: item.title,
        description: item.description || "",
        category: item.category,
        difficulty: item.difficulty,
        startDate: item.startDate ? new Date(item.startDate).toISOString().slice(0, 16) : "",
        endDate: item.endDate ? new Date(item.endDate).toISOString().slice(0, 16) : "",
        isActive: item.isActive,
        questionIds: item.questions?.map((q: Question) => q.id) || []
      })
      fetchAllQuestions().then(setAllQuestions)
    } else if (activeTab === "questions") {
      setQuestionForm({
        category: item.category,
        type: item.type,
        difficulty: item.difficulty,
        questionText: item.questionText,
        correctAnswer: item.correctAnswer,
        incorrectAnswers: item.incorrectAnswers.length >= 3
          ? item.incorrectAnswers
          : [...item.incorrectAnswers, ...Array(3 - item.incorrectAnswers.length).fill("")]
      })
    } else {
      setUserForm({
        username: item.username,
        email: item.email,
        password: "",
        role: item.role
      })
    }
    setDialogOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure?")) return
    await deleteAdminItem(activeTab, id)
    loadData()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const body = activeTab === "contests" ? contestForm :
      activeTab === "questions" ? questionForm : userForm
    await saveAdminItem(activeTab, editingItem?.id, body)
    setDialogOpen(false)
    setEditingItem(null)
    resetForms()
    loadData()
  }

  const userColumns = [
    { key: "id", label: "ID" },
    { key: "username", label: "Username" },
    { key: "email", label: "Email" },
    {
      key: "role", label: "Role",
      render: (u: UserItem) => <span className={`px-2 py-1 rounded text-xs ${u.role === "Admin" ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>{u.role}</span>
    },
    { key: "totalScore", label: "Score" },
  ]

  const questionColumns = [
    { key: "id", label: "ID" },
    { key: "category", label: "Category" },
    {
      key: "difficulty", label: "Difficulty",
      render: (q: Question) => (
        <span className={`px-2 py-1 rounded text-xs ${
          q.difficulty === "easy" ? "bg-emerald-100 text-emerald-700" :
          q.difficulty === "medium" ? "bg-amber-100 text-amber-700" : "bg-rose-100 text-rose-700"
        }`}>{q.difficulty}</span>
      )
    },
    { key: "questionText", label: "Question" },
  ]

  const contestColumns = [
    { key: "id", label: "ID" },
    { key: "title", label: "Title" },
    { key: "category", label: "Category" },
    { key: "questions", label: "Questions", render: (c: Contest) => `${c.questions?.length || 0} questions` },
    {
      key: "isActive", label: "Status",
      render: (c: Contest) => <span className={`px-2 py-1 rounded text-xs ${c.isActive ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>{c.isActive ? "Active" : "Inactive"}</span>
    },
  ]

  const columns = activeTab === "users" ? userColumns : activeTab === "questions" ? questionColumns : contestColumns

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Admin Dashboard</h1>
        <StatsCards stats={stats} />

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="contests">Contests</TabsTrigger>
          </TabsList>

          <AdminDialog
            open={dialogOpen}
            onOpenChange={setDialogOpen}
            activeTab={activeTab}
            editingItem={editingItem}
            forms={{ contest: [contestForm, setContestForm], question: [questionForm, setQuestionForm], user: [userForm, setUserForm] }}
            questions={allQuestions}
            onSubmit={handleSubmit}
          />

          {["users", "questions", "contests"].map((tab) => (
            <TabsContent key={tab} value={tab}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="capitalize">{tab}</CardTitle>
                  <Button size="sm" onClick={openAdd}><Plus className="h-4 w-4 mr-2" /> Add</Button>
                </CardHeader>
                <CardContent>
                  <DataTable columns={columns} data={data} loading={loading} onEdit={openEdit} onDelete={handleDelete} />
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}
