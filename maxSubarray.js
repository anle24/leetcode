/**
 * 53. Maximum Subarray
 * Difficulty: Easy (?)
 * 
 * Given an integer of array nums, find the contiguous subarray (containing at least one number)
 * which has the largest sumn and return its sum
 */

/**
 * Solution:
 *  Iterate through the array and accumulate values from the left of the current value
 *  if adding it would increase the total value.
 * 
 * Replace the current value in the array (or in a new array) with the max between the current value
 * and the current value + everything accumulated to the left
 */
const maxSubarray = nums => {
    let solution = nums[0];

    for (let i = 1; i < nums.length; i++) {
        nums[i] = Math.max(nums[i], nums[i] + nums[i - 1]);
        solution = Math.max(solution, nums[i]);
    }

    return solution;
}