"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Plus, Edit, Trash2, Eye, Calendar, Clock } from "lucide-react"
import { useData, type BlogPost } from "@/lib/data-context"
import { slugify } from "@/lib/utils"
import Image from "next/image"

export default function AdminBlog() {
  const { blogPosts, addBlogPost, updateBlogPost, deleteBlogPost } = useData()
  const [isEditing, setIsEditing] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [previewPost, setPreviewPost] = useState<BlogPost | null>(null)

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    image: "",
    tags: "",
    published: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const postData = {
      ...formData,
      tags: formData.tags.split(",").map((tag) => tag.trim()),
      date: new Date().toISOString(),
      slug: slugify(formData.title),
    }

    if (isEditing && editingPost) {
      updateBlogPost(editingPost.id, postData)
    } else {
      addBlogPost(postData)
    }

    resetForm()
  }

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      excerpt: "",
      image: "",
      tags: "",
      published: false,
    })
    setIsEditing(false)
    setEditingPost(null)
  }

  const handleEdit = (post: BlogPost) => {
    setFormData({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt,
      image: post.image,
      tags: post.tags.join(", "),
      published: post.published,
    })
    setEditingPost(post)
    setIsEditing(true)
  }

  const handlePreview = (post: BlogPost) => {
    setPreviewPost(post)
    setShowPreview(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      deleteBlogPost(id)
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Blog Management</h1>
          <p className="text-muted-foreground">Manage your blog posts and articles</p>
        </div>
        <Button onClick={() => setIsEditing(!isEditing)} className="bg-gradient-to-r from-purple-600 to-pink-600">
          <Plus className="w-4 h-4 mr-2" />
          {isEditing ? "Cancel" : "New Post"}
        </Button>
      </div>

      {/* Add/Edit Form */}
      {isEditing && (
        <Card>
          <CardHeader>
            <CardTitle>{editingPost ? "Edit Blog Post" : "Create New Blog Post"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Post Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="excerpt">Excerpt *</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  rows={2}
                  placeholder="Brief description of the blog post..."
                  required
                />
              </div>

              <div>
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={10}
                  placeholder="Write your blog post content here..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="image">Featured Image URL</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="/placeholder.svg?height=200&width=300"
                  />
                </div>
                <div>
                  <Label htmlFor="tags">Tags (comma-separated) *</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="Machine Learning, Python, Tutorial"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="published"
                  checked={formData.published}
                  onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                />
                <Label htmlFor="published">Publish immediately</Label>
              </div>

              <div className="flex space-x-2">
                <Button type="submit" className="bg-gradient-to-r from-green-600 to-green-700">
                  {editingPost ? "Update Post" : "Create Post"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Blog Posts List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <Card key={post.id} className="hover:shadow-lg transition-shadow">
            <div className="relative">
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                width={300}
                height={150}
                className="w-full h-32 object-cover rounded-t-lg"
              />
              <Badge
                className={`absolute top-2 right-2 ${post.published ? "bg-green-500" : "bg-yellow-500 text-black"}`}
              >
                {post.published ? "Published" : "Draft"}
              </Badge>
            </div>

            <CardHeader className="pb-2">
              <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(post.date).toLocaleDateString()}
                <Clock className="w-4 h-4 ml-4 mr-1" />5 min read
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>

              <div className="flex flex-wrap gap-1">
                {post.tags.slice(0, 3).map((tag, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {post.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{post.tags.length - 3}
                  </Badge>
                )}
              </div>

              <div className="flex justify-between items-center pt-2">
                <div className="text-xs text-muted-foreground">Slug: /{post.slug}</div>

                <div className="flex space-x-1">
                  <Button size="sm" variant="ghost" onClick={() => handlePreview(post)}>
                    <Eye className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleEdit(post)}>
                    <Edit className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => handleDelete(post.id)}>
                    <Trash2 className="w-3 h-3 text-red-500" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Preview Modal */}
      {showPreview && previewPost && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{previewPost.title}</CardTitle>
                  <div className="flex items-center text-sm text-muted-foreground mt-2">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(previewPost.date).toLocaleDateString()}
                    <Clock className="w-4 h-4 ml-4 mr-1" />5 min read
                  </div>
                </div>
                <Button variant="ghost" onClick={() => setShowPreview(false)}>
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Image
                src={previewPost.image || "/placeholder.svg"}
                alt={previewPost.title}
                width={800}
                height={400}
                className="w-full h-64 object-cover rounded-lg"
              />

              <div className="flex flex-wrap gap-2">
                {previewPost.tags.map((tag, idx) => (
                  <Badge key={idx} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="prose max-w-none">
                <p className="text-lg text-muted-foreground italic border-l-4 border-blue-500 pl-4">
                  {previewPost.excerpt}
                </p>
                <div className="mt-6 whitespace-pre-wrap">{previewPost.content}</div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
