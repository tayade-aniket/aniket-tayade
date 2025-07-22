"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { isSupabaseConfigured } from "./supabase"
import type { User } from "@supabase/supabase-js"

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initializeAuth = async () => {
      if (!isSupabaseConfigured()) {
        console.log("Supabase not configured, skipping auth initialization")
        setLoading(false)
        return
      }

      try {
        const { supabase } = await import("./supabase")
        if (!supabase) {
          setLoading(false)
          return
        }

        // Get initial session
        const {
          data: { session },
        } = await supabase.auth.getSession()
        setUser(session?.user ?? null)
        setLoading(false)

        // Listen for auth changes
        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange(async (event, session) => {
          setUser(session?.user ?? null)
          setLoading(false)
        })

        return () => subscription.unsubscribe()
      } catch (error) {
        console.error("Auth initialization error:", error)
        setLoading(false)
      }
    }

    initializeAuth()
  }, [])

  const DEMO_EMAIL = "tayadeanni@gmail.com"
  const DEMO_PASS = "@niket08&01"

  const login = async (email: string, password: string): Promise<boolean> => {
    // 1. If Supabase is available, try to log in normally
    if (isSupabaseConfigured()) {
      try {
        const { supabase } = await import("./supabase")
        if (supabase) {
          const { data, error } = await supabase.auth.signInWithPassword({ email, password })
          if (!error && data.user) {
            return true
          }
          console.warn("Supabase login failed, falling back to demo creds:", error?.message)
        }
      } catch (e) {
        console.error("Supabase login attempt threw:", e)
      }
    }

    // 2. Fallback demo credentials (works even if Supabase is configured but user isn’t created)
    if (email === DEMO_EMAIL && password === DEMO_PASS) {
      setUser({
        id: "demo-user",
        email: DEMO_EMAIL,
        user_metadata: { name: "Aniket Tayade" },
        app_metadata: {},
        aud: "authenticated",
        created_at: new Date().toISOString(),
      } as User)
      return true
    }

    return false
  }

  const logout = async () => {
    if (!isSupabaseConfigured()) {
      setUser(null)
      return
    }

    try {
      const { supabase } = await import("./supabase")
      if (supabase) {
        await supabase.auth.signOut()
      }
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return <AuthContext.Provider value={{ user, login, logout, loading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
