//#region original
// "use client";

// import { useState } from "react";
// import { CalendarIcon } from "lucide-react";
// import { AvatarUploader } from "@/components/profile/avatar-upload";
// import { ProfileField } from "@/components/profile/profile-field";

// const FormProfile = () => {
//   const [name, setName] = useState("Khách hàng");
//   const [birthday, setBirthday] = useState("");
//   const [gender, setGender] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [phone, setPhone] = useState("***** ***446");

//   const isDirty =
//     name !== "Khách hàng" ||
//     birthday !== "" ||
//     gender !== "" ||
//     email !== "" ||
//     password !== "";

//   return (
//     <div>
//       <h1 className="text-xl font-semibold mb-6">Thông tin cá nhân</h1>
//       <div className="bg-white rounded-lg p-6 shadow-sm flex flex-col lg:flex-row gap-10">
//         <AvatarUploader />

//         <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
//           <ProfileField label="Họ và tên">
//             <input
//               type="text"
//               className="w-full border border-gray-300 rounded px-3 py-2"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//           </ProfileField>

//           <ProfileField label="Số điện thoại">
//             <input
//               type="text"
//               className="w-full border border-gray-300 rounded px-3 py-2"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//             />
//           </ProfileField>

//           <ProfileField label="Ngày sinh">
//             <div className="relative">
//               <input
//                 type="date"
//                 className="w-full border border-gray-300 rounded px-3 py-2 pr-10"
//                 value={birthday}
//                 onChange={(e) => setBirthday(e.target.value)}
//               />
//               <CalendarIcon
//                 className="absolute right-3 top-2.5 text-gray-400"
//                 size={18}
//               />
//             </div>
//           </ProfileField>

//           <ProfileField label="Email">
//             <input
//               type="email"
//               className="w-full border border-gray-300 rounded px-3 py-2"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </ProfileField>

//           <ProfileField label="Giới tính">
//             <select
//               className="w-full border border-gray-300 rounded px-3 py-2"
//               value={gender}
//               onChange={(e) => setGender(e.target.value)}
//             >
//               <option value="">Chọn</option>
//               <option>Nam</option>
//               <option>Nữ</option>
//               <option>Khác</option>
//             </select>
//           </ProfileField>

//           <ProfileField label="Mật khẩu">
//             <input
//               type="password"
//               className="w-full border border-gray-300 rounded px-3 py-2"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </ProfileField>

//         </div>
//       </div>

//       <div className="mt-6">
//         <button
//           className={`px-4 py-2 rounded ${
//             isDirty ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-600"
//           }`}
//           disabled={!isDirty}
//         >
//           Lưu thay đổi
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FormProfile;
//#endregion
// "use client";

// import { useState } from "react";
// import { CalendarIcon } from "lucide-react";
// import { AvatarUploader } from "@/components/profile/avatar-upload";
// import { ProfileField } from "@/components/profile/profile-field";
// import { AddressFields } from "@/components/profile/profile/address fields";
// import { useCallback } from "react";
// const FormProfile = () => {
//   const [name, setName] = useState("Khách hàng");
//   const [birthday, setBirthday] = useState("");
//   const [gender, setGender] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [phone, setPhone] = useState("***** ***446");
//   const [address, setAddress] = useState({
//     province: "",
//     district: "",
//     ward: "",
//     detail: "",
//   });
//   const handleAddressChange = useCallback((val) => {
//     setAddress(val);
//   }, []);
//   const isDirty =
//     name !== "Khách hàng" ||
//     birthday !== "" ||
//     gender !== "" ||
//     email !== "" ||
//     password !== "" ||
//     address.province !== "" ||
//     address.district !== "" ||
//     address.ward !== "" ||
//     address.detail !== "";

//   return (
//     <div>
//       <h1 className="text-xl font-semibold mb-6">Thông tin cá nhân</h1>
//       <div className="bg-white rounded-lg p-6 shadow-sm flex flex-col lg:flex-row gap-10">
//         <AvatarUploader />

//         <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
//           <ProfileField label="Họ và tên">
//             <input
//               type="text"
//               className="w-full border border-gray-300 rounded px-3 py-2"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//           </ProfileField>

//           <ProfileField label="Số điện thoại">
//             <input
//               type="text"
//               className="w-full border border-gray-300 rounded px-3 py-2"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//             />
//           </ProfileField>

//           <ProfileField label="Ngày sinh">
//             <div className="relative">
//               <input
//                 type="date"
//                 className="w-full border border-gray-300 rounded px-3 py-2 pr-10"
//                 value={birthday}
//                 onChange={(e) => setBirthday(e.target.value)}
//               />
//               <CalendarIcon
//                 className="absolute right-3 top-2.5 text-gray-400"
//                 size={18}
//               />
//             </div>
//           </ProfileField>

