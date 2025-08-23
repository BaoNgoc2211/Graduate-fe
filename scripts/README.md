# Test Backend Database

## Tổng quan

Scripts và tools để test các API endpoints backend và đảm bảo kết nối database hoạt động đúng.

## Cách sử dụng

### 1. Test từ Frontend (UI)

Truy cập trang `/symptom-checker` và sử dụng các component test:

- **TestDatabase**: Test tất cả API endpoints một cách tự động
- **APITest**: Test từng API endpoint riêng lẻ với giao diện chi tiết
- **DatabaseStats**: Xem thống kê dữ liệu từ database

### 2. Test từ Terminal

Chạy script test backend:

```bash
# Test tất cả API endpoints
npm run test:backend

# Hoặc chạy trực tiếp
node scripts/test-backend.js
```

### 3. Seed dữ liệu mẫu

Trước khi test, bạn cần seed dữ liệu mẫu vào database:

```bash
# Seed dữ liệu mẫu
npm run seed:data

# Hoặc chạy trực tiếp
node scripts/seed-data.js
```

### 4. Test từng API riêng lẻ

```javascript
const { tests } = require('./scripts/test-backend.js');

// Test lấy danh sách triệu chứng
await tests.testGetSymptoms();

// Test lấy danh sách bệnh
await tests.testGetDiseases();

// Test lấy danh sách thuốc
await tests.testGetMedicines();

// Test phân tích triệu chứng
await tests.testSymptomAnalysis();
```

## Cấu hình Database

### MongoDB
- **URL**: `mongodb://localhost:27017/medical_db`
- **Environment Variable**: `MONGODB_URI`

### Dữ liệu mẫu
Script seed sẽ tạo:
- **20 triệu chứng** (Sốt, ho, đau họng, v.v.)
- **5 bệnh** (Cảm cúm, viêm họng, viêm phổi, đau dạ dày, tiểu đường)
- **5 thuốc** (Paracetamol, Ibuprofen, Amoxicillin, Omeprazole, Metformin)

## API Endpoints được test

### 1. Triệu chứng
- `GET /api/symptom/all` - Lấy tất cả triệu chứng

### 2. Bệnh
- `GET /api/disease/all` - Lấy tất cả bệnh
- `GET /api/disease/{id}` - Lấy thông tin chi tiết bệnh
- `GET /api/disease/{id}/medicines` - Lấy thuốc khuyến nghị cho bệnh

### 3. Thuốc
- `GET /api/medicine/all` - Lấy tất cả thuốc

### 4. FastAPI Service
- `GET /health` - Kiểm tra sức khỏe FastAPI service
- `POST /predict` - Phân tích triệu chứng

## Cấu hình

### URLs mặc định
- **API Base URL**: `http://localhost:3000`
- **FastAPI Base URL**: `http://localhost:8001`

### Thay đổi cấu hình
Chỉnh sửa file `scripts/test-backend.js`:

```javascript
const API_BASE_URL = 'http://your-api-url:port';
const FASTAPI_BASE_URL = 'http://your-fastapi-url:port';
```

## Kết quả test

### Thành công
```
✓ Lấy danh sách triệu chứng: 150 items
✓ Lấy danh sách bệnh: 50 items
✓ Lấy danh sách thuốc: 200 items
✓ FastAPI Health Check: OK
✓ Phân tích triệu chứng: 3 predictions
```

### Lỗi
```
✗ Lấy danh sách triệu chứng: connect ECONNREFUSED 127.0.0.1:3000
✗ FastAPI Health Check: connect ECONNREFUSED 127.0.0.1:8001
```

## Troubleshooting

### 1. Lỗi kết nối API
- Kiểm tra backend server có đang chạy không
- Kiểm tra port và URL trong cấu hình
- Kiểm tra firewall và network

### 2. Lỗi database
- Kiểm tra kết nối database
- Kiểm tra dữ liệu có tồn tại trong database không
- Kiểm tra quyền truy cập database

### 3. Lỗi FastAPI
- Kiểm tra FastAPI service có đang chạy không
- Kiểm tra model AI có được load đúng không
- Kiểm tra logs của FastAPI service

### 4. Lỗi CORS
- Kiểm tra cấu hình CORS trong backend
- Đảm bảo frontend và backend cùng domain hoặc được cấu hình CORS đúng

## Yêu cầu hệ thống

### Backend
- Node.js server chạy trên port 3000
- Database (MongoDB/PostgreSQL) được kết nối
- Các API endpoints được implement

### FastAPI Service
- Python FastAPI service chạy trên port 8001
- Model AI được load và sẵn sàng
- Endpoint `/health` và `/predict` hoạt động

### Frontend
- Next.js app chạy trên port 3000 (hoặc khác)
- Axios được cài đặt
- CORS được cấu hình đúng

## Ví dụ kết quả test hoàn chỉnh

```
🧪 BẮT ĐẦU TEST BACKEND API
ℹ API Base URL: http://localhost:3000
ℹ FastAPI Base URL: http://localhost:8001

✓ Lấy danh sách triệu chứng: 150 items
✓ Lấy danh sách bệnh: 50 items
✓ Lấy danh sách thuốc: 200 items
✓ Lấy thông tin bệnh "Cảm cúm": OK
✓ Lấy thuốc khuyến nghị cho "Cảm cúm": 5 items
✓ FastAPI Health Check: OK
✓ Phân tích triệu chứng: 3 predictions

📊 KẾT QUẢ TEST

Tổng quan:
  • Thời gian: 1250ms
  • Thành công: 7
  • Lỗi: 0
  • Tỷ lệ thành công: 100.0%

Chi tiết:
  ✓ testGetSymptoms (150ms)
  ✓ testGetDiseases (120ms)
  ✓ testGetMedicines (180ms)
  ✓ testGetDiseaseDetail (200ms)
  ✓ testGetMedicineRecommendations (180ms)
  ✓ testFastAPIHealth (100ms)
  ✓ testSymptomAnalysis (320ms)

Kết luận:
✓ Tất cả tests đều thành công! Backend hoạt động tốt.
```
