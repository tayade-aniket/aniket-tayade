"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, GraduationCap, Award } from "lucide-react"
import { motion } from "framer-motion"

export default function AboutSection() {
  const certifications = [
    "Google Data Analytics Certificate",
    "DataCamp Data Scientist Track",
    "Coursera Machine Learning Specialization",
    "AWS Cloud Practitioner",
    "Microsoft Azure Data Scientist Associate",
  ]

  const technologies = [
    "Python",
    "R",
    "SQL",
    "JavaScript",
    "Git",
    "pandas",
    "NumPy",
    "scikit-learn",
    "TensorFlow",
    "PyTorch",
    "Matplotlib",
    "Seaborn",
    "Plotly",
    "Tableau",
    "Power BI",
    "PostgreSQL",
    "MongoDB",
    "AWS",
    "Docker",
    "Jupyter",
  ]

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm Aniket Tayade, a passionate Junior Data Scientist with a strong foundation in statistical analysis,
                machine learning, and data visualization. I love uncovering patterns in complex datasets and translating
                them into actionable business insights that drive real-world impact.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                With hands-on experience in Python, R, and various ML frameworks, I specialize in building predictive
                models, creating interactive dashboards, and automating data pipelines. I'm constantly learning new
                technologies and methodologies to stay at the forefront of data science innovation.
              </p>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <GraduationCap className="w-5 h-5 mr-2 text-blue-600" />
                    <h3 className="text-lg font-semibold">Education</h3>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold">Bachelor of Science in Data Science</p>
                      <p className="text-muted-foreground">University of Mumbai</p>
                      <p className="text-sm text-muted-foreground">CGPA: 8.5/10 | 2020-2024</p>
                    </div>
                    <div>
                      <p className="font-semibold">Relevant Coursework</p>
                      <p className="text-sm text-muted-foreground">
                        Statistics, Machine Learning, Data Mining, Database Systems, Python Programming, R Programming,
                        Data Visualization
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Download className="w-4 h-4 mr-2" />
                Download Full Resume
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Award className="w-5 h-5 mr-2 text-purple-600" />
                  <h3 className="text-lg font-semibold">Certifications</h3>
                </div>
                <div className="space-y-2">
                  {certifications.map((cert, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 flex-shrink-0"></div>
                      <span className="text-muted-foreground text-sm">{cert}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Technologies & Tools</h3>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors cursor-default"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
