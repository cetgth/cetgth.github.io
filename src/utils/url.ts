/**
 * Base-aware URL helper so the site works at "/" (user site) AND "/repo/"
 * (project site) without changing any links. Always link via url("research").
 */
const BASE = import.meta.env.BASE_URL; // e.g. "/" or "/website/"

export function url(path = ""): string {
  const clean = String(path).replace(/^\/+/, "");
  return (BASE + clean).replace(/\/{2,}/g, "/");
}

/** Is `path` the current page? (for nav highlighting) */
export function isActive(currentPathname: string, path: string): boolean {
  const target = url(path).replace(/\/$/, "");
  const here = currentPathname.replace(/\/$/, "");
  if (target === url("").replace(/\/$/, "")) {
    return here === target; // home: exact match only
  }
  return here === target || here.startsWith(target + "/");
}
