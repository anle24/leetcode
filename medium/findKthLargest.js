/**
 * 215. Kth Largest Element in an Array
 * Difficulty: Medium
 * 
 * Find the kth largest element in an unsorted array.
 * Note that it is the kth largest element in the sorted order,
 * not the kth distinct element.
 * 
 * Example 1:
 *  Input: [3, 2, 1, 5, 6, 4] and k = 2
 *  Output: 5
 * 
 * Example 2:
 *  Input: [3, 2, 3, 1, 2, 4, 5, 5, 6] and k = 4
 *  Output: 4
 */

/**
 * Using partitioning subroutine from Quicksort to iteratively get items to their "final resting place" 
 * in the final sorted array. Eventually one of these will be the kth largest element's position.
 * We then have found the answer
 * 
 * We skip half the work on each recursion because we only need to quicksort the half that num - k is in
 * So after each recurrence, we find the final resting spot of the selected pivot, with each side of it
 * not necessarily completely sorted. If the index of the pivot's final position is < the index num - k,
 * then the final value of index num - k is somewhere to the right of the last pivot. We do not have to
 * bother sorting or dealing with the left side at all, and vice versa, with each recurrence.
 * 
 * @param {Array<number>} nums 
 * @param {number} k
 * @return {number} 
 */
const findKthLargest = (arr, k) => {
  const n = arr.length;
  let left = 0;
  let right = n - 1;

  while (left <= right) {
    // get random pivot index so that on average, we don't get smallest/largest value
    const choosenPivotIndex = getRandomInt(left, right);
    console.log('chosenPivotIndex:', choosenPivotIndex);

    const finalIndexOfChoosenPivot = partition(arr, left, right, choosenPivotIndex);

    if (finalIndexOfChoosenPivot == n - k) {
      console.log(`finalIndexOfChoosenPivot${finalIndexOfChoosenPivot} == n:${n} - k:${k}!!`);
      console.log('We have found the value that will sit at n - k, so we can skip the rest of the work...');
      return arr[finalIndexOfChoosenPivot];
    } else if (finalIndexOfChoosenPivot > n - k) {
      console.log(`finalIndexOfChoosenPivot${finalIndexOfChoosenPivot} > n:${n} - k:${k}...`);
      console.log(`so n:${n} - k:${k} is somewhere to the left, so set right to finalIndexOfChoosenPivot${finalIndexOfChoosenPivot} - 1...`);
      right = finalIndexOfChoosenPivot - 1;
    } else {
      console.log(`finalIndexOfChoosenPivot${finalIndexOfChoosenPivot} < n:${n} - k:${k}...`);
      console.log(`so n:${n} - k:${k} is somewhere to the right, so set left to finalIndexOfChoosenPivot${finalIndexOfChoosenPivot} + 1...`);
      left = finalIndexOfChoosenPivot + 1;
    }
  }

  return -1;
}

const partition = (arr, left, right, pivotIndex) => {
  console.log('partitioning...');
  console.log('arr:', arr);
  console.log('left:', left);
  console.log('right:', right);
  console.log('pivotIndex:', pivotIndex);
  const pivotValue = arr[pivotIndex];
  console.log(`pivotValue... arr[${pivotIndex}] : ${pivotValue}`);
  let lesserItemsTailIndex = left;
  console.log('initiate lesserItemsTailIndex as left :', lesserItemsTailIndex);

  console.log(`swapping arr[pivotIndex](arr[${pivotIndex}]) with arr[right](arr[${right}])...`);
  console.log(arr);
  swap(arr, pivotIndex, right);
  console.log('to...', arr);

  console.log('iterating through partition...');
  for (let i = left; i < right; i++) {
    console.log(`checking if arr[${i}]:${arr[i]} < pivotValue:${pivotValue}...`);
    if (arr[i] < pivotValue) {
      console.log(`IT IS! now swap [${i}] with lesserItemsTailIndex:[${lesserItemsTailIndex}]`);
      swap(arr, i, lesserItemsTailIndex);
      console.log(`lesserItemsTailIndex++ : ${lesserItemsTailIndex + 1}`);
      lesserItemsTailIndex++;
      console.log(arr);
    }
  }

  console.log(`swap right index:${right} back with lesserItemsTailIndex:${lesserItemsTailIndex}`);
  swap(arr, right, lesserItemsTailIndex);
  console.log(arr);

  return lesserItemsTailIndex;
}

const swap = (arr, first, second) => {
  const temp = arr[first];
  arr[first] = arr[second];
  arr[second] = temp;
}

// Inclusive of both bounds
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const input1 = [3, 2, 1, 5, 6, 4];
const k1 = 2;
// expected output: 5

const input2 = [3, 2, 3, 1, 2, 4, 5, 5, 6];
const k2 = 4;
// expected output: 4

console.log(findKthLargest(input1, k1));
console.log(findKthLargest(input2, k2));