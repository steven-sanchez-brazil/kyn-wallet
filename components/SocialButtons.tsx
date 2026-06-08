"use client";

type SocialButtonsProps = {
  className?: string;
};

export function SocialButtons({ className }: SocialButtonsProps) {
  function showComingSoon() {
    // Intentional simple feedback for demo scope
    // eslint-disable-next-line no-alert
    alert('Proximamente');
  }
  return (
    <div className={className}>
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-[#d7d9e6]" />
        <span className="whitespace-nowrap text-[13px] text-[#8a8ba8]">o regístrate con</span>
        <div className="h-px flex-1 bg-[#d7d9e6]" />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4">
        <button
          className="flex h-12 items-center justify-center gap-3 rounded-[12px] border border-[#d7d9e6] bg-white text-[15px] font-semibold text-[#16182c] transition hover:bg-[#f6f7fb]"
          onClick={showComingSoon}
          type="button"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#d7d9e6] text-[11px] font-bold text-[#ef5226]">G</span>
          Google
        </button>
        <button
          className="flex h-12 items-center justify-center gap-3 rounded-[12px] border border-[#d7d9e6] bg-white text-[15px] font-semibold text-[#16182c] transition hover:bg-[#f6f7fb]"
          onClick={showComingSoon}
          type="button"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full border border-[#d7d9e6] text-[11px] font-bold text-[#16182c]">A</span>
          Apple
        </button>
      </div>

      <p className="mt-6 text-center text-sm text-[#8a8ba8]">
        ¿Ya tienes cuenta?{' '}
        <a className="font-semibold text-[#ef5226] hover:underline" href="/login">
          Inicia sesión
        </a>
      </p>
    </div>
  );
}
