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
//#endregion
//#region version 02
// "use client";

// import { useEffect, useState } from "react";
// import { CalendarIcon, Loader2, Save, RotateCcw, AlertCircle } from "lucide-react";
// import { AvatarUploader } from "@/components/profile/avatar-upload";
// import { ProfileField } from "@/components/profile/profile-field";
// // import { AddressFields } from "@/components/profile/address-fields";
// // import { useProfile, useUpdateProfile } from "@/hooks/profile/useProfile";
// // import { validateProfile, formatPhoneNumber, formatDateForInput } from "@/utils/profile.utils";
// import type { IInfo } from "@/interface/auth/auth.interface";
// import { toast } from "sonner";
// import { useProfile, useUpdateProfile } from "@/hooks/profile/profile.hooks";
// import { formatDateForInput } from "@/util/profile.utils";
// import { AddressFields } from "@/components/profile/profile/address fields";

// const FormProfile = () => {
//   // API hooks
//   const { data: profileResponse, isLoading: profileLoading, error: profileError } = useProfile();
//   const updateMutation = useUpdateProfile();

//   // Form state
//   const [formData, setFormData] = useState({
//     name: '',
//     phone: '',
//     birthday: '',
//     gender: '',
//     address: {
//       province: '',
//       district: '',
//       ward: '',
//       detail: '',
//     },
//   });

//   const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
//   const [isChanged, setIsChanged] = useState(false);
//   const [originalData, setOriginalData] = useState<typeof formData | null>(null);

//   // Initialize form data when profile loads
//   useEffect(() => {
//     if (profileResponse?.data?.info) {
//       const info = profileResponse.data.info;
//       const initialData = {
//         name: info.name || '',
//         phone: info.phone || '',
//         birthday: formatDateForInput(info.birthday || ''),
//         gender: info.gender || '',
//         address: {
//           province: info.address?.provinceName || '',
//           district: '', // Will be populated by AddressFields
//           ward: info.address?.wardName || '',
//           detail: info.address?.street || '',
//         },
//       };
      
//       setFormData(initialData);
//       setOriginalData(initialData);
//     }
//   }, [profileResponse]);

//   // Track form changes
//   useEffect(() => {
//     if (originalData) {
//       const hasChanges = JSON.stringify(formData) !== JSON.stringify(originalData);
//       setIsChanged(hasChanges);
//     }
//   }, [formData, originalData]);

//   // Form field updaters
//   const updateField = (field: keyof typeof formData, value: any) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
    
//     // Clear validation error when field is updated
//     if (validationErrors[field]) {
//       setValidationErrors(prev => {
//         const newErrors = { ...prev };
//         delete newErrors[field];
//         return newErrors;
//       });
//     }
//   };

//   const updateAddressField = (field: keyof typeof formData.address, value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       address: { ...prev.address, [field]: value }
//     }));
//   };

//   // Handle address change from AddressFields component
//   const handleAddressChange = (addressData: {
//     province: string;
//     district: string;
//     ward: string;
//     detail: string;
//   }) => {
//     setFormData(prev => ({ ...prev, address: addressData }));
//   };

//   // Validate form
//   const validateForm = () => {
//     const validation = validateProfile({
//       name: formData.name,
//       phone: formData.phone,
//       birthday: formData.birthday,
//       gender: formData.gender,
//     });

//     setValidationErrors(validation.errors);
//     return validation.isValid;
//   };

//   // Submit form
//   const handleSubmit = async () => {
//     if (!validateForm()) {
//       toast.error('Vui lòng kiểm tra lại thông tin');
//       return;
//     }

//     try {
//       // Prepare API data
//       const apiData: IInfo = {
//         name: formData.name.trim(),
//         phone: formData.phone ? formatPhoneNumber(formData.phone) : undefined,
//         gender: formData.gender || undefined,
//         birthday: formData.birthday || undefined,
//         address: formData.address.province ? {
//           provinceName: formData.address.province,
//           wardName: formData.address.ward,
//           street: formData.address.detail.trim(),
//           // Note: provinceId và wardId sẽ cần được resolve từ API
//         } : undefined,
//       };

//       // Remove undefined fields
//       Object.keys(apiData).forEach(key => {
//         if (apiData[key as keyof IInfo] === undefined) {
//           delete apiData[key as keyof IInfo];
//         }
//       });

//       await updateMutation.mutateAsync(apiData);
      
