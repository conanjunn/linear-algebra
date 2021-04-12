import { V, M } from './matrix';
import { World } from './world';
import { transform } from 'loshu';
import { Draw } from './draw';

export interface Ticks {
  x: number[];
  y: number[];
}

export class Axis {
  private xItemWidth: number = 0;
  private yItemWidth: number = 0;
  private half: V = [];
  private basis: M = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ];

  constructor(private world: World, private ticks: Ticks) {
    this.xItemWidth = this.world.width / (this.ticks.x[1] - this.ticks.x[0]);
    this.yItemWidth = this.world.height / (this.ticks.y[1] - this.ticks.y[0]);

    this.half = [
      Math.floor((this.ticks.x[1] - this.ticks.x[0]) / 2),
      Math.floor((this.ticks.y[1] - this.ticks.y[0]) / 2),
    ];

    Draw.itemWidth = [this.xItemWidth, this.yItemWidth];
    Draw.ctx = world.ctx;
  }

  render() {
    for (let index = this.ticks.x[0]; index < this.ticks.x[1]; index++) {
      Draw.renderLine(
        transform(this.basis, [index, this.half[0]]),
        transform(this.basis, [index, this.half[0] * -1]),
        index === 0 ? 'black' : undefined
      );
    }
    for (let index = this.ticks.y[0]; index < this.ticks.y[1]; index++) {
      Draw.renderLine(
        transform(this.basis, [this.half[1], index]),
        transform(this.basis, [-1 * this.half[1], index]),
        index === 0 ? 'black' : undefined
      );
    }
  }

  setBasis(b: M) {
    this.basis = b;
  }

  renderV(v: V, color?: string) {
    Draw.renderV(transform(this.basis, v), color);
  }
}
