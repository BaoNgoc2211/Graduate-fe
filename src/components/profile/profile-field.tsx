interface ProfileFieldProps {
  label: string;
  children: React.ReactNode;
}

export const ProfileField = ({ label, children }: ProfileFieldProps) => (
  <div>
    <label className="block text-sm text-gray-600 mb-1">{label}</label>
    {children}
  </div>
);