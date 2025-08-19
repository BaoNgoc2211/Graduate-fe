
// "use client"

// import type React from "react"
// import { useState, useRef, useCallback, useMemo, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { ImageIcon, Send, X } from "lucide-react"
// import Image from "next/image" 
// import type { IMedicine, ISendPrescriptionPayload, IUpdatePrescriptionPayload } from "@/interface/auth/chat.interface"

// interface PrescriptionUploadProps {
//   roomId?: string
//   onSendPrescription: (data: ISendPrescriptionPayload) => void
//   onUpdatePrescription?: (data: IUpdatePrescriptionPayload) => void
//   onStartChat?: (message: string) => Promise<void>
//   isUploading?: boolean
//   isUpdating?: boolean
//   extractedMedicines?: IMedicine[]
//   prescriptionId?: string
// }

// export function PrescriptionUpload({
//   roomId,
//   onSendPrescription,
//   onStartChat,
//   isUploading = false,
//   extractedMedicines = [],
//   prescriptionId: externalPrescriptionId,
// }: PrescriptionUploadProps) {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null)
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null)
//   const [medicines, setMedicines] = useState<IMedicine[]>([])
//   // const [isEditing, setIsEditing] = useState(false)
//   const [isEditing, setIsEditing] = useState(false)
//   const [prescriptionId, setPrescriptionId] = useState<string>("")
//   const [imageLoaded, setImageLoaded] = useState(false)
//   const [hasExtractedData, setHasExtractedData] = useState(false)
//   const fileInputRef = useRef<HTMLInputElement>(null)

//   const hasValidRoom = Boolean(roomId)

//   useEffect(() => {
//     if (extractedMedicines.length > 0) {
//       console.log("Received extracted medicines:", extractedMedicines)
//       setMedicines(extractedMedicines)
//       setHasExtractedData(true)
//       setIsEditing(false)
//     }
//   }, [extractedMedicines])

//   useEffect(() => {
//     if (externalPrescriptionId) {
//       setPrescriptionId(externalPrescriptionId)
//     }
//   }, [externalPrescriptionId])

//   // const handleFileSelect = useCallback(
//   //   (event: React.ChangeEvent<HTMLInputElement>) => {
//   //     const file = event.target.files?.[0]

//   //     if (file) {
//   //       if (file.size > 15 * 1024 * 1024) {
//   //         return
//   //       }

//   //       if (!file.type.startsWith("image/")) {
//   //         return
//   //       }

//   //       setSelectedFile(file)
//   //       setImageLoaded(false)

//   //       if (previewUrl) {
//   //         URL.revokeObjectURL(previewUrl)
//   //       }

//   //       const url = URL.createObjectURL(file)
//   //       setPreviewUrl(url)

//   //       console.log("File selected:", file.name, "Size:", file.size, "Type:", file.type)
//   //       console.log("Preview URL created:", url)
//   //     }
//   //   },
//   //   [previewUrl],
//   // )

//   const handleUpload = useCallback(async () => {
//     if (!selectedFile) {
//       return
//     }

//     if (!hasValidRoom) {
//       if (onStartChat) {
//         try {
//           await onStartChat("Tôi muốn gửi đơn thuốc để được tư vấn")
//           return
//         } catch {
//           return
//         }
//       } else {
//         return
//       }
//     }

//     onSendPrescription({
//       image: selectedFile,
//       roomId: roomId!,
//     })
//   }, [selectedFile, roomId, hasValidRoom, onStartChat, onSendPrescription])

//   // const addMedicine = useCallback(() => {
//   //   const newMedicine: IMedicine = {
//   //     id: Date.now().toString(),
//   //     name: "",
//   //     dosage: "",
//   //     quantity: 1,
//   //     instructions: "",
//   //     price: 0,
//   //   }
//   //   setMedicines((prev) => [...prev, newMedicine])
//   // }, [])

