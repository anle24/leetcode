/**
 * 438. Find all Anagrams in a String
 * Difficulty: Medium
 * 
 * Given a string s and a non-empty string p, find all the start indices of p's anagrams in s.
 * Strings consists of lowercase English letters only and the lenght of both strings s and p will
 * not be larger than 20,100.
 * The order of output does not matter.
 * 
 * Example 1:
 *  Input:        s: "cbaebabacd", p: "abc"
 *  Output:       [0, 6]
 *  Explanation:  The substring with start index = 0 is "cba", which is an anagram of "abc"
 *                The substring with start index = 6 is "bac", which is an anagram of "abc"
 * 
 * Example 2:
 *  Input:        s: "abab", p: "ab"
 *  Output:       [0, 1, 2]
 *  Explanation:  The substring with start index = 0 is "ab", which is an anagram of "ab"
 *                The substring with start index = 1 is "ba", which is an anagram of "ab"
 *                The substring with start index = 2 is "ab", which is an anagram of "ab"
 */

/**
 * Sliding window approach
 *  - store char frequency of p in map
 *  - count unique chars in p
 *  - move right pointer until window reaches p.length
 *  - if all chars are found and unique char counter == 0, then an anagram was found
 *  - then move sliding window
 * @param {string} s - string to be searched
 * @param {string} p - string to find anagrams of in s
 * @returns {array}
 */
const findAnagrams = (s, p) => {
  // result array
  let res = [];
  if (s.length < p.length || p.length == 0) return res;

  // map for char frequency in p
  let map = {};
  // counter for unique characters in p
  let uniqueChars = 0;

  // populate map and unique char counter
  for (let c of p) {
    if (map[c] == null) {
      uniqueChars++;
      map[c] = 1;
    } else {
      map[c]++
    }
  }
  let left = 0;
  let right = 0;
  while (right < s.length) {
    // if char at right pointer exists in map, decrement its counter
    if (map[s[right]] != null) {
      map[s[right]]--;
    }

    // if char count at right pointer reaches 0 in map, decrement uniqueChars
    if (map[s[right]] == 0) {
      uniqueChars--;
    }

    // if unique char counter reaches 0, we have found an anagram (all chars are found)
    if (uniqueChars == 0) {
      res.push(left);
    }

    // when our sliding window reaches its max length (length of p), we need to shift right
    if (right - left + 1 == p.length) {
      // char at left pointer will be excluded when left pointer moves right
      if (map[s[left]] != null) {
        // so if char exists in map, add back to counter
        map[s[left]]++;
        // then, if the char's counter goes from 0 to 1, add back to unique char counter
        if (map[s[left]] == 1) {
          uniqueChars++;
        }
      }

      // move left pointer (only when window is max size)
      left++;
    }

    // move right pointer
    right++;
  }

  return res;
}