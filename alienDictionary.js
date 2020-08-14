/**
 * 953. Verifying an Alien Dictionary
 * Difficulty: Easy
 *
 *
 */

const isAlienSorted = (words, order) => {
  let charPosition = new Map();
  for (let position = 0; position < order.length; position++) {
    let char = order[position];
    charPosition.set(char, position);
  }
  console.log(charPosition);

  for (let i = 1; i < words.length; i++) {
    let prev = words[i - 1];
    let curr = words[i];

    // see if first char of prev is greater than curr's
    if (charPosition.get(prev[0]) > charPosition.get(curr[0])) return false;
    else if (prev[0] === curr[0]) {
      let pointer = 1;
      // keep moving pointer until reaching an non-matching letter
      while (
        prev[pointer] === curr[pointer] &&
        pointer < Math.max(curr.length, prev.length)
      ) {
        console.log(pointer);
        pointer++;
      }
      // if current is the shorter matching word, it is out of order
      if (curr[pointer] === undefined) return false;
      // if the first non-matching letter of prev is greater than curr
      if (charPosition.get(prev[pointer]) > charPosition.get(curr[pointer]))
        return false;
    }
  }
  return true;
};

console.log(isAlienSorted(["hello", "leetcode"], "hlabcdefgijkmnopqrstuvwxyz"));
