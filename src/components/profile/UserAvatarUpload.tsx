"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Upload, X } from "lucide-react"
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

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

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
      const preview = URL.createObjectURL(file)
      setPreviewUrl(preview)

      // In real app, upload to server and get filename
      const filename = `${Date.now()}_${file.name}`
      onAvatarChange(filename)
      toast.success("Tải ảnh lên thành công")
    } catch (error) {
      toast.error("Tải ảnh lên thất bại")
      console.error("Upload error:", error)
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
  }

  return (
    <div className="space-y-4">
      <Label className="text-sm font-medium text-gray-700">Ảnh đại diện</Label>

      <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20 border-2 border-blue-100">
          <AvatarImage src={previewUrl ? `/images/${previewUrl}` : undefined} alt={name} />
          <AvatarFallback className="text-lg font-semibold bg-blue-900 text-white">{initials}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-2">
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="border-blue-200 text-blue-900 hover:bg-blue-50"
          >
            <Upload className="h-4 w-4 mr-2" />
            {isUploading ? "Đang tải..." : "Chọn ảnh"}
          </Button>

          {previewUrl && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleRemoveAvatar}
              className="border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
            >
              <X className="h-4 w-4 mr-2" />
              Xóa ảnh
            </Button>
          )}
        </div>
      </div>

      <p className="text-xs text-gray-500">Định dạng: JPG, PNG, GIF. Kích thước tối đa: 5MB</p>
    </div>
  )
}
