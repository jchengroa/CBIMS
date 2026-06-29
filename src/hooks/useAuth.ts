import { useState, useEffect } from 'react';
import { pb } from '../lib/pocketbase';

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

const mapRecordToUser = (model: any): User => {
  const isSystemAdmin = model.username === 'admin' || model.email?.startsWith('admin@');
  return {
    username: model.username,
    email: model.email,
    name: model.name || (isSystemAdmin ? 'System Administrator' : 'Standard User'),
    role: model.role || (isSystemAdmin ? 'admin' : 'user'),
    employeeId: model.employeeId || (isSystemAdmin ? 'EMP-1001' : 'EMP-1002'),
    department: model.department || (isSystemAdmin ? 'Administration' : 'Inventory Operations'),
    jobTitle: model.jobTitle || (isSystemAdmin ? 'Chief Admin Officer' : 'Inventory Clerk'),
    phone: model.phone || (isSystemAdmin ? '+1 (555) 019-2834' : '+1 (555) 014-9821'),
    avatarUrl: model.avatar ? pb.files.getUrl(model, model.avatar) : undefined
  };
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(() => {
    if (pb.authStore.isValid && pb.authStore.model) {
      return mapRecordToUser(pb.authStore.model);
    }
    return null;
  });

  useEffect(() => {
    const unsubscribe = pb.authStore.onChange((_token, model) => {
      if (model) {
        setUser(mapRecordToUser(model));
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const login = async (identifier: string, password: string, _fieldType: string): Promise<string | null> => {
    try {
      const normalizedIdentifier = identifier.trim().toLowerCase();
      // Find mock user by username, email, or employee ID
      const mockUser = MOCK_USERS.find(u => 
        u.username.toLowerCase() === normalizedIdentifier || 
        u.email.toLowerCase() === normalizedIdentifier ||
        u.employeeId.toLowerCase() === normalizedIdentifier
      );

      // PocketBase requires passwords to be at least 8 characters long by default.
      // We automatically pad shorter passwords under the hood.
      const securePassword = password.length >= 8 ? password : password.padEnd(8, '0');

      // Map employee ID or username to PocketBase-supported email if it matches a mock account
      const loginIdentifier = mockUser ? mockUser.email : identifier;

      let authSuccess = false;
      let primaryAuthError: any = null;

      try {
        // Attempt to login using the resolved email and padded password
        await pb.collection('users').authWithPassword(loginIdentifier, securePassword);
        authSuccess = true;
      } catch (authError: any) {
        primaryAuthError = authError;
        // Fallback: if the password was padded, try authenticating with the raw unpadded password
        // to support records created before the 8-character padding requirement was introduced
        if (securePassword !== password) {
          try {
            await pb.collection('users').authWithPassword(loginIdentifier, password);
            authSuccess = true;
          } catch (fallbackError) {
            // If fallback also fails, keep primaryAuthError and proceed to auto-register
          }
        }
      }

      if (!authSuccess) {
        // Detect if PocketBase is offline / connection failed
        const isOffline = 
          primaryAuthError && 
          (primaryAuthError.status === 0 || 
           primaryAuthError.message?.toLowerCase().includes('fetch') || 
           primaryAuthError.message?.toLowerCase().includes('network') ||
           primaryAuthError.message?.toLowerCase().includes('failed to fetch'));

        if (isOffline && mockUser && mockUser.password === password) {
          console.warn("PocketBase server is offline. Falling back to local mock login.");
          const authUser: User = {
            username: mockUser.username,
            email: mockUser.email,
            employeeId: mockUser.employeeId,
            role: mockUser.role,
            name: mockUser.name,
            password: mockUser.password,
            phone: mockUser.phone,
            department: mockUser.department,
            jobTitle: mockUser.jobTitle
          };
          setUser(authUser);
          return null;
        }

        // If authentication failed but matches our pre-configured mock accounts, auto-register
        if (mockUser && mockUser.password === password) {
          try {
            await pb.collection('users').create({
              username: mockUser.username,
              email: mockUser.email,
              emailVisibility: true,
              password: securePassword,
              passwordConfirm: securePassword,
              name: mockUser.name
            });
            // Retry authentication after creation using email
            await pb.collection('users').authWithPassword(mockUser.email, securePassword);
          } catch (registerError: any) {
            // Also fall back to mock user if registration fails due to connection error
            const isRegOffline = 
              registerError.status === 0 || 
              registerError.message?.toLowerCase().includes('fetch') || 
              registerError.message?.toLowerCase().includes('network') ||
              registerError.message?.toLowerCase().includes('failed to fetch');
            
            if (isRegOffline) {
              console.warn("PocketBase server is offline. Falling back to local mock login.");
              const authUser: User = {
                username: mockUser.username,
                email: mockUser.email,
                employeeId: mockUser.employeeId,
                role: mockUser.role,
                name: mockUser.name,
                password: mockUser.password,
                phone: mockUser.phone,
                department: mockUser.department,
                jobTitle: mockUser.jobTitle
              };
              setUser(authUser);
              return null;
            }

            let detailedError = registerError.message || 'Unknown registration error';
            if (registerError.response?.data) {
              const details = Object.entries(registerError.response.data)
                .map(([key, val]: any) => `${key}: ${val.message || JSON.stringify(val)}`)
                .join(', ');
              detailedError += ` (${details})`;
            }
            return `Auto-registration failed: ${detailedError}`;
          }
        } else {
          let detailedError = primaryAuthError?.message || 'Invalid credentials';
          if (primaryAuthError?.response?.data) {
            const details = Object.entries(primaryAuthError.response.data)
              .map(([key, val]: any) => `${key}: ${val.message || JSON.stringify(val)}`)
              .join(', ');
            detailedError += ` (${details})`;
          }
          return detailedError;
        }
      }
      return null;
    } catch (e: any) {
      return e.message || 'An error occurred during authentication.';
    }
  };

  const updateUser = async (updatedFields: Partial<User>) => {
    if (pb.authStore.model) {
      try {
        const updatePayload: Record<string, any> = {};
        if (updatedFields.name !== undefined) updatePayload.name = updatedFields.name;
        
        // Dynamically inspect model keys to avoid updating non-existent fields on clean database schemas
        const knownKeys = Object.keys(pb.authStore.model);
        if (updatedFields.phone !== undefined && knownKeys.includes('phone')) {
          updatePayload.phone = updatedFields.phone;
        }
        if (updatedFields.department !== undefined && knownKeys.includes('department')) {
          updatePayload.department = updatedFields.department;
        }
        if (updatedFields.jobTitle !== undefined && knownKeys.includes('jobTitle')) {
          updatePayload.jobTitle = updatedFields.jobTitle;
        }
        if (updatedFields.employeeId !== undefined && knownKeys.includes('employeeId')) {
          updatePayload.employeeId = updatedFields.employeeId;
        }

        if (Object.keys(updatePayload).length > 0) {
          const updatedRecord = await pb.collection('users').update(pb.authStore.model.id, updatePayload);
          setUser(mapRecordToUser(updatedRecord));
        }
      } catch (err) {
        console.error('Failed to update user profile in PocketBase:', err);
      }
    }
  };

  const logout = () => {
    pb.authStore.clear();
  };

  return { user, login, logout, updateUser };
};
