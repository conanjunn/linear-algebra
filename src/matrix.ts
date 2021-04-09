import { mul } from 'loshu';

export type V = number[];
export type M = number[][];

export class Matrix {
  private m: M;
  constructor(m: M) {
    this.m = m;
  }
  dotV(v: V): V {
    return mul(this.m, v);
  }
  dotM(m: M): M {
    return mul(this.m, m);
  }
  valueOf() {
    return this.m;
  }
}
