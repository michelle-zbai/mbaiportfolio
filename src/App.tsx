import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Linkedin, Mail } from 'lucide-react';
import './App.css';

type Page = 'work' | 'play' | 'info';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  category: string;
  tags: string[];
  description: string;
  image: string;
  link?: string;
}

const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Halo',
    subtitle: 'UI/UX Design, Product Design, Personal Project',
    year: '2024',
    category: 'Product Design',
    tags: ['UX Design', 'Mobile App', 'Health & Wellness'],
    description: 'A system that helps new parents monitor, track, and help reduce their anxiety, including an application and a smart bassinet for co-sleeping. This project was first created as an undergraduate capstone project, then reworked on and improved as a personal project.',
    image: '/images/Frame 2608260.png',
  },
  {
    id: '2',
    title: 'On The Spot',
    subtitle: 'Personal Project, Social Innovation Design, UIUX Design',
    year: '2024',
    category: 'User Experience Design',
    tags: ['Mobile App', 'UX Research', 'Prototyping'],
    description: 'Trip planning app addressing the challenge of managing limited time between scheduled activities with curated plans and flexible itineraries.',
    image: '/images/Frame 2608267.png',
  },
  {
    id: '3',
    title: 'Kompanion',
    subtitle: 'Product Design, Personal Project',
    year: '2024',
    category: 'Experimental',
    tags: ['Creative Exploration', 'Concept Design'],
    description: 'An interactive, tangible, and playful way to nurture, grow, and strengthen your long-distance friendship.',
    image: '/images/Frame 260826.png',
  },
];

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('work');
  const [currentView, setCurrentView] = useState<'home' | Page>('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleLogoClick = () => {
    setCurrentView('home');
    setMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const scrollToSection = (page: Page) => {
    setCurrentPage(page);
    setMenuOpen(false);
    setCurrentView(page);
    setSelectedProject(null);
    window.scrollTo(0, 0);
  };

  const openProjectDetail = (project: Project) => {
    setSelectedProject(project);
    window.scrollTo(0, 0);
  };

  const closeProjectDetail = () => {
    setSelectedProject(null);
  };

  return (
    <div className="app">
      {/* Custom Cursor */}
      <motion.div
        className={`cursor ${cursorVariant}`}
        animate={{
          x: cursorPosition.x - 10,
          y: cursorPosition.y - 10,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 500 }}
      />

      {/* Navigation */}
      <nav className="nav">
        <div className="nav-content container">
          <motion.button
            className="logo"
            onClick={handleLogoClick}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            onMouseEnter={() => setCursorVariant('link')}
            onMouseLeave={() => setCursorVariant('default')}
          >
            <span className="logo-text">Portfolio</span>
          </motion.button>

          <div className="nav-links desktop">
            {(['work', 'play', 'info'] as Page[]).map((page, i) => (
              <motion.button
                key={page}
                className={`nav-link ${currentView === page ? 'active' : ''}`}
                onClick={() => scrollToSection(page)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                onMouseEnter={() => setCursorVariant('link')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                {page.charAt(0).toUpperCase() + page.slice(1)}
              </motion.button>
            ))}
          </div>

          <button
            className="menu-toggle mobile"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
          >
            {(['work', 'play', 'info'] as Page[]).map((page) => (
              <button
                key={page}
                className={`mobile-menu-link ${currentView === page ? 'active' : ''}`}
                onClick={() => scrollToSection(page)}
              >
                {page.charAt(0).toUpperCase() + page.slice(1)}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="project-detail-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeProjectDetail}
          >
            <motion.div
              className="project-detail-content"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="close-button"
                onClick={closeProjectDetail}
                onMouseEnter={() => setCursorVariant('link')}
                onMouseLeave={() => setCursorVariant('default')}
              >
                <X size={24} />
              </button>

              <div className="project-detail-hero">
                <div className="project-detail-image">
                  <img src={selectedProject.image} alt={selectedProject.title} />
                </div>
                <div className="project-detail-header">
                  <p className="project-detail-category">{selectedProject.category}</p>
                  <h1 className="project-detail-title">{selectedProject.title}</h1>
                </div>
              </div>

              <div className="project-detail-info">
                <div className="project-info-item">
                  <h4>TYPE</h4>
                  <p>{selectedProject.subtitle}</p>
                </div>
                <div className="project-info-item">
                  <h4>TIMELINE</h4>
                  <p>4 months</p>
                </div>
                <div className="project-info-item">
                  <h4>TOOLS</h4>
                  <div className="project-tools">
                    {selectedProject.id !== '3' && (
                      <>
                        <span className="tool-tag">Figma</span>
                        <span className="tool-tag">User Research</span>
                        <span className="tool-tag">Prototyping</span>
                      </>
                    )}
                    {selectedProject.id === '1' && (
                      <>
                        <span className="tool-tag">SolidWorks</span>
                        <span className="tool-tag">Keyshot</span>
                      </>
                    )}
                    {selectedProject.id === '3' && (
                      <>
                        <span className="tool-tag">Physical Computing</span>
                        <span className="tool-tag">Arduino</span>
                        <span className="tool-tag">Prototyping</span>
                        <span className="tool-tag">Product Design</span>
                        <span className="tool-tag">Researching</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="project-detail-body">
                <h2>
                  {selectedProject.id === '1' && 'Smart bassinet for co-sleeping to reduce parental stress'}
                  {selectedProject.id === '2' && 'Managing limited time between scheduled activities'}
                  {selectedProject.id === '3' && 'Experimental design exploration'}
                </h2>
                <p className="project-intro">{selectedProject.description}</p>
                
                {selectedProject.id !== '3' && (
                  <div className="project-section">
                    <h3>Problem</h3>
                    <p>
                      {selectedProject.id === '1' && 'New parents experience high anxiety and stress when caring for newborns, especially regarding sleep safety and monitoring.'}
                      {selectedProject.id === '2' && 'Travelers struggle to manage limited time between scheduled activities, leading to missed opportunities for nearby experiences.'}
                    </p>
                  </div>
                )}

                {selectedProject.id === '2' && (
                  <div className="project-images">
                    <img src="/images/Frame 2608250.png" alt="On The Spot - Frame 1" className="full-bleed-image" />
                    <img src="/images/Frame 2608251.png" alt="On The Spot - Frame 2" className="full-bleed-image" />
                    <img src="/images/Frame 2608252.png" alt="On The Spot - Frame 3" className="full-bleed-image" />
                  </div>
                )}

                {selectedProject.id === '1' && (
                  <div className="project-images">
                    <img src="/images/Frame 2608237.png" alt="Halo - Frame 1" className="full-bleed-image" />
                    <img src="/images/Frame 2608238.png" alt="Halo - Frame 2" className="full-bleed-image" />
                    <img src="/images/Frame 2608239.png" alt="Halo - Frame 3" className="full-bleed-image" />
                    <img src="/images/Frame 2608240.png" alt="Halo - Frame 4" className="full-bleed-image" />
                  </div>
                )}

                {selectedProject.id === '3' && (
                  <div className="project-images">
                    <img src="/images/Frame 2608242.png" alt="Kompanion - Frame 1" className="full-bleed-image" />
                    <img src="/images/Frame 2608243.png" alt="Kompanion - Frame 2" className="full-bleed-image" />
                    <img src="/images/Frame 2608244.png" alt="Kompanion - Frame 3" className="full-bleed-image" />
                  </div>
                )}

                <div className="project-section">
                  <h3>Outcome</h3>
                  <p>
                    {selectedProject.id === '1' && 'Created a comprehensive system combining a smart bassinet with a mobile app to monitor baby health metrics and reduce parental anxiety.'}
                    {selectedProject.id === '2' && 'Developed a mobile app that helps users maximize their free time with personalized activity recommendations based on location and available time.'}
                    {selectedProject.id === '3' && 'An interactive device that aim to create a meaningful, interactive way for friends to nurture their bond, even when separated in physical long distance, ensuring that the relationships remain alive, tangible, and enduring.'}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Work Page */}
      {currentView === 'work' && (
        <section className="section page-view">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="page-content"
            >
              <h1 className="page-title">Work</h1>
              
              <div className="work-grid">
                {PROJECTS.slice(0, 2).map((project, index) => (
                  <motion.div
                    key={project.id}
                    className="work-card"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    onClick={() => openProjectDetail(project)}
                    onMouseEnter={() => setCursorVariant('project')}
                    onMouseLeave={() => setCursorVariant('default')}
                  >
                    <div className="work-image">
                      <img src={project.image} alt={project.title} />
                      <div className="work-overlay">
                        <span className="work-category">{project.category}</span>
                        <h3 className="work-title">{project.title}</h3>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Footer for Work Page */}
      {currentView === 'work' && (
        <footer className="footer">
          <div className="container">
            <div className="footer-content">
              <div className="footer-left">
                <p>Michelle Bai</p>
              </div>
              <div className="footer-center">
                <a
                  href="mailto:zymichellebai@gmail.com"
                  className="footer-link"
                  onMouseEnter={() => setCursorVariant('link')}
                  onMouseLeave={() => setCursorVariant('default')}
                >
                  Email
                </a>
                <a
                  href="https://www.linkedin.com/in/zi-yue-bai-281004184/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                  onMouseEnter={() => setCursorVariant('link')}
                  onMouseLeave={() => setCursorVariant('default')}
                >
                  LinkedIn
                </a>
              </div>
              <div className="footer-right">
                <p>&copy; 2025 All Rights Reserved</p>
              </div>
            </div>
          </div>
        </footer>
      )}

      {/* Home/Portfolio Page */}
      {currentView === 'home' && (
        <>
          <section className="section hero-section">
            <div className="container">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="hero-content"
              >
                <h1 className="hero-title">
                  <span className="hero-name">Michelle Bai</span>
                  <span className="hero-subtitle">is a product designer specializing in UX Design, Prototyping, and Digital Experience</span>
                </h1>
                
                <div className="hero-tags">
                  <span className="hero-tag">Product Design</span>
                  <span className="hero-tag">Industrial Design</span>
                  <span className="hero-tag">UX Research</span>
                </div>
              </motion.div>
            </div>
          </section>

          <section className="section featured-work-section">
            <div className="container">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="section-title">Featured Work</h2>
              </motion.div>

              <div className="featured-grid">
                {PROJECTS.map((project, index) => (
                  <motion.div
                    key={project.id}
                    className="featured-card"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    onClick={() => openProjectDetail(project)}
                    onMouseEnter={() => setCursorVariant('project')}
                    onMouseLeave={() => setCursorVariant('default')}
                  >
                    <div className="featured-image">
                      <img src={project.image} alt={project.title} />
                      <div className="featured-overlay">
                        <span className="featured-category">{project.category}</span>
                        <h3 className="featured-title">{project.title}</h3>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <footer className="footer">
            <div className="container">
              <div className="footer-content">
                <div className="footer-left">
                  <p>Michelle Bai</p>
                </div>
                <div className="footer-center">
                  <a
                    href="mailto:zymichellebai@gmail.com"
                    className="footer-link"
                    onMouseEnter={() => setCursorVariant('link')}
                    onMouseLeave={() => setCursorVariant('default')}
                  >
                    Email
                  </a>
                  <a
                    href="https://www.linkedin.com/in/zi-yue-bai-281004184/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-link"
                    onMouseEnter={() => setCursorVariant('link')}
                    onMouseLeave={() => setCursorVariant('default')}
                  >
                    LinkedIn
                  </a>
                </div>
                <div className="footer-right">
                  <p>&copy; 2025 All Rights Reserved</p>
                </div>
              </div>
            </div>
          </footer>
        </>
      )}

      {/* Play Page */}
      {currentView === 'play' && (
        <section className="section page-view">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="page-content"
            >
              <h1 className="page-title">Play & Experiments</h1>
              <p className="play-subtitle">Personal explorations, experiments, and creative projects</p>
              
              <div className="play-grid">
                <motion.div
                  className="play-card"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  onClick={() => openProjectDetail(PROJECTS[2])}
                  onMouseEnter={() => setCursorVariant('project')}
                  onMouseLeave={() => setCursorVariant('default')}
                >
                  <div className="play-image">
                    <img src="/images/Frame 260826.png" alt="Kompanion" />
                  </div>
                  <div className="play-info">
                    <span className="play-category">Experimental</span>
                    <h3 className="play-title">Kompanion</h3>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Footer for Play Page */}
      {currentView === 'play' && (
        <footer className="footer">
          <div className="container">
            <div className="footer-content">
              <div className="footer-left">
                <p>Michelle Bai</p>
              </div>
              <div className="footer-center">
                <a
                  href="mailto:zymichellebai@gmail.com"
                  className="footer-link"
                  onMouseEnter={() => setCursorVariant('link')}
                  onMouseLeave={() => setCursorVariant('default')}
                >
                  Email
                </a>
                <a
                  href="https://www.linkedin.com/in/zi-yue-bai-281004184/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                  onMouseEnter={() => setCursorVariant('link')}
                  onMouseLeave={() => setCursorVariant('default')}
                >
                  LinkedIn
                </a>
              </div>
              <div className="footer-right">
                <p>&copy; 2025 All Rights Reserved</p>
              </div>
            </div>
          </div>
        </footer>
      )}

      {/* Info Page */}
      {currentView === 'info' && (
        <section className="section page-view">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="page-content info-page"
            >
              <h1 className="page-title">Creating thoughtful experiences.</h1>
              <div className="info-content">
                <div className="info-intro">
                  <p>I'm Michelle Bai, a product designer based in Durham, NC. I specialize in creating user-centered digital products through research, prototyping, and iterative design.</p>
                  <p>As a user-centered product and industrial designer, I bridge the gap between digital and physical experiences to create meaningful, human-driven solutions. With a background in branding strategy, research, and design innovation, I approach design as both a creative and analytical process. I love working in highly collaborative environments, ideating and finding connections between 2D and 3D to transform concepts into tangible, meaningful experiences through sketches, models, and visual storytelling. People come first in my work, crafting products that are not only functional and visually compelling but also spark curiosity, and joy—bringing thoughtful innovation to everyday experiences.</p>
                  <div className="resume-download">
                    <a href="/ZiyueBaiResume.pdf" download className="download-btn">
                      <span className="download-icon">↓</span> Download Resume
                    </a>
                  </div>
                </div>

                <div className="info-section">
                  <h3>EXPERIENCE</h3>
                  <div className="experience-item">
                    <div className="experience-header">
                      <div>
                        <h4>Corporate Marketing Department Trainee</h4>
                        <p className="company">Jinko Power, Shanghai, China</p>
                      </div>
                      <p className="dates">May 2024 – Jun 2025</p>
                    </div>
                  </div>
                  <div className="experience-item">
                    <div className="experience-header">
                      <div>
                        <h4>Public Education Department Intern</h4>
                        <p className="company">Guanfu Museum Shanghai, Shanghai, China</p>
                      </div>
                      <p className="dates">May 2024 – Jun 2025</p>
                    </div>
                  </div>
                  <div className="experience-item">
                    <div className="experience-header">
                      <div>
                        <h4>Designer - Industrial/Product Design Department</h4>
                        <p className="company">des:glory Design, Shanghai, China</p>
                      </div>
                      <p className="dates">Jan 2024 – May 2024</p>
                    </div>
                  </div>
                  <div className="experience-item">
                    <div className="experience-header">
                      <div>
                        <h4>Assistant to General Manager</h4>
                        <p className="company">The Muyra Boutique Hotel Shanghai, Shanghai, China</p>
                      </div>
                      <p className="dates">Oct 2023 – Dec 2023</p>
                    </div>
                  </div>
                </div>

                <div className="info-section">
                  <h3>SKILLS</h3>
                  <div className="skills-category">
                    <h4>Design</h4>
                    <div className="skill-tags">
                      <span className="skill-tag">UX/UI</span>
                      <span className="skill-tag">Prototyping</span>
                      <span className="skill-tag">Design Research</span>
                      <span className="skill-tag">Design for Production</span>
                    </div>
                  </div>
                  <div className="skills-category">
                    <h4>Tools</h4>
                    <div className="skill-tags">
                      <span className="skill-tag">Adobe Suite</span>
                      <span className="skill-tag">Figma</span>
                      <span className="skill-tag">SolidWorks</span>
                      <span className="skill-tag">Blender</span>
                      <span className="skill-tag">Keyshot</span>
                      <span className="skill-tag">zBrush</span>
                    </div>
                  </div>
                  <div className="skills-category">
                    <h4>Languages</h4>
                    <div className="skill-tags">
                      <span className="skill-tag">English (Fluent)</span>
                      <span className="skill-tag">Mandarin (Fluent)</span>
                      <span className="skill-tag">Shanghai Dialect (Fluent)</span>
                    </div>
                  </div>
                </div>

                <div className="info-section">
                  <h3>EDUCATION</h3>
                  <div className="education-item">
                    <div className="education-header">
                      <div>
                        <h4>Master of Engineering in Design & Technology Innovation</h4>
                        <p className="school">Duke University, Pratt School of Engineering</p>
                        <p className="location">Durham, NC, USA</p>
                        <p className="coursework">Relevant Coursework: Design Ethics & Innovation, UX Front End Engineering</p>
                      </div>
                      <p className="dates">Aug 2025 – Present</p>
                    </div>
                  </div>
                  <div className="education-item">
                    <div className="education-header">
                      <div>
                        <h4>Bachelor of Science in Product Design with honors, minored in Material Science</h4>
                        <p className="school">ArtCenter College of Design</p>
                        <p className="location">Pasadena, CA, USA</p>
                      </div>
                      <p className="dates">Jan 2020 – Aug 2023</p>
                    </div>
                  </div>
                </div>

                <div className="info-section">
                  <h3>AWARDS & RECOGNITION</h3>
                  <div className="award-item">
                    <div className="award-header">
                      <div>
                        <h4>Astek Inc Sponsorship at ICFF</h4>
                        <p className="award-location">New York, USA</p>
                        <p className="award-description">Selected by Astek Inc to design textiles and patterns for interior wall coverings; sponsored and exhibited at the International Contemporary Furniture Fair, recognized as Global Luminaries & Unexpected Talents by the Sixtysix Magazine</p>
                      </div>
                      <p className="dates">May 2023</p>
                    </div>
                  </div>
                  <div className="award-item">
                    <div className="award-header">
                      <div>
                        <h4>ArtCenter Student Gallery Exhibition</h4>
                        <p className="award-location">ArtCenter College of Design</p>
                        <p className="award-description">Textile pattern designs sponsored by Astek Inc were exhibited</p>
                      </div>
                      <p className="dates">2023</p>
                    </div>
                  </div>
                </div>

                <div className="info-section contact-section">
                  <h3>LET'S CONNECT</h3>
                  <div className="contact-links">
                    <a href="mailto:zymichellebai@gmail.com" className="contact-link-item">
                      <Mail size={20} />
                      <span>zymichellebai@gmail.com</span>
                    </a>
                    <a href="https://www.linkedin.com/in/zi-yue-bai-281004184/" target="_blank" rel="noopener noreferrer" className="contact-link-item">
                      <Linkedin size={20} />
                      <span>LinkedIn</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Footer for Info Page */}
      {currentView === 'info' && (
        <footer className="footer">
          <div className="container">
            <div className="footer-content">
              <div className="footer-left">
                <p>Michelle Bai</p>
              </div>
              <div className="footer-center">
                <a
                  href="mailto:zymichellebai@gmail.com"
                  className="footer-link"
                  onMouseEnter={() => setCursorVariant('link')}
                  onMouseLeave={() => setCursorVariant('default')}
                >
                  Email
                </a>
                <a
                  href="https://www.linkedin.com/in/zi-yue-bai-281004184/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                  onMouseEnter={() => setCursorVariant('link')}
                  onMouseLeave={() => setCursorVariant('default')}
                >
                  LinkedIn
                </a>
              </div>
              <div className="footer-right">
                <p>&copy; 2025 All Rights Reserved</p>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

export default App;
