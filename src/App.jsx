import { useState, useEffect, useRef } from 'react'
import './App.css'
import { TypeAnimation } from 'react-type-animation'
import { motion, useInView } from 'framer-motion'
import { FaReact, FaGithub, FaLinkedin, FaJava, FaMapMarkerAlt, FaEnvelope, FaPhone, FaArrowRight, FaArrowUp, FaPaperPlane, FaGraduationCap, FaUserTie, FaRocket, FaHandshake, FaBug, FaGooglePlay, FaExternalLinkAlt, FaAward, FaMoon, FaSun, FaDownload } from 'react-icons/fa'
import { HiOutlineChartBar, HiOutlineDeviceMobile, HiOutlineGlobe, HiOutlineColorSwatch, HiOutlineCloud, HiOutlineCog } from 'react-icons/hi'
import { BiTargetLock } from 'react-icons/bi'
import { IoCheckmarkDoneCircle } from 'react-icons/io5'
import { BsWhatsapp, BsCodeSlash } from 'react-icons/bs'

function AnimatedCounter({ end, duration = 2, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  useEffect(() => {
    if (isInView) {
      let startTime
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp
        const progress = (timestamp - startTime) / (duration * 1000)
        if (progress < 1) { setCount(Math.floor(end * progress)); requestAnimationFrame(animate) }
        else { setCount(end) }
      }
      requestAnimationFrame(animate)
    }
  }, [isInView, end, duration])
  return <span ref={ref}>{count}{suffix}</span>
}

function AnimatedSection({ children, className = '', delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }} transition={{ duration: 0.8, delay, ease: "easeOut" }} className={className}>
      {children}
    </motion.div>
  )
}

function ParticleBackground() {
  const [particles, setParticles] = useState([])
  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({ id: i, x: Math.random() * 100, y: Math.random() * 100, size: Math.random() * 4 + 1, duration: Math.random() * 20 + 10, delay: Math.random() * 5 }))
    setParticles(newParticles)
  }, [])
  return (
    <div className="particle-container">
      {particles.map((p) => (
        <motion.div key={p.id} className="particle" style={{ left: `${p.x}%`, top: `${p.y}%`, width: `${p.size}px`, height: `${p.size}px` }} animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2] }} transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }} />
      ))}
    </div>
  )
}

function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)
  useEffect(() => {
    const handleMouseMove = (e) => { setPosition({ x: e.clientX, y: e.clientY }); setIsPointer(window.getComputedStyle(e.target).cursor === 'pointer' || e.target.tagName === 'A' || e.target.tagName === 'BUTTON') }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])
  return (
    <>
      <motion.div className="custom-cursor" animate={{ x: position.x - 10, y: position.y - 10, scale: isPointer ? 1.5 : 1 }} transition={{ type: "spring", stiffness: 500, damping: 28 }} />
      <motion.div className="cursor-follower" animate={{ x: position.x - 20, y: position.y - 20, scale: isPointer ? 1.5 : 1 }} transition={{ type: "spring", stiffness: 150, damping: 15 }} />
    </>
  )
}

function Navbar({ isDarkMode, setIsDarkMode }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  const navLinks = [{ href: '#home', label: 'Home' }, { href: '#about', label: 'About' }, { href: '#experience', label: 'Experience' }, { href: '#projects', label: 'Projects' }, { href: '#skills', label: 'Skills' }, { href: '#contact', label: 'Contact' }]
  return (
    <motion.nav className={`navbar ${scrolled ? 'scrolled' : ''}`} initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}>
      <div className="container nav-container">
        <motion.a href="#home" className="logo" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <span className="gradient-text">S</span>ubramanian<span className="logo-dot"></span>
        </motion.a>
        <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu"><span className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}></span></button>
        <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          {navLinks.map((link, index) => (
            <motion.li key={link.href} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
              <a href={link.href} onClick={() => setMobileMenuOpen(false)}>{link.label}<span className="nav-link-underline"></span></a>
            </motion.li>
          ))}
          <motion.li initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: navLinks.length * 0.1 }}>
            <button className="theme-toggle" onClick={() => setIsDarkMode(!isDarkMode)} aria-label="Toggle theme">
              <motion.div initial={false} animate={{ rotate: isDarkMode ? 0 : 180 }} transition={{ duration: 0.3 }}>{isDarkMode ? <FaSun /> : <FaMoon />}</motion.div>
            </button>
          </motion.li>
        </ul>
      </div>
    </motion.nav>
  )
}

