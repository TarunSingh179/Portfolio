import React from 'react';
import { motion } from 'framer-motion';
import { FaAward, FaCertificate, FaExternalLinkAlt, FaCalendarAlt, FaUniversity } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';
import './CertificationsSection.css';

const CertificationsSection = () => {
  const { isDark } = useTheme();

  const certifications = [
    {
      id: 1,
      title: "Google Cloud Certified - Associate Cloud Engineer",
      issuer: "Google",
      date: "2023",
      credentialId: "GCP-ACE-123456",
      image: "/api/placeholder/300/200",
      link: "https://cloud.google.com/certification",
      featured: true,
      skills: ["Google Cloud Platform", "Cloud Architecture", "DevOps"]
    },
    {
      id: 2,
      title: "Machine Learning Specialization",
      issuer: "Stanford University",
      date: "2023",
      credentialId: "STAN-ML-789012",
      image: "/api/placeholder/300/200",
      link: "https://coursera.org/specializations/machine-learning",
      featured: true,
      skills: ["Machine Learning", "Deep Learning", "Neural Networks"]
    },
    {
      id: 3,
      title: "Full Stack Web Development",
      issuer: "University of Michigan",
      date: "2022",
      credentialId: "UM-FSW-345678",
      image: "/api/placeholder/300/200",
      link: "https://coursera.org/specializations/full-stack",
      featured: false,
      skills: ["React", "Node.js", "MongoDB", "Express"]
    },
    {
      id: 4,
      title: "Python for Data Science",
      issuer: "UC San Diego",
      date: "2022",
      credentialId: "UCSD-PDS-901234",
      image: "/api/placeholder/300/200",
      link: "https://coursera.org/specializations/python-data-science",
      featured: false,
      skills: ["Python", "Data Analysis", "Pandas", "NumPy"]
    },
    {
      id: 5,
      title: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2023",
      credentialId: "AWS-CSA-567890",
      image: "/api/placeholder/300/200",
      link: "https://aws.amazon.com/certification/",
      featured: true,
      skills: ["AWS", "Cloud Computing", "Architecture"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <section className="certifications-section">
      <div className="certifications-container">
        {/* Header */}
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">
            <span className="title-gradient">Certifications</span>
          </h2>
          <p className="section-subtitle">
            Professional certifications and continuous learning achievements
          </p>
        </motion.div>

        {/* Certifications Grid */}
        <motion.div
          className="certifications-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              className={`certification-card ${cert.featured ? 'featured' : ''}`}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 20px 40px rgba(59, 130, 246, 0.2)'
              }}
            >
              {/* Certification Header */}
              <div className="cert-header">
                <div className="cert-icon">
                  <FaAward />
                </div>
                {cert.featured && (
                  <div className="featured-badge">
                    <FaCertificate />
                    <span>Featured</span>
                  </div>
                )}
              </div>

              {/* Certification Content */}
              <div className="cert-content">
                <h3 className="cert-title">{cert.title}</h3>
                
                <div className="cert-meta">
                  <div className="meta-item">
                    <FaUniversity />
                    <span>{cert.issuer}</span>
                  </div>
                  <div className="meta-item">
                    <FaCalendarAlt />
                    <span>{cert.date}</span>
                  </div>
                </div>

                <div className="cert-credential">
                  <span className="credential-label">Credential ID:</span>
                  <span className="credential-id">{cert.credentialId}</span>
                </div>

                {/* Skills */}
                <div className="cert-skills">
                  {cert.skills.map((skill, skillIndex) => (
                    <span key={skillIndex} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>

                {/* View Certificate Button */}
                <motion.a
                  href={cert.link}
                  className="view-cert-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaExternalLinkAlt />
                  View Certificate
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          className="cert-stats"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="stat-item">
            <div className="stat-number">{certifications.length}</div>
            <div className="stat-label">Total Certifications</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">
              {certifications.filter(c => c.featured).length}
            </div>
            <div className="stat-label">Featured</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">
              {new Set(certifications.flatMap(c => c.issuer)).size}
            </div>
            <div className="stat-label">Organizations</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CertificationsSection;
