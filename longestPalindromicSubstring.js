/**
 * 5. Longest Palindromic Substring
 * Difficulty: Medium
 *
 * Given a string s, find the longest palindromic substring in s. You may assume the maximum length of s is 1000/
 *
 * Example 1:
 *  Input: "babad"
 *  Output: "bab"
 *  Note: "aba" is also a valid answer
 *
 * Example 2:
 *  Input: "cbbd"
 *  Output: "bb"
 */

/**
 * Solution:
 * Use a helper function that finds the largest palindrome at the given index
 * by expanding and comparing left vs right, treating the index as the center
 * of a potential palindrome
 */
const expandFromMiddle = (s, left, right) => {
  // s not valid or bounds wrong
  if (s === null || left > right) return 0;

  while (left >= 0 && right < s.length && s.charAt(left) == s.charAt(right)) {
    // if it is a palindrome, expand left & right to check for larger palindrome
    left--;
    right++;
  }

  /* breaks out of while loop after iterating left-- and right ++
    so return value needs to be previous state of left and right
    and + 1 because of indeces */
  return right - 1 - (left + 1) + 1;
};

const longestPalindrome = (s) => {
  if (s === null || s.length < 1) return "";

  let start = 0;
  let end = 0;

  for (let i = 0; i < s.length; i++) {
    // length of odd-length palindrome e.g. "racecar"
    const lenOdd = expandFromMiddle(s, i, i);

    // length of even-length palindrome e.g. "aabbaa"
    const lenEven = expandFromMiddle(s, i, i + 1);

    // choose longer of the two
    const len = Math.max(lenOdd, lenEven);

    // check if longer than current longest, and update
    if (len > end - start) {
      /* i is center of palindrome, so get start and end
            by adding/subtracting half of length to/from i */
      start = i - Math.floor((len - 1) / 2);
      end = i + Math.floor(len / 2);
    }
  }

  return s.substring(start, end + 1);
};

const string = "abcabcbb";

console.log(longestPalindrome(string));
