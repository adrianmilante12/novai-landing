import { useRef, useEffect, useState } from "react";

export default function Carousel() {
  const slidesRef = useRef();
  const [current, setCurrent] = useState(0);
  const slides = [1, 2, 3, 4]; // add your images

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); // auto slide
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel-wrapper">
      <button className="arrow left" onClick={prevSlide}>&#10094;</button>
      <div className="slides-wrapper">
        <div
          className="slides"
          ref={slidesRef}
          style={{ transform: `translateX(-${current * 100}%)`, transition: "0.5s" }}
        >
          {slides.map((n, i) => (
            <img key={i} src={`https://picsum.photos/400/200?${n}`} className="slide" />
          ))}
        </div>
      </div>
      <button className="arrow right" onClick={nextSlide}>&#10095;</button>
      <div className="dots">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === current ? "active" : ""}`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </div>
  );
}
