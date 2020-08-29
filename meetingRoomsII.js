/**
 * 253. Meeting Rooms II
 * Difficulty: Medium
 *
 * Given an array of meeting time intervals consisting of start and end times
 * [[s1, e1], [s2, e2],...] (si < ei), find the minimum number of conference rooms required.
 *
 * Example 1:
 *  Input: [[0, 30], [5, 10], [15, 20]]
 *  Output: 2
 *
 * Example 2:
 *  Input: [[7, 10], [2, 4]]
 *  Output: 1
 */

/**
 * Sort by start times and also by end times. Start first meeting, room++.
 * Next meeting, check to see if it conflicts with earliest end time.
 * If it does conflict, it needs another room, room++
 * Otherwise, it can use the same room. Continue to iterate through the start times
 * and compare to end times.
 */
const minMeetingRooms = (intervals) => {
  const starts = intervals.concat().sort((a, b) => a[0] - b[0]);
  const ends = intervals.sort((a, b) => a[1] - b[1]);
  console.log(starts);
  console.log(ends);
  let rooms = 0;
  let end = 0;
  for (let i = 0; i < intervals.length; i++) {
    if (starts[i][0] < ends[end][1]) {
      console.log(
        `${starts[i][0]} of ${starts[i]} < ${ends[end][1]} of ${ends[end]}, so rooms++`
      );
      rooms++;
    } else {
      console.log(
        `${starts[i][0]} of ${starts[i]} >= ${ends[end][1]} of ${ends[end]}, so end++`
      );
      end++;
    }
  }
  return rooms;
};

console.log(
  minMeetingRooms([
    [0, 30],
    [5, 10],
    [15, 20],
  ])
);
