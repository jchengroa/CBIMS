import { useState } from 'react';
import { Navigation } from './components/Navigation/Navigation';
import { CommandPalette } from './components/Navigation/CommandPalette';
import { SettingsModule } from './modules/Settings/SettingsModule';
import { GlowElements } from './components/Common/GlowElements';
import { GlassCard } from './components/Common/GlassCard';
import { useCommandPalette } from './hooks/useCommandPalette';
import { useFlags } from './hooks/useFlags';

function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const palette = useCommandPalette();
  const { flags, updateFlag } = useFlags();
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  const companyAlias = flags.find(f => f.id === 'developer-company-alias')?.value || 'CBIMS ERP';
  const enableDoubleLedger = flags.find(f => f.id === 'enable-double-ledger')?.value;
  const wmsLayoutVersion = flags.find(f => f.id === 'wms-layout-version')?.value || 'v1-grid';

  return (
    <div className="app-layout" data-theme={theme}>
      <GlowElements />

      <Navigation
        activeView={activeView}
        onViewChange={setActiveView}
        onSearchTrigger={palette.open}
        logoText={companyAlias}
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
        </header>

        <GlassCard>
          {activeView === 'settings' ? (
            <SettingsModule
              theme={theme}
              onThemeChange={setTheme}
              flags={flags}
              onUpdateFlag={updateFlag}
            />
          ) : activeView === 'finance' ? (
            enableDoubleLedger ? (
              <div style={{ width: '100%' }}>
                <h3 style={{ color: 'var(--text-primary)', marginBottom: 20 }}>General Ledger Transaction Journal</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-primary)', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--border-medium)', textAlign: 'left' }}>
                      <th style={{ padding: 12 }}>Date</th>
                      <th style={{ padding: 12 }}>Account</th>
                      <th style={{ padding: 12 }}>Debit ($)</th>
                      <th style={{ padding: 12 }}>Credit ($)</th>
                      <th style={{ padding: 12 }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                      <td style={{ padding: 12 }}>2026-06-26</td>
                      <td style={{ padding: 12 }}>Inventory Assets (1400)</td>
                      <td style={{ padding: 12 }}>12,500.00</td>
                      <td style={{ padding: 12 }}>-</td>
                      <td style={{ padding: 12, color: '#10b981', fontWeight: 600 }}>POSTED</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                      <td style={{ padding: 12 }}>2026-06-26</td>
                      <td style={{ padding: 12 }}>Accounts Payable (2100)</td>
                      <td style={{ padding: 12 }}>-</td>
                      <td style={{ padding: 12 }}>12,500.00</td>
                      <td style={{ padding: 12, color: '#10b981', fontWeight: 600 }}>POSTED</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <h3 style={{ color: 'var(--text-primary)', marginBottom: 12, fontSize: '1.2rem' }}>Financial Ledger Workspace</h3>
                <p style={{ color: 'var(--text-secondary)' }}>The ERP Financial Ledger bookkeeping module is scaffolded.</p>
                <p style={{ marginTop: 16, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Note: Enable the <strong>Enable Double-Entry Ledger Bookkeeping</strong> flag in Settings to preview active transactional journals.
                </p>
              </div>
            )
          ) : activeView === 'inventory' ? (
            <div style={{ width: '100%' }}>
              {wmsLayoutVersion === 'v1-grid' && (
                <div>
                  <h3 style={{ color: 'var(--text-primary)', marginBottom: 20 }}>Inventory Grid Layout</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
                    <div style={{ padding: 24, borderRadius: 16, border: '1px solid var(--border-light)', backgroundColor: 'rgba(255,255,255,0.01)' }}>
                      <h4 style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Warehouse A (East Coast)</h4>
                      <p style={{ marginTop: 12, fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>1,240 Units</p>
                    </div>
                    <div style={{ padding: 24, borderRadius: 16, border: '1px solid var(--border-light)', backgroundColor: 'rgba(255,255,255,0.01)' }}>
                      <h4 style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Warehouse B (West Coast)</h4>
                      <p style={{ marginTop: 12, fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>850 Units</p>
                    </div>
                  </div>
                </div>
              )}
              {wmsLayoutVersion === 'v2-kanban' && (
                <div>
                  <h3 style={{ color: 'var(--text-primary)', marginBottom: 20 }}>Inventory Kanban Stock Boards</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                    <div style={{ padding: 16, borderRadius: 12, backgroundColor: 'rgba(239, 68, 68, 0.03)', border: '1px solid rgba(239, 68, 68, 0.08)' }}>
                      <h4 style={{ color: '#ef4444', fontWeight: 700, fontSize: '0.9rem' }}>Low Stock Alerts</h4>
                      <div style={{ marginTop: 12, padding: 12, borderRadius: 8, backgroundColor: 'var(--bg-surface-solid)', border: '1px solid var(--border-light)', color: 'var(--text-primary)', fontSize: '0.8rem', fontWeight: 600 }}>
                        Box Pallets (2 left)
                      </div>
                    </div>
                    <div style={{ padding: 16, borderRadius: 12, backgroundColor: 'rgba(16, 185, 129, 0.03)', border: '1px solid rgba(16, 185, 129, 0.08)' }}>
                      <h4 style={{ color: '#10b981', fontWeight: 700, fontSize: '0.9rem' }}>Optimal Stock</h4>
                      <div style={{ marginTop: 12, padding: 12, borderRadius: 8, backgroundColor: 'var(--bg-surface-solid)', border: '1px solid var(--border-light)', color: 'var(--text-primary)', fontSize: '0.8rem', fontWeight: 600 }}>
                        Steel Springs (450 left)
                      </div>
                    </div>
                    <div style={{ padding: 16, borderRadius: 12, backgroundColor: 'rgba(59, 130, 246, 0.03)', border: '1px solid rgba(59, 130, 246, 0.08)' }}>
                      <h4 style={{ color: '#3b82f6', fontWeight: 700, fontSize: '0.9rem' }}>Overstock Levels</h4>
                      <div style={{ marginTop: 12, padding: 12, borderRadius: 8, backgroundColor: 'var(--bg-surface-solid)', border: '1px solid var(--border-light)', color: 'var(--text-primary)', fontSize: '0.8rem', fontWeight: 600 }}>
                        Plastic Cases (2000 left)
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {wmsLayoutVersion === 'v3-list-compact' && (
                <div>
                  <h3 style={{ color: 'var(--text-primary)', marginBottom: 20 }}>Inventory Compact Stock Registry</h3>
                  <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-primary)', fontSize: '0.85rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid var(--border-medium)', textAlign: 'left' }}>
                        <th style={{ padding: 10 }}>SKU Code</th>
                        <th style={{ padding: 10 }}>Stock Level</th>
                        <th style={{ padding: 10 }}>Category</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                        <td style={{ padding: 10 }}>SKU-BOX-PLT</td>
                        <td style={{ padding: 10 }}>2 Units</td>
                        <td style={{ padding: 10 }}>Packaging</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                        <td style={{ padding: 10 }}>SKU-STL-SPR</td>
                        <td style={{ padding: 10 }}>450 Units</td>
                        <td style={{ padding: 10 }}>Components</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '40vh', width: '100%' }}>
              Current Module: {activeView.toUpperCase()} - Scaffolded view ready for components.
            </div>
          )}
        </GlassCard>
      </main>

      <CommandPalette
        isOpen={palette.isOpen}
        onClose={palette.close}
        onNavigate={setActiveView}
      />
    </div>
  );
}

export default App;
