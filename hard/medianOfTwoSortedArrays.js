/**
 * 4. Median of Two Sorted Arrays
 * Difficulty: Hard
 *
 * There are two sorted arrays nums1 and nums2 of size m and n respectively.
 *
 * Find the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).
 *
 * You may assume nums1 and nums2 cannot be both empty.
 *
 * Example 1:
 *  nums1 = [1, 3]
 *  nums2 = [2]
 *  The median is 2.0
 *
 * Example 2:
 *  nums1 = [1, 2]
 *  nums2 = [3, 4]
 *  The median is (2 + 3)/2 = 2.5
 */

// javascript concat + sort + median
const concatSortMedian = (nums1, nums2) => {
  console.log("");
  console.log("Executing concatSortMedian()...");
  const merged = nums1.concat(nums2);
  const sorted = merged.sort((a, b) => a - b);
  const index = Math.floor(sorted.length / 2);
  console.log("Merged:", merged);
  console.log("Sorted:", sorted);
  console.log("nums1.length:", nums1.length);
  console.log("nums2.length:", nums2.length);
  console.log("sorted.length:", sorted.length);
  console.log("Middle index:", index);
  let result;
  if (sorted.length % 2 === 0) {
    result = (sorted[index - 1] + sorted[index]) / 2;
    console.log("sorted.length is even...");
    console.log(`sorted[${index}] + sorted[${index} + 1] / 2`);
    console.log(`${sorted[index]} + ${sorted[index + 1]} = ${result}`);
  } else {
    result = sorted[index];
    console.log("sorted.length is odd...");
    console.log(`sorted[${index}] = ${result}`);
  }
  return result;
};

// my answer
var findMedianSortedArrays1 = function (nums1, nums2) {
  const merged = [];
  let i = 0;
  let j = 0;
  while (nums1[i] || nums2[j]) {
    if (!nums1[i] && nums2[j]) {
      merged.push(nums2[j]);
      j++;
    } else if (nums1[i] && !nums2[j]) {
      merged.push(nums1[i]);
      i++;
    } else if (nums1[i] < nums2[j]) {
      merged.push(nums1[i]);
      i++;
    } else if (nums1[i] > nums2[j]) {
      merged.push(nums2[j]);
      j++;
    } else if (nums1[i] === nums2[j]) {
      merged.push(nums1[i]);
      merged.push(nums2[j]);
      i++;
      j++;
    }
  }

  console.log(merged);

  if (merged.length % 2 === 0) {
    const med1 = merged[merged.length / 2 - 1];
    const med2 = merged[merged.length / 2];
    console.log("even array");
    return med1 / med2;
  } else {
    console.log("odd array");
    return merged[Math.floor(merged.length / 2).toFixed(0)];
  }
};

const generateArray = () => {
  const numValues = Math.ceil(Math.random() * 10);
  const array = [];
  for (let i = 0; i < numValues; i++) {
    const value = Math.floor(Math.random() * 100);
    array.push(value);
  }
  return array.sort((a, b) => a - b);
};

const array1 = generateArray();
const array2 = generateArray();

console.log("");
console.log("Generating array1...", array1);
console.log("Generating array2...", array2);

// console.log(findMedianSortedArrays1(array1, array2));

// leetcode answer
const findMedianSortedArrays2 = (nums1, nums2) => {
  console.log("");
  console.log("Executing findMedianSortedArrays2...");
  let totalLength = nums1.length + nums2.length;
  let idx1 = 0;
  let idx2 = 0;
  let current;
  let last;

  /* iterate to the middle index of the totalLength
    where the median is expected to be */
  while (idx1 + idx2 <= totalLength / 2) {
    if (current !== undefined) {
      last = current;
    }

    let elOne = nums1[idx1];
    let elTwo = nums2[idx2];

    if (elOne === undefined) {
      console.log("no more elements in nums1, iterating through nums2");
      current = elTwo;
      idx2++;
    } else if (elTwo === undefined) {
      console.log("no more elements in nums2, iterating through nums1");
      current = elOne;
      idx1++;
    } else if (elOne < elTwo) {
      console.log(
        `elOne(${elOne}) < elTwo(${elTwo}), so current=${elOne} and idx1++`
      );
      current = elOne;
      idx1++;
    } else {
      console.log(
        `elOne(${elOne}) > elTwo(${elTwo}), so current=${elTwo} and idx2++`
      );
      current = elTwo;
      idx2++;
    }
  }

  console.log("Finished iterating...");
  let result;
  if (totalLength % 2 === 0) {
    result = (last + current) / 2;
    console.log(
      `totalLength is even, so result = ${last} + ${current} / 2 = ${result}`
    );
  } else {
    result = current;
    console.log(`totalLength is odd, so result = ${current}`);
  }

  return totalLength % 2 === 0 ? (last + current) / 2 : current;
};

const answer = findMedianSortedArrays2(array1, array2);
const control = concatSortMedian(array1, array2);
console.log(answer);
console.log(control);
console.log("Pass test:", answer == control);