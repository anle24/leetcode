/*
67. Add Binary
Difficulty: Easy

Given two binary strings, return their sum (also a binary string).

The input strings are both non-empty and contains only characters 1 or 0.

Example 1:

Input: a = "11", b = "1"
Output: "100"
Example 2:

Input: a = "1010", b = "1011"
Output: "10101"
 

Constraints:

Each string consists only of '0' or '1' characters.
1 <= a.length, b.length <= 10^4
Each string is either "0" or doesn't contain any leading zero.
*/

// Convert to binary literal, then
const addBinaryBigInt = (a, b) => {
  return (BigInt(`0b${a}`) + BigInt(`0b${b}`)).toString(2);
};

var addBinary = function (a, b) {
  let i = a.length - 1;
  let j = b.length - 1;
  let carry = 0;
  let sum = "";

  for (; i >= 0 || j >= 0 || carry > 0; i--, j--) {
    // if i or j goes to negative index, treat as 0
    // number string subtracted by '0' converts to number
    const digit1 = i < 0 ? 0 : a.charAt(i) - "0";
    const digit2 = j < 0 ? 0 : b.charAt(j) - "0";
    // digit1 and digit2 will be numbers, so it will be number sum, not string concat
    const digitsSum = digit1 + digit2 + carry;
    console.log("sum", sum);
    console.log(`${digit1} + ${digit2} + ${carry}`);
    console.log(`${digitsSum} % 2 = ${digitsSum % 2}`);
    // add only the last digit of digits sum to the current digit place of the total sum
    sum = `${digitsSum % 2}${sum}`;
    console.log("sum", sum);
    // then get the carry 1 if exists to bring to next iteration/digit
    carry = digitsSum > 1 ? 1 : 0;
    console.log("carry", carry);
  }

  return sum;
};

const d = "1010101";
const e = "111011";

console.log(addBinary(d, e));
