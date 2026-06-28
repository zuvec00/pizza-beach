import { useRef, useState } from "react";
import { type Guest, isAnswerCorrect } from "../data/guests";

const FAIL_MESSAGES = [
  "Nah, that's not it. Try again 🍕",
  "Close, but the pizza says no.",
  "Not quite — give it another shot.",
];

export function Gate({ guest, onPass }: { guest: Guest; onPass: () => void }) {
  const [value, setValue] = useState("");
  const [shake, setShake] = useState(false);
  const [failMsg, setFailMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const failIndex = useRef(0);
  const firstName = guest.name.split(" ")[0];

  function submit() {
    const trimmed = value.trim();
    if (!trimmed) {
      setFailMsg("Type something first 🍕");
      return;
    }
    if (isAnswerCorrect(guest, trimmed)) {
      setFailMsg("");
      setSuccess(true);
      window.setTimeout(onPass, 1600); // success beat → advance (spec §3.3)
      return;
    }
    setFailMsg(FAIL_MESSAGES[failIndex.current % FAIL_MESSAGES.length]);
    failIndex.current += 1;
    setShake(false);
    requestAnimationFrame(() => setShake(true));
  }

  return (
    <div className="bg-background text-on-background min-h-screen selection:bg-secondary-container selection:text-on-secondary-container">
      {/* Background beach layer */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?auto=format&fit=crop&w=1200&q=70')",
          }}
        />
      </div>

      <main className="relative z-20 min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden">
        <div
          className={`w-full max-w-[400px] bg-surface border-[3px] border-tertiary rounded-2xl p-8 pizza-box-shadow -rotate-1.5 flex flex-col items-center transition-all duration-300${
            shake ? " shake-animation" : ""
          }${success ? " opacity-0 scale-110 !rotate-0" : ""}`}
          onAnimationEnd={() => setShake(false)}
        >
          {/* Lid sticker */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary px-4 py-1 rounded-full shadow-[2px_2px_0px_0px_rgba(26,46,53,1)] rotate-3">
            <span className="font-label-bold text-label-bold text-on-primary uppercase tracking-wider">
              Top Secret
            </span>
          </div>

          <div className="text-center mb-8">
            <h1 className="font-headline-md text-headline-md text-primary mb-2 uppercase leading-none">
              Hey {firstName},<br />
              <span className="text-tertiary font-headline-sm">
                before you come in...
              </span>
            </h1>
          </div>

          <div className="w-full space-y-6">
            <div className="bg-surface-container rounded-xl p-4 border-2 border-dashed border-outline-variant">
              <p className="font-body-lg text-body-lg text-on-surface-variant text-center">
                {guest.question}
              </p>
            </div>

            <div className="space-y-3">
              <div className="relative">
                <input
                  className="w-full h-14 bg-surface-container-lowest border-[3px] border-tertiary rounded-xl px-4 font-body-lg text-body-lg text-center focus:outline-none focus:border-secondary-container transition-all placeholder:text-outline-variant"
                  type="text"
                  autoFocus
                  autoComplete="off"
                  placeholder="Type here..."
                  value={value}
                  aria-label="Your answer"
                  onChange={(e) => {
                    setValue(e.target.value);
                    if (failMsg) setFailMsg("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      submit();
                    }
                  }}
                />
                <div className="absolute -right-2 top-1/2 -translate-y-1/2 flex flex-col gap-1">
                  <div className="w-2 h-2 rounded-full bg-secondary" />
                  <div className="w-2 h-2 rounded-full bg-secondary" />
                </div>
              </div>

              <p className="font-label-bold text-error text-center min-h-[1.2em]" aria-live="polite">
                {failMsg}
              </p>

              <button
                className="w-full h-14 bg-primary text-on-primary font-headline-sm text-headline-sm rounded-xl hard-shadow-button transition-all uppercase tracking-tighter flex items-center justify-center gap-2"
                onClick={submit}
              >
                Lock it in
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  lock
                </span>
              </button>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t-2 border-surface-container-high w-full flex justify-between items-center opacity-60">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-secondary uppercase">
                Order #1994
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                {firstName}'s Pizza Bash
              </span>
            </div>
            <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-secondary">
                restaurant
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Success overlay */}
      <div
        className={`fixed inset-0 z-50 bg-primary-container flex items-center justify-center transition-opacity duration-500 ${
          success ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`text-center space-y-4 transition-transform duration-500 ${
            success ? "scale-100" : "scale-90"
          }`}
        >
          <h2 className="font-display-lg text-display-lg text-on-primary-container uppercase italic">
            You're In!
          </h2>
          <p className="font-headline-sm text-headline-sm text-on-primary-container">
            Opening the box...
          </p>
        </div>
      </div>
    </div>
  );
}
