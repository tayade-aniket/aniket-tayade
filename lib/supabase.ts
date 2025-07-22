import { createClient } from "@supabase/supabase-js"

// Validate environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Create client only if environment variables are present
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

// Helper function to check if Supabase is configured
const isSupabaseConfigured = () => {
  return Boolean(supabase && supabaseUrl && supabaseAnonKey)
}

// Safe wrapper for Supabase operations
const safeSupabaseOperation = async (operation) => {
  if (!supabase) {
    return { data: null, error: { message: "Supabase not configured" } }
  }

  try {
    return await operation()
  } catch (error) {
    console.error("Supabase operation failed:", error)
    return { data: null, error }
  }
}

// Database interface remains the same...
export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          title: string
          description: string
          image: string | null
          technologies: string[]
          category: string
          github_url: string
          live_url: string | null
          blog_url: string | null
          highlights: string[]
          featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          image?: string | null
          technologies: string[]
          category: string
          github_url: string
          live_url?: string | null
          blog_url?: string | null
          highlights: string[]
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          image?: string | null
          technologies?: string[]
          category?: string
          github_url?: string
          live_url?: string | null
          blog_url?: string | null
          highlights?: string[]
          featured?: boolean
          updated_at?: string
        }
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          content: string
          excerpt: string
          image: string | null
          date: string
          tags: string[]
          published: boolean
          slug: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          excerpt: string
          image?: string | null
          date?: string
          tags: string[]
          published?: boolean
          slug: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          excerpt?: string
          image?: string | null
          date?: string
          tags?: string[]
          published?: boolean
          slug?: string
          updated_at?: string
        }
      }
      skills: {
        Row: {
          id: string
          name: string
          level: number
          category: string
          icon: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          level: number
          category: string
          icon?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          level?: number
          category?: string
          icon?: string | null
          updated_at?: string
        }
      }
      resume: {
        Row: {
          id: string
          file_name: string
          file_url: string
          file_size: number
          uploaded_at: string
          is_active: boolean
        }
        Insert: {
          id?: string
          file_name: string
          file_url: string
          file_size: number
          uploaded_at?: string
          is_active?: boolean
        }
        Update: {
          id?: string
          file_name?: string
          file_url?: string
          file_size?: number
          uploaded_at?: string
          is_active?: boolean
        }
      }
    }
  }
}

export { supabase, isSupabaseConfigured, safeSupabaseOperation }
