function searchInsert(nums: number[], target: number): number {
  /**
        nums - sorted integer array
        target - integer


        O: n - index of target in nums or index if target was to exist in nums

        constraints:
            size of nums, target range? 
                1 <= nums.length <= 104
                -104 <= target <= 104
                -104 <= nums[i] <= 104
            sorted non-decreasing, increasing? - distinct in ascending order
            time complexity - must be O(log n)

        example:
            - n: [1,3,5,6] t = 5 -> 2
            - n: [1,3,5,6] t = 2 -> 1
            - n: [1,3,5,6] t = 7 -> 4

        
        sorted array so we can leverage some form of binary search
            - n: [1,3,5,6] t = 2
            start = 0, end = 4, mid = start + end / 2 = 2, nums[2] = 5 > 2
            start = 0, end = 2 mid = 1 nums[1] = 3 > 2
            start = 0 end = 1 mid = 0, nums[0] = 1 < 2 -> 1
                end - start <= 1 base case
                    nums[mid] === t return mid
                    nums[mid] < t return mid + 1
                    nums[mid] > t return mid - 1

            - n: [1,3,5,6] t = 7
            start | end | mid | nums[mid] | ===target
            0 | 4 | 2 | 5 | < target
            3 | 4 | 3 | 6 | < target
            start - end <= 1 and nums[mid] < target so return mid + 1 = 4

            - n: [1,3,5,6,7] t = 0
            start | end | mid | nums[mid] | ===target
            0 | 5 | 2 | 5 | > 0
            0 | 2 | 1 | 3 > 0
            0 | 1 | 0| 1 > 0
            end - start <= 1 nums[mid] = 1 > target return mid - 1 = 0

            n: [1,3,5] t=4
            start | end | mid | nums[mid] | ===target
            0 | 3 | 1 | 3 < 4
            2| 3 | 2 | 5 > 4
            end - start <=1 and nums[mid] > target 

            mid = 0 , n[mid] < target return mid + 1, n[mid] > target return mid
            mid = n.length, n[mid] < target return mid + 1, n[mid] > target return mid

     */
  function searchInsertFind(start: number, end: number): number {
    const mid = Math.trunc((start + end) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if (end - start <= 1) {
      if (nums[mid] > target) {
        return mid;
      }
      return Math.min(mid + 1, nums.length);
    } else {
      if (nums[mid] > target) {
        return searchInsertFind(start, mid);
      } else {
        return searchInsertFind(mid + 1, end);
      }
    }
  }
  return searchInsertFind(0, nums.length);
}

function searchInsertOptimized(nums: number[], target: number): number {
  let start = 0;
  let end = nums.length;

  while (start < end) {
    const mid = Math.trunc((start + end) / 2);

    if (nums[mid] === target) {
      return mid; // Target found
    } else if (nums[mid] > target) {
      end = mid; // Search the left half
    } else {
      start = mid + 1; // Search the right half
    }
  }

  return start; // Target not found, return the insertion point
}
