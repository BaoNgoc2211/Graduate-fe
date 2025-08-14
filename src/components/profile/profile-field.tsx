// interface ProfileFieldProps {
//   label: string;
//   children: React.ReactNode;
// }

// export const ProfileField = ({ label, children }: ProfileFieldProps) => (
//   <div>
//     <label className="block text-sm text-gray-600 mb-1">{label}</label>
//     {children}
//   </div>
// );
// components/profile/profile-field.tsx
import { ReactNode } from 'react';

interface ProfileFieldProps {
  label: string;
  children: ReactNode;
  required?: boolean;
  error?: string;
  description?: string;
  className?: string;
}

export const ProfileField = ({ 
  label, 
  children, 
  required = false, 
  error, 
  description,
  className = ""
}: ProfileFieldProps) => (
  <div className={`space-y-1 ${className}`}>
    <label className="block text-sm font-medium text-gray-700">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    
    {description && (
      <p className="text-xs text-gray-500">{description}</p>
    )}
    
    <div className="relative">
      {children}
    </div>
    
    {error && (
      <p className="text-xs text-red-600 flex items-center gap-1">
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        {error}
      </p>
    )}
  </div>
);