"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Profile } from "@/types/dashboard"

interface Props {
  profile: Profile | null
}

export default function ProfileHeader({ profile }: Props) {
  return (
    <Card className="mb-8 border-0 shadow-lg">
      <CardContent className="p-8">
        <div className="flex items-center gap-6">
          <div className="h-20 w-20 rounded-full bg-indigo-100 flex items-center justify-center text-2xl font-bold text-indigo-600">
            {profile?.username?.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{profile?.username}</h1>
            <p className="text-slate-500">{profile?.email}</p>
            <Badge className="mt-2">{profile?.role}</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}