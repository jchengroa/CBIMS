import React, { useState } from 'react';
import styles from './LoginScreen.module.css';

interface ForgotPasswordProps {
  fieldType: string;
  onBack: () => void;
  logoText: string;
}

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({ fieldType, onBack, logoText }) => {
  const [identifier, setIdentifier] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!identifier.trim()) {
      setError(`Please enter your ${fieldType.toLowerCase()}.`);
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 800);
  };

  if (isSubmitted) {
    return (
      <div className={styles.loginCard}>
        <div className={styles.header}>
          <div className={styles.logo}>{logoText}</div>
          <p className={styles.tagline} style={{ color: '#10b981', fontWeight: 600, marginTop: 12 }}>
            Instructions Sent
          </p>
        </div>
        <div style={{ textAlign: 'center', margin: '24px 0', lineHeight: 1.6, color: 'var(--text-secondary)' }}>
          If an account matches <strong>{identifier}</strong>, you will receive password recovery instructions shortly.
        </div>
        <button onClick={onBack} className={styles.submitButton}>
          Back to Sign In
        </button>
      </div>
    );
  }

  return (
    <div className={styles.loginCard}>
      <div className={styles.header}>
        <div className={styles.logo}>{logoText}</div>
        <p className={styles.tagline}>Reset your system credentials</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {error && <div className={styles.errorMsg}>{error}</div>}

        <div className={styles.inputGroup}>
          <label htmlFor="recovery-id" className={styles.label}>
            {fieldType}
          </label>
          <input
            id="recovery-id"
            type="text"
            className={styles.input}
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder={getPlaceholder()}
            disabled={isLoading}
          />
        </div>

        <button type="submit" className={styles.submitButton} disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send Recovery Code'}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: 24 }}>
        <a
          href="#login"
          className={styles.forgotLink}
          onClick={(e) => {
            e.preventDefault();
            onBack();
          }}
        >
          Back to Sign In
        </a>
      </div>
    </div>
  );
};
