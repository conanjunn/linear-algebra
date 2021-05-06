import { Axis } from './axis';
import { World } from './world';
import { dot, norm } from 'loshu';

const world = new World();
const axis = new Axis(world, {
  x: [-5, 6],
  y: [-5, 6],
});

const v1 = [2, 1];
const v2 = [0, 4];

axis.render();
axis.renderV(v1);
axis.renderV(v2, 'blue');

// 点乘后除以模的积就是两个向量夹角的cos值
// 再利用反三角函数可以计算出角度值
console.log(dot(v1, v2) / (norm(v1) * norm(v2)));
