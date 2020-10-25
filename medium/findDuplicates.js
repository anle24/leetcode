/**
 * 442. Find All Duplicates in an Array
 * Difficulty: Medium
 * 
 * Given an array of integers, 1 <= a[i] <= n (n = size of array),
 * some elements appear twice and others appear once
 * 
 * Find all the elements that appear twice in this array.
 * 
 * Could you do it without extra space and in O(n) runtime?
 * 
 * Example:
 *  Input: [4, 3, 2, 7, 8, 2, 3, 1]
 *  Output: [2, 3]
 */

/**
 * Solution #1:
 *  Sort, then traverse and compare nums[i] === nums[i - 1]
 *  Time: O(n log n)
 *  Space: O(1)
 * 
 * Solution #2:
 *  Store value count in map
 *  Time: O(n)
 *  Space: O(n)
 * 
 * Solution #3 (below):
 *  Key hint: integers are values between 1 and n (size of array)
 *  Use value - 1 as index to modify (since index at 0, so everything is -1)
 *  And make value at that index negative
 *  If that value is already negative, then we have seen this index (or value at i) already
 * 
 * @param {Array} nums 
 */
const findDuplicates = (nums) => {
  const result = [];
  for (let i = 0; i < nums.length; i++) {
    const index = Math.abs(nums[i]) - 1;
    if (nums[index] < 0) result.push(index + 1);
    nums[index] *= -1;
  }

  return result;
}