function Hero() {
  const roles = ['React Native Developer', 1500, 'Mobile App Builder', 1500, 'Cross-Platform Expert', 1500, 'Problem Solver', 1500]
  return (
    <section id="home" className="hero">
      <ParticleBackground />
      <div className="hero-bg-effects"><div className="gradient-orb orb-1"></div><div className="gradient-orb orb-2"></div><div className="gradient-orb orb-3"></div><div className="grid-background"></div></div>
      <div className="container hero-content">
        <div className="hero-text">
          {/* <motion.div className="hero-badge" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}><span className="badge-dot"></span>Available for hire</motion.div> */}
          <motion.p className="hero-greeting" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>Hello, I'm</motion.p>
          <motion.h1 className="hero-name" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}><span className="gradient-text glowing-text">Subramanian</span></motion.h1>
          <motion.h2 className="hero-title" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
            <TypeAnimation sequence={roles} wrapper="span" speed={50} repeat={Infinity} className="typing-text" /><span className="typing-cursor">|</span>
          </motion.h2>
          <motion.p className="hero-description" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
            Building seamless cross-platform mobile experiences with <span className="highlight"> 1+ year</span> of hands-on expertise. Transforming ideas into high-performance apps.
          </motion.p>
          <motion.div className="hero-cta" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
            <motion.a href="#projects" className="btn btn-primary btn-glow" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><span>View My Work</span><FaArrowRight /></motion.a>
            <motion.a href="#contact" className="btn btn-secondary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Get In Touch</motion.a>
            <motion.a href="/SUBRAMANIAN.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-outline" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><FaDownload />Resume</motion.a>
          </motion.div>
          <motion.div className="hero-tech-stack" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }}>
            <span className="tech-label">Tech Stack</span>
            <div className="tech-icons">
              <motion.div whileHover={{ y: -5, scale: 1.1 }} className="tech-icon-wrapper"><FaReact className="tech-icon react" /></motion.div>
              <motion.div whileHover={{ y: -5, scale: 1.1 }} className="tech-icon-wrapper"><BsCodeSlash className="tech-icon" /></motion.div>
              <motion.div whileHover={{ y: -5, scale: 1.1 }} className="tech-icon-wrapper"><FaJava className="tech-icon java" /></motion.div>
              <motion.div whileHover={{ y: -5, scale: 1.1 }} className="tech-icon-wrapper"><FaGithub className="tech-icon" /></motion.div>
            </div>
          </motion.div>
        </div>
        <motion.div className="hero-stats" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.5 }}>
          <motion.div className="stat-item glass-card stat-card-animated" whileHover={{ scale: 1.05 }}>
            {/* <div className="stat-icon">📱</div> */}
            <span className="stat-number gradient-text"><AnimatedCounter end={1} suffix="+" /></span><span className="stat-label">Years Experience</span></motion.div>
          <motion.div className="stat-item glass-card stat-card-animated" whileHover={{ scale: 1.05 }}>
            {/* <div className="stat-icon">🚀</div> */}
            <span className="stat-number gradient-text"><AnimatedCounter end={2} /></span><span className="stat-label">Projects Delivered</span></motion.div>
          <motion.div className="stat-item glass-card stat-card-animated" whileHover={{ scale: 1.05 }}>
            {/* <div className="stat-icon">⚡</div> */}
            <span className="stat-number gradient-text"><AnimatedCounter end={50} suffix="%" /></span><span className="stat-label">Error Reduction</span></motion.div>
        </motion.div>
      </div>
      <motion.div className="scroll-indicator" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}><span>Scroll to explore</span><motion.div className="scroll-arrow" animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }}><div className="scroll-mouse"><div className="scroll-wheel"></div></div></motion.div></motion.div>
    </section>
  )
}

