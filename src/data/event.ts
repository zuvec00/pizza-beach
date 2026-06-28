export const EVENT = {
  title: "Pizza Beach Birthday",
  hostedBy: "Zuky & Ebuka",
  date: "Saturday, July 4, 2026",
  time: "1:00 PM",
  location: "Avista Beach, Raliatu Olorunfunmike St, Eti-Osa, Lagos",
  entryFee: "Beach entry is on the birthdays 🎟️",
  rulesIntro: "The Avista protocol — read it before you pull up:",
  // Text wrapped in ==…== renders as a highlighted segment.
  // "__BRING__" is replaced per-guest with their personalized item (or removed).
  rules: [
    "There are two spots for the birthday: the shoreline and the villa.",
    "The villa is for chilling; the shoreline is for party activities.",
    "==Bring swimwear== — there's an indoor pool in the villa.",
    "Rides don't come to the coastal line after 9pm — ==come early to vibe early!==",
    "==No plus-ones.== The guest list is strictly ==INVITE ONLY.==",
    "==Labeld== is the official ticketing platform for Avista — make all beach-activity payments through the Labeld app.",
    "__BRING__",
    "==DON'T BREAK ANYTHING.== Each person is responsible for any item broken in the villa.",
    "If there's any chance you can't make it — or can't meet any of the rules — ==alert the birthdays ASAP.==",
    "==Come ready to have fun, make friends and vibe!==",
  ],
  // Host number, international format, NO + or spaces (required for wa.me links).
  whatsappNumber: "2349074678443", //+2349074678443
  // Local looping clip (single source of truth, spec §4.1).
  videoSrc: "/pizza-tv.mp4",
  // Static frame shown if the video can't load (spec §4.4).
  videoPoster:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60",
} as const;

export function whatsappLink(name: string, action: "accept" | "decline"): string {
  const message =
    action === "accept"
      ? `Hey i'm ${name}, i'll be there for the Pizza Beach Birthday 🍕🌊`
      : `Hey i'm ${name}, i won't be able to make it to the Pizza Beach Birthday 😩 ...and honestly, i hate you for it 😭🍕`;
  return `https://wa.me/${EVENT.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
