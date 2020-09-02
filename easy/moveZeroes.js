/**
 * 283. Move Zeroes
 * Difficulty: Easy
 *
 * Given an array nums, write a function to move all the 0's to the end of it
 * while maintaining the relative order of the non-zero elements.
 *
 * Example:
 *  Input: [0, 1, 0, 3, 12]
 *  Output: [1, 3, 12, 0, 0]
 */

// const moveZeroes = (nums) => {
// 	let i = 0;
// 	let count = 0;
// 	while (i < nums.length - count) {
// 		if (nums[i] == 0) {
// 			nums.splice(i, 1);
// 			nums.push(0);
// 			count++;
// 		} else {
// 			i++;
// 		}
// 	}
// 	return nums;
// };

const moveZeroes = (nums) => {
  //two pointers
  let pos = 0;
  for (var i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[pos++] = nums[i];
    }
  }
  for (i = pos; i < nums.length; i++) {
    nums[i] = 0;
  }

  return nums;
};

const arr = [
  0,
  1,
  3,
  56,
  7,
  8,
  32,
  5,
  0,
  0,
  0,
  3,
  3,
  57,
  2,
  3,
  4521,
  2,
  4,
  7,
  0,
  8,
  6,
  0,
];

console.log(moveZeroes(arr));
