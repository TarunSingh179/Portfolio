import React from 'react';
import { motion } from 'framer-motion';
import {
  SiReact, SiNodedotjs, SiPython, SiJavascript, SiTypescript, SiHtml5,
  SiTailwindcss, SiNextdotjs, SiMongodb, SiPostgresql, SiMysql,
  SiTensorflow, SiExpress, SiFirebase, SiDocker, SiGit, SiFlutter
} from 'react-icons/si';
import { HiBriefcase } from 'react-icons/hi2';

const frontendSkills = [
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'HTML/CSS', icon: SiHtml5, color: '#E34C26' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#ffffff' },
  { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'Flutter', icon: SiFlutter, color: '#02569B' },
];

const backendSkills = [
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
  { name: 'Python', icon: SiPython, color: '#3776AB' },
  { name: 'Express.js', icon: SiExpress, color: '#ffffff' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
  { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
  { name: 'TensorFlow', icon: SiTensorflow, color: '#FF6F00' },
  { name: 'Firebase', icon: SiFirebase, color: '#FFCA28' },
  { name: 'Docker', icon: SiDocker, color: '#2496ED' },
  { name: 'Git', icon: SiGit, color: '#F05032' },
];

const ServiceCard = ({ title, subtitle, description, skills, accent, index }) => (
  <motion.div 
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, delay: index * 0.2, ease: "easeOut" }}
    whileHover={{ y: -12, scale: 1.02, rotateX: 2, rotateY: -2 }}
    className={`relative group flex-1 min-w-0 p-8 lg:p-10 rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 overflow-hidden hover:border-${accent}/40 transition-all duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]`}
  >
    {/* Animated glowing orb behind the card */}
    <div className={`absolute -top-20 -right-20 w-80 h-80 bg-${accent}/20 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
    
    <div className="relative z-10">
      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-${accent}/10 border border-${accent}/30 mb-8`}>
        <span className={`text-xs font-bold tracking-widest uppercase text-${accent}`}>{title}</span>
      </div>
      
      <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all duration-300">
        {subtitle}
      </h3>
      
      <p className="text-textSecondary text-base leading-relaxed font-light mb-10">
        {description}
      </p>
      
      <div className="w-full h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent mb-6" />
      
      <h5 className="text-[10px] text-white/50 tracking-[0.2em] uppercase font-bold mb-6">Skillset & Tools</h5>
      
      <div className="flex flex-wrap gap-3">
        {skills.map((skill, i) => {
          const Icon = skill.icon;
          return (
            <motion.div 
              key={skill.name} 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 + (i * 0.05) }}
              viewport={{ once: true }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all cursor-default group/tag"
            >
              <Icon className="text-sm transition-transform duration-300 group-hover/tag:scale-110" style={{ color: skill.color }} />
              <span className="text-xs font-medium text-textSecondary group-hover/tag:text-white transition-colors">{skill.name}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  </motion.div>
);

const WhatIDo = () => {
  return (
    <section id="whatido" className="relative py-28 md:py-40 overflow-hidden" style={{ perspective: '1000px' }}>
      {/* Background decorations */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[700px] h-[700px] bg-accent/5 rounded-full blur-[180px] pointer-events-none" />
      <div className="absolute bottom-0 right-[-10%] w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[150px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
      
      <div className="section-inner relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label"><HiBriefcase className="inline mr-2 text-accent" />What I Do</span>
        </motion.div>
        
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 mt-12">
          <ServiceCard
            index={0}
            title="Frontend"
            subtitle="Building Interactive UIs"
            description="Crafting performant, responsive interfaces with modern frameworks. From SPAs to complex web applications, I deliver pixel-perfect experiences with smooth animations and thoughtful interactions."
            skills={frontendSkills}
            accent="accent"
          />
          <ServiceCard
            index={1}
            title="Backend & ML"
            subtitle="Scalable Data Systems"
            description="Designing robust APIs, microservices, and ML pipelines. From RESTful services to machine learning models, I build sophisticated backends and AI systems that scale reliably."
            skills={backendSkills}
            accent="secondary"
          />
        </div>
      </div>
    </section>
  );
};

export default WhatIDo;
