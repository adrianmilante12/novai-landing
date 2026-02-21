"use client"
import { useState } from "react"

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className="navbar">
        <div className="nav-content">
          <div className="logo">
            <img src="/logo.png" alt="Logo" />
          </div>

          <div className="nav-menu">
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
          </div>

          <div className="hamburger" onClick={() => setOpen(!open)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </header>

      <div className={`bottom-sheet ${open ? "active" : ""}`}>
        <div className="grab-btn" onClick={() => setOpen(false)}></div>
        <div className="sheet-content">
          <a href="#features" onClick={() => setOpen(false)}>Features</a>
          <a href="#pricing" onClick={() => setOpen(false)}>Pricing</a>
          <a href="#faq" onClick={() => setOpen(false)}>FAQ</a>
        </div>
      </div>
    </>
  )
  }
