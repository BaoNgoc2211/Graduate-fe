"use client";
import { useState, useCallback, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Stethoscope } from "lucide-react";
import { useSymptomAnalysis } from "@/hooks/disease/symptom-analysis.hooks";
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
//bg-gradient-to-br
  return (
    <div className="min-h-screen bg-white  from-blue-50  to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-900 mb-2">
            <Stethoscope className="inline-block mr-2 text-blue-900" />
            Kiểm tra triệu chứng bệnh
          </h1>
          <p className="text-blue-600">
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
// "use client";
// import { useState, useCallback } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Badge } from "@/components/ui/badge";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import {
//   Loader2,
//   Stethoscope,
//   Activity,
//   AlertTriangle,
//   CheckCircle,
//   Info,
//   User,
//   Calendar,
//   FileText,
//   RotateCcw,
// } from "lucide-react";
// import { useSymptomAnalysis } from "@/hooks/disease/symptom-analysis.hooks";
// import { DiseasePrediction } from "@/api/disease/symptom-analysis.api";

// const SymptomCheckerPage = () => {
//   const [symptoms, setSymptoms] = useState("");
//   const [age, setAge] = useState("");
//   const [gender, setGender] = useState("");
//   const [selectedDiseaseIndex, setSelectedDiseaseIndex] = useState(0);

//   const { isLoading, error, result, analyzeSymptoms, reset } =
//     useSymptomAnalysis();

//   const handleAnalyzeSymptoms = useCallback(async () => {
//     await analyzeSymptoms(
//       symptoms,
//       age ? parseInt(age) : undefined,
//       gender || undefined
//     );
//   }, [analyzeSymptoms, symptoms, age, gender]);

//   const handleReset = useCallback(() => {
//     setSymptoms("");
//     setAge("");
//     setGender("");
//     setSelectedDiseaseIndex(0);
//     reset();
//   }, [reset]);

//   const handleSelectDisease = useCallback((index: number) => {
//     setSelectedDiseaseIndex(index);
//   }, []);

//   const getSeverityColor = (severity: string) => {
//     switch (severity) {
//       case "high":
//         return "bg-red-100 text-red-800 border-red-200";
//       case "medium":
//         return "bg-yellow-100 text-yellow-800 border-yellow-200";
//       case "low":
//         return "bg-green-100 text-green-800 border-green-200";
//       default:
//         return "bg-gray-100 text-gray-800 border-gray-200";
//     }
//   };

//   const getSeverityIcon = (severity: string) => {
//     switch (severity) {
//       case "high":
//         return <AlertTriangle className="w-4 h-4" />;
//       case "medium":
//         return <Info className="w-4 h-4" />;
//       case "low":
//         return <CheckCircle className="w-4 h-4" />;
//       default:
//         return <Info className="w-4 h-4" />;
//     }
//   };

//   const selectedDisease = result?.predictions[selectedDiseaseIndex];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
//       <div className="container mx-auto px-4 py-8 max-w-7xl flex flex-col items-center">
//         {/* Header */}
//         <div className="text-center mb-10 w-full">
//           <div className="flex items-center justify-center mb-4">
//             <div className="bg-blue-900 rounded-full p-3 mr-4">
//               <Stethoscope className="w-8 h-8 text-white" />
//             </div>
//             <h1 className="text-4xl font-bold text-gray-900">
//               AI Health Assistant
//             </h1>
//           </div>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             Mô tả triệu chứng của bạn để nhận được phân tích sơ bộ và khuyến
//             nghị từ hệ thống AI
//           </p>
//           <div className="mt-4 inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-sm text-blue-800">
//             <Info className="w-4 h-4 mr-2" />
//             Kết quả chỉ mang tính chất tham khảo, vui lòng tham khảo ý kiến bác
//             sĩ chuyên khoa
//           </div>
//         </div>
//         <div className="flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50">
//           <div className="w-full max-w-md">
//             <Card className="border-0 shadow-lg ">
//               <CardHeader className="bg-blue-900 text-white rounded-t-lg">
//                 <CardTitle className="flex items-center">
//                   <FileText className="w-5 h-5 mr-2" />
//                   Thông tin triệu chứng
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="p-6 space-y-6">
//                 {/* Symptoms Input */}
//                 <div className="space-y-2">
//                   <label className="text-sm font-medium text-gray-700">
//                     Mô tả triệu chứng của bạn *
//                   </label>
//                   <Textarea
//                     placeholder="Ví dụ: Tôi bị đau đầu, sốt nhẹ, ho khan, và cảm thấy mệt mỏi..."
//                     value={symptoms}
//                     onChange={(e) => setSymptoms(e.target.value)}
//                     className="min-h-[120px] resize-none border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//                     disabled={isLoading}
//                   />
//                   <p className="text-xs text-gray-500">
//                     Hãy mô tả chi tiết các triệu chứng bạn đang gặp phải
//                   </p>
//                 </div>

//                 {/* Personal Info */}
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="space-y-2">
//                     <label className="text-sm font-medium text-gray-700 flex items-center">
//                       <Calendar className="w-4 h-4 mr-1" />
//                       Tuổi
//                     </label>
//                     <Input
//                       type="number"
//                       placeholder="25"
//                       value={age}
//                       onChange={(e) => setAge(e.target.value)}
//                       className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
//                       disabled={isLoading}
//                       min="0"
//                       max="120"
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <label className="text-sm font-medium text-gray-700 flex items-center">
//                       <User className="w-4 h-4 mr-1" />
//                       Giới tính
//                     </label>
//                     <Select
//                       value={gender}
//                       onValueChange={setGender}
//                       disabled={isLoading}
//                     >
//                       <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 bg-white">
//                         <SelectValue placeholder="Chọn giới tính" />
//                       </SelectTrigger>
//                       <SelectContent className="bg-white border border-gray-300 rounded-md shadow-lg z-50">
//                         <SelectItem
//                           value="male"
//                           className="hover:bg-blue-50 focus:bg-blue-50"
//                         >
//                           Nam
//                         </SelectItem>
//                         <SelectItem
//                           value="female"
//                           className="hover:bg-blue-50 focus:bg-blue-50"
//                         >
//                           Nữ
//                         </SelectItem>
//                         <SelectItem
//                           value="other"
//                           className="hover:bg-blue-50 focus:bg-blue-50"
//                         >
//                           Khác
//                         </SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 </div>

//                 {/* Error Display */}
//                 {error && (
//                   <Alert className="border-red-200 bg-red-50">
//                     <AlertTriangle className="h-4 w-4 text-red-600" />
//                     <AlertDescription className="text-red-800">
//                       {error}
//                     </AlertDescription>
//                   </Alert>
//                 )}

//                 {/* Action Buttons */}
//                 <div className="flex gap-3">
//                   <Button
//                     onClick={handleAnalyzeSymptoms}
//                     disabled={isLoading || !symptoms.trim()}
//                     className="flex-1 bg-blue-900 hover:bg-blue-800 text-white"
//                   >
//                     {isLoading ? (
//                       <>
//                         <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                         Đang phân tích...
//                       </>
//                     ) : (
//                       <>
//                         <Activity className="w-4 h-4 mr-2" />
//                         Phân tích triệu chứng
//                       </>
//                     )}
//                   </Button>
//                   <Button
//                     onClick={handleReset}
//                     variant="outline"
//                     disabled={isLoading}
//                     className="border-gray-300 text-gray-700 hover:bg-gray-50"
//                   >
//                     <RotateCcw className="w-4 h-4" />
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Results Panel */}
//           <div className="lg:col-span-3">
//             {isLoading && (
//               <Card className="border-0 shadow-lg">
//                 <CardContent className="flex items-center justify-center py-16">
//                   <div className="text-center">
//                     <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
//                     <h3 className="text-lg font-semibold text-gray-900 mb-2">
//                       Đang phân tích triệu chứng
//                     </h3>
//                     <p className="text-gray-600">
//                       Hệ thống AI đang xử lý thông tin của bạn...
//                     </p>
//                   </div>
//                 </CardContent>
//               </Card>
//             )}

