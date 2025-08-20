// "use client"

// import type React from "react"

// import { useState, useRef } from "react"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Button } from "@/components/ui/button"
// import { Label } from "@/components/ui/label"
// import { Upload, X } from "lucide-react"
// import { toast } from "sonner"

// interface UserAvatarUploadProps {
//   currentAvatar?: string
//   name: string
//   onAvatarChange: (avatar: string) => void
// }

// export function UserAvatarUpload({ currentAvatar, name, onAvatarChange }: UserAvatarUploadProps) {
//   const [previewUrl, setPreviewUrl] = useState(currentAvatar || "")
//   const [isUploading, setIsUploading] = useState(false)
//   const fileInputRef = useRef<HTMLInputElement>(null)

//   const initials = name
//     .split(" ")
//     .map((n) => n[0])
//     .join("")
//     .toUpperCase()
//     .slice(0, 2)

//   const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0]
//     if (!file) return

//     if (!file.type.startsWith("image/")) {
//       toast.error("Vui lòng chọn file hình ảnh")
//       return
//     }

//     if (file.size > 5 * 1024 * 1024) {
//       toast.error("Kích thước ảnh phải nhỏ hơn 5MB")
//       return
//     }

//     setIsUploading(true)

//     try {
//       const preview = URL.createObjectURL(file)
//       setPreviewUrl(preview)

//       // In real app, upload to server and get filename
//       const filename = `${Date.now()}_${file.name}`
//       onAvatarChange(filename)
//       toast.success("Tải ảnh lên thành công")
//     } catch (error) {
//       toast.error("Tải ảnh lên thất bại")
//       console.error("Upload error:", error)
//     } finally {
//       setIsUploading(false)
//     }
//   }

//   const handleRemoveAvatar = () => {
//     setPreviewUrl("")
//     onAvatarChange("")
//     if (fileInputRef.current) {
//       fileInputRef.current.value = ""
//     }
//   }

//   return (
//     <div className="space-y-4">
//       <Label className="text-sm font-medium text-gray-700">Ảnh đại diện</Label>

//       <div className="flex items-center gap-4">
//         <Avatar className="h-20 w-20 border-2 border-blue-100">
//           <AvatarImage src={previewUrl ? `/images/${previewUrl}` : undefined} alt={name} />
//           <AvatarFallback className="text-lg font-semibold bg-blue-900 text-white">{initials}</AvatarFallback>
//         </Avatar>

//         <div className="flex flex-col gap-2">
//           <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
//           <Button
//             type="button"
//             variant="outline"
//             size="sm"
//             onClick={() => fileInputRef.current?.click()}
//             disabled={isUploading}
//             className="border-blue-200 text-blue-900 hover:bg-blue-50"
//           >
//             <Upload className="h-4 w-4 mr-2" />
//             {isUploading ? "Đang tải..." : "Chọn ảnh"}
//           </Button>

//           {previewUrl && (
//             <Button
//               type="button"
//               variant="outline"
//               size="sm"
//               onClick={handleRemoveAvatar}
//               className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
//             >
//               <X className="h-4 w-4 mr-2" />
//               Xóa ảnh
//             </Button>
//           )}
//         </div>
//       </div>

//       <p className="text-xs text-gray-500">Định dạng: JPG, PNG, GIF. Kích thước tối đa: 5MB</p>
//     </div>
//   )
// }
"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Upload, X, Camera } from "lucide-react"
import { toast } from "sonner"

interface UserAvatarUploadProps {
  currentAvatar?: string
  name: string
  onAvatarChange: (avatar: string) => void
}

export function UserAvatarUpload({ currentAvatar, name, onAvatarChange }: UserAvatarUploadProps) {
  const [previewUrl, setPreviewUrl] = useState(currentAvatar || "")
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith("image/")) {
      toast.error("Vui lòng chọn file hình ảnh")
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Kích thước ảnh phải nhỏ hơn 5MB")
      return
    }

    setIsUploading(true)

    try {
      // Create preview URL
      const preview = URL.createObjectURL(file)
      setPreviewUrl(preview)

      // In real app, upload to server and get filename
      // For now, just use filename
      const filename = `${Date.now()}_${file.name}`
      onAvatarChange(filename)
      
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success("Tải ảnh lên thành công")
    } catch (error) {
      toast.error("Tải ảnh lên thất bại")
      console.error("Upload error:", error)
      // Reset preview on error
      setPreviewUrl(currentAvatar || "")
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemoveAvatar = () => {
    setPreviewUrl("")
    onAvatarChange("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
    toast.success("Đã xóa ảnh đại diện")
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-4">
      <Label className="text-sm font-medium text-gray-700">Ảnh đại diện</Label>

      <div className="flex items-center gap-6">
        {/* Avatar Display */}
        <div className="relative group">
          <Avatar className="h-20 w-20 border-4 border-blue-100 cursor-pointer transition-all hover:border-blue-300">
            <AvatarImage 
              src={previewUrl ? (previewUrl.startsWith('blob:') ? previewUrl : `/images/${previewUrl}`) : undefined} 
              alt={name} 
              className="object-cover"
            />
            <AvatarFallback className="text-lg font-semibold bg-blue-900 text-white">
              {getInitials(name)}
            </AvatarFallback>
          </Avatar>
          
          {/* Overlay for camera icon on hover */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            onClick={handleAvatarClick}
          >
            <Camera className="h-6 w-6 text-white" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2">
          <input 
            ref={fileInputRef} 
            type="file" 
            accept="image/*" 
            onChange={handleFileUpload} 
            className="hidden" 
          />
          
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleAvatarClick}
            disabled={isUploading}
            className="border-blue-200 text-blue-900 hover:bg-blue-50"
          >
            <Upload className="h-4 w-4 mr-2" />
            {isUploading ? "Đang tải..." : "Chọn ảnh"}
          </Button>

          {(previewUrl || currentAvatar) && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleRemoveAvatar}
              disabled={isUploading}
              className="border-red-200 text-red-600 hover:bg-red-50"
            >
              <X className="h-4 w-4 mr-2" />
              Xóa ảnh
            </Button>
          )}
        </div>
      </div>

      {/* Upload Progress */}
      {isUploading && (
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
        </div>
      )}

      {/* Help Text */}
      <p className="text-xs text-gray-500">
        Định dạng: JPG, PNG, GIF. Kích thước tối đa: 5MB. Nhấp vào ảnh để thay đổi.
      </p>
    </div>
  )
}