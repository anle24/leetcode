/*
 * Longest Substring Without Repeating Characters
 * Difficulty: Medium
 *
 * Given a string, find the length of the longest substring without repeating characters.
 *
 * Example 1:
 *  Input: "abcabcbb"
 *  Output: 3
 *  Explanation: The answer is "abc", with the length of 3.
 *
 * Example 2:
 *  Input: "bbbbb"
 *  Output: 1
 *  Explanation: The answer is "b", with the length of 1.
 *
 * Example 3:
 *  Input: "pwwkew"
 *  Output: 3
 *  Explanation: The answer is "wke", with the length of 3.
 *               Note that the answer must be a substring, "pwke" is a subsequence and not a substring.
 */

/*
    While traversing the string, check to see if current substring exists in map
    if it does not, add it as key and its index as the value
    if it does and its length > maxLength, save desired format
    (start & end indeces, substring, or length) and update maxLength
*/
const longestSubstringOne = (string) => {
  let start = 0;
  let maxLength = 0;
  const map = {};

  for (let i = 0; i < string.length; i++) {
    const char = string[i];

    if (map[char] >= start) {
      start = map[char] + 1;
    }

    map[char] = i;

    if (i - start + 1 > maxLength) {
      maxLength = i - start + 1;
    }
  }

  return maxLength;
};

const str = "afikguhadfiughasdfigjhadslfkgnslikrghna";

longestSubstringOne(str);