//       // Update original data to reflect saved state
//       setOriginalData({ ...formData });
//       setIsChanged(false);
      
//     } catch (error) {
//       console.error('Submit error:', error);
//     }
//   };

//   // Reset form
//   const handleReset = () => {
//     if (originalData) {
//       setFormData({ ...originalData });
//       setValidationErrors({});
//       setIsChanged(false);
//     }
//   };

//   // Loading state
//   if (profileLoading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="text-center">
//           <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-blue-600" />
//           <p className="text-gray-500">Đang tải thông tin...</p>
//         </div>
//       </div>
//     );
//   }

//   // Error state
//   if (profileError) {
//     return (
//       <div className="text-center py-8">
//         <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
//         <p className="text-red-600 mb-4">Không thể tải thông tin cá nhân</p>
//         <button 
//           onClick={() => window.location.reload()}
//           className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//         >
//           Thử lại
//         </button>
//       </div>
//     );
//   }

//   const currentUser = profileResponse?.data;

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-semibold text-gray-900">Thông tin cá nhân</h1>
//         <div className="text-sm text-gray-500">
//           Email: <span className="font-medium">{currentUser?.email}</span>
//         </div>
//       </div>

//       {/* Form */}
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//         <div className="p-6">
//           <div className="flex flex-col lg:flex-row gap-8">
//             {/* Avatar Section */}
//             <div className="flex-shrink-0">
//               <AvatarUploader 
//                 currentAvatar={currentUser?.info?.avatar}
//                 onAvatarChange={(avatarUrl) => {
//                   // Handle avatar upload separately if needed
//                   console.log('Avatar changed:', avatarUrl);
//                 }}
//               />
//             </div>

//             {/* Form Fields */}
//             <div className="flex-1 space-y-6">
//               {/* Basic Information */}
//               <div>
//                 <h3 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b">
//                   Thông tin cơ bản
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <ProfileField 
//                     label="Họ và tên" 
//                     required 
//                     error={validationErrors.name}
//                   >
//                     <input
//                       type="text"
//                       className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//                         validationErrors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
//                       }`}
//                       value={formData.name}
//                       onChange={(e) => updateField('name', e.target.value)}
//                       placeholder="Nhập họ và tên"
//                       maxLength={50}
//                     />
//                   </ProfileField>

//                   <ProfileField 
//                     label="Số điện thoại" 
//                     error={validationErrors.phone}
//                   >
//                     <input
//                       type="tel"
//                       className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//                         validationErrors.phone ? 'border-red-300 bg-red-50' : 'border-gray-300'
//                       }`}
//                       value={formData.phone}
//                       onChange={(e) => updateField('phone', e.target.value)}
//                       placeholder="Nhập số điện thoại"
//                     />
//                   </ProfileField>

//                   <ProfileField 
//                     label="Ngày sinh" 
//                     error={validationErrors.birthday}
//                   >
//                     <div className="relative">
//                       <input
//                         type="date"
//                         className={`w-full border rounded-lg px-3 py-2 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//                           validationErrors.birthday ? 'border-red-300 bg-red-50' : 'border-gray-300'
//                         }`}
//                         value={formData.birthday}
//                         onChange={(e) => updateField('birthday', e.target.value)}
//                         max={new Date().toISOString().split('T')[0]}
//                       />
//                       <CalendarIcon className="absolute right-3 top-2.5 text-gray-400 pointer-events-none" size={18} />
//                     </div>
//                   </ProfileField>

//                   <ProfileField 
//                     label="Giới tính" 
//                     error={validationErrors.gender}
//                   >
//                     <select
//                       className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
//                         validationErrors.gender ? 'border-red-300 bg-red-50' : 'border-gray-300'
//                       }`}
//                       value={formData.gender}
//                       onChange={(e) => updateField('gender', e.target.value)}
//                     >
//                       <option value="">Chọn giới tính</option>
//                       <option value="Nam">Nam</option>
//                       <option value="Nữ">Nữ</option>
//                       <option value="Khác">Khác</option>
//                     </select>
//                   </ProfileField>
//                 </div>
//               </div>

//               {/* Account Information */}
//               <div>
//                 <h3 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b">
//                   Thông tin tài khoản
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <ProfileField 
//                     label="Email" 
//                     description="Email không thể thay đổi"
//                   >
//                     <input
//                       type="email"
//                       className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 text-gray-500 cursor-not-allowed"
//                       value={currentUser?.email || ''}
//                       disabled
//                     />
//                   </ProfileField>

