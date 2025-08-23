import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

// Schema cho Symptom
const SymptomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  kindOf: { type: String, required: true },
  symptomGroup: { type: String, required: true }
});

// Model cho Symptom
const Symptom = mongoose.models.Symptom || mongoose.model('Symptom', SymptomSchema);

export async function GET(request: NextRequest) {
  try {
    // Kết nối database nếu chưa kết nối
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/medical_db');
    }

    // Lấy tất cả triệu chứng
    const symptoms = await Symptom.find({}).sort({ name: 1 });

    return NextResponse.json({
      success: true,
      data: symptoms,
      message: 'Lấy danh sách triệu chứng thành công'
    });

  } catch (error: any) {
    console.error('Error fetching symptoms:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message || 'Lỗi khi lấy danh sách triệu chứng'
    }, { status: 500 });
  }
}

// API để tạo triệu chứng mới (nếu cần)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, kindOf, symptomGroup } = body;

    // Validate input
    if (!name || !kindOf || !symptomGroup) {
      return NextResponse.json({
        success: false,
        error: 'Thiếu thông tin bắt buộc: name, kindOf, symptomGroup'
      }, { status: 400 });
    }

    // Kết nối database
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/medical_db');
    }

    // Tạo triệu chứng mới
    const newSymptom = new Symptom({
      name,
      kindOf,
      symptomGroup
    });

    await newSymptom.save();

    return NextResponse.json({
      success: true,
      data: newSymptom,
      message: 'Tạo triệu chứng thành công'
    }, { status: 201 });

  } catch (error: any) {
    console.error('Error creating symptom:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message || 'Lỗi khi tạo triệu chứng'
    }, { status: 500 });
  }
}

