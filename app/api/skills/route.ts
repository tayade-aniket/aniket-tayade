import { type NextRequest, NextResponse } from "next/server"
import { safeSupabaseOperation, isSupabaseConfigured } from "@/lib/supabase"

// Fallback data for when Supabase is not configured
const fallbackSkills = [
  {
    id: "1",
    name: "Python",
    level: 95,
    category: "Programming",
    icon: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "R",
    level: 85,
    category: "Programming",
    icon: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    name: "SQL",
    level: 90,
    category: "Programming",
    icon: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "4",
    name: "JavaScript",
    level: 75,
    category: "Programming",
    icon: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Machine Learning",
    level: 90,
    category: "ML/AI",
    icon: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "6",
    name: "Deep Learning",
    level: 85,
    category: "ML/AI",
    icon: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "7",
    name: "NLP",
    level: 80,
    category: "ML/AI",
    icon: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "8",
    name: "Computer Vision",
    level: 75,
    category: "ML/AI",
    icon: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "9",
    name: "Tableau",
    level: 95,
    category: "Visualization",
    icon: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "10",
    name: "Power BI",
    level: 85,
    category: "Visualization",
    icon: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "11",
    name: "Plotly",
    level: 90,
    category: "Visualization",
    icon: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "12",
    name: "D3.js",
    level: 70,
    category: "Visualization",
    icon: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "13",
    name: "AWS",
    level: 80,
    category: "Cloud",
    icon: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "14",
    name: "Docker",
    level: 75,
    category: "Cloud",
    icon: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "15",
    name: "Git",
    level: 90,
    category: "Cloud",
    icon: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "16",
    name: "Apache Spark",
    level: 70,
    category: "Cloud",
    icon: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export async function GET() {
  // If Supabase is not configured, return fallback data
  if (!isSupabaseConfigured()) {
    console.log("Supabase not configured, returning fallback skills data")
    return NextResponse.json(fallbackSkills)
  }

  try {
    const { data: skills, error } = await safeSupabaseOperation(async () => {
      const { supabase } = await import("@/lib/supabase")
      if (!supabase) throw new Error("Supabase client not available")

      return await supabase.from("skills").select("*").order("category", { ascending: true })
    })

    if (error) {
      console.log("Database error, returning fallback skills data:", error.message)
      return NextResponse.json(fallbackSkills)
    }

    return NextResponse.json(skills || fallbackSkills)
  } catch (error) {
    console.log("Error fetching skills, returning fallback data:", error)
    return NextResponse.json(fallbackSkills)
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

    const { data: skill, error } = await supabase
      .from("skills")
      .insert([
        {
          ...body,
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(skill, { status: 201 })
  } catch (error) {
    console.error("Error creating skill:", error)
    return NextResponse.json({ error: "Failed to create skill" }, { status: 500 })
  }
}
