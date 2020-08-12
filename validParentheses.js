/**
 * 20. Valid Parentheses
 * Difficulty: Easy
 * 
 * Given a string containing just the characters '(', ')', '{', '}', '[', and ']',
 * determine if the input string is valid
 * 
 * An input string is valid if:
 * 1. Open brackets must be closed by the same type of brackets
 * 2. Open brackets must be closed in the correct order
 * 
 * Note that an empty string is also considered valid
 * 
 * Example 1:
 *  Input: "()"
 *  Output: true
 * 
 * Example 2:
 *  Input: "()[]{}"
 *  Output: true
 * 
 * Example 3:
 *  Input: "(]"
 *  Output: false
 * 
 * Example 4:
 *  Input: "([)]"
 *  Output: false
 * 
 * Example 5:
 *  Input: "{[]}"
 *  Ouput: true
 */

const validParentheses = string => {
    const open = ['(', '{', '['];
    const close = [')', '}', ']'];
    const stack = [];
    const array = string.split('');
    for (let i = 0; i < string.length; i++) {
        if (open.includes(array[i])) {
            stack.push(array[i]);
        } else {
            const closeIdx = close.indexOf(array[i]);
            const openIdx = open.indexOf(stack[stack.length-1]);
            if (closeIdx !== openIdx) {
                return false;
            } else {
                stack.pop();
            }
        }
    }
    return array.length === 0 ? true : false;
}

const string1 = '{}()[]';
const string2 = '({[]()})';
const string3 = '{}(){{})){[[]]}}'

console.log(validParentheses(string1));
console.log(validParentheses(string2));
console.log(validParentheses(string3));
