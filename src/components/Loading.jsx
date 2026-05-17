function Loading() {
  return (
    <div className="grid gap-5 xl:grid-cols-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/6 p-5"
        >
          <div className="grid gap-4 sm:grid-cols-[1.2fr_0.8fr]">
            <div className="h-48 animate-pulse rounded-[1.5rem] bg-slate-800/80" />
            <div className="h-48 animate-pulse rounded-[1.5rem] bg-slate-800/80" />
          </div>
          <div className="mt-5 space-y-3">
            <div className="h-7 w-2/3 animate-pulse rounded-full bg-slate-800/80" />
            <div className="h-4 w-3/4 animate-pulse rounded-full bg-slate-800/80" />
            <div className="grid gap-3 sm:grid-cols-2">
              {Array.from({ length: 6 }).map((__, innerIndex) => (
                <div
                  key={innerIndex}
                  className="h-20 animate-pulse rounded-2xl bg-slate-800/80"
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Loading
