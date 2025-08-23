"use client"

import { useState, useMemo, useEffect } from "react"
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
import DiseaseCard from "./disease-card"

export default function DiseaseList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [severityFilter, setSeverityFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  // Debounce search term để tránh call API quá nhiều
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
      setCurrentPage(1) // Reset về trang 1 khi search
    }, 500)

    return () => clearTimeout(timer)
  }, [searchTerm])

  // Call API với pagination parameters
  const { data: diseasesResponse, isLoading, error, refetch } = useDiseases({
    page: currentPage,
    limit: itemsPerPage,
    search: debouncedSearchTerm || undefined,
    severity: severityFilter !== "all" ? severityFilter : undefined,
    status: statusFilter !== "all" ? statusFilter : undefined,
  })

  // Extract data từ response
  const diseases: IDisease[] = useMemo(() => {
    if (!diseasesResponse?.data?.data) return []
    return diseasesResponse.data.data
  }, [diseasesResponse])

  // Pagination info từ server
  const paginationInfo = useMemo(() => {
    if (!diseasesResponse?.data) {
      return {
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        limit: itemsPerPage
      }
    }
    return diseasesResponse.data
  }, [diseasesResponse, itemsPerPage])

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

  // Reset page khi filter thay đổi
  useEffect(() => {
    setCurrentPage(1)
  }, [severityFilter, statusFilter])

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
              <div className="flex items-center gap-2 flex-wrap">
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
          Hiển thị {diseases.length} trong tổng số {paginationInfo.totalItems} bệnh
        </p>
        {paginationInfo.totalPages > 1 && (
          <p className="text-gray-600">
            Trang {paginationInfo.currentPage} / {paginationInfo.totalPages}
          </p>
        )}
      </div>

      {/* Disease List */}
      {diseases.length === 0 ? (
        <EmptyContent />
      ) : (
        <div
          className={
            viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"
          }
        >
          {diseases.map((disease) => (
            <DiseaseCard key={disease._id} disease={disease} />
          ))}
        </div>
      )}

      {/* Server-side Pagination */}
      {paginationInfo.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(paginationInfo.currentPage - 1)}
            disabled={paginationInfo.currentPage === 1}
          >
            <ChevronLeft className="w-4 h-4" />
            Trước
          </Button>

          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, paginationInfo.totalPages) }, (_, i) => {
              let pageNum
              if (paginationInfo.totalPages <= 5) {
                pageNum = i + 1
              } else if (paginationInfo.currentPage <= 3) {
                pageNum = i + 1
              } else if (paginationInfo.currentPage >= paginationInfo.totalPages - 2) {
                pageNum = paginationInfo.totalPages - 4 + i
              } else {
                pageNum = paginationInfo.currentPage - 2 + i
              }

              return (
                <Button
                  key={pageNum}
                  variant={paginationInfo.currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-10 ${paginationInfo.currentPage === pageNum ? "bg-blue-900 hover:bg-blue-800" : ""}`}
                >
                  {pageNum}
                </Button>
              )
            })}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(paginationInfo.currentPage + 1)}
            disabled={paginationInfo.currentPage === paginationInfo.totalPages}
          >
            Sau
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  )
}