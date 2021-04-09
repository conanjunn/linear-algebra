import { Axis } from './axis';
import { V } from './matrix';

export class Vector {
  static axis: Axis;
  static ctx: CanvasRenderingContext2D;
  private v: V = [];
  private zero: V;
  private itemWidth: V;
  private originData: V;
  constructor(v: V) {
    this.originData = v;
    this.itemWidth = Vector.axis.getItemWidth();
    this.zero = this.create([0, 0]);
    this.create(v);
  }
  private create(v: V) {
    const vv = [...v];
    vv.push(1);
    vv[0] = vv[0] * this.itemWidth[0];
    vv[1] = vv[1] * this.itemWidth[1] * -1;
    const ret = Vector.axis.m.dotV(vv);
    this.v = ret.slice(0, ret.length - 1);
    return this.v;
  }
  render(color: string = 'red') {
    const ctx = Vector.ctx;
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(this.zero[0], this.zero[1]);
    ctx.lineTo(this.v[0], this.v[1]);
    ctx.stroke();
  }
  valueOf() {
    return this.originData;
  }
}
