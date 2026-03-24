import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { HiFolder } from 'react-icons/hi2';

const projects = [
  {
    title: 'Stock Inventory Management',
    category: 'Full Stack',
    description: 'Comprehensive inventory management solution with real-time tracking, analytics dashboard, and automated reporting features.',
    tools: ['React', 'Node.js', 'MongoDB', 'Express'],
    github: 'https://github.com/tarunkumarsingh179/stock-inventory',
    demo: 'https://stock-inventory-demo.vercel.app',
    featured: true,
  },
  {
    title: 'Leaf Disease Detection',
    category: 'Machine Learning',
    description: 'ML powered app for detecting plant diseases using computer vision and neural networks with 95% accuracy on a custom dataset.',
    tools: ['Python', 'TensorFlow', 'Flutter', 'OpenCV'],
    github: 'https://github.com/tarunkumarsingh179/leaf-disease',
    demo: 'https://leaf-disease-demo.vercel.app',
    featured: true,
  },
  {
    title: 'College Management System',
    category: 'Web Development',
    description: 'Complete college management platform with student registration, course management, attendance tracking, and grade management.',
    tools: ['React', 'Python', 'Django', 'PostgreSQL'],
    github: 'https://github.com/tarunkumarsingh179/college-management',
    demo: 'https://college-management-demo.vercel.app',
    featured: true,
  },
  {
    title: 'E-Commerce Platform',
    category: 'Full Stack',
    description: 'Modern e-commerce solution with real-time inventory, Stripe payment integration, and an advanced analytics dashboard.',
    tools: ['Next.js', 'TypeScript', 'Stripe', 'MongoDB'],
    github: 'https://github.com/tarunkumarsingh179/ecommerce',
    demo: 'https://ecommerce-demo.vercel.app',
  },
  {
    title: 'Task Management App',
    category: 'Web Development',
    description: 'Collaborative task management with real-time updates, drag-and-drop interface, and team collaboration features.',
    tools: ['Vue.js', 'Node.js', 'Socket.io', 'Redis'],
    github: 'https://github.com/tarunkumarsingh179/task-manager',
    demo: 'https://task-manager-demo.vercel.app',
  },
  {
    title: 'Fitness Tracker App',
    category: 'Mobile Development',
    description: 'Comprehensive fitness tracking with workout planning, progress tracking, and social features for community sharing.',
    tools: ['React Native', 'Firebase', 'Redux', 'Charts.js'],
    github: 'https://github.com/tarunkumarsingh179/fitness-tracker',
    demo: 'https://fitness-tracker-demo.vercel.app',
  },
];

const categoryColors = {
  'Full Stack': 'text-accent border-accent/30 bg-accent/10',
  'Machine Learning': 'text-orange-400 border-orange-400/30 bg-orange-400/10',
  'Web Development': 'text-secondary border-secondary/30 bg-secondary/10',
  'Mobile Development': 'text-green-400 border-green-400/30 bg-green-400/10',
};

const ProjectCard = ({ project, index }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    whileHover={{ y: -5 }}
    className="group relative flex flex-col h-full p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 hover:bg-white/[0.06] transition-all duration-500"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />

    <div className="relative z-10 flex flex-col h-full">
      <div className="flex justify-between items-start mb-5">
        <HiFolder className="text-accent text-3xl group-hover:text-white transition-colors duration-300" />
        <div className="flex gap-3">
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-textSecondary hover:text-white transition-colors p-2 -mr-2">
            <FaGithub className="text-base sm:text-lg" />
          </a>
          <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-textSecondary hover:text-accent transition-colors p-2 -mr-2">
            <FaExternalLinkAlt className="text-sm sm:text-base" />
          </a>
        </div>
      </div>

      <span className={`inline-block self-start text-[10px] sm:text-xs font-semibold px-3 py-1 rounded-full border mb-4 ${categoryColors[project.category] || 'text-white/60 border-white/20 bg-white/5'}`}>
        {project.category}
      </span>

      <h3 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors duration-300">
        {project.title}
      </h3>

      <p className="text-textSecondary text-sm leading-relaxed flex-1 mb-6">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
        {project.tools.map((tool) => (
          <span key={tool} className="text-[10px] sm:text-xs font-mono text-textSecondary/70">{tool}</span>
        )).reduce((acc, el, i) => i === 0 ? [el] : [...acc, <span key={`sep-${i}`} className="text-white/20 text-xs">·</span>, el], [])}
      </div>
    </div>
  </motion.div>
);

const ProjectsSection = () => {
  return (
    <section id="work" className="relative py-20 sm:py-28 md:py-36 overflow-hidden">
      <div className="absolute top-20 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-accent/8 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />

      <div className="section-inner relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Featured Work</span>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12 sm:mb-16">
            <h2 className="section-title text-white text-3xl sm:text-4xl md:text-5xl">
              Things I've <span className="gradient-text">Built</span>
            </h2>
            <p className="text-textSecondary max-w-xs text-sm sm:text-base leading-relaxed">
              A selection of projects spanning web, mobile, and machine learning.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
