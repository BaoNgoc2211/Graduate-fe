import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

// Schema cho Disease
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

// Model cho Disease
const Disease = mongoose.models.Disease || mongoose.model('Disease', DiseaseSchema);

export async function GET(request: NextRequest) {
  try {
    // Kết nối database nếu chưa kết nối
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/medical_db');
    }

    // Lấy tất cả bệnh
    const diseases = await Disease.find({}).sort({ name: 1 });

    return NextResponse.json({
      success: true,
      data: diseases,
      message: 'Lấy danh sách bệnh thành công'
    });

  } catch (error: any) {
    console.error('Error fetching diseases:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message || 'Lỗi khi lấy danh sách bệnh'
    }, { status: 500 });
  }
}

// API để tạo bệnh mới (nếu cần)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, code, common, causes, diagnosis, treatmentPlan, prevention } = body;

    // Validate input
    if (!name || !code) {
      return NextResponse.json({
        success: false,
        error: 'Thiếu thông tin bắt buộc: name, code'
      }, { status: 400 });
    }

    // Kết nối database
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/medical_db');
    }

    // Tạo bệnh mới
    const newDisease = new Disease({
      name,
      code,
      nameDiff: name,
      common: common || `Bệnh ${name}`,
      riskGroup: ['Người cao tuổi', 'Trẻ em', 'Người có bệnh nền'],
      causes: causes || 'Nguyên nhân cần được xác định bởi bác sĩ chuyên khoa',
      diagnosis: diagnosis || 'Chẩn đoán cần được thực hiện bởi bác sĩ',
      prevention: prevention || 'Giữ gìn vệ sinh, ăn uống lành mạnh, tập thể dục đều đặn',
      severityLevel: 'medium',
      treatmentPlan: treatmentPlan || 'Vui lòng tham khảo ý kiến bác sĩ để có hướng điều trị phù hợp',
      notes: 'Thông tin từ hệ thống y tế',
      status: 'active',
      symptomIds: [],
      diseaseCategoryIds: [],
      diseaseUsageGroupIds: []
    });

    await newDisease.save();

    return NextResponse.json({
      success: true,
      data: newDisease,
      message: 'Tạo bệnh thành công'
    }, { status: 201 });

  } catch (error: any) {
    console.error('Error creating disease:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message || 'Lỗi khi tạo bệnh'
    }, { status: 500 });
  }
}

