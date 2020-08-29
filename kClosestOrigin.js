/**
 * 973. K Closest points to Origin
 * Difficulty: Medium
 *
 * We have a list of points on the plane. Find the k closest points to the origin (0, 0).
 * (Here, the distance between two points on a plane is the Euclidean distance.)
 * You may return the answer in any order. The answer is guaranteed to be unique (except for the order that it is in.)
 *
 * Example 1:
 *  Input: points = [[1,3],[-2,2]], K = 1
 *  Output: [[-2,2]]
 *  Explanation:
 *    The distance between (1, 3) and the origin is sqrt(10).
 *    The distance between (-2, 2) and the origin is sqrt(8).
 *    Since sqrt(8) < sqrt(10), (-2, 2) is closer to the origin.
 *    We only want the closest K = 1 points from the origin, so the answer is just [[-2,2]].
 *
 * Example 2:
 *  Input: points = [[3,3],[5,-1],[-2,4]], K = 2
 *  Output: [[3,3],[-2,4]]
 *  (The answer [[-2,4],[3,3]] would also be accepted.)
 */

// O(N log N)
const kClosest = (points, K) => {
  return points.sort((a, b) => getLength(a) - getLength(b)).slice(0, K);
};

const getLength = ([a, b]) => {
  return a * a + b * b;
};

const generateCoords = () => {
  let array = [];
  const generateNum = () => {
    let num = Math.round(Math.random() * 10);
    num *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
    return num;
  };
  for (let i = 0; i < 10; i++) {
    array.push([generateNum(), generateNum()]);
  }
  return array;
};

const coords1 = generateCoords();
const coords2 = generateCoords();

console.log(coords1, kClosest(coords1, 3));
console.log(coords2, kClosest(coords2, 3));
