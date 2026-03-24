import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaCheckCircle, FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { HiSparkles } from 'react-icons/hi2';

const ContactSection = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contacts/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('sent');
        setForm({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const inputClass = "w-full px-5 py-4 rounded-xl bg-white/[0.02] backdrop-blur-xl border border-white/10 text-white placeholder:text-textSecondary/40 focus:outline-none focus:border-accent/80 focus:bg-white/[0.05] focus:shadow-[0_0_20px_rgba(6,182,212,0.3),inset_0_2px_10px_rgba(0,0,0,0.5)] shadow-[inset_0_2px_10px_rgba(0,0,0,0.2)] transition-all duration-300 text-sm font-medium tracking-wide";

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="contact" className="relative py-20 sm:py-28 md:py-40 pb-28 sm:pb-40 overflow-hidden">
      {/* Huge ambient background glow */}
      <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[400px] sm:w-[800px] h-[300px] sm:h-[500px] bg-secondary/10 rounded-full blur-[100px] sm:blur-[200px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-10%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-accent/5 rounded-full blur-[100px] sm:blur-[180px] pointer-events-none" />

      <div className="section-inner relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label"><HiSparkles className="inline mr-2 text-accent" />Get In Touch</span>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-col lg:flex-row gap-12 sm:gap-16 lg:gap-24 items-start mt-8 sm:mt-12"
        >

          {/* Left info */}
          <div className="w-full lg:w-5/12 flex-shrink-0">
            <motion.h2 variants={itemVariants} className="section-title text-white mb-8">
              Let's <span className="gradient-text">Work</span> Together
            </motion.h2>
            <motion.p variants={itemVariants} className="text-textSecondary leading-relaxed text-lg font-light mb-12">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Drop me a message and I'll get back to you ASAP.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col gap-6 mb-12">
              {[
                { Icon: FaEnvelope, label: 'Email', value: 'tarunkumarsingh179@gmail.com', href: 'mailto:tarunkumarsingh179@gmail.com' },
                { Icon: FaPhone, label: 'Phone', value: '+91 6205672924', href: 'tel:+916205672924' },
                { Icon: FaMapMarkerAlt, label: 'Location', value: 'Bokaro, Jharkhand, India' },
              ].map(({ Icon, label, value, href }) => (
                <motion.div 
                  key={label}
                  whileHover={{ x: 10, backgroundColor: "rgba(255,255,255,0.06)" }}
                  className="flex items-center gap-6 p-5 rounded-2xl bg-white/[0.02] border border-white/5 transition-all duration-300 group cursor-pointer"
                >
                  <div className="w-12 h-12 flex-shrink-0 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(var(--accent-rgb),0.4)] transition-all duration-300">
                    <Icon className="text-accent text-lg" />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/50 uppercase tracking-[0.2em] font-bold mb-1">{label}</p>
                    {href
                      ? <a href={href} className="text-base font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all">{value}</a>
                      : <span className="text-base font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all">{value}</span>
                    }
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-4">
              {[
                { Icon: FaGithub, href: 'https://github.com/tarunkumarsingh179', label: 'GitHub' },
                { Icon: FaLinkedinIn, href: 'https://linkedin.com/in/tarunkumarsingh179', label: 'LinkedIn' },
                { Icon: FaXTwitter, href: 'https://twitter.com/tarunkumarsingh179', label: 'Twitter' },
              ].map(({ Icon, href, label }) => (
                <motion.a 
                  key={label} 
                  href={href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label={label}
                  whileHover={{ y: -5, scale: 1.1, borderColor: "rgba(var(--accent-rgb), 0.5)" }}
                  className="w-12 h-12 rounded-full bg-white/[0.03] backdrop-blur-sm border border-white/10 flex items-center justify-center text-textSecondary hover:text-white hover:bg-accent/10 hover:shadow-[0_0_20px_rgba(var(--accent-rgb),0.3)] transition-all duration-300"
                >
                  <Icon className="text-[1.2rem]" />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right form */}
          <motion.div variants={itemVariants} className="w-full lg:flex-1 relative group mt-8 lg:mt-0">
            {/* Ambient form glow matching the form boundaries */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-secondary/5 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10" />
            
            <div className="p-6 sm:p-10 md:p-12 rounded-[1.5rem] sm:rounded-[2rem] bg-white/[0.02] backdrop-blur-xl border border-white/10 shadow-2xl relative z-10">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-10 text-center lg:text-left">Send a Message</h3>
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <input name="name" value={form.name} onChange={handleChange} placeholder="Your Name" required className={inputClass} />
                  <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Your Email" required className={inputClass} />
                </div>
                <input name="subject" value={form.subject} onChange={handleChange} placeholder="Subject" required className={inputClass} />
                <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell me about your project..." required rows={6} className={`${inputClass} resize-none`} />
                
                <motion.button
                  whileHover={status === 'idle' ? { scale: 1.05 } : {}}
                  whileTap={status === 'idle' ? { scale: 0.95 } : {}}
                  type="submit"
                  disabled={status === 'sending'}
                  className="mt-4 w-full sm:w-auto self-start flex items-center justify-center gap-3 px-10 py-4 bg-gradient-to-r from-accent to-secondary text-background font-bold text-[15px] uppercase tracking-wider rounded-xl shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_50px_rgba(6,182,212,0.7)] transition-all duration-500 disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none"
                >
                  {status === 'sending' && <span className="w-5 h-5 border-[3px] border-background/30 border-t-background rounded-full animate-spin" />}
                  {status === 'sent' && <FaCheckCircle className="text-lg" />}
                  {status === 'idle' && <FaPaperPlane className="text-lg" />}
                  <span className="mt-[2px]">
                    {status === 'idle' && 'Send Message'}
                    {status === 'sending' && 'Sending...'}
                    {status === 'sent' && 'Message Sent!'}
                    {status === 'error' && 'Failed — Retry'}
                  </span>
                </motion.button>
              </form>
            </div>
          </motion.div>

        </motion.div>
      </div>

      {/* Footer */}
      <div className="section-inner mt-20 sm:mt-40 pt-8 sm:pt-10 border-t border-white/5 text-center flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 relative z-10">
        <p className="text-textSecondary/60 text-xs sm:text-sm font-medium">
          Designed & Developed by{' '}
          <span className="text-white hover:text-accent transition-colors">Tarun Kumar Singh</span>
        </p>
        <p className="text-textSecondary/40 text-[10px] sm:text-sm font-mono tracking-widest">
          © {new Date().getFullYear()} ALL RIGHTS RESERVED
        </p>
      </div>
    </section>
  );
};

export default ContactSection;
