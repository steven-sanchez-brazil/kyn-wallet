'use client';

import { useRouter } from 'next/navigation';
import BrandPanel from '@/components/BrandPanel';
import RegisterForm from '@/components/RegisterForm';

export default function RegistroPage() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push('/login?registered=true');
  };

  return (
    <main className="min-h-screen flex">
      <BrandPanel />
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-white">
        <RegisterForm onSuccess={handleSuccess} />
      </div>
    </main>
  );
}
