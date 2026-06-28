import { useState } from 'react';

export interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  type: 'boolean' | 'select' | 'text';
  value: any;
  options?: string[];
}

const DEFAULT_FLAGS: FeatureFlag[] = [
  {
    id: 'enable-double-ledger',
    name: 'Enable Double-Entry Ledger Bookkeeping',
    description: 'Enables transactional journal posting entries inside the Financials module.',
    type: 'boolean',
    value: false
  },
  {
    id: 'login-field-type',
    name: 'Login Field Identifier Type',
    description: 'Select the input credential format required on the Login Screen.',
    type: 'select',
    value: 'Username / Email',
    options: ['Username / Email', 'Username', 'Email', 'Employee ID']
  },
  {
    id: 'wms-layout-version',
    name: 'Inventory View Layout',
    description: 'Select which layout design engine to use for the Inventory dashboard.',
    type: 'select',
    value: 'Grid',
    options: ['Grid', 'Kanban', 'List']
  },
  {
    id: 'developer-company-alias',
    name: 'Developer Company Alias Tag',
    description: 'Override the company branding moniker displayed in the system headers.',
    type: 'text',
    value: 'CBIMS'
  }
];

export const useFlags = () => {
  const [flags, setFlags] = useState<FeatureFlag[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cbims-feature-flags');
      if (saved) {
        try {
          const parsed = JSON.parse(saved) as FeatureFlag[];
          // Merge defaults to ensure new flags are added dynamically
          return DEFAULT_FLAGS.map(def => {
            const existing = parsed.find(p => p.id === def.id);
            return existing ? { ...def, value: existing.value } : def;
          });
        } catch (e) {
          return DEFAULT_FLAGS;
        }
      }
    }
    return DEFAULT_FLAGS;
  });

  const updateFlag = (id: string, value: any) => {
    setFlags(prev => {
      const next = prev.map(flag => flag.id === id ? { ...flag, value } : flag);
      if (typeof window !== 'undefined') {
        localStorage.setItem('cbims-feature-flags', JSON.stringify(next));
      }
      return next;
    });
  };

  return { flags, updateFlag };
};
