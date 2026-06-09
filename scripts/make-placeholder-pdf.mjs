// Generates a minimal, valid one-page PDF at public/cv.pdf as a placeholder.
// Run with: npm run make:pdf   (then replace public/cv.pdf with your real CV)
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const outPath = join(here, "..", "public", "cv.pdf");

const content =
  "BT /F1 24 Tf 60 730 Td (CV placeholder) Tj ET\n" +
  "BT /F1 13 Tf 60 700 Td (Replace public/cv.pdf with your real CV PDF.) Tj ET";

const objects = [];
objects[1] = "<< /Type /Catalog /Pages 2 0 R >>";
objects[2] = "<< /Type /Pages /Kids [3 0 R] /Count 1 >>";
objects[3] =
  "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] " +
  "/Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>";
objects[4] = `<< /Length ${content.length} >>\nstream\n${content}\nendstream`;
objects[5] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>";

let pdf = "%PDF-1.4\n";
const offsets = [];
for (let i = 1; i < objects.length; i++) {
  offsets[i] = Buffer.byteLength(pdf, "latin1");
  pdf += `${i} 0 obj\n${objects[i]}\nendobj\n`;
}

const xrefPos = Buffer.byteLength(pdf, "latin1");
const count = objects.length; // 0..5 → 6
pdf += `xref\n0 ${count}\n`;
pdf += "0000000000 65535 f \n";
for (let i = 1; i < objects.length; i++) {
  pdf += String(offsets[i]).padStart(10, "0") + " 00000 n \n";
}
pdf += `trailer\n<< /Size ${count} /Root 1 0 R >>\nstartxref\n${xrefPos}\n%%EOF`;

writeFileSync(outPath, Buffer.from(pdf, "latin1"));
console.log("Wrote", outPath, `(${Buffer.byteLength(pdf, "latin1")} bytes)`);
