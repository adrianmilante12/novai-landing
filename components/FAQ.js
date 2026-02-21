import { useState } from "react";

export default function FAQ() {
  const faqs = [
    {
      question: "Can I customize it easily?",
      answer: "Yes. You can edit text, images, and colors in minutes."
    },
    {
      question: "Do I need coding experience?",
      answer: "Basic HTML knowledge helps, but documentation is included."
    },
  ];

  return (
    <section className="faq container" id="faq">
      <h2>Frequently Asked Questions</h2>
      {faqs.map((faq, index) => (
        <FAQItem key={index} question={faq.question} answer={faq.answer} />
      ))}
    </section>
  );
}

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="faq-item">
      <button className="faq-question" onClick={() => setOpen(!open)}>
        {question}
      </button>
      <div
        className="faq-answer"
        style={{ maxHeight: open ? "200px" : "0", transition: "max-height 0.3s ease" }}
      >
        {answer}
      </div>
    </div>
  );
    }
