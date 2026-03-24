import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const careerData = [
  {
    period: '2023 — Present',
    title: 'Full Stack Developer Intern',
    company: 'JSP (Java Software Pvt Ltd)',
    description: 'Developed a comprehensive Stock Inventory Management System using React, Node.js, and MongoDB. Implemented real-time tracking, analytics dashboard, and automated reporting features. Delivered the project 2 weeks ahead of schedule with zero critical bugs.',
    skills: ['React', 'Node.js', 'MongoDB', 'Express.js'],
  },
  {
    period: '2022 — 2023',
    title: 'CSE Student & Developer',
    company: 'RITE - B.Tech CSE',
    description: 'Built multiple production-quality projects: a Leaf Disease Detection system with TensorFlow achieving 95% accuracy, a full College Management System, and an E-Commerce Platform. Also earned certifications in Google Cloud, AWS, and Machine Learning.',
    skills: ['Python', 'TensorFlow', 'Django', 'AWS'],
  },
  {
    period: '2022 — Now',
    title: 'Freelance Full Stack Developer',
    company: 'Independent',
    description: 'Building production-ready web applications for clients and contributing to open source projects. Specializing in React, Node.js, Python, and machine learning pipelines. Creating impactful digital experiences with a modern tech stack.',
    skills: ['React', 'Next.js', 'Python', 'FastAPI'],
  },
];

const InternshipSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="career" className="relative py-20 sm:py-28 md:py-40 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute left-1/2 top-1/4 -translate-x-1/2 w-[400px] sm:w-[800px] h-[300px] sm:h-[600px] bg-secondary/10 rounded-full blur-[100px] sm:blur-[160px] pointer-events-none" />

      <div className="section-inner relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Career Journey</span>
          <h2 className="section-title text-white mb-16 sm:mb-20 text-3xl sm:text-4xl md:text-5xl">
            My <span className="gradient-text">Experience</span>
          </h2>
        </motion.div>

        <div className="relative" ref={containerRef}>
          {/* Static background line */}
          <div className="absolute left-3.5 sm:left-6 top-0 bottom-0 w-1 bg-white/5 rounded-full" />
          
          {/* Animated scroll progress line */}
          <motion.div 
            style={{ height: lineHeight }} 
            className="absolute left-3.5 sm:left-6 top-0 w-1 bg-gradient-to-b from-accent via-secondary to-transparent rounded-full shadow-[0_0_30px_2px_rgba(6,182,212,0.8)] z-10 origin-top"
          />

          <div className="flex flex-col gap-12 sm:gap-16">
            {careerData.map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -60, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="career-entry relative pl-10 sm:pl-20 flex flex-col sm:flex-row gap-4 sm:gap-12 group"
              >
                {/* Dot */}
                <div className="absolute left-[8px] sm:left-[18px] top-2 sm:top-1.5 w-4 h-4 flex items-center justify-center z-20">
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + (i * 0.2), type: "spring" }}
                    className="w-3 sm:w-4 h-3 sm:h-4 rounded-full bg-accent ring-4 ring-background shadow-[0_0_15px_rgba(6,182,212,1)]" 
                  />
                </div>

                {/* Period */}
                <div className="flex-shrink-0 sm:w-40 text-left sm:text-right pt-0.5 sm:pt-1.5">
                  <span className="text-xs sm:text-sm font-bold tracking-widest uppercase text-accent">{item.period}</span>
                </div>

                {/* Content Card */}
                <motion.div 
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="flex-1 p-6 sm:p-10 rounded-2xl sm:rounded-3xl bg-white/[0.02] backdrop-blur-xl border border-white/10 hover:border-accent/40 hover:bg-white/[0.04] transition-all duration-500 shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] relative overflow-hidden"
                >
                  {/* Subtle card glow on hover */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-accent/10 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 sm:mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all duration-300">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base font-semibold text-secondary mb-4 sm:mb-6">{item.company}</p>
                    <p className="text-textSecondary leading-relaxed font-light text-sm sm:text-base mb-6 sm:mb-8">
                      {item.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {item.skills.map(s => (
                        <span key={s} className="text-[10px] sm:text-xs font-mono px-3 sm:px-4 py-1 sm:py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent font-semibold tracking-wide shadow-[0_0_10px_rgba(var(--accent-rgb),0.1)]">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InternshipSection;
