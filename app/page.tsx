import Link from "next/link";

export default function HomePage() {
  return (
    <main className="app-shell flex items-center justify-center">
      <div className="hero-shell w-full max-w-4xl px-8 py-16 text-center">
        <p className="muted-label">Aegis Coach</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white">
          Design safe security AI chat workflows before you ship them.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-slate-300">
          The Studio drafts recommendations, guardrails, evidence-backed arguments,
          and a buildable spec before any code is generated.
        </p>
        <div className="mt-8 flex justify-center">
          <Link
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
            href="/studio"
          >
            Open Studio
          </Link>
        </div>
      </div>
    </main>
  );
}
