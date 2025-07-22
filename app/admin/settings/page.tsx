"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import {
  User,
  Globe,
  Mail,
  Shield,
  Save,
  RefreshCw,
  Upload,
  Download,
  CheckCircle,
  AlertCircle,
  Info,
} from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { isSupabaseConfigured } from "@/lib/supabase"

interface ProfileSettings {
  name: string
  email: string
  bio: string
  location: string
  website: string
  github: string
  linkedin: string
  twitter: string
  avatar: string
}

interface SiteSettings {
  title: string
  description: string
  keywords: string
  favicon: string
  logo: string
  primaryColor: string
  secondaryColor: string
  darkMode: boolean
  maintenanceMode: boolean
}

interface ContactSettings {
  contactEmail: string
  phone: string
  address: string
  showContactForm: boolean
  emailNotifications: boolean
  autoReply: boolean
  autoReplyMessage: string
}

interface SecuritySettings {
  twoFactorEnabled: boolean
  sessionTimeout: number
  allowedDomains: string
  backupFrequency: string
  lastBackup: string
}

export default function AdminSettings() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("profile")
  const [saving, setSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle")
  const [showApiKey, setShowApiKey] = useState(false)

  // Settings state
  const [profileSettings, setProfileSettings] = useState<ProfileSettings>({
    name: "Aniket Tayade",
    email: "aniket@example.com",
    bio: "Junior Data Scientist passionate about turning data into actionable insights and building intelligent solutions that drive business impact.",
    location: "Mumbai, Maharashtra, India",
    website: "https://anikettayade.com",
    github: "https://github.com/anikettayade",
    linkedin: "https://linkedin.com/in/anikettayade",
    twitter: "https://twitter.com/anikettayade",
    avatar: "/placeholder.svg?height=100&width=100",
  })

  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    title: "Aniket Tayade - Junior Data Scientist Portfolio",
    description:
      "Turning data into insights and insights into action. Portfolio of Aniket Tayade, Junior Data Scientist specializing in machine learning, data visualization, and predictive analytics.",
    keywords: "data scientist, machine learning, python, portfolio, data analysis, AI, Aniket Tayade",
    favicon: "/favicon.ico",
    logo: "/logo.png",
    primaryColor: "#3b82f6",
    secondaryColor: "#8b5cf6",
    darkMode: true,
    maintenanceMode: false,
  })

  const [contactSettings, setContactSettings] = useState<ContactSettings>({
    contactEmail: "aniket.tayade@email.com",
    phone: "+91 98765 43210",
    address: "Mumbai, Maharashtra, India",
    showContactForm: true,
    emailNotifications: true,
    autoReply: true,
    autoReplyMessage: "Thank you for your message! I'll get back to you within 24 hours.",
  })

  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    twoFactorEnabled: false,
    sessionTimeout: 60,
    allowedDomains: "localhost, vercel.app, netlify.app",
    backupFrequency: "weekly",
    lastBackup: new Date().toISOString(),
  })

  const handleSave = async (section: string) => {
    setSaving(true)
    setSaveStatus("idle")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real app, you would save to your backend/database
      console.log(`Saving ${section} settings:`, {
        profile: profileSettings,
        site: siteSettings,
        contact: contactSettings,
        security: securitySettings,
      })

      setSaveStatus("success")
      setTimeout(() => setSaveStatus("idle"), 3000)
    } catch (error) {
      console.error("Error saving settings:", error)
      setSaveStatus("error")
      setTimeout(() => setSaveStatus("idle"), 3000)
    } finally {
      setSaving(false)
    }
  }

  const handleExportSettings = () => {
    const settings = {
      profile: profileSettings,
      site: siteSettings,
      contact: contactSettings,
      security: { ...securitySettings, twoFactorEnabled: false }, // Don't export sensitive settings
    }

    const dataStr = JSON.stringify(settings, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = "portfolio-settings.json"
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleImportSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const settings = JSON.parse(e.target?.result as string)
        if (settings.profile) setProfileSettings(settings.profile)
        if (settings.site) setSiteSettings(settings.site)
        if (settings.contact) setContactSettings(settings.contact)
        if (settings.security) setSecuritySettings((prev) => ({ ...prev, ...settings.security }))
        setSaveStatus("success")
        setTimeout(() => setSaveStatus("idle"), 3000)
      } catch (error) {
        console.error("Error importing settings:", error)
        setSaveStatus("error")
        setTimeout(() => setSaveStatus("idle"), 3000)
      }
    }
    reader.readAsText(file)
  }

  const StatusAlert = () => {
    if (saveStatus === "idle") return null

    return (
      <Alert className={`mb-4 ${saveStatus === "success" ? "border-green-500" : "border-red-500"}`}>
        <div className="flex items-center">
          {saveStatus === "success" ? (
            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-500 mr-2" />
          )}
          <AlertDescription>
            {saveStatus === "success" ? "Settings saved successfully!" : "Error saving settings. Please try again."}
          </AlertDescription>
        </div>
      </Alert>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your portfolio configuration and preferences</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleExportSettings}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" onClick={() => document.getElementById("import-file")?.click()}>
            <Upload className="w-4 h-4 mr-2" />
            Import
          </Button>
          <input id="import-file" type="file" accept=".json" onChange={handleImportSettings} className="hidden" />
        </div>
      </div>

      <StatusAlert />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile" className="flex items-center">
            <User className="w-4 h-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="site" className="flex items-center">
            <Globe className="w-4 h-4 mr-2" />
            Site
          </TabsTrigger>
          <TabsTrigger value="contact" className="flex items-center">
            <Mail className="w-4 h-4 mr-2" />
            Contact
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center">
            <Shield className="w-4 h-4 mr-2" />
            Security
          </TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profileSettings.name}
                    onChange={(e) => setProfileSettings((prev) => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileSettings.email}
                    onChange={(e) => setProfileSettings((prev) => ({ ...prev, email: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  rows={3}
                  value={profileSettings.bio}
                  onChange={(e) => setProfileSettings((prev) => ({ ...prev, bio: e.target.value }))}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={profileSettings.location}
                    onChange={(e) => setProfileSettings((prev) => ({ ...prev, location: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={profileSettings.website}
                    onChange={(e) => setProfileSettings((prev) => ({ ...prev, website: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="github">GitHub URL</Label>
                  <Input
                    id="github"
                    value={profileSettings.github}
                    onChange={(e) => setProfileSettings((prev) => ({ ...prev, github: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="linkedin">LinkedIn URL</Label>
                  <Input
                    id="linkedin"
                    value={profileSettings.linkedin}
                    onChange={(e) => setProfileSettings((prev) => ({ ...prev, linkedin: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="twitter">Twitter URL</Label>
                  <Input
                    id="twitter"
                    value={profileSettings.twitter}
                    onChange={(e) => setProfileSettings((prev) => ({ ...prev, twitter: e.target.value }))}
                  />
                </div>
              </div>

              <Button onClick={() => handleSave("profile")} disabled={saving}>
                {saving ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Save Profile
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Site Settings */}
        <TabsContent value="site" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="w-5 h-5 mr-2" />
                Site Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="site-title">Site Title</Label>
                <Input
                  id="site-title"
                  value={siteSettings.title}
                  onChange={(e) => setSiteSettings((prev) => ({ ...prev, title: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="site-description">Site Description</Label>
                <Textarea
                  id="site-description"
                  rows={3}
                  value={siteSettings.description}
                  onChange={(e) => setSiteSettings((prev) => ({ ...prev, description: e.target.value }))}
                />
              </div>

              <div>
                <Label htmlFor="keywords">SEO Keywords</Label>
                <Input
                  id="keywords"
                  value={siteSettings.keywords}
                  onChange={(e) => setSiteSettings((prev) => ({ ...prev, keywords: e.target.value }))}
                  placeholder="Comma-separated keywords"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="primary-color">Primary Color</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="primary-color"
                      type="color"
                      value={siteSettings.primaryColor}
                      onChange={(e) => setSiteSettings((prev) => ({ ...prev, primaryColor: e.target.value }))}
                      className="w-16 h-10"
                    />
                    <Input
                      value={siteSettings.primaryColor}
                      onChange={(e) => setSiteSettings((prev) => ({ ...prev, primaryColor: e.target.value }))}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="secondary-color">Secondary Color</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="secondary-color"
                      type="color"
                      value={siteSettings.secondaryColor}
                      onChange={(e) => setSiteSettings((prev) => ({ ...prev, secondaryColor: e.target.value }))}
                      className="w-16 h-10"
                    />
                    <Input
                      value={siteSettings.secondaryColor}
                      onChange={(e) => setSiteSettings((prev) => ({ ...prev, secondaryColor: e.target.value }))}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Dark Mode Default</Label>
                  <p className="text-sm text-muted-foreground">Enable dark mode by default for new visitors</p>
                </div>
                <Switch
                  checked={siteSettings.darkMode}
                  onCheckedChange={(checked) => setSiteSettings((prev) => ({ ...prev, darkMode: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">Show maintenance page to visitors</p>
                </div>
                <Switch
                  checked={siteSettings.maintenanceMode}
                  onCheckedChange={(checked) => setSiteSettings((prev) => ({ ...prev, maintenanceMode: checked }))}
                />
              </div>

              <Button onClick={() => handleSave("site")} disabled={saving}>
                {saving ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Save Site Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Settings */}
        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                Contact Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contact-email">Contact Email</Label>
                  <Input
                    id="contact-email"
                    type="email"
                    value={contactSettings.contactEmail}
                    onChange={(e) => setContactSettings((prev) => ({ ...prev, contactEmail: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={contactSettings.phone}
                    onChange={(e) => setContactSettings((prev) => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={contactSettings.address}
                  onChange={(e) => setContactSettings((prev) => ({ ...prev, address: e.target.value }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Show Contact Form</Label>
                  <p className="text-sm text-muted-foreground">Display contact form on the website</p>
                </div>
                <Switch
                  checked={contactSettings.showContactForm}
                  onCheckedChange={(checked) => setContactSettings((prev) => ({ ...prev, showContactForm: checked }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive email notifications for new messages</p>
                </div>
                <Switch
                  checked={contactSettings.emailNotifications}
                  onCheckedChange={(checked) =>
                    setContactSettings((prev) => ({ ...prev, emailNotifications: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto Reply</Label>
                  <p className="text-sm text-muted-foreground">Send automatic reply to contact form submissions</p>
                </div>
                <Switch
                  checked={contactSettings.autoReply}
                  onCheckedChange={(checked) => setContactSettings((prev) => ({ ...prev, autoReply: checked }))}
                />
              </div>

              {contactSettings.autoReply && (
                <div>
                  <Label htmlFor="auto-reply-message">Auto Reply Message</Label>
                  <Textarea
                    id="auto-reply-message"
                    rows={3}
                    value={contactSettings.autoReplyMessage}
                    onChange={(e) => setContactSettings((prev) => ({ ...prev, autoReplyMessage: e.target.value }))}
                  />
                </div>
              )}

              <Button onClick={() => handleSave("contact")} disabled={saving}>
                {saving ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Save Contact Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Security & Backup
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
                <Switch
                  checked={securitySettings.twoFactorEnabled}
                  onCheckedChange={(checked) => setSecuritySettings((prev) => ({ ...prev, twoFactorEnabled: checked }))}
                />
              </div>

              <div>
                <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                <Select
                  value={securitySettings.sessionTimeout.toString()}
                  onValueChange={(value) =>
                    setSecuritySettings((prev) => ({ ...prev, sessionTimeout: Number.parseInt(value) }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                    <SelectItem value="480">8 hours</SelectItem>
                    <SelectItem value="1440">24 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="allowed-domains">Allowed Domains</Label>
                <Input
                  id="allowed-domains"
                  value={securitySettings.allowedDomains}
                  onChange={(e) => setSecuritySettings((prev) => ({ ...prev, allowedDomains: e.target.value }))}
                  placeholder="localhost, yourdomain.com"
                />
                <p className="text-sm text-muted-foreground mt-1">Comma-separated list of allowed domains</p>
              </div>

              <div>
                <Label htmlFor="backup-frequency">Backup Frequency</Label>
                <Select
                  value={securitySettings.backupFrequency}
                  onValueChange={(value) => setSecuritySettings((prev) => ({ ...prev, backupFrequency: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="manual">Manual Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Database Status</Label>
                    <p className="text-sm text-muted-foreground">
                      {isSupabaseConfigured() ? "Connected to Supabase" : "Using fallback data"}
                    </p>
                  </div>
                  <Badge variant={isSupabaseConfigured() ? "default" : "secondary"}>
                    {isSupabaseConfigured() ? "Connected" : "Offline"}
                  </Badge>
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Last Backup</Label>
                    <p className="text-sm text-muted-foreground">
                      {new Date(securitySettings.lastBackup).toLocaleDateString()}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Create Backup
                  </Button>
                </div>
              </div>

              <Alert>
                <Info className="w-4 h-4" />
                <AlertDescription>
                  Security settings are automatically applied. Changes to session timeout will take effect on next
                  login.
                </AlertDescription>
              </Alert>

              <Button onClick={() => handleSave("security")} disabled={saving}>
                {saving ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                Save Security Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
