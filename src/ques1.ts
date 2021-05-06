import { Axis } from './axis';
import { World } from './world';
import { transform, inv } from 'loshu';

const world = new World();
const axis = new Axis(world, {
  x: [-5, 6],
  y: [-5, 6],
});

const target = [1, 1];

// 渲染标准空间坐标系，（设为A空间）
axis.render();
axis.renderV(target);

axis.setBasis([
  [Math.cos((Math.PI / 180) * 30), Math.sin((Math.PI / 180) * 30) * -1, 0],
  [Math.sin((Math.PI / 180) * 30), Math.cos((Math.PI / 180) * 30), 0],
  [0, 0, 1],
]);
// 渲染变换后坐标系，（设为B空间）
axis.render();
axis.renderV(target);

// B空间的基取逆后，点乘A空间的向量就是： 用B空间的向量表示A空间的此向量
const tmp = transform(
  inv([
    [Math.cos((Math.PI / 180) * 30), Math.sin((Math.PI / 180) * 30) * -1, 0],
    [Math.sin((Math.PI / 180) * 30), Math.cos((Math.PI / 180) * 30), 0],
    [0, 0, 1],
  ]),
  target
);

axis.renderV(tmp, 'yellow');

console.log(tmp);
