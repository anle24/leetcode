/**
 * 301. Remove Invalid Parentheses
 * Difficulty: Hard
 * 
 * Remove the minimum number of invalid parentheses in order to make the input string valid.
 * Return all possible results.
 * 
 * Note: The input string may contain letters other than the parentheses ( and ).
 * 
 * Example 1:
 *  Input: "()())()"
 *  Output: ["()()()", "(())()"]
 * 
 * Example 2:
 *  Input: "(a)())()"
 * Output: ["(a)()()", "(a())()"]
 * 
 * Example 3:
 *  Input: ")("
 *  Output: [""]
 */

/**
 * DFS Solution:
 * keep track of the max number of '('s in a valid solution, which we will use to validate
 * if a potential result meets the length minimum requirement to be included in the "minimum removal" solution
 * 
 * recurse dfs on the first char of the string, deciding whether to use it or skip it for the potential result
 * to find all results, we will need to try both at each char
 * using: add to passed-in (in-progress) result substring and pass it and remaining original string (s.substring(1)) to next recursion
 * skipping: leave passed-in result substring (subRes) unchanged and pass it and s.substring(1) to next recursion
 * 
 * when processing '(', if using, increment counter for unmatched left parentheses
 * when processing ')', can only use if there are unmatched left parantheses available (countLeft > 0)
 * so if using, decrement countLeft, concat it onto subRes, and go to next dfs(s.substring(1), subRes, countLeft, maxLeft)
 * 
 * once we reach s.substring(1) == '', that means we've processed the whole string
 * so now we check if our final result substring is valid:
 * - countLeft === 0 ? No remaining unmatched left parantheses
 * - subRes !== '' ? result substring is not empty
 * 
 * on first valid substring, we will have kept as many left parantheses as we could since the dfs call on using is made before skipping
 * since we are looking for the solutions that removed the least number of parentheses, we want to save the max number of parentheses
 * we can keep to have a valid substring. So we will save it as maxLeft (max number of left parentheses)
 * then, on following validation of potential results, they will need to have the same number of (left) parantheses to be added
 * to the final result array
 * @param {string} s 
 */
const removeInvalidParentheses = function (s) {
  const res = [];
  let max = 0;
  dfs(s, '', 0, 0);

  return res.length !== 0 ? res : [''];

  function dfs(str, subRes, countLeft, maxLeft) {
    // if we have reached the end of the string (passed an empty substr)
    if (str === '') {
      // if there are no more '('s to match and the subresult is not empty
      if (countLeft === 0 && subRes !== '') {
        if (maxLeft > max) {
          max = maxLeft;
        }

        if (max === maxLeft && res.indexOf(subRes) === -1) {
          res.push(subRes);
        }
      }
      return;
    }

    if (str[0] === '(') {
      // choose to include '(' in the possible solution
      dfs(str.substring(1), subRes + '(', countLeft + 1, maxLeft + 1);

      // choose to remove it
      dfs(str.substring(1), subRes, countLeft, maxLeft);
    } else if (str[0] === ')') {
      if (countLeft > 0) {
        // if there is an available '(' to match, choose to include this ')' in possible solution
        dfs(str.substring(1), subRes + ')', countLeft - 1, maxLeft);
      }

      // choose to remove it
      dfs(str.substring(1), subRes, countLeft, maxLeft);
    } else {
      // if it is a non-parenthesis char, include it
      dfs(str.substring(1), subRes + str[0], countLeft, maxLeft);
    }
  }
};

console.log(removeInvalidParentheses('(((())())'));