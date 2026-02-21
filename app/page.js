"use client"

import { useState, useEffect } from "react"
import Navbar from './components/Navbar';
import LoadingScreen from './components/LoadingScreen';
import FAQ from './components/FAQ';
import Carousel from './components/Carousel';

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <div id="main-content">
        <div className="bg-glow"></div>
        <Navbar />

        <section className="hero container">
          <h1>High-Converting Landing Pages</h1>
          <p>Modern, conversion-focused website templates built for creators, coaches, and online businesses.</p>
          <div className="hero-buttons">
            <a href="#demo" className="btn-primary">Live Demo</a>
            <a href="#pricing" className="btn-outline">Buy Now</a>
          </div>
        </section>

        <section className="projects container">
          <h2 className="title">Our Projects</h2>
          <Carousel />
        </section>

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

        <section id="demo" className="demo container">
          <h2>Live Preview</h2>
          <div className="demo-frame">Demo preview iframe goes here</div>
        </section>

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

        <FAQ />

        <footer className="footer">
          <div className="footer-container">
            <div>
              <div className="footer-logo"><img src="/logo.png" alt="Logo" /></div>
              <p>Building premium digital experiences with modern design and performance.</p>
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
