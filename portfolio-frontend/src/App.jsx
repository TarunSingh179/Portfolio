import React from 'react';
import Cursor from './components/ui/Cursor';
import Navigation from './components/layout/Navigation';
import SocialIcons from './components/layout/SocialIcons';
import HeroSection from './components/sections/HeroSection';
import AboutSection from './components/sections/AboutSection';
import WhatIDo from './components/sections/WhatIDo';
import InternshipSection from './components/sections/InternshipSection';
import ProjectsSection from './components/sections/ProjectsSection';
import SkillsSection from './components/sections/SkillsSection';
import ContactSection from './components/sections/ContactSection';
import './App.css';

function App() {
  return (
    <div className="app min-h-screen bg-background text-textPrimary overflow-x-hidden relative">
      <Cursor />
      <Navigation />
      <SocialIcons />
      <main className="main-body main-active pt-20">
        <HeroSection />
        <AboutSection />
        <WhatIDo />
        <InternshipSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>
    </div>
  );
}

export default App;
