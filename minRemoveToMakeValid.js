/**
 * 1249. Minimum Remove to Make Valid Parentheses
 * Difficulty: Medium
 *
 * Given a string s of '(', ')' and lowercase English characters.
 * Your task is to remove the minimum number of parentheses ( '(' or ')' in any positions)
 * so that the resulting parentheses string is valid and return any valid string.
 *
 * Formally, a parentheses string is valid if and only if:
 *  - it is an empty string, contains only lowercase characters, or
 *  - it can be written as AB (A concatenated with B), where A and B are valid strings, or
 *  - it can be written as (A), where A is a valid string
 *
 * Example 1:
 *  Input: s = "lee(t(c)o)de)"
 *  Output: "lee(t(c)o)de"
 *  Explanation: "lee(t(co)de)" , "lee(t(c)ode)" would also be accepted.
 *
 * Example 2:
 *  Input: s = "a)b(c)d"
 *  Output: "ab(c)d"
 *
 * Example 3:
 *  Input: s = "))(("
 *  Output: ""
 *  Explanation: An empty string is also valid.
 *
 * Example 4:
 *  Input: s = "(a(b(c)d)"
 *  Output: "a(b(c)d)"
 */

/**
 * Solution:
 *  use stack solution for validParentheses
 *  but instead, store the index
 *  remove any ')' when '(' stack is empty (meaning it does not have a matching left parenthesis)
 *  remove any remaining unmatched '(' in the stack at their indeces
 */
const minRemoveToMakeValid = (str) => {
  str = str.split("");
  let stack = [];
  for (let i = 0; i < str.length; i++) {
    if (str[i] === "(") stack.push(i);
    else if (str[i] === ")") {
      if (stack.length) stack.pop();
      else str[i] = "";
    }
  }

  for (let i of stack) str[i] = "";
  console.log(str);

  return str.join("");
};

console.log(minRemoveToMakeValid("))(())()()))()))(("));
