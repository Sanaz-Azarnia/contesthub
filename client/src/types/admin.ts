export interface Contest {
  id: number
  title: string
  description?: string
  category: string
  difficulty: string
  startDate: string
  endDate: string
  isActive: boolean
  questions?: Question[]
}

export interface Question {
  id: number
  category: string
  type: string
  difficulty: string
  questionText: string
  correctAnswer: string
  incorrectAnswers: string[]
}

export interface UserItem {
  id: number
  username: string
  email: string
  role: string
  totalScore: number
}

export interface Stats {
  totalUsers: number
  totalQuestions: number
  totalContests: number
  totalScores: number
}
