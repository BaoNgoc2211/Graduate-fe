// "use client"

// import { useForm, Controller } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { z } from "zod"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Textarea } from "@/components/ui/textarea"
// import { UserAvatarUpload } from "./UserAvatarUpload"
// import { toast } from "sonner"
// import { useState } from "react"
// import { Loader2, Save, User, Phone, MapPin, Calendar } from "lucide-react"

// const profileSchema = z.object({
//   name: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
//   phone: z.string().min(10, "Số điện thoại không hợp lệ"),
//   address: z.string().min(5, "Địa chỉ phải có ít nhất 5 ký tự"),
//   avatar: z.string().optional(),
//   gender: z.enum(["male", "female"]),
//   birth: z.string().min(1, "Vui lòng chọn ngày sinh"),
// })

// type ProfileFormData = z.infer<typeof profileSchema>

// interface UserProfileFormProps {
//   defaultValues?: Partial<ProfileFormData>
//   onSubmit: (data: ProfileFormData) => Promise<void>
// }

// export function UserProfileForm({ defaultValues, onSubmit }: UserProfileFormProps) {
//   const [isSubmitting, setIsSubmitting] = useState(false)

//   const {
//     register,
//     control,
//     handleSubmit,
//     setValue,
//     watch,
//     formState: { errors, isDirty },
//   } = useForm<ProfileFormData>({
//     resolver: zodResolver(profileSchema),
//     defaultValues: {
//       name: "",
//       phone: "",
//       address: "",
//       avatar: "",
//       gender: "male",
//       birth: "",
//       ...defaultValues,
//     },
//   })

//   const watchedAvatar = watch("avatar")
//   const watchedName = watch("name")

//   const handleFormSubmit = async (data: ProfileFormData) => {
//     setIsSubmitting(true)
//     try {
//       await onSubmit(data)
//       toast.success("Cập nhật thông tin thành công!")
//     } catch (error) {
//       toast.error("Cập nhật thất bại. Vui lòng thử lại.")
//       console.error("Profile update error:", error)
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
//       {/* Avatar Section */}
//       <Card className="bg-white border-0 shadow-sm">
//         <CardHeader className="pb-4">
//           <CardTitle className="flex items-center gap-2 text-blue-900">
//             <User className="h-5 w-5" />
//             Ảnh đại diện
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <UserAvatarUpload
//             currentAvatar={watchedAvatar}
//             name={watchedName || "User"}
//             onAvatarChange={(avatar) => setValue("avatar", avatar, { shouldDirty: true })}
//           />
//         </CardContent>
//       </Card>

//       {/* Personal Information */}
//       <Card className="bg-white border-0 shadow-sm">
//         <CardHeader className="pb-4">
//           <CardTitle className="flex items-center gap-2 text-blue-900">
//             <User className="h-5 w-5" />
//             Thông tin cá nhân
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="space-y-4">
//           {/* Full Name */}
//           <div className="space-y-2">
//             <Label htmlFor="name" className="flex items-center gap-2 text-gray-700">
//               <User className="h-4 w-4" />
//               Họ và tên *
//             </Label>
//             <Input
//               id="name"
//               {...register("name")}
//               placeholder="Nhập họ và tên"
//               className={`border-gray-200 focus:border-blue-500 focus:ring-blue-500 ${
//                 errors.name ? "border-red-500" : ""
//               }`}
//             />
//             {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
//           </div>

//           {/* Phone Number */}
//           <div className="space-y-2">
//             <Label htmlFor="phone" className="flex items-center gap-2 text-gray-700">
//               <Phone className="h-4 w-4" />
//               Số điện thoại *
//             </Label>
//             <Input
//               id="phone"
//               {...register("phone")}
//               type="tel"
//               placeholder="Nhập số điện thoại"
//               className={`border-gray-200 focus:border-blue-500 focus:ring-blue-500 ${
//                 errors.phone ? "border-red-500" : ""
//               }`}
//             />
//             {errors.phone && <p className="text-sm text-red-600">{errors.phone.message}</p>}
//           </div>

//           {/* Gender */}
//           <div className="space-y-2">
//             <Label className="flex items-center gap-2 text-gray-700">
//               <User className="h-4 w-4" />
//               Giới tính *
//             </Label>
//             <Controller
//               name="gender"
//               control={control}
//               render={({ field }) => (
//                 <Select value={field.value} onValueChange={field.onChange}>
//                   <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-blue-500">
//                     <SelectValue placeholder="Chọn giới tính" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="male">Nam</SelectItem>
//                     <SelectItem value="female">Nữ</SelectItem>
//                   </SelectContent>
//                 </Select>
//               )}
//             />
//           </div>

