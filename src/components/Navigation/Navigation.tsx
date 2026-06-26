import React, { useState, useEffect } from 'react';
import styles from './Navigation.module.css';

// SVG Icons for MD3 aesthetic
const Icons = {
  Dashboard: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles['nav-icon']}><rect x="3" y="3" width="7" height="9" /><rect x="14" y="3" width="7" height="5" /><rect x="14" y="12" width="7" height="9" /><rect x="3" y="16" width="7" height="5" /></svg>
  ),
  Inventory: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles['nav-icon']}><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>
  ),
  Partners: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles['nav-icon']}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
  ),
  SupplyChain: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles['nav-icon']}><path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v1" /><path d="M18 8h4a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-4" /><circle cx="8" cy="12" r="2" /></svg>
  ),
  Finance: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles['nav-icon']}><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
  ),
  HR: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles['nav-icon']}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><line x1="19" y1="8" x2="19" y2="14" /><line x1="22" y1="11" x2="16" y2="11" /></svg>
  ),
  Settings: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles['nav-icon']}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
  ),
  Menu: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles['nav-icon']}><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
  ),
  More: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles['nav-icon']}><circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" /></svg>
  ),
  Search: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles['nav-icon']}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
  )
};

export interface NavigationItem {
  id: string;
  label: string;
  category: 'core' | 'operations' | 'management';
  icon: React.ComponentType;
}

export const navigationItems: NavigationItem[] = [
  { id: 'dashboard', label: 'Dashboard', category: 'core', icon: Icons.Dashboard },
  { id: 'inventory', label: 'Inventory', category: 'operations', icon: Icons.Inventory },
  { id: 'supply', label: 'Supply Chain', category: 'operations', icon: Icons.SupplyChain },
  { id: 'partners', label: 'Partners', category: 'operations', icon: Icons.Partners },
  { id: 'finance', label: 'Finance & Ledger', category: 'management', icon: Icons.Finance },
  { id: 'hr', label: 'Human Resources', category: 'management', icon: Icons.HR },
  { id: 'settings', label: 'Settings', category: 'core', icon: Icons.Settings }
];

interface NavigationProps {
  activeView: string;
  onViewChange: (view: string) => void;
  onSearchTrigger: () => void;
  logoText?: string;
}

