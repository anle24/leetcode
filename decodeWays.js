/**
 * 91. Decode Ways
 * Difficulty: Medium
 * 
 * A message containing letters from A-Z is being encoded to numbers using the following mapping:
 * 'A' -> 1
 * 'B' -> 2
 * ...
 * 'Z' -> 26
 * 
 * Given a non-empty string containing only digits, determine the dotal number of ways to decode it.
 * 
 * Example 1:
 *  Input: "12"
 *  Output: 2
 *  Explanation: It could be decoded as "AB" (1 2) or "L" (12).
 * 
 * Example 2:
 *  Input: "226"
 *  Output: 3
 *  Explanation: It could be decoded as "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6).
 */

/**
 * Solution:
 *  Use recursion
 * @param {string} s
 * @returns {number}
 */

const numEncodings = s => {
    if (s.length < 1) return 0;
    let memo = [];

    const recur = index => {
        console.log('currently at index', index);
        let result = 0;
        if (index === s.length) {
            console.log('reached end of string, returning 1');
            return 1;
        }
        if (memo[index] != null) {
            console.log(`memo[${index}]:${memo[index]} exists, returning ${memo[index]}`);
            return memo[index];
        }
        if (s[index] > 0) {
            result += recur(index+1);
            console.log(`s[${index}]:${s[index]} > 0, so can use as single digit, result:${result}`);
        }

        if (s[index] != 0 && s[index + 1] != null && s[index] + s[index+1] < 27) {
            console.log(`${s[index]}${s[index + 1]} doesn't start with 0, has second digit, and value is less than 27, so add values then move index by 2`);
            result += recur(index + 2);
            console.log('result is now', result);
        }

        memo[index] = result;
        console.log(`memo[${index}] is now ${result}`, memo);
        return result;
    }

    return recur(0)
}

numEncodings("226");