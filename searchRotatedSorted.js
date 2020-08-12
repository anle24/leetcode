/**
 * 33. Search in Rotated Sorted Array
 * Diffculty: Medium
 * 
 * Suppose an array sorted in ascending order is rotated at some pivot point unknown to you beforehand.
 * (i.e., [0, 1, 2, 4, 5, 6, 7] might become [4, 5, 6, 7, 0, 1, 2]).
 * You are given a target value to search. If found in the array return its index, otherwise return -1.
 * You may assume no duplicate exists in the array.
 * Your algorithm's runtime complexity must be in the order of O(log n);
 * 
 * Example 1:
 *  Input: nums = [4, 5, 6, 7, 0, 1, 2], target = 0
 *  Outut: 4
 * 
 * Example 2:
 *  Input: nums = [4, 5, 6, 7, 0, 1, 2], target = 3
 *  Output: -1
 */

/**
 * Solution:
 * Use binary search. Whenever you split a rotated sorted array, one side will ALWAYS be sorted.
 * [4, 5, 6, 7, 1, 2] => ( [4, 5, 6] ) [7, 1, 2]
 * [7, 1, 2, 3, 4, 5] => [7, 1, 2] ( [3, 4, 5] )
 * Check which side is sorted, and then check if target is within the sorted side's bounds
 * If it is not, then it is on the other side
 * Continue splitting the subarrys and checking the sorted side until the midpoint of the subarray is target
 * or we are out of bounds
 */
const search = (nums, target) => {
    console.log({nums, target});
    let left = 0;
    let right = nums.length - 1;

    while (left <= right) {
        console.log('new subarray iteration', nums.slice(left, right + 1));
        let mid = Math.floor((left + right) / 2);
        console.log('mid', { index: mid, value: nums[mid] });

        if (nums[mid] === target) {
            console.log('target found at', mid);
            return mid;
        }

        if (nums[left] <= nums[mid]) {
            console.log('left is sorted', nums.slice(left, mid + 1));
            if (nums[left] <= target && target <= nums[mid]) {
                console.log('target within left side bounds, moving right to mid - 1')
                right = mid - 1;
            } else {
                console.log('target must be on right side, moving left to mid + 1')
                left = mid + 1;
            }
        } else {
            console.log('right is sorted', nums.slice(mid, right + 1));
            if (nums[mid] <= target && target <= nums[right]) {
                console.log('target within right side bounds, moving left to mid + 1')
                left = mid + 1;
            } else {
                console.log('target must be on left side, moving right to mid - 1')
                right = mid - 1;
            }
        }
    }
    console.log('target not found');
    return - 1
};

const array1 = [3, 4, 5, 6, 7, 1, 2];
const array2 = [6, 7, 1, 2, 3, 4, 5];
const array3 = [1, 2, 3, 4, 5, 6, 7];

const arrays = [array1, array2, array3];
arrays.forEach(array => search(array, 3));
