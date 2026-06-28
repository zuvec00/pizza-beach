export type Guest = {
  slug: string; // "folz" - matches the URL
  name: string; // "Folz" - display + WhatsApp message
  question: string; // personalized gate question shown on screen 1
  acceptableAnswers: string[]; // lowercase, trimmed accepted answers
};

export const GUESTS: Guest[] = [
  {
    slug: "folz",
    name: "Folz",
    question: "What's you and Zuky's man's name?",
    acceptableAnswers: ["prince"],
  },
  {
    slug: "prince",
    name: "Prince",
    question: "L is for what?",
    acceptableAnswers: ["labeld"],
  },
  {
    slug: "charles",
    name: "Charles",
    question:
      "You and Zuky have been involved with a set of twins in the past — what is their surname?",
    acceptableAnswers: ["ukazu"],
  },
  {
    slug: "dejo",
    name: "Dejo",
    question: "What term do we usually use to refer to Ebuka and Zuky's house?",
    acceptableAnswers: ["the promised land", "promised land"],
  },
  {
    slug: "ak",
    name: "AK",
    question: "Who told you and Ebuka to build a mansion in two years?",
    acceptableAnswers: ["grandma"],
  },
  {
    slug: "abdul",
    name: "Abdul",
    question: 'Which girl did you and Ebuka "fight" over?',
    acceptableAnswers: ["dalu"],
  },
  {
    slug: "kachi",
    name: "Kachi",
    question: "What day of the week were you and Ebuka born?",
    acceptableAnswers: ["thursday"],
  },
  {
    slug: "collins",
    name: "Collins",
    question: "How many years were you and Ebuka roommates?",
    acceptableAnswers: ["3", "three"],
  },
  {
    slug: "micheal",
    name: "Micheal",
    question: "How many years were you and Ebuka classmates in JMC?",
    acceptableAnswers: ["6", "six"],
  },
  {
    slug: "obinna",
    name: "Obinna",
    question: "Which girl did you and Ebuka both like?",
    acceptableAnswers: ["soluzo"],
  },
  {
    slug: "lade",
    name: "Lade",
    question: "You, Ebuka, and who took pictures together on graduation day?",
    acceptableAnswers: ["daniel"],
  },
  {
    slug: "temi",
    name: "Temi",
    question: "What are Ebuka's two favorite things about you?",
    acceptableAnswers: ["voice and vibe", "vibe and voice"],
  },
  {
    slug: "adaure",
    name: "Adaure",
    question: "Who is elder between you and Ebuka?",
    acceptableAnswers: ["ebuka"],
  },
  {
    slug: "dami",
    name: "Dami",
    question: "What version of pancakes did you introduce Zuky and friends to?",
    acceptableAnswers: ["chocolate pancakes", "chocolate"],
  },
  {
    slug: "gwyneth",
    name: "Gwyneth",
    question:
      "What food did you and Ebuka eat outside your house the first time he visited you?",
    acceptableAnswers: ["spaghetti"],
  },
  {
    slug: "maddie",
    name: "Maddie",
    question:
      "Recently, Zuky received one of his favorite gifts ever — what was that gift?",
    acceptableAnswers: ["arsenal jersey", "jersey"],
  },
  {
    slug: "dave",
    name: "Dave",
    question:
      "What is the nickname of you and Zuky's joint fav roommate from year 1?",
    acceptableAnswers: ["thugger"],
  },
  {
    slug: "ogo",
    name: "Ogo",
    question: "What name did Zuky famously give you in secondary school?",
    acceptableAnswers: ["ogomi"],
  },
  {
    slug: "ada",
    name: "Ada",
    question: "Which of your friends does Zuky claim to have a crush on?",
    acceptableAnswers: ["tamilore"],
  },
  {
    slug: "oluebube",
    name: "Oluebube",
    question:
      "What is the name of the famous primary school teacher who drilled both you and Zuky for competitions and the likes?",
    acceptableAnswers: ["uncle mike"],
  },
  {
    slug: "hikma",
    name: "Hikma",
    question: "What is the name of the restaurant that Zuky asked you out in?",
    acceptableAnswers: ["circa"],
  },
  {
    slug: "une",
    name: "Une",
    question: "What role did Zuky opt to play in your music career?",
    acceptableAnswers: ["manager"],
  },
  {
    slug: "desola",
    name: "Desola",
    question: "Where did you and the birthday boys first meet?",
    acceptableAnswers: ["gwyneth's house", "gwyneths house", "gwyneth house"],
  },
  {
    slug: "mj",
    name: "MJ",
    question: "What important item of Zuky's have you lost at a party before?",
    acceptableAnswers: ["laptop"],
  },
  {
    slug: "simi",
    name: "Simi",
    question:
      "What is the name of the company that you and Zuky worked at during internship?",
    acceptableAnswers: ["chamsmobile"],
  },
];

export function findGuest(slug: string | undefined): Guest | undefined {
  if (!slug) return undefined;
  return GUESTS.find((g) => g.slug === slug.toLowerCase());
}

/**
 * Answer matching rule (spec §2.2): trim whitespace, lowercase, then check for
 * an exact match against acceptableAnswers.
 */
export function isAnswerCorrect(guest: Guest, raw: string): boolean {
  const cleaned = raw.trim().toLowerCase();
  if (!cleaned) return false;
  return guest.acceptableAnswers.some((a) => a.trim().toLowerCase() === cleaned);
}
