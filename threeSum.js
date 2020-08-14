/**
 * 15. Three Sum
 * Difficulty: Medium
 *
 * Given an array nums of n integers, are there elements a, b, c in nums such that a + b + c = 0?
 * Find all unique triplets in the array which gives the sum of zero
 *
 * Note:
 * The solution set must not contain duplicate triplets.
 */

/**
 * Solution: iterate through array and apply twoSum
 * at each array[i], look for two other elements that equal 0 - array[i]
 *
 * Time Complexity: O(n^2)
 * Initial for loop + twoSum while loop (lower + upper bounds)
 */
const threeSum = (nums) => {
  // sort array first
  const sorted = nums.sort((a, b) => a - b);

  // define result array
  const array = [];

  // iterate through sorted array
  for (let i = 0; i < sorted.length; i++) {
    // if we are at first index or we are not at a duplicate of previous element
    if (i === 0 || (i > 0 && sorted[i] !== sorted[i - 1])) {
      // lower bound iterator starting after i
      let low = i + 1;

      // upper bound iterator starting at end of sorted
      let high = sorted.length - 1;

      // since all 3 elements must equal 0, target sum for other two is 0 - initial element
      const sum = 0 - sorted[i];

      while (low < high) {
        // if we find two matching values
        if (sorted[low] + nums[high] === sum) {
          // push to result array
          array.push([sorted[i], sorted[low], sorted[high]]);

          // skip over next element if it is duplicate (for both bounds)
          while (low < high && sorted[low] == sorted[low + 1]) low++;
          while (low < high && sorted[high] == sorted[high + 1]) high++;

          // iterate to next for each bound (after exiting duplicates loop)
          low++;
          high--;

          // if sum of bounds > sum, decrement the upper bound
        } else if (sorted[low] + sorted[high] > sum) {
          high--;
          // if sum of bounds < sum, increment the lower bound
        } else {
          low++;
        }
      }
    }
  }

  return array;
};

const array1 = [-1, 0, 1, 2, -1, -4];

console.log(threeSum(array1));
