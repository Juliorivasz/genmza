// ============================================================
// Global TypeScript Interfaces & Types
// ============================================================

export type ServiceCategory = 'celulares' | 'computadoras' | 'protectores';

export interface Problem {
  id: string;
  label: string;
  estimatedTime?: string;
}

export interface Service {
  id: ServiceCategory;
  title: string;
  subtitle: string;
  icon: string; // lucide icon name
  image?: string;
  problems: Problem[];
}

export interface ServicesDB {
  services: Service[];
  whatsappNumber: string;
  businessName: string;
}

// react-hook-form shape
export interface BudgetFormValues {
  serviceId: ServiceCategory | '';
  problemId: string;
  deviceBrand: string;
  deviceModel: string;
}
