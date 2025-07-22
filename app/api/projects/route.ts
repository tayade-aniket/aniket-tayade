import { type NextRequest, NextResponse } from "next/server"
import { safeSupabaseOperation, isSupabaseConfigured } from "@/lib/supabase"

// Fallback data for when Supabase is not configured
const fallbackProjects = [
  {
    id: "1",
    title: "Customer Churn Prediction Model",
    description:
      "Built a machine learning model to predict customer churn using ensemble methods and feature engineering, achieving 94% accuracy.",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["Python", "scikit-learn", "pandas", "XGBoost", "Matplotlib"],
    category: "Machine Learning",
    github_url: "https://github.com/anikettayade/customer-churn-prediction",
    live_url: "https://customer-churn-demo.vercel.app",
    blog_url: "/blog/customer-churn-prediction",
    highlights: ["94% accuracy on test set", "Reduced false positives by 23%", "Deployed with Flask API"],
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Sales Forecasting Dashboard",
    description:
      "Created an interactive Tableau dashboard for sales forecasting using time series analysis and seasonal decomposition.",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["Tableau", "Python", "SQL", "PostgreSQL", "Time Series"],
    category: "Data Visualization",
    github_url: "https://github.com/anikettayade/sales-forecasting",
    live_url: "https://public.tableau.com/views/SalesForecasting/Dashboard",
    blog_url: null,
    highlights: ["Real-time data updates", "MAPE < 8% accuracy", "Executive-level insights"],
    featured: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Sentiment Analysis API",
    description: "Developed a REST API for sentiment analysis of social media posts using BERT and deployed on AWS.",
    image: "/placeholder.svg?height=300&width=400",
    technologies: ["Python", "BERT", "FastAPI", "AWS", "Docker"],
    category: "NLP",
    github_url: "https://github.com/anikettayade/sentiment-api",
    live_url: "https://sentiment-api.anikettayade.com",
    blog_url: "/blog/building-sentiment-analysis-api",
    highlights: ["89% accuracy on test data", "Handles 1000+ requests/min", "Multi-language support"],
    featured: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export async function GET() {
  // If Supabase is not configured, return fallback data
  if (!isSupabaseConfigured()) {
    console.log("Supabase not configured, returning fallback projects data")
    return NextResponse.json(fallbackProjects)
  }

  try {
    const { data: projects, error } = await safeSupabaseOperation(async () => {
      const { supabase } = await import("@/lib/supabase")
      if (!supabase) throw new Error("Supabase client not available")

      return await supabase.from("projects").select("*").order("created_at", { ascending: false })
    })

    if (error) {
      console.log("Database error, returning fallback projects data:", error.message)
      return NextResponse.json(fallbackProjects)
    }

    return NextResponse.json(projects || fallbackProjects)
  } catch (error) {
    console.log("Error fetching projects, returning fallback data:", error)
    return NextResponse.json(fallbackProjects)
  }
}

export async function POST(request: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 })
  }

  try {
    const body = await request.json()
    const { supabase } = await import("@/lib/supabase")

    if (!supabase) {
      return NextResponse.json({ error: "Database not available" }, { status: 503 })
    }

    const { data: project, error } = await supabase
      .from("projects")
      .insert([
        {
          ...body,
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(project, { status: 201 })
  } catch (error) {
    console.error("Error creating project:", error)
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 })
  }
}