//                   <ProfileField 
//                     label="Điểm tích lũy" 
//                     description="Được cập nhật tự động từ hệ thống"
//                   >
//                     <input
//                       type="text"
//                       className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50 text-gray-500 cursor-not-allowed"
//                       value={`${currentUser?.info?.point || 0} điểm`}
//                       disabled
//                     />
//                   </ProfileField>
//                 </div>
//               </div>

//               {/* Address Information */}
//               <div>
//                 <h3 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b">
//                   Địa chỉ
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <AddressFields
//                     onChange={handleAddressChange}
//                     initialValue={formData.address}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Action Bar */}
//         <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
//           <div className="flex items-center justify-between">
//             <button
//               type="button"
//               onClick={handleReset}
//               disabled={!isChanged || updateMutation.isPending}
//               className="flex items-center gap-2 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//             >
//               <RotateCcw size={16} />
//               Hoàn tác
//             </button>

//             <div className="flex items-center gap-4">
//               {isChanged && (
//                 <span className="text-sm text-amber-600 flex items-center gap-1">
//                   <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
//                   Có thay đổi chưa lưu
//                 </span>
//               )}
              
//               <button
//                 type="button"
//                 onClick={handleSubmit}
//                 disabled={!isChanged || updateMutation.isPending || Object.keys(validationErrors).length > 0}
//                 className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors min-w-[120px]"
//               >
//                 {updateMutation.isPending ? (
//                   <>
//                     <Loader2 size={16} className="animate-spin" />
//                     Đang lưu...
//                   </>
//                 ) : (
//                   <>
//                     <Save size={16} />
//                     Lưu thay đổi
//                   </>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FormProfile;
//#endregion
// "use client"

// import { useState, useEffect } from "react"
// import { Skeleton } from "@/components/ui/skeleton"
// import { Card, CardContent } from "@/components/ui/card"
// import { UserProfileHeader } from "@/components/profile/UserProfileHeader"
// import { UserProfileForm } from "@/components/profile/UserProfileForm"

// const mockUserData = {
//   _id: "user123",
//   name: "Nguyễn Huỳnh Phú Quý",
//   phone: "085910072",
//   address: "Chung cư Thái An",
//   avatar: "12.jpg",
//   gender: "male" as const,
//   birth: "2004-01-23",
// }

// type UserData = typeof mockUserData

// export default function UserProfilePage() {
//   const [userData, setUserData] = useState<UserData | null>(null)
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         // Replace with actual API call
//         await new Promise((resolve) => setTimeout(resolve, 1000))
//         setUserData(mockUserData)
//       } catch (error) {
//         console.error("Failed to fetch user data:", error)
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchUserData()
//   }, [])

//   const handleProfileUpdate = async (formData: Partial<UserData>) => {
//     try {
//       const response = await fetch("/api/user/profile", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       })

//       if (!response.ok) {
//         throw new Error("Failed to update profile")
//       }

//       const updatedData = await response.json()
//       setUserData(updatedData)
//     } catch (error) {
//       console.error("Profile update error:", error)
//       throw error
//     }
//   }

//   if (isLoading) {
//     return <UserProfileSkeleton />
//   }

//   if (!userData) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//         <Card className="p-6 text-center max-w-md w-full">
//           <CardContent>
//             <p className="text-red-600">Không thể tải thông tin cá nhân. Vui lòng thử lại.</p>
//           </CardContent>
//         </Card>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="container mx-auto px-4 py-8 max-w-2xl">
//         <div className="mb-8 text-center">
//           <h1 className="text-3xl font-bold text-blue-900 mb-2">Thông tin cá nhân</h1>
//           <p className="text-gray-600">Quản lý thông tin tài khoản của bạn</p>
//         </div>

//         <UserProfileHeader avatar={userData.avatar} name={userData.name} phone={userData.phone} />

//         <UserProfileForm defaultValues={userData} onSubmit={handleProfileUpdate} />
//       </div>
//     </div>
//   )
// }

// function UserProfileSkeleton() {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="container mx-auto px-4 py-8 max-w-2xl">
//         <div className="mb-8 text-center">
//           <Skeleton className="h-8 w-64 mx-auto mb-2" />
//           <Skeleton className="h-4 w-48 mx-auto" />
//         </div>

