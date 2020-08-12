/*
88. Merge Sorted Array
Difficulty: Easy

Given two sorted integer arrays nums1 and nums2, merge nums2 into nums1 as one sorted array.

Note:

The number of elements initialized in nums1 and nums2 are m and n respectively.
You may assume that nums1 has enough space (size that is equal to m + n) to hold additional elements from nums2.
Example:

Input:
nums1 = [1,2,3,0,0,0], m = 3
nums2 = [2,5,6],       n = 3

Output: [1,2,2,3,5,6]
 

Constraints:

-10^9 <= nums1[i], nums2[i] <= 10^9
nums1.length == m + n
nums2.length == n
*/

const mergeSorted = (nums1, nums2) => {
    if (!nums1.length) return nums2;
    if (!nums2.length) return nums1;
    let i = 0;
    while (nums2.length > 0 || i < nums1.length) {
        if (nums2[0] <= nums1[i]) {
            nums1.splice(i, 0, nums2[0]);
            nums2.shift();
        }
        i++;
    }
    return nums1.concat(nums2);
}

const array1 = [1,4,6,7,9, 10, 50, 53];
const array2 = [2,3,4,6,7,8];

console.log(mergeSorted(array1, array2));