//             {result && result.predictions.length > 0 && (
//               <div className="space-y-6">
//                 {/* Disease Predictions */}
//                 <Card className="border-0 shadow-lg">
//                   <CardHeader className="bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-t-lg">
//                     <CardTitle className="flex items-center">
//                       <Activity className="w-5 h-5 mr-2" />
//                       Kết quả phân tích ({result.predictions.length} dự đoán)
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent className="p-6">
//                     <div className="grid gap-4">
//                       {result.predictions.map(
//                         (prediction: DiseasePrediction, index: number) => (
//                           <div
//                             key={index}
//                             className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
//                               selectedDiseaseIndex === index
//                                 ? "border-blue-500 bg-blue-50 shadow-md"
//                                 : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
//                             }`}
//                             onClick={() => handleSelectDisease(index)}
//                           >
//                             <div className="flex items-start justify-between">
//                               <div className="flex-1">
//                                 <div className="flex items-center gap-3 mb-2">
//                                   <h3 className="font-semibold text-lg text-gray-900">
//                                     {prediction.disease.name}
//                                   </h3>
//                                   <Badge
//                                     className={`${getSeverityColor(
//                                       prediction.severity
//                                     )} border`}
//                                   >
//                                     {getSeverityIcon(prediction.severity)}
//                                     <span className="ml-1 capitalize">
//                                       {prediction.severity}
//                                     </span>
//                                   </Badge>
//                                 </div>
//                                 <div className="flex items-center gap-4 text-sm text-gray-600">
//                                   <span>
//                                     Độ tin cậy:{" "}
//                                     {(prediction.confidence * 100).toFixed(1)}%
//                                   </span>
//                                   {prediction.urgentCare && (
//                                     <Badge className="bg-red-100 text-red-800 border-red-200">
//                                       <AlertTriangle className="w-3 h-3 mr-1" />
//                                       Cần chú ý
//                                     </Badge>
//                                   )}
//                                 </div>
//                               </div>
//                               <div className="text-right">
//                                 <div
//                                   className={`text-2xl font-bold ${
//                                     prediction.confidence > 0.7
//                                       ? "text-red-600"
//                                       : prediction.confidence > 0.4
//                                       ? "text-yellow-600"
//                                       : "text-green-600"
//                                   }`}
//                                 >
//                                   {(prediction.confidence * 100).toFixed(0)}%
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         )
//                       )}
//                     </div>
//                   </CardContent>
//                 </Card>

//                 {/* Disease Detail */}
//                 {selectedDisease && (
//                   <Card className="border-0 shadow-lg">
//                     <CardHeader className="bg-gray-50 border-b">
//                       <CardTitle className="text-xl text-gray-900">
//                         Chi tiết: {selectedDisease.disease.name}
//                       </CardTitle>
//                     </CardHeader>
//                     <CardContent className="p-6 space-y-6">
//                       <div className="grid gap-6 md:grid-cols-2">
//                         <div className="space-y-4">
//                           <div>
//                             <h4 className="font-semibold text-gray-900 mb-2">
//                               Thông tin chung
//                             </h4>
//                             <p className="text-gray-700 text-sm leading-relaxed">
//                               {selectedDisease.disease.common}
//                             </p>
//                           </div>

//                           <div>
//                             <h4 className="font-semibold text-gray-900 mb-2">
//                               Nhóm nguy cơ
//                             </h4>
//                             <div className="flex flex-wrap gap-2">
//                               {selectedDisease.disease.riskGroup.map(
//                                 (group, idx) => (
//                                   <Badge
//                                     key={idx}
//                                     variant="outline"
//                                     className="text-xs"
//                                   >
//                                     {group}
//                                   </Badge>
//                                 )
//                               )}
//                             </div>
//                           </div>
//                         </div>

//                         <div className="space-y-4">
//                           <div>
//                             <h4 className="font-semibold text-gray-900 mb-2">
//                               Nguyên nhân
//                             </h4>
//                             <p className="text-gray-700 text-sm leading-relaxed">
//                               {selectedDisease.disease.causes}
//                             </p>
//                           </div>

//                           <div>
//                             <h4 className="font-semibold text-gray-900 mb-2">
//                               Phòng ngừa
//                             </h4>
//                             <p className="text-gray-700 text-sm leading-relaxed">
//                               {selectedDisease.disease.prevention}
//                             </p>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="border-t pt-6">
//                         <h4 className="font-semibold text-gray-900 mb-2">
//                           Khuyến nghị điều trị
//                         </h4>
//                         <p className="text-gray-700 text-sm leading-relaxed mb-4">
//                           {selectedDisease.disease.treatmentPlan}
//                         </p>

//                         <Alert className="border-blue-200 bg-blue-50">
//                           <Info className="h-4 w-4 text-blue-600" />
//                           <AlertDescription className="text-blue-800">
//                             <strong>Lưu ý quan trọng:</strong>{" "}
//                             {selectedDisease.disease.notes}
//                           </AlertDescription>
//                         </Alert>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SymptomCheckerPage;
