"use client";
import { useState, useCallback, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Stethoscope } from "lucide-react";
import { useSymptomAnalysis } from "@/hooks/symptom-analysis.hooks";
import { SymptomResult } from "./components/symptom-result";
import { SymptomForm } from "./components/symptom-form";
import { DiseaseDetail } from "./components/disease-detail";

const SymptomCheckerPage = () => {
  const [symptoms, setSymptoms] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [selectedDiseaseIndex, setSelectedDiseaseIndex] = useState(0);
  
  const { isLoading, error, result, analyzeSymptoms, reset } = useSymptomAnalysis();

  const handleAnalyzeSymptoms = useCallback(async () => {
    await analyzeSymptoms(symptoms, age ? parseInt(age) : undefined, gender || undefined);
  }, [analyzeSymptoms, symptoms, age, gender]);

  const handleReset = useCallback(() => {
    setSymptoms("");
    setAge("");
    setGender("");
    setSelectedDiseaseIndex(0);
    reset();
  }, [reset]);

  const handleSelectDisease = useCallback((index: number) => {
    setSelectedDiseaseIndex(index);
  }, []);

  const handleSymptomsChange = useCallback((value: string) => {
    setSymptoms(value);
  }, []);

  // Memoize form props để tránh re-render không cần thiết
  const symptomFormProps = useMemo(() => ({
    symptoms,
    isLoading,
    error,
    isServiceAvailable: true,
    onSymptomsChange: handleSymptomsChange,
    onAnalyze: handleAnalyzeSymptoms,
    onReset: handleReset
  }), [symptoms, isLoading, error, handleSymptomsChange, handleAnalyzeSymptoms, handleReset]);

  // Memoize result props - chỉ tạo khi result không null
  const symptomResultProps = useMemo(() => result ? {
    result,
    selectedIndex: selectedDiseaseIndex,
    onSelectDisease: handleSelectDisease
  } : null, [result, selectedDiseaseIndex, handleSelectDisease]);

  const diseaseDetailProps = useMemo(() => result ? {
    result,
    selectedIndex: selectedDiseaseIndex,
    onSelectDisease: handleSelectDisease
  } : null, [result, selectedDiseaseIndex, handleSelectDisease]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            <Stethoscope className="inline-block mr-2 text-blue-600" />
            Kiểm tra triệu chứng bệnh
          </h1>
          <p className="text-gray-600">
            Mô tả các triệu chứng bạn đang gặp phải để nhận được chẩn đoán sơ bộ và khuyến nghị điều trị
          </p>
        </div>

        <div className="space-y-6">
          {/* Form nhập triệu chứng */}
          <SymptomForm {...symptomFormProps} />

          {/* Kết quả */}
          {isLoading && (
            <Card>
              <CardContent className="flex items-center justify-center py-8">
                <div className="text-center">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-2" />
                  <p className="text-gray-600">Đang phân tích triệu chứng...</p>
                </div>
              </CardContent>
            </Card>
          )}

          {result && symptomResultProps && diseaseDetailProps && (
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Top 3 bệnh dự đoán */}
              <div className="lg:col-span-1">
                <SymptomResult {...symptomResultProps} />
              </div>
              
              {/* Chi tiết bệnh */}
              <div className="lg:col-span-2">
                <DiseaseDetail {...diseaseDetailProps} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SymptomCheckerPage;
