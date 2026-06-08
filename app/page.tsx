import { redirect } from 'next/navigation';
import { REGISTER_PATH } from '@/lib/routes';

export default function HomePage() {
  redirect(REGISTER_PATH);
}
