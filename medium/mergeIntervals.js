/**
 * 56. Merge Intervals
 * Difficulty: Medium
 *
 * Given a collection of intervals, merge all overlapping intervals.
 *
 * Example 1:
 *  Input: [[1,3],[2,6],[8,10],[15,18]];
 *  Output: [[1,6],[8,10],[15,18]];
 *  Explanation: Since intervals [1,3] and [2,6] overlaps, merge them into [1,6].
 *
 * Example 2:
 *  Input: [[1,4],[4,5]]
 *  Output: [[1,5]]
 *  Explanation: Intervals [1,4] and [4,5] are considered overlapping.
 */

const merge = (intervals) => {
  if (intervals.length <= 1) return intervals;

  const mergeTwo = (a, b) => {
    return [Math.min(a[0], b[0]), Math.max(a[1], b[1])];
  };

  const isOverlap = (a, b) => {
    return a[1] >= b[0];
  };

  intervals.sort((a, b) => a[0] - b[0]);

  let i = 1;
  while (i < intervals.length) {
    if (isOverlap(intervals[i - 1], intervals[i])) {
      intervals.splice(i - 1, 2, mergeTwo(intervals[i - 1], intervals[i]));
    } else {
      i++;
    }
  }

  return intervals;
};

const intervals1 = [
  [1, 3],
  [2, 6],
  [8, 10],
  [15, 18],
];
const intervals2 = [
  [1, 4],
  [4, 5],
];

console.log(merge(intervals1));
console.log(merge(intervals2));
