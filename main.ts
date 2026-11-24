import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-line patch note for a bug in real life / human biology.
// Doorway amnesia: walking into a room wipes the reason you went in.
// New angle for v2 — v1's brain-replay-at-3-a.m. joke is shared by
// several entries on the R1 board, so this entry takes a different,
// equally universal bug: the reason is deleted and not recoverable.
// 118 characters, within the 160-character gate.
const ENTRY =
  "v3.0.2: fixed a bug where walking into a room instantly deleted the reason you came in; the reason is not recoverable.";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";

mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), ENTRY, "utf8");
