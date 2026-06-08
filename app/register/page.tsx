import BrandPanel from '@/components/BrandPanel';
import RegisterForm from '@/components/RegisterForm';

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex bg-[#f7f7fa]">
      <BrandPanel />
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-[#f7f7fa]">
        <RegisterForm />
      </div>
    </main>
  );
}