//   // const updateMedicine = useCallback((id: string, field: keyof IMedicine, value: string | number) => {
//   //   setMedicines((prev) => prev.map((med) => (med.id === id ? { ...med, [field]: value } : med)))
//   // }, [])

//   // const removeMedicine = useCallback((id: string) => {
//   //   setMedicines((prev) => prev.filter((med) => med.id !== id))
//   // }, [])

//   // const handleUpdatePrescription = useCallback(() => {
//   //   if (prescriptionId && medicines.length > 0 && onUpdatePrescription) {
//   //     onUpdatePrescription({
//   //       prescriptionId,
//   //       medicines,
//   //       roomId: roomId || "",
//   //     })
//   //     setIsEditing(false)
//   //   }
//   // }, [prescriptionId, medicines, roomId, onUpdatePrescription])

//   const resetForm = useCallback(() => {
//     setSelectedFile(null)
//     setImageLoaded(false)
//     if (previewUrl) {
//       URL.revokeObjectURL(previewUrl)
//     }
//     setPreviewUrl(null)
//     setMedicines([])
//     setIsEditing(false)
//     setPrescriptionId("")
//     setHasExtractedData(false)
//     if (fileInputRef.current) {
//       fileInputRef.current.value = ""
//     }
//   }, [previewUrl])

//   // const medicineCount = useMemo(() => medicines.length, [medicines.length])

//   const handleImageLoad = useCallback(() => {
//     setImageLoaded(true)
//   }, [])

//   const handleImageError = useCallback(() => {}, [])

//   return (
//     <Card className="w-full max-w-2xl mx-auto bg-white border-blue-200">
//       <CardHeader className="bg-blue-900 text-white rounded-t-lg">
//         <CardTitle className="flex items-center gap-2">
//           <ImageIcon className="h-5 w-5" />
//           Quản lý đơn thuốc và hình ảnh
//         </CardTitle>
//       </CardHeader>

//       <CardContent className="p-6 space-y-6">
//         {previewUrl && !hasExtractedData && (
//           <div className="space-y-4">
//             <div className="relative">
//               <div className="w-full max-h-64 bg-gray-100 rounded-lg border border-blue-200 flex items-center justify-center overflow-hidden">
//                 {!imageLoaded && (
//                   <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
//                     <div className="text-gray-500">Đang tải hình ảnh...</div>
//                   </div>
//                 )}
//                 <Image
//                   src={previewUrl || "/placeholder.svg"}
//                   alt="Xem trước đơn thuốc"
//                   width={400}
//                   height={256}
//                   className="w-full max-h-64 object-contain"
//                   onLoad={handleImageLoad}
//                   onError={handleImageError}
//                   style={{ display: imageLoaded ? "block" : "none" }}
//                 />
//               </div>
//               <Button variant="outline" size="sm" className="absolute top-2 right-2 bg-white" onClick={resetForm}>
//                 <X className="h-4 w-4" />
//               </Button>
//             </div>

//             <div className="flex gap-3">
//               <Button
//                 onClick={handleUpload}
//                 disabled={isUploading || !selectedFile || (!hasValidRoom && !onStartChat)}
//                 className="flex-1 bg-blue-900 hover:bg-blue-800"
//               >
//                 {isUploading ? "Đang phân tích..." : hasValidRoom ? "Upload & Phân tích" : "Bắt đầu chat & Gửi đơn"}
//                 <Send className="h-4 w-4 ml-2" />
//               </Button>
//               <Button variant="outline" onClick={resetForm} className="border-gray-300 bg-transparent">
//                 Hủy
//               </Button>
//             </div>
//           </div>
//         )}

//         {hasExtractedData && previewUrl && (
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold text-blue-900">Hình ảnh đơn thuốc đã upload</h3>
//             <div className="relative">
//               <div className="w-full max-h-48 bg-gray-100 rounded-lg border border-blue-200 flex items-center justify-center overflow-hidden">
//                 <Image
//                   src={previewUrl || "/placeholder.svg"}
//                   alt="Đơn thuốc đã upload"
//                   width={400}
//                   height={192}
//                   className="w-full max-h-48 object-contain"
//                 />
//               </div>
//             </div>
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   )
// }

