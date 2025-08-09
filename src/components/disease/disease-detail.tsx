"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Heart, AlertTriangle, Users, Stethoscope, Shield, Activity, FileText, Loader2, RefreshCw, X } from 'lucide-react'
import Image from "next/image"
import { useDiseaseById } from "@/hooks/disease/disease.hooks"
import type {  Symptom, DiseaseCategory, DiseaseUsageGroup } from "@/interface/disease/disease.interface"

interface DiseaseDetailProps {
  diseaseId: string
  isOpen: boolean
  onClose: () => void
}

export default function DiseaseDetail({ diseaseId, isOpen, onClose }: DiseaseDetailProps) {
  const { data: response, isLoading, error, refetch } = useDiseaseById(diseaseId)
  
  // Extract disease from response
  const disease = response?.data

  const getSeverityColor = (severity: string) => {
    switch (severity?.toLowerCase()) {
      case "cao":
        return "bg-red-100 text-red-800 border-red-200"
      case "trung bình":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "thấp":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity?.toLowerCase()) {
      case "cao":
        return <AlertTriangle className="w-4 h-4" />
      case "trung bình":
        return <Activity className="w-4 h-4" />
      case "thấp":
        return <Shield className="w-4 h-4" />
      default:
        return <Activity className="w-4 h-4" />
    }
  }

  const renderSymptoms = (symptoms: string[] | Symptom[]) => {
    if (!symptoms || symptoms.length === 0) {
      return <p className="text-gray-500 italic">Chưa có thông tin triệu chứng</p>
    }

    return (
      <div className="flex flex-wrap gap-2">
        {symptoms.map((symptom, index) => {
          const name = typeof symptom === "string" ? symptom : symptom.name
          return (
            <Badge key={index} variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
              {name}
            </Badge>
          )
        })}
      </div>
    )
  }

  const renderCategories = (categories: string[] | DiseaseCategory[]) => {
    if (!categories || categories.length === 0) {
      return <p className="text-gray-500 italic">Chưa phân loại</p>
    }

    return (
      <div className="flex flex-wrap gap-2">
        {categories.map((category, index) => {
          const name = typeof category === "string" ? category : category.name
          return (
            <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              {name}
            </Badge>
          )
        })}
      </div>
    )
  }

  const renderUsageGroups = (groups: string[] | DiseaseUsageGroup[]) => {
    if (!groups || groups.length === 0) {
      return <p className="text-gray-500 italic">Chưa có thông tin</p>
    }

    return (
      <div className="flex flex-wrap gap-2">
        {groups.map((group, index) => {
          const name = typeof group === "string" ? group : group.name
          return (
            <Badge key={index} variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
              {name}
            </Badge>
          )
        })}
      </div>
    )
  }

  const LoadingContent = () => (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-4" />
      <p className="text-gray-600">Đang tải thông tin bệnh...</p>
    </div>
  )

  const ErrorContent = () => (
    <div className="flex flex-col items-center justify-center py-12">
      <AlertTriangle className="w-8 h-8 text-red-500 mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Không thể tải thông tin</h3>
      <p className="text-gray-600 text-center mb-4">Đã xảy ra lỗi khi tải chi tiết bệnh</p>
      <Button onClick={() => refetch()} variant="outline" size="sm" className="gap-2">
        <RefreshCw className="w-4 h-4" />
        Thử lại
      </Button>
    </div>
  )

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold text-gray-900 mb-2">
                {disease?.name || "Chi tiết bệnh"}
              </DialogTitle>
              {disease?.nameDiff && <p className="text-gray-600 italic mb-3">Tên khác: {disease.nameDiff}</p>}
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-sm">
                  {disease?.code}
                </Badge>
                {disease?.severityLevel && (
                  <Badge variant="outline" className={`text-sm ${getSeverityColor(disease.severityLevel)}`}>
                    <span className="flex items-center gap-1">
                      {getSeverityIcon(disease.severityLevel)}
                      {disease.severityLevel}
                    </span>
                  </Badge>
                )}
                <Badge
                  variant="secondary"
                  className={disease?.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                >
                  {disease?.status === "active" ? "Hoạt động" : "Không hoạt động"}
                </Badge>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {disease?.image && (
                <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                  <Image
                    src={disease.image || "/placeholder.svg"}
                    alt={disease.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 px-6">
          {isLoading && <LoadingContent />}
          {error && <ErrorContent />}

          {disease && !isLoading && !error && (
            <div className="space-y-6 pb-6">
              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Mô tả chung
                </h3>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-gray-700 leading-relaxed">{disease.common}</p>
                </div>
              </div>

              <Separator />

              {/* Risk Groups */}
              {disease.riskGroup && disease.riskGroup.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Users className="w-5 h-5 text-red-600" />
                    Nhóm nguy cơ
                  </h3>
                  <div className="bg-red-50 rounded-lg p-4">
                    <div className="flex flex-wrap gap-2">
                      {disease.riskGroup.map((group, index) => (
                        <Badge key={index} variant="outline" className="bg-red-100 text-red-800 border-red-200">
                          {group}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <Separator />

              {/* Symptoms */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-orange-600" />
                  Triệu chứng
                </h3>
                <div className="bg-orange-50 rounded-lg p-4">
                  {renderSymptoms(disease.symptomIds)}
                </div>
              </div>

              <Separator />

              {/* Causes */}
              {disease.causes && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    Nguyên nhân
                  </h3>
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <p className="text-gray-700 leading-relaxed">{disease.causes}</p>
                  </div>
                </div>
              )}

              <Separator />

              {/* Diagnosis */}
              {disease.diagnosis && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Stethoscope className="w-5 h-5 text-blue-600" />
                    Chẩn đoán
                  </h3>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-gray-700 leading-relaxed">{disease.diagnosis}</p>
                  </div>
                </div>
              )}

              <Separator />

              {/* Treatment Plan */}
              {disease.treatmentPlan && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-green-600" />
                    Kế hoạch điều trị
                  </h3>
                  <div className="bg-green-50 rounded-lg p-4">
                    <p className="text-gray-700 leading-relaxed">{disease.treatmentPlan}</p>
                  </div>
                </div>
              )}

              <Separator />

              {/* Prevention */}
              {disease.prevention && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-purple-600" />
                    Phòng ngừa
                  </h3>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <p className="text-gray-700 leading-relaxed">{disease.prevention}</p>
                  </div>
                </div>
              )}

              <Separator />

              {/* Categories and Groups */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Danh mục bệnh</h3>
                  <div className="bg-blue-50 rounded-lg p-4">
                    {renderCategories(disease.diseaseCategoryIds)}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Nhóm sử dụng</h3>
                  <div className="bg-purple-50 rounded-lg p-4">
                    {renderUsageGroups(disease.diseaseUsageGroupIds)}
                  </div>
                </div>
              </div>

              {/* Notes */}
              {disease.notes && (
                <>
                  <Separator />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Ghi chú</h3>
                    <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400">
                      <p className="text-gray-700 leading-relaxed">{disease.notes}</p>
                    </div>
                  </div>
                </>
              )}

              {/* Metadata */}
              <Separator />
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">ID bệnh:</span>
                    <span className="ml-2 text-gray-600 font-mono">{disease._id}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Ngày tạo:</span>
                    <span className="ml-2 text-gray-600">{new Date(disease.createdAt).toLocaleDateString("vi-VN")}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Cập nhật:</span>
                    <span className="ml-2 text-gray-600">{new Date(disease.updatedAt).toLocaleDateString("vi-VN")}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
