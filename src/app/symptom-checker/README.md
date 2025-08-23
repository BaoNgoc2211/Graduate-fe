# Symptom Checker với Database Integration

## Tổng quan

Hệ thống kiểm tra triệu chứng bệnh đã được nâng cấp để tích hợp với cơ sở dữ liệu, cung cấp thông tin chính xác và chi tiết hơn về bệnh và thuốc khuyến nghị.

## Tính năng mới

### 1. Tích hợp Database
- **Triệu chứng từ Database**: Hệ thống lấy danh sách triệu chứng từ cơ sở dữ liệu để cung cấp gợi ý chính xác
- **Bệnh từ Database**: Thông tin chi tiết về bệnh được lấy từ database thay vì dữ liệu tĩnh
- **Thuốc khuyến nghị**: Danh sách thuốc được khuyến nghị dựa trên chẩn đoán bệnh từ database

### 2. Gợi ý triệu chứng thông minh
- Tự động gợi ý triệu chứng khi người dùng nhập
- Hiển thị thông tin chi tiết về loại triệu chứng và nhóm triệu chứng
- Tích hợp với database để đảm bảo độ chính xác

### 3. Thông tin bệnh chi tiết
- Hiển thị nguyên nhân, chẩn đoán, điều trị và phòng ngừa
- Phân loại mức độ nghiêm trọng (Nhẹ/Trung bình/Nặng)
- Cảnh báo cho các bệnh cần cấp cứu

### 4. Thuốc khuyến nghị
- Danh sách thuốc phù hợp với từng bệnh
- Thông tin về liều dùng và chống chỉ định
- Giá cả và mô tả chi tiết

## API Endpoints

### Triệu chứng
- `GET /api/symptom/all` - Lấy tất cả triệu chứng từ database

### Bệnh
- `GET /api/disease/all` - Lấy tất cả bệnh từ database
- `GET /api/disease/{id}` - Lấy thông tin chi tiết bệnh
- `GET /api/disease/{id}/medicines` - Lấy thuốc khuyến nghị cho bệnh

### Thuốc
- `GET /api/medicine/all` - Lấy tất cả thuốc từ database

## Hooks

### useSymptomAnalysis
```typescript
const { isLoading, error, result, analyzeSymptoms, reset } = useSymptomAnalysis(true);
```

### useSymptomsFromDatabase
```typescript
const { symptoms, isLoading, error, refetch } = useSymptomsFromDatabase();
```

### useDiseasesFromDatabase
```typescript
const { diseases, isLoading, error, refetch } = useDiseasesFromDatabase();
```

### useMedicineRecommendationsFromDatabase
```typescript
const { medicines, isLoading, error, refetch } = useMedicineRecommendationsFromDatabase(diseaseId);
```

## Components

### SymptomForm
- Form nhập triệu chứng với gợi ý từ database
- Hiển thị số lượng triệu chứng có sẵn
- Tự động hoàn thành triệu chứng

### SymptomResult
- Hiển thị kết quả dự đoán bệnh
- Thông tin chi tiết về bệnh từ database
- Thuốc khuyến nghị cho từng bệnh

### DatabaseStats
- Thống kê tổng quan về dữ liệu trong database
- Số lượng triệu chứng, bệnh, thuốc có sẵn

## Cách sử dụng

1. **Nhập triệu chứng**: Gõ vào ô nhập để xem gợi ý từ database
2. **Chọn triệu chứng**: Click vào gợi ý để thêm vào danh sách
3. **Phân tích**: Nhấn nút "Phân tích triệu chứng" để nhận kết quả
4. **Xem chi tiết**: Click "Xem chi tiết" để xem thông tin đầy đủ về bệnh
5. **Thuốc khuyến nghị**: Xem danh sách thuốc phù hợp cho từng bệnh

## Lưu ý quan trọng

- Kết quả chỉ mang tính chất tham khảo
- Luôn tham khảo ý kiến bác sĩ để có chẩn đoán chính xác
- Thuốc khuyến nghị cần được sử dụng theo chỉ định của bác sĩ
- Hệ thống cảnh báo cho các bệnh nghiêm trọng cần cấp cứu

## Cấu trúc Database

### Symptoms Collection
```typescript
{
  _id: string;
  name: string;
  kindOf: string;
  symptomGroup: string;
}
```

### Diseases Collection
```typescript
{
  _id: string;
  name: string;
  common: string;
  causes: string;
  diagnosis: string;
  treatmentPlan: string;
  prevention: string;
  severityLevel: string;
  status: string;
  // ... other fields
}
```

### Medicines Collection
```typescript
{
  _id: string;
  name: string;
  description: string;
  price: number;
  dosage: string;
  contraindications: string[];
  // ... other fields
}
```

