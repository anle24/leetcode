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

/**
 * Solution:
 * Dynamic Programming
 * At each step, you can choose to reach 2 steps above by taking 1 step two times,
 * or climbing 2 steps at once.
 * This means that to get the number of ways (combinations) to get to any given step,
 * you add together the number of ways to get to previous step and the number of ways
 * to get to the step below that.
 * 
 * Step 1: only 1 combination (take 1 step)
 * Step 2: 2 combinations (take 1 step 2x, take 2 steps)
 * Step 3: take 1 step from Step 2, or take 2 steps from Step 1
 *         so Step 1 combinations + Step 2 combinations
 * Step N: array[(N - 1) - 1] + array[(N - 1) - 2]
 *         (since indexing at 0)
 * 
 * @param {number} n - number of steps
 */
const climbStairs = (n) => {
  if (n === 0) return 0;
  if (n === 1) return 1;
  if (n === 2) return 2;

  // initialize solution array, only 1 way to get to step 1 (index 0), 2 ways to get to step 2 (index 1)
  const array = [1, 2];

  for (let i = 2; i < n; i++) {
    array[i] = array[i - 1] + array[i - 2];
  }

  return array[n - 1];
};