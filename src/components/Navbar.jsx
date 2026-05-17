function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/85 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-300 via-cyan-300 to-amber-200 text-lg font-semibold text-slate-950 shadow-lg shadow-sky-400/20">
            WE
          </div>
          <div>
            <p className="font-display text-2xl font-semibold tracking-tight text-white">
              World Explorer
            </p>
            <p className="text-sm text-slate-400">
              Buscador global de paises y datos geograficos
            </p>
          </div>
        </div>

        <div className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.22em] text-slate-300 md:block">
          Consulta detallada
        </div>
      </div>
    </header>
  )
}

export default Navbar
