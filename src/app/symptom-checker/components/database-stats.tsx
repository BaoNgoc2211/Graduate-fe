import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, Pill, Stethoscope, Activity } from "lucide-react";
import { useSymptomsFromDatabase, useDiseasesFromDatabase, useAllMedicinesFromDatabase } from "@/hooks/symptom-analysis.hooks";

export const DatabaseStats = () => {
  const { symptoms, isLoading: isLoadingSymptoms } = useSymptomsFromDatabase();
  const { diseases, isLoading: isLoadingDiseases } = useDiseasesFromDatabase();
  const { medicines, isLoading: isLoadingMedicines } = useAllMedicinesFromDatabase();

  const isLoading = isLoadingSymptoms || isLoadingDiseases || isLoadingMedicines;

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-6">
          <div className="text-center">
            <Activity className="h-6 w-6 animate-pulse text-blue-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Đang tải thống kê dữ liệu...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="text-blue-600" />
          Thống kê cơ sở dữ liệu
        </CardTitle>
        <CardDescription>
          Tổng quan về dữ liệu y tế có sẵn trong hệ thống
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Thống kê triệu chứng */}
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Stethoscope className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-900">{symptoms.length}</div>
            <div className="text-sm text-blue-700">Triệu chứng</div>
            <Badge variant="outline" className="mt-2 text-xs">
              Có sẵn
            </Badge>
          </div>

          {/* Thống kê bệnh */}
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <Activity className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-900">{diseases.length}</div>
            <div className="text-sm text-green-700">Bệnh</div>
            <Badge variant="outline" className="mt-2 text-xs">
              Đã phân loại
            </Badge>
          </div>

          {/* Thống kê thuốc */}
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <Pill className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-900">{medicines.length}</div>
            <div className="text-sm text-purple-700">Thuốc</div>
            <Badge variant="outline" className="mt-2 text-xs">
              Khuyến nghị
            </Badge>
          </div>
        </div>

        {/* Thông tin chi tiết */}
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-sm mb-2">Thông tin hệ thống:</h4>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>• Hệ thống sử dụng AI để phân tích triệu chứng và dự đoán bệnh</li>
            <li>• Dữ liệu được lấy từ cơ sở dữ liệu y tế chuyên nghiệp</li>
            <li>• Kết quả chỉ mang tính chất tham khảo, không thay thế chẩn đoán của bác sĩ</li>
            <li>• Thuốc khuyến nghị được dựa trên chẩn đoán bệnh và phù hợp với từng trường hợp</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

