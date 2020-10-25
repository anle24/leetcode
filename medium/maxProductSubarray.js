/**
 * 152. Maximum Product Subarray
 * Difficulty: Medium
 * 
 * Given an integer array nums, find the contiguous subarray within an arra (containing at least one number)
 * which has the largest product.
 * 
 * Example 1:
 *  Input: [2, 3, -2, 4]
 *  Output: 6
 *  Explanation: [2, 3] has the largest product
 * 
 * Example 2:
 *  Input: [-2, 0, -1]
 *  Output: 0
 *  Explanation: The result cannot be 2, because [-2, -1] is not a subarray.
 */

/**
 * Solution:
 * Dynamic Programming
 * 
 * @param {Number[]} nums 
 */
const maxProduct = (nums) => {
  let prevMax = nums[0];
  let prevMin = nums[0];
  let result = nums[0];
  
  for (let i = 1; i < nums.length; i++) {
    const currMax = Math.max(nums[i], nums[i] * prevMax, nums[i] * prevMin);
    const currMin = Math.min(nums[i], nums[i] * prevMax, nums[i] * prevMin);
    
    prevMax = currMax;
    prevMin = currMin;
    
    result = Math.max(currMax, result);
  }
  
  return result
};