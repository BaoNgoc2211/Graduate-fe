import { useState } from 'react';
import { 
  analyzeSymptomsAPI, 
  getDiseaseDetailsAPI, 
  getDiseaseRecommendationsAPI,
  SymptomAnalysisRequest, 
  SymptomAnalysisResponse 
} from '@/api/disease/symptom-analysis.api';

export const useSymptomAnalysis = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SymptomAnalysisResponse | null>(null);

  const analyzeSymptoms = async (symptoms: string, age?: number, gender?: string) => {
    if (!symptoms.trim()) {
      setError("Vui lòng nhập triệu chứng của bạn");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const requestData: SymptomAnalysisRequest = {
        symptoms: symptoms.trim(),
        age,
        gender
      };

      const response = await analyzeSymptomsAPI(requestData);
      
      // Response đã được xử lý trong API function
      setResult(response.data);
    } catch (err: any) {
      console.error('Error analyzing symptoms:', err);
      
      // Xử lý các loại lỗi khác nhau từ backend
      if (err.message?.includes('CORS') || err.message?.includes('cors')) {
        setError("Lỗi CORS: Không thể kết nối đến dịch vụ dự đoán. Vui lòng thử lại sau.");
      } else if (err.response?.status === 401) {
        setError("Bạn cần đăng nhập để sử dụng tính năng này");
      } else if (err.response?.status === 503) {
        setError("Dịch vụ dự đoán bệnh hiện không khả dụng. Vui lòng thử lại sau.");
      } else if (err.response?.status === 422) {
        setError("Dữ liệu triệu chứng không hợp lệ. Vui lòng kiểm tra lại.");
      } else if (err.code === 'NETWORK_ERROR' || err.message?.includes('fetch')) {
        setError("Lỗi kết nối mạng. Vui lòng kiểm tra kết nối internet và thử lại.");
      } else {
        setError(err.response?.data?.message || "Có lỗi xảy ra khi phân tích triệu chứng. Vui lòng thử lại.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setError(null);
    setResult(null);
    setIsLoading(false);
  };

  return {
    isLoading,
    error,
    result,
    analyzeSymptoms,
    reset
  };
};
