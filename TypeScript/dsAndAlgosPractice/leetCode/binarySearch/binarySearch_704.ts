function search(nums: number[], target: number): number {
  /**
    // nums integer array
    sorted in ascending order (number[i+1] > number[i])
    no duplicates
    can have negative elements
    0 < nums.length < 10^4
    -104 < nums[i], target < 104

    if target exists in nums return the target else return -1

    constraint:
        time complexity must run in o(nlogn) where n is length of nums

    //example 
        nums = [-1,0,3,5,9,12], target = 9 return => 4
        nums = [-1,0,3,5,9,12], target = 8 return => -1
    fast solution is to iterate through the entire array and compare each element to target, once we find target
    we can return the index, if we dont find target we return -1

    this is an o(n) solution - does not satisfy the problem constraint

    array is sorted, which means if our target is > nums[i], then we dont need to look at any elements
    in nums before nums[i] and vice versa

    example 
        nums = [-1,0,3,5,9,12], target = 9
        middle element is nums[(start + end) / 2 = 3] = 5, 9 > 5
        now we look in nums from index 4 up until index 6
        middle element is nums[(4 + 6) / 2 = 5] = 12 > 9
        now we look at elements before index 5 but after index 3
        middle element is nums[(4 + 5) / 2 = 4] = 9
        end is always one greater than the # of elements we are considering

        in this solution we are only searching the portion of the array that could contain our target
        this implementation looks to be recursive
/**
    ex: [-1,0,3,5,9] t = 2
    s:0 e:5, mid = 2, nums[mid] = 3 > 2
    s:0 e:2 mid = 1, nums[mid] = 0 < 2
    s: 2 e: 2 return -1;
    ex: [-1,0,3,5] t = 2
    s 0, e 4, mid = 2 nums[mid] = 3 > 2
    s 0, e: 2 mid = 1, nums[mid] = 0 < 2
    s: 2 e: 2 return -1
    ex: [-1,0,3,5] t = 5
    s0 e4 mid = 2 nums[mid] = 3 < 5
    s:3 e4 mid= 3, nums[mid] = 5 = 5 return 3

    [-1,0,3,5,9,12] t = 2
    s | e | mid| nums[mid] | 
    0 | 6 | 3 | 5 > 2
    0 | 3 | 1 | 0 < 2
    2 | 3 | 2 | 3 > 2
    2 | 2 | return -1
    [-1,0,3,5,9,12] t = 9
    s | e | mid| nums[mid] | 
    0 | 6 | 3 | 5 < 9
    4 | 6 | 5 | 12 > 9
    4 | 5 | 4 | 9 = 9 return 4

     */
  if (nums.length === 1 && nums[0] === target) return 0;
  if (nums.length === 1 && nums[0] !== target) return -1;

  function binarySearch(start: number, end: number, target: number): number {
    if (end - start < 1) return -1;

    let mid = Math.floor((start + end) / 2);

    if (nums[mid] === target) return mid;
    if (target > nums[mid]) return binarySearch(mid + 1, end, target);
    return binarySearch(start, mid, target);
  }

  return binarySearch(0, nums.length, target);
}
