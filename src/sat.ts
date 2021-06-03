import { Axis } from './axis';
import { World } from './world';
import { mul, dot, sub, normal, unit } from './matrix';
import { Draw } from './draw';
import { V } from './matrix';

const world = new World();
const axis = new Axis(world, {
  x: [-5, 6],
  y: [-5, 6],
});
axis.render();

const vertexArr: V[] = [
  [-1, 1],
  [1, 1.8],
  [2.3, 2],
  [2, 0.8],
];
const vertexArr2: V[] = [
  [1.5, 1.5],
  [2, 3],
  [3, 3],
  [3, 2],
];

Draw.rect.apply(Draw, [
  vertexArr[0],
  vertexArr[1],
  vertexArr[2],
  vertexArr[3],
  'red',
]);

Draw.rect.apply(Draw, [
  vertexArr2[0],
  vertexArr2[1],
  vertexArr2[2],
  vertexArr2[3],
  'red',
]);

const proAxis: V[] = getAxis(vertexArr).concat(getAxis(vertexArr2));

let penetrationLen = 10000;
let penetrationV: V = []; // 分离向量 穿透矢量
for (let index = 0; index < proAxis.length; index++) {
  const axis = proAxis[index];
  const line1 = getProductLine(axis, vertexArr);
  const line2 = getProductLine(axis, vertexArr2);

  // Draw.renderLine(mul(axis, line1[0]), mul(axis, line1[1]), 'green');
  // Draw.renderLine(mul(axis, line2[0]), mul(axis, line2[1]), 'yellow');

  if (!isOverlap(line1, line2)) {
    console.log(line1, line2, '没有碰撞');
    alert('没有碰撞');
    break;
  }

  const tmp = overlapLen(line1, line2);
  if (tmp < penetrationLen) {
    penetrationLen = tmp;
    penetrationV = axis;
  }
}
Draw.renderV(mul(penetrationV, penetrationLen), 'blue');
console.log(penetrationLen, '---');

function getAxis(vertexes: V[]) {
  const arr = [];
  for (let index = 0; index < vertexes.length; index++) {
    const nextElement = vertexes[(index + 1) % vertexes.length];
    const element = vertexes[index];
    const edgeV = sub(nextElement, element);
    const normalV = normal(edgeV);
    const unitNormalV = unit(normalV);
    arr.push(unitNormalV);
  }
  return arr;
}

function getProductLine(axis: V, vertexes: V[]) {
  const unitNormalV = axis;
  const products = [];
  for (let j = 0; j < vertexes.length; j++) {
    const vertex = vertexes[j];
    const product = dot(vertex, unitNormalV);

    products.push(product);
  }
  const max = Math.max.apply(Math, products);
  const min = Math.min.apply(Math, products);

  return [min, max];
}

function isOverlap(line1: V, line2: V) {
  if (line1[1] > line2[0] && line1[0] < line2[1]) {
    return true;
  }
  return false;
}

function overlapLen(line1: V, line2: V) {
  let min1 = line1[0];
  let max1 = line1[1];
  let min2 = line2[0];
  let max2 = line2[1];
  let len1 = max1 - min1;
  let len2 = max2 - min2;

  let min = min1;
  let max = min1 + len1;

  if (min1 > min2) min = min2;

  if (min1 + len1 < min2 + len2) max = min2 + len2;

  return Math.abs(max - min - len1 - len2);
}
