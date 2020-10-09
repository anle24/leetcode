/**
 * 10. Regular Expression Matching
 * Difficulty: Hard
 * 
 * Given an input string (s) and a pattern (p), implement regular expression matching with support for '.' and '*'.
 * '.' Matches any single character.
 * '*' Matches zero or more of the preceding element.
 * The matching should cover the entire input string (not partial).
 * 
 * Note:
 * s could be empty and contains only lowercase letters a-z.
 * p could be empty and contains only lowercase letters a-z, and characters like . or *.
 * 
 * Example 1:
 *  Input:
 *  s = "aa"
 *  p = "a"
 *  Output: false
 * Explanation: "a" does not match the entire string "aa".
 * 
 * Example 2:
 *  Input:
 *  s = "aa"
 *  p = "a*"
 *  Output: true
 *  Explanation: '*' means zero or more of the preceding element, 'a'. Therefore, by repeating 'a' once, it becomes "aa".
 * 
 * Example 3:
 *  Input:
 *  s = "ab"
 *  p = ".*"
 *  Output: true
 *  Explanation: ".*" means "zero or more (*) of any character (.)".
 * 
 * Example 4:
 *  Input:
 *  s = "aab"
 *  p = "c*a*b"
 *  Output: true
 *  Explanation: c can be repeated 0 times, a can be repeated 1 time. Therefore, it matches "aab".
 * 
 * Example 5:
 *  Input:
 *  s = "mississippi"
 *  p = "mis*is*p*."
 *  Output: false
 */

/**
 * Recursion
 * @param {*} string 
 * @param {*} pattern 
 */
const isMatch = (string, pattern) => {
  if (!pattern) return !string;

  const firstCharMatch = string.length > 0 && (pattern[0] === '.' || pattern[0] === string[0]);

  if (pattern[1] === '*') {
    return (
      isMatch(string, pattern.slice(2)) ||
      (firstCharMatch && isMatch(string.slice(1), pattern))
    );
  }

  return firstCharMatch ? isMatch(string.slice(1), pattern.slice(1)) : false;
}

/**
 * Dynamic Programming
 */
const isMatchDP = (s, p) => {
  if (s == null || p == null) return false;

  const m = s.length;
  const n = p.length;

  // initialize dp matrix with extra row/column
  const dp = [new Array(n + 1).fill(false)];
  for (let i = 1; i < m + 1; i++) {
    const arr = new Array(n + 1);
    arr[0] = false;
    dp.push(arr);
  }
  dp[0][0] = true;

  for (let j = 2; j < n + 1; j += 2) {
    if (p[j - 1] == '*' && dp[0][j - 2]) {
      dp[0][j] = true;
    }
    console.log(dp);
  }

  for (let i = 1; i < m + 1; i++) {
    for (let j = 1; j < n + 1; j++) {
      const currentS = s[i - 1];
      const currentP = p[j - 1];

      if (currentS == currentP || currentP == '.') {
        dp[i][j] = dp[i - 1][j - 1];
      } else if (currentP == '*') {
        const preCurrentP = p[j - 2];
        if (preCurrentP != '.' && preCurrentP != currentS) {
          dp[i][j] = dp[i][j - 2];
        } else {
          dp[i][j] = (dp[i][j - 2] || dp[i - 1][j - 2] || dp[i - 1][j])
        }
      }

      console.log(dp);
    }
  }

  return dp[m][n];
}

console.log(isMatchDP("aaaaabc", "a*bc"));