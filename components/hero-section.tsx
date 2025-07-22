"use client"

import { Button } from "@/components/ui/button"
import { Github, Linkedin, ExternalLink, ChevronDown, Mail, Download } from "lucide-react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import InteractiveHaloBackground from "./interactive-halo-background"

export default function HeroSection() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false)
    }, 5000) // 5 seconds

    return () => clearTimeout(timer)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  if (!mounted) return null

  const isDark = theme === "dark"

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <InteractiveHaloBackground />

      {/* 3D Gradient Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-20 left-10 w-32 h-32 rounded-full blur-3xl opacity-30 animate-float-slow ${
            isDark ? "bg-gradient-to-r from-gold-400 to-yellow-300" : "bg-gradient-to-r from-blue-400 to-purple-500"
          }`}
        ></div>
        <div
          className={`absolute top-40 right-20 w-24 h-24 rounded-full blur-2xl opacity-40 animate-float-medium ${
            isDark ? "bg-gradient-to-r from-amber-400 to-orange-300" : "bg-gradient-to-r from-purple-400 to-pink-500"
          }`}
        ></div>
        <div
          className={`absolute bottom-40 left-20 w-20 h-20 rounded-full blur-xl opacity-50 animate-float-fast ${
            isDark ? "bg-gradient-to-r from-yellow-400 to-gold-300" : "bg-gradient-to-r from-green-400 to-blue-500"
          }`}
        ></div>
        <div
          className={`absolute bottom-20 right-40 w-28 h-28 rounded-full blur-2xl opacity-35 animate-float-slow ${
            isDark ? "bg-gradient-to-r from-gold-300 to-amber-400" : "bg-gradient-to-r from-indigo-400 to-purple-600"
          }`}
        ></div>
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            {showWelcome && (
              <div className="mb-6">
                <span
                  className={`inline-block px-6 py-3 rounded-full text-sm font-medium mb-4 border backdrop-blur-sm animate-pulse-glow transition-opacity duration-1000 ${
                    isDark
                      ? "bg-gradient-to-r from-gold-900/30 to-amber-900/30 text-gold-300 border-gold-400/30"
                      : "bg-gradient-to-r from-blue-100/80 to-purple-100/80 text-blue-700 border-blue-200/50"
                  }`}
                >
                  👋 Welcome to my portfolio
                </span>
              </div>
            )}

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">Hi, I'm </span>
              <span
                className={`bg-clip-text text-transparent animate-gradient-3d ${
                  isDark
                    ? "bg-gradient-to-r from-gold-300 via-yellow-400 to-amber-300"
                    : "bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600"
                }`}
              >
                Aniket Tayade
              </span>
            </h1>

            <h2
              className={`text-2xl md:text-3xl mb-4 font-light animate-fade-in-up ${
                isDark ? "text-gold-200" : "text-gray-600"
              }`}
            >
              Junior Data Scientist
            </h2>

            <p
              className={`text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in-up-delay ${
                isDark ? "text-gold-100/80" : "text-gray-500"
              }`}
            >
              Turning data into insights and insights into action. Passionate about machine learning, data
              visualization, and building intelligent solutions that drive business impact.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
          >
            <Button
              size="lg"
              onClick={() => scrollToSection("projects")}
              className={`shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-pulse-subtle ${
                isDark
                  ? "bg-gradient-to-r from-gold-600 to-amber-600 hover:from-gold-700 hover:to-amber-700 text-black"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              }`}
            >
              View My Work
              <ExternalLink className="ml-2 w-4 h-4" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className={`transition-all duration-300 bg-transparent backdrop-blur-sm ${
                isDark
                  ? "border-gold-400 text-gold-300 hover:bg-gold-400 hover:text-black"
                  : "border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white"
              }`}
            >
              <Download className="mr-2 w-4 h-4" />
              Download Resume
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center space-x-6"
          >
            <Button
              variant="ghost"
              size="sm"
              className={`transition-all duration-300 transform hover:scale-110 backdrop-blur-sm ${
                isDark ? "hover:bg-gold-400/10 hover:text-gold-300" : "hover:bg-blue-100/50 hover:text-blue-600"
              }`}
              asChild
            >
              <a href="https://github.com/tayade-aniket" target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5" />
              </a>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className={`transition-all duration-300 transform hover:scale-110 backdrop-blur-sm ${
                isDark ? "hover:bg-gold-400/10 hover:text-gold-300" : "hover:bg-blue-100/50 hover:text-blue-600"
              }`}
              asChild
            >
              <a href="https://www.linkedin.com/in/aniket-g-tayade/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-5 h-5" />
              </a>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className={`transition-all duration-300 transform hover:scale-110 backdrop-blur-sm ${
                isDark ? "hover:bg-gold-400/10 hover:text-gold-300" : "hover:bg-purple-100/50 hover:text-purple-600"
              }`}
              asChild
            >
              <a href="mailto:tayadeanni@gmail.com">
                <Mail className="w-5 h-5" />
              </a>
            </Button>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={() => scrollToSection("about")}
      >
        <ChevronDown
          className={`w-6 h-6 animate-bounce transition-colors ${
            isDark ? "text-gold-400 hover:text-gold-300" : "text-blue-500 hover:text-blue-400"
          }`}
        />
      </motion.div>
    </section>
  )
}
