import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';

// Schema cho Medicine
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

// Model cho Medicine
const Medicine = mongoose.models.Medicine || mongoose.model('Medicine', MedicineSchema);

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

    // Lấy thuốc khuyến nghị cho bệnh
    const medicines = await Medicine.find({
      diseaseIds: id,
      status: 'active'
    }).sort({ name: 1 });

    return NextResponse.json({
      success: true,
      data: medicines,
      message: 'Lấy danh sách thuốc khuyến nghị thành công'
    });

  } catch (error: any) {
    console.error('Error fetching medicines for disease:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message || 'Lỗi khi lấy danh sách thuốc khuyến nghị'
    }, { status: 500 });
  }
}

// API để thêm thuốc khuyến nghị cho bệnh
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { name, description, price, dosage, contraindications } = body;

    // Validate input
    if (!name) {
      return NextResponse.json({
        success: false,
        error: 'Thiếu thông tin bắt buộc: name'
      }, { status: 400 });
    }

    // Validate disease ID
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

    // Tạo thuốc mới
    const newMedicine = new Medicine({
      name,
      description: description || '',
      price: price || 0,
      dosage: dosage || '',
      contraindications: contraindications || [],
      diseaseIds: [id],
      status: 'active'
    });

    await newMedicine.save();

    return NextResponse.json({
      success: true,
      data: newMedicine,
      message: 'Thêm thuốc khuyến nghị thành công'
    }, { status: 201 });

  } catch (error: any) {
    console.error('Error adding medicine for disease:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message || 'Lỗi khi thêm thuốc khuyến nghị'
    }, { status: 500 });
  }
}

