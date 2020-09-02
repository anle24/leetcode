/**
 * 29. Divide Two Integers
 * Difficulty: Medium
 *
 * Given two integers dividend and divisor, divide two integers without using multiplication, division, and mod operator.
 * Return the quotient after dividing dividend by divisor.
 * The integer division should truncate toward zero, which means losing its fractional part.
 * For example, truncate(8.345) = 8 and truncate(-2.7335) = -2.
 *
 * Example 1:
 *  Input: dividend = 10, divisor = 3
 *  Output: 3
 *  Explanation: 10/3 = truncate(3.33333..) = 3.
 *
 * Example 2:
 *  Input: dividend: 7, divisor = -3
 *  Output: -2
 *  Explanation: 7/-3 = truncate(-2.3333..) = -2
 *
 * Note:
 *  Both dividend and divisor will be 32-bit signed integers.
 *  The divisor will never be 0.
 *  Assume we are dealing with an environment which could only store integers within the 32-bit signed integer range: [−231,  231 − 1].
 *  For the purpose of this problem, assume that your function returns 231 − 1 when the division result overflows.
 */

/**
 * Brute Force
 */
const divideOne = (dividend, divisor) => {
  // Constants for 32bit integer range
  const MAX_INT = 2147483647; // 2^31 - 1
  const MIN_INT = -2147483648; // -2^31

  // Special case: overflow
  if (dividend == MIN_INT && DIVISOR == -1) {
    return MAX_INT;
  }

  /**
   * Because Math.abs() causes overflow, we need to use -(negative number)
   * But since our positive range is 2^31 - 1, and our negative range is -2^31, -(-2^31) = 2^31, which is out of our positive range (2^31 > 2^31 - 1)
   * So instead, we will work with all negatives instead, since our negative range is greater
   * Also, we count number of negatives between dividend and divisor (0 - 2)
   * Since we are checking if they are positive, so we can make that negative, then we count down negatives starting from 2
   */
  let negatives = 2;
  if (dividend > 0) {
    negatives--;
    dividend = -dividend;
  }
  if (divisor > 0) {
    negatives--;
    divisor = -divisor;
  }

  // Count how many times the divisor has to be added to get to the dividend (quotient)
  let quotient = 0;
  while (dividend - divisor <= 0) {
    quotient--;
    dividend -= divisor;
  }

  // If there was originally only 1 negative between the two, then the quotient remains negative. Otherwise, it will be positive
  return negatives == 1 ? quotient : -quotient;
};
/**
 * Time Complexity: O(n) - worst case divisor = 1, so any dividend will need be to subtracted by 1 n times
 * Space Complexity: O(1) - only use fixed number of integer variables} dividend
 */

/**
 * Repeated Exponential Searches
 * Double the divisor until it no longer fits in the dividend.
 * Then repeat for the remainder.
 */
const divideTwo = (dividend, divisor) => {
  // Constants
  const MAX_INT = 2147483647; // 2^31 - 1
  const MIN_INT = -2147483648; // -2^31
  const HALF_MIN_INT = -1073741824; // MIN_INT / 2

  // Special case: overflow
  if (dividend == MIN_INT && divisor == -1) {
    return MAX_INT;
  }

  // Convert both numbers to negatives and count number of negative signs between the two
  let negatives = 2;
  if (dividend > 0) {
    negatives--;
    dividend = -dividend;
  }
  if (divisor > 0) {
    negatives--;
    divisor = -divisor;
  }

  let quotient = 0;
  /**
   * Once the divisor is bigger than the current dividend,
   * we can't fit any more copies of the divisor into it anymore
   */
  while (divisor >= dividend) {
    /**
     * We know it'll fit at least once since dividend >= divisor (in reverse above because negatives)
     * Note: We use a negative powerOfTwo as it's possible we might have the case divide(INT_MIN, -1)
     */
    let powerOfTwo = -1;
    let value = divisor;

    /**
     * Check if double the current value is too big. If not, continue doubling.
     * If it is too big, stop doubling and contine with next step
     */
    while (value >= HALF_MIN_INT && value + value >= dividend) {
      value += value;
      powerOfTwo += powerOfTwo;
      console.log("value:", value);
      console.log("powerOfTwo:", powerOfTwo);
    }

    // We have been able to subtract divisor another powerOfTwo times.
    quotient += powerOfTwo;
    console.log("quotient:", quotient);

    // Remove value so far so that we can continue the process with the remainder
    console.log(
      "dividend - value:",
      `${dividend} - ${value}`,
      dividend - value
    );
    dividend -= value;
  }

  // If only one number was negative, then quotient remains negative. Otherwise, positive
  return negatives == 1 ? quotient : -quotient;
};
/**
 * Time Complexity: O(log^2 n)
 *  - Exponential search to find biggest number that fits into current dividend: O(log n)
 *  - Updated dividend by subtracting the biggest number found. Worst case, we are left with dividend that is slightly < half previous dividend
 *    With dividend at least halving after each one, at most O(log n)
 *  - Combined worst case: O((log n) * (log n)) = O(log^2 n)
 * Space Complexity: O(1) - constant number of single value variables are used
 */

console.log(divideTwo(541345, 2345));
