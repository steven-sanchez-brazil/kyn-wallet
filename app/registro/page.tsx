import BrandPanel from '@/components/BrandPanel';
import RegistrationForm from '@/components/RegistrationForm';

export default function RegistroPage() {
  return (
    <main className="flex min-h-screen">
      <BrandPanel />
      <div className="flex w-full items-center justify-center bg-white px-6 py-10 sm:px-8 lg:w-1/2">
        <RegistrationForm />
      </div>
    </main>
  );
}
