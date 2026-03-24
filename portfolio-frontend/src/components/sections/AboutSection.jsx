import React from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaLaptopCode, FaLightbulb, FaCode } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';

const tags = [
  { icon: FaGraduationCap, label: "CSE Undergraduate" },
  { icon: FaLaptopCode, label: "Full Stack Dev" },
  { icon: FaLightbulb, label: "Problem Solver" },
  { icon: FaCode, label: "Open Source" },
];

const AboutSection = () => {
  return (
    <section id="about" className="relative py-20 sm:py-28 md:py-36 overflow-hidden">
      {/* Background */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-secondary/8 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />

      <div className="section-inner relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Section label */}
          <span className="section-label"><HiSparkles className="inline mr-2 text-accent" />About Me</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24 items-center mt-8 sm:mt-12">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="section-title text-white mb-6 sm:mb-8 text-3xl sm:text-4xl md:text-5xl">
              Crafting digital <span className="gradient-text">experiences</span> that matter
            </h2>
            <p className="text-textSecondary text-base sm:text-lg leading-relaxed font-light mb-6">
              I'm a Computer Science Engineering student with a strong passion for building
              full-stack web applications and intelligent ML systems. I love bridging the gap
              between elegant design and powerful backend logic.
            </p>
            <p className="text-textSecondary text-base sm:text-lg leading-relaxed font-light mb-8 sm:mb-10">
              With hands-on experience in{" "}
              <span className="text-white font-medium">React, Node.js, Python</span>, and modern
              cloud platforms, I build production-ready solutions from concept to deployment — fast
              and with attention to detail.
            </p>

            <div className="flex flex-wrap gap-2.5 sm:gap-3">
              {tags.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/5 border border-white/10 hover:border-accent/40 hover:bg-white/10 transition-colors"
                >
                  <Icon className="text-accent text-xs sm:text-sm" />
                  <span className="text-xs sm:text-sm font-medium text-textPrimary">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Code card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative group w-full"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-br from-accent/50 to-secondary/50 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-700 pointer-events-none" />
            <div className="relative rounded-2xl bg-[#0a1628] border border-white/10 overflow-hidden w-full overflow-x-auto">
              {/* Titlebar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5 min-w-[300px]">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-2 text-xs text-textSecondary/60 font-mono">about.ts</span>
              </div>
              {/* Code */}
              <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm md:text-base leading-loose min-w-[300px] overflow-x-auto">
                <p className="text-textSecondary whitespace-nowrap"><span className="text-secondary">interface</span> <span className="text-white">Developer</span> {"{"}</p>
                <p className="pl-4 sm:pl-6 text-textSecondary whitespace-nowrap"><span className="text-accent">name</span>: <span className="text-green-400">'Tarun Kumar Singh'</span>;</p>
                <p className="pl-4 sm:pl-6 text-textSecondary whitespace-nowrap"><span className="text-accent">role</span>: <span className="text-green-400">'Full Stack Developer'</span>;</p>
                <p className="pl-4 sm:pl-6 text-textSecondary whitespace-nowrap"><span className="text-accent">university</span>: <span className="text-green-400">'RITE - B.Tech CSE'</span>;</p>
                <p className="pl-4 sm:pl-6 text-textSecondary whitespace-nowrap"><span className="text-accent">skills</span>: <span className="text-orange-400">string</span>[];</p>
                <p className="pl-4 sm:pl-6 text-textSecondary whitespace-nowrap"><span className="text-accent">passion</span>: <span className="text-green-400">'Building impactful software'</span>;</p>
                <p className="pl-4 sm:pl-6 text-textSecondary whitespace-nowrap"><span className="text-accent">status</span>: <span className="text-green-400">'Open to opportunities'</span>;</p>
                <p className="text-textSecondary">{"}"}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
