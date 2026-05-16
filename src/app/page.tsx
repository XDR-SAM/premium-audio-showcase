'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const PRODUCTS = [
  { name: 'Sonique One', price: '2,499', desc: 'Wireless over-ear headphones with active noise cancellation' },
  { name: 'Sonique Studio', price: '4,999', desc: 'Professional studio monitors for the discerning producer' },
  { name: 'Sonique Move', price: '799', desc: 'Portable speaker with 360° surround sound' },
  { name: 'Sonique Pro', price: '8,499', desc: 'Reference-grade floor-standing speakers' },
];

const SPECS = [
  { value: '20Hz–40kHz', label: 'Frequency Response' },
  { value: '118dB', label: 'Max SPL' },
  { value: '0.0008%', label: 'Total Harmonic Distortion' },
  { value: '80h', label: 'Battery Life' },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [waveBars, setWaveBars] = useState<number[]>(Array.from({ length: 32 }, () => Math.random()));

  useEffect(() => {
    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
    return () => { lenis.destroy(); };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWaveBars(Array.from({ length: 32 }, () => Math.random()));
    }, 600);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(productRef.current, { x: 80, opacity: 0, rotate: -10, duration: 2, ease: 'power4.out' });
      gsap.to(productRef.current, { y: -12, duration: 3, yoyo: true, repeat: -1, ease: 'sine.inOut' });
      const words = headlineRef.current?.querySelectorAll('.word');
      if (words) gsap.from(words, { y: 80, opacity: 0, stagger: 0.08, duration: 1.2, ease: 'power4.out', delay: 0.5 });
      gsap.from('.hero-sub', { y: 30, opacity: 0, duration: 1, ease: 'power3.out', delay: 1.0 });
      gsap.from('.hero-cta', { y: 20, opacity: 0, duration: 1, ease: 'power3.out', delay: 1.2 });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = featuresRef.current?.querySelectorAll('.reveal');
      if (els) gsap.from(els, { y: 60, opacity: 0, stagger: 0.15, duration: 1, ease: 'power4.out', scrollTrigger: { trigger: featuresRef.current, start: 'top 70%' } });
    }, featuresRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = productsRef.current?.querySelectorAll('.prod-card');
      if (cards) gsap.from(cards, { y: 60, opacity: 0, stagger: 0.1, duration: 1, ease: 'power4.out', scrollTrigger: { trigger: productsRef.current, start: 'top 65%' } });
    }, productsRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const els = ctaRef.current?.querySelectorAll('*');
      if (els) gsap.from(els, { y: 50, opacity: 0, stagger: 0.1, duration: 1, ease: 'power4.out', scrollTrigger: { trigger: ctaRef.current, start: 'top 70%' } });
    }, ctaRef);
    return () => ctx.revert();
  }, []);

  return (
    <main className="bg-white text-[#1d1d1f] overflow-x-hidden">
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 md:px-10 py-4 md:py-5 flex justify-between items-center bg-white/90 backdrop-blur-md border-b border-[rgba(0,0,0,0.04)]">
        <div className="font-display text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">SONIQUE</div>
        <div className="hidden md:flex gap-8 text-xs tracking-widest font-medium text-[rgba(0,0,0,0.7)]">
          {['PRODUCTS', 'TECHNOLOGY', 'REVIEWS', 'STORES'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-[#00d4aa] transition-colors">{item}</a>
          ))}
        </div>
        <button className="hidden md:block bg-[#1d1d1f] text-white text-xs tracking-widest font-bold px-5 py-3 hover:bg-[#00d4aa] transition-colors rounded">
          SHOP NOW
        </button>
        <button className="md:hidden w-10 h-10 flex items-center justify-center" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {mobileMenuOpen ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 8h16M4 16h16" />}
          </svg>
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-20 px-6 flex flex-col gap-6 md:hidden">
          {['PRODUCTS', 'TECHNOLOGY', 'REVIEWS', 'STORES'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="font-display text-2xl font-bold" onClick={() => setMobileMenuOpen(false)}>{item}</a>
          ))}
          <button className="bg-[#1d1d1f] text-white text-sm tracking-widest font-bold px-6 py-4 mt-4 rounded">SHOP NOW</button>
        </div>
      )}

      {/* Hero */}
      <section ref={heroRef} className="min-h-screen flex items-center justify-center pt-16 md:pt-20 px-4 sm:px-6 md:px-10">
        <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <p className="text-[#00d4aa] text-xs tracking-[0.3em] mb-4 sm:mb-6">SONIQUE — AUDIO ENGINEERING</p>
            <h1 ref={headlineRef} className="font-display font-bold leading-none tracking-tight mb-6 sm:mb-8">
              <span className="word block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">HEAR THE</span>
              <span className="word block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-[#00d4aa]">EXTRAORDINARY</span>
            </h1>
            <p className="hero-sub text-[rgba(0,0,0,0.7)] text-base sm:text-lg md:text-xl max-w-md leading-relaxed mb-8">
              Premium audio equipment crafted for those who demand perfection.
            </p>
            <div className="hero-cta flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button className="bg-[#1d1d1f] text-white text-xs sm:text-sm tracking-widest font-bold px-6 sm:px-8 py-3 sm:py-4 hover:bg-[#00d4aa] transition-colors rounded">
                EXPLORE PRODUCTS
              </button>
              <button className="border border-[#1d1d1f] text-[#1d1d1f] text-xs sm:text-sm tracking-widest font-bold px-6 sm:px-8 py-3 sm:py-4 hover:bg-[#1d1d1f] hover:text-white transition-all rounded">
                LISTEN NOW
              </button>
            </div>
          </div>
          <div className="order-1 lg:order-2 flex flex-col items-center gap-8">
            <div ref={productRef}>
              <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=85" alt="Sonique Headphones" className="w-full max-w-[280px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[450px] h-auto drop-shadow-2xl" />
            </div>
            {/* Wave visualization */}
            <div className="flex items-end gap-1 sm:gap-1.5 h-12">
              {waveBars.slice(0, 32).map((h, i) => (
                <div key={i} className="w-1.5 sm:w-2 rounded-full bg-[#00d4aa] transition-all duration-300" style={{ height: `${Math.max(8, h * 48)}px`, opacity: 0.4 + h * 0.6 }} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Specs */}
      <section ref={featuresRef} className="py-16 md:py-20 px-4 sm:px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {SPECS.map(s => (
              <div key={s.label} className="reveal text-center p-6 sm:p-8 bg-[#fafafa] rounded-lg">
                <div className="text-[#00d4aa] font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-2">{s.value}</div>
                <div className="text-[rgba(0,0,0,0.5)] text-xs sm:text-sm tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech */}
      <section className="py-20 md:py-32 px-4 sm:px-6 md:px-10 bg-[#fafafa]">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <p className="text-[#00d4aa] text-xs tracking-[0.3em] mb-4">TECHNOLOGY</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 leading-tight">Purity of<br />Sound</h2>
            <p className="text-[rgba(0,0,0,0.7)] leading-relaxed mb-8 text-sm sm:text-base">
              Proprietary Acoustic Wave technology delivers distortion-free audio across the entire frequency spectrum. Precision-tuned drivers reproduce every nuance of your favorite recordings.
            </p>
            <ul className="space-y-3 sm:space-y-4">
              {['40mm neodymium drivers', 'Adaptive noise cancellation', 'High-resolution audio certified', 'Bluetooth 5.4 with LDAC'].map(item => (
                <li key={item} className="flex items-center gap-3 text-sm sm:text-base">
                  <span className="w-1.5 h-1.5 bg-[#00d4aa] rounded-full flex-shrink-0" />
                  <span className="text-[rgba(0,0,0,0.8)]">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <img src="https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=700&q=80" alt="Audio detail" className="w-full h-64 sm:h-80 md:h-96 lg:h-[500px] object-cover rounded-lg" />
        </div>
      </section>

      {/* Products */}
      <section id="products" ref={productsRef} className="py-20 md:py-32 px-4 sm:px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-[#00d4aa] text-xs tracking-[0.3em] mb-4">COLLECTION</p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">Choose Your Sound</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.map((p) => (
              <div key={p.name} className="prod-card bg-white border border-[rgba(0,0,0,0.06)] p-6 rounded-lg hover:shadow-lg transition-shadow duration-500 group">
                <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&q=80" alt={p.name} className="w-full h-36 sm:h-40 object-contain mb-4 sm:mb-6 group-hover:scale-105 transition-transform duration-500" />
                <h3 className="font-display text-lg sm:text-xl font-bold mb-2">{p.name}</h3>
                <p className="text-[rgba(0,0,0,0.6)] text-xs sm:text-sm mb-4">{p.desc}</p>
                <div className="flex justify-between items-center">
                  <span className="font-display text-xl sm:text-2xl font-bold text-[#00d4aa]">${p.price}</span>
                  <button className="text-[10px] sm:text-xs tracking-widest font-bold hover:text-[#00d4aa] transition-colors">ADD TO CART →</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} className="py-20 md:py-32 px-4 sm:px-6 md:px-10 bg-[#1d1d1f] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6">Experience Sound</h2>
          <p className="text-white/60 text-base sm:text-lg md:text-xl mb-10 sm:mb-12 max-w-2xl mx-auto">
            Visit our flagship store for a personal listening session
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12">
            <input type="email" placeholder="Your email" className="px-4 sm:px-6 py-3 sm:py-4 bg-white/10 border border-white/20 text-white text-sm sm:text-base rounded outline-none w-full sm:w-80 placeholder:text-white/40" />
            <button className="bg-[#00d4aa] text-[#1d1d1f] font-bold text-xs sm:text-sm tracking-widest px-6 sm:px-8 py-3 sm:py-4 rounded hover:bg-[#3ae0b0] transition-colors whitespace-nowrap">
              BOOK LISTENING SESSION
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 md:py-12 px-4 sm:px-6 md:px-10 border-t border-[rgba(0,0,0,0.06)]">
        <div className="max-w-6xl mx-auto text-center">
          <div className="font-display text-xl sm:text-2xl md:text-3xl font-bold tracking-tight mb-4">SONIQUE</div>
          <p className="text-[rgba(0,0,0,0.4)] text-xs sm:text-sm">© 2026 Sonique Audio. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}