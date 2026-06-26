import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation/Navigation';
import { CommandPalette } from './components/Navigation/CommandPalette';

function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  // Ctrl+K to open Command Palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="app-layout">
      {/* Dynamic Background Glow Elements */}
      <div className="bg-glow-wrapper">
        <div className="bg-glow-1" />
        <div className="bg-glow-2" />
      </div>

      <Navigation
        activeView={activeView}
        onViewChange={setActiveView}
        onSearchTrigger={() => setIsPaletteOpen(true)}
      />

      <main className="app-main">
        <header style={{ marginBottom: 32, position: 'relative', zIndex: 2 }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            textTransform: 'capitalize',
            background: 'var(--accent-gradient)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block'
          }}>
            {activeView.replace('-', ' ')}
          </h1>
          <p style={{
            color: 'var(--text-secondary)',
            marginTop: 8,
            fontSize: '0.95rem',
            fontWeight: 500
          }}>
            CBIMS Gen-2 ERP Suite
          </p>
        </header>

        {/* Dynamic content area base - Premium Glass Card */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          padding: 40,
          borderRadius: 24,
          backgroundColor: 'var(--bg-surface)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid var(--border-light)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.15)',
          minHeight: '60vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'var(--text-secondary)',
          fontSize: '0.95rem',
          fontWeight: 500,
          letterSpacing: '0.01em',
          transition: 'var(--transition-smooth)'
        }}>
          Current Module: {activeView.toUpperCase()} - Scaffolded view ready for components.
        </div>
      </main>

      <CommandPalette
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        onNavigate={setActiveView}
      />
    </div>
  );
}

export default App;
