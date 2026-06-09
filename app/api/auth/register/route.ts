import { NextResponse } from 'next/server';
import type { RegistrationRequest } from '@/lib/types/Auth';
import { validateEmail, validatePassword, validateRequired } from '@/lib/utils/Validation';

const REGISTERED_EMAILS = ['tucorreo@ejemplo.com'];

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<RegistrationRequest>;
    const fullName = body.FullName?.trim() ?? '';
    const email = body.Email?.trim().toLowerCase() ?? '';
    const password = body.Password ?? '';
    const acceptedTerms = body.AcceptedTerms === true;

    if (!validateRequired(fullName)) {
      return NextResponse.json({ error: 'El nombre completo es obligatorio' }, { status: 400 });
    }

    if (!validateEmail(email)) {
      return NextResponse.json({ error: 'Por favor, ingresa un correo electrónico válido' }, { status: 400 });
    }

    if (!validatePassword(password)) {
      return NextResponse.json({ error: 'La contraseña debe tener al menos 8 caracteres' }, { status: 400 });
    }

    if (!acceptedTerms) {
      return NextResponse.json({ error: 'Debes aceptar los términos y condiciones' }, { status: 400 });
    }

    if (REGISTERED_EMAILS.includes(email)) {
      return NextResponse.json({ error: 'Este correo ya está registrado' }, { status: 409 });
    }

    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json({
      Success: true,
      Message: 'Cuenta creada exitosamente',
      UserId: `user-${Date.now()}`,
    });
  } catch {
    return NextResponse.json(
      { error: 'Ocurrió un error inesperado. Por favor, intenta de nuevo.' },
      { status: 500 }
    );
  }
}
