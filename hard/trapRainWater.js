/**
 * 42. Trapping Rain Water
 * Difficulty: Hard
 * 
 * Given n non-negative integers representing an elevetaikon map where the width
 * of each bar is 1, compute how much water is able to trap after raining
 * 
 * 3          _________[ ]   ___
 * 2    ___[ ]         [ ][ ]   [ ]
 * 1 [_]___[_][_]___[_][_][_][_][_][_]
 * 0
 * 
 * The above elevation map is represnted by array [0,1,0,2,1,0,1,3,2,1,2,1].
 * In this case, 6 units of rain water (blue section) are being trapped.
 * 
 * Example:
 *  Input: [0,1,0,2,1,0,1,3,2,1,2,1]
 *  Output: 6
 */

/**
 * Solution #1:
 * Keeping track of max potential water level coming from left and right
 * Then getting the min at each index between left & right water levels
 * Then adding the difference between these min and the values of height at each index to the sum
 * We need to subtract the values of height to exclude the "solid blocks" which will then
 * just give us the amount of water
 * @param {number[]} height 
 */
const trap = (height) => {
    if (height === null) return 0;

    let totalWater = 0;
    let length = height.length;
    let leftMax = [];
    let rightMax = [];
    leftMax[0] = height[0];

    for (let i = 1; i < length; i++) {
        leftMax[i] = Math.max(height[i], leftMax[i - 1]);
    }

    rightMax[length - 1] = height[length - 1];

    for (let i = length - 2; i >= 0; i--) {
        rightMax[i] = Math.max(height[i], rightMax[i + 1]);
    }

    for (let i = 1; i < length - 1; i++) {
        totalWater += Math.min(leftMax[i], rightMax[i]) - height[i];
    }

    return totalWater;
}
/**
 * Time Complexity: O(n) - 3 consecutive for loops (non-nested)
 * Space Complexity: O(n) - we construct 2 arrays of n elements
 */

// console.log(trap([0,1,0,2,1,0,1,3,2,1,2,1]))

/**
 * Solution #2:
 * 2 Pointers
 * Use a left and right pointer
 * if height[left] < height[right]
 *  Update leftMax if current left value is >= leftMax
 *  else, add leftMax - height[left] to sum
 *  increment left
 * else (if height[left] >= height[right])
 *  Update rightMax if current right value is >= rightMax
 *  else, add rightMax - height[right] to sum
 */
const trapWater = (height) => {
    let left = 0;
    let right = height.length - 1;
    let leftMax = 0;
    let rightMax = 0;
    let sum = 0;
    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) {
                leftMax = height[left];
            } else {
                sum += leftMax - height[left]
            }
            left++;
        } else {
            if (height[right] >= rightMax) {
                rightMax = height[right];
            } else {
                sum += rightMax - height[right];
            }
            right--;
        }
    }
    return sum;
}
console.log(trapWater([0,1,0,2,1,0,1,3,2,1,2,1]));