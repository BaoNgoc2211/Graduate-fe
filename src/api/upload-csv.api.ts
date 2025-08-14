// // api/upload-csv.api.ts (Next.js API Route)
// import { NextApiRequest, NextApiResponse } from 'next';
// import formidable from 'formidable';
// import fs from 'fs';
// import FormData from 'form-data';

// // Disable body parser để xử lý file upload
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method not allowed' });
//   }

//   try {
//     // Parse form data với formidable
//     const form = formidable({
//       uploadDir: '/tmp',
//       keepExtensions: true,
//       maxFileSize: 10 * 1024 * 1024, // 10MB
//     });

//     const [, files] = await form.parse(req);
//     const csvFile = Array.isArray(files.csvFile) ? files.csvFile[0] : files.csvFile;

//     if (!csvFile) {
//       return res.status(400).json({ error: 'No file uploaded' });
//     }

//     // Tạo FormData để gửi đến Express backend
//     const formData = new FormData();
    
//     // Đọc file và append vào FormData
//     const fileStream = fs.createReadStream(csvFile.filepath);
//     formData.append('csvFile', fileStream, {
//       filename: csvFile.originalFilename,
//       contentType: csvFile.mimetype,
//     });

//     // Gửi request đến Express backend
//     const backendResponse = await fetch(`${process.env.BACKEND_URL || 'http://localhost:3001'}/api/upload/upload-csv`, {
//       method: 'POST',
//       body: formData,
//       headers: formData.getHeaders(),
//     });

//     const result = await backendResponse.json();

//     // Clean up temp file
//     fs.unlinkSync(csvFile.filepath);

//     if (!backendResponse.ok) {
//       return res.status(backendResponse.status).json(result);
//     }

//     res.status(200).json(result);

//   } catch (error) {
//     console.error('API Error:', error);
//     res.status(500).json({ 
//       error: 'Internal server error', 
//       details: (error as Error).message 
//     });
//   }
// }
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    console.log('API route called');

    // Kiểm tra backend có chạy không
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:8888';
    
    try {
      const testResponse = await fetch(`${backendUrl}/api/csv/test-format`);
      if (!testResponse.ok) {
        throw new Error('Backend not accessible');
      }
    } catch (backendError) {
      console.error('Backend connection failed:', backendError);
      return NextResponse.json({
        success: false,
        error: 'Backend server không khả dụng. Vui lòng kiểm tra backend đã chạy chưa.',
        details: `Không thể kết nối tới ${backendUrl}`
      }, { status: 503 });
    }

    const formData = await request.formData();
    const file = formData.get('csvFile') as File;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'Không tìm thấy file CSV' },
        { status: 400 }
      );
    }

    console.log('File received:', file.name, file.size);

    // Tạo FormData để gửi đến backend
    const backendFormData = new FormData();
    backendFormData.append('csvFile', file);

    // Gửi request đến Express backend
    const backendResponse = await fetch(`${backendUrl}/api/csv/upload-csv`, {
      method: 'POST',
      body: backendFormData,
    });

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json();
      return NextResponse.json(errorData, { status: backendResponse.status });
    }

    const result = await backendResponse.json();
    return NextResponse.json(result);

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Lỗi server', 
        details: (error as Error).message 
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}