/**
 * Tiny, dependency-free BibTeX parser — good enough for a personal publication
 * list. Source of truth: src/data/publications.bib
 *
 * Supported standard fields: title, author, journal, booktitle, year, volume,
 *   number, pages, publisher, doi, url, note.
 * Supported custom fields (non-standard, just for this site):
 *   pdf          = {https://...}          → [PDF] button (falls back to url/doi)
 *   code         = {https://...}          → [Code] button
 *   selected     = {true}                 → shows in the "Selected" view
 *   equalcontrib = {Lastname, Coauthor}   → marks † equal contribution authors
 */

export interface Author {
  first: string;
  last: string;
  display: string; // "F. Lastname"
  equal: boolean;
  self: boolean;
}

export interface Pub {
  key: string;
  type: string;
  title: string;
  authors: Author[];
  venue: string;
  year: number | null;
  volume?: string;
  number?: string;
  pages?: string;
  publisher?: string;
  note?: string;
  url?: string;
  pdf?: string;
  code?: string;
  doi?: string;
  selected: boolean;
  hasEqual: boolean;
  raw: string; // original entry text, for the "copy BibTeX" button
}

/** Read a `{...}` value with balanced braces; returns [value, nextIndex]. */
function readBraced(s: string, i: number): [string, number] {
  let depth = 0;
  let out = "";
  for (; i < s.length; i++) {
    const c = s[i];
    if (c === "{") {
      depth++;
      if (depth === 1) continue; // drop outer brace
    } else if (c === "}") {
      depth--;
      if (depth === 0) {
        i++;
        break;
      }
    }
    out += c;
  }
  return [out, i];
}

/** Normalize a raw field value: strip braces, collapse whitespace. */
function clean(v: string): string {
  return v
    .replace(/[{}]/g, "")
    .replace(/\\&/g, "&")
    .replace(/~/g, " ")
    .replace(/---/g, "—")
    .replace(/--/g, "–")
    .replace(/\s+/g, " ")
    .trim();
}

interface RawEntry {
  type: string;
  key: string;
  fields: Record<string, string>;
  raw: string;
}

function parseEntries(input: string): RawEntry[] {
  const entries: RawEntry[] = [];
  const s = input;
  let i = 0;
  while (i < s.length) {
    if (s[i] !== "@") {
      i++;
      continue;
    }
    const start = i;
    i++; // past @
    let type = "";
    while (i < s.length && /[a-zA-Z]/.test(s[i])) type += s[i++];
    while (i < s.length && /\s/.test(s[i])) i++;
    // skip @comment / @preamble / @string blocks gracefully
    if (s[i] !== "{") continue;
    i++; // past {
    let key = "";
    while (i < s.length && s[i] !== "," && s[i] !== "}") key += s[i++];
    key = key.trim();

    const fields: Record<string, string> = {};
    while (i < s.length && s[i] !== "}") {
      if (s[i] === "," || /\s/.test(s[i])) {
        i++;
        continue;
      }
      let name = "";
      while (i < s.length && /[a-zA-Z0-9_:.\-]/.test(s[i])) name += s[i++];
      while (i < s.length && /\s/.test(s[i])) i++;
      if (s[i] !== "=") {
        // malformed — skip to next comma/brace to stay safe
        while (i < s.length && s[i] !== "," && s[i] !== "}") i++;
        continue;
      }
      i++; // past =
      while (i < s.length && /\s/.test(s[i])) i++;
      let value = "";
      if (s[i] === "{") {
        [value, i] = readBraced(s, i);
      } else if (s[i] === '"') {
        i++;
        while (i < s.length && s[i] !== '"') value += s[i++];
        i++; // past closing quote
      } else {
        while (i < s.length && s[i] !== "," && s[i] !== "}") value += s[i++];
      }
      if (name) fields[name.toLowerCase()] = value.trim();
    }
    if (s[i] === "}") i++;
    entries.push({
      type: type.toLowerCase(),
      key,
      fields,
      raw: s.slice(start, i).trim(),
    });
  }
  return entries;
}

function parseAuthors(
  raw: string,
  selfSurnames: string[],
  equalSurnames: string[],
): Author[] {
  if (!raw) return [];
  const selves = selfSurnames.map((x) => x.toLowerCase());
  const equals = equalSurnames.map((x) => x.toLowerCase());
  return raw
    .split(/\s+and\s+/i)
    .map((name) => clean(name))
    .filter(Boolean)
    .map((name) => {
      let first = "";
      let last = "";
      if (name.includes(",")) {
        const [l, f] = name.split(",");
        last = l.trim();
        first = (f || "").trim();
      } else {
        const parts = name.split(/\s+/);
        last = parts.pop() || "";
        first = parts.join(" ");
      }
      const lastKey = last.toLowerCase();
      const display = [first, last].filter(Boolean).join(" ");
      return {
        first,
        last,
        display,
        self: selves.includes(lastKey),
        equal: equals.includes(lastKey),
      };
    });
}

export function parseBibtex(
  input: string,
  opts: { selfSurnames: string[] },
): Pub[] {
  const entries = parseEntries(input);
  const pubs: Pub[] = entries
    .filter((e) => !["comment", "preamble", "string"].includes(e.type))
    .map((e) => {
      const f = e.fields;
      const equalSurnames = (f.equalcontrib || "")
        .split(",")
        .map((x) => clean(x).split(/\s+/).pop() || "")
        .filter(Boolean);
      const authors = parseAuthors(
        f.author || "",
        opts.selfSurnames,
        equalSurnames,
      );
      const yearNum = f.year ? parseInt(clean(f.year), 10) : NaN;
      const doi = f.doi ? clean(f.doi) : undefined;
      return {
        key: e.key,
        type: e.type,
        title: clean(f.title || "Untitled"),
        authors,
        venue: clean(f.journal || f.booktitle || f.publisher || ""),
        year: Number.isNaN(yearNum) ? null : yearNum,
        volume: f.volume ? clean(f.volume) : undefined,
        number: f.number ? clean(f.number) : undefined,
        pages: f.pages ? clean(f.pages) : undefined,
        publisher: f.publisher ? clean(f.publisher) : undefined,
        note: f.note ? clean(f.note) : undefined,
        url: f.url
          ? clean(f.url)
          : doi
            ? `https://doi.org/${doi}`
            : undefined,
        pdf: f.pdf ? clean(f.pdf) : undefined,
        code: f.code ? clean(f.code) : undefined,
        doi,
        selected: /^(true|yes|1)$/i.test(clean(f.selected || "")),
        hasEqual: authors.some((a) => a.equal),
        raw: e.raw,
      };
    });

  // newest first; undated entries (e.g. "In preparation") float to the top
  pubs.sort((a, b) => (b.year ?? 9999) - (a.year ?? 9999));
  return pubs;
}

/** Group publications by year (descending), nulls under "In preparation". */
export function groupByYear(pubs: Pub[]): { year: string; items: Pub[] }[] {
  const groups = new Map<string, Pub[]>();
  for (const p of pubs) {
    const k = p.year ? String(p.year) : "In preparation";
    if (!groups.has(k)) groups.set(k, []);
    groups.get(k)!.push(p);
  }
  return [...groups.entries()]
    .sort((a, b) => {
      if (a[0] === "In preparation") return -1;
      if (b[0] === "In preparation") return 1;
      return Number(b[0]) - Number(a[0]);
    })
    .map(([year, items]) => ({ year, items }));
}
