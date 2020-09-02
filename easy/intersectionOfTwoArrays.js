/**
 * 349. Intersection of Two Arrays
 * Difficulty: Easy
 *
 * Given two arrays, write a function to compute their intersection
 */

const intersection = (nums1, nums2) => {
  let setNum1 = new Set(nums1);

  return [...new Set(nums2.filter((num) => setNum1.has(num)))];
};
