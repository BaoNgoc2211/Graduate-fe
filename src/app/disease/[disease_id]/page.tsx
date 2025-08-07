"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowLeft,
  Heart,
  AlertTriangle,
  Users,
  Stethoscope,
  Shield,
  Activity,
  FileText,
  Loader2,
  RefreshCw,
  Share2,
  Bookmark,
  Calendar,
  Hash,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useDiseaseById } from "@/hooks/disease/disease.hooks"
import type { Symptom, DiseaseCategory, DiseaseUsageGroup } from "@/interface/disease/disease.interface"

export default function DiseaseDetailPage() {
  const params = useParams()
  const router = useRouter()
  const diseaseId = params.disease_id as string

  const [isBookmarked, setIsBookmarked] = useState(false)

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
        return <AlertTriangle className="w-5 h-5" />
      case "trung bình":
        return <Activity className="w-5 h-5" />
      case "thấp":
        return <Shield className="w-5 h-5" />
      default:
        return <Activity className="w-5 h-5" />
    }
  }

  const renderSymptoms = (symptoms: string[] | Symptom[]) => {
    if (!symptoms || symptoms.length === 0) {
      return <p className="text-gray-500 italic">Chưa có thông tin triệu chứng</p>
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {symptoms.map((symptom, index) => {
          const name = typeof symptom === "string" ? symptom : symptom.name
          return (
            <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-orange-200">
              <div className="w-2 h-2 rounded-full bg-orange-500 flex-shrink-0" />
              <span className="text-gray-700 font-medium">{name}</span>
            </div>
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
            <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 px-3 py-1">
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
            <Badge key={index} variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 px-3 py-1">
              {name}
            </Badge>
          )
        })}
      </div>
    )
  }

  const handleShare = async () => {
    if (navigator.share && disease) {
      try {
        await navigator.share({
          title: disease.name,
          text: disease.common,
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    // TODO: Implement bookmark functionality
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="w-12 h-12 animate-spin text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Đang tải thông tin bệnh</h3>
            <p className="text-gray-600">Vui lòng đợi trong giây lát...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !disease) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col items-center justify-center py-16">
            <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Không thể tải thông tin bệnh</h3>
            <p className="text-gray-600 text-center mb-6">Bệnh không tồn tại hoặc đã xảy ra lỗi khi tải dữ liệu</p>
            <div className="flex gap-3">
              <Button onClick={() => router.back()} variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Quay lại
              </Button>
              <Button onClick={() => refetch()} variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Thử lại
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/disease">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Danh sách bệnh
                </Button>
              </Link>
              <div className="h-6 w-px bg-gray-300" />
              <h1 className="text-lg font-semibold text-gray-900 truncate">{disease.name}</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBookmark}
                className={isBookmarked ? "text-blue-600" : "text-gray-600"}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleShare}>
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Disease Header */}
          <Card>
            <CardContent className="p-8">
              <div className="flex items-start gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <Badge variant="outline" className="text-sm font-mono">
                      <Hash className="w-3 h-3 mr-1" />
                      {disease.code}
                    </Badge>
                    <Badge variant="outline" className={`text-sm ${getSeverityColor(disease.severityLevel)}`}>
                      <span className="flex items-center gap-1">
                        {getSeverityIcon(disease.severityLevel)}
                        Mức độ: {disease.severityLevel}
                      </span>
                    </Badge>
                    <Badge
                      variant="secondary"
                      className={
                        disease.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }
                    >
                      {disease.status === "active" ? "Hoạt động" : "Không hoạt động"}
                    </Badge>
                  </div>

                  <h1 className="text-3xl font-bold text-gray-900 mb-3">{disease.name}</h1>

                  {disease.nameDiff && (
                    <p className="text-lg text-gray-600 italic mb-4">Tên khác: {disease.nameDiff}</p>
                  )}

                  <div className="flex items-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Cập nhật: {new Date(disease.updatedAt).toLocaleDateString("vi-VN")}</span>
                    </div>
                  </div>
                </div>

                {disease.image && (
                  <div className="w-32 h-32 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">
                    <Image
                      src={disease.image || "/placeholder.svg"}
                      alt={disease.name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                Mô tả chung
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed text-lg">{disease.common}</p>
            </CardContent>
          </Card>

          {/* Risk Groups */}
          {disease.riskGroup && disease.riskGroup.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-red-600" />
                  Nhóm nguy cơ
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {disease.riskGroup.map((group, index) => (
                    <div key={index} className="flex items-center gap-3 p-4 bg-red-50 rounded-lg border border-red-200">
                      <Users className="w-5 h-5 text-red-600 flex-shrink-0" />
                      <span className="text-red-800 font-medium">{group}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Symptoms */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-orange-600" />
                Triệu chứng
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-orange-50 rounded-lg p-6">{renderSymptoms(disease.symptomIds)}</div>
            </CardContent>
          </Card>

          {/* Medical Information Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Causes */}
            {disease.causes && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    Nguyên nhân
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <p className="text-gray-700 leading-relaxed">{disease.causes}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Diagnosis */}
            {disease.diagnosis && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Stethoscope className="w-5 h-5 text-blue-600" />
                    Chẩn đoán
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-gray-700 leading-relaxed">{disease.diagnosis}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Treatment Plan */}
            {disease.treatmentPlan && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-green-600" />
                    Kế hoạch điều trị
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-green-50 rounded-lg p-4">
                    <p className="text-gray-700 leading-relaxed">{disease.treatmentPlan}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Prevention */}
            {disease.prevention && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-purple-600" />
                    Phòng ngừa
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <p className="text-gray-700 leading-relaxed">{disease.prevention}</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Categories and Groups */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Danh mục bệnh</CardTitle>
              </CardHeader>
              <CardContent>{renderCategories(disease.diseaseCategoryIds)}</CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Nhóm sử dụng</CardTitle>
              </CardHeader>
              <CardContent>{renderUsageGroups(disease.diseaseUsageGroupIds)}</CardContent>
            </Card>
          </div>

          {/* Notes */}
          {disease.notes && (
            <Card>
              <CardHeader>
                <CardTitle>Ghi chú</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400">
                  <p className="text-gray-700 leading-relaxed">{disease.notes}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Metadata */}
          <Card>
            <CardHeader>
              <CardTitle>Thông tin hệ thống</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">ID bệnh:</span>
                  <p className="text-gray-600 font-mono mt-1">{disease._id}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Ngày tạo:</span>
                  <p className="text-gray-600 mt-1">{new Date(disease.createdAt).toLocaleDateString("vi-VN")}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Lần cập nhật cuối:</span>
                  <p className="text-gray-600 mt-1">{new Date(disease.updatedAt).toLocaleDateString("vi-VN")}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