function About() {
  const highlights = [{ icon: <BiTargetLock />, text: 'Solid understanding of OOP principles' }, { icon: <FaHandshake />, text: 'Collaborative team player with clear communication' }, { icon: <FaRocket />, text: 'Quick learner passionate about new technologies' }, { icon: <FaBug />, text: 'Skilled in debugging complex technical issues' }]
  return (
    <section id="about" className="about">
      <div className="container">
        <AnimatedSection><h2 className="section-title"><span className="section-number">01.</span>About Me</h2><p className="section-subtitle">Passionate mobile developer crafting exceptional user experiences</p></AnimatedSection>
        <div className="about-content">
          <AnimatedSection delay={0.2}>
            <div className="about-text glass-card hover-glow">
              <p>Results-driven React Native Developer based in <strong>Tenkasi, Tamil Nadu</strong>. I specialize in building and launching cross-platform mobile applications that are smooth, scalable, and user-friendly.</p>
              <p>My expertise spans integrating REST APIs, Firebase, and AWS services to create robust solutions. I'm known for improving UI responsiveness and implementing validation features that enhance overall app performance.</p>
              <div className="about-highlights">
                {highlights.map((item, index) => (<motion.div key={index} className="highlight-item" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }} whileHover={{ x: 10 }}><span className="highlight-icon">{item.icon}</span><span>{item.text}</span></motion.div>))}
              </div>
            </div>
          </AnimatedSection>
          <div className="about-info">
            <AnimatedSection delay={0.3}>
              <div className="info-card glass-card hover-glow">
                <h3><FaGraduationCap className="section-icon" /> Education</h3>
                <div className="education-item"><span className="degree">Master of Computer Applications</span><span className="school">Bharathiar University, Coimbatore</span><span className="year">Expected 07/2027</span></div>
                <div className="education-item"><span className="degree">Bachelor of Computer Applications</span><span className="school">Dr. N.G.P. Arts and Science College</span><span className="year">2021 - 2024 • 72%</span></div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.4}>
              <div className="contact-card glass-card hover-glow">
                <h3><FaUserTie className="section-icon" /> Let's Connect</h3>
                <div className="contact-links">
                  <motion.a href="mailto:subrxmanian@gmail.com" onClick={(e) => { e.stopPropagation(); window.location.href = 'mailto:subrxmanian@gmail.com'; }} className="contact-item" whileHover={{ x: 5 }}><span className="contact-icon"><FaEnvelope /></span><span>Subrxmanian@gmail.com</span></motion.a>
                  <motion.a href="tel:+919790583194" onClick={(e) => { e.stopPropagation(); window.location.href = 'tel:+919790583194'; }} className="contact-item" whileHover={{ x: 5 }}><span className="contact-icon"><FaPhone /></span><span>9790583194</span></motion.a>
                  <motion.a href="https://github.com/Subrxmanian" target="_blank" rel="noopener noreferrer" className="contact-item" whileHover={{ x: 5 }}><span className="contact-icon"><FaGithub /></span><span>github.com/Subrxmanian</span></motion.a>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  )
}

