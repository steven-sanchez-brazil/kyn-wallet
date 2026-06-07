'use server';

import fs from 'fs/promises';
import path from 'path';
import { AuthCredentials, User, RegisterData } from '../types/Auth';

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'users.json');

async function getUsers(): Promise<User[]> {
  try {
    const data = await fs.readFile(DATA_FILE_PATH, 'utf-8');
    const parsed = JSON.parse(data);
    return parsed.users || [];
  } catch (error) {
    console.error('Error reading users file:', error);
    return [];
  }
}

async function saveUsers(users: User[]): Promise<void> {
  try {
    const data = JSON.stringify({ users }, null, 2);
    await fs.writeFile(DATA_FILE_PATH, data, 'utf-8');
  } catch (error) {
    console.error('Error writing users file:', error);
    throw new Error('No se pudo guardar la información del usuario.');
  }
}

export async function loginAction(credentials: AuthCredentials): Promise<{ success: boolean; user?: User; error?: string }> {
  const users = await getUsers();
  const user = users.find(
    (u) => u.Email === credentials.Email && u.Password === credentials.Password
  );

  if (user) {
    return { success: true, user };
  }

  return { success: false, error: 'Credenciales inválidas.' };
}

export async function registerAction(data: RegisterData): Promise<{ success: boolean; error?: string }> {
  const users = await getUsers();
  
  const existingUser = users.find((u) => u.Email === data.Email);
  if (existingUser) {
    return { success: false, error: 'El correo electrónico ya está registrado.' };
  }

  const newUser: User = {
    FullName: data.FullName,
    Email: data.Email,
    Password: data.Password,
  };

  users.push(newUser);
  await saveUsers(users);

  return { success: true };
}
