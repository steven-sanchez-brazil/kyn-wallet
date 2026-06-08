import RegisterBrandPanel from '@/components/RegisterBrandPanel';
import RegisterForm from '@/components/RegisterForm';

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex register-page">
      <RegisterBrandPanel />
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-white">
        <RegisterForm />
      </div>
    </main>
  );
}
