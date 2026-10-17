export interface GameplayQuestion {
    id: number
    category: string
    difficulty: string
    questionText: string
    options: string[]
  }
  
  export interface SubmitResult {
    isCorrect: boolean
    correctAnswer: string
    points: number
  }
  
  export interface QuizState {
    currentIndex: number
    score: number
    answers: boolean[]
  }