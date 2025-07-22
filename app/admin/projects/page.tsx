"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Plus, Edit, Trash2, Eye, Github, ExternalLink, FileText } from "lucide-react"
import { useData, type Project } from "@/lib/data-context"
import Image from "next/image"

export default function AdminProjects() {
  const { projects, addProject, updateProject, deleteProject } = useData()
  const [isEditing, setIsEditing] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [previewProject, setPreviewProject] = useState<Project | null>(null)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    technologies: "",
    category: "",
    githubUrl: "",
    liveUrl: "",
    blogUrl: "",
    highlights: "",
    featured: false,
  })

  const categories = ["Machine Learning", "Data Analysis", "Data Visualization", "NLP", "Data Engineering"]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const projectData = {
      ...formData,
      technologies: formData.technologies.split(",").map((tech) => tech.trim()),
      highlights: formData.highlights.split(",").map((highlight) => highlight.trim()),
    }

    if (isEditing && editingProject) {
      updateProject(editingProject.id, projectData)
    } else {
      addProject(projectData)
    }

    resetForm()
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      image: "",
      technologies: "",
      category: "",
      githubUrl: "",
      liveUrl: "",
      blogUrl: "",
      highlights: "",
      featured: false,
    })
    setIsEditing(false)
    setEditingProject(null)
  }

  const handleEdit = (project: Project) => {
    setFormData({
      title: project.title,
      description: project.description,
      image: project.image,
      technologies: project.technologies.join(", "),
      category: project.category,
      githubUrl: project.githubUrl,
      liveUrl: project.liveUrl || "",
      blogUrl: project.blogUrl || "",
      highlights: project.highlights.join(", "),
      featured: project.featured,
    })
    setEditingProject(project)
    setIsEditing(true)
  }

  const handlePreview = (project: Project) => {
    setPreviewProject(project)
    setShowPreview(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      deleteProject(id)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects Management</h1>
          <p className="text-muted-foreground">Manage your portfolio projects</p>
        </div>
        <Button onClick={() => setIsEditing(!isEditing)} className="bg-gradient-to-r from-blue-600 to-purple-600">
          <Plus className="w-4 h-4 mr-2" />
          {isEditing ? "Cancel" : "Add Project"}
        </Button>
      </div>

      {/* Add/Edit Form */}
      {isEditing && (
        <Card>
          <CardHeader>
            <CardTitle>{editingProject ? "Edit Project" : "Add New Project"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Project Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  required
                />
              </div>

              <div>
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="/placeholder.svg?height=300&width=400"
                />
              </div>

              <div>
                <Label htmlFor="technologies">Technologies (comma-separated) *</Label>
                <Input
                  id="technologies"
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  placeholder="Python, scikit-learn, pandas"
                  required
                />
              </div>

              <div>
                <Label htmlFor="highlights">Key Highlights (comma-separated) *</Label>
                <Textarea
                  id="highlights"
                  value={formData.highlights}
                  onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
                  placeholder="95% accuracy, Real-time processing, Deployed on AWS"
                  rows={2}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="githubUrl">GitHub URL *</Label>
                  <Input
                    id="githubUrl"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    placeholder="https://github.com/username/repo"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="liveUrl">Live Demo URL</Label>
                  <Input
                    id="liveUrl"
                    value={formData.liveUrl}
                    onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                    placeholder="https://demo.example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="blogUrl">Blog Post URL</Label>
                  <Input
                    id="blogUrl"
                    value={formData.blogUrl}
                    onChange={(e) => setFormData({ ...formData, blogUrl: e.target.value })}
                    placeholder="/blog/project-name"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                />
                <Label htmlFor="featured">Featured Project</Label>
              </div>

              <div className="flex space-x-2">
                <Button type="submit" className="bg-gradient-to-r from-green-600 to-green-700">
                  {editingProject ? "Update Project" : "Add Project"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Projects List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <div className="relative">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                width={400}
                height={200}
                className="w-full h-32 object-cover rounded-t-lg"
              />
              {project.featured && <Badge className="absolute top-2 right-2 bg-gold-500 text-black">Featured</Badge>}
            </div>

            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{project.title}</CardTitle>
              <Badge variant="secondary">{project.category}</Badge>
            </CardHeader>

            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>

              <div className="flex flex-wrap gap-1">
                {project.technologies.slice(0, 3).map((tech, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {tech}
                  </Badge>
                ))}
                {project.technologies.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{project.technologies.length - 3}
                  </Badge>
                )}
              </div>

              <div className="flex justify-between items-center pt-2">
                <div className="flex space-x-1">
                  {project.githubUrl && (
                    <Button size="sm" variant="ghost" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="w-3 h-3" />
                      </a>
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button size="sm" variant="ghost" asChild>
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </Button>
                  )}
                  {project.blogUrl && (
                    <Button size="sm" variant="ghost" asChild>
                      <a href={project.blogUrl} target="_blank" rel="noopener noreferrer">
                        <FileText className="w-3 h-3" />
                      </a>
                    </Button>
                  )}
                </div>

                <div className="flex space-x-1">
                  <Button size="sm" variant="ghost" onClick={() => handlePreview(project)}>
                    <Eye className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleEdit(project)}>
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleDelete(project.id)}>
                    <Trash2 className="w-3 h-3 text-red-500" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Preview Modal */}
      {showPreview && previewProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>Preview: {previewProject.title}</CardTitle>
                <Button variant="ghost" onClick={() => setShowPreview(false)}>
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Image
                src={previewProject.image || "/placeholder.svg"}
                alt={previewProject.title}
                width={600}
                height={300}
                className="w-full h-48 object-cover rounded-lg"
              />

              <div className="flex items-center justify-between">
                <Badge variant="secondary">{previewProject.category}</Badge>
                {previewProject.featured && <Badge className="bg-gold-500 text-black">Featured</Badge>}
              </div>

              <p className="text-muted-foreground">{previewProject.description}</p>

              <div>
                <h4 className="font-semibold mb-2">Technologies:</h4>
                <div className="flex flex-wrap gap-1">
                  {previewProject.technologies.map((tech, idx) => (
                    <Badge key={idx} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Key Highlights:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  {previewProject.highlights.map((highlight, idx) => (
                    <li key={idx}>{highlight}</li>
                  ))}
                </ul>
              </div>

              <div className="flex space-x-2">
                {previewProject.githubUrl && (
                  <Button size="sm" asChild>
                    <a href={previewProject.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </a>
                  </Button>
                )}
                {previewProject.liveUrl && (
                  <Button size="sm" variant="outline" asChild>
                    <a href={previewProject.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                )}
                {previewProject.blogUrl && (
                  <Button size="sm" variant="outline" asChild>
                    <a href={previewProject.blogUrl} target="_blank" rel="noopener noreferrer">
                      <FileText className="w-4 h-4 mr-2" />
                      Blog Post
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
