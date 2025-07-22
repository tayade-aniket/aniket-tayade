"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface Project {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
  category: string
  github_url: string
  live_url?: string
  blog_url?: string
  highlights: string[]
  featured: boolean
  created_at?: string
  updated_at?: string
}

export interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string
  image: string
  date: string
  tags: string[]
  published: boolean
  slug: string
  created_at?: string
  updated_at?: string
}

export interface Skill {
  id: string
  name: string
  level: number
  category: string
  icon?: string
  created_at?: string
  updated_at?: string
}

interface DataContextType {
  projects: Project[]
  blogPosts: BlogPost[]
  skills: Skill[]
  addProject: (project: Omit<Project, "id" | "created_at" | "updated_at">) => Promise<void>
  updateProject: (id: string, project: Partial<Project>) => Promise<void>
  deleteProject: (id: string) => Promise<void>
  addBlogPost: (post: Omit<BlogPost, "id" | "created_at" | "updated_at">) => Promise<void>
  updateBlogPost: (id: string, post: Partial<BlogPost>) => Promise<void>
  deleteBlogPost: (id: string) => Promise<void>
  addSkill: (skill: Omit<Skill, "id" | "created_at" | "updated_at">) => Promise<void>
  updateSkill: (id: string, skill: Partial<Skill>) => Promise<void>
  deleteSkill: (id: string) => Promise<void>
  loading: boolean
  refreshData: () => Promise<void>
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [projects, setProjects] = useState<Project[]>([])
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects")
      if (response.ok) {
        const data = await response.json()
        setProjects(
          data.map((project: any) => ({
            ...project,
            githubUrl: project.github_url,
            liveUrl: project.live_url,
            blogUrl: project.blog_url,
          })),
        )
      } else {
        console.error("Failed to fetch projects:", response.status, response.statusText)
        // Keep existing projects if API fails
      }
    } catch (error) {
      console.error("Error fetching projects:", error)
      // Keep existing projects if API fails
    }
  }

  const fetchBlogPosts = async () => {
    try {
      const response = await fetch("/api/blog")
      if (response.ok) {
        const data = await response.json()
        setBlogPosts(data)
      } else {
        console.error("Failed to fetch blog posts:", response.status, response.statusText)
        // Keep existing posts if API fails
      }
    } catch (error) {
      console.error("Error fetching blog posts:", error)
      // Keep existing posts if API fails
    }
  }

  const fetchSkills = async () => {
    try {
      const response = await fetch("/api/skills")
      if (response.ok) {
        const data = await response.json()
        setSkills(data)
      } else {
        console.error("Failed to fetch skills:", response.status, response.statusText)
        // Keep existing skills if API fails
      }
    } catch (error) {
      console.error("Error fetching skills:", error)
      // Keep existing skills if API fails
    }
  }

  const refreshData = async () => {
    setLoading(true)
    await Promise.all([fetchProjects(), fetchBlogPosts(), fetchSkills()])
    setLoading(false)
  }

  useEffect(() => {
    refreshData()
  }, [])

  // Project CRUD operations
  const addProject = async (project: Omit<Project, "id" | "created_at" | "updated_at">) => {
    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...project,
          github_url: project.github_url,
          live_url: project.live_url,
          blog_url: project.blog_url,
        }),
      })

      if (response.ok) {
        await fetchProjects()
      } else {
        throw new Error("Failed to add project")
      }
    } catch (error) {
      console.error("Error adding project:", error)
      throw error
    }
  }

  const updateProject = async (id: string, updatedProject: Partial<Project>) => {
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...updatedProject,
          github_url: updatedProject.github_url,
          live_url: updatedProject.live_url,
          blog_url: updatedProject.blog_url,
        }),
      })

      if (response.ok) {
        await fetchProjects()
      } else {
        throw new Error("Failed to update project")
      }
    } catch (error) {
      console.error("Error updating project:", error)
      throw error
    }
  }

  const deleteProject = async (id: string) => {
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        await fetchProjects()
      } else {
        throw new Error("Failed to delete project")
      }
    } catch (error) {
      console.error("Error deleting project:", error)
      throw error
    }
  }

  // Blog CRUD operations
  const addBlogPost = async (post: Omit<BlogPost, "id" | "created_at" | "updated_at">) => {
    try {
      const response = await fetch("/api/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(post),
      })

      if (response.ok) {
        await fetchBlogPosts()
      } else {
        throw new Error("Failed to add blog post")
      }
    } catch (error) {
      console.error("Error adding blog post:", error)
      throw error
    }
  }

  const updateBlogPost = async (id: string, updatedPost: Partial<BlogPost>) => {
    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPost),
      })

      if (response.ok) {
        await fetchBlogPosts()
      } else {
        throw new Error("Failed to update blog post")
      }
    } catch (error) {
      console.error("Error updating blog post:", error)
      throw error
    }
  }

  const deleteBlogPost = async (id: string) => {
    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        await fetchBlogPosts()
      } else {
        throw new Error("Failed to delete blog post")
      }
    } catch (error) {
      console.error("Error deleting blog post:", error)
      throw error
    }
  }

  // Skill CRUD operations
  const addSkill = async (skill: Omit<Skill, "id" | "created_at" | "updated_at">) => {
    try {
      const response = await fetch("/api/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(skill),
      })

      if (response.ok) {
        await fetchSkills()
      } else {
        throw new Error("Failed to add skill")
      }
    } catch (error) {
      console.error("Error adding skill:", error)
      throw error
    }
  }

  const updateSkill = async (id: string, updatedSkill: Partial<Skill>) => {
    try {
      const response = await fetch(`/api/skills/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedSkill),
      })

      if (response.ok) {
        await fetchSkills()
      } else {
        throw new Error("Failed to update skill")
      }
    } catch (error) {
      console.error("Error updating skill:", error)
      throw error
    }
  }

  const deleteSkill = async (id: string) => {
    try {
      const response = await fetch(`/api/skills/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        await fetchSkills()
      } else {
        throw new Error("Failed to delete skill")
      }
    } catch (error) {
      console.error("Error deleting skill:", error)
      throw error
    }
  }

  return (
    <DataContext.Provider
      value={{
        projects,
        blogPosts,
        skills,
        addProject,
        updateProject,
        deleteProject,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        addSkill,
        updateSkill,
        deleteSkill,
        loading,
        refreshData,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider")
  }
  return context
}
