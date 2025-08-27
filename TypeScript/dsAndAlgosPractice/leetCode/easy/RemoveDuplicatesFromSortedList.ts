/**
 * Given: an array of integers:
 *  possible values -100 to 100
 *  size: 1 to 3 * 10 ^ 4
 *  array is sorted in non decreasing order
 *
 * Return
 * a number k where k represents the number of unique integers in the array
 *
 * We are modifying the array in place
 *
 * Ex: Input: [1,2,2,4,5], output: 4, [1,2,4,5,_] the remaning values passed the 4 elements are duplicates and therefore are irrelevant
 *
 *  if the array has 1 element we return 1
 *  else (array has more than 1 element)
 *
 *
 *
 * Need 2 index pointers:
 *  1 to keep track of start of duplicate
 *  1 to move to find next non duplicate element
 * need to keep track of the unique count of integers
 * need to keep track of the previous number seen (not duplicate)
 *
 * init uniqueCount = 1 (since we know array has more than 1 element)
 * init positionPointer = 1
 * init checkPointer = 1
 * init prevValue = arr[checkPointer]
 *
 * we are gonna iterate over the array as long as the checkPointer is not outside the array
 *  if value at checkPointer is not the same as previous value
 *      arr[positionPointer] = arr[checkPointer]
 *      prevValue = arr[CheckPointer]
 *      we increment the checkPointer and positionPointer
 *      we increment the unique count of integers
 *  else:
 *      increment checkPointer by 1
 *
 *
 *
 * return uniqueCount
 *
 * Ex: arr: [1,1,1,2,3,3,4]
 * arr has more than one element
 * Iter | prev | positionPointer | checkPointer | uniqueCount | arr
 * 0 | 1 | 1 | 1 | 1 | [1,1,1,2,3,3,4]
 * 1 | 1 | 1 | 2 | 1 | [1,_,1,2,3,3,4]
 * 2 | 1 | 1 | 3 | 1 | [1,_,_,2,3,3,4]
 * 3 | 2 | 2 | 4 | 2 | [1,2._,2,3,3,4]
 * 4 | 3 | 3 | 5 | 3 | [1,2.3,_,_,3,4]
 * 5 | 3 | 3 | 6 | 3 | [1,2.3,_,_,_,4]
 * 6 | 4 | 4 | 7 | 4 | [1,2.3,4,_,_,_]
 *
 * exit array
 *
 * return positionPointer
 *
 * looks like the unique count is always = to the positon pointer so we don't need a separate variable to trak the unique count
 *
 * time complexity would be O(n) since we are moving through the entire array once
 * space complexity is O(1) variables are constant, no use of an additional data structure
 */

export function removeDuplicates(nums: number[]): number {
  if (nums.length > 0 && nums.length === 1) return 1;

  let positionPointer = 1;
  let checkPointer = 1;
  let prevValue = nums[0];

  while (checkPointer < nums.length) {
    if (nums[checkPointer] !== prevValue) {
      nums[positionPointer] = nums[checkPointer];
      prevValue = nums[checkPointer];
      positionPointer++;
    }
    checkPointer++;
  }

  return positionPointer;
}
