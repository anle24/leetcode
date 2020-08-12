/**
 * 70. Climb Stairs
 * Difficulty: Easy
 * 
 * You are climbing a stair case. It takes n steps to reach to the top.
 * Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top.
 * 
 * Example 1:
 *  Input: 2
 *  Output: 2
 *  Explanation: There are two ways to climb to the top.
 *  1. 1 step + 2 step
 *  2. 2 steps
 * 
 * Example 2:
 *  Input: 3
 *  Output: 3
 *  Explanation: There are three ways to climbg to the top.
 *  1. 1 step + 1 step + 1 step
 *  2. 1 step + 2 steps
 *  2. 2 steps + 1 step
 */

const climbStairs = n => {
    if (n === 0) return 0;
    if (n === 1) return 1;
    if (n === 2) return 2;

    const array = [1, 2];

    for (let i = 2; i < n; i++) {
        array[i] = array[i - 1] + array[i - 2];
    }

    return array[n - 1];
}