import { Target, Zap, Medal } from "lucide-react"

const steps = [
  { step: "01", title: "Choose", desc: "Pick a category and difficulty level", icon: Target },
  { step: "02", title: "Answer", desc: "Race against time to answer questions", icon: Zap },
  { step: "03", title: "Rank", desc: "Climb the leaderboard with your score", icon: Medal },
]

export default function HowItWorksSection() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">How It Works</h2>
          <p className="text-slate-500">Three simple steps to glory</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item) => (
            <div key={item.step} className="relative text-center p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <span className="absolute top-4 left-4 text-4xl font-bold text-slate-200">{item.step}</span>
              <div className="h-14 w-14 rounded-2xl bg-indigo-100 flex items-center justify-center mx-auto mb-4">
                <item.icon className="h-7 w-7 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}