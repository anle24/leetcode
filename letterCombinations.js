/**
 * 17. Letter Combinations of a Phone Number
 * Difficulty: Medium
 * 
 * Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent.
 * A mapping of digit to letters (just like that on the telephone buttons) is given below. Note that 1 does not map to any letters.
 * 
 * 1 -      2 - abc   3 - def
 * 4 - ghi  5 - jkl   6 - mno
 * 7 - pqrs 8 - tuv   9 - wxyz
 */

const letterCombinations = digits => {
  if (digits.length === 0) return [];

  const map = {
    2: 'abc',
    3: 'def',
    4: 'ghi',
    5: 'jkl',
    6: 'mno',
    7: 'pqrs',
    8: 'tuv',
    9: 'wxyz'
  };

  let res = [];

  const go = (i, str) => {
    // base case: if reached end of permutation
    if (i === digits.length) {
      // push completed permutation to res
      res.push(str);
      return;
    }

    // else, for each letter in number mapping, recurse again
    for (let char of map[digits[i]]) {
      go(i + 1, str + char)
    }
  }

  go(0, '');
  return res;
}

console.log(letterCombinations('234'));