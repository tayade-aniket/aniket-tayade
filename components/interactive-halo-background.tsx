"use client"

import { useEffect, useRef, useCallback } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  hue: number
}

export default function InteractiveHaloBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mousePosRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number>()

  const createParticles = useCallback((width: number, height: number) => {
    const particleCount = Math.min(100, Math.floor((width * height) / 10000))
    const newParticles: Particle[] = []

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.4 + 0.2,
        hue: Math.random() * 60 + 200,
      })
    }
    particlesRef.current = newParticles
  }, [])

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const particles = particlesRef.current
    const mousePos = mousePosRef.current

    // Clear canvas with fade effect
    ctx.fillStyle = "rgba(15, 15, 35, 0.1)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    particles.forEach((particle, index) => {
      // Update particle position
      particle.x += particle.vx
      particle.y += particle.vy

      // Mouse interaction
      const dx = mousePos.x - particle.x
      const dy = mousePos.y - particle.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 120) {
        const force = (120 - distance) / 120
        particle.vx += (dx / distance) * force * 0.005
        particle.vy += (dy / distance) * force * 0.005
        particle.opacity = Math.min(0.8, particle.opacity + force * 0.01)
      } else {
        particle.opacity = Math.max(0.2, particle.opacity - 0.005)
      }

      // Boundary check with bounce
      if (particle.x < 0 || particle.x > canvas.width) {
        particle.vx *= -0.8
        particle.x = Math.max(0, Math.min(canvas.width, particle.x))
      }
      if (particle.y < 0 || particle.y > canvas.height) {
        particle.vy *= -0.8
        particle.y = Math.max(0, Math.min(canvas.height, particle.y))
      }

      // Apply friction
      particle.vx *= 0.99
      particle.vy *= 0.99

      // Draw particle
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fillStyle = `hsla(${particle.hue}, 70%, 60%, ${particle.opacity})`
      ctx.fill()

      // Draw connections to nearby particles
      particles.slice(index + 1, index + 5).forEach((otherParticle) => {
        const dx = particle.x - otherParticle.x
        const dy = particle.y - otherParticle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 80) {
          ctx.beginPath()
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(otherParticle.x, otherParticle.y)
          const opacity = (1 - distance / 80) * 0.2
          ctx.strokeStyle = `hsla(${(particle.hue + otherParticle.hue) / 2}, 70%, 60%, ${opacity})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      })
    })

    // Draw subtle halo around mouse
    if (mousePos.x > 0 && mousePos.y > 0) {
      const gradient = ctx.createRadialGradient(mousePos.x, mousePos.y, 0, mousePos.x, mousePos.y, 80)
      gradient.addColorStop(0, "hsla(45, 100%, 70%, 0.05)")
      gradient.addColorStop(1, "hsla(45, 100%, 70%, 0)")
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(mousePos.x, mousePos.y, 80, 0, Math.PI * 2)
      ctx.fill()
    }

    animationRef.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      createParticles(canvas.width, canvas.height)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mousePosRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    const handleResize = () => {
      resizeCanvas()
    }

    // Initial setup
    resizeCanvas()
    canvas.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", handleResize)

    // Start animation
    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      canvas.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
    }
  }, [animate, createParticles])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 -z-10"
      style={{
        background: "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)",
        touchAction: "none",
      }}
    />
  )
}
