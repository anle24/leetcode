/**
 * Min heaps are trees whose parents are always smaller than its children, so smallest number is always at the top
 * Max heaps' parents are always larger than its children, so largest number is always at the top
 * Heap nodes have at most two children and the trees are full, always filling left to right
 * 
 * In JS, implement as an array
 * 
 *               100
 *           /          \
 *        19              36
 *       /  \           /    \
 *     17     12       25     5
 *    / \     / \     / \    / \
 *   9  15   6  11  13   8  1   4 
 * 
 *  100
 *       19  36
 *               17  12  25  5
 *                              9  15  6  11  13  8  1  4 
 * 
 * [100, 19, 36, 17, 12, 25, 5, 9, 15, 6, 11, 13, 8, 1, 4]
 * 
 * For any index of an array n...
 *  left child:  2n + 1
 *  right child: 2n + 2
 * 
 * index: 0 (100)                                                (100)
 *  left:  2(0) + 1 = 1, (100).left,   array[1] (19)              / \
 *  right: 2(0) + 2 = 2, (100).right,  array[2] (36)            19   36
 *  [(100), (19), (36), 17, 12, 25, 5, 9, 15, 6, 11, 13, 8, 1, 4]
 *   parent child child
 * 
 * index: 5 (25)                                                 (25)
 *  left:  2(5) + 1 = 11, (25).left,   array[11] (13)            /  \
 *  right: 2(5) + 2 = 12, (25).right,  array[12] (8)           13    8
 *  [100, 19, 36, 17, 12, (25), 5, 9, 15, 6, 11, (13), (8), 1, 4]
 *                        parent                 child child
 * 
 * For any child node at index n...
 *  parent: Math.floor((n - 1) / 2)
 * 
 * index: 2 (36)                                                 100
 *  parent: (2 - 1) / 2 = 0.5 => 0, array[0] (100)               / \
 *  [100, 19, 36, 17, 12, 25, 5, 9, 15, 6, 11, 13, 8, 1, 4]    19  (36)
 * 
 * index: 11 (13)                                                25
 *  parent: (11 - 1) / 2 = 5, array[5] (25)                     /  \
 *                                                            (13)  8
 */

/**
 * MaxHeap Implementation:
 * MinHeap is identical except pushing smallest to top instead.
 */
class MaxHeap {
  constructor() {
    this.values = []
  }

  insert(number) {
    this.values.push(number);
    this.bubbleUp();
    console.log(this.values);
  }

  bubbleUp() {
    let idx = this.values.length - 1;
    const element = this.values[idx];
    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parent = this.values[parentIdx];
      if (element <= parent) break;
      this.values[parentIdx] = element;
      this.values[idx] = parent;
      idx = parentIdx;
    }
  }

  extractMax() {
    // swap last element with root and pop
    const max = this.values[0];
    const end = this.values.pop();

    // if heap is empty, no need to do anything
    if (this.values.length > 0) {
      this.values[0] = end;
      this.sinkDown();
    }
    console.log(this.values);
    return max;
  }

  // send new root down to rightful place
  sinkDown() {
    let idx = 0;
    const length = this.values.length;
    const element = this.values[0];
    while (idx < this.values.length) {
      let leftIdx = 2 * idx + 1;
      let rightIdx = leftIdx + 1;
      let leftChild;
      let rightChild;
      let swapIdx = null;

      // if a left child (index) exists, compare
      if (leftIdx < length) {
        leftChild = this.values[leftIdx];
        if (leftChild > element) {
          // if leftChild is larger, set swapIdx to its index
          swapIdx = leftIdx;
        }
      }

      // if a right child (index) exists, compare
      if (rightIdx < length) {
        rightChild = this.values[rightIdx];

        // if left child is not larger than element but right child is
        // OR if leftChild is larger but rightChild is larger than leftChild
        // then swap with rightChild
        if (
          (swapIdx === null && rightChild > element) ||
          (swapIdx !== null && rightChild > leftChild)
        ) {
          swapIdx = rightIdx
        }
      }

      // if no swap was made, end loop
      if (swapIdx === null) break;

      // otherwise, swap values and updated idx to swapIdx
      this.values[idx] = this.values[swapIdx];
      this.values[swapIdx] = element;
      idx = swapIdx;
    }
  }
}

const mHeap = new MaxHeap();
mHeap.insert(23);
mHeap.insert(13);
mHeap.insert(30);
mHeap.insert(50);
mHeap.insert(1);
mHeap.insert(9);
console.log(mHeap.extractMax());
console.log(mHeap.extractMax());
console.log(mHeap.extractMax());
console.log(mHeap.extractMax());