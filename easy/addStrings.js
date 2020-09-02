/**
 * 415. Add Strings
 * Difficulty: Easy
 *
 * Given two non-negative integers num1 and num2 represented as string, return the sum of
 * num1 and num2.
 *
 * Note:
 *  The length of both num1 and num2 is < 5100.
 *  Both num1 and num2 contains only digits 0-9.
 *  Both num1 and num2 does not contain any leading zero.
 *  You must not use any built-in BigInteger library or convert the inputs to integer
 *  directly.
 *
 */

var addStrings = function (num1, num2) {
  let i = num1.length - 1;
  let j = num2.length - 1;
  let carry = 0;
  let sum = "";

  for (; i >= 0 || j >= 0 || carry > 0; i--, j--) {
    // if i or j goes to negative index, treat as 0
    // number string subtracted by '0' converts to number
    const digit1 = i < 0 ? 0 : num1.charAt(i) - "0";
    const digit2 = j < 0 ? 0 : num2.charAt(j) - "0";
    // digit1 and digit2 will be numbers, so it will be number sum, not string concat
    const digitsSum = digit1 + digit2 + carry;
    // add only the last digit of digits sum to the current digit place of the total sum
    sum = `${digitsSum % 10}${sum}`;
    // then get the carry 1 if exists to bring to next iteration/digit
    carry = Math.floor(digitsSum / 10);
  }

  return sum;
};

const number1 = "4820034";
const number2 = "560088";

addStrings(number1, number2);
