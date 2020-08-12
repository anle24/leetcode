/**
 * 55. Jump Game
 * Difficulty: Medium
 * 
 * Given an array of non-negative integers, you are initially positioned at the first index of the array.
 * Each element in the array represents your maximum jump length at that position.
 * Determine if you are able to reach the last index.
 */

const canJump = nums => {
    let max = 0;

    for (let i = 0; i < nums.length; i++) {
        console.log(nums, {i, value: nums[i], max});
        if (max < i) {
            console.log('max < i', max, i)
            return false;
        }
        console.log('compare', max, i + nums[i]);
        max = Math.max(max, i + nums[i]);
    }

    return true;
}

const nums1 = [2,3,1,1,4];
const nums2 =  [3,2,1,0,4];

canJump(nums1);
canJump(nums2);