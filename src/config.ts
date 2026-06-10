/**
 * ────────────────────────────────────────────────────────────────────────────
 *  SITE CONFIG — single source of truth.
 *  Edit THIS file to update your name, links, and identity across the whole site.
 *  (See CONTENT_GUIDE.md for what to edit where.)
 * ────────────────────────────────────────────────────────────────────────────
 */

export interface SocialLinks {
  email?: string; // plain address; it is auto-obfuscated before rendering
  github?: string; // full URL
  scholar?: string; // full URL ("" = hide icon)
  orcid?: string; // full URL ("" = hide icon)
  twitter?: string; // full URL ("" = hide icon)
}

export const site = {
  /** Used for <title>, meta tags, and the deployed canonical URL. */
  url: "https://cetgth.github.io", // user site (repo: cetgth.github.io)

  /** Your name. */
  name: {
    en: "Chae-Eun Yoon",
  },

  /** Surnames that should be rendered in bold in the author lists (you + aliases). */
  selfSurnames: ["Yoon"],

  /** One-line role + affiliation, shown under your name on the home page. */
  position: "PhD Student",
  affiliation: {
    lab: "BCI Lab",
    labUrl: "https://www.unist-bci.com/",
    department: "Department of Biomedical Engineering",
    university: "UNIST",
    country: "South Korea",
  },

  /** Short bio paragraph(s) on the home page. Each array item is a <p>. */
  bio: [
    "I am a PhD candidate in the BCI Lab at UNIST, studying how the brain represents and generates music. My research combines EEG decoding, brain–computer interfaces (BCI), and computational models of music imagery and production.",
    "I'm interested in building BCIs that let people make and imagine music, and in open, reproducible neuroscience. (Replace this paragraph with your own bio.)",
  ],

  /** The "I'm interested in..." one-liner. */
  interests:
    "Music Neuroscience · EEG decoding · Brain–Computer Interfaces · Music Imagery & Production",

  /** Profile photo: drop a file in /public/images/ and point here (relative to /public). */
  photo: "images/profile.svg",

  /** Path to your CV PDF (relative to /public). Replace public/cv.pdf with the real file. */
  cvPdf: "cv.pdf",

  links: {
    email: "cetgth@unist.ac.kr",
    github: "https://github.com/cetgth",
    scholar: "https://scholar.google.com/citations?user=zbd7DXoAAAAJ&hl=en",
    orcid: "https://orcid.org/0009-0001-5111-9197",
    twitter: "", // leave "" to hide
  } as SocialLinks,

  /** Contact page details. */
  contact: {
    office: "BCI Lab, UNIST",
    address: "UNIST, 50 UNIST-gil, Ulju-gun, Ulsan 44919, Republic of Korea",
    message:
      "I'm always happy to talk about music, brains, and BCIs. Feel free to reach out if you'd like to collaborate, are visiting a conference I'm at, or just want to chat.",
  },
} as const;

export type Site = typeof site;
