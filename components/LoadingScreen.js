"use client"
import { useEffect, useRef } from "react"

export default function LoadingScreen() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let particles = []

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = Math.random() - 0.5
        this.speedY = Math.random() - 0.5
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY
      }

      draw() {
        ctx.fillStyle = "#fff"
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    for (let i = 0; i < 80; i++) {
      particles.push(new Particle())
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.update()
        p.draw()
      })
      requestAnimationFrame(animate)
    }

    animate()
  }, [])

  return (
    <div id="loading-screen">
      <canvas ref={canvasRef}></canvas>
      <div className="loader-content">
        <img src="/logo.png" className="logos" />
        <p className="loading-text">
          Welcome to Your Premium Experience
        </p>
      </div>
    </div>
  )
    }
