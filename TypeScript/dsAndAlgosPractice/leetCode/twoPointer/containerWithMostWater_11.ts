function maxArea(height: number[]): number {
  if (height.length < 2) {
    return 0;
  }
  /**
        i: integer array height, n = height.length
            2 <= n <= 105
            0 <= height[i] <= 104

        o: 
            number, representing the maxium amount of water a container can store

        constraint:
            time constratins? none
            space constraints? node
            find best optimal solution
        cannot rearrange elements of the array

        validate:
            1 element
            2 elements in the array
            array is null
        example:
        i: [1,8,6,2,5,4,8,3,7] 0: 49 Reasoning 
        index 2 has 8 and index 8 has 7, 7 x 8 = 49

        we need to find two numbers  a and b such that index of b is > index of a 
        and the product of (index b - index a) * b is the largest

        i: [1,8,6,2,5,4,8,3,7] 0: 49 Reasoning 
            0,1,2,3,4,5,6,7,8

        first = 0, second = 1, largest number so far
        1 - 0 - 1* Math.min(1, 8) = 1 largest number seen so far = 8, largestWater = 1

        increment both first and second becuase we seen a > number
        first = 1, second = 2, largest number seen so far = 8, largestWater 
        2 - 1 = 1 * Math.min(8,6) = 6 largest number seen so far = 8, largestWater = 6
        only increment second since 8 is still the largest # seen so far
        first = 1, second = 2, largest number seen so far = 8, largestWater 
        3 - 1 = 2 * Math.min(8, 2) = 4, 8, 6
        4 -1 = 3 * Math,min(8, 5) = 15 8, 15
        5 -1 = 4 * 4 = 16 8,16
        6 -1 = 5 * 8 = 40  1st 8, 40
        7 -1 = 6 * 3 = 18 8, 40
        8 -1 = 7 * 7 = 49, 8, 49 - end of the array largest water is 49

        [1,1]
        0, 1

        1 - 0 = 1 * 1 = 1 - return 1
        [9,0,4]
        0,1,2
        1 - 0 = 1 * 0, 9 largest #, largest water = 0
        increase second since first is 9 and is the largest is # seen so far
        2 - 0 = 2 * 4 = 8 , 9 , largest so far = 8 return 8

        [2,0,9,5] - current logic is broken here
         0,1,2,3

        1-0 = 1 * 0 = 0
        2 - 0 = 2 * 2 = 4 , largest water so far = 4
        9 is larger than 2, so we move first to 9 and second to 5
        3 - 2 = 1 * Math.min(9,5) = 5 = largest body of water 
     */

  let first = 0;
  let second = 1;
  let largestBodyOfWater: number = 0;

  while (second < height.length) {
    let distance = second - first;
    let bodyOfWater = distance * Math.min(height[first], height[second]);
    largestBodyOfWater = Math.max(largestBodyOfWater, bodyOfWater);

    if (height[second] > height[first]) {
      first = second;
    }
    second++;
  }

  return largestBodyOfWater;
}

function maxAreaOptimized(height: number[]): number {
  let left = 0;
  let right = height.length - 1;
  let maxWater = 0;

  while (left < right) {
    const width = right - left;
    const currentWater = width * Math.min(height[left], height[right]);
    maxWater = Math.max(maxWater, currentWater);

    // Key insight: Move the pointer pointing to the shorter line
    // because the area is limited by the shorter line.
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxWater;
}
/**
 * Time complexity: O(n) - two pointers traverse the array once
 * Space complexity: O(1)
 */
