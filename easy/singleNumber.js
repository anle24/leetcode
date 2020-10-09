/**
 * 136. Single Number
 * Difficulty: Easy
 * 
 * Given a non-empty array of integers nums, every element appears twice except for one.
 * Find that single one.
 * 
 * Follow up: Could you implement a solution with a linear runtime complexity and without
 * using extra memory?
 * 
 * Example 1:
 *  Input: nums = [2,2,1]
 *  Output: 1
 * 
 * Example 2:
 *  Input: nums = [4,1,2,1,2]
 *  Output: 4
 * 
 * Example 3:
 *  Input: nums = [1]
 *  Output: 1
 * 
 * Constraints:
 *  1 <= nums.length <= 3 * 104
 *  -3 * 104 <= nums[i] <= 3 * 104
 *  Each element in the array appears twice except for one element which appears only once.
 */

/**
 * Solution: Bitwise manipulation
 * Use XOR operator
 * 1 XOR 1 = 0
 * 0 XOR 0 = 0
 * 1 XOR 0 = 1
 * 0 XOR 1 = 1
 * since each integer (except one) occurs twice, the second occurrence of each integer will
 * cancel out the first occurrence from the current XOR output.
 * The single occurrence integer will be the final ouput since it does not have a matching
 * integer to cancel it out.
 * 
 * Example (represented as bits):
 *  [1011, 1010, 0010, 1011, 1010, 0010, 0001]
 *  1011 x2
 *  1010 x2
 *  0010 x2
 *  0001 x1 (expected answer)
 * 
 *          1011  0001  0011  1000  0010  0000
 *     xor  1010  0010  1011  1010  0010  0001
 *  output  0001  0011  1000  0010  0000  0001
 * 
 *  answer: 0001
 * 
 * @param {number[]} nums - array of integers that all occur exactly twice except one
 */
const singleNumber = nums => {
  let a = 0;
  for (let i of nums) {
    a ^= i;
  }

  return a;
}