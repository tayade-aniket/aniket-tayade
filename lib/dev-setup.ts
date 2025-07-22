// Development setup utilities
export const isDevelopment = process.env.NODE_ENV === "development"

export const mockData = {
  projects: [
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
      highlights: ["Real-time data updates", "MAPE < 8% accuracy", "Executive-level insights"],
      featured: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ],
  blogPosts: [
    {
      id: "1",
      title: "Building Your First Machine Learning Pipeline",
      content: "A comprehensive guide to creating end-to-end ML pipelines with Python...",
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
  ],
  skills: [
    { id: "1", name: "Python", level: 95, category: "Programming" },
    { id: "2", name: "R", level: 85, category: "Programming" },
    { id: "3", name: "SQL", level: 90, category: "Programming" },
    { id: "4", name: "Machine Learning", level: 90, category: "ML/AI" },
    { id: "5", name: "Deep Learning", level: 85, category: "ML/AI" },
    { id: "6", name: "Tableau", level: 95, category: "Visualization" },
    { id: "7", name: "AWS", level: 80, category: "Cloud" },
  ],
}

export const getEnvironmentStatus = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  return {
    supabaseConfigured: !!(supabaseUrl && supabaseKey),
    environment: process.env.NODE_ENV,
    supabaseUrl: supabaseUrl ? "✅ Configured" : "❌ Missing",
    supabaseKey: supabaseKey ? "✅ Configured" : "❌ Missing",
  }
}
