
import { type DefaultSession } from "next-auth"
import { type DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    backendToken: string
    user: {
      id: string
      name: string
      email: string
      role: string
    } & DefaultSession["user"]
  }

  interface User {
    token: string
    role: string
    userId: number
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    backendToken?: string
    role?: string
    userId?: number
  }
}