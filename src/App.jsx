import React, { useState, useEffect } from 'react';
import { resumeData } from './resumeData';
import ChatbotModal from './ChatbotModal';

// Preset color options for instant switching
const COLOR_PRESETS = [
  { name: 'Electric Orange', hex: '#ff6b00', hue: 24, sat: '100%', light: '55%' },
  { name: 'Cyber Amber', hex: '#ffb300', hue: 42, sat: '100%', light: '50%' },
  { name: 'Crimson Red', hex: '#ff3d57', hue: 352, sat: '100%', light: '62%' },
  { name: 'Emerald Green', hex: '#00e676', hue: 151, sat: '100%', light: '45%' },
  { name: 'Neon Cyan', hex: '#00e5ff', hue: 186, sat: '100%', light: '50%' },
  { name: 'Royal Purple', hex: '#a855f7', hue: 271, sat: '91%', light: '65%' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('about');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInitialQuery, setChatInitialQuery] = useState(null);
  const [contactFeedback, setContactFeedback] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Theme Mode & Color Customizer State
  const [themeMode, setThemeMode] = useState('dark'); // 'dark' | 'light'
  const [currentColor, setCurrentColor] = useState(COLOR_PRESETS[0]);
  const [customHex, setCustomHex] = useState('#ff6b00');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Apply theme mode and color variables to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeMode);
    document.documentElement.style.setProperty('--accent-hue', currentColor.hue);
    document.documentElement.style.setProperty('--accent-sat', currentColor.sat);
    document.documentElement.style.setProperty('--accent-light', currentColor.light);
  }, [themeMode, currentColor]);

  const handlePresetSelect = (preset) => {
    setCurrentColor(preset);
    setCustomHex(preset.hex);
  };

  // Convert Hex to HSL for native color input
  const handleNativeColorChange = (hex) => {
    setCustomHex(hex);
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
        default: break;
      }
      h /= 6;
    }

    const hueVal = Math.round(h * 360);
    const satVal = `${Math.round(s * 100)}%`;
    const lightVal = `${Math.round(l * 100)}%`;

    setCurrentColor({
      name: 'Custom',
      hex,
      hue: hueVal,
      sat: satVal,
      light: lightVal
    });
  };

  const resetThemeDefaults = () => {
    setThemeMode('dark');
    handlePresetSelect(COLOR_PRESETS[0]);
  };

  const openChatWithQuery = (query = null) => {
    setChatInitialQuery(query);
    setIsChatOpen(true);
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const name = formData.get('name') || '';
    const email = formData.get('email') || '';
    const message = formData.get('message') || '';

    setIsSubmitting(true);
    setContactFeedback(null);

    const formEndpoint = `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ID || 'xkjjnwkj'}`;

    try {
      const response = await fetch(formEndpoint, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `New Portfolio Message from ${name}`
        })
      });

      if (response.ok) {
        setContactFeedback({
          type: 'success',
          text: `Thank you ${name}! Your message has been sent successfully. Kaushal will reply soon.`
        });
        form.reset();
      } else {
        throw new Error('Endpoint response not ok');
      }
    } catch {
      // Fallback: Mailto client trigger
      window.location.href = `mailto:${resumeData.email}?subject=${encodeURIComponent('Portfolio Inquiry from ' + name)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
      setContactFeedback({
        type: 'success',
        text: `Thank you! Your email client has been prepared to send your message directly to ${resumeData.email}.`
      });
      form.reset();
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setContactFeedback(null), 8000);
    }
  };

  return (
    <div className="vcard-app-wrapper">
      <main className="vcard-main">
        {/* ========================================================
            SIDEBAR (codewithsadee vCard Architecture)
            ======================================================== */}
        <aside className="sidebar">
          <div className="sidebar-info">
            <figure className="avatar-box">
              <div className="avatar-initials">KS</div>
              <span className="online-dot" title="Available for opportunities"></span>
            </figure>

            <div className="info-content">
              <h1 className="name">{resumeData.name}</h1>
              <p className="title">{resumeData.title}</p>
            </div>
          </div>

          <div className="sidebar-separator"></div>

          {/* AI Twin Trigger Card */}
          <div className="sidebar-ai-card">
            <span className="material-symbols-outlined ai-pulse-icon">psychology</span>
            <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--white-2)' }}>Ask My AI Twin</div>
            <p style={{ fontSize: '11.5px', color: 'var(--light-gray-70)', margin: '4px 0 8px' }}>
              Instant answers on my resume &amp; experience
            </p>
            <button className="sidebar-ai-btn" onClick={() => openChatWithQuery()}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>chat</span>
              <span>Start Conversation</span>
            </button>
          </div>

          {/* Contact Details List */}
          <ul className="contacts-list">
            <li className="contact-item">
              <div className="icon-box">
                <span className="material-symbols-outlined">mail</span>
              </div>
              <div className="contact-info">
                <p className="contact-title">Email</p>
                <a href={`mailto:${resumeData.email}`} className="contact-link">{resumeData.email}</a>
              </div>
            </li>

            <li className="contact-item">
              <div className="icon-box">
                <span className="material-symbols-outlined">call</span>
              </div>
              <div className="contact-info">
                <p className="contact-title">Phone</p>
                <a href={`tel:${resumeData.phone.replace(/\s+/g, '')}`} className="contact-link">{resumeData.phone}</a>
              </div>
            </li>

            <li className="contact-item">
              <div className="icon-box">
                <span className="material-symbols-outlined">location_on</span>
              </div>
              <div className="contact-info">
                <p className="contact-title">Location</p>
                <address className="contact-link" style={{ fontStyle: 'normal' }}>{resumeData.location}</address>
              </div>
            </li>

            <li className="contact-item">
              <div className="icon-box">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.65 1.65 0 0 0 1.66-1.66A1.66 1.66 0 0 0 6.46 5.4a1.66 1.66 0 0 0-1.66 1.7 1.66 1.66 0 0 0 1.66 1.66m1.39 9.74v-8.37H5.07v8.37h2.78Z" />
                </svg>
              </div>
              <div className="contact-info">
                <p className="contact-title">LinkedIn</p>
                <a href={resumeData.linkedin} target="_blank" rel="noopener noreferrer" className="contact-link">
                  in/{resumeData.linkedinUsername}
                </a>
              </div>
            </li>

            <li className="contact-item">
              <div className="icon-box">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" />
                </svg>
              </div>
              <div className="contact-info">
                <p className="contact-title">GitHub</p>
                <a href={resumeData.github} target="_blank" rel="noopener noreferrer" className="contact-link">
                  github.com/{resumeData.githubUsername}
                </a>
              </div>
            </li>
          </ul>

          <div className="sidebar-separator"></div>

          {/* Social Links */}
          <ul className="social-list">
            <li className="social-item">
              <a href={resumeData.linkedin} target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn">
                <svg viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.65 1.65 0 0 0 1.66-1.66A1.66 1.66 0 0 0 6.46 5.4a1.66 1.66 0 0 0-1.66 1.7 1.66 1.66 0 0 0 1.66 1.66m1.39 9.74v-8.37H5.07v8.37h2.78Z" />
                </svg>
              </a>
            </li>
            <li className="social-item">
              <a href={resumeData.github} target="_blank" rel="noopener noreferrer" className="social-link" title="GitHub">
                <svg viewBox="0 0 24 24">
                  <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" />
                </svg>
              </a>
            </li>
            <li className="social-item">
              <a href={`mailto:${resumeData.email}`} className="social-link" title="Email">
                <span className="material-symbols-outlined">email</span>
              </a>
            </li>
            <li className="social-item">
              <button onClick={() => openChatWithQuery()} className="social-link" title="AI Assistant">
                <span className="material-symbols-outlined">smart_toy</span>
              </button>
            </li>
          </ul>
        </aside>

        {/* ========================================================
            MAIN CONTENT AREA WITH TOP TAB NAVBAR
            ======================================================== */}
        <div className="main-content">
          {/* Top-Right Pill Navbar (codewithsadee Layout) */}
          <nav className="navbar">
            <ul className="navbar-list">
              <li className="navbar-item">
                <button
                  className={`navbar-link ${activeTab === 'about' ? 'active' : ''}`}
                  onClick={() => setActiveTab('about')}
                >
                  About
                </button>
              </li>
              <li className="navbar-item">
                <button
                  className={`navbar-link ${activeTab === 'resume' ? 'active' : ''}`}
                  onClick={() => setActiveTab('resume')}
                >
                  Resume
                </button>
              </li>
              <li className="navbar-item">
                <button
                  className={`navbar-link ${activeTab === 'portfolio' ? 'active' : ''}`}
                  onClick={() => setActiveTab('portfolio')}
                >
                  Portfolio
                </button>
              </li>
              <li className="navbar-item">
                <button
                  className={`navbar-link ${activeTab === 'contact' ? 'active' : ''}`}
                  onClick={() => setActiveTab('contact')}
                >
                  Contact
                </button>
              </li>
              <li className="navbar-item">
                <button
                  className="navbar-link"
                  style={{ color: 'var(--orange-primary)', display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: '600' }}
                  onClick={() => openChatWithQuery()}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '17px' }}>smart_toy</span>
                  <span>AI Twin</span>
                </button>
              </li>
            </ul>
          </nav>

          {/* ================= TAB 1: ABOUT ================= */}
          {activeTab === 'about' && (
            <article className="tab-content">
              <header className="article-header">
                <h2 className="article-title">About Me</h2>
              </header>

              <section className="about-text">
                <p>
                  I am an <strong>Information Technology graduate</strong> and <strong>Developer Intern</strong> specializing in integrating Generative AI, Large Language Models (LLMs), and Agentic frameworks into high-performance web applications.
                </p>
                <p>
                  With <strong>1+ Years</strong> of hands-on experience, I have architected multi-model emotional chatbots, built RAG pipelines with vector stores (FAISS/Supabase), optimized system prompts to reduce token costs by ~60%, and contributed to 10+ production websites for government and enterprise clients.
                </p>
              </section>

              {/* Metrics */}
              <div className="metrics-row">
                {resumeData.stats.map((s, idx) => (
                  <div key={idx} className="metric-card">
                    <div className="metric-val">{s.value}</div>
                    <div className="metric-lbl">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* What I'm Doing */}
              <h3 className="section-subtitle">What I'm Doing</h3>
              <ul className="service-list">
                <li className="service-item">
                  <div className="service-icon-box">
                    <span className="material-symbols-outlined">psychology</span>
                  </div>
                  <div className="service-content-box">
                    <h4>Generative AI &amp; LLMs</h4>
                    <p>Building autonomous multi-agent loops, dynamic model routing (Gemini, Claude, GPT), and prompt safety guardrails.</p>
                  </div>
                </li>

                <li className="service-item">
                  <div className="service-icon-box">
                    <span className="material-symbols-outlined">hub</span>
                  </div>
                  <div className="service-content-box">
                    <h4>RAG &amp; Vector Databases</h4>
                    <p>Semantic document search, FAISS indexing, hallucination mitigation, and multi-language translation pipelines.</p>
                  </div>
                </li>

                <li className="service-item">
                  <div className="service-icon-box">
                    <span className="material-symbols-outlined">code</span>
                  </div>
                  <div className="service-content-box">
                    <h4>FastAPI &amp; Backend Dev</h4>
                    <p>High-throughput RESTful microservices, asynchronous endpoints, PostgreSQL/Supabase database integrations.</p>
                  </div>
                </li>

                <li className="service-item">
                  <div className="service-icon-box">
                    <span className="material-symbols-outlined">devices</span>
                  </div>
                  <div className="service-content-box">
                    <h4>Full-Stack Web Apps</h4>
                    <p>Modern React.js and Next.js reactive user interfaces, state management, Docker containers, and cloud deployments.</p>
                  </div>
                </li>
              </ul>
            </article>
          )}

          {/* ================= TAB 2: RESUME ================= */}
          {activeTab === 'resume' && (
            <article className="tab-content">
              <header className="article-header">
                <h2 className="article-title">Resume</h2>
              </header>

              {/* Work Experience */}
              <section className="timeline-section">
                <div className="title-wrapper">
                  <div className="icon-box">
                    <span className="material-symbols-outlined">work</span>
                  </div>
                  <h3 className="section-subtitle" style={{ margin: 0 }}>Experience</h3>
                </div>

                <ol className="timeline-list">
                  {resumeData.experience.map((exp) => (
                    <li key={exp.id} className="timeline-item-card">
                      <h4 className="timeline-item-title">{exp.role}</h4>
                      <p className="timeline-company">{exp.company} — {exp.location}</p>
                      <span className="timeline-period">{exp.period}</span>

                      <ul className="timeline-bullets">
                        {exp.bullets.map((b, bIdx) => (
                          <li key={bIdx}>{b}</li>
                        ))}
                      </ul>

                      <div className="tag-cloud">
                        {exp.skills.map((s, sIdx) => (
                          <span key={sIdx} className="pill-tag">{s}</span>
                        ))}
                      </div>

                      <div style={{ marginTop: '10px' }}>
                        <button
                          className="ask-ai-proj-btn"
                          onClick={() => openChatWithQuery(`Tell me in detail about Kaushal's contributions at ${exp.company}`)}
                        >
                          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>smart_toy</span>
                          <span>Ask AI about this role</span>
                        </button>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>

              {/* Education */}
              <section className="timeline-section">
                <div className="title-wrapper">
                  <div className="icon-box">
                    <span className="material-symbols-outlined">school</span>
                  </div>
                  <h3 className="section-subtitle" style={{ margin: 0 }}>Education</h3>
                </div>

                <ol className="timeline-list">
                  {resumeData.education.map((edu, idx) => (
                    <li key={idx} className="timeline-item-card">
                      <h4 className="timeline-item-title">{edu.degree}</h4>
                      <p className="timeline-company">{edu.institution}, {edu.location}</p>
                      <span className="timeline-period">{edu.period} • <strong style={{ color: 'var(--orange-primary)' }}>{edu.score}</strong></span>
                    </li>
                  ))}
                </ol>
              </section>

              {/* Certifications & Skills */}
              <section className="skills-group">
                <h3 className="section-subtitle">Technical Competencies</h3>
                <div className="skills-list">
                  <div>
                    <div className="skill-category-title">AI &amp; Machine Learning</div>
                    <div className="tag-cloud">
                      {resumeData.technicalSkills.ai_ml.map((skill, i) => (
                        <span key={i} className="pill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="skill-category-title">Frameworks &amp; Languages</div>
                    <div className="tag-cloud">
                      {resumeData.technicalSkills.languages.map((l, i) => (
                        <span key={`l-${i}`} className="pill-tag">{l}</span>
                      ))}
                      {resumeData.technicalSkills.frameworks.map((f, i) => (
                        <span key={`f-${i}`} className="pill-tag">{f}</span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="skill-category-title">Tools &amp; Cloud</div>
                    <div className="tag-cloud">
                      {resumeData.technicalSkills.tools.map((t, i) => (
                        <span key={`t-${i}`} className="pill-tag">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </article>
          )}

          {/* ================= TAB 3: PORTFOLIO ================= */}
          {activeTab === 'portfolio' && (
            <article className="tab-content">
              <header className="article-header">
                <h2 className="article-title">Portfolio Projects</h2>
              </header>

              <div className="projects-grid-vcard">
                {resumeData.projects.map((proj) => (
                  <div key={proj.id} className="project-card-vcard">
                    <div className="project-banner-vcard">
                      <div className="project-category-badge">{proj.category}</div>
                      <div className="icon-wrap">
                        <span className="material-symbols-outlined">terminal</span>
                      </div>
                    </div>

                    <div className="project-content-vcard">
                      <h3>{proj.title}</h3>
                      <p>{proj.description}</p>

                      <div className="tag-cloud">
                        {proj.techStack.map((tech, tIdx) => (
                          <span key={tIdx} className="pill-tag">{tech}</span>
                        ))}
                      </div>
                    </div>

                    <div className="project-card-footer">
                      <button
                        className="ask-ai-proj-btn"
                        onClick={() => openChatWithQuery(`Explain the technical architecture and features of "${proj.title}"`)}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>smart_toy</span>
                        <span>Ask AI about project</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          )}

          {/* ================= TAB 4: CONTACT ================= */}
          {activeTab === 'contact' && (
            <article className="tab-content">
              <header className="article-header">
                <h2 className="article-title">Contact</h2>
              </header>

              <p style={{ color: 'var(--light-gray-70)', marginBottom: '25px', fontSize: '14.5px' }}>
                I am actively seeking software engineering, Generative AI, and full-stack development roles. Let's build something impactful together.
              </p>

              {/* Map Section (codewithsadee vCard Architecture) */}
              <section className="mapbox" data-mapbox>
                <figure>
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.1160999905!2d72.74109995709657!3d19.082197839447936!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    width="100%"
                    height="300"
                    loading="lazy"
                    title="Kaushal Shukla Location - Mumbai, Maharashtra, India"
                    style={{ border: 0 }}
                  ></iframe>
                </figure>
              </section>

              <h3 className="section-subtitle" style={{ marginTop: '30px' }}>Contact Form</h3>

              <form className="contact-form" onSubmit={handleContactSubmit}>
                <div className="form-inputs">
                  <input
                    type="text"
                    name="name"
                    className="form-input"
                    placeholder="Full name"
                    required
                    disabled={isSubmitting}
                  />
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="Email address"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <textarea
                  name="message"
                  className="form-input"
                  rows="5"
                  placeholder="Your message"
                  required
                  disabled={isSubmitting}
                  style={{ marginBottom: '20px' }}
                ></textarea>

                <button type="submit" className="form-btn" disabled={isSubmitting} style={{ opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>
                    {isSubmitting ? 'sync' : 'send'}
                  </span>
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                </button>

                {contactFeedback && (
                  <div className="form-success-banner" style={{ marginTop: '16px' }}>
                    <span className="material-symbols-outlined">check_circle</span>
                    <span>{typeof contactFeedback === 'object' ? contactFeedback.text : contactFeedback}</span>
                  </div>
                )}
              </form>
            </article>
          )}
        </div>
      </main>

      {/* Floating Theme Customizer Button (Bottom-Left) */}
      <button
        className="theme-settings-trigger"
        onClick={() => setIsSettingsOpen(true)}
        aria-label="Open Theme Settings"
        title="Customize Theme & Accent Color"
      >
        <span className="material-symbols-outlined">palette</span>
      </button>

      {/* Floating Chat Button (Bottom-Right) */}
      <button className="chat-launcher-pill" onClick={() => openChatWithQuery()}>
        <span className="material-symbols-outlined">smart_toy</span>
        <span>Chat with Kaushal's AI</span>
      </button>

      {/* Theme & Color Customizer Modal */}
      {isSettingsOpen && (
        <div className="customizer-overlay" onClick={() => setIsSettingsOpen(false)}>
          <div className="customizer-modal" onClick={e => e.stopPropagation()}>
            <div className="customizer-header">
              <h3>
                <span className="material-symbols-outlined" style={{ color: 'var(--orange-primary)' }}>palette</span>
                <span>Theme &amp; Accent Settings</span>
              </h3>
              <button className="customizer-close-btn" onClick={() => setIsSettingsOpen(false)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Mode selection: Dark vs Light */}
            <div className="customizer-section">
              <div className="customizer-title">
                <span>Display Mode</span>
                <span style={{ fontSize: '12px', color: 'var(--orange-primary)', textTransform: 'capitalize' }}>{themeMode} Mode</span>
              </div>
              <div className="mode-toggle-group">
                <button
                  className={`mode-toggle-btn ${themeMode === 'dark' ? 'active' : ''}`}
                  onClick={() => setThemeMode('dark')}
                >
                  <span className="material-symbols-outlined">dark_mode</span>
                  <span>Dark Onyx</span>
                </button>
                <button
                  className={`mode-toggle-btn ${themeMode === 'light' ? 'active' : ''}`}
                  onClick={() => setThemeMode('light')}
                >
                  <span className="material-symbols-outlined">light_mode</span>
                  <span>Light Clean</span>
                </button>
              </div>
            </div>

            {/* Accent Color Preset Swatches */}
            <div className="customizer-section">
              <div className="customizer-title">
                <span>Accent Color</span>
                <span style={{ fontSize: '12px', color: 'var(--orange-primary)' }}>{currentColor.name}</span>
              </div>
              <div className="color-swatches-grid">
                {COLOR_PRESETS.map((p, idx) => (
                  <button
                    key={idx}
                    className={`color-swatch-circle ${currentColor.hex.toLowerCase() === p.hex.toLowerCase() ? 'active' : ''}`}
                    style={{ backgroundColor: p.hex }}
                    onClick={() => handlePresetSelect(p)}
                    title={p.name}
                  >
                    {currentColor.hex.toLowerCase() === p.hex.toLowerCase() && (
                      <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>check</span>
                    )}
                  </button>
                ))}
              </div>

              {/* Custom Color Picker */}
              <div className="custom-picker-row">
                <label htmlFor="native-color" className="custom-picker-label">
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>colorize</span>
                  <span>Pick Any Custom Color</span>
                </label>
                <input
                  id="native-color"
                  type="color"
                  className="native-color-input"
                  value={customHex}
                  onChange={(e) => handleNativeColorChange(e.target.value)}
                  title="Pick custom hex color"
                />
              </div>
            </div>

            {/* Reset Defaults */}
            <button className="reset-theme-btn" onClick={resetThemeDefaults}>
              <span className="material-symbols-outlined" style={{ fontSize: '17px' }}>restart_alt</span>
              <span>Reset to Default Electric Orange</span>
            </button>
          </div>
        </div>
      )}

      {/* Chatbot Modal */}
      <ChatbotModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        initialQuery={chatInitialQuery}
      />
    </div>
  );
}
