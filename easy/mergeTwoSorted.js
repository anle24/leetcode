/**
 * 21. Merged Two Sorted Lists
 * Difficulty: Easy
 *
 * Merge two sorted linked lists and return it as a new sorted list. The new list should be made splicing together the nodes of the first two lists.
 *
 * Example:
 *  Input: 1 -> 2 -> 4, 1 -> 3 -> 4
 *  Output: 1 -> 1 -> 2 -> 3 -> 4 -> 4->
 */

const mergeTwoLists = (l1, l2) => {
  const mergedHead = new ListNode(-1);
  let current = mergedHead;

  while (l1 && l2) {
    if (l1.val > l2.val) {
      current.next = l2;
      l2 = l2.next;
    } else {
      current.next = l1;
      l1 = l1.next;
    }

    current = current.next;
  }

  // if either no longer exists, point current to remainder of existing list
  current.next = l1 || l2;

  return mergedHead.next;
};
