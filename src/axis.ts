import nj from 'numjs';
import { Matrix } from './matrix';
import { Vector } from './vector';
import { World } from './world';

export interface Ticks {
  x: number[];
  y: number[];
}

export class Axis {
  private world: World;
  private ticks: Ticks;
  readonly m: Matrix;
  private xItemWidth: number = 0;
  private yItemWidth: number = 0;
  private basisX: Vector;
  private basisY: Vector;

  constructor(world: World, ticks: Ticks) {
    this.world = world;
    this.ticks = ticks;
    this.basisX = new Vector([1, 0]);
    this.basisY = new Vector([0, 1]);
    this.m = new Matrix([
      [1, 0, 250],
      [0, 1, 250],
      [0, 0, 1],
    ]);
    this.setTicks();
  }
  setTicks() {
    this.xItemWidth = this.world.width / (this.ticks.x[1] - this.ticks.x[0]);
    this.yItemWidth = this.world.height / (this.ticks.y[1] - this.ticks.y[0]);
  }

  render() {
    for (let index = this.ticks.x[0]; index < this.ticks.x[1]; index++) {}
  }

  render1() {
    const ticks = this.ticks;
    const xTicks = nj.arange(ticks.x[0], ticks.x[1]);
    const yTicksReverse = nj.arange(ticks.y[0], ticks.y[1]);
    const yTicks = yTicksReverse.slice([0, yTicksReverse.shape[0], -1]);

    const xItemWidth = this.world.width / xTicks.shape[0];
    const yItemWidth = this.world.height / yTicks.shape[0];
    this.xItemWidth = xItemWidth;
    this.yItemWidth = yItemWidth;
    const ctx = this.world.ctx;

    ctx.strokeStyle = '#D1D1D1';
    ctx.lineWidth = 1;
    ctx.font = '12px serif';
    ctx.fillStyle = '#767676';

    for (let index = 0; index < xTicks.shape[0]; index++) {
      const x = nj.array([0, index]).multiply(xItemWidth);
      ctx.beginPath();
      ctx.moveTo(x.get(0), x.get(1));
      ctx.lineTo(this.world.width, x.get(1));
      ctx.stroke();

      ctx.fillText(String(yTicks.get(index)), this.world.width / 2, x.get(1));
    }

    for (let index = 1; index <= yTicks.shape[0]; index++) {
      const y = nj.array([index, 0]).multiply(yItemWidth);
      ctx.beginPath();
      ctx.moveTo(y.get(0), y.get(1));
      ctx.lineTo(y.get(0), this.world.height);
      ctx.stroke();

      ctx.fillText(
        String(xTicks.get(index - 1)),
        y.get(0),
        this.world.height / 2
      );
    }
  }
  getItemWidth(): number[] {
    return [this.xItemWidth, this.yItemWidth];
  }
}
