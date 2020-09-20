/**
 * 426. Convert Binary Search Tree to Sorted Doubly Linked List
 * Difficulty: Medium
 * 
 * Convert a Binary Search Tree to a Sroted Double-Linked list in place.
 * You can think of the left and right pointers as synonomous to the predecessor and successor points in a doubly-linked list.
 * For a circular doubly linked list, the predecessor of the first element is the last element, and the successor of the last
 * element is the first element.
 * 
 * We want to do the transformation in place. After the transformation, the left pointer of the tree node should point to its
 * predecessor, and the right pointer should point to its successor. You should return the pointer to the smallest element
 * of the linked list.
 * 
 * Example 1:
 *      4
 *     / \
 *    2   5
 *   / \
 *  1   3
 *  Input: root = [4, 2, 5, 1, 3]
 *  Head
 *   => 1 <=> 2 <=> 3 <=> 4 <=> 5 <=
 *   ===============================
 *  Output: [1, 2, 3, 4, 5]
 * 
 * Example 2:
 *  Input: root = [2,1,3]
 *  Output: [1,2,3]
 * 
 * Example 3:
 *  Input: root = []
 *  Output: []
 *  Explanation: Input is an empty tree. Output is also an empty Linked List.
 * 
 * Example 4:
 *  Input: root = [1]
 *  Output: [1]
 */

/**
 * Solution: Recursion
 * In-order:
 *  Each node has 3 steps
 *  1. Go to left, if exists
 *  2. Process node
 *  3. Go to right, if exists
 */
const treeToDoublyList = (root) => {
  if (root == null) return root;

  let head = null;
  let prev = null;
  const dfs = node => {
    // if node doesn't exist, end this recursion and go back to parent
    if (!node) return;

    // 1. go to left
    dfs(node.left);

    // 2. process node
    // initiate head and prev with left-most node
    if (head == null) head = node;
    if (prev == null) prev = node;

    // else if prev exists, connect bi-directionally with current node
    else {
      prev.right = node;
      node.left = prev;
    }

    // set prev to current node
    prev = node;

    // 3. go to right
    dfs(node.right);
  }

  // start recursion with root
  dfs(root);

  // connect final prev (end node) with head
  prev.right = head;
  head.left = prev;

  return head;
}

/**
 * example walkthrough
 * 1. move left
 * 2. process node
 * 3. move right
 * 
 *     (4) root     dfs(node)           recursion stack: dfs([4])
 *     / \          
 *    2   5      1. dfs(node.left)  =>  recursion stack: dfs([2])
 *   / \                                                 dfs([4])
 *  1   3           
 * 
 *      4           dfs([2])
 *     / \          
 *   (2)  5      1. dfs(node.left)  =>  recursion stack: dfs([1])
 *   / \                                                 dfs([2])
 *  1   3                                                dfs([4])
 * 
 *      4           dfs([1])
 *     / \       1. node.left == null, so completed
 *    2   5      2. head == null, so head = [1]      =>   recursion stack: --------> dfs([1]) (1. done, 2. done, 3. done)
 *   / \            prev == null, so prev = [1]                            dfs([2])  (1. done)
 * (1)  3           prev = node (again), prev = [1]                        dfs([4])
 *               3. node.right == null, so completed      head, prev -> [1]
 * 
 *      4           dfs([2])
 *     / \       1. completed                        =>  recursion stack: dfs([3]) just added
 *   (2)  5      2. prev != null, so                                      dfs([2]) (1. done, 2. done, 3. dfs([3]) in progress)
 *   / \            prev.right = node, [1] -> [2]                         dfs([4])
 *  1   3           node.left = prev, [1] <=> [2]
 *                  prev = node, prev = [2]               head     prev
 *               3. dfs(node.right) => dfs([3])            [1] <=> [2]
 * 
 *      4           dfs([3])
 *     / \       1. node.left == null, so completed  =>  recursion stack: ---------> dfs([3]) (1. done, 2. done, 3. done)
 *    2   5      2. prev != null, so                                      ---------> dfs([2]) (1. done, 2. done, 3. dfs([3]) done)
 *   / \            prev.right = node, [2] -> [3]                         dfs([4])
 *  1  (3)          node.left = prev, [2] <=> [3]
 *                  prev = node, prev = [3]              head             prev
 *               3. node.right == null, so completed      [1] <=> [2] <=> [3]
 * 
 *     (4)          dfs([4])
 *     / \       1. completed                        =>  recursion stack: dfs([5]) just added
 *    2   5      2. prev != null,                                         dfs([4]) (1. done, 2. done, 3. dfs([5]) in progress)
 *   / \            prev.right = node, [3] -> [4]
 *  1   3           node.left = prev, [3] <=> [4]
 *                  prev = node, prev = [4]              head                     prev
 *               3. dfs(node.right) => dfs([5])           [1] <=> [2] <=> [3] <=> [4]
 * 
 *      4           dfs([5])
 *     / \       1. node.left == null, so completed  =>  recursion stack: ---------> dfs([5]) (1. done, 2. done, 3. done)
 *    2  (5)     2. prev != null,                                         ---------> dfs([4]) (1. done, 2. done, 3. dfs([5]) done)
 *   / \            prev.right = node, [4] -> [5]
 *  1   3           node.left = prev, [4] <=> [5]
 *                  prev = node, prev = [5]              head                             prev
 *               3. node.right == null, so completed      [1] <=> [2] <=> [3] <=> [4] <=> [5]
 * 
 *                  dfs recursion stack completed       head                             prev            
 *                  prev.right = head, [5] -> [1]        [1] <=> [2] <=> [3] <=> [4] <=> [5]    DONE!
 *                  head.left = prev, [5] <=> [1]         ^===============================^
 */