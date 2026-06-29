import React, { useState, useEffect } from 'react';
import styles from './LoginScreen.module.css';
import { GlowElements } from '../Common/GlowElements';
import { ForgotPassword } from './ForgotPassword';

interface LoginScreenProps {
  logoText: string;
  fieldType: string;
  onLogin: (username: string, password: string) => Promise<string | null> | string | null;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ logoText, fieldType, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState<'login' | 'forgot'>('login');
  const [showPassword, setShowPassword] = useState(false);
  // TEMPORARY: State to control floating credential test card. Can be removed in production.
  const [helperState, setHelperState] = useState<'maximized' | 'minimized'>('maximized');
  const [pbStatus, setPbStatus] = useState<'checking' | 'running' | 'offline'>('checking');

  useEffect(() => {
    let isMounted = true;
    const checkHealth = async () => {
      try {
        const response = await fetch('http://localhost:8090/api/health');
        if (response.ok) {
          if (isMounted) setPbStatus('running');
        } else {
          if (isMounted) setPbStatus('offline');
        }
      } catch (err) {
        if (isMounted) setPbStatus('offline');
      }
    };
    checkHealth();
    const interval = setInterval(checkHealth, 5000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const getPlaceholder = () => {
    switch (fieldType) {
      case 'Email':
        return 'admin@cbims.com';
      case 'Username':
        return 'admin_user';
      case 'Employee ID':
        return 'EMP-1002';
      default:
        return 'admin@cbims.com or username';
    }
  };

  const getInputType = () => {
    return (fieldType === 'Email' || fieldType === 'Email Only') ? 'email' : 'text';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError(`Please enter both your ${fieldType.toLowerCase()} and password.`);
      return;
    }

    setIsLoading(true);

    try {
      const loginError = await onLogin(username, password);
      setIsLoading(false);
      if (loginError) {
        setError(loginError);
      }
    } catch (err: any) {
      setIsLoading(false);
      setError(err?.message || 'Login failed');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <GlowElements />

      {/* TEMPORARY: Credential hint cards. Safe to delete the entire block below in production. */}
      {helperState === 'minimized' && (
        <div className={styles.helperCardMinimized} onClick={() => setHelperState('maximized')}>
          <span>🔑 Show Credentials</span>
          <span style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: pbStatus === 'running' ? '#10b981' : pbStatus === 'checking' ? '#f59e0b' : '#ef4444',
            display: 'inline-block',
            marginLeft: 4,
            boxShadow: pbStatus === 'running' ? '0 0 6px #10b981' : 'none'
          }}></span>
        </div>
      )}

      {helperState === 'maximized' && (
        <div className={styles.helperCard}>
          <div className={styles.helperTitle}>
            <span>Default Test Credentials</span>
            <button className={styles.closeBtn} onClick={() => setHelperState('minimized')}>Minimize</button>
          </div>
          <div className={styles.helperSection}>
            <div className={styles.helperLabel}>Admin Account</div>
            <div className={styles.helperItem}>
              <span>Username:</span> <span className={styles.helperValue}>admin</span>
            </div>
            <div className={styles.helperItem}>
              <span>Email:</span> <span className={styles.helperValue}>admin@cbims.com</span>
            </div>
            <div className={styles.helperItem}>
              <span>Emp ID:</span> <span className={styles.helperValue}>EMP-1001</span>
            </div>
            <div className={styles.helperItem}>
              <span>Password:</span> <span className={styles.helperValue}>admin</span>
            </div>
          </div>
          <div className={styles.helperSection}>
            <div className={styles.helperLabel}>User Account</div>
            <div className={styles.helperItem}>
              <span>Username:</span> <span className={styles.helperValue}>user</span>
            </div>
            <div className={styles.helperItem}>
              <span>Email:</span> <span className={styles.helperValue}>user@cbims.com</span>
            </div>
            <div className={styles.helperItem}>
              <span>Emp ID:</span> <span className={styles.helperValue}>EMP-1002</span>
            </div>
            <div className={styles.helperItem}>
              <span>Password:</span> <span className={styles.helperValue}>user</span>
            </div>
          </div>
          <div className={styles.helperSection} style={{ marginTop: 4, paddingTop: 12, borderTop: '1px solid var(--border-light)' }}>
            <div className={styles.helperItem} style={{ borderBottom: 'none', paddingBottom: 0, alignItems: 'center' }}>
              <span>PocketBase Server:</span>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontWeight: 600,
                color: pbStatus === 'running' ? '#10b981' : pbStatus === 'checking' ? '#f59e0b' : '#ef4444'
              }}>
                <span style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: pbStatus === 'running' ? '#10b981' : pbStatus === 'checking' ? '#f59e0b' : '#ef4444',
                  boxShadow: pbStatus === 'running' ? '0 0 8px #10b981' : 'none'
                }}></span>
                {pbStatus === 'running' ? 'Running' : pbStatus === 'checking' ? 'Checking...' : 'Offline'}
              </span>
            </div>
          </div>
        </div>
      )}
      {/* END TEMPORARY BLOCK */}

      {view === 'forgot' ? (
        <ForgotPassword
          logoText={logoText}
          fieldType={fieldType}
          onBack={() => setView('login')}
        />
      ) : (
        <div className={styles.loginCard}>
          <div className={styles.header}>
            <div className={styles.logo}>{logoText}</div>
            <p className={styles.tagline}>Sign in to access your dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            {error && <div className={styles.errorMsg}>{error}</div>}

            <div className={styles.inputGroup}>
              <label htmlFor="username" className={styles.label}>
                {fieldType}
              </label>
              <input
                id="username"
                type={getInputType()}
                className={styles.input}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={getPlaceholder()}
                disabled={isLoading}
                autoComplete="username"
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <div className={styles.passwordWrapper}>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className={`${styles.input} ${styles.passwordInput}`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={isLoading}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className={styles.eyeButton}
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                  )}
                </button>
              </div>
            </div>

            <div className={styles.optionsRow}>
              <label className={styles.rememberMe}>
                <input
                  type="checkbox"
                  className={styles.checkboxInput}
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={isLoading}
                />
                <span className={styles.rememberLabel}>Remember me</span>
              </label>
              <a
                href="#forgot"
                className={styles.forgotLink}
                onClick={(e) => {
                  e.preventDefault();
                  setView('forgot');
                }}
              >
                Forgot Password?
              </a>
            </div>

            <button type="submit" className={styles.submitButton} disabled={isLoading}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
