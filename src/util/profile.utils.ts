// utils/profile.utils.ts - Validation và utility functions

export interface ValidationResult {
  isValid: boolean;
  errors: { [key: string]: string };
}

// Validation functions
export const validateProfile = (data: {
  name: string;
  phone: string;
  birthday: string;
  gender: string;
}): ValidationResult => {
  const errors: { [key: string]: string } = {};

  // Name validation
  if (!data.name.trim()) {
    errors.name = 'Họ và tên không được để trống';
  } else if (data.name.trim().length < 2) {
    errors.name = 'Họ và tên phải có ít nhất 2 ký tự';
  } else if (data.name.trim().length > 50) {
    errors.name = 'Họ và tên không được vượt quá 50 ký tự';
  }

  // Phone validation
  if (data.phone) {
    const phoneRegex = /^(0|\+84)[3-9][0-9]{8}$/;
    if (!phoneRegex.test(data.phone.replace(/\s/g, ''))) {
      errors.phone = 'Số điện thoại không hợp lệ (10-11 số, bắt đầu bằng 0 hoặc +84)';
    }
  }

  // Birthday validation
  if (data.birthday) {
    const birthDate = new Date(data.birthday);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    
    if (birthDate > today) {
      errors.birthday = 'Ngày sinh không thể là ngày tương lai';
    } else if (age > 120) {
      errors.birthday = 'Ngày sinh không hợp lệ';
    } else if (age < 13) {
      errors.birthday = 'Tuổi phải từ 13 trở lên';
    }
  }

  // Gender validation
  if (data.gender && !['Nam', 'Nữ', 'Khác'].includes(data.gender)) {
    errors.gender = 'Giới tính không hợp lệ';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Format phone number
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.startsWith('84')) {
    return '+' + cleaned;
  } else if (cleaned.startsWith('0')) {
    return cleaned;
  } else {
    return '0' + cleaned;
  }
};

// Parse address data for API
export const parseAddressForAPI = (
  addressData: {
    province: string;
    district: string;
    ward: string;
    detail: string;
  },
  provinces: any[],
  districts: any[],
  wards: any[]
) => {
  const province = provinces.find(p => p.name === addressData.province);
  const district = districts.find(d => d.name === addressData.district);
  const ward = wards.find(w => w.name === addressData.ward);

  return {
    provinceId: province?.code?.toString() || '',
    provinceName: addressData.province,
    wardId: ward?.code?.toString() || '',
    wardName: addressData.ward,
    street: addressData.detail.trim(),
  };
};

// Compare two objects to detect changes
export const hasProfileChanged = (
  current: any,
  original: any,
  fieldsToCompare: string[]
): boolean => {
  return fieldsToCompare.some(field => {
    const currentValue = getNestedValue(current, field);
    const originalValue = getNestedValue(original, field);
    return currentValue !== originalValue;
  });
};

// Get nested object value by path
const getNestedValue = (obj: any, path: string): any => {
  return path.split('.').reduce((current, key) => current?.[key], obj);
};

// Format date for input
export const formatDateForInput = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

// Safe string trim
export const safeTrim = (value: any): string => {
  return typeof value === 'string' ? value.trim() : '';
};

// Debounce function for form validation
export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};