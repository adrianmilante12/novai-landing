"use client"

import { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import FAQ from "../components/FAQ"
import LoadingScreen from "../components/LoadingScreen"

export default function Home() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
      document.body.style.overflow = "auto"
    }, 2000)
  }, [])

  return (
    <>
      {loading && <LoadingScreen />}

      {!loading && (
        <>
          <div className="bg-glow"></div>
          <Navbar />

          <section className="hero container">
            <h1>High-Converting Landing Pages</h1>
            <p>
              Modern, conversion-focused website templates built for creators,
              coaches, and online businesses.
            </p>
          </section>

          <FAQ />
        </>
      )}
    </>
  )
      }