//           <ProfileField label="Email">
//             <input
//               type="email"
//               className="w-full border border-gray-300 rounded px-3 py-2"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </ProfileField>

//           <ProfileField label="Giới tính">
//             <select
//               className="w-full border border-gray-300 rounded px-3 py-2"
//               value={gender}
//               onChange={(e) => setGender(e.target.value)}
//             >
//               <option value="">Chọn</option>
//               <option>Nam</option>
//               <option>Nữ</option>
//               <option>Khác</option>
//             </select>
//           </ProfileField>

//           <ProfileField label="Mật khẩu">
//             <input
//               type="password"
//               className="w-full border border-gray-300 rounded px-3 py-2"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </ProfileField>
//           <AddressFields onChange={handleAddressChange} />
//         </div>
//       </div>

//       <div className="mt-6">
//         <button
//           className={`px-4 py-2 rounded ${
//             isDirty ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-600"
//           }`}
//           disabled={!isDirty}
//         >
//           Lưu thay đổi
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FormProfile;

"use client";

import { useEffect, useState } from "react";
import { CalendarIcon, Loader2, Save, RotateCcw, AlertCircle } from "lucide-react";
import { AvatarUploader } from "@/components/profile/avatar-upload";
import { ProfileField } from "@/components/profile/profile-field";
// import { AddressFields } from "@/components/profile/address-fields";
// import { useProfile, useUpdateProfile } from "@/hooks/profile/useProfile";
// import { validateProfile, formatPhoneNumber, formatDateForInput } from "@/utils/profile.utils";
import type { IInfo } from "@/interface/auth/auth.interface";
import { toast } from "sonner";
import { useProfile, useUpdateProfile } from "@/hooks/profile/profile.hooks";
import { formatDateForInput } from "@/util/profile.utils";
import { AddressFields } from "@/components/profile/profile/address fields";

