import { defineConfig } from "tsup";

export default defineConfig([
  // Core — pure logic, no React
  {
    entry: { "core/index": "src/core/index.ts" },
    format: ["esm", "cjs"],
    dts: true,
    sourcemap: true,
    clean: true,
    outDir: "dist",
    splitting: false,
  },
  // Theme — pure logic, no React
  {
    entry: { "theme/index": "src/theme/index.ts" },
    format: ["esm", "cjs"],
    dts: true,
    sourcemap: true,
    outDir: "dist",
    splitting: false,
  },
  // Hooks — React required
  {
    entry: { "hooks/index": "src/hooks/index.ts" },
    format: ["esm", "cjs"],
    dts: true,
    sourcemap: true,
    outDir: "dist",
    splitting: false,
    external: ["react", "react-dom"],
    banner: { js: '"use client";' },
  },
  // UI — React + Tailwind
  {
    entry: { "ui/index": "src/ui/index.ts" },
    format: ["esm", "cjs"],
    dts: true,
    sourcemap: true,
    outDir: "dist",
    splitting: false,
    external: ["react", "react-dom"],
    banner: { js: '"use client";' },
  },
]);
