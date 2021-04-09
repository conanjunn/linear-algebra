import { Axis } from './axis';
import { Matrix } from './matrix';
import { Vector } from './vector';
import { World } from './world';

const world = new World();
const axis = new Axis(world, {
  x: [-5, 7],
  y: [-5, 7],
});
Vector.axis = axis;
Vector.ctx = world.ctx;

const v = new Vector([1, 2]);
v.render();
const tmp = new Matrix([
  [Math.cos((Math.PI / 180) * 30), Math.sin((Math.PI / 180) * 30) * -1],
  [Math.sin((Math.PI / 180) * 30), Math.cos((Math.PI / 180) * 30)],
]);

const a = tmp.dotV(v.valueOf());

const vv = new Vector(a);
vv.render('blue');
