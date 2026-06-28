import { useState } from "react";
import { useParams } from "react-router-dom";
import { findGuest } from "../data/guests";
import { Gate } from "../components/Gate";
import { Invite } from "../components/Invite";
import { NotFound } from "./NotFound";

// Gate flag is keyed by slug in sessionStorage so a refresh keeps you in,
// but pasting a "deeper" URL still can't skip the gate (spec §6.2).
const passKey = (slug: string) => `pbb:passed:${slug}`;

export function InvitePage() {
  const { slug } = useParams();
  const guest = findGuest(slug);

  const [passed, setPassed] = useState<boolean>(() =>
    guest ? sessionStorage.getItem(passKey(guest.slug)) === "1" : false
  );

  // Unknown slug → not-found, never the gate or invite (spec §3.4 / §6.1).
  if (!guest) return <NotFound />;

  if (!passed) {
    return (
      <Gate
        guest={guest}
        onPass={() => {
          sessionStorage.setItem(passKey(guest.slug), "1");
          setPassed(true);
        }}
      />
    );
  }

  return <Invite guest={guest} />;
}
