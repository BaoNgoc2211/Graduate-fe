const mongoose = require('mongoose');

// Cấu hình database
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/medical_db';

// Schemas
const SymptomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  kindOf: { type: String, required: true },
  symptomGroup: { type: String, required: true }
});

const DiseaseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  nameDiff: { type: String },
  common: { type: String },
  riskGroup: [{ type: String }],
  causes: { type: String },
  diagnosis: { type: String },
  prevention: { type: String },
  severityLevel: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  treatmentPlan: { type: String },
  notes: { type: String },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  symptomIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Symptom' }],
  diseaseCategoryIds: [{ type: mongoose.Schema.Types.ObjectId }],
  diseaseUsageGroupIds: [{ type: mongoose.Schema.Types.ObjectId }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const MedicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, default: 0 },
  image: { type: String },
  dosage: { type: String },
  contraindications: [{ type: String }],
  diseaseIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Disease' }],
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Models
const Symptom = mongoose.model('Symptom', SymptomSchema);
const Disease = mongoose.model('Disease', DiseaseSchema);
const Medicine = mongoose.model('Medicine', MedicineSchema);

// Dữ liệu mẫu
const sampleSymptoms = [
  { name: 'Sốt', kindOf: 'Triệu chứng toàn thân', symptomGroup: 'Sốt' },
  { name: 'Ho khan', kindOf: 'Triệu chứng hô hấp', symptomGroup: 'Ho' },
  { name: 'Ho có đờm', kindOf: 'Triệu chứng hô hấp', symptomGroup: 'Ho' },
  { name: 'Đau họng', kindOf: 'Triệu chứng hô hấp', symptomGroup: 'Đau họng' },
  { name: 'Sổ mũi', kindOf: 'Triệu chứng hô hấp', symptomGroup: 'Sổ mũi' },
  { name: 'Nghẹt mũi', kindOf: 'Triệu chứng hô hấp', symptomGroup: 'Nghẹt mũi' },
  { name: 'Đau đầu', kindOf: 'Triệu chứng thần kinh', symptomGroup: 'Đau đầu' },
  { name: 'Chóng mặt', kindOf: 'Triệu chứng thần kinh', symptomGroup: 'Chóng mặt' },
  { name: 'Buồn nôn', kindOf: 'Triệu chứng tiêu hóa', symptomGroup: 'Buồn nôn' },
  { name: 'Nôn', kindOf: 'Triệu chứng tiêu hóa', symptomGroup: 'Nôn' },
  { name: 'Đau bụng', kindOf: 'Triệu chứng tiêu hóa', symptomGroup: 'Đau bụng' },
  { name: 'Tiêu chảy', kindOf: 'Triệu chứng tiêu hóa', symptomGroup: 'Tiêu chảy' },
  { name: 'Táo bón', kindOf: 'Triệu chứng tiêu hóa', symptomGroup: 'Táo bón' },
  { name: 'Mệt mỏi', kindOf: 'Triệu chứng toàn thân', symptomGroup: 'Mệt mỏi' },
  { name: 'Đau cơ', kindOf: 'Triệu chứng cơ xương', symptomGroup: 'Đau cơ' },
  { name: 'Đau khớp', kindOf: 'Triệu chứng cơ xương', symptomGroup: 'Đau khớp' },
  { name: 'Phát ban', kindOf: 'Triệu chứng da', symptomGroup: 'Phát ban' },
  { name: 'Ngứa', kindOf: 'Triệu chứng da', symptomGroup: 'Ngứa' },
  { name: 'Khó thở', kindOf: 'Triệu chứng hô hấp', symptomGroup: 'Khó thở' },
  { name: 'Thở khò khè', kindOf: 'Triệu chứng hô hấp', symptomGroup: 'Thở khò khè' }
];

