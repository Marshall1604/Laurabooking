import { NextResponse } from 'next/server';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'www.junky3@yahoo.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Nguyenthitrinh2505@';

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as any;
    const { email, password } = body || {};

    const cleanEmail = String(email || '').trim().toLowerCase();
    const cleanPassword = String(password || '').trim();

    if (cleanEmail === ADMIN_EMAIL.toLowerCase() && cleanPassword === ADMIN_PASSWORD) {
      return NextResponse.json({
        success: true,
        message: 'Xác thực thành công',
        user: { email: ADMIN_EMAIL, role: 'super_admin' },
      });
    }

    return NextResponse.json(
      { success: false, message: 'Email hoặc Mật khẩu không chính xác' },
      { status: 401 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: 'Lỗi xác thực hệ thống' },
      { status: 500 }
    );
  }
}
