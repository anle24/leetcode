/**
 * 57. Insert Interval
 * Difficulty: Hard
 *
 * Given a set of non-overlapping intervals, insert a new interval into the intervals (merge if necessary)
 * You may assume that the intervals were initially osrted according to their start time
 *
 * Example 1:
 *  Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
 *  Output: [[1,5],[6,9]]
 *
 * Example 2:
 *  Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
 *  Output: [[1,2],[3,10],[12,16]]
 *  Explanation: Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].
 */

const insert = (intervals, newInterval) => {
  if (newInterval.length === 0) {
    return intervals;
  }

  let i = 0;
  while (i < intervals.length && newInterval[0] > intervals[i][1]) {
    i++;
  }

  intervals.splice(i, 0, newInterval);

  const mergeTwo = (a, b) => {
    return [Math.min(a[0], b[0]), Math.max(a[1], b[1])];
  };

  const isOverlap = (a, b) => {
    return a[1] >= b[0];
  };

  i++;

  while (i < intervals.length) {
    if (isOverlap(intervals[i - 1], intervals[i])) {
      intervals.splice(i - 1, 2, mergeTwo(intervals[i - 1], intervals[i]));
    } else {
      i++;
    }
  }

  return intervals;
};
