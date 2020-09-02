/**
 * 325. Maximum Size Subarray Sum Equals K
 * Difficulty: Medium
 * 
 * Given an array nums and a target value k, find the maximum length of a subarray that sums to k.
 * If there isn't one, return 0 instead.
 * 
 * Note:
 *  The sum of the entire nums array is guaranteed to fit within the 32-bit signed integer range.
 * 
 * Example 1:
 *  Input: nums = [1, -1, 5, -2, 3], k = 3
 *  Output: 4
 *  Explanation: The subarray [1, -1, 5, -2] sums to 3 and is the longest
 * 
 * Example 2:
 *  Input: nums = [-2, -1, 2, 1], k = 1
 *  Output: 2
 *  Explanation: The subarray [-1, 2] sums to 1 and is teh longest.
 */


/**
 * Solution:
 *  - create map of sums and the index of first occurrence
 *  - as we iterate and store current sum, search for sum in map that if 
 *    subtracted from sum at current index, would equal k (map[sum - k])
 *  - compare and store max
 *  - to get sum of any subarray, we subtract a previous sum at a previous index
 *    recorded in the map from the current sum at current index
 *  - so if we want to find a subarray with target sum k, then with sum at each index,
 *    we are looking for a sum to subtract current total sum to get target k
 *    totalSumAtCurrentIdx - (target) = k
 *    or target = sum - k
 *  - so we check at each index if sum - k exists in the map, ie if we have come across
 *    that target sum earlier in the array (map[sum - k])
 * @param {array} nums 
 * @param {number} k
 * @returns {number} 
 */
const maxSubArrayLen = (nums, k) => {
  // map of sums and first index where they occur
  let id = {};

  /**
   * initiate id[0] to -1 because if looking for sum - k = 0,
   * then sum = k, current sum is the target
   * so we get the length of subarray up to current index
   * which is i + 1, so id[0] needs to be -1 (i - (-1) = i + 1)
   */
  id[0] = -1;

  // total sum updated at each index
  let sum = 0;

  // length of longest matching subarray so far
  let max = 0;

  for (let i = 0; i < nums.length; i++) {
    // add to sum
    sum += nums[i];

    /**
     * if current sum doesn't exist in map, add it to map with current index
     * we want longest subarray, so we only need first occurrence of this sum
     * since any later occurrence will be a smaller subarray
     */
    if (!(sum in id)) {
      id[sum] = i;
    }

    // if target exists in map, update max if newfound matching subarray is longer
    if (sum - k in id) {
      max = Math.max(max, i - id[sum - k]);
    }
  }
  return max;
}

console.log(maxSubArrayLen([1, -1, 5, -2, 3], 3));
console.log(maxSubArrayLen([-2, -1, 2, 1], 1));