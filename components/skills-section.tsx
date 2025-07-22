"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import { useData } from "@/lib/data-context"

export default function SkillsSection() {
  const { skills, loading } = useData()

  if (loading) {
    return (
      <section id="skills" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading skills...</p>
          </div>
        </div>
      </section>
    )
  }

  const categories = Array.from(new Set(skills.map((skill) => skill.category)))
  const categoryColors: Record<string, string> = {
    Programming: "from-blue-500 to-blue-600",
    "ML/AI": "from-purple-500 to-purple-600",
    Visualization: "from-green-500 to-green-600",
    Cloud: "from-orange-500 to-orange-600",
  }

  return (
    <section id="skills" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Skills & Technologies</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mb-8"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and proficiency levels across various data science domains.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Skills Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-6 text-center">Skill Proficiency Overview</h3>
              <div className="space-y-4">
                {skills.slice(0, 8).map((skill) => (
                  <div key={skill.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} className="h-3" />
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Skills by Category */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {categories.map((category) => (
              <Card key={category}>
                <CardContent className="p-6">
                  <h3
                    className={`text-lg font-semibold mb-4 bg-gradient-to-r ${
                      categoryColors[category] || "from-gray-500 to-gray-600"
                    } bg-clip-text text-transparent`}
                  >
                    {category}
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {skills
                      .filter((skill) => skill.category === category)
                      .map((skill) => (
                        <div key={skill.id} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-sm">{skill.name}</span>
                            <span className="text-xs text-muted-foreground">{skill.level}%</span>
                          </div>
                          <Progress value={skill.level} className="h-2" />
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
