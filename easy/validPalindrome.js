/*
680. Valid Palindrome II
Difficulty: Easy

Given a non-empty string s, you may delete at most one character. Judge whether you can make it a palindrome.

Example 1:
Input: "aba"
Output: True
Example 2:
Input: "abca"
Output: True
Explanation: You could delete the character 'c'.
Note:
The string will only contain lowercase characters a-z. The maximum length of the string is 50000.
*/

const validPalindrome = (s, corrections = 1) => {
  console.log(s);
  let lo = 0;
  let hi = s.length - 1;
  while (lo < hi) {
    if (s[lo] === s[hi]) {
      lo++;
      hi--;
      // skip to next iteration
      continue;
    }

    if (corrections === 0) {
      return false;
    }

    // check substring between [lo] and [hi - 1]
    // check substring between [lo + 1] and [hi]
    // return true if one is true
    return (
      validPalindrome(s.slice(lo, hi), 0) ||
      validPalindrome(s.slice(lo + 1, hi + 1), 0)
    );
  }

  return true;
};

const string1 = "raceacar";
const string2 = "raceabcar";
const string3 = "racecar";
const string4 =
  "aguokepatgbnvfqmgmlcupuufxoohdfpgjdmysgvhmvffcnqxjjxqncffvmhvgsymdjgpfdhooxfuupuculmgmqfvnbgtapekouga";
console.log(string1, validPalindrome(string1));
console.log(string2, validPalindrome(string2));
console.log(string3, validPalindrome(string3));
console.log(string4, validPalindrome(string4));