import React from 'react';
import Marquee from 'react-fast-marquee';
import {
  SiReact, SiNodedotjs, SiPython, SiJavascript, SiTypescript, SiHtml5,
  SiCss3, SiTailwindcss, SiNextdotjs, SiMongodb, SiPostgresql, SiMysql,
  SiTensorflow, SiExpress, SiFirebase, SiDocker, SiGit, SiFlutter,
  SiRedux, SiGraphql, SiRedis, SiNumpy, SiPandas, SiScikitlearn, SiKeras, SiFastapi
} from 'react-icons/si';
import { FaBrain, FaCloud } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi2';

const row1 = [
  { name: 'React', icon: SiReact, color: '#61DAFB' },
  { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
  { name: 'Python', icon: SiPython, color: '#3776AB' },
  { name: 'Next.js', icon: SiNextdotjs, color: '#fff' },
  { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
  { name: 'Express.js', icon: SiExpress, color: '#fff' },
  { name: 'TensorFlow', icon: SiTensorflow, color: '#FF6F00' },
  { name: 'Flutter', icon: SiFlutter, color: '#02569B' },
  { name: 'Redux', icon: SiRedux, color: '#764ABC' },
  { name: 'GraphQL', icon: SiGraphql, color: '#E10098' },
];

const row2 = [
  { name: 'HTML5', icon: SiHtml5, color: '#E34C26' },
  { name: 'CSS3', icon: SiCss3, color: '#1572B6' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
  { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
  { name: 'Firebase', icon: SiFirebase, color: '#FFCA28' },
  { name: 'Docker', icon: SiDocker, color: '#2496ED' },
  { name: 'Git', icon: SiGit, color: '#F05032' },
  { name: 'Redis', icon: SiRedis, color: '#DC382D' },
  { name: 'NumPy', icon: SiNumpy, color: '#4D77CF' },
  { name: 'Pandas', icon: SiPandas, color: '#130654' },
  { name: 'Scikit-learn', icon: SiScikitlearn, color: '#F7931E' },
  { name: 'Keras', icon: SiKeras, color: '#D00000' },
  { name: 'FastAPI', icon: SiFastapi, color: '#009688' },
  { name: 'OpenCV', icon: FaBrain, color: '#5C3EE8' },
  { name: 'AWS', icon: FaCloud, color: '#FF9900' },
];

const SkillBadge = ({ tech }) => {
  const Icon = tech.icon;
  return (
    <div className="flex items-center gap-2.5 px-5 py-2.5 mx-2 rounded-full bg-white/[0.04] border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group cursor-default">
      <Icon className="text-lg flex-shrink-0 transition-transform duration-300 group-hover:scale-110" style={{ color: tech.color }} />
      <span className="text-sm font-medium text-textSecondary group-hover:text-white transition-colors whitespace-nowrap">{tech.name}</span>
    </div>
  );
};

const SkillsSection = () => {
  return (
    <section id="techstack" className="relative py-28 md:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.03] to-transparent pointer-events-none" />

      <div className="section-inner relative z-10 mb-16 md:mb-24 text-center">
        <span className="section-label"><HiSparkles className="inline mr-2" />My Techstack</span>
        <h2 className="section-title text-white">
          Tools I <span className="gradient-text">Master</span>
        </h2>
      </div>

      <div className="flex flex-col gap-5 overflow-hidden">
        <Marquee speed={38} gradient gradientColor={[2, 6, 23]} gradientWidth={120} pauseOnHover>
          {row1.map((tech) => <SkillBadge tech={tech} key={tech.name} />)}
        </Marquee>
        <Marquee speed={32} gradient gradientColor={[2, 6, 23]} gradientWidth={120} pauseOnHover direction="right">
          {row2.map((tech) => <SkillBadge tech={tech} key={tech.name} />)}
        </Marquee>
        <Marquee speed={44} gradient gradientColor={[2, 6, 23]} gradientWidth={120} pauseOnHover>
          {[...row1].reverse().map((tech) => <SkillBadge tech={tech} key={tech.name + '-r'} />)}
        </Marquee>
      </div>
    </section>
  );
};

export default SkillsSection;
