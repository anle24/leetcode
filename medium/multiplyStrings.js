/**
 * 43. Multiply Strings
 * Difficulty: Medium
 * 
 * Given two non-negative integers num1 and num2 represented as strings, return the product of num1 and num2,
 * also represented as a string.
 * 
 * Example 1:
 *  Input: num1 = "2", num2 = "3"
 *  Output: "6"
 * 
 * Example 2:
 *  Input: num1 = "123", num2 = "456"
 *  Output: "56088"
 * 
 * Note:
 *  1. The length of both num1 and num2 is < 110
 *  2. Both num1 and num2 contain only digits 0-9
 *  3. Both num1 and num2 do not contain any leading zerom except the number 0 itself
 *  4. You MUST NOT USE ANY BUILT-IN BIGINTEGER LIBRARY or CONVERT THE INPUTS TO INTEGER directly
 */

/**
 * Solution:
 * We will create an array of length num1.length + num2.length, since the number of digits of
 * a product of two numbers will at most be the sum of the number of digits of the two numbers
 * - Then we multiply each digit
 * - add the right-most digit to its appropriate index
 * - then add the carry to the next digit index.
 * 
 * @param {string} num1 
 * @param {string} num2 
 */
const multiply = (num1, num2) => {
  if (num1 == '0' || num2 == '0') return 0;

  const m = num1.length;
  const n = num2.length;

  // initiate result (m + n) length array with 0s
  const res = new Array(m + n).fill(0);

  // iterate over each digit
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      // the index of the product digit in the result array is i + j + 1
      // the next digit, or the carry digit, will be i + j
      const nextDigit = i + j;
      const currDigit = i + j + 1;

      // add the carry at the current digit (from the previous digit's multiplication), if any, to the product
      let sum = res[currDigit] + Number(num1[i]) * Number(num2[j]);
      // get just the right-most digit
      res[currDigit] = sum % 10;
      // add the carry to the next digit
      res[nextDigit] += Math.floor(sum / 10);
    }
  }

  // remove the leading 0 if any
  if (res[0] == 0) res.shift();
  return res.join('');
}

const str1 = '123';
const str2 = '456';

console.log(multiply(str1, str2));