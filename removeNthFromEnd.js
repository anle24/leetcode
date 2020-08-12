/**
 * 19. Remove Nth Node from End of List
 * Difficulty : Medium
 * 
 * Given a linked list, remove the n-th node from the end of list and return its head.
 * 
 * Example:
 *  Given linked list: 1->2->3->4->5, and n = 2.
 *  After removing the second node from the end, the linked list becomes 1->2->3->5.
 * 
 * Note:
 *  Given n will always be valid.
 * 
 * Follow up:
 *  Could you do this in one pass?
 */

/**
 * Solution:
 * 1. To remove n-th node from the end, send node "hare" as far as n
 * 2. Move node "curr" and "hare" at same speed until hare reaches last node
 * 3. Since "curr" and "hare" has gap of n nodes, "curr" is n+1-th node from the end while "hare" is 1 node from the end
 *    So remove n-th node by pointing curr.next to curr.next.next
 * 
 * Edge case:
 * n is same length as linked list
 * - we need to remove first element instead of removing curr.next
 * - in this case, "hare" would be null because last element of list points to null
 */
const removeNthFromEnd = (head, n) => {
    
    // handle edge cases
    if (n <= 0) {
        return head;
    }

    /* Move fast forward by n-1 nodes. If fast lands on null,
    that means n is larger than the list's length. In that case,
    return the list as is */
    let fast = head;
    for (let i = 0; i <= n - 1; i++) {
        fast = fast.next;

        if (fast === null) {
            return head
        }
    }

    // set slow pointer to null outside of list
    let slow = null;

    // move both pointers forward until we reach last node
    while (fast.next !== null) {
        fast = fast.next;

        // on first iteration, set slow to head
        slow = slow === null ? head : slow.next;
    }

    // if while loop is never executed, then that means n = length of list
    // so remove head by returning head.next
    if (slow === null) {
        return head.next;
    }

    // otherwise, remove value at slow.next
    slow.next = slow.next.next;

    return head;
}

/*

*/