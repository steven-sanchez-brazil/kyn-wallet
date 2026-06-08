import BrandPanel from '@/components/BrandPanel';
import RegistroForm from '@/components/RegistroForm';

export default function RegistroPage() {
  return (
    <main className="min-h-screen flex">
      <BrandPanel />
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 bg-white">
        <RegistroForm />
      </div>
    </main>
  );
}