// "use client"

// import type React from "react"
// import { useState, useRef, useCallback, useMemo, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { ImageIcon, Send, X } from "lucide-react"
// import Image from "next/image" // Import Next.js Image component
// import type { IMedicine, ISendPrescriptionPayload, IUpdatePrescriptionPayload } from "@/interface/auth/chat.interface"

// interface PrescriptionUploadProps {
//   roomId?: string
//   onSendPrescription: (data: ISendPrescriptionPayload) => void
//   onUpdatePrescription?: (data: IUpdatePrescriptionPayload) => void
//   onStartChat?: (message: string) => Promise<void>
//   isUploading?: boolean
//   isUpdating?: boolean
//   extractedMedicines?: IMedicine[]
//   prescriptionId?: string
// }

// export function PrescriptionUpload({
//   roomId,
//   onSendPrescription,
//   onUpdatePrescription,
//   onStartChat,
//   isUploading = false,
//   isUpdating = false,
//   extractedMedicines = [],
//   prescriptionId: externalPrescriptionId,
// }: PrescriptionUploadProps) {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null)
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null)
//   const [medicines, setMedicines] = useState<IMedicine[]>([])
//   const [isEditing, setIsEditing] = useState(false)
//   const [prescriptionId, setPrescriptionId] = useState<string>("")
//   const [imageLoaded, setImageLoaded] = useState(false)
//   const [hasExtractedData, setHasExtractedData] = useState(false)
//   const fileInputRef = useRef<HTMLInputElement>(null)

//   const hasValidRoom = Boolean(roomId)

//   useEffect(() => {
//     if (extractedMedicines.length > 0) {
//       console.log("Received extracted medicines:", extractedMedicines)
//       setMedicines(extractedMedicines)
//       setHasExtractedData(true)
//       setIsEditing(false)
//     }
//   }, [extractedMedicines])

//   useEffect(() => {
//     if (externalPrescriptionId) {
//       setPrescriptionId(externalPrescriptionId)
//     }
//   }, [externalPrescriptionId])

//   const handleFileSelect = useCallback(
//     (event: React.ChangeEvent<HTMLInputElement>) => {
//       const file = event.target.files?.[0]

//       if (file) {
//         if (file.size > 15 * 1024 * 1024) {
//           return
//         }

//         if (!file.type.startsWith("image/")) {
//           return
//         }

//         setSelectedFile(file)
//         setImageLoaded(false)

//         if (previewUrl) {
//           URL.revokeObjectURL(previewUrl)
//         }

//         const url = URL.createObjectURL(file)
//         setPreviewUrl(url)

//         console.log("File selected:", file.name, "Size:", file.size, "Type:", file.type)
//         console.log("Preview URL created:", url)
//       }
//     },
//     [previewUrl],
//   )

//   const handleUpload = useCallback(async () => {
//     if (!selectedFile) {
//       return
//     }

//     if (!hasValidRoom) {
//       if (onStartChat) {
//         try {
//           await onStartChat("Tôi muốn gửi đơn thuốc để được tư vấn")
//           return
//         } catch {
//           return
//         }
//       } else {
//         return
//       }
//     }

//     onSendPrescription({
//       image: selectedFile,
//       roomId: roomId!,
//     })
//   }, [selectedFile, roomId, hasValidRoom, onStartChat, onSendPrescription])

//   const addMedicine = useCallback(() => {
//     const newMedicine: IMedicine = {
//       id: Date.now().toString(),
//       name: "",
//       dosage: "",
//       quantity: 1,
//       instructions: "",
//       price: 0,
//     }
//     setMedicines((prev) => [...prev, newMedicine])
//   }, [])

//   const updateMedicine = useCallback((id: string, field: keyof IMedicine, value: string | number) => {
//     setMedicines((prev) => prev.map((med) => (med.id === id ? { ...med, [field]: value } : med)))
//   }, [])

