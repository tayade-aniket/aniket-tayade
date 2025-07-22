import { type NextRequest, NextResponse } from "next/server"
import { safeSupabaseOperation, isSupabaseConfigured } from "@/lib/supabase"

// Fallback data for when Supabase is not configured
const fallbackBlogPosts = [
  {
    id: "1",
    title: "Building Your First Machine Learning Pipeline",
    content:
      "A comprehensive guide to creating end-to-end ML pipelines with Python. In this article, we'll explore the essential components of a machine learning pipeline, from data preprocessing to model deployment. We'll cover data validation, feature engineering, model training, evaluation, and deployment strategies. By the end of this guide, you'll have a solid understanding of how to build robust, scalable ML pipelines that can handle real-world data challenges.",
    excerpt:
      "Learn how to build robust machine learning pipelines from data preprocessing to model deployment, with practical examples and best practices.",
    image: "/placeholder.svg?height=200&width=300",
    date: new Date().toISOString(),
    tags: ["Machine Learning", "Python", "MLOps", "Tutorial"],
    published: true,
    slug: "building-your-first-ml-pipeline",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Data Visualization Best Practices for Business Intelligence",
    content:
      "Effective data visualization techniques for creating compelling business dashboards. This comprehensive guide covers the principles of effective data visualization, color theory, chart selection, and dashboard design. We'll explore how to choose the right visualization for your data, create compelling narratives, and design dashboards that drive business decisions.",
    excerpt:
      "Discover the principles of effective data visualization and learn how to create dashboards that tell compelling stories with your data.",
    image: "/placeholder.svg?height=200&width=300",
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    tags: ["Data Visualization", "Tableau", "Business Intelligence", "Design"],
    published: true,
    slug: "data-visualization-best-practices",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Understanding BERT for Sentiment Analysis",
    content:
      "Deep dive into BERT architecture and its application in sentiment analysis. This technical article explores the transformer architecture, attention mechanisms, and how BERT revolutionized natural language processing. We'll implement a sentiment analysis model from scratch, fine-tune BERT for our specific use case, and deploy it as a production-ready API.",
    excerpt:
      "Explore how BERT revolutionized NLP and learn to implement sentiment analysis with state-of-the-art transformer models.",
    image: "/placeholder.svg?height=200&width=300",
    date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
    tags: ["NLP", "BERT", "Deep Learning", "Sentiment Analysis"],
    published: true,
    slug: "understanding-bert-sentiment-analysis",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export async function GET() {
  // If Supabase is not configured, return fallback data
  if (!isSupabaseConfigured()) {
    console.log("Supabase not configured, returning fallback blog posts data")
    return NextResponse.json(fallbackBlogPosts)
  }

  try {
    const { data: posts, error } = await safeSupabaseOperation(async () => {
      const { supabase } = await import("@/lib/supabase")
      if (!supabase) throw new Error("Supabase client not available")

      return await supabase.from("blog_posts").select("*").order("date", { ascending: false })
    })

    if (error) {
      console.log("Database error, returning fallback blog posts data:", error.message)
      return NextResponse.json(fallbackBlogPosts)
    }

    return NextResponse.json(posts || fallbackBlogPosts)
  } catch (error) {
    console.log("Error fetching blog posts, returning fallback data:", error)
    return NextResponse.json(fallbackBlogPosts)
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

    const { data: post, error } = await supabase
      .from("blog_posts")
      .insert([
        {
          ...body,
          updated_at: new Date().toISOString(),
        },
      ])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error("Error creating blog post:", error)
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 })
  }
}
