import React, { useState, useEffect } from "react";

const navLinks = [
  { label: "About", id: "about" },
  { label: "Services", id: "whatido" },
  { label: "Work", id: "work" },
  { label: "Experience", id: "career" },
  { label: "Skills", id: "techstack" },
  { label: "Contact", id: "contact" },
];

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      // update active section
      const sections = navLinks.map(l => document.getElementById(l.id)).filter(Boolean);
      let current = "";
      sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 140) current = sec.id;
      });
      setActive(current);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[9999] transition-all duration-500 ${scrolled
            ? "py-3 bg-[#020617]/80 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
            : "py-5 bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" onClick={() => scrollTo("home")} className="group relative select-none">
            <span className="text-2xl font-black tracking-tight text-white group-hover:text-accent transition-colors duration-300">
              T<span className="text-accent">.</span>S
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`text-sm font-medium tracking-wide transition-colors duration-300 relative group ${active === link.id ? "text-accent" : "text-textSecondary hover:text-white"
                  }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 ${active === link.id ? "w-full" : "w-0 group-hover:w-full"}`} />
              </button>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-4">
            <a
              href="mailto:tarunkumarsingh179@gmail.com"
              className="hidden sm:inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase px-5 py-2.5 bg-accent text-background rounded-full hover:opacity-80 transition-opacity"
            >
              Hire Me
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden flex flex-col gap-1.5 items-end p-2"
              aria-label="Toggle menu"
            >
              <span className={`block h-0.5 bg-white rounded-full transition-all duration-300 ${menuOpen ? "w-6 rotate-45 translate-y-2" : "w-6"}`} />
              <span className={`block h-0.5 bg-white rounded-full transition-all duration-300 ${menuOpen ? "opacity-0 w-0" : "w-4"}`} />
              <span className={`block h-0.5 bg-white rounded-full transition-all duration-300 ${menuOpen ? "w-6 -rotate-45 -translate-y-2" : "w-6"}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[9998] flex flex-col justify-center items-center bg-[#020617]/95 backdrop-blur-2xl transition-all duration-500 ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <nav className="flex flex-col items-center gap-8">
          {navLinks.map((link, i) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`text-4xl font-bold tracking-tight transition-colors duration-300 ${menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: menuOpen ? `${i * 60}ms` : "0ms" }}
            >
              <span className="text-textSecondary hover:text-white transition-colors">{link.label}</span>
            </button>
          ))}
          <a
            href="mailto:tarunkumarsingh179@gmail.com"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase px-8 py-3 bg-accent text-background rounded-full hover:opacity-80 transition-opacity"
          >
            Hire Me
          </a>
        </nav>
      </div>
    </>
  );
};

export default Navigation;
