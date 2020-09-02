/**
 * Quicksort
 *
 * Quicksort is a fast-sorting algorithm that runs under the time-bound O(n * log n).
 *
 * Quicksort is characterized by two major subroutines:
 *
 *  - split(T[] arr):         This splits the array into two halves (often roughly halves) around a value called a pivot.
 *                            The partition subroutine will return this "pivot" value and split(T[] arr) will be called
 *                            on the left and right halves
 *
 *  - partition(int arr[]):   This will "partition" (or split) the array into 2 sections around a value called a pivot.
 *                            All values <= the pivot in the left and all values > than the pivot in the right half.
 *                            This will mean that the pivot will rest in its final sorted position after pivoting finishes.
 *
 * Quicksort relies on getting the "pivot" to its final position in the final sorted sequence.
 *
 * There are many variants of Quicksort that choose the pivot value in different ways. Some choose:
 *  - left-most element always
 *  - right-most element always
 *  - middle element always
 *  - random element always
 *  - mix of above 4 strategies at set increments
 *
 * Despite the many variants, the core principles that characterize Quicksort remain the same
 */

/**
 * Quicksort
 * @param {Array<number>} arr
 * @return {Array<number>}
 */
export const quicksort = (arr) => {
  // start with full length of the array
  quicksortHelper(arr, 0, arr.length - 1);

  return arr;
};

const quicksortHelper = (arr, left, right) => {
  if (left < right) {
    console.log(arr);
    const pivotFinalRestingPosition = partition(arr, left, right);

    // recursively quicksort each side of the last established pivot
    quicksortHelper(arr, left, pivotFinalRestingPosition - 1);
    quicksortHelper(arr, pivotFinalRestingPosition + 1, right);
  }
};

const partition = (arr, left, right) => {
  // utilizing right-most element as pivot strategy
  const pivot = arr[right];

  /**
   * i keeps track of the index of the last element less than the pivot that
   * was swapped to the left side we initialize i as index before left bound
   */
  let i = left - 1;

  // j is our iterating pointer to the index we want to compare to pivot
  for (let j = left; j < right; j++) {
    if (arr[j] <= pivot) {
      /**
       * if the element at j is less than the pivot, we move our pointer i
       * (which was the index of our last swap) to the next index (i++)
       * then swap the element at j with the element at i, so i now points
       * again to our new latest swap
       */
      i++;
      swap(arr, i, j);
    }
    // do nothing except move pointer j if value > pivot
  }

  /**
   * finally, since everything to the left of i (inclusive) is <= pivot
   * and everything to the right of i (except the right-most index,
   * pivot's index) is > pivot, then we swap the pivot at index right
   * with i + 1 so that we effectively place pivot in between everything
   * less than it (left side) and everything greater than it (right side)
   */
  swap(arr, i + 1, right);

  return i + 1;
};

const swap = (arr, first, second) => {
  const temp = arr[first];
  arr[first] = arr[second];
  arr[second] = temp;
};

const arr1 = [1, 4, 67, 2, 6, 9, 34, 67, 9, 3, 6, 7, 23, 5];
console.log(quicksort(arr1));