//   const removeMedicine = useCallback((id: string) => {
//     setMedicines((prev) => prev.filter((med) => med.id !== id))
//   }, [])

//   const handleUpdatePrescription = useCallback(() => {
//     if (prescriptionId && medicines.length > 0 && onUpdatePrescription) {
//       onUpdatePrescription({
//         prescriptionId,
//         medicines,
//         roomId: roomId || "",
//       })
//       setIsEditing(false)
//     }
//   }, [prescriptionId, medicines, roomId, onUpdatePrescription])

//   const resetForm = useCallback(() => {
//     setSelectedFile(null)
//     setImageLoaded(false)
//     if (previewUrl) {
//       URL.revokeObjectURL(previewUrl)
//     }
//     setPreviewUrl(null)
//     setMedicines([])
//     setIsEditing(false)
//     setPrescriptionId("")
//     setHasExtractedData(false)
//     if (fileInputRef.current) {
//       fileInputRef.current.value = ""
//     }
//   }, [previewUrl])

//   const medicineCount = useMemo(() => medicines.length, [medicines.length])

//   const handleImageLoad = useCallback(() => {
//     setImageLoaded(true)
//   }, [])

//   const handleImageError = useCallback(() => {}, [])

//   return (
//     <Card className="w-full max-w-2xl mx-auto bg-white border-blue-200">
//       <CardHeader className="bg-blue-900 text-white rounded-t-lg">
//         <CardTitle className="flex items-center gap-2">
//           <ImageIcon className="h-5 w-5" />
//           Quản lý đơn thuốc và hình ảnh
//         </CardTitle>
//       </CardHeader>

//       <CardContent className="p-6 space-y-6">
//         {previewUrl && !hasExtractedData && (
//           <div className="space-y-4">
//             <div className="relative">
//               <div className="w-full max-h-64 bg-gray-100 rounded-lg border border-blue-200 flex items-center justify-center overflow-hidden">
//                 {!imageLoaded && (
//                   <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
//                     <div className="text-gray-500">Đang tải hình ảnh...</div>
//                   </div>
//                 )}
//                 <Image
//                   src={previewUrl || "/placeholder.svg"}
//                   alt="Xem trước đơn thuốc"
//                   width={400}
//                   height={256}
//                   className="w-full max-h-64 object-contain"
//                   onLoad={handleImageLoad}
//                   onError={handleImageError}
//                   style={{ display: imageLoaded ? "block" : "none" }}
//                 />
//               </div>
//               <Button variant="outline" size="sm" className="absolute top-2 right-2 bg-white" onClick={resetForm}>
//                 <X className="h-4 w-4" />
//               </Button>
//             </div>

//             <div className="flex gap-3">
//               <Button
//                 onClick={handleUpload}
//                 disabled={isUploading || !selectedFile || (!hasValidRoom && !onStartChat)}
//                 className="flex-1 bg-blue-900 hover:bg-blue-800"
//               >
//                 {isUploading ? "Đang phân tích..." : hasValidRoom ? "Upload & Phân tích" : "Bắt đầu chat & Gửi đơn"}
//                 <Send className="h-4 w-4 ml-2" />
//               </Button>
//               <Button variant="outline" onClick={resetForm} className="border-gray-300 bg-transparent">
//                 Hủy
//               </Button>
//             </div>
//           </div>
//         )}

//         {hasExtractedData && medicines.length > 0 && (
//           <div className="space-y-4">
//             <div className="flex items-center justify-between">
//               <h3 className="text-lg font-semibold text-blue-900">
//                 Thông tin thuốc đã phân tích ({medicineCount} loại)
//               </h3>
//               <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)} className="border-blue-300">
//                 {isEditing ? "Hủy chỉnh sửa" : "Chỉnh sửa"}
//               </Button>
//             </div>

