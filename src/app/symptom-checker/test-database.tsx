"use client";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Database, 
  TestTube, 
  CheckCircle, 
  XCircle, 
  Loader2,
  Stethoscope,
  Pill,
  Activity
} from "lucide-react";
import {
  getSymptomsFromDatabaseAPI,
  getDiseasesFromDatabaseAPI,
  getDiseaseFromDatabaseAPI,
  getMedicineRecommendationsFromDatabaseAPI,
  getAllMedicinesFromDatabaseAPI,
  analyzeSymptomsWithDatabaseAPI
} from "@/api/disease/symptom-analysis.api";

interface TestResult {
  name: string;
  status: 'pending' | 'success' | 'error';
  data?: any;
  error?: string;
  duration?: number;
}

export const TestDatabase = () => {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const runTest = async (testName: string, testFunction: () => Promise<any>) => {
    const startTime = Date.now();
    
    setTestResults(prev => [
      ...prev,
      { name: testName, status: 'pending' }
    ]);

    try {
      const result = await testFunction();
      const duration = Date.now() - startTime;
      
      setTestResults(prev => 
        prev.map(test => 
          test.name === testName 
            ? { name: testName, status: 'success', data: result, duration }
            : test
        )
      );
    } catch (error: any) {
      const duration = Date.now() - startTime;
      
      setTestResults(prev => 
        prev.map(test => 
          test.name === testName 
            ? { 
                name: testName, 
                status: 'error', 
                error: error.message || 'Unknown error',
                duration 
              }
            : test
        )
      );
    }
  };

  const runAllTests = async () => {
    setIsRunning(true);
    setTestResults([]);

    // Test 1: Lấy danh sách triệu chứng
    await runTest('Lấy danh sách triệu chứng', async () => {
      const response = await getSymptomsFromDatabaseAPI();
      return response.data;
    });

    // Test 2: Lấy danh sách bệnh
    await runTest('Lấy danh sách bệnh', async () => {
      const response = await getDiseasesFromDatabaseAPI();
      return response.data;
    });

    // Test 3: Lấy danh sách thuốc
    await runTest('Lấy danh sách thuốc', async () => {
      const response = await getAllMedicinesFromDatabaseAPI();
      return response.data;
    });

    // Test 4: Lấy thông tin chi tiết bệnh (nếu có bệnh)
    await runTest('Lấy thông tin chi tiết bệnh', async () => {
      const diseasesResponse = await getDiseasesFromDatabaseAPI();
      if (diseasesResponse.data.length > 0) {
        const firstDisease = diseasesResponse.data[0];
        const response = await getDiseaseFromDatabaseAPI(firstDisease._id);
        return response.data;
      }
      throw new Error('Không có bệnh nào trong database');
    });

    // Test 5: Lấy thuốc khuyến nghị cho bệnh (nếu có bệnh)
    await runTest('Lấy thuốc khuyến nghị cho bệnh', async () => {
      const diseasesResponse = await getDiseasesFromDatabaseAPI();
      if (diseasesResponse.data.length > 0) {
        const firstDisease = diseasesResponse.data[0];
        const response = await getMedicineRecommendationsFromDatabaseAPI(firstDisease._id);
        return response.data;
      }
      throw new Error('Không có bệnh nào trong database');
    });

    // Test 6: Phân tích triệu chứng với database
    await runTest('Phân tích triệu chứng với database', async () => {
      const response = await analyzeSymptomsWithDatabaseAPI({
        symptoms: "Tôi bị sốt 38.5°C, ho khan, đau họng"
      });
      return response.data;
    });

    setIsRunning(false);
  };

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'pending':
        return <Loader2 className="h-4 w-4 animate-spin" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-600" />;
    }
  };

  const getStatusColor = (status: TestResult['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-50 text-yellow-800 border-yellow-200';
      case 'success':
        return 'bg-green-50 text-green-800 border-green-200';
      case 'error':
        return 'bg-red-50 text-red-800 border-red-200';
    }
  };

  const successCount = testResults.filter(r => r.status === 'success').length;
  const errorCount = testResults.filter(r => r.status === 'error').length;
  const pendingCount = testResults.filter(r => r.status === 'pending').length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TestTube className="text-blue-600" />
          Test Database Backend
        </CardTitle>
        <CardDescription>
          Kiểm tra các API endpoints để đảm bảo kết nối database hoạt động đúng
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Thống kê test */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <CheckCircle className="h-6 w-6 text-green-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-green-900">{successCount}</div>
            <div className="text-xs text-green-700">Thành công</div>
          </div>
          <div className="text-center p-3 bg-red-50 rounded-lg">
            <XCircle className="h-6 w-6 text-red-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-red-900">{errorCount}</div>
            <div className="text-xs text-red-700">Lỗi</div>
          </div>
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <Loader2 className="h-6 w-6 text-yellow-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-yellow-900">{pendingCount}</div>
            <div className="text-xs text-yellow-700">Đang chạy</div>
          </div>
        </div>

        {/* Nút chạy test */}
        <Button 
          onClick={runAllTests} 
          disabled={isRunning}
          className="w-full"
        >
          {isRunning ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Đang chạy test...
            </>
          ) : (
            <>
              <TestTube className="mr-2 h-4 w-4" />
              Chạy tất cả test
            </>
          )}
        </Button>

        {/* Kết quả test */}
        {testResults.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-medium">Kết quả test:</h3>
            {testResults.map((result, index) => (
              <div 
                key={index}
                className={`border rounded-lg p-3 ${getStatusColor(result.status)}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(result.status)}
                    <span className="font-medium">{result.name}</span>
                  </div>
                  {result.duration && (
                    <Badge variant="outline" className="text-xs">
                      {result.duration}ms
                    </Badge>
                  )}
                </div>
                
                {result.status === 'success' && result.data && (
                  <div className="text-sm">
                    <div className="font-medium mb-1">Dữ liệu trả về:</div>
                    {Array.isArray(result.data) ? (
                      <div>
                        <span className="text-gray-600">
                          Số lượng: {result.data.length} items
                        </span>
                        {result.data.length > 0 && (
                          <div className="mt-1 text-xs text-gray-500">
                            Ví dụ: {JSON.stringify(result.data[0], null, 2)}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-xs text-gray-500">
                        {JSON.stringify(result.data, null, 2)}
                      </div>
                    )}
                  </div>
                )}
                
                {result.status === 'error' && result.error && (
                  <div className="text-sm text-red-700">
                    <div className="font-medium mb-1">Lỗi:</div>
                    <div className="text-xs">{result.error}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Hướng dẫn */}
        <Alert>
          <Database className="h-4 w-4" />
          <AlertDescription>
            <strong>Hướng dẫn:</strong> Nhấn nút "Chạy tất cả test" để kiểm tra kết nối database. 
            Các test sẽ kiểm tra từng API endpoint một cách tuần tự. 
            Nếu có lỗi, hãy kiểm tra backend server và database connection.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
};

