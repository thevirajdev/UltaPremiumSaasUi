import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  if (!process.env.SUPER_ADMIN_EMAIL || !process.env.SUPER_ADMIN_PASSWORD) {
    console.error("CRITICAL: Super admin credentials missing in environment variables!");
    return NextResponse.json({ success: false, message: 'Server configuration error' }, { status: 500 });
  }
  
  try {
    const { email, password } = await req.json();

    // Check Super Admin from .env
    if (
      email === process.env.SUPER_ADMIN_EMAIL &&
      password === process.env.SUPER_ADMIN_PASSWORD
    ) {
      return NextResponse.json({ 
        success: true, 
        userRole: 'superadmin' 
      });
    }

    return NextResponse.json({ 
      success: false, 
      message: 'Invalid credentials' 
    }, { status: 401 });
    
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      message: 'Authentication failed' 
    }, { status: 500 });
  }
}
