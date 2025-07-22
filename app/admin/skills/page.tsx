"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Plus, Edit, Trash2, Code, Brain, BarChart3, Cloud } from "lucide-react"
import { useData, type Skill } from "@/lib/data-context"

const categoryIcons = {
  Programming: Code,
  "ML/AI": Brain,
  Visualization: BarChart3,
  Cloud: Cloud,
}

export default function AdminSkills() {
  const { skills, addSkill, updateSkill, deleteSkill } = useData()
  const [isEditing, setIsEditing] = useState(false)
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    level: 50,
    category: "",
  })

  const categories = ["Programming", "ML/AI", "Visualization", "Cloud"]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (isEditing && editingSkill) {
      updateSkill(editingSkill.id, formData)
    } else {
      addSkill(formData)
    }

    resetForm()
  }

  const resetForm = () => {
    setFormData({
      name: "",
      level: 50,
      category: "",
    })
    setIsEditing(false)
    setEditingSkill(null)
  }

  const handleEdit = (skill: Skill) => {
    setFormData({
      name: skill.name,
      level: skill.level,
      category: skill.category,
    })
    setEditingSkill(skill)
    setIsEditing(true)
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this skill?")) {
      deleteSkill(id)
    }
  }

  const skillsByCategory = categories.reduce(
    (acc, category) => {
      acc[category] = skills.filter((skill) => skill.category === category)
      return acc
    },
    {} as Record<string, Skill[]>,
  )

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Skills Management</h1>
          <p className="text-muted-foreground">Manage your technical skills and proficiency levels</p>
        </div>
        <Button onClick={() => setIsEditing(!isEditing)} className="bg-gradient-to-r from-gold-600 to-amber-600">
          <Plus className="w-4 h-4 mr-2" />
          {isEditing ? "Cancel" : "Add Skill"}
        </Button>
      </div>

      {/* Add/Edit Form */}
      {isEditing && (
        <Card>
          <CardHeader>
            <CardTitle>{editingSkill ? "Edit Skill" : "Add New Skill"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Skill Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Python, Machine Learning"
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
                <Label htmlFor="level">Proficiency Level: {formData.level}%</Label>
                <div className="mt-2">
                  <Slider
                    value={[formData.level]}
                    onValueChange={(value) => setFormData({ ...formData, level: value[0] })}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                </div>
                <div className="mt-2">
                  <Progress value={formData.level} className="h-2" />
                </div>
              </div>

              <div className="flex space-x-2">
                <Button type="submit" className="bg-gradient-to-r from-green-600 to-green-700">
                  {editingSkill ? "Update Skill" : "Add Skill"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Skills by Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => {
          const Icon = categoryIcons[category as keyof typeof categoryIcons]
          const categorySkills = skillsByCategory[category] || []

          return (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Icon className="w-5 h-5 mr-2" />
                  {category}
                  <span className="ml-auto text-sm font-normal text-muted-foreground">
                    {categorySkills.length} skills
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {categorySkills.length > 0 ? (
                  categorySkills.map((skill) => (
                    <div key={skill.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{skill.name}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">{skill.level}%</span>
                          <Button size="sm" variant="ghost" onClick={() => handleEdit(skill)}>
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="ghost" onClick={() => handleDelete(skill.id)}>
                            <Trash2 className="w-3 h-3 text-red-500" />
                          </Button>
                        </div>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-center py-4">No skills in this category yet.</p>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Skills Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Skills Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {categories.map((category) => {
              const categorySkills = skillsByCategory[category] || []
              const averageLevel =
                categorySkills.length > 0
                  ? Math.round(categorySkills.reduce((sum, skill) => sum + skill.level, 0) / categorySkills.length)
                  : 0

              return (
                <div key={category} className="text-center">
                  <div className="text-2xl font-bold">{categorySkills.length}</div>
                  <div className="text-sm text-muted-foreground">{category}</div>
                  <div className="text-sm text-muted-foreground">Avg: {averageLevel}%</div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