const sampleDiseases = [
  {
    name: 'Cảm cúm',
    code: 'cam_cum',
    common: 'Bệnh nhiễm trùng đường hô hấp do virus, gây sốt, ho, đau họng, mệt mỏi',
    causes: 'Do virus cúm (Influenza virus) gây ra, lây truyền qua đường hô hấp',
    diagnosis: 'Dựa trên triệu chứng lâm sàng và xét nghiệm nếu cần thiết',
    treatmentPlan: 'Nghỉ ngơi, uống nhiều nước, dùng thuốc hạ sốt, thuốc ho nếu cần',
    prevention: 'Tiêm vắc-xin cúm hàng năm, rửa tay thường xuyên, tránh tiếp xúc người bệnh',
    severityLevel: 'medium',
    riskGroup: ['Người cao tuổi', 'Trẻ em', 'Phụ nữ có thai', 'Người có bệnh nền']
  },
  {
    name: 'Viêm họng',
    code: 'viem_hong',
    common: 'Viêm nhiễm vùng họng, gây đau khi nuốt, ho, khàn tiếng',
    causes: 'Do virus hoặc vi khuẩn, thường là Streptococcus pyogenes',
    diagnosis: 'Khám họng, xét nghiệm nhanh hoặc cấy vi khuẩn',
    treatmentPlan: 'Thuốc kháng sinh nếu do vi khuẩn, thuốc giảm đau, súc họng',
    prevention: 'Vệ sinh răng miệng, tránh hút thuốc, uống đủ nước',
    severityLevel: 'low',
    riskGroup: ['Trẻ em', 'Người hút thuốc', 'Người có hệ miễn dịch yếu']
  },
  {
    name: 'Viêm phổi',
    code: 'viem_phoi',
    common: 'Nhiễm trùng phổi nghiêm trọng, cần điều trị kháng sinh',
    causes: 'Do vi khuẩn, virus hoặc nấm, thường gặp nhất là Streptococcus pneumoniae',
    diagnosis: 'Chụp X-quang phổi, xét nghiệm máu, cấy đờm',
    treatmentPlan: 'Kháng sinh, thuốc giảm ho, thuốc long đờm, thở oxy nếu cần',
    prevention: 'Tiêm vắc-xin phế cầu, vệ sinh tay, không hút thuốc',
    severityLevel: 'high',
    riskGroup: ['Người cao tuổi', 'Trẻ em', 'Người có bệnh phổi mạn tính']
  },
  {
    name: 'Đau dạ dày',
    code: 'dau_da_day',
    common: 'Tình trạng đau vùng thượng vị, thường do viêm loét dạ dày',
    causes: 'Vi khuẩn H.pylori, thuốc kháng viêm, stress, chế độ ăn không hợp lý',
    diagnosis: 'Nội soi dạ dày, xét nghiệm H.pylori, chụp X-quang',
    treatmentPlan: 'Thuốc ức chế acid, thuốc diệt H.pylori, thay đổi lối sống',
    prevention: 'Ăn uống điều độ, tránh stress, không hút thuốc, hạn chế rượu bia',
    severityLevel: 'medium',
    riskGroup: ['Người thường xuyên stress', 'Người hút thuốc', 'Người uống rượu bia']
  },
  {
    name: 'Tiểu đường',
    code: 'tieu_duong',
    common: 'Rối loạn chuyển hóa glucose, cần kiểm soát đường huyết',
    causes: 'Thiếu insulin hoặc kháng insulin, yếu tố di truyền, lối sống',
    diagnosis: 'Xét nghiệm đường huyết lúc đói, HbA1c, nghiệm pháp dung nạp glucose',
    treatmentPlan: 'Thuốc hạ đường huyết, insulin, chế độ ăn, tập thể dục',
    prevention: 'Duy trì cân nặng hợp lý, tập thể dục đều đặn, chế độ ăn lành mạnh',
    severityLevel: 'high',
    riskGroup: ['Người béo phì', 'Người có tiền sử gia đình', 'Người ít vận động']
  }
];

