import { useEffect, useRef, useState } from "react";
import { type Guest } from "../data/guests";
import { EVENT, whatsappLink } from "../data/event";

// Decorative pizza topping layer — cheese texture + drifting pepperoni.
const PEPPERONI = [
  { top: "8%", left: "-4%", size: 92, rot: -8, dur: 11, delay: 0 },
  { top: "22%", left: "82%", size: 70, rot: 12, dur: 9, delay: 1.2 },
  { top: "46%", left: "4%", size: 56, rot: 4, dur: 10, delay: 0.6 },
  { top: "60%", left: "88%", size: 104, rot: -10, dur: 13, delay: 2 },
  { top: "78%", left: "-3%", size: 78, rot: 6, dur: 12, delay: 0.3 },
  { top: "88%", left: "70%", size: 60, rot: -6, dur: 8.5, delay: 1.6 },
  { top: "36%", left: "46%", size: 44, rot: 10, dur: 9.5, delay: 2.4 },
];

function PizzaBackground() {
  return (
    <div className="fixed inset-0 z-0 pizza-bg overflow-hidden" aria-hidden>
      {PEPPERONI.map((p, i) => (
        <div
          key={i}
          className="pepperoni pepperoni-anim"
          style={
            {
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              opacity: 0.9,
              "--rot": `${p.rot}deg`,
              "--dur": `${p.dur}s`,
              "--delay": `${p.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

function RetroTv() {
  const [failed, setFailed] = useState(false);
  return (
    <section className="relative mt-2">
      {/* Antenna */}
      <div className="absolute left-1/2 -top-9 -translate-x-1/2 z-0 h-10 w-24">
        <div className="absolute left-1/2 bottom-0 h-10 w-1 bg-tv-bezel rounded-full origin-bottom -rotate-[28deg]">
          <div className="absolute -top-2 -left-1 w-3 h-3 rounded-full bg-secondary-container border border-tv-bezel" />
        </div>
        <div className="absolute left-1/2 bottom-0 h-10 w-1 bg-tv-bezel rounded-full origin-bottom rotate-[28deg]">
          <div className="absolute -top-2 -left-1 w-3 h-3 rounded-full bg-secondary-container border border-tv-bezel" />
        </div>
        {/* antenna base */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-5 h-3 bg-tv-bezel rounded-t-md" />
      </div>

      <div className="bg-tv-bezel rounded-[32px] p-4 pb-9 pixel-border relative z-10 overflow-hidden">
        <div className="relative aspect-[4/3] bg-black rounded-3xl overflow-hidden border-4 border-[#0c1518] shadow-inner">
          {failed ? (
            <img
              src={EVENT.videoPoster}
              alt="Beach scene"
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <video
              src={EVENT.videoSrc}
              poster={EVENT.videoPoster}
              muted
              loop
              autoPlay
              playsInline
              onError={() => setFailed(true)}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          {/* CRT effects */}
          <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
          <div className="absolute inset-0 scanline-overlay" />
          <div className="absolute inset-0 tv-glow" />
          {/* REC indicator */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <div className="w-3 h-3 bg-error-red rounded-full animate-pulse" />
            <span className="text-white font-label-bold text-[10px] tracking-widest uppercase">
              REC
            </span>
          </div>
        </div>
        {/* Knobs */}
        <div className="absolute right-8 bottom-4 flex flex-col gap-2">
          <div className="w-6 h-6 rounded-full bg-secondary-container border-2 border-tv-bezel shadow-inner" />
          <div className="w-6 h-6 rounded-full bg-secondary-container border-2 border-tv-bezel shadow-inner" />
        </div>
        {/* Vents */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-5 flex gap-2 opacity-20">
          <div className="w-8 h-1 bg-white rounded-full" />
          <div className="w-8 h-1 bg-white rounded-full" />
          <div className="w-8 h-1 bg-white rounded-full" />
        </div>
      </div>
      {/* Feet / stubs so the TV rests on the floor */}
      <div className="absolute -bottom-3 left-12 w-6 h-7 bg-tv-bezel rounded-b-xl rotate-6 origin-top shadow-[0_4px_6px_rgba(26,46,53,0.25)] z-0" />
      <div className="absolute -bottom-3 right-12 w-6 h-7 bg-tv-bezel rounded-b-xl -rotate-6 origin-top shadow-[0_4px_6px_rgba(26,46,53,0.25)] z-0" />

      {/* Sticker */}
      <div className="absolute -top-4 -right-2 rotate-12 bg-primary px-4 py-1 rounded-sm pixel-border z-20">
        <span className="font-label-bold text-white text-[12px] uppercase tracking-wider">
          Fresh &amp; Hot!
        </span>
      </div>
    </section>
  );
}

function EventInfo({ onSeeRules }: { onSeeRules: () => void }) {
  return (
    <>
      <section className="text-center flex flex-col gap-4">
        <div className="space-y-1">
          <h2 className="font-display-lg-mobile text-display-lg-mobile text-primary leading-none uppercase -rotate-1">
            {EVENT.title}
          </h2>
          <p className="font-body-lg text-body-lg text-tertiary italic">
            hosted by {EVENT.hostedBy}
          </p>
        </div>

        <div className="bg-surface-container border-2 border-tertiary p-6 rounded-xl pixel-border rotate-1 flex flex-col gap-4">
          <Detail icon="calendar_today" text={EVENT.date} />
          <div className="h-[2px] bg-sand-divider w-full" />
          <Detail icon="schedule" text={EVENT.time} />
          <div className="h-[2px] bg-sand-divider w-full" />
          <Detail icon="location_on" text={EVENT.location} />
          <div className="h-[2px] bg-sand-divider w-full" />
          <Detail icon="confirmation_number" text={EVENT.entryFee} />
        </div>
      </section>

      <section className="flex flex-col gap-3 mt-2">
        <button
          onClick={onSeeRules}
          className="bg-primary text-white font-headline-sm text-headline-sm py-4 rounded-xl pixel-border active-click transition-all flex items-center justify-center gap-2 uppercase tracking-tighter"
        >
          The rules / more info
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
        <p className="font-body-md text-body-md text-on-surface-variant text-center">
          Give the rules a read first — your RSVP buttons are waiting at the
          bottom. 🍕
        </p>
      </section>
    </>
  );
}

function Detail({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-center justify-center gap-3 text-on-surface">
      <span className="material-symbols-outlined text-primary">{icon}</span>
      <span className="font-label-bold text-body-md uppercase">{text}</span>
    </div>
  );
}

function Rules({
  guest,
  acknowledged,
  setAcknowledged,
}: {
  guest: Guest;
  acknowledged: boolean;
  setAcknowledged: (v: boolean) => void;
}) {
  return (
    <>
      <section className="bg-surface-bright border-2 border-tertiary p-6 rounded-xl pixel-border flex flex-col gap-6">
        <h3 className="font-display-lg-mobile text-display-lg-mobile text-primary text-center uppercase">
          The Protocol
        </h3>
        <p className="font-body-md text-body-md text-on-surface-variant text-center -mt-3">
          {EVENT.rulesIntro}
        </p>
        <ul className="flex flex-col gap-4">
          {EVENT.rules.map((rule, i) => (
            <li key={rule} className="flex gap-3">
              <span className="font-headline-sm text-headline-sm text-secondary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="font-body-md text-body-md text-on-surface">{rule}</p>
            </li>
          ))}
        </ul>

        {/* Acknowledgement gate */}
        <label className="flex items-start gap-3 cursor-pointer select-none bg-surface-container rounded-xl p-4 border-2 border-dashed border-outline-variant">
          <input
            type="checkbox"
            checked={acknowledged}
            onChange={(e) => setAcknowledged(e.target.checked)}
            className="mt-1 h-5 w-5 shrink-0 accent-primary"
          />
          <span className="font-body-md text-body-md text-on-surface">
            I've read the rules &amp; info — let me RSVP.
          </span>
        </label>
      </section>

      {/* RSVP buttons — disabled until the box is checked */}
      <section className="flex flex-col gap-3">
        <RsvpButton
          href={whatsappLink(guest.name, "accept")}
          enabled={acknowledged}
          className="bg-primary text-white"
        >
          I'm in! <span className="text-2xl">🍕</span>
        </RsvpButton>
        <RsvpButton
          href={whatsappLink(guest.name, "decline")}
          enabled={acknowledged}
          className="bg-secondary-container text-on-secondary-container"
        >
          Can't make it
        </RsvpButton>
        {!acknowledged && (
          <p className="font-label-bold text-label-bold text-on-surface-variant text-center uppercase tracking-wider">
            Check the box above to unlock 👆
          </p>
        )}
      </section>
    </>
  );
}

function RsvpButton({
  href,
  enabled,
  className,
  children,
}: {
  href: string;
  enabled: boolean;
  className: string;
  children: React.ReactNode;
}) {
  const base =
    "font-headline-sm text-headline-sm py-4 rounded-xl uppercase tracking-tighter flex items-center justify-center gap-2 text-center transition-all";
  if (!enabled) {
    return (
      <span
        aria-disabled="true"
        className={`${base} bg-surface-dim text-on-surface-variant/50 cursor-not-allowed opacity-60`}
      >
        {children}
      </span>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} pixel-border active-click ${className}`}
    >
      {children}
    </a>
  );
}

export function Invite({ guest }: { guest: Guest }) {
  const [tab, setTab] = useState<"invite" | "rules">("invite");
  const [acknowledged, setAcknowledged] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Reset the lower panel to the top whenever we switch views.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [tab]);

  return (
    <div className="relative h-[100dvh] flex flex-col overflow-hidden text-on-background font-body-md">
      <PizzaBackground />

      {/* ---- Fixed zone: header + TV (never scrolls) ---- */}
      <header className="relative z-10 bg-surface border-b-2 border-tertiary shadow-[0px_2px_0px_0px_rgba(26,46,53,0.1)]">
        <div className="flex items-center justify-center px-container-padding h-16 w-full max-w-[500px] mx-auto">
          <h1 className="font-headline-sm-mobile text-headline-sm-mobile text-primary tracking-tighter uppercase">
            {EVENT.title}
          </h1>
        </div>
      </header>

      <div className="relative z-10 flex-none w-full max-w-[500px] mx-auto px-container-padding pt-8 pb-2">
        {/* TV stays mounted + playing while the panel below scrolls (spec §4.2). */}
        <RetroTv />
      </div>

      {/* ---- Scrollable zone: event info / rules ---- */}
      <main
        ref={scrollRef}
        className="relative z-10 flex-1 min-h-0 overflow-y-auto w-full max-w-[500px] mx-auto px-container-padding pt-4 pb-10 flex flex-col gap-6"
      >
        {tab === "invite" ? (
          <EventInfo onSeeRules={() => setTab("rules")} />
        ) : (
          <Rules
            guest={guest}
            acknowledged={acknowledged}
            setAcknowledged={setAcknowledged}
          />
        )}

        {tab === "rules" && (
          <footer className="text-center">
            <button
              className="text-tertiary-container font-label-bold text-label-bold uppercase tracking-widest border-b-2 border-transparent hover:border-tertiary transition-all"
              onClick={() => setTab("invite")}
            >
              ← back to invite
            </button>
          </footer>
        )}
      </main>
    </div>
  );
}
