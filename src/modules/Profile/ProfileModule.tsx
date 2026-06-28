import React, { useState } from 'react';
import { User } from '../../hooks/useAuth';
import styles from './ProfileModule.module.css';

interface ProfileModuleProps {
  user: User;
  onUpdateUser: (fields: Partial<User>) => void;
}

export const ProfileModule: React.FC<ProfileModuleProps> = ({ user, onUpdateUser }) => {
  // Profile state
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone || '');
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl || '');
  const [department, setDepartment] = useState(user.department || '');
  const [jobTitle, setJobTitle] = useState(user.jobTitle || '');

  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // UI state
  const [msg, setMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // File upload logic (base64)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setAvatarUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);

    if (!name.trim() || !email.trim()) {
      setMsg({ text: 'Display Name and Email are required.', type: 'error' });
      return;
    }

    onUpdateUser({
      name,
      email,
      phone,
      avatarUrl,
      department,
      jobTitle
    });

    setMsg({ text: 'Account settings updated successfully.', type: 'success' });
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);

    if (!currentPassword || !newPassword || !confirmPassword) {
      setMsg({ text: 'All password fields are required.', type: 'error' });
      return;
    }

    if (currentPassword !== user.password) {
      setMsg({ text: 'Current password is incorrect.', type: 'error' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setMsg({ text: 'New password and confirmation do not match.', type: 'error' });
      return;
    }

    if (newPassword.length < 4) {
      setMsg({ text: 'New password must be at least 4 characters long.', type: 'error' });
      return;
    }

    onUpdateUser({
      password: newPassword
    });

    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setMsg({ text: 'Password changed successfully.', type: 'success' });
  };

  return (
    <div className={styles.profileContainer}>
      {msg && (
        <div className={`${styles.alert} ${msg.type === 'success' ? styles.alertSuccess : styles.alertError}`}>
          {msg.text}
        </div>
      )}

      <div className={styles.grid}>
        
        {/* Left Column: Avatar & Organizational Info */}
        <div className={styles.leftCol}>
          
          {/* Section: Profile Avatar */}
          <div className={styles.avatarSection}>
            <div className={styles.avatarFrame}>
              {avatarUrl ? (
                <img src={avatarUrl} alt={name} />
              ) : (
                name.split(' ').map(n => n[0]).join('')
              )}
            </div>

            <div className={styles.avatarMeta}>
              <h4>{name}</h4>
              <p>{user.role} Account</p>
            </div>

            {/* Avatar URL / File Inputs */}
            <div className={styles.avatarControls}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Avatar Image URL</label>
                <input
                  type="text"
                  className={styles.input}
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>

              <div className={styles.buttonRow}>
                <label className={styles.fileInputLabel} style={{ width: '100%' }}>
                  Upload Local File
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                  />
                </label>
                {avatarUrl && (
                  <button onClick={() => setAvatarUrl('')} className={styles.btnDanger}>
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Section: ERP Info */}
          <div>
            <h3 className={styles.sectionTitle}>ERP Organizational Profile</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Employee Registry ID</span>
                <span className={styles.infoVal}>{user.employeeId}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Account Role Permission</span>
                <span className={styles.infoVal} style={{ textTransform: 'uppercase', color: user.role === 'admin' ? '#ef4444' : 'var(--text-primary)' }}>
                  {user.role}
                </span>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Assigned Department</label>
                <input
                  type="text"
                  className={styles.input}
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="e.g. Inventory Management"
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Job Role / Title</label>
                <input
                  type="text"
                  className={styles.input}
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  placeholder="e.g. Lead Logistics Analyst"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Account Forms & Password Resets */}
        <div className={styles.rightCol}>
          
          {/* Section: Profile Details Form */}
          <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <h3 className={styles.sectionTitle}>Account Settings</h3>
            
            <div className={styles.formGroup}>
              <label className={styles.label}>Display Name</label>
              <input
                type="text"
                className={styles.input}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Email Address</label>
              <input
                type="email"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Phone Number</label>
              <input
                type="text"
                className={styles.input}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +1 (555) 012-3456"
              />
            </div>

            <button type="submit" className={styles.btnPrimary} style={{ alignSelf: 'flex-start' }}>
              Save Profile Changes
            </button>
          </form>

          {/* Section: Change Password Form */}
          <form onSubmit={handleChangePassword} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <h3 className={styles.sectionTitle}>Change Password</h3>

            <div className={styles.formGroup}>
              <label className={styles.label}>Current Password</label>
              <input
                type="password"
                className={styles.input}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>New Password</label>
              <input
                type="password"
                className={styles.input}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Confirm New Password</label>
              <input
                type="password"
                className={styles.input}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <button type="submit" className={styles.btnPrimary} style={{ alignSelf: 'flex-start' }}>
              Update Security Credentials
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};