const sampleMedicines = [
  {
    name: 'Paracetamol',
    description: 'Thuốc giảm đau, hạ sốt',
    price: 15000,
    dosage: '500-1000mg mỗi 4-6 giờ, tối đa 4g/ngày',
    contraindications: ['Dị ứng với paracetamol', 'Bệnh gan nặng', 'Nghiện rượu']
  },
  {
    name: 'Ibuprofen',
    description: 'Thuốc kháng viêm, giảm đau, hạ sốt',
    price: 25000,
    dosage: '200-400mg mỗi 4-6 giờ, tối đa 1200mg/ngày',
    contraindications: ['Loét dạ dày', 'Bệnh thận', 'Dị ứng với NSAIDs']
  },
  {
    name: 'Amoxicillin',
    description: 'Kháng sinh điều trị nhiễm khuẩn',
    price: 45000,
    dosage: '500mg x 3 lần/ngày, uống trước bữa ăn',
    contraindications: ['Dị ứng penicillin', 'Bệnh gan nặng', 'Phụ nữ có thai']
  },
  {
    name: 'Omeprazole',
    description: 'Thuốc ức chế acid dạ dày',
    price: 35000,
    dosage: '20mg x 1-2 lần/ngày, uống trước bữa ăn',
    contraindications: ['Dị ứng với omeprazole', 'Phụ nữ có thai', 'Trẻ em dưới 1 tuổi']
  },
  {
    name: 'Metformin',
    description: 'Thuốc điều trị tiểu đường type 2',
    price: 55000,
    dosage: '500mg x 2-3 lần/ngày, uống trong bữa ăn',
    contraindications: ['Suy thận nặng', 'Nhiễm toan lactic', 'Phụ nữ có thai']
  }
];

async function seedData() {
  try {
    console.log('🔗 Kết nối database...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Kết nối database thành công');

    // Xóa dữ liệu cũ
    console.log('🗑️ Xóa dữ liệu cũ...');
    await Symptom.deleteMany({});
    await Disease.deleteMany({});
    await Medicine.deleteMany({});
    console.log('✅ Xóa dữ liệu cũ thành công');

    // Thêm triệu chứng
    console.log('📝 Thêm triệu chứng...');
    const symptoms = await Symptom.insertMany(sampleSymptoms);
    console.log(`✅ Đã thêm ${symptoms.length} triệu chứng`);

    // Thêm bệnh
    console.log('🏥 Thêm bệnh...');
    const diseases = await Disease.insertMany(sampleDiseases);
    console.log(`✅ Đã thêm ${diseases.length} bệnh`);

    // Thêm thuốc và liên kết với bệnh
    console.log('💊 Thêm thuốc...');
    const medicines = [];
    
    for (let i = 0; i < sampleMedicines.length; i++) {
      const medicine = new Medicine({
        ...sampleMedicines[i],
        diseaseIds: [diseases[i % diseases.length]._id] // Liên kết với bệnh
      });
      medicines.push(await medicine.save());
    }
    
    console.log(`✅ Đã thêm ${medicines.length} thuốc`);

    // Cập nhật bệnh với thuốc khuyến nghị
    console.log('🔗 Liên kết bệnh với thuốc...');
    for (let i = 0; i < diseases.length; i++) {
      const relatedMedicines = medicines.filter(m => 
        m.diseaseIds.includes(diseases[i]._id)
      );
      
      await Disease.findByIdAndUpdate(diseases[i]._id, {
        $set: { 
          symptomIds: symptoms.slice(i * 3, (i + 1) * 3).map(s => s._id) // Liên kết với triệu chứng
        }
      });
    }

    console.log('🎉 Seed dữ liệu thành công!');
    console.log(`📊 Tổng quan:`);
    console.log(`  • Triệu chứng: ${symptoms.length}`);
    console.log(`  • Bệnh: ${diseases.length}`);
    console.log(`  • Thuốc: ${medicines.length}`);

  } catch (error) {
    console.error('❌ Lỗi khi seed dữ liệu:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Đã ngắt kết nối database');
  }
}

// Chạy seed nếu script được gọi trực tiếp
if (require.main === module) {
  seedData();
}

module.exports = { seedData };

