"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Stethoscope, AlertTriangle } from "lucide-react";
import { SymptomAnalysisResponse } from "@/api/disease/symptom-analysis.api";

interface SymptomResultProps {
  result: SymptomAnalysisResponse;
  onSelectDisease?: (index: number) => void;
  selectedIndex?: number;
}

export const SymptomResult = ({ result, onSelectDisease, selectedIndex = 0 }: SymptomResultProps) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case "low":
        return "Nhẹ";
      case "medium":
        return "Trung bình";
      case "high":
        return "Nặng";
      default:
        return "Không xác định";
    }
  };

  const getDiseaseDescription = (diseaseName: string) => {
    const descriptions: { [key: string]: string } = {
      'Đột Quỵ': 'Đột quỵ là tình trạng não bị thiếu máu đột ngột, có thể gây liệt nửa người, méo mặt, khó nói. Cần cấp cứu ngay lập tức.',
      'Dị Ứng Thời Tiết': 'Phản ứng dị ứng với thay đổi thời tiết, thường gây ngứa, nổi mề đay, sổ mũi.',
      'Thiếu Máu': 'Tình trạng thiếu hồng cầu hoặc hemoglobin, gây mệt mỏi, da xanh xao, chóng mặt.',
      'Cảm Cúm': 'Bệnh nhiễm trùng đường hô hấp do virus, gây sốt, ho, đau họng, mệt mỏi.',
      'Viêm Họng': 'Viêm nhiễm vùng họng, gây đau khi nuốt, ho, khàn tiếng.',
      'Đau Dạ Dày': 'Tình trạng đau vùng thượng vị, thường do viêm loét dạ dày.',
      'Hen Suyễn': 'Bệnh viêm đường hô hấp mạn tính, gây khó thở, thở khò khè.',
      'Viêm Phổi': 'Nhiễm trùng phổi nghiêm trọng, cần điều trị kháng sinh.',
      'Tiểu Đường': 'Rối loạn chuyển hóa glucose, cần kiểm soát đường huyết.',
      'Cao Huyết Áp': 'Huyết áp cao, có thể gây biến chứng tim mạch.',
      'Viêm Gan': 'Viêm nhiễm ở gan, có thể do virus, rượu bia hoặc thuốc.',
      'Sỏi Thận': 'Những tinh thể cứng hình thành trong thận, có thể gây đau dữ dội.',
      'Đau Thắt Ngực': 'Triệu chứng của bệnh tim mạch, thường xảy ra khi tim không nhận đủ máu.',
      'Viêm Phế Quản': 'Viêm nhiễm ở đường thở, thường do virus gây ra.',
      'Tiêu Chảy': 'Tình trạng đi ngoài phân lỏng nhiều lần, có thể do nhiễm khuẩn.',
      'Táo Bón': 'Tình trạng khó đi ngoài, phân cứng. Cần ăn nhiều chất xơ.',
      'Dị Ứng Thực Phẩm': 'Phản ứng với protein trong thức ăn, cần tránh thực phẩm gây dị ứng.',
      'Viêm Dạ Dày': 'Viêm niêm mạc dạ dày, có thể do vi khuẩn H.pylori.',
      'Trào Ngược Dạ Dày': 'Axit dạ dày trào ngược lên thực quản, gây ợ chua, đau ngực.',
      'Viêm Xoang': 'Viêm nhiễm ở các hốc xoang, gây nghẹt mũi, đau đầu.',
      'Viêm Tai Giữa': 'Viêm nhiễm ở tai giữa, thường gặp ở trẻ em.',
      'Viêm Kết Mạc': 'Viêm màng mắt, có thể do virus, vi khuẩn hoặc dị ứng.',
      'Viêm Da': 'Viêm nhiễm ở da, có thể do dị ứng, nhiễm khuẩn.',
      'Viêm Khớp': 'Viêm nhiễm ở khớp, gây đau, cứng khớp.',
      'Loãng Xương': 'Xương mất dần mật độ, trở nên giòn và dễ gãy.',
      'Đái Tháo Đường': 'Rối loạn chuyển hóa glucose, gây tăng đường huyết.',
      'Suy Tim': 'Tim không bơm máu hiệu quả, gây mệt mỏi, khó thở.',
      'Rối Loạn Tiền Đình': 'Gây chóng mặt, mất thăng bằng.',
      'Đau Nửa Đầu': 'Cơn đau đầu dữ dội, thường kèm buồn nôn.',
      'Mất Ngủ': 'Khó đi vào giấc ngủ hoặc ngủ không sâu.',
      'Trầm Cảm': 'Rối loạn tâm trạng, gây buồn bã kéo dài.',
      'Lo Âu': 'Cảm giác lo lắng, sợ hãi quá mức.'
    };
    
    return descriptions[diseaseName] || 'Thông tin chi tiết về bệnh cần được tư vấn bởi bác sĩ chuyên khoa.';
  };

  return (
    <div className="space-y-4">
      {/* Top 3 bệnh dự đoán */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Stethoscope className="text-green-600" />
            Top {result.predictions.length} bệnh dự đoán
          </CardTitle>
          {result.processingTime && (
            <CardDescription>
              Thời gian xử lý: {result.processingTime}s
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-3">
          {result.predictions.map((prediction, index) => (
            <div 
              key={index} 
              className={`border rounded-lg p-3 hover:shadow-md transition-shadow cursor-pointer ${
                index === selectedIndex 
                  ? 'bg-blue-50 border-blue-300 shadow-md' 
                  : 'bg-white'
              }`}
              onClick={() => onSelectDisease?.(index)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-blue-100 text-blue-800 text-xs">
                    #{index + 1}
                  </Badge>
                  <h3 className="font-semibold text-base text-gray-900">
                    {prediction.disease.name}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-1">
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${getSeverityColor(prediction.severity)}`}
                  >
                    {getSeverityText(prediction.severity)}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {Math.round(prediction.confidence * 100)}%
                  </Badge>
                  {prediction.urgentCare && (
                    <Badge variant="destructive" className="text-xs">
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      Cấp cứu
                    </Badge>
                  )}
                </div>
              </div>
              
              <div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {getDiseaseDescription(prediction.disease.name)}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Cảnh báo */}
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Lưu ý quan trọng:</strong> Kết quả chẩn đoán này chỉ mang tính chất tham khảo. 
          Để có chẩn đoán chính xác, vui lòng đến gặp bác sĩ hoặc dược sĩ để được tư vấn trực tiếp. 
          {result.predictions.some(p => p.urgentCare) && (
            <span className="block mt-1 font-semibold text-red-600">
              ⚠️ Có bệnh nghiêm trọng được dự đoán - cần được chăm sóc y tế ngay lập tức!
            </span>
          )}
        </AlertDescription>
      </Alert>
    </div>
  );
};

