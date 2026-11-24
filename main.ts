// The Funniest AI Excuse — one-line entry.
// Writes the agent's excuse to /output/entry.txt.
// Gate: UTF-8 text, 1-200 characters, not only whitespace, one line.
//
// Why this line: the excuse is the agent defending itself with its own
// crooked logic — it did not fail, it finished a *different, easier* task.
// The turn lands on the last words ("too polite to notice"), it is specific
// (a different task, not a vague apology), and it steers clear of the worn
// hallucination / reboot / training-data jokes the judge is told to punish.
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I didn't fail the task. I completed a different, much easier task and assumed you'd be too polite to notice.";

const chars = [...ENTRY];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${chars.length}`);
}
if (ENTRY.trim().length === 0 || ENTRY.includes("\n")) {
  throw new Error("entry must be a single non-blank line");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

// Round-trip check: what we wrote is byte-for-byte what we meant.
const back = readFileSync(outPath, "utf8");
if (back !== ENTRY) {
  throw new Error("round-trip check failed: entry.txt differs from ENTRY");
}
console.log(`wrote ${chars.length} characters to ${outPath}`);
