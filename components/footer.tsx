"use client"

import { Button } from "@/components/ui/button"
import { Github, Linkedin, ExternalLink, Heart, Mail, Shield } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Aniket Tayade
            </h3>
            <p className="text-muted-foreground mb-4 max-w-md">
              Junior Data Scientist passionate about turning data into actionable insights and building intelligent
              solutions that drive business impact. Always learning, always growing.
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" asChild>
                <a href="https://github.com/tayade-aniket" target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a href="https://www.linkedin.com/in/aniket-g-tayade/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a href="mailto:tayadeanni@gmail.com.com">
                  <Mail className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a href="https://www.kaggle.com/annitayade" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="#about" className="hover:text-foreground transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-foreground transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-foreground transition-colors">
                  Skills
                </a>
              </li>
              <li>
                <a href="#blog" className="hover:text-foreground transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-foreground transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>Data Analysis</li>
              <li>Machine Learning</li>
              <li>Data Visualization</li>
              <li>Predictive Modeling</li>
              <li>Statistical Analysis</li>
              <li>Business Intelligence</li>
            </ul>

            {/* Admin Panel Access */}
            <div className="mt-6 pt-4 border-t border-muted">
              <Link href="/admin/login">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-gold-500/50 text-gold-600 hover:bg-gold-500/10 dark:border-gold-400/50 dark:text-gold-400 dark:hover:bg-gold-400/10 transition-all duration-300 bg-transparent"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Admin Panel
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p className="flex items-center justify-center">
            Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> by Aniket Tayade © {currentYear}
          </p>
          <p className="text-sm mt-2">Built with Next.js, TypeScript, and Tailwind CSS</p>
        </div>
      </div>
    </footer>
  )
}
