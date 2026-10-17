import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

interface Question {
  id: number;
  category: string;
  difficulty: string;
  questionText: string;
}

function getDifficultyColor(diff: string) {
  switch (diff.toLowerCase()) {
    case "easy":
      return "bg-emerald-100 text-emerald-700 border-emerald-200";
    case "medium":
      return "bg-amber-100 text-amber-700 border-amber-200";
    case "hard":
      return "bg-rose-100 text-rose-700 border-rose-200";
    default:
      return "bg-slate-100 text-slate-700 border-slate-200";
  }
}

export default function QuestionCard({ question }: { question: Question }) {
  return (
    <Card className="group border-0 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white h-full">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-center justify-between mb-3 flex-shrink-0">
          <Badge variant="outline" className={getDifficultyColor(question.difficulty)}>
            {question.difficulty}
          </Badge>
          <span className="text-xs text-slate-400 truncate max-w-[60%]">
            {question.category}
          </span>
        </div>
        <p className="text-slate-800 font-medium leading-relaxed mb-4 line-clamp-3 flex-grow">
          {question.questionText}
        </p>
        <Link href={`/quiz?id=${question.id}`} className="mt-auto flex-shrink-0">
          <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
            Start Quiz
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}