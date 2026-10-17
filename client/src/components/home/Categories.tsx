import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Brain, BookOpen, Monitor, Music, Globe, Trophy, 
  Gamepad2, Film, Tv, Dumbbell, Lightbulb, History, 
  Palette, Theater, Newspaper, Atom 
} from "lucide-react"
import { fetchCategoriesWithCount } from "@/lib/contest-fetch"

// ✅ نگاشت نام دسته‌بندی به آیکون و رنگ
const categoryStyles: Record<string, { icon: any; color: string }> = {
  "General Knowledge": { icon: Lightbulb, color: "bg-amber-500" },
  "Geography": { icon: Globe, color: "bg-emerald-500" },
  "History": { icon: History, color: "bg-orange-500" },
  "Science & Nature": { icon: Atom, color: "bg-teal-500" },
  "Science: Computers": { icon: Monitor, color: "bg-violet-500" },
  "Science: Mathematics": { icon: Brain, color: "bg-blue-500" },
  "Entertainment: Music": { icon: Music, color: "bg-pink-500" },
  "Entertainment: Film": { icon: Film, color: "bg-red-500" },
  "Entertainment: Television": { icon: Tv, color: "bg-indigo-500" },
  "Entertainment: Video Games": { icon: Gamepad2, color: "bg-purple-500" },
  "Entertainment: Board Games": { icon: Gamepad2, color: "bg-cyan-500" },
  "Entertainment: Japanese Anime & Manga": { icon: Palette, color: "bg-rose-500" },
  "Entertainment: Cartoon & Animations": { icon: Tv, color: "bg-yellow-500" },
  "Entertainment: Comics": { icon: BookOpen, color: "bg-orange-600" },
  "Sports": { icon: Trophy, color: "bg-green-500" },
  "Politics": { icon: Newspaper, color: "bg-slate-600" },
  "Art": { icon: Palette, color: "bg-fuchsia-500" },
  "Celebrities": { icon: Trophy, color: "bg-amber-600" },
  "Animals": { icon: Dumbbell, color: "bg-lime-500" },
  "Vehicles": { icon: Dumbbell, color: "bg-blue-600" },
}

// آیکون پیش‌فرض برای دسته‌بندی‌های ناشناخته
const defaultStyle = { icon: BookOpen, color: "bg-slate-500" }

interface CategoryData {
  name: string
  count: number
}

export default async function CategoriesSection() {
  // ✅ دریافت دسته‌بندی‌ها از بک‌اند
  const categories: CategoryData[] = await fetchCategoriesWithCount()

  return (
    <section className="py-20 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">Choose Your Battle</h2>
          <p className="text-slate-500">Pick a category and start competing</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const style = categoryStyles[cat.name] || defaultStyle
            const Icon = style.icon
            
            return (
              <Link 
                key={cat.name} 
                href={`/contests?category=${encodeURIComponent(cat.name)}`}
              >
                <Card className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-0 shadow-lg cursor-pointer overflow-hidden">
                  <CardContent className="p-6 relative">
                    <div className={`absolute top-0 right-0 w-24 h-24 ${style.color} opacity-10 rounded-full -mr-8 -mt-8 transition-transform group-hover:scale-150`} />
                    <div className={`h-12 w-12 rounded-xl ${style.color} flex items-center justify-center mb-4 shadow-lg`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{cat.name}</h3>
                    <p className="text-sm text-slate-500">{cat.count} questions</p>
                    <div className="mt-4 flex items-center text-sm font-medium text-indigo-600 group-hover:translate-x-2 transition-transform">
                      Start Now <span className="ml-1">→</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}