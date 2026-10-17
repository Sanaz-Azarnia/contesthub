import { Badge } from "@/components/ui/badge"

interface LeaderboardEntry {
  rank: number
  userId: number
  username: string
  totalScore: number
  correctAnswers: number
  totalAnswers: number
  accuracy: number
}

interface LeaderboardTableProps {
  entries: LeaderboardEntry[]
}

export default function LeaderboardTable({ entries }: LeaderboardTableProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Rank</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">Player</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-slate-600">Score</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-slate-600">Correct</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-slate-600">Accuracy</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {entries.map((entry) => (
              <tr key={entry.userId} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  {entry.rank <= 3 ? (
                    <Badge className={`${
                      entry.rank === 1 ? "bg-amber-100 text-amber-700" :
                      entry.rank === 2 ? "bg-slate-100 text-slate-700" :
                      "bg-amber-700/20 text-amber-700"
                    }`}>
                      #{entry.rank}
                    </Badge>
                  ) : (
                    <span className="text-sm font-medium text-slate-500">#{entry.rank}</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-sm font-bold text-indigo-600">
                        {entry.username.slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <span className="font-medium text-slate-900">{entry.username}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right font-bold text-indigo-600">
                  {entry.totalScore.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-right text-slate-600">
                  {entry.correctAnswers}/{entry.totalAnswers}
                </td>
                <td className="px-6 py-4 text-right">
                  <span className={`text-sm font-medium ${
                    entry.accuracy >= 80 ? "text-emerald-600" :
                    entry.accuracy >= 50 ? "text-amber-600" :
                    "text-rose-600"
                  }`}>
                    {entry.accuracy}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}