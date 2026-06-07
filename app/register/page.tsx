import BrandPanel from '@/components/BrandPanel';
import RegistrationForm from '@/components/RegistrationForm';

export default function RegistrationPage() {
  return (
    <main className="min-h-screen flex bg-white">
      <BrandPanel iconVariant="register" gradientVariant="register" />
      <section className="w-full lg:w-1/2 flex items-center justify-center px-6 py-10 bg-white">
        <RegistrationForm />
      </section>
    </main>
  );
}
