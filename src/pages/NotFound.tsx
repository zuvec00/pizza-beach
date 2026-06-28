import { EVENT } from "../data/event";

export function NotFound() {
  return (
    <div className="bg-surface text-on-surface font-body-md overflow-x-hidden min-h-screen">
      <header className="bg-surface sticky top-0 z-50 border-b-2 border-tertiary shadow-[0px_2px_0px_0px_rgba(26,46,53,0.1)]">
        <div className="flex items-center justify-center px-container-padding h-16 w-full max-w-[500px] mx-auto">
          <h1 className="font-headline-sm-mobile text-headline-sm-mobile text-primary tracking-tighter uppercase">
            {EVENT.title}
          </h1>
        </div>
      </header>

      <main className="relative flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-container-padding py-12">
        {/* Atmospheric blobs */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-secondary-fixed rounded-full blur-3xl" />
          <div className="absolute top-40 -left-20 w-64 h-64 bg-tertiary-fixed rounded-full blur-2xl" />
        </div>

        <div className="relative z-10 w-full max-w-[400px] bg-surface-container-lowest border-2 border-tertiary p-6 -rotate-1.5 pizza-box-shadow shake-animation">
          <div className="absolute -top-4 -right-2 bg-primary px-3 py-1 -rotate-3 hard-shadow">
            <span className="font-label-bold text-label-bold text-on-primary uppercase">
              Order #404
            </span>
          </div>

          {/* Spinning pizza graphic */}
          <div className="w-full aspect-square mb-6 bg-surface-container-high rounded-xl flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 scanline-overlay" />
            <div className="relative w-48 h-48">
              <div className="absolute inset-0 rounded-full border-8 border-secondary border-dashed animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-4 rounded-full bg-secondary-fixed flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-primary text-6xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  local_pizza
                </span>
              </div>
            </div>
          </div>

          <div className="text-center space-y-4">
            <h2 className="font-headline-md text-headline-md text-primary leading-none">
              Whoops! We don't recognize this invite.
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Double check the link{" "}
              <span className="font-bold text-secondary">Zuky</span> or{" "}
              <span className="font-bold text-secondary">Ebuka</span> sent you. It
              looks like this one got cold. 🍕
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
