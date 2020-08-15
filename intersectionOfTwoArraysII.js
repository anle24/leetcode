/**
 * 350. Intersection of Two Arrays II
 * Difficulty: Easy
 *
 * Given two arrays, write a function to compute their intersection.
 *
 * Note:
 *  Each element in the result should appear as many times as it shows in both arrays
 *  The result can be in any order
 */

const intersect = (nums1, nums2) => {
  const map = new Map();
  let res = [];

  for (let i = 0; i < nums1.length; i++) {
    if (map[nums1[i]]) {
      map[nums1[i]]++;
    } else {
      map[nums1[i]] = 1;
    }
  }

  for (let i = 0; i < nums2.length; i++) {
    if (map[nums2[i]] && map[nums2[i]] > 0) {
      res.push(nums2[i]);
      map[nums2[i]]--;
    }
  }

  return res;
};
