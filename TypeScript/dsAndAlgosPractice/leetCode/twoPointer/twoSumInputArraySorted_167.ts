function twoSum(nums: number[], target: number): number[] {
  /**
        i: integer array nums
            - 1 - indexed 
            - sorted - non decreasing, i.e 1,1,2,2,3
            - range? - 2 - 3 * 10 ^ 4
            - nums[i] range? -1000 <= numbers[i] <= 1000
        0: 
            two numbers, such that number[num1] + numbers[num2] = target
            1 <= num1 < num2 <= num.length
        constraint
            - exactly one solution
            - cannot use the same elements twice
            - only constant extra space

        example: i: [2,2,5,11,15] t = 9, O : [1, 2] reasoning:
        index 1 = 2
        index 2 = 7
        [2 + 7] = 9 so we return indexes [1,2]

        numbers = [-1,0], target = -1
        we can just return [1,2] since there is only two elements and there must exist a solution
        
        example: i: [2,2,5,11,15] t = 13, expected O : [1, 4]
        notes:
        if num[1] > target, no solution exists
        num[1] = 2, t - 2 = 11, search remainder of the array for 11, we find it at index 4 
        we return [1,4]

        example: i: [2,2,5,10,15] t = 13, expected O : [1, 4]
        notes:
        if num[1] > target, no solution exists

        num[1] = 2, t - 2 = 11, search remainder of the array for 11, does not exist

        an o(nlogn) solution would be to start at the beginning array and binary search for t - num[index]
        in the rest of the array, keep going until we find our solution

        example: i: [1,1,2,10,15] t = 16, expected O : [1, 5]

        [-5,-3,0,1,1,2,5] t = -1

        iter | small | num[small] | big | num[big]
        1 | 1 | 1 | 5 | 14

        calculate middle index = start + end / 2
        let small = mid
        let big = mid + 1

        while (small >= 0 && big <= nums.length)
            if (num[small] + num[big] === t return [small+1, big+1])
            if (num[small] + num[big] > targte) decrease small;
            else {
                increase big
            }
            
            iter | small | num[small] | big | num[big] | num[small] + num{big \| =target
            [2,7,11,15] t= 9
            0 | 2 | 11 | 3 | 15 | 15 + 11 = 26 > target decrease small
            1 | 1 |7 | 3 | 15 | 15 + 7 = 22 > target decrease small
            2| 0 |2 | 3 | 15 | 15 + 2 = 17 > target decrease small
            


        [-5,-3,0,1,1,2,5] t = -1

        iter | small | num[small] | big | num[big] | num[small] + num{big \| =target
        0 | 3 | 1 | 4 | 1 | 1 + 1 = 2 > target 
        1 | 2 |0 | 4| 1 | 1 + 0 = 1 > target
        2 | 1 | -3 | 4 | 1 | -3 + 1 = -2 < target
        3 | 1 | -3 | 5 | 2 | -3 + 2 = target return small +1 and big+1 = [2, 6]

        [1,2,4,6] t = 7
        mid = 4 + 0 /2 = 2
        0 | 2 | 4 | 3 | 6 | 6 + 2 = 8 > target so decrease small by 1
        1 | 1 | 4 | 3 | 6 | 6 + 1 = 7 = target so return small+1 and big +1 = [2,4]

        time complexity o(n) space complexity using 3 constat variabls so o(1)
     */
  if (nums.length === 2) return [1, 2];

  const mid = Math.floor((0 + nums.length) / 2);
  let small = mid;
  let big = mid + 1;

  while (small >= 0 && big <= nums.length) {
    if (nums[small] + nums[big] === target) return [small + 1, big + 1];
    if (nums[small] + nums[big] > target) {
      small--;
      if (small < 0) {
        small = 0;
        big--;
      }
    } else {
      big++;
      if (big >= nums.length) {
        big = nums.length - 1;
        small++;
      }
    }
  }

  return [];
}

function twoSumRefactored(nums: number[], target: number): number[] {
  let small = 0; // Start pointer at the beginning
  let big = nums.length - 1; // End pointer at the end

  while (small < big) {
    const sum = nums[small] + nums[big];

    if (sum === target) {
      // Return 1-based indices
      return [small + 1, big + 1];
    } else if (sum > target) {
      // Decrease the sum by moving the big pointer left
      big--;
    } else {
      // Increase the sum by moving the small pointer right
      small++;
    }
  }

  // This should never be reached due to the problem's constraints
  return [];
}
