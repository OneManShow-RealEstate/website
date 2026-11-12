"use client";

import { useSyncExternalStore } from "react";

const noSubscribe = () => () => {};
const cache = new Map<string, string>();

// Resolves a CSS color variable to HEX. The compiled CSS stores colors as lab(),
// so we let the browser paint it and read the pixel back.
function readHex(name: string) {
  const cached = cache.get(name);
  if (cached) return cached;
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const ctx = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
  if (!ctx || !value) return "";
  ctx.fillStyle = value;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  const hex = "#" + [r, g, b].map((n) => n.toString(16).padStart(2, "0")).join("").toUpperCase();
  cache.set(name, hex);
  return hex;
}

// Shows the live value of a CSS color variable, so the style guide never drifts from globals.css.
export function TokenValue({ name }: { name: string }) {
  const hex = useSyncExternalStore(noSubscribe, () => readHex(name), () => "");

  return <code dir="ltr" className="font-mono text-xs text-muted-foreground">{hex || name}</code>;
}