//             <div className="space-y-3 max-h-64 overflow-y-auto">
//               {medicines.map((medicine) => (
//                 <div key={medicine.id} className="p-3 border border-gray-200 rounded-lg bg-gray-50">
//                   {isEditing ? (
//                     <div className="space-y-2">
//                       <div className="flex gap-2">
//                         <input
//                           type="text"
//                           value={medicine.name}
//                           onChange={(e) => updateMedicine(medicine.id, "name", e.target.value)}
//                           placeholder="Tên thuốc"
//                           className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
//                         />
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={() => removeMedicine(medicine.id)}
//                           className="text-red-600 border-red-300"
//                         >
//                           <X className="h-3 w-3" />
//                         </Button>
//                       </div>
//                       <div className="flex gap-2">
//                         <input
//                           type="text"
//                           value={medicine.dosage}
//                           onChange={(e) => updateMedicine(medicine.id, "dosage", e.target.value)}
//                           placeholder="Liều lượng"
//                           className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
//                         />
//                         <input
//                           type="number"
//                           value={medicine.quantity}
//                           onChange={(e) =>
//                             updateMedicine(medicine.id, "quantity", Number.parseInt(e.target.value) || 0)
//                           }
//                           placeholder="Số lượng"
//                           className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
//                         />
//                       </div>
//                     </div>
//                   ) : (
//                     <div>
//                       <div className="font-medium text-gray-900">{medicine.name}</div>
//                       <div className="text-sm text-gray-600">
//                         {medicine.dosage} - Số lượng: {medicine.quantity}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>

//             {isEditing && (
//               <div className="flex gap-2">
//                 <Button variant="outline" onClick={addMedicine} className="border-blue-300 bg-transparent">
//                   Thêm thuốc
//                 </Button>
//               </div>
//             )}

//             <div className="flex gap-3">
//               {prescriptionId && onUpdatePrescription && (
//                 <Button
//                   onClick={handleUpdatePrescription}
//                   disabled={isUpdating || medicines.length === 0}
//                   className="flex-1 bg-green-600 hover:bg-green-700"
//                 >
//                   {isUpdating ? "Đang cập nhật..." : "Cập nhật & Gửi"}
//                   <Send className="h-4 w-4 ml-2" />
//                 </Button>
//               )}
//               <Button variant="outline" onClick={resetForm} className="border-gray-300 bg-transparent">
//                 Làm mới
//               </Button>
//             </div>
//           </div>
//         )}

//         {!previewUrl && !hasExtractedData && (
//           <div className="space-y-4">
//             <div className="relative">
//               <div className="w-full max-h-64 bg-gray-100 rounded-lg border border-blue-200 flex items-center justify-center overflow-hidden">
//                 <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
//                   <div className="text-gray-500">Chưa có hình ảnh đơn thuốc</div>
//                 </div>
//               </div>
//             </div>

//             <div className="flex gap-3">
//               <Button onClick={() => fileInputRef.current?.click()} className="flex-1 bg-blue-900 hover:bg-blue-800">
//                 Chọn hình ảnh đơn thuốc
//               </Button>
//             </div>
//           </div>
//         )}

//         <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" />
//       </CardContent>
//     </Card>
//   )
// }
"use client"

import type React from "react"
import { useState, useRef, useCallback, useMemo, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageIcon, Send, X } from "lucide-react"
import Image from "next/image" // Import Next.js Image component
import type { IMedicine, ISendPrescriptionPayload, IUpdatePrescriptionPayload } from "@/interface/auth/chat.interface"

interface PrescriptionUploadProps {
  roomId?: string
  onSendPrescription: (data: ISendPrescriptionPayload) => void
  onUpdatePrescription?: (data: IUpdatePrescriptionPayload) => void
  onSendExtractedPrescription?: () => void // Added new prop for sending extracted data
  onStartChat?: (message: string) => Promise<void>
  isUploading?: boolean
  isUpdating?: boolean
  extractedMedicines?: IMedicine[]
  prescriptionId?: string
}

