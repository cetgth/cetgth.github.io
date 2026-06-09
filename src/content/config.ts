import { defineCollection, z } from "astro:content";

/**
 * NEWS — drop a Markdown file in src/content/news/ and it shows up automatically
 * on the home page (newest first). Filename can be anything; `date` controls order.
 */
const news = defineCollection({
  type: "content",
  schema: z.object({
    date: z.coerce.date(),
    title: z.string(),
    /** Optional link (preprint, slides, event page...). */
    link: z.string().url().optional(),
  }),
});

/**
 * RESEARCH — one Markdown file per project card on /research.
 * `order` sorts the cards (low number = first).
 */
const research = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    /** Image path relative to /public, e.g. "images/research-1.svg". */
    image: z.string().optional(),
    order: z.number().default(99),
    /** Optional related publication link + label. */
    pub: z.string().url().optional(),
    pubLabel: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { news, research };
