"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Filter,
  Grid3X3,
  List,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertTriangle,
  RefreshCw,
  X,
} from "lucide-react"
import { useDiseases } from "@/hooks/disease/disease.hooks"
import type { IDisease } from "@/interface/disease/disease.interface"
import DiseaseCard from "./disease-card-2"
// import DiseaseCard from "./disease-card"

export default function DiseaseList02() {
  const [searchTerm, setSearchTerm] = useState("")
  const [severityFilter, setSeverityFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  const { data: diseasesResponse, isLoading, error, refetch } = useDiseases()

  const diseases: IDisease[] = useMemo(() => {
    if (!diseasesResponse) return []

    // Handle different response structures
    if (Array.isArray(diseasesResponse)) {
      return diseasesResponse
    }

    if (diseasesResponse.data) {
      if (Array.isArray(diseasesResponse.data)) {
        return diseasesResponse.data
      }
      if (diseasesResponse.data.data && Array.isArray(diseasesResponse.data.data)) {
        return diseasesResponse.data.data
      }
    }

    return []
  }, [diseasesResponse])

  // Filter diseases
  const filteredDiseases = useMemo(() => {
    return diseases.filter((disease) => {
      const matchesSearch =
        disease.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        disease.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        disease.common.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (disease.nameDiff && disease.nameDiff.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesSeverity = severityFilter === "all" || disease.severityLevel === severityFilter
      const matchesStatus = statusFilter === "all" || disease.status === statusFilter

      return matchesSearch && matchesSeverity && matchesStatus
    })
  }, [diseases, searchTerm, severityFilter, statusFilter])

  // Pagination
  const totalPages = Math.ceil(filteredDiseases.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedDiseases = filteredDiseases.slice(startIndex, startIndex + itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSeverityFilter("all")
    setStatusFilter("all")
    setCurrentPage(1)
  }

  const hasActiveFilters = searchTerm || severityFilter !== "all" || statusFilter !== "all"

  const LoadingContent = () => (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-4" />
      <p className="text-gray-600">Đang tải danh sách bệnh...</p>
    </div>
  )

  const ErrorContent = () => (
    <div className="flex flex-col items-center justify-center py-12">
      <AlertTriangle className="w-8 h-8 text-red-500 mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Không thể tải danh sách bệnh</h3>
      <p className="text-gray-600 text-center mb-4">Đã xảy ra lỗi khi tải dữ liệu</p>
      <Button onClick={() => refetch()} variant="outline" size="sm" className="gap-2">
        <RefreshCw className="w-4 h-4" />
        Thử lại
      </Button>
    </div>
  )

  const EmptyContent = () => (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <Search className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Không tìm thấy bệnh nào</h3>
      <p className="text-gray-600 text-center mb-4">
        {hasActiveFilters ? "Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm" : "Chưa có dữ liệu bệnh trong hệ thống"}
      </p>
      {hasActiveFilters && (
        <Button onClick={clearFilters} variant="outline" size="sm">
          Xóa bộ lọc
        </Button>
      )}
    </div>
  )

  if (isLoading) return <LoadingContent />
  if (error) return <ErrorContent />

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Danh sách bệnh</h1>
          <p className="text-gray-600 mt-1">Tìm hiểu thông tin chi tiết về các loại bệnh và triệu chứng</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className={viewMode === "grid" ? "bg-blue-900 hover:bg-blue-800" : ""}
          >
            <Grid3X3 className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
            className={viewMode === "list" ? "bg-blue-900 hover:bg-blue-800" : ""}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Bộ lọc tìm kiếm
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Tìm kiếm theo tên, mã bệnh, mô tả..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Select value={severityFilter} onValueChange={setSeverityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Mức độ nghiêm trọng" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả mức độ</SelectItem>
                  <SelectItem value="cao">Cao</SelectItem>
                  <SelectItem value="trung bình">Trung bình</SelectItem>
                  <SelectItem value="thấp">Thấp</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả trạng thái</SelectItem>
                  <SelectItem value="active">Hoạt động</SelectItem>
                  <SelectItem value="inactive">Không hoạt động</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          {hasActiveFilters && (
            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Bộ lọc đang áp dụng:</span>
                {searchTerm && (
                  <Badge variant="secondary" className="gap-1">
                    Tìm kiếm: {searchTerm}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchTerm("")} />
                  </Badge>
                )}
                {severityFilter !== "all" && (
                  <Badge variant="secondary" className="gap-1">
                    Mức độ: {severityFilter}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setSeverityFilter("all")} />
                  </Badge>
                )}
                {statusFilter !== "all" && (
                  <Badge variant="secondary" className="gap-1">
                    Trạng thái: {statusFilter}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setStatusFilter("all")} />
                  </Badge>
                )}
              </div>
              <Button onClick={clearFilters} variant="ghost" size="sm" className="gap-2">
                <X className="w-4 h-4" />
                Xóa tất cả
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-gray-600">
          Hiển thị {paginatedDiseases.length} trong tổng số {filteredDiseases.length} bệnh
        </p>
        {totalPages > 1 && (
          <p className="text-gray-600">
            Trang {currentPage} / {totalPages}
          </p>
        )}
      </div>

      {/* Disease List */}
      {filteredDiseases.length === 0 ? (
        <EmptyContent />
      ) : (
        <div
          className={
            viewMode === "grid" ? "grid gap-6" : "space-y-4"
          }
        >
          {paginatedDiseases.map((disease) => (
            <DiseaseCard key={disease._id} disease={disease} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-4 h-4" />
            Trước
          </Button>

          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum
              if (totalPages <= 5) {
                pageNum = i + 1
              } else if (currentPage <= 3) {
                pageNum = i + 1
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i
              } else {
                pageNum = currentPage - 2 + i
              }

              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-10 ${currentPage === pageNum ? "bg-blue-900 hover:bg-blue-800" : ""}`}
                >
                  {pageNum}
                </Button>
              )
            })}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Sau
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
