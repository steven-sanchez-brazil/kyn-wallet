export function BrandPanel() {
  return (
    <aside
      className="relative hidden min-h-screen overflow-hidden lg:block"
      style={{
        background: 'linear-gradient(70.73deg, #ff8a65 31.698%, #ef5226 83.455%)'
      }}
    >
      <div className="absolute left-14 top-16 flex items-center gap-2 text-white">
        <div className="relative h-7 w-3 rounded-full bg-white/90" />
        <div className="absolute left-[4px] top-[12px] h-4 w-4 rounded-full bg-white/90" />
        <span className="ml-3 text-[26px] font-bold">KynWallet</span>
      </div>

      <div className="absolute left-14 top-[400px] max-w-[500px] text-white">
        <h2 className="text-[44px] font-bold leading-[1.08]">Comienza tu</h2>
        <h2 className="text-[44px] font-bold leading-[1.08]">camino financiero.</h2>
        <p className="mt-6 text-[17px] leading-8 text-white/85">
          Crea tu cuenta en minutos y empieza a enviar, recibir y administrar tu dinero desde cualquier lugar.
        </p>
      </div>

      <div className="absolute bottom-6 left-14 h-[210px] w-[360px] rounded-[22px] border border-white/35 bg-white/15 p-6 text-white shadow-2xl backdrop-blur-sm">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between text-[15px] font-semibold">
            <span>Kyn Card</span>
            <div className="h-7 w-10 rounded-md bg-[#ffd980]/90" />
          </div>
          <div className="mt-8 text-[20px] font-medium tracking-[0.16em]">5294 •••• •••• 4827</div>
          <div className="mt-auto flex items-end justify-between text-[13px] font-medium text-white/90">
            <span>STEVEN LUNA</span>
            <span>12/29</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