//           {/* Date of Birth */}
//           <div className="space-y-2">
//             <Label htmlFor="birth" className="flex items-center gap-2 text-gray-700">
//               <Calendar className="h-4 w-4" />
//               Ngày sinh *
//             </Label>
//             <Input
//               id="birth"
//               {...register("birth")}
//               type="date"
//               className={`border-gray-200 focus:border-blue-500 focus:ring-blue-500 ${
//                 errors.birth ? "border-red-500" : ""
//               }`}
//             />
//             {errors.birth && <p className="text-sm text-red-600">{errors.birth.message}</p>}
//           </div>
//         </CardContent>
//       </Card>

//       {/* Address Information */}
//       <Card className="bg-white border-0 shadow-sm">
//         <CardHeader className="pb-4">
//           <CardTitle className="flex items-center gap-2 text-blue-900">
//             <MapPin className="h-5 w-5" />
//             Địa chỉ
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-2">
//             <Label htmlFor="address" className="flex items-center gap-2 text-gray-700">
//               <MapPin className="h-4 w-4" />
//               Địa chỉ *
//             </Label>
//             <Textarea
//               id="address"
//               {...register("address")}
//               placeholder="Nhập địa chỉ đầy đủ"
//               rows={3}
//               className={`resize-none border-gray-200 focus:border-blue-500 focus:ring-blue-500 ${
//                 errors.address ? "border-red-500" : ""
//               }`}
//             />
//             {errors.address && <p className="text-sm text-red-600">{errors.address.message}</p>}
//           </div>
//         </CardContent>
//       </Card>

//       {/* Form Actions */}
//       <Card className="bg-white border-0 shadow-sm">
//         <CardContent className="pt-6">
//           <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
//             <Button
//               type="button"
//               variant="outline"
//               onClick={() => window.location.reload()}
//               disabled={isSubmitting}
//               className="border-gray-200 text-gray-700 hover:bg-gray-50"
//             >
//               Hủy bỏ
//             </Button>
//             <Button
//               type="submit"
//               disabled={isSubmitting || !isDirty}
//               className="bg-blue-900 hover:bg-blue-800 text-white"
//             >
//               {isSubmitting ? (
//                 <>
//                   <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                   Đang lưu...
//                 </>
//               ) : (
//                 <>
//                   <Save className="h-4 w-4 mr-2" />
//                   Lưu thay đổi
//                 </>
//               )}
//             </Button>
//           </div>
//           {isDirty && (
//             <p className="text-sm text-amber-600 mt-2 text-center sm:text-right">Bạn có thay đổi chưa được lưu</p>
//           )}
//         </CardContent>
//       </Card>
//     </form>
//   )
// }
"use client"

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { UserAvatarUpload } from "./UserAvatarUpload"
import { toast } from "sonner"
import { useState } from "react"
import { Loader2, Save, User, Phone, MapPin, Calendar } from "lucide-react"
import { useUpdateProfile } from "@/hooks/profile/profile.hooks"
import type { IProfileFormData } from "@/interface/auth/auth.interface"

// Schema validation cho form
const profileSchema = z.object({
  name: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
  phone: z.string().min(10, "Số điện thoại không hợp lệ"),
  address: z.string().min(5, "Địa chỉ phải có ít nhất 5 ký tự"),
  avatar: z.string().optional(),
  gender: z.enum(["male", "female"]),
  birth: z.string().min(1, "Vui lòng chọn ngày sinh"),
})

interface UserProfileFormProps {
  defaultValues?: Partial<IProfileFormData>
  // Không cần initialData nữa vì sẽ dùng react-hook-form
}

