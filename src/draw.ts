import { M, V } from './matrix';
import { transform, add } from 'loshu';

export class Draw {
  static ctx: CanvasRenderingContext2D;
  static itemWidth: V;
  static m: M = [
    [1, 0, 250],
    [0, 1, 250],
    [0, 0, 1],
  ];
  private static zero: V = [250, 250];
  private static dot(v: V) {
    const ret = transform(
      add(Draw.m, [
        [0, 0, Draw.itemWidth[0] * v[0]],
        [0, 0, Draw.itemWidth[1] * v[1] * -1],
        [0, 0, 0],
      ]),
      v
    );
    return ret;
  }
  static renderV(v: V, color: string = 'red') {
    const vv = Draw.dot(v);

    const ctx = Draw.ctx;
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(Draw.zero[0], Draw.zero[1]);
    ctx.lineTo(vv[0], vv[1]);

    ctx.stroke();
    ctx.restore();
  }
  static renderLine(v1: V, v2: V, color: string = '#D1D1D1') {
    const vv1 = Draw.dot(v1);
    const vv2 = Draw.dot(v2);
    const ctx = Draw.ctx;
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(vv1[0], vv1[1]);
    ctx.lineTo(vv2[0], vv2[1]);
    ctx.stroke();
    ctx.restore();
  }
  static rect(v1: V, v2: V, v3: V, v4: V, color: string = '#D1D1D1') {
    const vv1 = Draw.dot(v1);
    const vv2 = Draw.dot(v2);
    const vv3 = Draw.dot(v3);
    const vv4 = Draw.dot(v4);
    const ctx = Draw.ctx;
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(vv1[0], vv1[1]);
    ctx.lineTo(vv2[0], vv2[1]);
    ctx.lineTo(vv3[0], vv3[1]);
    ctx.lineTo(vv4[0], vv4[1]);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }
}