//         <Card className="p-6 mb-6 bg-white">
//           <div className="flex flex-col items-center gap-4">
//             <Skeleton className="h-24 w-24 rounded-full" />
//             <div className="text-center space-y-2">
//               <Skeleton className="h-6 w-48" />
//               <Skeleton className="h-4 w-32" />
//             </div>
//           </div>
//         </Card>

//         <Card className="bg-white">
//           <div className="p-6 space-y-4">
//             {[1, 2, 3, 4, 5].map((i) => (
//               <div key={i} className="space-y-2">
//                 <Skeleton className="h-4 w-24" />
//                 <Skeleton className="h-10 w-full" />
//               </div>
//             ))}
//           </div>
//         </Card>
//       </div>
//     </div>
//   )
// }
"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { UserProfileHeader } from "@/components/profile/UserProfileHeader"
import { UserProfileForm } from "@/components/profile/UserProfileForm"
import { useProfile } from "@/hooks/profile/profile.hooks"
import { normalizeUserData } from "@/interface/auth/auth.interface"
import { AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function UserProfilePage() {
  const { 
    data: profileData, 
    isLoading, 
    error, 
    refetch,
    isRefetching 
  } = useProfile()

  const handleRefresh = () => {
    refetch()
  }

  if (isLoading) {
    return <UserProfileSkeleton />
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="p-6 text-center max-w-md w-full">
          <CardContent className="space-y-4">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Không thể tải thông tin cá nhân
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {error.message || "Đã xảy ra lỗi. Vui lòng thử lại."}
              </p>
              <Button 
                onClick={handleRefresh}
                disabled={isRefetching}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isRefetching ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Đang tải...
                  </>
                ) : (
                  "Thử lại"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!profileData?.data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="p-6 text-center max-w-md w-full">
          <CardContent>
            <p className="text-red-600">Không tìm thấy thông tin cá nhân.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const userData = profileData.data
  const normalizedData = normalizeUserData(userData)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">Thông tin cá nhân</h1>
          <p className="text-gray-600">Quản lý thông tin tài khoản của bạn</p>
        </div>

        <UserProfileHeader 
          avatar={normalizedData.avatar} 
          name={normalizedData.name || "Chưa cập nhật"} 
          phone={normalizedData.phone || "Chưa cập nhật"} 
        />

        <UserProfileForm 
          defaultValues={{
            name: normalizedData.name,
            phone: normalizedData.phone,
            address: normalizedData.address || '',
            avatar: normalizedData.avatar || '',
            gender: (normalizedData.gender as "male" | "female") || "male",
            birth: normalizedData.birthday,
          }}
        />
      </div>
    </div>
  )
}

function UserProfileSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="mb-8 text-center">
          <Skeleton className="h-8 w-64 mx-auto mb-2" />
          <Skeleton className="h-4 w-48 mx-auto" />
        </div>

        {/* Header skeleton */}
        <Card className="p-6 mb-6 bg-white">
          <div className="flex flex-col items-center gap-4">
            <Skeleton className="h-24 w-24 rounded-full" />
            <div className="text-center space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-40" />
            </div>
          </div>
        </Card>

        {/* Form skeleton */}
        <Card className="bg-white">
          <div className="p-6 space-y-6">
            {/* Basic info section */}
            <div className="space-y-4">
              <Skeleton className="h-6 w-32" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            </div>

            {/* Personal info section */}
            <div className="space-y-4">
              <Skeleton className="h-6 w-40" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            </div>

            {/* Address section */}
            <div className="space-y-4">
              <Skeleton className="h-6 w-24" />
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
// "use client"

// import { Skeleton } from "@/components/ui/skeleton"
// import { Card, CardContent } from "@/components/ui/card"
// import { UserProfileHeader } from "@/components/profile/UserProfileHeader"
// import { UserProfileForm } from "@/components/profile/UserProfileForm"
// import { useProfile } from "@/hooks/profile/profile.hooks"
// import { toast } from "sonner"
// import { AlertCircle, RefreshCw } from "lucide-react"
// import { Button } from "@/components/ui/button"

// export default function UserProfilePage() {
//   const { 
//     data: profileData, 
//     isLoading, 
//     error, 
//     refetch,
//     isRefetching 
//   } = useProfile()

//   const handleRefresh = () => {
//     refetch()
//   }

//   if (isLoading) {
//     return <UserProfileSkeleton />
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//         <Card className="p-6 text-center max-w-md w-full">
//           <CardContent className="space-y-4">
//             <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
//             <div>
//               <h3 className="font-semibold text-gray-900 mb-2">
//                 Không thể tải thông tin cá nhân
//               </h3>
//               <p className="text-gray-600 text-sm mb-4">
//                 {error.message || "Đã xảy ra lỗi. Vui lòng thử lại."}
//               </p>
//               <Button 
//                 onClick={handleRefresh}
//                 disabled={isRefetching}
//                 className="bg-blue-600 hover:bg-blue-700"
//               >
//                 {isRefetching ? (
//                   <>
//                     <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
//                     Đang tải...
//                   </>
//                 ) : (
//                   "Thử lại"
//                 )}
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     )
//   }

