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