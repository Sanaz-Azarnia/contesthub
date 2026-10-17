import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null
        }

        try {
          const res = await fetch(`${process.env.BACKEND_URL}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: credentials.username,
              password: credentials.password
            })
          })

          if (!res.ok) return null

          const user = await res.json()

          return {
            id: user.userId.toString(),
            name: user.username,
            email: user.email,
            token: user.token,
            role: user.role,
            userId: user.userId
          }

        } catch {
          return null
        }
      }
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
    })
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.backendToken = user.token
        token.role = user.role
        token.userId = user.userId
        token.name = user.name
      }

      if (account?.provider === "google" && account?.id_token) {
        try {
          const res = await fetch(`${process.env.BACKEND_URL}/api/auth/google`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idToken: account.id_token })
          })

          if (res.ok) {
            const data = await res.json()
            token.backendToken = data.token
            token.role = data.role
            token.userId = data.userId
            token.name = data.username
          }
        } catch {
          return token
        }
      }

      return token
    },
    async session({ session, token }) {
      if (token) {
        session.backendToken = token.backendToken as string
        session.user.role = token.role as string
        session.user.id = token.userId as unknown as string
        session.user.name = token.name as string
      }
      return session
    }
  }
})