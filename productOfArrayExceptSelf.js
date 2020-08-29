/**
 * 238. Product of Array Except Self
 * Difficulty: Medium
 *
 * Given an array nums of n integers where n > 1, return an array output such that output[i]
 * is equal to the product of all elements of nums except nums[i]
 *
 * Example:
 *  Input: [1, 2, 3, 4]
 *  Output: [24, 12, 8, 6]
 */

const productExceptSelf = (nums) => {
  const output = [];
  output[0] = 1;
  output[nums.length - 1] = 1;
  let rightMulti = 1;
  let leftMulti = 1;
  for (let i = nums.length - 1; i >= 0; i--) {
    output[i] = rightMulti;
    rightMulti *= nums[i];
  }

  for (let j = 0; j < nums.length; j++) {
    output[j] *= leftMulti;
    leftMulti *= nums[j];
  }

  return output;
};

console.log(productExceptSelf([1, 2, 3, 4]));
