"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, ExternalLink } from "lucide-react"

export default function SetupGuide() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const envTemplate = `# Add these to your .env.local file
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key`

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <Card className="max-w-2xl w-full">
        <CardHeader>
          <CardTitle className="text-2xl text-center">🚀 Setup Required</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center text-muted-foreground">
            Your portfolio is almost ready! Follow these steps to complete the setup:
          </div>

          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">1. Create Supabase Project</h3>
              <p className="text-sm text-muted-foreground mb-2">Sign up at Supabase and create a new project</p>
              <Button variant="outline" size="sm" asChild>
                <a href="https://supabase.com" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Go to Supabase
                </a>
              </Button>
            </div>

            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">2. Add Environment Variables</h3>
              <p className="text-sm text-muted-foreground mb-2">Create a .env.local file in your project root:</p>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm font-mono relative">
                <pre>{envTemplate}</pre>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => copyToClipboard(envTemplate)}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">3. Run Database Scripts</h3>
              <p className="text-sm text-muted-foreground">
                In your Supabase SQL Editor, run the scripts in the /scripts folder:
              </p>
              <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                <li>• scripts/01-create-tables.sql</li>
                <li>• scripts/02-seed-data.sql</li>
              </ul>
            </div>

            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold mb-2">4. Restart Development Server</h3>
              <p className="text-sm text-muted-foreground">
                After adding environment variables, restart your dev server:
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-sm font-mono mt-2">npm run dev</div>
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            Once setup is complete, this page will automatically show your portfolio data.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