function Experience() {
  const experiences = [
    { title: 'React Native Developer', company: 'Thinks Strive Solutions', location: 'Remote', period: '11/2024 – Present', current: true, achievements: ['Developed cross-platform mobile applications integrated with MongoDB, achieving 20% reduction in load times', 'Implemented push notifications using React Native CLI and Firebase to boost user engagement', 'Integrated AWS CRUD operations for efficient data storage, improving backend reliability', 'Optimized UI responsiveness by refining TouchableOpacity components for smoother interactions', 'Designed custom validation logic for government ID fields including Aadhar, reducing form errors by 35%'] },
    { title: 'React Native Developer', company: 'Kite Career', location: 'Surandai, Tenkasi', period: '05/2024 – 11/2024', current: false, achievements: ['Built mobile applications using React Native integrated with Laravel backend', 'Integrated push notifications using Expo and Firebase for Android and iOS platforms', 'Ensured mobile UI responsiveness using TouchableOpacity and Flexbox', 'Worked on form validations including Aadhar number and custom validation rules'] }
  ]
  return (
    <section id="experience" className="experience">
      <div className="container">
        <AnimatedSection><h2 className="section-title"><span className="section-number">02.</span>Experience</h2><p className="section-subtitle">My professional journey building mobile solutions</p></AnimatedSection>
        <div className="timeline">
          {experiences.map((exp, index) => (
            <AnimatedSection key={index} delay={index * 0.2}>
              <motion.div className={`timeline-item ${exp.current ? 'current' : ''}`} whileHover={{ scale: 1.02 }}>
                <div className="timeline-marker"><motion.div className="marker-dot" animate={exp.current ? { scale: [1, 1.2, 1] } : {}} transition={{ duration: 2, repeat: Infinity }}></motion.div></div>
                <div className="timeline-content glass-card hover-glow">
                  <div className="exp-header">
                    <div><h3 className="exp-title">{exp.title}</h3><p className="exp-company">{exp.company}</p><p className="exp-location"><FaMapMarkerAlt className="location-icon" /> {exp.location}</p></div>
                    <div className="exp-period-wrapper"><span className="exp-period">{exp.period}</span>{exp.current && (<motion.span className="current-indicator" animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }}>Current</motion.span>)}</div>
                  </div>
                  <ul className="exp-achievements">{exp.achievements.map((achievement, i) => (<motion.li key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>{achievement}</motion.li>))}</ul>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

function Projects() {
  const projects = [
    { title: 'XO - Tic Tac Toe', description: 'A modern, beautifully crafted Tic Tac Toe mobile game with intelligent AI opponent, smooth animations, and polished UI with gradient themes.', features: ['Implemented Minimax algorithm with Alpha-Beta pruning for optimal AI performance', 'Built custom drag-to-dismiss modals using PanResponder for smooth UX', 'Developed persistent statistics tracking with AsyncStorage hooks'], tech: ['React Native', 'TypeScript', 'NativeWind', 'AsyncStorage', 'Animated API'], result: 'Smart AI with two difficulty modes - Easy (random) and Unbeatable (perfect strategy)', status: 'completed', color: '#6366f1', colorRgb: '99, 102, 241', icon: <IoCheckmarkDoneCircle />, image: '🎮', links: { apk: 'https://drive.google.com/file/d/1aVXty2Xf_oGUN33OdoEQwTN2dchS7l37/view?usp=sharing', github: 'https://github.com/Subrxmanian/XO' } },
    { title: 'FLYKUP – Live Commerce App', description: 'Production-ready live commerce and social shopping mobile application for Android & iOS with live streaming, shoppable videos, and real-time chat.', features: ['Built cross-platform app using React Native 0.76.6 with TypeScript', 'Implemented live streaming with Amazon IVS, WebRTC, and real-time chat', 'Developed TikTok-style shoppable video reels with product tagging'], tech: ['React Native', 'TypeScript', 'AWS Amplify', 'Amazon IVS', 'Socket.IO', 'Firebase'], result: 'Achieved 60 FPS scrolling, supports thousands of concurrent live viewers', status: 'completed', color: '#8b5cf6', colorRgb: '139, 92, 246', icon: <IoCheckmarkDoneCircle />, image: '📺', links: { playstore: 'https://play.google.com/store/apps/details?id=com.flykup.app', github: 'https://github.com/Subrxmanian/FLYKUP', website: 'https://flykup.live/' } }
  ]
  return (
    <section id="projects" className="projects">
      <div className="container">
        <AnimatedSection><h2 className="section-title"><span className="section-number">03.</span>Featured Projects</h2><p className="section-subtitle">Showcasing my best work in mobile development</p></AnimatedSection>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <AnimatedSection key={index} delay={index * 0.2}>
              <motion.div className="project-card glass-card" style={{ '--project-color': project.color, '--project-color-rgb': project.colorRgb }} whileHover={{ y: -10 }}>
                <div className="project-image-placeholder"><span className="project-emoji">{project.image}</span><div className="project-image-overlay"></div></div>
                <div className="project-content">
                  {/* <div className="project-header"><div className="project-icon">{project.icon}</div><span className={`project-status ${project.status}`}>{project.status === 'completed' ? 'Completed' : 'In Progress'}</span></div> */}
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <ul className="project-features">{project.features.map((feature, i) => 
                  (<motion.li key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: i * 0.1 }}>{feature}</motion.li>))}</ul>
                  <div className="project-tech">{project.tech.map((tech, i) => (<motion.span key={i} className="tech-tag" whileHover={{ scale: 1.1, y: -2 }}>{tech}</motion.span>))}</div>
                  <div className="project-result"><span className="result-icon"><HiOutlineChartBar /></span><span>{project.result}</span></div>
                  {project.links && (<div className="project-links">{project.links.apk && (
                    <motion.a href={project.links.apk} target="_blank" rel="noopener noreferrer" className="project-link" whileHover={{ scale: 1.05 }}><FaDownload /> APK</motion.a>)}{project.links.playstore && (<motion.a href={project.links.playstore} target="_blank" rel="noopener noreferrer" className="project-link" whileHover={{ scale: 1.05 }}><FaGooglePlay /> Play Store</motion.a>)}{project.links.github && (<motion.a href={project.links.github} target="_blank" rel="noopener noreferrer" className="project-link" whileHover={{ scale: 1.05 }}><FaGithub /> GitHub</motion.a>)}{project.links.website && (<motion.a href={project.links.website} target="_blank" rel="noopener noreferrer" className="project-link" whileHover={{ scale: 1.05 }}><FaExternalLinkAlt /> Website</motion.a>)}</div>)}
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

function Skills() {
  const skillCategories = [
    { title: 'Mobile Development', icon: <HiOutlineDeviceMobile />, skills: ['React Native', 'Expo', 'React Native CLI'] },
    { title: 'Web Technologies', icon: <HiOutlineGlobe />, skills: ['HTML', 'CSS', 'React.js (Basics)', 'RESTful APIs'] },
    { title: 'UI Libraries', icon: <HiOutlineColorSwatch />, skills: ['React Native Paper', 'NativeBase', 'NativeWind'] },
    { title: 'Backend & Cloud', icon: <HiOutlineCloud />, skills: ['SpringBoot (Learning)', 'Firebase', 'MongoDB (Learning)'] },
    { title: 'Java Technologies', icon: <FaJava />, skills: ['Core Java', 'JDBC', 'Servlets (Learning)'] },
    { title: 'Tools & Platforms', icon: <HiOutlineCog />, skills: ['Git', 'GitHub', 'Postman', 'Android Studio', 'VS Code'] }
  ]
  const certifications = ['HTML and CSS (2 in 1) Course for Beginners', 'Basics of Java Certification (Java OOPS Features)', 'Adobe Photoshop CC - Basic Photoshop Training (Udemy)', 'A Complete Course on IBM Quantum Developer (Udemy)']
  return (
    <section id="skills" className="skills">
      <div className="container">
        <AnimatedSection><h2 className="section-title"><span className="section-number">04.</span>Technical Skills</h2><p className="section-subtitle">Technologies and tools I work with</p></AnimatedSection>
        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <AnimatedSection key={index} delay={index * 0.1}>
              <motion.div className="skill-card glass-card" whileHover={{ y: -5, scale: 1.02 }}>
                <div className="skill-icon">{category.icon}</div>
                <h3 className="skill-title">{category.title}</h3>
                <div className="skill-tags">{category.skills.map((skill, i) => (<motion.span key={i} className="skill-tag" whileHover={{ scale: 1.1 }}>{skill}</motion.span>))}</div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
        <AnimatedSection delay={0.5}>
          <div className="certifications glass-card">
            <h3><FaAward className="cert-title-icon" /> Certifications</h3>
            <ul className="cert-list">{certifications.map((cert, i) => (<motion.li key={i} className="cert-item" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} whileHover={{ x: 5 }}>{cert}</motion.li>))}</ul>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const WEB3FORMS_ACCESS_KEY = 'b72b7663-d2f0-49eb-bf0e-c1a9811fe0c8'
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)
    try {
      const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ access_key: WEB3FORMS_ACCESS_KEY, subject: `Portfolio Contact: Message from ${formData.name}`, from_name: formData.name, email: formData.email, message: formData.message }) })
      const result = await response.json()
      if (result.success) { setSubmitStatus('success'); setFormData({ name: '', email: '', message: '' }) } else { setSubmitStatus('error') }
    } catch { setSubmitStatus('error') } finally { setIsSubmitting(false) }
  }
  return (
    <section id="contact" className="contact">
      <div className="container">
        <AnimatedSection><h2 className="section-title"><span className="section-number">05.</span>Get In Touch</h2><p className="section-subtitle">Ready to collaborate? Let's build something amazing together.</p></AnimatedSection>
        <div className="contact-content">
          <AnimatedSection delay={0.2}>
            <div className="info-block glass-card">
              <h3>Let's Connect</h3>
              <p>I'm currently open to new opportunities and exciting projects. Whether you have a question or just want to say hi, I'll do my best to get back to you!</p>
              <div className="contact-details">
                <motion.a href="mailto:subrxmanian@gmail.com" onClick={(e) => { e.stopPropagation(); window.location.href = 'mailto:subrxmanian@gmail.com'; }} className="contact-detail-item" whileHover={{ x: 5 }}><div className="detail-icon"><FaEnvelope /></div><div className="detail-text"><span className="label">Email</span><span className="value">subrxmanian@gmail.com</span></div></motion.a>
                <motion.a href="tel:+919790583194" onClick={(e) => { e.stopPropagation(); window.location.href = 'tel:+919790583194'; }} className="contact-detail-item" whileHover={{ x: 5 }}><div className="detail-icon"><FaPhone /></div><div className="detail-text"><span className="label">Phone</span><span className="value">+91 9790583194</span></div></motion.a>
                <div className="contact-detail-item"><div className="detail-icon"><FaMapMarkerAlt /></div><div className="detail-text"><span className="label">Location</span><span className="value">Tenkasi, Tamil Nadu</span></div></div>
              </div>
              <div className="social-links">
                <motion.a href="https://github.com/Subrxmanian" target="_blank" rel="noopener noreferrer" className="social-link" whileHover={{ y: -3 }}><FaGithub /></motion.a>
                <motion.a href="https://www.linkedin.com/in/subramanianmobileappdeveloper/" target="_blank" rel="noopener noreferrer" className="social-link" whileHover={{ y: -3 }}><FaLinkedin /></motion.a>
                <motion.a href="https://wa.me/9790583194?text=Hi" target="_blank" rel="noopener noreferrer" className="social-link" whileHover={{ y: -3 }}><BsWhatsapp /></motion.a>
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection delay={0.3}>
            <form className="contact-form glass-card" onSubmit={handleSubmit}>
              <div className="form-group"><label htmlFor="name">Your Name</label><input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Anandh Saran" required /></div>
              <div className="form-group"><label htmlFor="email">Your Email</label><input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="anandhsaran@example.com" required /></div>
              <div className="form-group"><label htmlFor="message">Your Message</label><textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Hi, I'd like to discuss..." rows="5" required></textarea></div>
              <motion.button type="submit" className="btn btn-primary submit-btn" disabled={isSubmitting} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>{isSubmitting ? 'Sending...' : 'Send Message'}<FaPaperPlane /></motion.button>
              {submitStatus === 'success' && <div className="form-status success">✓ Thank you! Your message has been sent successfully.</div>}
              {submitStatus === 'error' && <div className="form-status error">✗ Something went wrong. Please try again or email directly.</div>}
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand"><a href="#home" className="logo"><span className="gradient-text">S</span>ubramanian</a><p>React Native Developer crafting exceptional mobile experiences.</p></div>
          <div className="footer-links"><a href="#about">About</a><a href="#experience">Experience</a><a href="#projects">Projects</a><a href="#skills">Skills</a><a href="#contact">Contact</a></div>
        </div>
        <div className="footer-bottom"><p>&copy; {new Date().getFullYear()} Subramanian. All rights reserved.</p><p className="footer-tagline">Built with <FaReact className="footer-react-icon" /> & passion</p></div>
      </div>
    </footer>
  )
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const toggleVisible = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', toggleVisible)
    return () => window.removeEventListener('scroll', toggleVisible)
  }, [])
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  return (
    <motion.button className={`scroll-to-top ${visible ? 'visible' : ''}`} onClick={scrollToTop} aria-label="Scroll to top" whileHover={{ y: -5 }} whileTap={{ scale: 0.9 }}><FaArrowUp /></motion.button>
  )
}

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  return (
    <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
      <CustomCursor />
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default App
