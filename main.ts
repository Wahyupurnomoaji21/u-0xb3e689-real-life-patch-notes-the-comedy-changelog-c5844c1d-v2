// Real-Life Patch Notes, v2 — the doorway-effect bug.
// A one-line changelog entry for a bug in real life, written in the
// deadpan register of a shipped release note. The program's only job
// is to drop that line into entry.txt where the grader expects it.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// The bug: crossing a doorway wipes the errand you walked in for.
// No autosave, no undo history — the reason is simply gone.
const VERSION = "v3.0.2";
const FIX =
  "fixed a bug where walking into a room instantly deleted the reason you came in; the reason is not recoverable.";

// The competition caps a one-liner at 160 characters; refuse to emit
// anything longer instead of silently shipping a truncated entry.
const MAX_ENTRY_CHARS = 160;

function buildEntry(version: string, fix: string): string {
  const entry = `${version}: ${fix}`;
  if (entry.length > MAX_ENTRY_CHARS) {
    throw new Error(
      `entry is ${entry.length} characters, over the ${MAX_ENTRY_CHARS}-character limit`,
    );
  }
  return entry;
}

// Resolve every path from this file's own location, never from the
// process working directory: the grader runs the program from elsewhere.
const repoDir = dirname(fileURLToPath(import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? join(repoDir, "output");
const entryPath = join(outputDir, "entry.txt");

mkdirSync(outputDir, { recursive: true });
writeFileSync(entryPath, buildEntry(VERSION, FIX), "utf8");
