import React, { useEffect, useRef, Suspense } from 'react';
import gsap from 'gsap';
import HeroCanvas from '../ui/HeroCanvas';
import { FaGithub, FaLinkedinIn, FaArrowDown } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

const stats = [
  { num: "10+", label: "Projects Built" },
  { num: "2+", label: "Years Coding" },
  { num: "95%", label: "ML Accuracy" },
];

const roles = ["Full Stack Developer", "ML Engineer", "Open Source Contributor", "CSE Student"];

const HeroSection = () => {
  const sectionRef = useRef(null);
  const roleRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const ctx = gsap.context(() => {
      gsap.to('.hero-orb-1', { x: 60, y: -40, duration: 8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('.hero-orb-2', { x: -50, y: 60, duration: 10, repeat: -1, yoyo: true, ease: 'sine.inOut' });

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo('.hero-tag', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7 })
        .fromTo('.hero-name', { opacity: 0, y: 60, skewY: 3 }, { opacity: 1, y: 0, skewY: 0, duration: 1.2, stagger: 0.08 }, '-=0.3')
        .fromTo('.hero-role-line', { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.8 }, '-=0.7')
        .fromTo('.hero-desc', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
        .fromTo('.hero-cta', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 }, '-=0.4')
        .fromTo('.hero-stat', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.12 }, '-=0.3')
        .fromTo('.hero-3d', { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 1.5, ease: 'expo.out' }, '-=1.2');

      let idx = 0;
      const cycleRoles = () => {
        if (!roleRef.current) return;
        gsap.to(roleRef.current, {
          opacity: 0, y: -20, duration: 0.4, ease: 'power2.in',
          onComplete: () => {
            idx = (idx + 1) % roles.length;
            if (roleRef.current) roleRef.current.textContent = roles[idx];
            gsap.fromTo(roleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' });
          }
        });
      };
      const loopId = setInterval(cycleRoles, 2800);
      return () => clearInterval(loopId);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background orbs */}
      <div className="hero-orb-1 absolute top-1/4 left-[10%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[128px] pointer-events-none" />
      <div className="hero-orb-2 absolute bottom-1/4 right-[10%] w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[128px] pointer-events-none" />

      <div className="section-inner w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-center min-h-screen py-28">
        {/* Left content */}
        <div className="flex flex-col items-start">
          {/* Available tag */}
          <div className="hero-tag flex items-center gap-3 mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent">Available for Hire</span>
          </div>

          {/* Name */}
          <div className="overflow-hidden mb-2">
            <h2 className="hero-name text-base sm:text-lg font-medium text-textSecondary tracking-wide">Hello, I'm</h2>
          </div>
          <div className="overflow-hidden mb-2">
            <h1 className="hero-name text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-none">
              TARUN
            </h1>
          </div>
          <div className="overflow-hidden mb-8">
            <h1 className="hero-name text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-none" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.2)', color: 'transparent' }}>
              KUMAR SINGH
            </h1>
          </div>

          {/* Role cycling text */}
          <div className="hero-role-line flex items-center gap-4 mb-8">
            <div className="h-px w-8 bg-accent flex-shrink-0" />
            <span ref={roleRef} className="text-lg sm:text-2xl font-medium text-accent min-h-[1.75rem]">Full Stack Developer</span>
          </div>

          {/* Description */}
          <p className="hero-desc text-textSecondary text-base sm:text-lg leading-relaxed font-light max-w-md mb-10">
            Building beautiful, scalable web applications and intelligent systems. Passionate about
            turning complex ideas into clean, impactful digital products.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-14">
            <button
              onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
              className="hero-cta inline-flex items-center gap-2 px-7 py-3.5 bg-accent text-background font-semibold rounded-full hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:scale-105 transition-all duration-300 text-sm"
            >
              View My Work
            </button>
            <a
              href="mailto:tarunkumarsingh179@gmail.com"
              className="hero-cta inline-flex items-center gap-2 px-7 py-3.5 border border-white/20 text-white font-medium rounded-full hover:bg-white/10 transition-all duration-300 text-sm"
            >
              Let's Talk
            </a>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-5 mb-14">
            {[
              { Icon: FaGithub, href: "https://github.com/tarunkumarsingh179" },
              { Icon: FaLinkedinIn, href: "https://linkedin.com/in/tarunkumarsingh179" },
              { Icon: SiLeetcode, href: "https://leetcode.com" },
            ].map(({ Icon, href }, i) => (
              <a key={i} href={href} target="_blank" rel="noopener noreferrer"
                className="hero-cta w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-textSecondary hover:text-accent hover:border-accent/50 transition-all duration-300"
              >
                <Icon className="text-base" />
              </a>
            ))}
          </div>

          {/* Stats */}
          <div className="flex gap-8 pt-8 border-t border-white/10 w-full max-w-md">
            {stats.map(({ num, label }) => (
              <div key={label} className="hero-stat">
                <div className="text-3xl font-black text-white mb-1">{num}</div>
                <div className="text-xs text-textSecondary tracking-widest uppercase">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: 3D Canvas */}
        <div className="hero-3d relative w-full h-[50vh] lg:h-[80vh] flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-accent/20 to-secondary/10 blur-[60px]" />
          </div>
          <Suspense fallback={
            <div className="w-16 h-16 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          }>
            <HeroCanvas />
          </Suspense>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-textSecondary/50 animate-bounce hidden sm:flex">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <FaArrowDown className="text-sm" />
      </div>
    </section>
  );
};

export default HeroSection;
