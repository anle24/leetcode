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
 * Solution:
 *  1. sort the array
 *  2. initialize 3 pointers
 *      i = 0 (outer loop)
 *      low = i + 1
 *      high = nums.length - 1
 *  3. check to see if sum of values at all 3 pointers add up target: 0
 *  4. if sum < target, low++
 *  5. if sum > target, high--
 *  6. if sum == target
 *    a. push to array
 *    b. skip over duplicate low/high, low++/high--
 *    c. check next non-duplicate low & high, low++ && high--
 *  7. if sorted[i] == sorted[i - 1] (duplicate), then skip to next i iteration, i++
 *
 * Time Complexity: O(n^2)
 * Initial for loop + twoSum while loop (lower + upper bounds)
 */
const threeSum = (nums) => {
  // sort array first
  const sorted = nums.sort((a, b) => a - b);
  console.log("Sorting...", nums, "to", sorted);

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
      console.log(
        `target sum is 0 - sorted[${i}]:${sorted[i]} = ${0 - sorted[i]}`
      );

      while (low < high) {
        const tempArray = sorted.concat();
        tempArray[i] = `i(${sorted[i]})`;
        tempArray[low] = `low(${sorted[low]})`;
        tempArray[high] = `high(${sorted[high]})`;
        console.log(tempArray);
        // if we find two matching values
        if (sorted[low] + sorted[high] === sum) {
          console.log(
            `sum found! adding [${sorted[i]}, ${sorted[low]}, ${sorted[high]}] to array...`
          );
          // push to result array
          array.push([sorted[i], sorted[low], sorted[high]]);

          // skip over next element if it is duplicate (for both bounds)
          while (low < high && sorted[low] == sorted[low + 1]) {
            console.log("next sorted[low] is same value... low++");
            low++;
          }
          while (low < high && sorted[high] == sorted[high - 1]) {
            console.log("next sorted[high] is same value... high--");
            high--;
          }

          // iterate to next for each bound (after exiting duplicates loop)
          console.log("low++, high-- ...");
          low++;
          high--;

          // if sum of bounds > sum, decrement the upper bound
        } else if (sorted[low] + sorted[high] > sum) {
          console.log(
            `${sorted[low]} + ${sorted[high]} = ${
              sorted[low] + sorted[high]
            } > ${sum}, so high--`
          );
          high--;
          // if sum of bounds < sum, increment the lower bound
        } else {
          console.log(
            `${sorted[low]} + ${sorted[high]} = ${
              sorted[low] + sorted[high]
            } < ${sum}, so low++`
          );
          low++;
        }
      }
    }
    if (sorted[i] == sorted[i - 1]) {
      console.log(
        `sorted[${i}]:${sorted[i]} == sorted[${i - 1}]:${
          sorted[i - 1]
        }, so continue...`
      );
    }
  }

  return array;
};

const array1 = [-1, 0, 1, 2, -1, -4];

console.log(threeSum(array1));
