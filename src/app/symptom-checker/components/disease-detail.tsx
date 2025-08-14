"use client";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Stethoscope, Info, Heart, Shield, AlertTriangle, Clock, Users } from "lucide-react";
import { SymptomAnalysisResponse } from "@/api/disease/symptom-analysis.api";

interface DiseaseDetailProps {
  result: SymptomAnalysisResponse;
  selectedIndex?: number;
  onSelectDisease?: (index: number) => void;
}

export const DiseaseDetail = ({ result, selectedIndex = 0, onSelectDisease }: DiseaseDetailProps) => {
  const selectedDisease = result.predictions[selectedIndex];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'Nặng';
      case 'medium':
        return 'Trung bình';
      case 'low':
        return 'Nhẹ';
      default:
        return 'Không xác định';
    }
  };

  const getDiseaseDescription = (diseaseName: string) => {
    const descriptions: { [key: string]: string } = {
      'Đột Quỵ': 'Đột quỵ là tình trạng não bị thiếu máu đột ngột, có thể gây liệt nửa người, méo miệng, khó nói. Cần cấp cứu ngay lập tức.',
      'Viêm Phổi': 'Viêm phổi là tình trạng viêm nhiễm ở phổi, thường do vi khuẩn hoặc virus gây ra. Triệu chứng bao gồm ho, sốt, khó thở.',
      'Cảm Cúm': 'Cảm cúm là bệnh nhiễm trùng đường hô hấp do virus cúm gây ra. Triệu chứng thường nhẹ và tự khỏi sau 1-2 tuần.',
      'Viêm Họng': 'Viêm họng là tình trạng viêm nhiễm ở cổ họng, thường do virus hoặc vi khuẩn gây ra. Triệu chứng chính là đau họng, khó nuốt.',
      'Đau Dạ Dày': 'Đau dạ dày có thể do viêm loét, trào ngược axit hoặc các vấn đề tiêu hóa khác. Cần điều chỉnh chế độ ăn uống.',
      'Cao Huyết Áp': 'Cao huyết áp là tình trạng huyết áp tăng cao kéo dài, có thể gây biến chứng tim mạch nghiêm trọng.',
      'Thiếu Máu': 'Thiếu máu là tình trạng giảm số lượng hồng cầu hoặc hemoglobin, gây mệt mỏi, chóng mặt, da xanh xao.',
      'Dị Ứng Thời Tiết': 'Dị ứng thời tiết xảy ra khi cơ thể phản ứng với thay đổi nhiệt độ, độ ẩm. Triệu chứng bao gồm hắt hơi, chảy nước mũi.',
      'Viêm Gan': 'Viêm gan là tình trạng viêm nhiễm ở gan, có thể do virus, rượu bia hoặc thuốc. Cần điều trị kịp thời để tránh biến chứng.',
      'Sỏi Thận': 'Sỏi thận là những tinh thể cứng hình thành trong thận, có thể gây đau dữ dội khi di chuyển. Cần uống nhiều nước và điều trị.',
      'Đau Thắt Ngực': 'Đau thắt ngực là triệu chứng của bệnh tim mạch, thường xảy ra khi tim không nhận đủ máu. Cần khám tim mạch ngay.',
      'Hen Suyễn': 'Hen suyễn là bệnh viêm đường hô hấp mãn tính, gây khó thở, thở khò khè. Cần sử dụng thuốc dự phòng và cắt cơn.',
      'Viêm Phế Quản': 'Viêm phế quản là tình trạng viêm nhiễm ở đường thở, thường do virus gây ra. Triệu chứng bao gồm ho, đờm, khó thở.',
      'Tiêu Chảy': 'Tiêu chảy là tình trạng đi ngoài phân lỏng nhiều lần, có thể do nhiễm khuẩn, virus hoặc ngộ độc thực phẩm.',
      'Táo Bón': 'Táo bón là tình trạng khó đi ngoài, phân cứng. Cần ăn nhiều chất xơ, uống đủ nước và vận động thường xuyên.',
      'Dị Ứng Thực Phẩm': 'Dị ứng thực phẩm xảy ra khi cơ thể phản ứng với protein trong thức ăn. Cần tránh thực phẩm gây dị ứng.',
      'Viêm Dạ Dày': 'Viêm dạ dày là tình trạng viêm niêm mạc dạ dày, có thể do vi khuẩn H.pylori, thuốc hoặc stress.',
      'Trào Ngược Dạ Dày': 'Trào ngược dạ dày là tình trạng axit dạ dày trào ngược lên thực quản, gây ợ chua, đau ngực.',
      'Viêm Xoang': 'Viêm xoang là tình trạng viêm nhiễm ở các hốc xoang, gây nghẹt mũi, đau đầu, chảy nước mũi.',
      'Viêm Tai Giữa': 'Viêm tai giữa là tình trạng viêm nhiễm ở tai giữa, thường gặp ở trẻ em. Triệu chứng bao gồm đau tai, sốt.',
      'Viêm Kết Mạc': 'Viêm kết mạc là tình trạng viêm màng mắt, có thể do virus, vi khuẩn hoặc dị ứng. Triệu chứng bao gồm đỏ mắt, ngứa.',
      'Viêm Da': 'Viêm da là tình trạng viêm nhiễm ở da, có thể do dị ứng, nhiễm khuẩn hoặc các yếu tố môi trường.',
      'Viêm Khớp': 'Viêm khớp là tình trạng viêm nhiễm ở khớp, gây đau, cứng khớp. Có nhiều loại viêm khớp khác nhau.',
      'Loãng Xương': 'Loãng xương là tình trạng xương mất dần mật độ, trở nên giòn và dễ gãy. Thường gặp ở người cao tuổi.',
      'Đái Tháo Đường': 'Đái tháo đường là bệnh rối loạn chuyển hóa glucose, gây tăng đường huyết. Cần kiểm soát chế độ ăn và thuốc.',
      'Suy Tim': 'Suy tim là tình trạng tim không bơm máu hiệu quả, gây mệt mỏi, khó thở, phù chân.',
      'Rối Loạn Tiền Đình': 'Rối loạn tiền đình gây chóng mặt, mất thăng bằng. Có thể do viêm tai, chấn thương đầu hoặc các bệnh khác.',
      'Đau Nửa Đầu': 'Đau nửa đầu là cơn đau đầu dữ dội, thường kèm theo buồn nôn, nhạy cảm với ánh sáng và âm thanh.',
      'Mất Ngủ': 'Mất ngủ là tình trạng khó đi vào giấc ngủ hoặc ngủ không sâu. Có thể do stress, thay đổi lịch sinh hoạt.',
      'Trầm Cảm': 'Trầm cảm là rối loạn tâm trạng, gây buồn bã kéo dài, mất hứng thú với các hoạt động thường ngày.',
      'Lo Âu': 'Lo âu là cảm giác lo lắng, sợ hãi quá mức. Có thể ảnh hưởng đến cuộc sống hàng ngày và cần điều trị tâm lý.'
    };
    
    return descriptions[diseaseName] || "Thông tin chi tiết về bệnh này đang được cập nhật. Vui lòng tham khảo ý kiến bác sĩ để có thông tin chính xác.";
  };

  const getTreatmentAdvice = (diseaseName: string, severity: string) => {
    const baseAdvice = "Vui lòng tham khảo ý kiến bác sĩ để có hướng điều trị phù hợp. ";
    
    if (severity === 'high') {
      return baseAdvice + "Đây là bệnh nghiêm trọng, cần được chăm sóc y tế ngay lập tức.";
    } else if (severity === 'medium') {
      return baseAdvice + "Cần theo dõi triệu chứng và có thể cần điều trị y tế.";
    } else {
      return baseAdvice + "Có thể tự điều trị tại nhà với thuốc không kê đơn.";
    }
  };

  return (
    <div className="space-y-6">
      {/* Chi tiết bệnh được chọn */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Stethoscope className="text-blue-600" />
            Chi tiết bệnh: {selectedDisease.disease.name}
          </CardTitle>
          <CardDescription>
            Thông tin chi tiết về bệnh và hướng dẫn điều trị
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Thông tin cơ bản */}
          <div className="flex flex-wrap gap-3">
            <Badge 
              variant="outline" 
              className={getSeverityColor(selectedDisease.severity)}
            >
              Mức độ: {getSeverityText(selectedDisease.severity)}
            </Badge>
            <Badge variant="outline">
              Độ tin cậy: {Math.round(selectedDisease.confidence * 100)}%
            </Badge>
            {selectedDisease.urgentCare && (
              <Badge variant="destructive">
                <AlertTriangle className="w-3 h-3 mr-1" />
                Cần cấp cứu
              </Badge>
            )}
          </div>

          {/* Mô tả bệnh */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
              <Info className="w-4 h-4" />
              Mô tả bệnh
            </h4>
            <p className="text-gray-600 leading-relaxed">
              {getDiseaseDescription(selectedDisease.disease.name)}
            </p>
          </div>

          {/* Hướng dẫn điều trị */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Hướng dẫn điều trị
            </h4>
            <p className="text-gray-600 leading-relaxed">
              {getTreatmentAdvice(selectedDisease.disease.name, selectedDisease.severity)}
            </p>
          </div>

          {/* Phòng ngừa */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Phòng ngừa
            </h4>
            <p className="text-gray-600 leading-relaxed">
              {selectedDisease.disease.prevention}
            </p>
          </div>

          {/* Nhóm nguy cơ */}
          {selectedDisease.disease.riskGroup && selectedDisease.disease.riskGroup.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Nhóm nguy cơ
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedDisease.disease.riskGroup.map((group, index) => (
                  <Badge key={index} variant="secondary">
                    {group}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Nguyên nhân */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Nguyên nhân</h4>
            <p className="text-gray-600 leading-relaxed">
              {selectedDisease.disease.causes}
            </p>
          </div>

          {/* Chẩn đoán */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Chẩn đoán</h4>
            <p className="text-gray-600 leading-relaxed">
              {selectedDisease.disease.diagnosis}
            </p>
          </div>

          {/* Kế hoạch điều trị */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Kế hoạch điều trị</h4>
            <p className="text-gray-600 leading-relaxed">
              {selectedDisease.disease.treatmentPlan}
            </p>
          </div>

          {/* Ghi chú */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Ghi chú</h4>
            <p className="text-gray-600 leading-relaxed">
              {selectedDisease.disease.notes}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Cảnh báo */}
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Lưu ý quan trọng:</strong> Thông tin này chỉ mang tính chất tham khảo. 
          Để có chẩn đoán chính xác và hướng dẫn điều trị phù hợp, vui lòng đến gặp bác sĩ chuyên khoa.
          {selectedDisease.urgentCare && (
            <span className="block mt-1 font-semibold text-red-600">
              ⚠️ Bệnh này cần được chăm sóc y tế ngay lập tức!
            </span>
          )}
        </AlertDescription>
      </Alert>
    </div>
  );
};
