/**
 * 252. Meeting Rooms
 * Difficulty: Easy
 *
 * Given an array of meeting time intervals consisting of start and end times [[s1, e1], [s2, e2],...]
 * (si < ei) determine if a person could attend all meetings.
 *
 * Example 1:
 *  Input: [[0, 30], [5, 10], [15, 20]]
 *  Output: false
 *
 * Example 2:
 *  Input: [[7, 10], [2,4]]
 *  Output: true
 *
 */

const canAttendMeetings = (intervals) => {
  if (!intervals || intervals.length === 1) return true;
  intervals.sort((a, b) => a[0] - b[0]);
  let i = 1;
  while (i < intervals.length) {
    if (intervals[i][0] < intervals[i - 1][1]) return false;
    i++;
  }
  return true;
};