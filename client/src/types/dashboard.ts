export interface Profile {
    username: string
    email: string
    role: string
  }
  
  export interface Stats {
    totalScore: number
    totalContests: number
    correctAnswers: number
    totalQuestions: number
    accuracy: number
  }
  
  export interface Contest {
    category: string
    date: string
    score: number
    correctCount: number
    questionsAnswered: number
  }