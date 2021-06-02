export type V = number[];
export type M = number[][];

export const norm = (v: V) => {
  return Math.hypot(v[0], v[1]);
};

export const mul = (v: V, n: number) => {
  return [v[0] * n, v[1] * n];
};

export const unit = (v: V) => {
  return mul(v, 1 / norm(v));
};

export const dot = (v1: V, v2: V) => {
  return v1[0] * v2[0] + v1[1] * v2[1];
};

export const normal = (v: V) => {
  const out = [];
  out[0] = v[1];
  out[1] = -v[0];
  return out;
};

export const sub = (v1: V, v2: V) => {
  return [v1[0] - v2[0], v1[1] - v2[1]];
};

export const add = (v1: V, v2: V) => {
  return [v1[0] + v2[0], v1[1] + v2[1]];
};
