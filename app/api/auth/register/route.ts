import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { Nombre, Email, Password } = body;

    const filePath = path.join(process.cwd(), 'data', 'users.json');
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify([]));
    }

    const fileData = fs.readFileSync(filePath, 'utf8');
    const users = JSON.parse(fileData);

    if (users.find((u: any) => u.Email === Email)) {
      return NextResponse.json({ success: false, message: 'El usuario ya existe' }, { status: 400 });
    }

    const newUser = { Nombre, Email, Password };
    users.push(newUser);

    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Error en el servidor' }, { status: 500 });
  }
}
