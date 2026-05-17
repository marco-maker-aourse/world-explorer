function ErrorMessage({ message }) {
  return (
    <div className="rounded-3xl border border-rose-300/25 bg-rose-300/10 px-4 py-3 text-sm text-rose-100 shadow-lg shadow-rose-950/10">
      {message}
    </div>
  )
}

export default ErrorMessage
