"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FolderOpen, PenTool, Award, Eye } from "lucide-react"
import { useData } from "@/lib/data-context"
import Link from "next/link"

export default function AdminDashboard() {
  const { projects, blogPosts, skills } = useData()

  const stats = [
    {
      title: "Total Projects",
      value: projects.length,
      icon: FolderOpen,
      color: "from-blue-500 to-blue-600",
      href: "/admin/projects",
    },
    {
      title: "Blog Posts",
      value: blogPosts.length,
      icon: PenTool,
      color: "from-purple-500 to-purple-600",
      href: "/admin/blog",
    },
    {
      title: "Skills",
      value: skills.length,
      icon: Award,
      color: "from-gold-500 to-gold-600",
      href: "/admin/skills",
    },
    {
      title: "Portfolio Views",
      value: "1,234",
      icon: Eye,
      color: "from-green-500 to-green-600",
      href: "#",
    },
  ]

  const recentProjects = projects.slice(0, 3)
  const recentPosts = blogPosts.slice(0, 3)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Welcome back, Aniket! Here's your portfolio overview.</p>
        </div>
        <Link href="/">
          <Button
            variant="outline"
            className="border-gold-500 text-gold-600 hover:bg-gold-500 hover:text-white dark:border-gold-400 dark:text-gold-400 bg-transparent"
          >
            <Eye className="w-4 h-4 mr-2" />
            View Portfolio
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="hover:shadow-lg transition-shadow cursor-pointer">
              <Link href={stat.href}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                    </div>
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Link>
            </Card>
          )
        })}
      </div>

      {/* Recent Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Projects</CardTitle>
            <Link href="/admin/projects">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentProjects.map((project) => (
              <div key={project.id} className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <FolderOpen className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{project.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{project.category}</p>
                </div>
                {project.featured && (
                  <span className="px-2 py-1 bg-gold-100 text-gold-800 text-xs rounded-full">Featured</span>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Blog Posts */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Blog Posts</CardTitle>
            <Link href="/admin/blog">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentPosts.map((post) => (
              <div key={post.id} className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <PenTool className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{post.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{new Date(post.date).toLocaleDateString()}</p>
                </div>
                {post.published && (
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Published</span>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/admin/projects">
              <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                <FolderOpen className="w-4 h-4 mr-2" />
                Add New Project
              </Button>
            </Link>
            <Link href="/admin/blog">
              <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700">
                <PenTool className="w-4 h-4 mr-2" />
                Write Blog Post
              </Button>
            </Link>
            <Link href="/admin/skills">
              <Button className="w-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700">
                <Award className="w-4 h-4 mr-2" />
                Update Skills
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