export const Navigation: React.FC<NavigationProps> = ({ activeView, onViewChange, onSearchTrigger, logoText }) => {
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isExpanded, setIsExpanded] = useState(true);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [touchStart, setTouchStart] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 600) {
        setViewport('mobile');
      } else if (width < 1024) {
        setViewport('tablet');
      } else {
        setViewport('desktop');
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentY = e.targetTouches[0].clientY;
    const deltaY = currentY - touchStart;
    if (deltaY > 0) {
      setDragY(deltaY);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (dragY > 80) {
      setIsBottomSheetOpen(false);
    }
    setDragY(0);
  };

  const handleMobileNavClick = (itemId: string) => {
    if (itemId === 'more') {
      setIsBottomSheetOpen(true);
    } else {
      onViewChange(itemId);
      setIsBottomSheetOpen(false);
    }
  };

  const activeItem = navigationItems.find(item => item.id === activeView);

  const groupedItems = {
    core: navigationItems.filter(i => i.category === 'core'),
    operations: navigationItems.filter(i => i.category === 'operations'),
    management: navigationItems.filter(i => i.category === 'management')
  };

  // Render Desktop Layout (Navigation Drawer)
  if (viewport === 'desktop') {
    return (
      <aside className={`${styles['nav-drawer']} ${isExpanded ? styles.expanded : styles.collapsed}`}>
        <div className={styles['drawer-header']}>
          <button className={styles['menu-toggle-btn']} onClick={() => setIsExpanded(!isExpanded)} aria-label="Toggle Navigation">
            <Icons.Menu />
          </button>
          {isExpanded && <span className={styles['logo-text']}>{logoText || 'CBIMS ERP'}</span>}
        </div>

        <button className={styles['drawer-search-bar']} onClick={onSearchTrigger}>
          <Icons.Search />
          {isExpanded && (
            <>
              <span className={styles['search-text']}>Search...</span>
              <kbd className={styles['search-kbd']}>Ctrl K</kbd>
            </>
          )}
        </button>

        <nav className={styles['drawer-nav']}>
          {Object.entries(groupedItems).map(([category, items]) => (
            <div key={category} className={styles['nav-group']}>
              {isExpanded && <div className={styles['nav-group-title']}>{category.toUpperCase()}</div>}
              {items.map(item => {
                const IconComponent = item.icon;
                const isActive = item.id === activeView;
                return (
                  <button
                    key={item.id}
                    className={`${styles['nav-item-btn']} ${isActive ? styles.active : ''}`}
                    onClick={() => onViewChange(item.id)}
                    title={!isExpanded ? item.label : undefined}
                  >
                    <div className={styles['nav-item-icon-container']}>
                      <IconComponent />
                    </div>
                    {isExpanded && <span className={styles['nav-item-label']}>{item.label}</span>}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>
      </aside>
    );
  }

  // Render Tablet Layout (Navigation Rail)
  if (viewport === 'tablet') {
    return (
      <aside className={styles['nav-rail']}>
        <button className={styles['menu-toggle-btn']} onClick={onSearchTrigger} aria-label="Search" style={{ marginBottom: 24 }}>
          <Icons.Search />
        </button>
        <nav className={styles['rail-nav']}>
          {navigationItems.map(item => {
            const IconComponent = item.icon;
            const isActive = item.id === activeView;
            return (
              <button
                key={item.id}
                className={`${styles['rail-item-btn']} ${isActive ? styles.active : ''}`}
                onClick={() => onViewChange(item.id)}
                title={item.label}
              >
                <div className={styles['rail-icon-wrapper']}>
                  <IconComponent />
                </div>
                <span className={styles['rail-label']}>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>
    );
  }

  // Render Mobile Layout (Bottom Navigation Bar)
  const primaryMobileItems = navigationItems.slice(0, 4);
  const secondaryMobileItems = navigationItems.slice(4);
  const isPrimaryActive = primaryMobileItems.some(i => i.id === activeView);

  return (
    <>
      <header className={styles['mobile-header']}>
        <span className={styles['mobile-logo']}>{logoText || 'CBIMS'}</span>
        <button className={styles['mobile-search-btn']} onClick={onSearchTrigger}>
          <Icons.Search />
        </button>
      </header>

      <nav className={styles['bottom-nav']}>
        {primaryMobileItems.map(item => {
          const IconComponent = item.icon;
          const isActive = item.id === activeView;
          return (
            <button
              key={item.id}
              className={`${styles['bottom-item-btn']} ${isActive ? styles.active : ''}`}
              onClick={() => handleMobileNavClick(item.id)}
            >
              <div className={styles['bottom-icon-wrapper']}>
                <IconComponent />
              </div>
              <span className={styles['bottom-label']}>{item.label}</span>
            </button>
          );
        })}
        <button
          className={`${styles['bottom-item-btn']} ${!isPrimaryActive ? styles.active : ''}`}
          onClick={() => handleMobileNavClick('more')}
        >
          <div className={styles['bottom-icon-wrapper']}>
            <Icons.More />
          </div>
          <span className={styles['bottom-label']}>{!isPrimaryActive && activeItem ? activeItem.label : 'More'}</span>
        </button>
      </nav>

      {/* Bottom Sheet Modal for secondary items */}
      {isBottomSheetOpen && (
        <div className={styles['bottom-sheet-overlay']} onClick={() => setIsBottomSheetOpen(false)}>
          <div
            className={styles['bottom-sheet-content']}
            onClick={e => e.stopPropagation()}
            style={{
              transform: `translateY(${dragY}px)`,
              transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)'
            }}
          >
            {/* Draggable Header Area */}
            <div
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{
                cursor: 'grab',
                touchAction: 'none',
                paddingBottom: 8,
                marginTop: -4
              }}
            >
              <div className={styles['bottom-sheet-handle']} style={{ height: 6, width: 48, borderRadius: 3 }} />
              <div className={styles['bottom-sheet-title']} style={{ textAlign: 'center', userSelect: 'none', margin: '12px 0 20px 0' }}>More Modules</div>
            </div>
            
            <div className={styles['bottom-sheet-grid']}>
              {secondaryMobileItems.map(item => {
                const IconComponent = item.icon;
                const isActive = item.id === activeView;
                return (
                  <button
                    key={item.id}
                    className={`${styles['sheet-item-btn']} ${isActive ? styles.active : ''}`}
                    onClick={() => handleMobileNavClick(item.id)}
                    style={{ padding: '8px 4px' }}
                  >
                    <div className={styles['sheet-icon-wrapper']} style={{ width: '100%', height: 48, borderRadius: 14 }}>
                      <IconComponent />
                    </div>
                    <span className={styles['sheet-label']} style={{ fontSize: '0.75rem', marginTop: 4 }}>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
