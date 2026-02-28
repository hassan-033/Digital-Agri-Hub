export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <section className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <header className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Digital Agri-Hub
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900">
            Client Login
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Access enterprise-grade agricultural commodity intelligence.
          </p>
        </header>

        <form className="space-y-4">
          <label className="block text-sm font-medium text-slate-700">
            Work Email
            <input
              type="email"
              name="email"
              placeholder="you@company.com"
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            />
          </label>

          <label className="block text-sm font-medium text-slate-700">
            Password
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
            />
          </label>

          <button
            type="button"
            className="w-full rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
}
