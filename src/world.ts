export class World {
  readonly width: number;
  readonly height: number;
  readonly ctx: CanvasRenderingContext2D;
  constructor() {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    let oldWidth = canvas.width;
    let oldHeight = canvas.height;
    let scaleRatio = window.devicePixelRatio;

    canvas.width = Math.round(oldWidth * scaleRatio);
    canvas.height = Math.round(oldHeight * scaleRatio);
    canvas.style.width = oldWidth + 'px';
    canvas.style.height = oldHeight + 'px';

    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    this.ctx.scale(scaleRatio, scaleRatio);
    this.ctx.translate(-0.5, -0.5);
  }
  clean() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
}
