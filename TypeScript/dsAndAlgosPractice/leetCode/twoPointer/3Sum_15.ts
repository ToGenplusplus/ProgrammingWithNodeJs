function threeSum(nums: number[]): number[][] {
  /**
        i: integer array, n = nums.length
        3 < n < 3000
        nums[i] range? -105 <= nums[i] <= 105
        sorted? no
        
        O: 3 numbers such that i != j != k but nums[i] + nums[j] + [numsk] = 0

        constraint:
        there can be multiple solutions, return all triplet solutions
        trying to fin the most optimal algorithm
        there may not be a solution

        naive solution, 3 nested for loops i, j k, iterate once we find a place where 
        nums[i] + nums[j] + nums[k] = 0, insert entries into the result array
        we would check to make sure i != k != j

        since we need distinct triplets we are going to use a set to hold the ouput

        ex: [-1,0,1,2,-1,-4] => [[-1,-1,2], [-1,0,1]]


        num to count map
        -4 -> 1
        -1 -> 2
        0 -> 1
        1 -> 1
        2 -> 1

        compare two numbers, see if o - sum of 2 numbers is in the map 
        -1 + 0 = -1 , 0 - (-1) = 1 is there a 1 in the map, yes there is => [-1,0,1]
        0 + 1 = 1 0 -1  = -1, is there a -1 in the map, yes, [0,-1,1] (already exists in set)
        1 + 2 = 3 , 0 - 3 = -3, not in map
        2 + (-1) = 1, 0 - 1 = -1, its in map and has a value of 2 , valid entry => [[-1,0,1], [2,-1,-1]]


        [2, 1, 0, -2]
        2 + 1 = 3 , 0 - 3 = -3, not in map
        1 + 0 = 1 , 0 -1 = -1, not in map
        0 + -2 = -2, 0 - (-2) = 2, its in map, only 1 values exists for 2 and 2 != 0 or -2
        so valid answer = [[0, 2, -2]]

        insert all entries with their frequencies in a map

        iterate over the entries checking 2 numbers at a time

            calculate over the sum of the num a and num b = sum1
            calucate 0 - sum1 = toFind
            is toFind in the map? 
                no -> move on
                yes -> if toFind = num a || num b and # of occurences of 2 find > 1, valid entry
                    else no valid entry
     */

  const numFrequency = new Map();

  const result = new Set<number[]>();

  for (const num of nums) {
    numFrequency.set(num, (numFrequency.get(num) || 0) + 1);
  }

  for (let numIndex = 0; numIndex < nums.length - 1; numIndex++) {
    let numa = nums[numIndex];
    let numb = nums[numIndex + 1];

    const sum = numa + numb;
    const toFind = 0 - sum;

    if (numFrequency.has(toFind)) {
      const count = numFrequency.get(toFind);
      if (toFind === numa && toFind === numb) {
        count >= 3 && result.add([numa, numb, toFind]);
      } else if (toFind === numa) {
        count >= 2 && result.add([numa, numb, toFind]);
      } else if (toFind === numb) {
        count >= 2 && result.add([numa, numb, toFind]);
      } else {
        result.add([numa, numb, toFind]);
      }
    }
  }

  return Array.from(result);
}

function threeSumOptimal(nums: number[]): number[][] {
  const result: number[][] = [];

  // Step 1: Sort the array to simplify duplicate handling and pointer movement
  nums.sort((a, b) => a - b);

  // Step 2: Iterate through the array, fixing one number at a time
  for (let i = 0; i < nums.length - 2; i++) {
    // Skip duplicates for the first number
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    let left = i + 1; // Pointer for the second number
    let right = nums.length - 1; // Pointer for the third number

    // Step 3: Use two pointers to find pairs that sum to -nums[i]
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (sum === 0) {
        // Found a triplet
        result.push([nums[i], nums[left], nums[right]]);

        // Skip duplicates for the second number
        while (left < right && nums[left] === nums[left + 1]) left++;
        // Skip duplicates for the third number
        while (left < right && nums[right] === nums[right - 1]) right--;

        // Move both pointers inward
        left++;
        right--;
      } else if (sum < 0) {
        // If the sum is too small, move the left pointer to increase the sum
        left++;
      } else {
        // If the sum is too large, move the right pointer to decrease the sum
        right--;
      }
    }
  }

  return result;
}

/**
 * Note that the optimal solution has a time complexity of O(n^2) due to the nested loops,
 * but it is significantly more efficient than the naive O(n^3) solution.
 *
 * Sorting is necessary to simplify duplicate handling and pointer movement
 *
 * The 3Sum problem is a combinatorial problem, and the number of possible triplets in an array of size n is proportional to n²
 *
 * hashing cant be useful in 3Sum, you need to evaluate pairs of numbers for each fixed number, which inherently requires O(n²) operations even if you use a hash map.
 */
