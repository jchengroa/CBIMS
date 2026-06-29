import React from 'react';
import { FeatureFlag } from '../../hooks/useFlags';

interface SettingsModuleProps {
  theme: 'dark' | 'light';
  onThemeChange: (theme: 'dark' | 'light') => void;
  flags: FeatureFlag[];
  onUpdateFlag: (id: string, value: any) => void;
  userRole?: 'admin' | 'user';
}

export const SettingsModule: React.FC<SettingsModuleProps> = ({ theme, onThemeChange, flags, onUpdateFlag, userRole }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, width: '100%' }}>
      {/* Category: Appearance */}
      <div>
        <h3 style={{ color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 700, marginBottom: 16, borderBottom: '1px solid var(--border-light)', paddingBottom: 8 }}>
          Appearance & Interface
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>

          {/* Row 1: Theme Mode */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 0',
            borderBottom: '1px solid var(--border-light)'
          }}>
            <div>
              <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Dark Theme Mode</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: 2 }}>Toggle between light and dark appearance modes.</div>
            </div>
            <label className="switch-container">
              <input
                type="checkbox"
                className="switch-input"
                checked={theme === 'dark'}
                onChange={() => onThemeChange(theme === 'dark' ? 'light' : 'dark')}
              />
              <span className="switch-slider"></span>
            </label>
          </div>

          {/* Row 2: Compact View (Unimplemented) */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 0',
            borderBottom: '1px solid var(--border-light)',
            opacity: 0.4,
            pointerEvents: 'none'
          }}>
            <div>
              <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Compact Sidebar</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: 2 }}>Minimize navigation panel width to maximize viewport workspace.</div>
            </div>
            <label className="switch-container">
              <input type="checkbox" className="switch-input" checked={false} disabled readOnly />
              <span className="switch-slider"></span>
            </label>
          </div>

        </div>
      </div>

      {/* Category: Localization */}
      <div>
        <h3 style={{ color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 700, marginBottom: 16, borderBottom: '1px solid var(--border-light)', paddingBottom: 8 }}>
          Localization & Regional
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column' }}>

          {/* Row 1: Currency (Unimplemented) */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 0',
            borderBottom: '1px solid var(--border-light)',
            opacity: 0.4,
            pointerEvents: 'none'
          }}>
            <div>
              <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Default Currency</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: 2 }}>Standard reporting currency for ledger valuations.</div>
            </div>
            <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.9rem' }}>USD ($)</span>
          </div>

          {/* Row 2: Date Format (Unimplemented) */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 0',
            borderBottom: '1px solid var(--border-light)',
            opacity: 0.4,
            pointerEvents: 'none'
          }}>
            <div>
              <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>System Date Format</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: 2 }}>Global format for transaction journals and documents.</div>
            </div>
            <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.9rem' }}>YYYY-MM-DD</span>
          </div>

        </div>
      </div>

      {/* Category: System Security */}
      <div>
        <h3 style={{ color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 700, marginBottom: 16, borderBottom: '1px solid var(--border-light)', paddingBottom: 8 }}>
          Security & System
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column' }}>

          {/* Row 1: Session Timeout (Unimplemented) */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 0',
            borderBottom: '1px solid var(--border-light)',
            opacity: 0.4,
            pointerEvents: 'none'
          }}>
            <div>
              <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Inactivity Session Timeout</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: 2 }}>Automatically lock session after inactivity.</div>
            </div>
            <span style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.9rem' }}>30 Minutes</span>
          </div>

          {/* Row 2: Audit Logs (Unimplemented) */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px 0',
            borderBottom: '1px solid var(--border-light)',
            opacity: 0.4,
            pointerEvents: 'none'
          }}>
            <div>
              <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Detailed Audit Logging</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: 2 }}>Record all ledger modifications and access logs for security compliance.</div>
            </div>
            <label className="switch-container">
              <input type="checkbox" className="switch-input" checked={true} disabled readOnly />
              <span className="switch-slider"></span>
            </label>
          </div>

        </div>
      </div>

      {/* Category: Developer Options & Flags */}
      {userRole === 'admin' && (
        <div>
          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.1rem', fontWeight: 700, marginBottom: 16, borderBottom: '1px solid var(--border-light)', paddingBottom: 8 }}>
            Developer Options & Flags
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {flags.map(flag => (
              <div key={flag.id} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 0',
                borderBottom: '1px solid var(--border-light)'
              }}>
                <div>
                  <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{flag.name}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: 2 }}>{flag.description}</div>
                </div>
                <div>
                  {flag.type === 'boolean' && (
                    <label className="switch-container">
                      <input
                        type="checkbox"
                        className="switch-input"
                        checked={flag.value}
                        onChange={(e) => onUpdateFlag(flag.id, e.target.checked)}
                      />
                      <span className="switch-slider"></span>
                    </label>
                  )}
                  {flag.type === 'select' && (
                    <select
                      value={flag.value}
                      onChange={(e) => onUpdateFlag(flag.id, e.target.value)}
                      style={{
                        padding: '8px 12px',
                        borderRadius: 8,
                        border: '1px solid var(--border-medium)',
                        backgroundColor: 'var(--bg-surface-solid)',
                        color: 'var(--text-primary)',
                        outline: 'none',
                        cursor: 'pointer',
                        fontSize: '0.85rem'
                      }}
                    >
                      {flag.options?.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  )}
                  {flag.type === 'text' && (
                    <input
                      type="text"
                      value={flag.value}
                      onChange={(e) => onUpdateFlag(flag.id, e.target.value)}
                      style={{
                        padding: '8px 12px',
                        borderRadius: 8,
                        border: '1px solid var(--border-medium)',
                        backgroundColor: 'var(--bg-surface-solid)',
                        color: 'var(--text-primary)',
                        outline: 'none',
                        width: '200px',
                        fontSize: '0.85rem'
                      }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer System Info */}
      <div style={{
        marginTop: 24,
        paddingTop: 24,
        borderTop: '1px solid var(--border-light)',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        color: 'var(--text-muted)',
        fontSize: '0.8rem',
        lineHeight: 1.5
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <span>CBIMS | Cloud-Based Inventory Management System</span>
          <span>Version 2.3.0</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <span>Created by: @jchengroa</span>
          <span>Last Updated: 2026-06-29</span>
        </div>
      </div>
    </div>
  );
};
