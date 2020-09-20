/**
 * 11. Container with Most Water
 * Difficulty: Medium
 *
 * Given n non-negative integers a1, a2, ..., an , where each represents a point at coordinate (i, ai).
 * n vertical lines are drawn such that the two endpoints of line i is at (i, ai) and (i, 0).
 * Find two lines, which together with x-axis forms a container, such that the container contains the most water.
 *
 * Note: You may not slant the container and n is at least 2.
 *
 * Example:
 *  Input: [1,8,6,2,5,4,8,3,7]
 *  Output: 49
 *
 * 8        x                   x
 * 7        x-------------------x-------x
 * 6        x   x               x       x
 * 5        x   x       x       x       x
 * 4        x   x       x   x   x       x
 * 3        x   x       x   x   x   x   x
 * 2        x   x   x   x   x   x   x   x
 * 1    x   x   x   x   x   x   x   x   x
 * 0---------------------------------------
 */

/**
 * Solution: Start from each end of array
 * Calculate area, then compare left vs right
 * The shorter of the two is the limiting factor
 * for potential area
 * If left is shorter, move left + 1
 * If right is shorter, move right -1
 * Calculate area, compare with current max, repeat
 */
const maxArea = (height) => {
  let max = 0;
  let i = 0;
  let j = height.length - 1;

  while (i < j) {
    const min = Math.min(height[i], height[j]);
    max = Math.max(max, min * (j - i));
    if (height[i] < height[j]) {
      i++;
    } else {
      j--;
    }
  }

  return max;
};

/**
 * Time Complexity: O(n) single pass
 * Space Complexity: O(1) constant space
 */

const height1 = [1, 8, 6, 2, 5, 4, 8, 3, 7];
console.log(maxArea(height1));