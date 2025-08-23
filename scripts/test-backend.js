const axios = require('axios');

// Cấu hình API
const API_BASE_URL = 'http://localhost:3000'; // Thay đổi port nếu cần
const FASTAPI_BASE_URL = 'http://localhost:8001'; // FastAPI service

// Colors cho console
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

const log = {
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  title: (msg) => console.log(`\n${colors.bold}${colors.blue}${msg}${colors.reset}`)
};

// Test functions
const tests = {
  // Test 1: Lấy danh sách triệu chứng
  async testGetSymptoms() {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/symptom/all`);
      log.success(`Lấy danh sách triệu chứng: ${response.data.data?.length || 0} items`);
      return { success: true, data: response.data.data };
    } catch (error) {
      log.error(`Lấy danh sách triệu chứng: ${error.message}`);
      return { success: false, error: error.message };
    }
  },

  // Test 2: Lấy danh sách bệnh
  async testGetDiseases() {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/disease/all`);
      log.success(`Lấy danh sách bệnh: ${response.data.data?.length || 0} items`);
      return { success: true, data: response.data.data };
    } catch (error) {
      log.error(`Lấy danh sách bệnh: ${error.message}`);
      return { success: false, error: error.message };
    }
  },

  // Test 3: Lấy danh sách thuốc
  async testGetMedicines() {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/medicine/all`);
      log.success(`Lấy danh sách thuốc: ${response.data.data?.length || 0} items`);
      return { success: true, data: response.data.data };
    } catch (error) {
      log.error(`Lấy danh sách thuốc: ${error.message}`);
      return { success: false, error: error.message };
    }
  },

  // Test 4: Lấy thông tin chi tiết bệnh
  async testGetDiseaseDetail() {
    try {
      // Lấy danh sách bệnh trước
      const diseasesResponse = await axios.get(`${API_BASE_URL}/api/disease/all`);
      const diseases = diseasesResponse.data.data;
      
      if (diseases.length === 0) {
        log.warning('Không có bệnh nào trong database để test');
        return { success: false, error: 'No diseases found' };
      }

      const firstDisease = diseases[0];
      const response = await axios.get(`${API_BASE_URL}/api/disease/${firstDisease._id}`);
      log.success(`Lấy thông tin bệnh "${firstDisease.name}": OK`);
      return { success: true, data: response.data.data };
    } catch (error) {
      log.error(`Lấy thông tin bệnh: ${error.message}`);
      return { success: false, error: error.message };
    }
  },

  // Test 5: Lấy thuốc khuyến nghị cho bệnh
  async testGetMedicineRecommendations() {
    try {
      // Lấy danh sách bệnh trước
      const diseasesResponse = await axios.get(`${API_BASE_URL}/api/disease/all`);
      const diseases = diseasesResponse.data.data;
      
      if (diseases.length === 0) {
        log.warning('Không có bệnh nào trong database để test');
        return { success: false, error: 'No diseases found' };
      }

      const firstDisease = diseases[0];
      const response = await axios.get(`${API_BASE_URL}/api/disease/${firstDisease._id}/medicines`);
      log.success(`Lấy thuốc khuyến nghị cho "${firstDisease.name}": ${response.data.data?.length || 0} items`);
      return { success: true, data: response.data.data };
    } catch (error) {
      log.error(`Lấy thuốc khuyến nghị: ${error.message}`);
      return { success: false, error: error.message };
    }
  },

  // Test 6: Kiểm tra FastAPI service
  async testFastAPIHealth() {
    try {
      const response = await axios.get(`${FASTAPI_BASE_URL}/health`);
      log.success(`FastAPI Health Check: ${response.data.status || 'OK'}`);
      return { success: true, data: response.data };
    } catch (error) {
      log.error(`FastAPI Health Check: ${error.message}`);
      return { success: false, error: error.message };
    }
  },

  // Test 7: Test phân tích triệu chứng với FastAPI
  async testSymptomAnalysis() {
    try {
      const response = await axios.post(`${FASTAPI_BASE_URL}/predict`, {
        text: "Tôi bị sốt 38.5°C, ho khan, đau họng",
        top_k: 3,
        alpha: 0.9
      });
      log.success(`Phân tích triệu chứng: ${response.data.predictions?.length || 0} predictions`);
      return { success: true, data: response.data };
    } catch (error) {
      log.error(`Phân tích triệu chứng: ${error.message}`);
      return { success: false, error: error.message };
    }
  }
};

// Main test runner
async function runAllTests() {
  log.title('🧪 BẮT ĐẦU TEST BACKEND API');
  log.info(`API Base URL: ${API_BASE_URL}`);
  log.info(`FastAPI Base URL: ${FASTAPI_BASE_URL}`);
  
  const results = [];
  const startTime = Date.now();

  // Chạy tất cả tests
  for (const [testName, testFunction] of Object.entries(tests)) {
    const testStartTime = Date.now();
    const result = await testFunction();
    const duration = Date.now() - testStartTime;
    
    results.push({
      name: testName,
      ...result,
      duration
    });
  }

  const totalDuration = Date.now() - startTime;
  const successCount = results.filter(r => r.success).length;
  const errorCount = results.filter(r => !r.success).length;

  // Hiển thị kết quả tổng quan
  log.title('📊 KẾT QUẢ TEST');
  console.log(`\n${colors.bold}Tổng quan:${colors.reset}`);
  console.log(`  • Thời gian: ${totalDuration}ms`);
  console.log(`  • Thành công: ${colors.green}${successCount}${colors.reset}`);
  console.log(`  • Lỗi: ${colors.red}${errorCount}${colors.reset}`);
  console.log(`  • Tỷ lệ thành công: ${((successCount / results.length) * 100).toFixed(1)}%`);

  // Hiển thị chi tiết từng test
  console.log(`\n${colors.bold}Chi tiết:${colors.reset}`);
  results.forEach(result => {
    const status = result.success ? colors.green : colors.red;
    const icon = result.success ? '✓' : '✗';
    console.log(`  ${status}${icon}${colors.reset} ${result.name} (${result.duration}ms)`);
    
    if (!result.success && result.error) {
      console.log(`    ${colors.red}Lỗi: ${result.error}${colors.reset}`);
    }
  });

  // Kết luận
  console.log(`\n${colors.bold}Kết luận:${colors.reset}`);
  if (errorCount === 0) {
    log.success('Tất cả tests đều thành công! Backend hoạt động tốt.');
  } else {
    log.error(`${errorCount} test(s) thất bại. Vui lòng kiểm tra backend server và database.`);
  }
}

// Chạy test nếu script được gọi trực tiếp
if (require.main === module) {
  runAllTests().catch(error => {
    log.error(`Lỗi khi chạy tests: ${error.message}`);
    process.exit(1);
  });
}

module.exports = { tests, runAllTests };

