import BrandPanel from '@/components/BrandPanel';
import RegisterForm from '@/components/RegisterForm';

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex bg-white">
      <BrandPanel />

      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 py-10 sm:p-8 bg-white">
        <RegisterForm />
      </div>
    </main>
  );
}
