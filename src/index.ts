import { Axis } from './axis';
import { World } from './world';
import { Draw } from './draw';
import { transform, inv } from 'loshu';

const world = new World();
const axis = new Axis(world, {
  x: [-5, 6],
  y: [-5, 6],
});
Draw.itemWidth = axis.getItemWidth();
Draw.ctx = world.ctx;

axis.setBasis([
  [Math.cos((Math.PI / 180) * 30), Math.sin((Math.PI / 180) * 30) * -1, 0],
  [Math.sin((Math.PI / 180) * 30), Math.cos((Math.PI / 180) * 30), 0],
  [0, 0, 1],
]);
axis.render();

var a = transform(
  [
    [Math.cos((Math.PI / 180) * 30), Math.sin((Math.PI / 180) * 30) * -1, 0],
    [Math.sin((Math.PI / 180) * 30), Math.cos((Math.PI / 180) * 30), 0],
    [0, 0, 1],
  ],
  [1, 1]
);
var b = transform(
  inv([
    [Math.cos((Math.PI / 180) * 30), Math.sin((Math.PI / 180) * 30) * -1, 0],
    [Math.sin((Math.PI / 180) * 30), Math.cos((Math.PI / 180) * 30), 0],
    [0, 0, 1],
  ]),
  a
);
Draw.renderV(b);
console.log(a, b);

Draw.renderV([1, 1], 'blue');

// const v = new Vector([1, 2]);
// v.render();
// const tmp = new Matrix([
//   [Math.cos((Math.PI / 180) * 30), Math.sin((Math.PI / 180) * 30) * -1],
//   [Math.sin((Math.PI / 180) * 30), Math.cos((Math.PI / 180) * 30)],
// ]);

// // const a = tmp.dotV(v.valueOf());

// const vv = new Vector(a);
// vv.render('blue');
