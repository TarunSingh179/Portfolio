import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaPhone, FaMapMarkerAlt, FaArrowUp } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import './Footer.css';

const Footer = () => {
  const { isDark } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/tarunkumarsingh179', label: 'GitHub' },
    { icon: FaLinkedin, href: 'https://linkedin.com/in/tarunkumarsingh179', label: 'LinkedIn' },
    { icon: FaTwitter, href: 'https://twitter.com/tarunkumarsingh179', label: 'Twitter' },
    { icon: FaEnvelope, href: 'mailto:tarunkumarsingh179@gmail.com', label: 'Email' }
  ];

  const quickLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#certifications', label: 'Certifications' },
    { href: '#internship', label: 'Experience' },
    { href: '#contact', label: 'Contact' }
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-content">
          {/* About Section */}
          <motion.div
            className="footer-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="footer-title">Tarun Kumar Singh</h3>
            <p className="footer-description">
              Computer Science Engineering student passionate about building innovative solutions 
              and creating impactful digital experiences. Specializing in full-stack development 
              and machine learning.
            </p>
            
            {/* Social Links */}
            <div className="footer-social">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ 
                      scale: 1.2,
                      rotate: 360,
                      transition: { duration: 0.5 }
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="footer-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <a href={link.href} className="footer-link">
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="footer-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="footer-title">Contact Info</h3>
            <div className="contact-info">
              <div className="contact-item">
                <FaEnvelope />
                <span>tarunkumarsingh179@gmail.com</span>
              </div>
              <div className="contact-item">
                <FaPhone />
                <span>+91 6205672924</span>
              </div>
              <div className="contact-item">
                <FaMapMarkerAlt />
                <span>Bokaro, Jharkhand, India</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <motion.div
              className="copyright"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <p>
                © {currentYear} Tarun Kumar Singh. All rights reserved. 
                Made with <span className="heart">❤️</span> and lots of <span className="coffee">☕</span>
              </p>
            </motion.div>

            <motion.button
              className="scroll-to-top"
              onClick={scrollToTop}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.1,
                y: -5
              }}
              whileTap={{ scale: 0.9 }}
            >
              <FaArrowUp />
              <span>Back to Top</span>
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
