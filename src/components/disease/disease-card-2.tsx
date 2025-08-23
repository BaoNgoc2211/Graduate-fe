"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, AlertTriangle, Activity } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { IDisease } from "@/interface/disease/disease.interface";

interface DiseaseCardProps {
  disease: IDisease;
}

export default function DiseaseCard({ disease }: DiseaseCardProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity?.toLowerCase()) {
      case "cao":
        return "bg-red-100 text-red-800 border-red-200";
      case "trung bình":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "thấp":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity?.toLowerCase()) {
      case "cao":
        return <AlertTriangle className="w-3 h-3" />;
      case "trung bình":
        return <Activity className="w-3 h-3" />;
      case "thấp":
        return <Activity className="w-3 h-3" />;
      default:
        return <Activity className="w-3 h-3" />;
    }
  };
  return (
    <Card className="h-full hover:shadow-lg transition-all duration-200 border-gray-200 hover:border-blue-300 group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="outline" className="text-xs font-mono">
                {disease.code}
              </Badge>
              <Badge
                variant="outline"
                className={`text-xs ${getSeverityColor(disease.severityLevel)}`}
              >
                <span className="flex items-center gap-1">
                  {getSeverityIcon(disease.severityLevel)}
                  {disease.severityLevel}
                </span>
              </Badge>
            </div>
            <h3 className="font-semibold text-gray-900 text-lg leading-tight mb-1 group-hover:text-blue-900 transition-colors">
              {disease.name}
            </h3>
            {disease.nameDiff && (
              <p className="text-sm text-gray-600 italic mb-2">
                Tên khác: {disease.nameDiff}
              </p>
            )}
          </div>
          {disease.image && (
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
              <Image
                src={disease.image || "/placeholder.svg"}
                alt={disease.name}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          <p className="text-gray-700 text-sm leading-relaxed line-clamp-2">
            {disease.common || "Chưa có mô tả"}
          </p>

          {/* Status and Action */}
          <div className="flex items-center justify-between pt-2">
            <Badge
              variant="secondary"
              className={
                disease.status === "active"
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }
            >
              {disease.status === "active" ? "Hoạt động" : "Không hoạt động"}
            </Badge>
            <Link href={`/disease/${disease._id}`}>
              <Button
                size="sm"
                className="bg-blue-900 hover:bg-blue-800 text-white"
              >
                <Eye className="w-4 h-4 mr-1" />
                Xem chi tiết
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
