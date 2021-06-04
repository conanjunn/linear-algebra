import { Axis } from './axis';
import { World } from './world';
import { cross, dot, unit } from './matrix';

const world = new World();
const axis = new Axis(world, {
  x: [-5, 6],
  y: [-5, 6],
});
axis.render();

// 问题：判断v1和v2分别在target的上还是下
const target = [4, 4];
const v1 = [2, 4];
const v2 = [2, 1];

const targetUnit = unit(target);
const v1Unit = unit(v1);
const v2Unit = unit(v2);

axis.renderV(target);
axis.renderV(v1, 'yellow');
axis.renderV(v2, 'blue');

// 解法1：
const a = cross(target, v1);
const b = cross(target, v2);

console.log(a, b);
// a>0 在target的左边（上）， b<0在target的右边（下）

// 解法2：
const n = [0, 1];
const d = dot(targetUnit, n);

// cos函数是交越大值约小，所以v1d如果是正数说明它的角比target的角小，它就在target的上边
// 反之在下边

const v1d = dot(v1Unit, n) - d;
const v2d = dot(v2Unit, n) - d;

console.log(v1d, 'v1');
console.log(v2d, 'v2');