const FormProfile = () => {
  // API hooks
  const { data: profileResponse, isLoading: profileLoading, error: profileError } = useProfile();
  const updateMutation = useUpdateProfile();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    birthday: '',
    gender: '',
    address: {
      province: '',
      district: '',
      ward: '',
      detail: '',
    },
  });

  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
  const [isChanged, setIsChanged] = useState(false);
  const [originalData, setOriginalData] = useState<typeof formData | null>(null);

  // Initialize form data when profile loads
  useEffect(() => {
    if (profileResponse?.data?.info) {
      const info = profileResponse.data.info;
      const initialData = {
        name: info.name || '',
        phone: info.phone || '',
        birthday: formatDateForInput(info.birthday || ''),
        gender: info.gender || '',
        address: {
          province: info.address?.provinceName || '',
          district: '', // Will be populated by AddressFields
          ward: info.address?.wardName || '',
          detail: info.address?.street || '',
        },
      };
      
      setFormData(initialData);
      setOriginalData(initialData);
    }
  }, [profileResponse]);

  // Track form changes
  useEffect(() => {
    if (originalData) {
      const hasChanges = JSON.stringify(formData) !== JSON.stringify(originalData);
      setIsChanged(hasChanges);
    }
  }, [formData, originalData]);

  // Form field updaters
  const updateField = (field: keyof typeof formData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear validation error when field is updated
    if (validationErrors[field]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const updateAddressField = (field: keyof typeof formData.address, value: string) => {
    setFormData(prev => ({
      ...prev,
      address: { ...prev.address, [field]: value }
    }));
  };

  // Handle address change from AddressFields component
  const handleAddressChange = (addressData: {
    province: string;
    district: string;
    ward: string;
    detail: string;
  }) => {
    setFormData(prev => ({ ...prev, address: addressData }));
  };

  // Validate form
  const validateForm = () => {
    const validation = validateProfile({
      name: formData.name,
      phone: formData.phone,
      birthday: formData.birthday,
      gender: formData.gender,
    });

    setValidationErrors(validation.errors);
    return validation.isValid;
  };

  // Submit form
  const handleSubmit = async () => {
    if (!validateForm()) {
      toast.error('Vui lòng kiểm tra lại thông tin');
      return;
    }

    try {
      // Prepare API data
      const apiData: IInfo = {
        name: formData.name.trim(),
        phone: formData.phone ? formatPhoneNumber(formData.phone) : undefined,
        gender: formData.gender || undefined,
        birthday: formData.birthday || undefined,
        address: formData.address.province ? {
          provinceName: formData.address.province,
          wardName: formData.address.ward,
          street: formData.address.detail.trim(),
          // Note: provinceId và wardId sẽ cần được resolve từ API
        } : undefined,
      };

      // Remove undefined fields
      Object.keys(apiData).forEach(key => {
        if (apiData[key as keyof IInfo] === undefined) {
          delete apiData[key as keyof IInfo];
        }
      });

      await updateMutation.mutateAsync(apiData);
      
      // Update original data to reflect saved state
      setOriginalData({ ...formData });
      setIsChanged(false);
      
    } catch (error) {
      console.error('Submit error:', error);
    }
  };

  // Reset form
  const handleReset = () => {
    if (originalData) {
      setFormData({ ...originalData });
      setValidationErrors({});
      setIsChanged(false);
    }
  };

  // Loading state
  if (profileLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-blue-600" />
          <p className="text-gray-500">Đang tải thông tin...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (profileError) {
    return (
      <div className="text-center py-8">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <p className="text-red-600 mb-4">Không thể tải thông tin cá nhân</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Thử lại
        </button>
      </div>
    );
  }

  const currentUser = profileResponse?.data;

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Thông tin cá nhân</h1>
        <div className="text-sm text-gray-500">
          Email: <span className="font-medium">{currentUser?.email}</span>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Avatar Section */}
            <div className="flex-shrink-0">
              <AvatarUploader 
                currentAvatar={currentUser?.info?.avatar}
                onAvatarChange={(avatarUrl) => {
                  // Handle avatar upload separately if needed
                  console.log('Avatar changed:', avatarUrl);
                }}
              />
            </div>

            {/* Form Fields */}
            <div className="flex-1 space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b">
                  Thông tin cơ bản
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ProfileField 
                    label="Họ và tên" 
                    required 
                    error={validationErrors.name}
                  >
                    <input
                      type="text"
                      className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        validationErrors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      value={formData.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      placeholder="Nhập họ và tên"
                      maxLength={50}
                    />
                  </ProfileField>

                  <ProfileField 
                    label="Số điện thoại" 
                    error={validationErrors.phone}
                  >
                    <input
                      type="tel"
                      className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        validationErrors.phone ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      value={formData.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      placeholder="Nhập số điện thoại"
                    />
                  </ProfileField>

                  <ProfileField 
                    label="Ngày sinh" 
                    error={validationErrors.birthday}
                  >
                    <div className="relative">
                      <input
                        type="date"
                        className={`w-full border rounded-lg px-3 py-2 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          validationErrors.birthday ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                        value={formData.birthday}
                        onChange={(e) => updateField('birthday', e.target.value)}
                        max={new Date().toISOString().split('T')[0]}
                      />
                      <CalendarIcon className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" size={18} />
                    </div>
                  </ProfileField>

                  <ProfileField 
                    label="Giới tính" 
                    error={validationErrors.gender}
                  >
                    <select
                      className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        validationErrors.gender ? 'border-red-300 bg-red-50' : 'border-gray-300'
                      }`}
                      value={formData.gender}
                      onChange={(e) => updateField('gender', e.target.value)}
                    >
                      <option value="">Chọn giới tính</option>
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                      <option value="Khác">Khác</option>
                    </select>
                  </ProfileField>
                </div>
              </div>

              {/* Account Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b">
                  Thông tin tài khoản
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ProfileField 
                    label="Email" 
                    description="Email không thể thay đổi"
                  >
                    <input
                      type="email"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 text-gray-500 cursor-not-allowed"
                      value={currentUser?.email || ''}
                      disabled
                    />
                  </ProfileField>

                  <ProfileField 
                    label="Điểm tích lũy" 
                    description="Được cập nhật tự động từ hệ thống"
                  >
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 text-gray-500 cursor-not-allowed"
                      value={`${currentUser?.info?.point || 0} điểm`}
                      disabled
                    />
                  </ProfileField>
                </div>
              </div>

              {/* Address Information */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b">
                  Địa chỉ
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <AddressFields
                    onChange={handleAddressChange}
                    initialValue={formData.address}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleReset}
              disabled={!isChanged || updateMutation.isPending}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <RotateCcw size={16} />
              Hoàn tác
            </button>

            <div className="flex items-center gap-4">
              {isChanged && (
                <span className="text-sm text-amber-600 flex items-center gap-1">
                  <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                  Có thay đổi chưa lưu
                </span>
              )}
              
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!isChanged || updateMutation.isPending || Object.keys(validationErrors).length > 0}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-w-[120px]"
              >
                {updateMutation.isPending ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Đang lưu...
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    Lưu thay đổi
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormProfile;