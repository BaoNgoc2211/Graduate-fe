"use client";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Database, 
  TestTube, 
  CheckCircle, 
  XCircle, 
  Loader2,
  Play,
  Copy,
  Eye
} from "lucide-react";
import {
  getSymptomsFromDatabaseAPI,
  getDiseasesFromDatabaseAPI,
  getDiseaseFromDatabaseAPI,
  getMedicineRecommendationsFromDatabaseAPI,
  getAllMedicinesFromDatabaseAPI,
  analyzeSymptomsWithDatabaseAPI
} from "@/api/disease/symptom-analysis.api";

interface APITest {
  name: string;
  description: string;
  endpoint: string;
  method: 'GET' | 'POST';
  testFunction: () => Promise<any>;
  parameters?: { name: string; type: string; description: string }[];
}

export const APITest = () => {
  const [selectedTest, setSelectedTest] = useState<APITest | null>(null);
  const [testResult, setTestResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [symptoms, setSymptoms] = useState("Tôi bị sốt 38.5°C, ho khan, đau họng");

  const apiTests: APITest[] = [
    {
      name: "Lấy danh sách triệu chứng",
      description: "Lấy tất cả triệu chứng từ database",
      endpoint: "GET /api/symptom/all",
      method: "GET",
      testFunction: async () => {
        const response = await getSymptomsFromDatabaseAPI();
        return response.data;
      }
    },
    {
      name: "Lấy danh sách bệnh",
      description: "Lấy tất cả bệnh từ database",
      endpoint: "GET /api/disease/all",
      method: "GET",
      testFunction: async () => {
        const response = await getDiseasesFromDatabaseAPI();
        return response.data;
      }
    },
    {
      name: "Lấy danh sách thuốc",
      description: "Lấy tất cả thuốc từ database",
      endpoint: "GET /api/medicine/all",
      method: "GET",
      testFunction: async () => {
        const response = await getAllMedicinesFromDatabaseAPI();
        return response.data;
      }
    },
    {
      name: "Lấy thông tin chi tiết bệnh",
      description: "Lấy thông tin chi tiết của một bệnh cụ thể",
      endpoint: "GET /api/disease/{id}",
      method: "GET",
      parameters: [
        { name: "diseaseId", type: "string", description: "ID của bệnh cần lấy thông tin" }
      ],
      testFunction: async () => {
        // Lấy bệnh đầu tiên để test
        const diseasesResponse = await getDiseasesFromDatabaseAPI();
        if (diseasesResponse.data.length === 0) {
          throw new Error("Không có bệnh nào trong database");
        }
        const firstDisease = diseasesResponse.data[0];
        const response = await getDiseaseFromDatabaseAPI(firstDisease._id);
        return {
          diseaseId: firstDisease._id,
          diseaseName: firstDisease.name,
          data: response.data
        };
      }
    },
    {
      name: "Lấy thuốc khuyến nghị cho bệnh",
      description: "Lấy danh sách thuốc khuyến nghị cho một bệnh cụ thể",
      endpoint: "GET /api/disease/{id}/medicines",
      method: "GET",
      parameters: [
        { name: "diseaseId", type: "string", description: "ID của bệnh cần lấy thuốc khuyến nghị" }
      ],
      testFunction: async () => {
        // Lấy bệnh đầu tiên để test
        const diseasesResponse = await getDiseasesFromDatabaseAPI();
        if (diseasesResponse.data.length === 0) {
          throw new Error("Không có bệnh nào trong database");
        }
        const firstDisease = diseasesResponse.data[0];
        const response = await getMedicineRecommendationsFromDatabaseAPI(firstDisease._id);
        return {
          diseaseId: firstDisease._id,
          diseaseName: firstDisease.name,
          data: response.data
        };
      }
    },
    {
      name: "Phân tích triệu chứng với database",
      description: "Phân tích triệu chứng và trả về kết quả dự đoán bệnh với dữ liệu từ database",
      endpoint: "POST /predict (FastAPI) + Database lookup",
      method: "POST",
      parameters: [
        { name: "symptoms", type: "string", description: "Mô tả triệu chứng của bệnh nhân" }
      ],
      testFunction: async () => {
        const response = await analyzeSymptomsWithDatabaseAPI({
          symptoms: symptoms
        });
        return response.data;
      }
    }
  ];

  const runTest = async (test: APITest) => {
    setIsLoading(true);
    setError(null);
    setTestResult(null);

    try {
      const startTime = Date.now();
      const result = await test.testFunction();
      const duration = Date.now() - startTime;

      setTestResult({
        data: result,
        duration,
        timestamp: new Date().toISOString()
      });
    } catch (err: any) {
      setError(err.message || 'Unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const formatJSON = (data: any) => {
    try {
      return JSON.stringify(data, null, 2);
    } catch {
      return String(data);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Danh sách API tests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TestTube className="text-blue-600" />
            API Endpoints
          </CardTitle>
          <CardDescription>
            Chọn API endpoint để test
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {apiTests.map((test, index) => (
            <div
              key={index}
              className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                selectedTest?.name === test.name
                  ? 'border-blue-500 bg-blue-50'
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => setSelectedTest(test)}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-medium text-sm">{test.name}</h3>
                  <p className="text-xs text-gray-600">{test.description}</p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {test.method}
                </Badge>
              </div>
              <div className="text-xs text-gray-500 font-mono">
                {test.endpoint}
              </div>
              {test.parameters && test.parameters.length > 0 && (
                <div className="mt-2">
                  <div className="text-xs font-medium text-gray-700 mb-1">Parameters:</div>
                  {test.parameters.map((param, idx) => (
                    <div key={idx} className="text-xs text-gray-600">
                      • {param.name} ({param.type}): {param.description}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Chi tiết test và kết quả */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="text-green-600" />
            {selectedTest ? selectedTest.name : 'Chọn API để test'}
          </CardTitle>
          {selectedTest && (
            <CardDescription>
              {selectedTest.description}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {selectedTest && (
            <>
              {/* Parameters input */}
              {selectedTest.name === "Phân tích triệu chứng với database" && (
                <div>
                  <Label htmlFor="symptoms">Triệu chứng:</Label>
                  <Textarea
                    id="symptoms"
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    placeholder="Nhập triệu chứng để test..."
                    className="mt-1"
                  />
                </div>
              )}

              {/* Run test button */}
              <Button 
                onClick={() => runTest(selectedTest)}
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Đang test...
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Chạy test
                  </>
                )}
              </Button>

              {/* Test result */}
              {testResult && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-sm">Kết quả:</h3>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="text-xs">
                        {testResult.duration}ms
                      </Badge>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => copyToClipboard(formatJSON(testResult.data))}
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-2">
                      Timestamp: {new Date(testResult.timestamp).toLocaleString()}
                    </div>
                    <pre className="text-xs overflow-auto max-h-96">
                      {formatJSON(testResult.data)}
                    </pre>
                  </div>
                </div>
              )}

              {/* Error */}
              {error && (
                <Alert variant="destructive">
                  <XCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Lỗi:</strong> {error}
                  </AlertDescription>
                </Alert>
              )}
            </>
          )}

          {!selectedTest && (
            <div className="text-center py-8 text-gray-500">
              <Eye className="h-8 w-8 mx-auto mb-2" />
              <p>Chọn một API endpoint để bắt đầu test</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