//   if (!profileData?.data) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
//         <Card className="p-6 text-center max-w-md w-full">
//           <CardContent>
//             <p className="text-red-600">Không tìm thấy thông tin cá nhân.</p>
//           </CardContent>
//         </Card>
//       </div>
//     )
//   }

//   const userData = profileData.data
//   const userInfo = userData.info || {}

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="container mx-auto px-4 py-8 max-w-2xl">
//         <div className="mb-8 text-center">
//           <h1 className="text-3xl font-bold text-blue-900 mb-2">Thông tin cá nhân</h1>
//           <p className="text-gray-600">Quản lý thông tin tài khoản của bạn</p>
//         </div>

//         <UserProfileHeader 
//           avatar={userInfo.avatar} 
//           name={userInfo.name || "Chưa cập nhật"} 
//           phone={userInfo.phone || "Chưa cập nhật"} 
//           email={userData.email}
//         />

//         <UserProfileForm 
//           defaultValues={{
//             name: userInfo.name || '',
//             phone: userInfo.phone || '',
//             email: userData.email || '',
//             gender: userInfo.gender || '',
//             birthday: userInfo.birthday || '',
//             address: {
//               province: userInfo.address?.provinceName || '',
//               district: '', // Will be populated from API
//               ward: userInfo.address?.wardName || '',
//               detail: userInfo.address?.street || '',
//             }
//           }}
//           initialData={userInfo}
//         />
//       </div>
//     </div>
//   )
// }

// function UserProfileSkeleton() {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <div className="container mx-auto px-4 py-8 max-w-2xl">
//         <div className="mb-8 text-center">
//           <Skeleton className="h-8 w-64 mx-auto mb-2" />
//           <Skeleton className="h-4 w-48 mx-auto" />
//         </div>

//         {/* Header skeleton */}
//         <Card className="p-6 mb-6 bg-white">
//           <div className="flex flex-col items-center gap-4">
//             <Skeleton className="h-24 w-24 rounded-full" />
//             <div className="text-center space-y-2">
//               <Skeleton className="h-6 w-48" />
//               <Skeleton className="h-4 w-32" />
//               <Skeleton className="h-4 w-40" />
//             </div>
//           </div>
//         </Card>

//         {/* Form skeleton */}
//         <Card className="bg-white">
//           <div className="p-6 space-y-6">
//             {/* Basic info section */}
//             <div className="space-y-4">
//               <Skeleton className="h-6 w-32" />
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Skeleton className="h-4 w-16" />
//                   <Skeleton className="h-10 w-full" />
//                 </div>
//                 <div className="space-y-2">
//                   <Skeleton className="h-4 w-20" />
//                   <Skeleton className="h-10 w-full" />
//                 </div>
//               </div>
//             </div>

//             {/* Personal info section */}
//             <div className="space-y-4">
//               <Skeleton className="h-6 w-40" />
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-2">
//                   <Skeleton className="h-4 w-20" />
//                   <Skeleton className="h-10 w-full" />
//                 </div>
//                 <div className="space-y-2">
//                   <Skeleton className="h-4 w-16" />
//                   <Skeleton className="h-10 w-full" />
//                 </div>
//               </div>
//             </div>

//             {/* Address section */}
//             <div className="space-y-4">
//               <Skeleton className="h-6 w-24" />
//               <div className="space-y-4">
//                 {[1, 2, 3, 4].map((i) => (
//                   <div key={i} className="space-y-2">
//                     <Skeleton className="h-4 w-24" />
//                     <Skeleton className="h-10 w-full" />
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Buttons */}
//             <div className="flex gap-4 pt-4">
//               <Skeleton className="h-10 w-24" />
//               <Skeleton className="h-10 w-32" />
//             </div>
//           </div>
//         </Card>
//       </div>
//     </div>
//   )
// }