export function UserProfileForm({ defaultValues }: UserProfileFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const updateMutation = useUpdateProfile()

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isDirty },
  } = useForm<IProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      avatar: "",
      gender: "male",
      birth: "",
      ...defaultValues,
    },
  })

  const watchedAvatar = watch("avatar")
  const watchedName = watch("name")

  const handleFormSubmit = async (data: IProfileFormData) => {
    setIsSubmitting(true)
    try {
      // Transform form data to API format
      const apiData = {
        name: data.name.trim(),
        phone: data.phone.trim(),
        gender: data.gender,
        birthday: data.birth, // Map birth to birthday
        avatar: data.avatar,
        address: {
          street: data.address.trim(), // Flat address to structured format
        },
      }

      // Remove empty fields
      Object.keys(apiData).forEach(key => {
        const value = apiData[key as keyof typeof apiData]
        if (value === '' || value === undefined || value === null) {
          delete apiData[key as keyof typeof apiData]
        }
      })

      await updateMutation.mutateAsync(apiData)
      toast.success("Cập nhật thông tin thành công!")
    } catch (error) {
      toast.error("Cập nhật thất bại. Vui lòng thử lại.")
      console.error("Profile update error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReset = () => {
    reset(defaultValues)
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Avatar Section */}
      <Card className="bg-white border-0 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <User className="h-5 w-5" />
            Ảnh đại diện
          </CardTitle>
        </CardHeader>
        <CardContent>
          <UserAvatarUpload
            currentAvatar={watchedAvatar}
            name={watchedName || "User"}
            onAvatarChange={(avatar) => setValue("avatar", avatar, { shouldDirty: true })}
          />
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card className="bg-white border-0 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <User className="h-5 w-5" />
            Thông tin cá nhân
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2 text-gray-700">
              <User className="h-4 w-4" />
              Họ và tên *
            </Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Nhập họ và tên"
              className={`border-gray-200 focus:border-blue-500 focus:ring-blue-500 ${
                errors.name ? "border-red-500" : ""
              }`}
            />
            {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2 text-gray-700">
              <Phone className="h-4 w-4" />
              Số điện thoại *
            </Label>
            <Input
              id="phone"
              {...register("phone")}
              type="tel"
              placeholder="Nhập số điện thoại"
              className={`border-gray-200 focus:border-blue-500 focus:ring-blue-500 ${
                errors.phone ? "border-red-500" : ""
              }`}
            />
            {errors.phone && <p className="text-sm text-red-600">{errors.phone.message}</p>}
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2 text-gray-700">
              <User className="h-4 w-4" />
              Giới tính *
            </Label>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder="Chọn giới tính" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Nam</SelectItem>
                    <SelectItem value="female">Nữ</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* Date of Birth */}
          <div className="space-y-2">
            <Label htmlFor="birth" className="flex items-center gap-2 text-gray-700">
              <Calendar className="h-4 w-4" />
              Ngày sinh *
            </Label>
            <Input
              id="birth"
              {...register("birth")}
              type="date"
              className={`border-gray-200 focus:border-blue-500 focus:ring-blue-500 ${
                errors.birth ? "border-red-500" : ""
              }`}
            />
            {errors.birth && <p className="text-sm text-red-600">{errors.birth.message}</p>}
          </div>
        </CardContent>
      </Card>

      {/* Address Information */}
      <Card className="bg-white border-0 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-blue-900">
            <MapPin className="h-5 w-5" />
            Địa chỉ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="address" className="flex items-center gap-2 text-gray-700">
              <MapPin className="h-4 w-4" />
              Địa chỉ *
            </Label>
            <Textarea
              id="address"
              {...register("address")}
              placeholder="Nhập địa chỉ đầy đủ"
              rows={3}
              className={`resize-none border-gray-200 focus:border-blue-500 focus:ring-blue-500 ${
                errors.address ? "border-red-500" : ""
              }`}
            />
            {errors.address && <p className="text-sm text-red-600">{errors.address.message}</p>}
          </div>
        </CardContent>
      </Card>

      {/* Error Display */}
      {updateMutation.error && (
        <Card className="bg-red-50 border-red-200">
          <CardContent className="pt-6">
            <p className="text-sm text-red-600">
              {updateMutation.error.message || 'Đã xảy ra lỗi. Vui lòng thử lại.'}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Form Actions */}
      <Card className="bg-white border-0 shadow-sm">
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              disabled={isSubmitting || !isDirty}
              className="border-gray-200 text-gray-700 hover:bg-gray-50"
            >
              Hủy bỏ
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || !isDirty || updateMutation.isPending}
              className="bg-blue-900 hover:bg-blue-800 text-white"
            >
              {isSubmitting || updateMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Đang lưu...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Lưu thay đổi
                </>
              )}
            </Button>
          </div>
          {isDirty && (
            <p className="text-sm text-amber-600 mt-2 text-center sm:text-right">
              Bạn có thay đổi chưa được lưu
            </p>
          )}
        </CardContent>
      </Card>
    </form>
  )
}