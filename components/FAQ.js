"use client"
import { useState } from "react"

export default function FAQ() {
  const [open, setOpen] = useState(null)

  return (
    <section className="faq container" id="faq">
      <h2>Frequently Asked Questions</h2>

      <div className="faq-item">
        <button
          className="faq-question"
          onClick={() => setOpen(open === 1 ? null : 1)}
        >
          Can I customize it easily?
        </button>

        <div
          className="faq-answer"
          style={{
            maxHeight: open === 1 ? "200px" : "0px"
          }}
        >
          Yes. You can edit text, images, and colors in minutes.
        </div>
      </div>
    </section>
  )
}
