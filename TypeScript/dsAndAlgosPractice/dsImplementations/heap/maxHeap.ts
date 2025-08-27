class MaxHeap {
  private heapSize: number;
  private heap: number[];

  constructor(capacity: number) {
    this.heapSize = 0;
    this.heap = new Array(capacity);
  }

  public insert(value: number) {
    if (this.isFull())
      throw new Error("Heap is full, cannot insert any more elements.");
    this.heap[this.heapSize] = value;
    this.heapSize++;
    if (this.heapSize === 1) return;
    this.heapifyAbove(this.heapSize - 1);
    return;
  }

  public delete(index: number) {
    if (index >= this.heapSize) throw Error("Index out of bounds");

    let parent = this.getParent(index);
    this.heap[index] = this.heap[this.heapSize - 1];
    this.heapSize--;

    if (index === 0 || this.heap[index] < this.heap[parent]) {
      this.heapifyBelow(index, this.heapSize - 1);
    } else {
      if (this.heap[index] > this.heap[parent]) {
        this.heapifyAbove(index);
      }
    }
  }

  public getMaxValue(): number | null {
    return this.heapSize > 0 ? this.heap[0] : null;
  }

  public getValuesInHeap(): number[] {
    let result: number[] = [];
    for (let i = 0; i < this.heapSize; i++) {
      result.push(this.heap[i]);
    }
    return result;
  }

  private heapifyAbove(startIndex: number) {
    // used after insertion of a node
    let indexToCompare = startIndex;
    while (indexToCompare > 0) {
      let parentIndex = Math.floor((indexToCompare - 1) / 2);
      if (this.heap[parentIndex] >= this.heap[indexToCompare]) break;
      this.swapValues(indexToCompare, parentIndex);
      indexToCompare = parentIndex;
    }
  }

  private heapifyBelow(startIndex: number, lastHeapIndex: number) {
    //may be used after deletion of a node;
    let indexToCompare = startIndex;
    while (indexToCompare <= lastHeapIndex) {
      let lcIndex = this.getChildIndex(indexToCompare, true);
      let rcIndex = this.getChildIndex(indexToCompare, false);
      let childToSwap;

      if (lcIndex <= lastHeapIndex) {
        if (rcIndex > lastHeapIndex) {
          childToSwap = lcIndex;
        } else {
          childToSwap =
            this.heap[lcIndex] > this.heap[rcIndex] ? lcIndex : rcIndex;
        }
        if (this.heap[indexToCompare] < this.heap[childToSwap]) {
          this.swapValues(indexToCompare, childToSwap);
          indexToCompare = childToSwap;
        } else {
          break;
        }
      } else {
        break;
      }
    }
  }

  public isFull(): boolean {
    return this.heapSize === this.heap.length;
  }

  private isEmpty(): boolean {
    return this.heapSize === 0;
  }

  private getChildIndex(currIndex: number, isLeft: boolean): number {
    return 2 * currIndex + (isLeft ? 1 : 2);
  }

  private getParent(currIndex: number): number {
    return Math.floor((currIndex - 1) / 2);
  }

  private swapValues(indexI: number, indexJ: number) {
    let temp = this.heap[indexI];
    this.heap[indexI] = this.heap[indexJ];
    this.heap[indexJ] = temp;
  }
}

export default MaxHeap;
