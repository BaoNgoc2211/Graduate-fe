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

export async function GET() {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/medical_db');
    }

    const medicines = await Medicine.find({}).sort({ name: 1 });

    return NextResponse.json({
      success: true,
      data: medicines,
      message: 'Lấy danh sách thuốc thành công'
    });

  } catch (error: unknown) {
    console.error('Error fetching medicines:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Lỗi khi lấy danh sách thuốc'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, price, dosage, contraindications, diseaseIds } = body;

    if (!name) {
      return NextResponse.json({
        success: false,
        error: 'Thiếu thông tin bắt buộc: name'
      }, { status: 400 });
    }

    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/medical_db');
    }

    const newMedicine = new Medicine({
      name,
      description: description || '',
      price: price || 0,
      dosage: dosage || '',
      contraindications: contraindications || [],
      diseaseIds: diseaseIds || [],
      status: 'active'
    });

    await newMedicine.save();

    return NextResponse.json({
      success: true,
      data: newMedicine,
      message: 'Tạo thuốc thành công'
    }, { status: 201 });

  } catch (error: unknown) {
    console.error('Error creating medicine:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Lỗi khi tạo thuốc'
    }, { status: 500 });
  }
}
// export async function GET(request: NextRequest) {
//   try {
//     // Kết nối database nếu chưa kết nối
//     if (mongoose.connection.readyState !== 1) {
//       await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/medical_db');
//     }

//     // Lấy tất cả thuốc
//     const medicines = await Medicine.find({}).sort({ name: 1 });

//     return NextResponse.json({
//       success: true,
//       data: medicines,
//       message: 'Lấy danh sách thuốc thành công'
//     });

//   } catch (error: any) {
//     console.error('Error fetching medicines:', error);
    
//     return NextResponse.json({
//       success: false,
//       error: error.message || 'Lỗi khi lấy danh sách thuốc'
//     }, { status: 500 });
//   }
// }

// // API để tạo thuốc mới (nếu cần)
// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
//     const { name, description, price, dosage, contraindications, diseaseIds } = body;

//     // Validate input
//     if (!name) {
//       return NextResponse.json({
//         success: false,
//         error: 'Thiếu thông tin bắt buộc: name'
//       }, { status: 400 });
//     }

//     // Kết nối database
//     if (mongoose.connection.readyState !== 1) {
//       await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/medical_db');
//     }

//     // Tạo thuốc mới
//     const newMedicine = new Medicine({
//       name,
//       description: description || '',
//       price: price || 0,
//       dosage: dosage || '',
//       contraindications: contraindications || [],
//       diseaseIds: diseaseIds || [],
//       status: 'active'
//     });

//     await newMedicine.save();

//     return NextResponse.json({
//       success: true,
//       data: newMedicine,
//       message: 'Tạo thuốc thành công'
//     }, { status: 201 });

//   } catch (error: any) {
//     console.error('Error creating medicine:', error);
    
//     return NextResponse.json({
//       success: false,
//       error: error.message || 'Lỗi khi tạo thuốc'
//     }, { status: 500 });
//   }
// }

