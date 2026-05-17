function EmptyState({ title, description }) {
  return (
    <div className="rounded-[2rem] border border-dashed border-white/12 bg-white/5 px-6 py-14 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-900/80 text-sm font-semibold tracking-[0.2em] text-slate-200">
        GEO
      </div>
      <h3 className="mt-5 font-display text-2xl font-semibold text-white">
        {title}
      </h3>
      <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-400">
        {description}
      </p>
    </div>
  )
}

export default EmptyState
