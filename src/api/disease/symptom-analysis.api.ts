import APIConfig from "../api.config";
import FastAPIConfig from "../fastapi.config";
import { IDisease } from "@/interface/disease/disease.interface";

export interface SymptomAnalysisRequest {
  symptoms: string;
  age?: number;
  gender?: string;
  medicalHistory?: string[];
}

export interface SymptomAnalysisResponse {
  predictions: DiseasePrediction[];
  recommendedMedicines: MedicineRecommendation[];
  processingTime?: number;
}

export interface DiseasePrediction {
  disease: IDisease;
  confidence: number;
  severity: 'low' | 'medium' | 'high';
  urgentCare: boolean;
}

export interface MedicineRecommendation {
  _id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  dosage?: string;
  contraindications?: string[];
}

export const analyzeSymptomsAPI = async (data: SymptomAnalysisRequest): Promise<{
  data: SymptomAnalysisResponse;
}> => {
  // Gọi FastAPI service trên port 8001 để dự đoán bệnh
  const response = await FastAPIConfig.post("/predict", {
    text: data.symptoms,
    top_k: 3,
    alpha: 0.9
  });
  
  console.log('FastAPI predict response:', response.data);
  
  // Chuyển đổi response từ FastAPI sang format mong đợi
  const fastAPIResponse = response.data as any;
  const predictions = fastAPIResponse.predictions || [];
  
  // Xác định mức độ nghiêm trọng dựa trên confidence và loại bệnh
  const getSeverityLevel = (confidence: number, diseaseName: string) => {
    // Các bệnh nghiêm trọng cần chú ý đặc biệt
    const criticalDiseases = ['đột quỵ', 'viêm phổi', 'viêm gan', 'sỏi thận', 'đau thắt ngực'];
    const isCriticalDisease = criticalDiseases.some(disease => 
      diseaseName.toLowerCase().includes(disease)
    );
    
    if (isCriticalDisease || confidence > 0.7) {
      return 'high';
    } else if (confidence > 0.4) {
      return 'medium';
    } else {
      return 'low';
    }
  };
  
  // Chuyển đổi tất cả predictions
  const diseasePredictions: DiseasePrediction[] = predictions.map((prediction: any) => {
    const severity = getSeverityLevel(prediction.confidence, prediction.disease);
    
    return {
      disease: {
        _id: prediction.disease.toLowerCase().replace(/\s+/g, '_'),
        code: prediction.disease.toLowerCase().replace(/\s+/g, '_'),
        name: prediction.disease,
        nameDiff: prediction.disease,
        common: `Dự đoán bệnh: ${prediction.disease} với độ tin cậy ${(prediction.confidence * 100).toFixed(1)}%`,
        riskGroup: ['Người cao tuổi', 'Trẻ em', 'Người có bệnh nền'],
        causes: 'Nguyên nhân cần được xác định bởi bác sĩ chuyên khoa',
        diagnosis: 'Chẩn đoán dựa trên triệu chứng được mô tả',
        prevention: 'Giữ gìn vệ sinh, ăn uống lành mạnh, tập thể dục đều đặn',
        severityLevel: severity,
        treatmentPlan: 'Vui lòng tham khảo ý kiến bác sĩ để có hướng điều trị phù hợp',
        notes: 'Đây là kết quả dự đoán từ AI, chỉ mang tính chất tham khảo',
        status: 'active',
        symptomIds: [],
        diseaseCategoryIds: [],
        diseaseUsageGroupIds: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      } as IDisease,
      confidence: prediction.confidence,
      severity: severity,
      urgentCare: severity === 'high' || prediction.confidence > 0.8
    };
  });
  
  return {
    data: {
      predictions: diseasePredictions,
      recommendedMedicines: [],
      processingTime: fastAPIResponse.processing_time
    }
  };
};

export const getDiseaseRecommendationsAPI = async (diseaseId: string): Promise<{
  data: MedicineRecommendation[];
}> => {
  // Lấy khuyến nghị thuốc từ backend Express.js
  const response = await APIConfig.get(`/api/disease/${diseaseId}/medicines`);
  return response.data as { data: MedicineRecommendation[] };
};

// API để lấy thông tin chi tiết bệnh từ backend Express.js
export const getDiseaseDetailsAPI = async (diseaseId: string): Promise<{
  data: IDisease;
}> => {
  const response = await APIConfig.get(`/api/disease/detail/${diseaseId}`);
  return response.data as { data: IDisease };
};

export const checkServiceHealthAPI = async (): Promise<{
  data: { status: string; message: string };
}> => {
  // Kiểm tra sức khỏe của FastAPI service
  const response = await FastAPIConfig.get("/health");
  console.log('Raw health response:', response);
  
  // Xử lý response structure khác nhau
  const responseData = response.data as any;
  
  // Nếu response trực tiếp có status
  if (responseData.status) {
    return { data: { status: responseData.status, message: responseData.message || 'OK' } };
  }
  
  // Nếu response có data wrapper
  if (responseData.data && responseData.data.status) {
    return { data: { status: responseData.data.status, message: responseData.data.message || 'OK' } };
  }
  
  // Fallback
  return { data: { status: 'unknown', message: 'Unknown response format' } };
};

export const getSupportedDiseasesAPI = async (): Promise<{
  data: IDisease[];
}> => {
  // Lấy danh sách bệnh từ FastAPI
  const response = await FastAPIConfig.get("/diseases");
  console.log('FastAPI diseases response:', response.data);
  
  const fastAPIResponse = response.data as any;
  const diseases = fastAPIResponse.diseases || [];
  
  // Chuyển đổi sang format IDisease
  const convertedDiseases: IDisease[] = diseases.map((disease: string, index: number) => ({
    _id: disease.toLowerCase().replace(/\s+/g, '_'),
    code: disease.toLowerCase().replace(/\s+/g, '_'),
    name: disease,
    nameDiff: disease,
    common: `Bệnh ${disease}`,
    riskGroup: ['Người cao tuổi', 'Trẻ em', 'Người có bệnh nền'],
    causes: 'Nguyên nhân cần được xác định bởi bác sĩ chuyên khoa',
    diagnosis: 'Chẩn đoán cần được thực hiện bởi bác sĩ',
    prevention: 'Giữ gìn vệ sinh, ăn uống lành mạnh, tập thể dục đều đặn',
    severityLevel: 'medium',
    treatmentPlan: 'Vui lòng tham khảo ý kiến bác sĩ để có hướng điều trị phù hợp',
    notes: 'Thông tin từ hệ thống AI dự đoán bệnh',
    status: 'active',
    symptomIds: [],
    diseaseCategoryIds: [],
    diseaseUsageGroupIds: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }));
  
  return { data: convertedDiseases };
};

export const testConnectionAPI = async (): Promise<{
  data: { status: string; message: string };
}> => {
  // Test kết nối với FastAPI service - sử dụng /health thay vì /test
  const response = await FastAPIConfig.get("/health");
  return response.data as { data: { status: string; message: string } };
};
