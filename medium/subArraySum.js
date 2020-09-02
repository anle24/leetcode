/**
 * 560. Subarray Sum Equals K
 * Difficulty: Medium
 *
 * Given an array of integers and an integer k, you need to find the total number of
 * continuous subarrays whose sum equals to k
 *
 * Example 1:
 *  Input: nums = [1, 1, 1], k = 2
 *  Output: 2
 */

/**
 * O(n) Single Traversal Solution:
 *  important concept - to get the sum of a subarray between i and j (with i < j),
 *  you can subtract the cumulative sum at i from the cumulative sum at j
 *  So if we want to find subarrays whose sums == target, then we are checking
 *  cumulative sum @ j - cumulative sum @ i == target
 *
 *  As we traverse the array:
 *    - we calculate the cumulative sum at current index
 *    - we store how many times a cumulative sum has occurred so far in a map
 *    - we check our map for our cumulative sum @ current index - target k
 *      if it exists in the map, that means at some index(es) before current index
 *      we had a cumulative sum that can be subtracted from the current total cumulative
 *      sum to get target k, aka the sum of the subarray(s) from that previous index(es)
 *      to the current index equals target k
 *      so we add to the counter the map's count for that target cumulative sum
 */
const subarraySum = (nums, k) => {
  console.log(nums);
  let map = new Map();
  let sum = 0;
  let count = 0;
  map.set(0, 1);
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
    console.log(sum);
    if (map.has(sum - k)) count += map.get(sum - k);
    if (map.has(sum)) map.set(sum, map.get(sum) + 1);
    else map.set(sum, 1);
    console.log(map);
  }
  return count;
};

// console.log(subarraySum([1, 1, 1], 2));

const randoArray = () => {
  const count = 10;
  let array = [];
  for (let i = 0; i < count; i++) {
    const positive = Math.round(Math.random());
    const int = Math.floor(Math.random() * 10);
    const number = positive ? int : int * -1;
    array.push(number);
  }

  return array;
};

// console.log(randoArray());
const array1 = randoArray();
const array2 = randoArray();
console.log(subarraySum(array1, 2));
console.log(subarraySum(array2, 2));
