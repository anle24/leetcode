/**
 * 31. Next Permutation
 * Difficulty: Medium
 *
 * Implement next permutation, which rearranges numbers into the lexigraphically next greater permutation of numbers.
 * If such arrangement is not possible, it must rearrange it as the lowest possible order (ie, sorted in ascending order).
 * The replacement must be in-place and use only constant extra memory.
 *
 * Here are some examples. Inputs are in the left-hand column and its corresponding outputs are in the right-hand column.
 * 1, 2, 3 -> 1, 3, 2
 * 3, 2, 1 -> 1, 2, 3
 * 1, 1, 5 -> 1, 5, 1
 */

/**
 * Solution
 */
const nextPermutation = (nums) => {
  const swap = (i, j) => {
    [nums[i], nums[j]] = [nums[j], nums[i]];
  };

  const reverse = (idx) => {
    let start = idx;
    let end = nums.length - 1;

    while (start < end) {
      swap(start, end);
      start++;
      end--;
    }
  };

  const nextLarge = (idx) => {
    for (let i = nums.length - 1; i > idx; i--) {
      if (nums[i] > nums[idx]) return i;
    }
  };

  // searching from right(end of nums) to left
  for (let i = nums.length - 1; i >= 0; i--) {
    // find first decreasing num from right
    if (nums[i] < nums[i + 1]) {
      // find next larger value from i
      const large = nextLarge(i);
      // swap the two values
      swap(i, large);
      /**
       * everything to the right of i should be in descending order
       * since i was the first element to be smaller than the element
       * to its right.
       * so reversing everything to the right should sort them in
       * ascending order, which would complete this permutation as the
       * next larger permutation
       */
      reverse(i + 1);
      return nums;
    }
  }

  // if no permutations found, reverse nums
  nums.reverse();
  return nums;
};

console.log(nextPermutation([7, 2, 5, 6, 6, 2, 5, 8, 22, 8, 28, 4, 10, 2]));
