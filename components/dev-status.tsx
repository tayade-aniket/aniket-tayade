"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Settings, CheckCircle, XCircle, AlertCircle } from "lucide-react"

interface StatusInfo {
  supabaseConfigured: boolean
  environment: string
  supabaseUrl: string
  supabaseKey: string
  apiStatus: {
    projects: boolean
    blog: boolean
    skills: boolean
  }
}

export default function DevStatus() {
  const [showStatus, setShowStatus] = useState(false)
  const [status, setStatus] = useState<StatusInfo | null>(null)

  useEffect(() => {
    const checkStatus = async () => {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      // Test API endpoints
      const apiStatus = {
        projects: false,
        blog: false,
        skills: false,
      }

      try {
        const [projectsRes, blogRes, skillsRes] = await Promise.all([
          fetch("/api/projects").then((r) => r.ok),
          fetch("/api/blog").then((r) => r.ok),
          fetch("/api/skills").then((r) => r.ok),
        ])

        apiStatus.projects = projectsRes
        apiStatus.blog = blogRes
        apiStatus.skills = skillsRes
      } catch (error) {
        console.error("API status check failed:", error)
      }

      setStatus({
        supabaseConfigured: !!(supabaseUrl && supabaseKey),
        environment: process.env.NODE_ENV || "unknown",
        supabaseUrl: supabaseUrl ? "✅ Configured" : "❌ Missing",
        supabaseKey: supabaseKey ? "✅ Configured" : "❌ Missing",
        apiStatus,
      })
    }

    if (showStatus) {
      checkStatus()
    }
  }, [showStatus])

  if (process.env.NODE_ENV !== "development") {
    return null
  }

  const StatusIcon = ({ condition }: { condition: boolean }) =>
    condition ? <CheckCircle className="w-4 h-4 text-green-500" /> : <XCircle className="w-4 h-4 text-red-500" />

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button variant="outline" size="sm" onClick={() => setShowStatus(!showStatus)} className="mb-2">
        <Settings className="w-4 h-4" />
      </Button>

      {showStatus && status && (
        <Card className="w-80">
          <CardHeader>
            <CardTitle className="text-sm flex items-center">
              <AlertCircle className="w-4 h-4 mr-2" />
              Development Status
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Environment:</span>
                <span className="font-mono">{status.environment}</span>
              </div>

              <div className="flex items-center justify-between">
                <span>Supabase URL:</span>
                <div className="flex items-center">
                  <StatusIcon condition={status.supabaseUrl.includes("✅")} />
                  <span className="ml-1">{status.supabaseUrl.includes("✅") ? "Set" : "Missing"}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span>Supabase Key:</span>
                <div className="flex items-center">
                  <StatusIcon condition={status.supabaseKey.includes("✅")} />
                  <span className="ml-1">{status.supabaseKey.includes("✅") ? "Set" : "Missing"}</span>
                </div>
              </div>
            </div>

            <div className="border-t pt-2">
              <div className="font-semibold mb-2">API Endpoints:</div>
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span>/api/projects:</span>
                  <StatusIcon condition={status.apiStatus.projects} />
                </div>
                <div className="flex items-center justify-between">
                  <span>/api/blog:</span>
                  <StatusIcon condition={status.apiStatus.blog} />
                </div>
                <div className="flex items-center justify-between">
                  <span>/api/skills:</span>
                  <StatusIcon condition={status.apiStatus.skills} />
                </div>
              </div>
            </div>

            <div className="border-t pt-2">
              <div className="font-semibold mb-2">Data Source:</div>
              <div
                className="text-center p-2 rounded"
                style={{
                  backgroundColor: status.supabaseConfigured ? "#dcfce7" : "#fef3c7",
                  color: status.supabaseConfigured ? "#166534" : "#92400e",
                }}
              >
                {status.supabaseConfigured ? "🗄️ Database Connected" : "📝 Using Fallback Data"}
              </div>
            </div>

            {!status.supabaseConfigured && (
              <div className="mt-4 p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-blue-800 dark:text-blue-200">
                <p className="font-semibold">Quick Setup:</p>
                <p>1. Create .env.local</p>
                <p>2. Add Supabase credentials</p>
                <p>3. Restart dev server</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
