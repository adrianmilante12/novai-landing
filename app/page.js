'use client'; // needed for interactivity (JS) on this page

import { useEffect } from 'react';

export default function Home() {

  useEffect(() => {
    // FAQ toggle
    document.querySelectorAll(".faq-question").forEach(button => {
      button.addEventListener("click", () => {
        const answer = button.nextElementSibling;
        answer.style.maxHeight = answer.style.maxHeight ? null : answer.scrollHeight + "px";
      });
    });

    // 3D Floating Effect
    document.querySelectorAll(".floating").forEach(card => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "rotateX(0) rotateY(0)";
      });
    });

    // Navbar / Bottom Sheet
    const hamburger = document.getElementById("hamburger");
    const bottomSheet = document.getElementById("bottomSheet");
    const grabBtn = document.getElementById("grabBtn");

    let startY = 0, sheetStart = 0, isDragging = false, isClosing = false;

    function openSheet() {
      if (bottomSheet.classList.contains("active") || isClosing) return;
      isClosing = false;
      bottomSheet.style.transition = "none";
      bottomSheet.style.transform = "translateY(100%)";
      requestAnimationFrame(() => {
        bottomSheet.style.transition = "transform 0.4s cubic-bezier(0.25,1,0.5,1)";
        bottomSheet.classList.add("active");
        bottomSheet.style.transform = "translateY(0)";
      });
    }

    function closeSheet() {
      if (!bottomSheet.classList.contains("active") || isClosing) return;
      isClosing = true;
      bottomSheet.style.transition = "transform 0.4s cubic-bezier(0.25,1,0.5,1)";
      bottomSheet.style.transform = "translateY(100%)";
      bottomSheet.addEventListener("transitionend", function handler() {
        bottomSheet.classList.remove("active");
        bottomSheet.style.transform = "";
        isClosing = false;
        bottomSheet.removeEventListener("transitionend", handler);
      });
    }

    hamburger.addEventListener("click", () => {
      if (bottomSheet.classList.contains("active")) closeSheet();
      else openSheet();
    });

    function dragStart(e) {
      if (isClosing) return;
      isDragging = true;
      bottomSheet.style.transition = "none";
      startY = e.type.includes("touch") ? e.touches[0].pageY : e.pageY;
      const computedStyle = window.getComputedStyle(bottomSheet);
      const matrix = new WebKitCSSMatrix(computedStyle.transform);
      sheetStart = matrix.m42 || 0;
      document.addEventListener("mousemove", onDrag);
      document.addEventListener("touchmove", onDrag, { passive: false });
      document.addEventListener("mouseup", dragEnd);
      document.addEventListener("touchend", dragEnd);
    }

    function onDrag(e) {
      if (!isDragging) return;
      const currentY = e.type.includes("touch") ? e.touches[0].pageY : e.pageY;
      let diff = currentY - startY;
      if (diff > 0) bottomSheet.style.transform = `translateY(${sheetStart + diff}px)`;
      else bottomSheet.style.transform = `translateY(${sheetStart}px)`;
      if (e.type.includes("touch")) e.preventDefault();
    }

    function dragEnd() {
      if (!isDragging) return;
      isDragging = false;
      document.removeEventListener("mousemove", onDrag);
      document.removeEventListener("touchmove", onDrag);
      document.removeEventListener("mouseup", dragEnd);
      document.removeEventListener("touchend", dragEnd);
      const computedStyle = window.getComputedStyle(bottomSheet);
      const matrix = new WebKitCSSMatrix(computedStyle.transform);
      const translateY = matrix.m42;
      bottomSheet.style.transition = "transform 0.4s cubic-bezier(0.25,1,0.5,1)";
      if (translateY > 50) closeSheet();
      else bottomSheet.style.transform = "translateY(0)";
    }

    grabBtn.addEventListener("mousedown", dragStart);
    grabBtn.addEventListener("touchstart", dragStart);
    grabBtn.addEventListener("click", closeSheet);

    // Loading screen
    const loadingScreen = document.getElementById("loading-screen");
    const mainContent = document.getElementById("main-content");

    window.addEventListener("load", () => {
      setTimeout(() => {
        loadingScreen.style.opacity = "0";
        loadingScreen.style.transition = "opacity 0.8s";
        setTimeout(() => {
          loadingScreen.style.display = "none";
          mainContent.style.display = "block";
          document.body.style.overflow = "auto";
        }, 800);
      }, 2000);
    });

    // Particle canvas
    const canvas = document.getElementById("particles");
    if (canvas) {
      const ctx = canvas.getContext("2d");
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const particlesArray = [];
      const colors = ["#ff6ec4", "#7873f5", "#42e695", "#fff"];
      class Particle {
        constructor() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.size = Math.random() * 3 + 1;
          this.speedX = Math.random() * 1 - 0.5;
          this.speedY = Math.random() * 1 - 0.5;
          this.color = colors[Math.floor(Math.random() * colors.length)];
        }
        update() {
          this.x += this.speedX;
          this.y += this.speedY;
          if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
          if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        draw() {
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      function initParticles() {
        for (let i = 0; i < 100; i++) particlesArray.push(new Particle());
      }
      function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particlesArray.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animateParticles);
      }
      initParticles();
      animateParticles();
      window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      });
      
    }
        // Carousel
    function initCarousel(wrapperSelector, dotsSelector) {
      const wrapper = document.querySelector(wrapperSelector);
      if (!wrapper) return;
      
      const track = wrapper.querySelector(".slides");
      const slides = Array.from(track.querySelectorAll(".slide"));
      const dotsContainer = document.querySelector(dotsSelector);
      const slidesWrapper = wrapper.querySelector(".slides-wrapper");
      
      const gap = parseInt(getComputedStyle(track).gap) || 12;
      
      let index = 1;
      let isDragging = false;
      let startX = 0;
      let currentTranslate = 0;
      let prevTranslate = 0;
      let animationID;
      let autoScroll;
      
      const realSlideCount = slides.length - 2;
      
      /* ---------------- DOTS ---------------- */
      
      dotsContainer.innerHTML = "";
      for (let i = 0; i < realSlideCount; i++) {
        const dot = document.createElement("span");
        dot.addEventListener("click", () => moveTo(i + 1));
        dotsContainer.appendChild(dot);
      }
      const dots = dotsContainer.querySelectorAll("span");
      
      function updateDots() {
        dots.forEach(d => d.classList.remove("active"));
        let realIndex = index - 1;
        if (realIndex < 0) realIndex = realSlideCount - 1;
        if (realIndex >= realSlideCount) realIndex = 0;
        dots[realIndex].classList.add("active");
        
        slides.forEach(s => s.classList.remove("active"));
        slides[index].classList.add("active");
      }
      
      /* ---------------- POSITION ---------------- */
      
      function getSlideWidth() {
        return slides[0].offsetWidth + gap;
      }
      
      function setPosition(animate = true) {
        const slideWidth = getSlideWidth();
        const centerOffset =
          (slidesWrapper.offsetWidth - slides[index].offsetWidth) / 2;
        
        const position = -index * slideWidth + centerOffset;
        
        track.style.transition = animate ? "transform 0.4s ease" : "none";
        track.style.transform = `translateX(${position}px)`;
      }
      
      /* ---------------- MOVE ---------------- */
      
      function moveTo(newIndex) {
        index = newIndex;
        setPosition(true);
        updateDots();
        resetAutoScroll();
      }
      
      track.addEventListener("transitionend", () => {
        if (index <= 0) {
          index = realSlideCount;
          setPosition(false);
        }
        if (index >= realSlideCount + 1) {
          index = 1;
          setPosition(false);
        }
      });
      
      /* ---------------- ARROWS ---------------- */
      
      wrapper.querySelector(".arrow.left")
        .addEventListener("click", () => moveTo(index - 1));
      
      wrapper.querySelector(".arrow.right")
        .addEventListener("click", () => moveTo(index + 1));
      
      /* ---------------- DRAG ---------------- */
      
      function startDrag(e) {
        stopAutoScroll();
        isDragging = true;
        
        startX = e.type.includes("mouse") ?
          e.pageX :
          e.touches[0].clientX;
        
        track.style.transition = "none";
      }
      
      
      function drag(e) {
        if (!isDragging) return;
        
        const currentX = e.type.includes("mouse") ?
          e.pageX :
          e.touches[0].clientX;
        
        const diff = currentX - startX;
        
        track.style.transform = `translateX(${baseTranslate + diff}px)`;
      }
      
      
      function endDrag(e) {
        if (!isDragging) return;
        isDragging = false;
        
        const endX = e.type.includes("mouse") ?
          e.pageX :
          (e.changedTouches ? e.changedTouches[0].clientX : startX);
        
        const diff = endX - startX;
        
        if (diff < 0) {
          index++;
        } else if (diff > 0) {
          index--;
        }
        
        // Always snap clean
        setPosition(true);
        updateDots();
        resetAutoScroll();
      }
      
      
      
      function animation() {
        track.style.transform = `translateX(${currentTranslate}px)`;
        if (isDragging) requestAnimationFrame(animation);
      }
      
      track.addEventListener("mousedown", startDrag);
      track.addEventListener("touchstart", startDrag, { passive: true });
      
      window.addEventListener("mousemove", drag);
      window.addEventListener("touchmove", drag, { passive: true });
      
      window.addEventListener("mouseup", endDrag);
      window.addEventListener("touchend", endDrag);
      
      /* ---------------- AUTO SCROLL ---------------- */
      
      function startAutoScroll() {
        autoScroll = setInterval(() => {
          index++;
          setPosition(true);
          updateDots();
        }, 3500);
      }
      
      function stopAutoScroll() {
        clearInterval(autoScroll);
      }
      
      function resetAutoScroll() {
        stopAutoScroll();
        startAutoScroll();
      }
      
      /* ---------------- INIT ---------------- */
      
      setPosition(false);
      updateDots();
      startAutoScroll();
      
      window.addEventListener("resize", () => {
        setPosition(false);
      });
    }
    
    /* INIT BOTH */
    initCarousel(".desktop-carousel", ".desktop-dots");
    initCarousel(".mobile-carousel", ".mobile-dots");

  }, []);

  return (
    <>
      {/* Loading Screen */}
      <div id="loading-screen">
        <canvas id="particles"></canvas>
        <div className="loader-content">
          <img src="/logo.png" alt="Logos" className="logos" /> {/* Your logo */}
          <p className="loading-text">Welcome to Your Premium Experience</p>
        </div>
      </div>

      <div id="main-content" style={{ display: 'none' }}>
        <div className="bg-glow"></div>

        {/* Navbar */}
        <header className="navbar">
          <div className="nav-content">
            <div className="logo">
              <a href="#"><img src="/logo.png" alt="Logo" /></a>
            </div>
            <a href="#get-started" className="btn-primary nav-right">Get Started</a>
            <div className="nav-menu">
              <a href="#features">Features</a>
              <a href="showcase.html">Template</a>
              <a href="#pricing">Pricing</a>
              <a href="#faq">FAQ</a>
            </div>
            <div className="nav-actions">
              <div className="hamburger" id="hamburger">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </header>

        {/* Bottom Sheet */}
        <div className="bottom-sheet" id="bottomSheet">
          <div className="grab-btn" id="grabBtn"></div>
          <div className="sheet-logo">
            <img src="/logo.png" alt="Logo" />
          </div>
          <div className="sheet-content">
            <a href="#features">About</a>
            <a href="showcase.html">Template</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
          </div>
          <a href="#get-started" className="btn-primary bottom-start">Get Started</a>
        </div>

        {/* Hero Section */}
        <section className="hero container">
          <h1>High-Converting Landing Pages</h1>
          <p>Modern, conversion-focused website templates built for creators, coaches, and online businesses.</p>
          <div className="hero-buttons">
            <a href="#demo" className="btn-primary">Live Demo</a>
            <a href="#pricing" className="btn-outline">Buy Now</a>
          </div>
        </section>

        {/* Projects Carousel */}
        <section className="projects">
          <h2 className="title">Our Projects</h2>

          {/* Desktop Carousel */}
          <div className="carousel-wrapper desktop-carousel">
            <div className="carousel">
              <button className="arrow left">&#10094;</button>
              <div className="slides-wrapper">
                <div className="slides">
                  <img src="https://picsum.photos/400/200?5" className="slide clone" alt="slide" />
                  <img src="https://picsum.photos/400/200?1" className="slide" alt="slide" />
                  <img src="https://picsum.photos/400/200?2" className="slide" alt="slide" />
                  <img src="https://picsum.photos/400/200?3" className="slide" alt="slide" />
                  <img src="https://picsum.photos/400/200?4" className="slide" alt="slide" />
                  <img src="https://picsum.photos/400/200?5" className="slide" alt="slide" />
                  <img src="https://picsum.photos/400/200?1" className="slide clone" alt="slide" />
                </div>
              </div>
              <button className="arrow right">&#10095;</button>
            </div>
            <div className="dots desktop-dots"></div>
          </div>

          {/* Mobile Carousel */}
          <div className="carousel-wrapper mobile-carousel">
            <div className="carousel">
              <button className="arrow left">&#10094;</button>
              <div className="slides-wrapper">
                <div className="slides">
                  <img src="https://picsum.photos/200/400?5" className="slide clone" alt="slide" />
                  <img src="https://picsum.photos/200/400?1" className="slide" alt="slide" />
                  <img src="https://picsum.photos/200/400?2" className="slide" alt="slide" />
                  <img src="https://picsum.photos/200/400?3" className="slide" alt="slide" />
                  <img src="https://picsum.photos/200/400?4" className="slide" alt="slide" />
                  <img src="https://picsum.photos/200/400?5" className="slide" alt="slide" />
                  <img src="https://picsum.photos/200/400?1" className="slide clone" alt="slide" />
                </div>
              </div>
              <button className="arrow right">&#10095;</button>
            </div>
            <div className="dots mobile-dots"></div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features container">
          <h2>Built for Performance</h2>
          <div className="grid">
            <div className="glass-card">
              <h3>Conversion Focused</h3>
              <p>Structured layout optimized for sales and lead generation.</p>
            </div>
            <div className="glass-card">
              <h3>Modern UI System</h3>
              <p>Clean spacing, bold typography, and premium aesthetics.</p>
            </div>
            <div className="glass-card">
              <h3>Fully Responsive</h3>
              <p>Perfect experience across all screen sizes.</p>
            </div>
          </div>
        </section>

        {/* Demo Section */}
        <section id="demo" className="demo container">
          <h2>Live Preview</h2>
          <div className="demo-frame">
            Demo preview iframe goes here
          </div>
        </section>

        {/* Pricing Section */}
        <section className="pricing container" id="pricing">
          <h2>Simple Pricing</h2>
          <div className="pricing-card">
            <h3>Premium License</h3>
            <p className="price">$79</p>
            <ul>
              <li>Full Source Code</li>
              <li>Lifetime Updates</li>
              <li>Commercial Use</li>
              <li>Documentation Included</li>
            </ul>
            <a href="#" className="btn-primary">Purchase Now</a>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq container" id="faq">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-item">
            <button className="faq-question">Can I customize it easily?</button>
            <div className="faq-answer">Yes. You can edit text, images, and colors in minutes.</div>
          </div>
          <div className="faq-item">
            <button className="faq-question">Do I need coding experience?</button>
            <div className="faq-answer">Basic HTML knowledge helps, but documentation is included.</div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-container">
            <div>
              <div className="footer-logo">
                <img src="/logo.png" alt="Logo" />
              </div>
              <p>Building premium digital experiences with modern design and performance.</p>
              <div className="footer-socials">
                <a href="#">📘</a>
                <a href="#">📸</a>
                <a href="#">🐦</a>
              </div>
            </div>
            <div>
              <h3>Company</h3>
              <p><a href="#">About Us</a></p>
              <p><a href="#">Services</a></p>
              <p><a href="#">Careers</a></p>
              <p><a href="#">Contact</a></p>
            </div>
            <div>
              <h3>Resources</h3>
              <p><a href="#">Blog</a></p>
              <p><a href="#">Help Center</a></p>
              <p><a href="#">Privacy Policy</a></p>
              <p><a href="#">Terms</a></p>
            </div>
          </div>
          <div className="footer-bottom">© 2026 Novai. All rights reserved</div>
        </footer>
      </div>

    </>
  );
            }
