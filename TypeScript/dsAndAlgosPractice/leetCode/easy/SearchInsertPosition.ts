/**
 * Given:
 *  sorted array of integers, and a target integer
 *  disctinct intergers
 *  ascending order
 * Return:
 *  number representing the index of the target if found or where targert would be
 *
 * Ex
 * nums: [1,3,5,6]
 * target | return val
 * 5 | 2
 * 2 | 1
 * 7 | 4
 *
 * We can leverage a modified version of binary search since the array
 * contains distinct sorted integers
 *
 * we are either gonna return the mid position or start or end position
 *
 * if end - start == 0, return start
 * if end - start == 1
 *  mid =  floor(end + start divided by 2)
 *  if integer in num at mid === target return mid
 *  if interger in num at mid > t target return start
 *  else return end
 * if there are 2 or more characters to search
 *  mid = floor( end + start /2)
 * if target === num at mid return mid
 * if interger in num at mid > t target recursively call on the left side
 * else recursively call on the right side
 */

export function searchInsert(nums: number[], target: number): number {
  if (target > nums[nums.length - 1]) return nums.length;
  if (target < nums[0]) return 0;

  return findIndex(nums, target, 0, nums.length);
}

function findIndex(
  nums: number[],
  target: number,
  start: number,
  end: number
): number {
  if (end - start <= 0) return start;
  if (end - start === 1) {
    const mid = Math.floor((start + end) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] > target) return start;
    return end;
  }

  const mid = Math.floor((start + end) / 2);
  if (nums[mid] === target) return mid;
  if (nums[mid] > target) return findIndex(nums, target, start, mid);
  return findIndex(nums, target, mid + 1, end);
}

/**
 * Time complexity is O(log(n)) where n is the number of integers in num
 * space complexitjy is o(1)
 */
