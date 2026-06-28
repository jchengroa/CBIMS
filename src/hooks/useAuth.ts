import { useState } from 'react';

export type UserRole = 'admin' | 'user';

export interface User {
  username: string;
  email: string;
  employeeId: string;
  role: UserRole;
  name: string;
  password?: string;
  avatarUrl?: string;
  phone?: string;
  department?: string;
  jobTitle?: string;
}

const MOCK_USERS = [
  {
    username: 'admin',
    email: 'admin@cbims.com',
    employeeId: 'EMP-1001',
    password: 'admin',
    role: 'admin' as UserRole,
    name: 'System Administrator',
    department: 'Administration',
    jobTitle: 'Chief Admin Officer',
    phone: '+1 (555) 019-2834'
  },
  {
    username: 'user',
    email: 'user@cbims.com',
    employeeId: 'EMP-1002',
    password: 'user',
    role: 'user' as UserRole,
    name: 'Standard User',
    department: 'Inventory Operations',
    jobTitle: 'Inventory Clerk',
    phone: '+1 (555) 014-9821'
  }
];

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cbims-auth-session');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          return null;
        }
      }
    }
    return null;
  });

  const login = (identifier: string, password: string, fieldType: string): string | null => {
    // Find user matching identifier based on login field type
    const normalizedIdentifier = identifier.trim().toLowerCase();
    const matchedUser = MOCK_USERS.find(u => {
      switch (fieldType) {
        case 'Email':
        case 'Email Only':
          return u.email.toLowerCase() === normalizedIdentifier;
        case 'Username':
        case 'Username Only':
          return u.username.toLowerCase() === normalizedIdentifier;
        case 'Employee ID':
          return u.employeeId.toLowerCase() === normalizedIdentifier;
        default:
          // Username / Email (Default fallback)
          return (
            u.username.toLowerCase() === normalizedIdentifier ||
            u.email.toLowerCase() === normalizedIdentifier
          );
      }
    });

    if (!matchedUser) {
      return `Invalid ${fieldType.toLowerCase()}.`;
    }

    if (matchedUser.password !== password) {
      return 'Incorrect password.';
    }

    const authUser: User = {
      username: matchedUser.username,
      email: matchedUser.email,
      employeeId: matchedUser.employeeId,
      role: matchedUser.role,
      name: matchedUser.name,
      password: matchedUser.password,
      phone: matchedUser.phone,
      department: matchedUser.department,
      jobTitle: matchedUser.jobTitle
    };

    setUser(authUser);
    if (typeof window !== 'undefined') {
      localStorage.setItem('cbims-auth-session', JSON.stringify(authUser));
    }
    return null;
  };

  const updateUser = (updatedFields: Partial<User>) => {
    setUser(prev => {
      if (!prev) return null;
      const next = { ...prev, ...updatedFields };
      if (typeof window !== 'undefined') {
        localStorage.setItem('cbims-auth-session', JSON.stringify(next));
      }
      return next;
    });
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('cbims-auth-session');
    }
  };

  return { user, login, logout, updateUser };
};
