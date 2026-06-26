import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children }) => {
  return (
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
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      color: 'var(--text-secondary)',
      fontSize: '0.95rem',
      fontWeight: 500,
      letterSpacing: '0.01em',
      transition: 'var(--transition-smooth)'
    }}>
      {children}
    </div>
  );
};
