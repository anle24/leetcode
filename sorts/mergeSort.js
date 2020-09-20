/**
 * Merge Sort
 * 
 * Merge sort is a divide-and-conquer fast-sorting algorithm.
 * 
 * It is characterized by 2 major subroutines:
 *  - split(T[] arr):               The split subroutine splits an array in half and recursively sorts the left and right halves
 *                                  They are later merged in the merge subroutine
 * 
 *  - merge(T[] left, T[] right):   The merge subroutine merges two sorted sequences in O(len(left) + len(right)) time
 *                                  (overarchingly O(n) time with respect to the original input size)
 * 
 * Merge sort satisfies the recurrence T(n) = 2T(n/2) + O(n). Consequently, it bounds to the order of O(n * log n) for time
 */

/**
 * @param {ListNode} head 
 * @return {ListNode}
 */
const mergesort = head => {
  if (head == null || head.next == null) return head;

  const mid = getMiddleAndSplitInHalf(head);

  const leftHalf = mergeSort(head);
  const rightHalf = mergeSort(mid);

  return mergesort(leftHalf, rightHalf);
}

const merge = (l1Pointer, l2Pointer) => {
  const dummyHead = new ListNode(0);
  let endOfSortedList = dummyHead;

  while (l1Pointer != null && l2Pointer != null) {
    if (l1Pointer.val < l2Pointer.val) {
      endOfSortedList.next = l1Pointer;
      l1Pointer = l1Pointer.next;
    } else {
      endOfSortedList.next = l2Pointer;
      l2Pointer = l2Pointer.next;
    }

    endOfSortedList = endOfSortedList.next;
  }

  if (l1Pointer != null) {
    endOfSortedList.next = l1Pointer;
  }

  if (l2Pointer != null) {
    endOfSortedList.next = l2Pointer;
  }

  return dummyHead.next;
}

const getMiddleAndSplitInHalf = head => {
  let prev = null;
  let slow = head;
  let fast = head;

  while (fast != null && fast.next != null) {
    prev = slow;

    slow = slow.next
    fast = fast.next.next;
  }

  prev.next = null;

  return slow;
}