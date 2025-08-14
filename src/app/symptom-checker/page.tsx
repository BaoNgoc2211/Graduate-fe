"use client";
import { useState } from "react";
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

  const handleAnalyzeSymptoms = async () => {
    await analyzeSymptoms(symptoms, age ? parseInt(age) : undefined, gender || undefined);
  };

  const handleReset = () => {
    setSymptoms("");
    setAge("");
    setGender("");
    setSelectedDiseaseIndex(0);
    reset();
  };

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
          <SymptomForm
            symptoms={symptoms}
            isLoading={isLoading}
            error={error}
            isServiceAvailable={true}
            onSymptomsChange={setSymptoms}
            onAnalyze={handleAnalyzeSymptoms}
            onReset={handleReset}
          />

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

          {result && (
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Top 3 bệnh dự đoán */}
              <div className="lg:col-span-1">
                <SymptomResult 
                  result={result} 
                  selectedIndex={selectedDiseaseIndex}
                  onSelectDisease={setSelectedDiseaseIndex}
                />
              </div>
              
              {/* Chi tiết bệnh */}
              <div className="lg:col-span-2">
                <DiseaseDetail 
                  result={result} 
                  selectedIndex={selectedDiseaseIndex}
                  onSelectDisease={setSelectedDiseaseIndex}
                />
              </div>
            </div>
          )}
        </div>


      </div>
    </div>
  );
};

export default SymptomCheckerPage;
