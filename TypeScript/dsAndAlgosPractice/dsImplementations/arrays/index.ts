/**
 * Remove duplicates from sorted array
 * Given a sorted array arr[] of size N, the task is to remove the duplicate elements from the array. 
 * We need keep order of the remaining distinct elements as it was in the original array.
 *  Input: arr[] = {2, 2, 2, 2, 2}
    Output: arr[] = {2}
    Explanation: All the elements are 2, So only keep one instance of 2.

    Input: arr[] = {1, 2, 2, 3, 4, 4, 4, 5, 5}
    Output: arr[] = {1, 2, 3, 4, 5}

    Input: arr[] = {1, 2, 3}
    Output : arr[] = {1, 2, 3}
    Explanation : No change as all elements are distinct

    One solution is to iterate through the array and append the first seen distinct element to an output array
    This wil be an O(n) time and space solution. Need n space to store output array.

    Another solution is to use the 2 pointer technique
    one pointer is used to track the next distinct element
    another pointer is used to track where the next distinct element should be moved to.
 */

export const removeDuplicatesFromSortedArray = (arr, n) => {
  if (n < 2) return n;
  let forwardIndex = 1;
  let trackingIndex = 0;

  while (forwardIndex < n) {
    if (arr[forwardIndex] !== arr[trackingIndex]) {
      trackingIndex++;
      arr[trackingIndex] = arr[forwardIndex];
    }
    forwardIndex++;
  }
  return arr.slice(0, trackingIndex + 1);
};

type reverseInput = number | string;
export const arrayReverseIterative = (arr: reverseInput[]) => {
  if (arr.length < 2) return arr;

  let start = 0,
    end = arr.length - 1;
  while (start < end) {
    let temp = arr[start];
    arr[start] = arr[end];
    arr[end] = temp;
    start++;
    end--;
  }
};

export const mergeTwoSortedArrays = (arr1: number[], arr2: number[]) => {
  if (arr1.length == 0) return arr2;
  if (arr2.length == 0) return arr1;

  let fi = 0;
  let si = 0;
  let result = [];
  while (fi < arr1.length && si < arr2.length) {
    if (arr1[fi] <= arr2[si]) {
      result.push(arr1[fi]);
      fi++;
    } else {
      result.push(arr2[si]);
      si++;
    }
  }

  if (fi != arr1.length) {
    while (fi < arr1.length) {
      result.push(arr1[fi]);
      fi++;
    }
  } else {
    while (si < arr2.length) {
      result.push(arr2[si]);
      si++;
    }
  }
  return result;
};

const moveZeroes = (nums: number[]) => {
  if (nums.length < 2) {
    return nums;
  }

  let currIndexToReplace = -1;
  for (let i = 0; i < nums.length; i++) {
    let currElem = nums[i];
    if (currElem == 0 && currIndexToReplace === -1) {
      currIndexToReplace = i;
    } else if (currElem !== 0 && currIndexToReplace !== -1) {
      nums[currIndexToReplace] = currElem;
      nums[i] = 0;
      currIndexToReplace++;
    }
  }
};

const reArrange1BasedIndex = (nums: number[]) => {
  if (nums.length < 2) {
    return;
  }
  const swap = (i: number, j: number) => {
    let temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
  };

  for (let i = 1; i < nums.length; i++) {
    if (
      (i % 2 !== 0 && nums[i] < nums[i - 1]) ||
      (i % 2 === 0 && nums[i] > nums[i - 1])
    ) {
      swap(i, i - 1);
    }
  }
};

const stockBuyAndSell = (prices: number[]): number => {
  if (prices.length < 2) {
    return 0;
  }
  let maxProfit = 0;
  for (let day = 1; day < prices.length; day++) {
    if (prices[day] - prices[day - 1] > 0) {
      maxProfit += prices[day] - prices[day - 1];
    }
  }
  return maxProfit;
};

const generatePrefixSumOfArray = (nums: number[]): number[] => {
  if (nums.length === 0) return nums;
  let prefixSum = new Array(nums.length);
  prefixSum[0] = nums[0];
  for (let i = 1; i < nums.length; i++) {
    prefixSum[i] = nums[i] + prefixSum[i - 1];
  }
  return prefixSum;
};

export const arrays = () => {
  const nums = [1, 2, 3, 4];
  // reArrange1BasedIndex(nums);
  console.log(generatePrefixSumOfArray(nums));
};
