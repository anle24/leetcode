/**
 * 523. Continuous Subarray Sum
 * Difficulty: Medium
 * 
 * Given a list of non-negative numbers and a target integer k, write a function to check if the array
 * has a continuous subarray of size at least 2 that sums up to a multiple of k, that is, sums up to n * k
 * where n is also an integer
 * 
 * Example 1:
 *  Input: [23, 2, 4, 6, 7],  k=6
 *  Output: True
 *  Explanation: Because [2, 4] is a continuous subarray of size 2 and sums up to 6.
 * 
 * Example 2:
 *  Input: [23, 2, 6, 4, 7],  k=6
 *  Output: True
 *  Explanation: Because [23, 2, 6, 4, 7] is an continuous subarray of size 5 and sums up to 42.
 */

/**
 * Just like twoSum, threeSum, etc.. use Hash Map
 * However, we are looking for a subarray of length >= 2 that adds up to n * k
 * So we are looking for sum = n * k, or sum % k == 0
 * But if the current sum != n * k, then we want to see if we have come across 
 * a sum value that we can subtract to get
 *  (sum - somePrevSum) % k == 0
 *  (sum % k) - (somePrevSum % k) == 0
 *  sum % k = somePrevSum % k
 * In other words, at each new sum, we are looking for a previous sum that would
 * have the same remainder after % k, because the remainders would subtract each other out,
 * and what's left over is just some reduced multiple of k
 * sum - (n * k) = remainder => sum = (n * k) + remainder
 * looking for:
 * somePrevSum - (m * k) = remainder => somePrevSum =  (m * k) + remainder
 * sum - somePrevSum = (n * k + remainder) - (m * k + remainder)
 *                   = n * k + remainder - m * k - remainder ... remainders subtract each other out
 *                   = (n * k) - (m * k)
 *                   = (m - n)(k) ... still some multiple of k
 * 
 * Example:
 *  [5, 2, 24, 15], k = 13
 *  5 % 13 -> remainder 5
 *  5 + 2 = 7 % 13 -> remainder 7
 *  5 + 2 + 24 = 31 % 13 -> remainder 5... we've seen a remainder 5 at index 0, value 5
 *    so if we were to subtract, 31 - 5 = 26, which is a multiple of 13
 *    continuing...
 *  5 + 2 + 24 + 15 = 46 % 13 -> remainder 7... we saw that at index 1 with 5 + 2 = 7
 *    so we get the previous sum with remainder 7 to subtract the current sum's
 *    remainder 7 in order to get % 13 == 0
 * 
 * @param {Array<number>} nums 
 * @param {number} k 
 */
const checkSubarraySum = (nums, k) => {
  if (!nums || k == null) return false;
  let map = new Map();
  let sum = 0;
  map.set(0, -1);

  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
    if (k != 0) {
      // we are storing the remainder of the sums at each index
      sum = sum % k;
    }

    // if map contains a remainder that can be subtracted from our current sum
    if (map.has(sum)) {
      // and if it is a subarray larger than 1
      if (i - map.get(sum) > 1) {
        return true;
      }
    } else {
      map.set(sum, i);
    }
  }

  return false;
}

const arr1 = [23, 2, 4, 6, 7];
const k1 = 6;
const arr2 = [23, 2, 6, 4, 7];
const k2 = 6;

console.log(checkSubarraySum(arr1, k1));