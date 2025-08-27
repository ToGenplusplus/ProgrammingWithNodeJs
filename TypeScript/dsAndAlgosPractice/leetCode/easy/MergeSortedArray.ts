// Leectode #88

/**
 *
 * @param nums1 integer array -,+,0,, sorted in non decreasing order
 * @param m - # of values in nums1
 * @param nums2 integer array -,+,0,
 * @param n - # of values in nums2, sorted in non decreasing order
 *
 * nums1 can hold m + n values
 * at the end of the function nums1 should contain all values in both array sorted in non decreasing order.
 */

export function merge(
  nums1: number[],
  m: number,
  nums2: number[],
  n: number
): void {
  /**
   * keep track of the position of the last inserted value in nums1
   * Iterate over nums1 and nums2 in descending order
   * if value at nums1 is greater than value at nums2
   *  insert value at last position and decrement nums 1 counter
   * if value at nums2 is greater than value at nums1
   *  insert value at last position and decrement num2 counter
   *
   * if at the end of iteration there are still values left in nums2
   *  insert remaining values at last position
   */

  let last = m + n - 1;
  while (m > 0 && n > 0) {
    if (nums1[m - 1] > nums2[n - 1]) {
      nums1[last] = nums1[m - 1];
      m--;
    } else {
      nums1[last] = nums2[n - 1];
      n--;
    }
    last--;
  }

  while (n > 0) {
    nums1[last] = nums2[n - 1];
    last--;
    n--;
  }

  console.log(nums1);
}

/**
 * Time complexity : O(m + n)
 * Space complexity : O(1)
 */
