import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { Email, Password } = body;

    const filePath = path.join(process.cwd(), 'data', 'users.json');
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ success: false, message: 'Data source not found' }, { status: 500 });
    }

    const fileData = fs.readFileSync(filePath, 'utf8');
    const users = JSON.parse(fileData);

    const user = users.find((u: any) => u.Email === Email && u.Password === Password);

    if (user) {
      // In a real app, we'd set a cookie or JWT here
      return NextResponse.json({ 
        success: true, 
        user: { Nombre: user.Nombre, Email: user.Email } 
      });
    }

    return NextResponse.json({ success: false, message: 'Credenciales inválidas' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Error en el servidor' }, { status: 500 });
  }
}