export function PrescriptionUpload({
  roomId,
  onSendPrescription,
  onUpdatePrescription,
  onSendExtractedPrescription, // Added new prop
  onStartChat,
  isUploading = false,
  isUpdating = false,
  extractedMedicines = [],
  prescriptionId: externalPrescriptionId,
}: PrescriptionUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [medicines, setMedicines] = useState<IMedicine[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [prescriptionId, setPrescriptionId] = useState<string>("")
  const [imageLoaded, setImageLoaded] = useState(false)
  const [hasExtractedData, setHasExtractedData] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const hasValidRoom = Boolean(roomId)

  useEffect(() => {
    if (extractedMedicines.length > 0) {
      console.log("Received extracted medicines:", extractedMedicines)
      setMedicines(extractedMedicines)
      setHasExtractedData(true)
      setIsEditing(false)
    }
  }, [extractedMedicines])

  useEffect(() => {
    if (externalPrescriptionId) {
      setPrescriptionId(externalPrescriptionId)
    }
  }, [externalPrescriptionId])

  const handleFileSelect = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]

      if (file) {
        if (file.size > 15 * 1024 * 1024) {
          return
        }

        if (!file.type.startsWith("image/")) {
          return
        }

        setSelectedFile(file)
        setImageLoaded(false)

        if (previewUrl) {
          URL.revokeObjectURL(previewUrl)
        }

        const url = URL.createObjectURL(file)
        setPreviewUrl(url)

        console.log("File selected:", file.name, "Size:", file.size, "Type:", file.type)
        console.log("Preview URL created:", url)
      }
    },
    [previewUrl],
  )

  const handleUpload = useCallback(async () => {
    if (!selectedFile) {
      return
    }

    if (!hasValidRoom) {
      if (onStartChat) {
        try {
          await onStartChat("Tôi muốn gửi đơn thuốc để được tư vấn")
          return
        } catch {
          return
        }
      } else {
        return
      }
    }

    onSendPrescription({
      image: selectedFile,
      roomId: roomId!,
    })
  }, [selectedFile, roomId, hasValidRoom, onStartChat, onSendPrescription])

  const addMedicine = useCallback(() => {
    const newMedicine: IMedicine = {
      id: Date.now().toString(),
      name: "",
      dosage: "",
      quantity: 1,
      instructions: "",
      price: 0,
    }
    setMedicines((prev) => [...prev, newMedicine])
  }, [])

  const updateMedicine = useCallback((id: string, field: keyof IMedicine, value: string | number) => {
    setMedicines((prev) => prev.map((med) => (med.id === id ? { ...med, [field]: value } : med)))
  }, [])

  const removeMedicine = useCallback((id: string) => {
    setMedicines((prev) => prev.filter((med) => med.id !== id))
  }, [])

  const handleUpdatePrescription = useCallback(() => {
    if (prescriptionId && medicines.length > 0 && onUpdatePrescription) {
      onUpdatePrescription({
        prescriptionId,
        medicines,
        roomId: roomId || "",
      })
      setIsEditing(false)
    }
  }, [prescriptionId, medicines, roomId, onUpdatePrescription])

  const resetForm = useCallback(() => {
    setSelectedFile(null)
    setImageLoaded(false)
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }
    setPreviewUrl(null)
    setMedicines([])
    setIsEditing(false)
    setPrescriptionId("")
    setHasExtractedData(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }, [previewUrl])

  const medicineCount = useMemo(() => medicines.length, [medicines.length])

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true)
  }, [])

  const handleImageError = useCallback(() => {}, [])

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white border-blue-200">
      <CardHeader className="bg-blue-900 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="h-5 w-5" />
          Quản lý đơn thuốc và hình ảnh
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6 space-y-6">
        {previewUrl && !hasExtractedData && (
          <div className="space-y-4">
            <div className="relative">
              <div className="w-full max-h-64 bg-gray-100 rounded-lg border border-blue-200 flex items-center justify-center overflow-hidden">
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <div className="text-gray-500">Đang tải hình ảnh...</div>
                  </div>
                )}
                <Image
                  src={previewUrl || "/placeholder.svg"}
                  alt="Xem trước đơn thuốc"
                  width={400}
                  height={256}
                  className="w-full max-h-64 object-contain"
                  onLoad={handleImageLoad}
                  onError={handleImageError}
                  style={{ display: imageLoaded ? "block" : "none" }}
                />
              </div>
              <Button variant="outline" size="sm" className="absolute top-2 right-2 bg-white" onClick={resetForm}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleUpload}
                disabled={isUploading || !selectedFile || (!hasValidRoom && !onStartChat)}
                className="flex-1 bg-blue-900 hover:bg-blue-800"
              >
                {isUploading ? "Đang phân tích..." : hasValidRoom ? "Upload & Phân tích" : "Bắt đầu chat & Gửi đơn"}
                <Send className="h-4 w-4 ml-2" />
              </Button>
              <Button variant="outline" onClick={resetForm} className="border-gray-300 bg-transparent">
                Hủy
              </Button>
            </div>
          </div>
        )}

        {hasExtractedData && medicines.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-blue-900">
                Thông tin thuốc đã phân tích ({medicineCount} loại)
              </h3>
              <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)} className="border-blue-300">
                {isEditing ? "Hủy chỉnh sửa" : "Chỉnh sửa"}
              </Button>
            </div>

            <div className="space-y-3 max-h-64 overflow-y-auto">
              {medicines.map((medicine) => (
                <div key={medicine.id} className="p-3 border border-gray-200 rounded-lg bg-gray-50">
                  {isEditing ? (
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={medicine.name}
                          onChange={(e) => updateMedicine(medicine.id, "name", e.target.value)}
                          placeholder="Tên thuốc"
                          className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeMedicine(medicine.id)}
                          className="text-red-600 border-red-300"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={medicine.dosage}
                          onChange={(e) => updateMedicine(medicine.id, "dosage", e.target.value)}
                          placeholder="Liều lượng"
                          className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                        <input
                          type="number"
                          value={medicine.quantity}
                          onChange={(e) =>
                            updateMedicine(medicine.id, "quantity", Number.parseInt(e.target.value) || 0)
                          }
                          placeholder="Số lượng"
                          className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="font-medium text-gray-900">{medicine.name}</div>
                      <div className="text-sm text-gray-600">
                        {medicine.dosage} - Số lượng: {medicine.quantity}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {isEditing && (
              <div className="flex gap-2">
                <Button variant="outline" onClick={addMedicine} className="border-blue-300 bg-transparent">
                  Thêm thuốc
                </Button>
              </div>
            )}

            <div className="flex gap-3">
              {hasExtractedData && onSendExtractedPrescription && !isEditing && (
                <Button
                  onClick={onSendExtractedPrescription}
                  disabled={medicines.length === 0}
                  className="flex-1 bg-blue-900 hover:bg-blue-800"
                >
                  Gửi đơn thuốc
                  <Send className="h-4 w-4 ml-2" />
                </Button>
              )}

              {isEditing && prescriptionId && onUpdatePrescription && (
                <Button
                  onClick={handleUpdatePrescription}
                  disabled={isUpdating || medicines.length === 0}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  {isUpdating ? "Đang cập nhật..." : "Cập nhật & Gửi"}
                  <Send className="h-4 w-4 ml-2" />
                </Button>
              )}

              <Button variant="outline" onClick={resetForm} className="border-gray-300 bg-transparent">
                Làm mới
              </Button>
            </div>
          </div>
        )}

        {!previewUrl && !hasExtractedData && (
          <div className="space-y-4">
            <div className="relative">
              <div className="w-full max-h-64 bg-gray-100 rounded-lg border border-blue-200 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <div className="text-gray-500">Chưa có hình ảnh đơn thuốc</div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={() => fileInputRef.current?.click()} className="flex-1 bg-blue-900 hover:bg-blue-800">
                Chọn hình ảnh đơn thuốc
              </Button>
            </div>
          </div>
        )}

        <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" />
      </CardContent>
    </Card>
  )
}
