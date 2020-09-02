/**
 * 76. Minimum Window Substring
 * Difficulty: Hard
 *
 * Given a string S and a string T, find the minimum window in S which will contain
 * all the characters in T in complexity O(n)
 *
 * Example:
 *  Input: S = "ADOBECODEBANC", T = "ABC"
 *  Output: "BANC"
 */

/**
 * Solution:
 *  Move right side of window right until all characters are found.
 *  Then try to move left side of window right (in-ward) to see if the substring can
 *  be made smaller while still containing all characters of T.
 *  If not, log the smaller of this substring and the current min.
 *  Then, move right side out (right) again until the substring contains all
 *  characters again. Then, try moving left side in again. Repeat.
 */
const minWindow = (s, t) => {
  let left = 0;
  let right = -1;
  let min = "";
  let map = {};

  // create a map of t that keeps track of the number of instances of each character
  t.split("").forEach((element) => {
    if (!map[element]) map[element] = 1;
    else map[element] = map[element] + 1;
  });

  // keeps track of the number of different characters
  let count = Object.keys(map).length;

  while (right <= s.length) {
    // found valid substring
    if (count === 0) {
      // try to shift left boundary to the right, removing very left character
      let current = s[left];

      // if this character is in our map, add +1 back to its total
      if (current in map) {
        map[current]++;
      }

      // if this character's total was pushed over 0, then we have reached our current window's
      // minimum, and will now be breaking the conditions once we remove this character
      if (map[current] > 0) {
        count++;
      }

      let temp = s.substring(left, right + 1);

      if (min == "") min = temp;
      else min = min.length < temp.length ? min : temp;

      left++;
    } else {
      // moving right bound
      right++;
      let current = s[right];

      // if this character exists in the map, reduce its count
      if (current in map) {
        map[current]--;
      }

      // if this character's count is now 0, we no longer need to search for this character
      // so reduce the total count for remaining unique characters to find
      if (map[current] == 0) {
        count--;
      }
    }
  }

  console.log(min);
  return min;
};

minWindow("ADOBECODEBANC", "ABC");
