import MaxHeap from "./maxHeap";

export function heaps() {
  const testMaxHeap = new MaxHeap(1000);

  //   for (let i = 0; i < 1000; i += 23) {
  //     testMaxHeap.insert(i);
  //   }

  testMaxHeap.insert(10);
  testMaxHeap.insert(20);
  testMaxHeap.insert(5);
  testMaxHeap.insert(9);
  testMaxHeap.delete(1);
  testMaxHeap.insert(33);
  testMaxHeap.delete(2);
  testMaxHeap.insert(40);

  let heapElements = testMaxHeap.getValuesInHeap();
  console.log(heapElements);
  console.log("Max value:" + testMaxHeap.getMaxValue());

  console.log("# of elements in heap:" + testMaxHeap.getValuesInHeap().length);
}
