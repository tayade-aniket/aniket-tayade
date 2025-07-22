"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, Download, Eye, FileText, Trash2 } from "lucide-react"

export default function AdminResume() {
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [resumeUrl, setResumeUrl] = useState<string>("")
  const [isUploading, setIsUploading] = useState(false)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === "application/pdf") {
      setResumeFile(file)
      // In a real app, you would upload to a cloud storage service
      const url = URL.createObjectURL(file)
      setResumeUrl(url)
    } else {
      alert("Please select a PDF file")
    }
  }

  const handleUpload = async () => {
    if (!resumeFile) return

    setIsUploading(true)

    // Simulate upload process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // In a real app, you would upload to cloud storage and get a permanent URL
    console.log("Resume uploaded:", resumeFile.name)

    setIsUploading(false)
    alert("Resume uploaded successfully!")
  }

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete the current resume?")) {
      setResumeFile(null)
      setResumeUrl("")
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Resume Management</h1>
        <p className="text-muted-foreground">Upload and manage your resume PDF</p>
      </div>

      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle>Upload Resume</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="resume">Select PDF Resume *</Label>
            <Input id="resume" type="file" accept=".pdf" onChange={handleFileUpload} className="mt-2" />
            <p className="text-sm text-muted-foreground mt-1">Only PDF files are accepted. Maximum size: 5MB</p>
          </div>

          {resumeFile && (
            <div className="p-4 bg-muted rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="font-medium">{resumeFile.name}</p>
                    <p className="text-sm text-muted-foreground">{(resumeFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {resumeUrl && (
                    <Button size="sm" variant="outline" asChild>
                      <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </a>
                    </Button>
                  )}
                  <Button size="sm" variant="ghost" onClick={handleDelete}>
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          <Button
            onClick={handleUpload}
            disabled={!resumeFile || isUploading}
            className="bg-gradient-to-r from-blue-600 to-purple-600"
          >
            {isUploading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Upload Resume
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Current Resume */}
      <Card>
        <CardHeader>
          <CardTitle>Current Resume</CardTitle>
        </CardHeader>
        <CardContent>
          {resumeUrl ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-800 dark:text-green-200">
                      Resume is active and available for download
                    </p>
                    <p className="text-sm text-green-600 dark:text-green-400">
                      Last updated: {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" asChild>
                    <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </a>
                  </Button>
                  <Button size="sm" asChild>
                    <a href={resumeUrl} download="Aniket_Tayade_Resume.pdf">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </a>
                  </Button>
                </div>
              </div>

              {/* Resume Preview */}
              <div className="border rounded-lg overflow-hidden">
                <iframe src={resumeUrl} className="w-full h-96" title="Resume Preview" />
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No resume uploaded yet</p>
              <p className="text-sm text-muted-foreground">Upload a PDF resume to make it available for download</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Resume Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Resume Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Best Practices:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Keep it to 1-2 pages maximum</li>
                <li>• Use a clean, professional format</li>
                <li>• Include relevant keywords for ATS</li>
                <li>• Quantify your achievements</li>
                <li>• Proofread for errors</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Technical Requirements:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• PDF format only</li>
                <li>• Maximum file size: 5MB</li>
                <li>• Readable fonts and formatting</li>
                <li>• No password protection</li>
                <li>• Optimized for web viewing</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
