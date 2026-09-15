/** Motion character: slow, weighted, crystalline. No bounce, no overshoot. */
export const EASE_GLASS = [0.62, 0.05, 0.18, 1] as const;
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
export const DUR = { fast: 0.22, base: 0.52, slow: 1.1, assemble: 1.5 };

/** Deterministic pseudo-random in [0, 1) so server and client agree. */
export function hash(i: number, j = 0, k = 0) {
  let h = (i * 374761393 + j * 668265263 + k * 2147483647) >>> 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177) >>> 0;
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}
export const spread = (r: number, min: number, max: number) => min + r * (max - min);
export const sign = (r: number) => (r < 0.5 ? -1 : 1);
