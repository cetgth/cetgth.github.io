/**
 * ────────────────────────────────────────────────────────────────────────────
 *  SITE CONFIG — single source of truth.
 *  Edit THIS file to update your name, links, and identity across the whole site.
 *  (Search the README "콘텐츠 추가 cheatsheet" for where everything lives.)
 * ────────────────────────────────────────────────────────────────────────────
 */

export interface SocialLinks {
  email?: string; // plain address; it is auto-obfuscated before rendering
  github?: string; // full URL
  scholar?: string; // full URL
  orcid?: string; // full URL
  twitter?: string; // full URL (x.com/...)
}

export const site = {
  /** Used for <title>, meta tags, and the deployed canonical URL. */
  url: "https://USERNAME.github.io", // ← change to your GitHub Pages / custom domain

  /** Your name. Korean is shown as a subtitle next to the English name. */
  name: {
    en: "Firstname Lastname",
    ko: "홍길동",
  },

  /** Surnames that should be rendered in bold in the author lists (you + aliases). */
  selfSurnames: ["Lastname"],

  /** One-line role + affiliation, shown under your name on the home page. */
  position: "PhD Candidate",
  affiliation: {
    lab: "Music & Neuroscience Lab",
    department: "Department of Brain & Cognitive Sciences",
    university: "Example University",
  },

  /** Short bio paragraph(s) on the home page. Each array item is a <p>. */
  bio: [
    "I study how the brain represents and generates music. My work combines EEG/MEG decoding, brain–computer interfaces (BCI), and computational models of music imagery and production.",
    "Before this, I trained in [field] at [place]. I care about open, reproducible neuroscience and tools that let people make music with their minds.",
  ],

  /** The "I'm interested in..." one-liner. */
  interests:
    "Music Neuroscience · EEG/MEG decoding · Brain–Computer Interfaces · Music Imagery & Production",

  /** Profile photo: drop a file in /public/images/ and point here (relative to /public). */
  photo: "images/profile.svg",

  /** Path to your CV PDF (relative to /public). Replace public/cv.pdf with the real file. */
  cvPdf: "cv.pdf",

  links: {
    email: "your@email.com",
    github: "https://github.com/USERNAME",
    scholar: "https://scholar.google.com/citations?user=XXXX",
    orcid: "https://orcid.org/0000-0000-0000-0000",
    twitter: "", // leave "" to hide
  } as SocialLinks,

  /** Contact page details. */
  contact: {
    office: "Room 000, Building Name",
    address: "Example University, City, Country",
    message:
      "I'm always happy to talk about music, brains, and BCIs. Feel free to reach out if you'd like to collaborate, are visiting a conference I'm at, or just want to chat.",
  },
} as const;

export type Site = typeof site;
