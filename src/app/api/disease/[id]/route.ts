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

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({
        success: false,
        error: 'ID bệnh không hợp lệ'
      }, { status: 400 });
    }

    // Kết nối database nếu chưa kết nối
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/medical_db');
    }

    // Lấy thông tin bệnh theo ID
    const disease = await Disease.findById(id);

    if (!disease) {
      return NextResponse.json({
        success: false,
        error: 'Không tìm thấy bệnh với ID này'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: disease,
      message: 'Lấy thông tin bệnh thành công'
    });

  } catch (error: unknown) {
    console.error('Error fetching disease:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Lỗi khi lấy thông tin bệnh'
    }, { status: 500 });
  }
}

// API để cập nhật bệnh
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({
        success: false,
        error: 'ID bệnh không hợp lệ'
      }, { status: 400 });
    }

    // Kết nối database
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/medical_db');
    }

    // Cập nhật bệnh
    const updatedDisease = await Disease.findByIdAndUpdate(
      id,
      { ...body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!updatedDisease) {
      return NextResponse.json({
        success: false,
        error: 'Không tìm thấy bệnh với ID này'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: updatedDisease,
      message: 'Cập nhật bệnh thành công'
    });

  } catch (error: unknown) {
    console.error('Error updating disease:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Lỗi khi cập nhật bệnh'
    }, { status: 500 });
  }
}

// API để xóa bệnh
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({
        success: false,
        error: 'ID bệnh không hợp lệ'
      }, { status: 400 });
    }

    // Kết nối database
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/medical_db');
    }

    // Xóa bệnh
    const deletedDisease = await Disease.findByIdAndDelete(id);

    if (!deletedDisease) {
      return NextResponse.json({
        success: false,
        error: 'Không tìm thấy bệnh với ID này'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Xóa bệnh thành công'
    });

  } catch (error: unknown) {
    console.error('Error deleting disease:', error);
    
    return NextResponse.json({
      success: false,
     error: error instanceof Error ? error.message : 'Lỗi khi xoá bệnh'
    }, { status: 500 });
  }
}

