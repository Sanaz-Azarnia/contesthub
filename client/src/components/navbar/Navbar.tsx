"use client"

import { useState } from "react"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { motion, AnimatePresence } from "framer-motion"
import { Trophy, Calendar, LogIn, Home , Menu, X, User, LogOut, LayoutDashboard, Shield } from "lucide-react"

const links = [
  { label: "Contests", href: "/contests", icon: Calendar },
  { label: "Leaderboard", href: "/leaderboard", icon: Trophy },
  { label: "Home", href: "/", icon: Home },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const { data: session, status } = useSession()
  const isLoggedIn = status === "authenticated"

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50 shadow-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="h-9 w-9 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <img src="/logo.png" alt="logo" />
            </div>
            <span className="font-bold text-lg tracking-tight">ContestHub</span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-200"
              >
                <l.icon className="h-4 w-4" />
                {l.label}
              </Link>
            ))}

            {isLoggedIn ? (
              <div className="flex items-center gap-3 ml-2 pl-3 border-l border-border">
                {/* Dashboard */}
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-200"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>

                {/* Admin - فقط برای Admin */}
                {session?.user?.role === "Admin" && (
                  <Link
                    href="/admin"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-amber-100 text-amber-700 hover:bg-amber-200 transition-all duration-200"
                  >
                    <Shield className="h-4 w-4" />
                    Admin
                  </Link>
                )}

                {/* User Info */}
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium">
                    {session?.user?.name || "User"}
                  </span>
                </div>

                {/* Logout */}
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-200"
                >
                  <LogIn className="h-4 w-4" />
                  Login
                </Link>
                <Link
                  href="/login"
                  className="mr-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold shadow-lg shadow-primary/20 hover:bg-primary/90 hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-200"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-lg pt-20 px-6 md:hidden"
          >
            {/* Main Links */}
            {links.map((l, i) => (
              <motion.div
                key={l.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted mb-3 transition-colors"
                >
                  <l.icon className="h-5 w-5 text-primary" />
                  {l.label}
                </Link>
              </motion.div>
            ))}

            {isLoggedIn ? (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-3"
              >
                {/* Dashboard - Mobile */}
                <Link
                  href="/dashboard"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted mb-3 transition-colors"
                >
                  <LayoutDashboard className="h-5 w-5 text-primary" />
                  Dashboard
                </Link>

                {/* Admin - Mobile (فقط Admin) */}
                {session?.user?.role === "Admin" && (
                  <Link
                    href="/admin"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-4 p-4 rounded-xl bg-amber-100 text-amber-700 hover:bg-amber-200 mb-3 transition-colors"
                  >
                    <Shield className="h-5 w-5" />
                    Admin
                  </Link>
                )}

                {/* User Info */}
                <div className="flex items-center gap-3 p-4 rounded-xl bg-primary/5 border border-primary/20">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">
                      {session?.user?.name || "User"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {session?.user?.role || "User"}
                    </p>
                  </div>
                </div>

                {/* Logout */}
                <button
                  onClick={() => {
                    signOut({ callbackUrl: "/" })
                    setOpen(false)
                  }}
                  className="w-full flex items-center justify-center gap-2 p-4 rounded-xl bg-destructive/10 text-destructive font-medium hover:bg-destructive/20 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-3"
              >
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted mb-3 transition-colors"
                >
                  <LogIn className="h-5 w-5 text-primary" />
                  Login
                </Link>
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="block text-center p-4 bg-primary text-primary-foreground rounded-xl font-semibold shadow-lg shadow-primary/20"
                >
                  Sign Up
                </Link>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}