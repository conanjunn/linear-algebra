import { Axis } from './axis';
import { World } from './world';
import { cross, dot, normal } from './matrix';

const world = new World();
const axis = new Axis(world, {
  x: [-5, 6],
  y: [-5, 6],
});
axis.render();

// 问题：判断v1和v2分别在target的上还是下
const target = [4, 4];
const v1 = [1, 2];
const v2 = [2, 1];

axis.renderV(target);
axis.renderV(v1, 'yellow');
axis.renderV(v2, 'blue');

// 解法1：
const a = cross(target, v1);
const b = cross(target, v2);

console.log(a, b, 'cross');
// a>0 在target的左边（上）， b<0在target的右边（下）

// 解法2： 用点积算叉积
const n = normal(target);

// const d = dot(target, n);

// sin x = cos(x - 90)
// sin x = cos(x + 90) * -1
const v1d = dot(v1, n) * -1;
const v2d = dot(v2, n) * -1;

// v1d0 在target的左边（上）， v2d<0在target的右边（下）

console.log(v1d, v2d, 'dot');
