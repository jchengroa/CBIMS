import React, { useState, useEffect, useRef } from 'react';
import styles from './CommandPalette.module.css';
import { navigationItems } from './Navigation';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (viewId: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setSearchQuery('');
      setSelectedIndex(0);
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const filteredItems = navigationItems.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.querySelector(
        `.${styles['palette-item']}.${styles.selected}`
      ) as HTMLElement;
      if (activeEl) {
        const listHeight = listRef.current.clientHeight;
        const activeTop = activeEl.offsetTop;
        const activeHeight = activeEl.clientHeight;
        const currentScroll = listRef.current.scrollTop;

        if (activeTop + activeHeight > currentScroll + listHeight) {
          listRef.current.scrollTop = activeTop + activeHeight - listHeight;
        } else if (activeTop < currentScroll) {
          listRef.current.scrollTop = activeTop;
        }
      }
    }
  }, [selectedIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % Math.max(1, filteredItems.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          handleSelect(filteredItems[selectedIndex].id);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredItems]);

  const handleSelect = (viewId: string) => {
    onNavigate(viewId);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles['palette-backdrop']} onClick={onClose}>
      <div className={styles['palette-dialog']} onClick={e => e.stopPropagation()}>
        <div className={styles['palette-search-wrapper']}>
          <svg className={styles['palette-search-icon']} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
          <input
            ref={inputRef}
            type="text"
            className={styles['palette-input']}
            placeholder="Type a command or jump to page..."
            value={searchQuery}
            onChange={e => {
              setSearchQuery(e.target.value);
              setSelectedIndex(0);
            }}
          />
          <span className={styles['palette-esc-hint']}>ESC</span>
        </div>

        <div className={styles['palette-results']} ref={listRef}>
          {filteredItems.length > 0 ? (
            <div className={styles['palette-section']}>
              <div className={styles['palette-section-title']}>Navigation Commands</div>
              {filteredItems.map((item, idx) => {
                const IconComponent = item.icon;
                const isSelected = idx === selectedIndex;
                return (
                  <div
                    key={item.id}
                    className={`${styles['palette-item']} ${isSelected ? styles.selected : ''}`}
                    onClick={() => handleSelect(item.id)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                  >
                    <div className={styles['palette-item-icon']}>
                      <IconComponent />
                    </div>
                    <div className={styles['palette-item-details']}>
                      <span className={styles['palette-item-label']}>{item.label}</span>
                      <span className={styles['palette-item-category']}>{item.category}</span>
                    </div>
                    {isSelected && <span className={styles['palette-enter-hint']}>↵ Go</span>}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className={styles['palette-no-results']}>No results found for "{searchQuery}"</div>
          )}
        </div>

        <div className={styles['palette-footer']}>
          <span>Use <kbd>↑</kbd> <kbd>↓</kbd> keys to navigate, <kbd>Enter</kbd> to select</span>
        </div>
      </div>
    </div>
  );
};
