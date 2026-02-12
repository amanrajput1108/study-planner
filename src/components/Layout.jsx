import Logo from './Logo';

export default function Layout({ children }) {
  return (
    <div className="layout">
      {/* Background elements for depth */}
      <div className="bg-glow bg-glow-1"></div>
      <div className="bg-glow bg-glow-2"></div>

      <header className="main-header glass-panel">
        <div className="container header-content">
          <nav className="nav">
            <div className="logo-container">
              <Logo size={36} />
              <h1 className="logo-text">Study<span className="logo-accent">Plan</span></h1>
            </div>
          </nav>
          <div className="header-actions">
            {/* Header actions can go here */}
          </div>
        </div>
      </header>

      <main className="main-content container animate-fade-in">
        {children}
      </main>

      <footer className="main-footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Study Planner • Built by <a href="https://github.com/amanrajput1108" target="_blank" rel="noopener noreferrer">amanrajput1108</a></p>
        </div>
      </footer>

      <style jsx>{`
        .layout {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          position: relative;
          z-index: 1;
        }
        
        /* Background Glow Effects */
        .bg-glow {
          position: fixed;
          width: 50vw;
          height: 50vw;
          border-radius: 50%;
          filter: blur(100px);
          z-index: -1;
          opacity: 0.15;
          pointer-events: none;
        }
        .bg-glow-1 {
          top: -10%;
          left: -10%;
          background: var(--primary);
        }
        .bg-glow-2 {
          bottom: -10%;
          right: -10%;
          background: var(--success);
        }
        
        .main-header {
          position: sticky;
          top: 1rem;
          margin: 0 1rem 2rem 1rem;
          padding: 1rem 0;
          z-index: 100;
          border-radius: 100px;
          border: 1px solid rgba(255,255,255,0.08);
        }
        
        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .logo-container {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        
        .logo-text {
          font-size: 1.75rem;
          font-weight: 800;
          letter-spacing: -0.03em;
          margin-bottom: 0;
        }
        
        .logo-accent {
          color: var(--primary);
          text-shadow: 0 0 20px rgba(139, 92, 246, 0.5);
        }
        
        .user-profile-link {
          display: block;
          transition: transform 0.2s;
        }
        .user-profile-link:hover {
          transform: scale(1.1);
        }
        .user-avatar-img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.2);
          box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        }
        
        .main-content {
          flex: 1;
          margin-top: 1rem;
        }
        
        .main-footer {
          padding: 3rem 0;
          margin-top: 4rem;
          color: var(--text-secondary);
          text-align: center;
          border-top: 1px solid rgba(255, 255, 255, 0.03);
          background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.2));
        }
        
        @media (max-width: 600px) {
           .main-header {
             margin: 0;
             border-radius: 0;
             top: 0;
             background: var(--bg-color); /* Solid bg on mobile to cover content */
             border-bottom: 1px solid rgba(255,255,255,0.1);
           }
           .container {
             padding: 0 1rem;
           }
           .main-footer {
             margin-top: 2rem;
             padding: 2rem 0;
           }
        }
      `}</style>
    </div>
  );
}
