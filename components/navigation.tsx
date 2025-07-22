"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Menu, X, Download, Settings } from "lucide-react"
import { useTheme } from "next-themes"
import { useAuth } from "@/lib/auth-context"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const { user } = useAuth()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#blog", label: "Blog" },
    { href: "#contact", label: "Contact" },
  ]

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  if (!mounted) {
    return null
  }

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-gold-200/20 dark:border-gold-600/20"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="text-xl font-bold text-white hover:text-gold-400 hover:scale-105 transition-all duration-300"
          >
            Aniket Tayade
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white hover:text-gold-400 transition-colors duration-300 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
            ))}

            <Button
              variant="outline"
              size="sm"
              className="ml-4 bg-transparent border-gold-500 text-gold-600 hover:bg-gold-500 hover:text-white dark:border-gold-400 dark:text-gold-400 dark:hover:bg-gold-400 dark:hover:text-black transition-all duration-300"
            >
              <Download className="w-4 h-4 mr-2" />
              Resume
            </Button>

            {user && (
              <Link href="/admin">
                <Button variant="ghost" size="sm" className="text-gold-600 dark:text-gold-400">
                  <Settings className="w-4 h-4" />
                </Button>
              </Link>
            )}

            <Button variant="ghost" size="sm" onClick={toggleTheme} className="relative overflow-hidden group">
              <div className="relative z-10">
                {theme === "dark" ? (
                  <Sun className="w-4 h-4 text-gold-400 group-hover:rotate-180 transition-transform duration-500" />
                ) : (
                  <Moon className="w-4 h-4 text-blue-600 group-hover:-rotate-12 transition-transform duration-300" />
                )}
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-gold-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Button>
          </div>

          {/* Mobile Navigation Toggle */}
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-gold-200/20 dark:border-gold-600/20">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 text-white hover:text-gold-400 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex items-center space-x-2 px-3 py-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gold-500 text-gold-600 dark:border-gold-400 dark:text-gold-400 bg-transparent"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Resume
                </Button>
                <Button variant="ghost" size="sm" onClick={toggleTheme}>
                  {theme === "dark" ? (
                    <Sun className="w-4 h-4 text-gold-400" />
                  ) : (
                    <Moon className="w-4 h-4 text-blue-600" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
