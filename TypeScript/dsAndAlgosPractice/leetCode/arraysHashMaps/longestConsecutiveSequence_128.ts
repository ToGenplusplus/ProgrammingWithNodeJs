// my approach, not optimal
function longestConsecutive(nums: number[]): number {
  /**
        input:
            unsorted integer array
            size range, 0 <= nums.length <= 105
            nums[i] range -109 <= nums[i] <= 109
        output:
            integer - represents the length of the longest consecutive elements sequence
        constraint:
            time complexity must be O(n)

        example:
        i: [100,4,200,1,3,2] o: 4 reasoning: The longest consecutive elements sequence is [1, 2, 3, 4]

        i: [1,0,1,2] o: 3 reasoning: [0,1,2] longest consecutive elements sequence


        [100,4,200,1,3,2]
        [1,2,3,4,100,200]
        Naive solution:
        sort the array
        iterate throught the sorted array, keeping track of the longest sequence seen so far
        return the result
        time complexity o(nlogn)

        [100,4,200,1,3,2], n = 6
        100 -> looking for 99 or 101 - does not exist -> 1
        4 -> looking for 5,3 -> does not exist -> 1
        200 -> looking for 199,201 -> does not exist -> 1
        1 -> 0,2 -> does not exist - 1
        3 -> 2,4 -> found 4 - longest consecutive = [3,4] = 2
        2 -> 1,3 -> found 1 > no consecutive, add to array [1,2]
                    found 3 > consectuive = [3,4], combine both results = [1,2,3,4] = 4
    
        end of array, longest = 4 return longest

        [1,0,1,2] n =4
        1 -> 0,2 , 0 -> -1, 1, 2 -> 3, 1
        i | nums[i] | consecutiveValuesSearch | found | consecutiveValueFound | map[nums[i] | longestConsecutiveSoFar |
        0 | 
     */
  if (nums.length < 2) return nums.length;

  let longestSoFar = 1;
  const numConsecutive = new Map<number, any>();

  for (let i = 0; i < nums.length; i++) {
    if (!numConsecutive.has(nums[i])) {
      numConsecutive.set(nums[i], new Set());
    }

    if (numConsecutive.has(nums[i - 1])) {
      const curr = numConsecutive.get(nums[i - 1]);
      curr.add(nums[i]);
      numConsecutive.set(nums[i - 1], curr);
      numConsecutive.set(nums[i], numConsecutive.get(nums[i]).union(curr));
    }

    if (numConsecutive.has(nums[i + 1])) {
      const curr = numConsecutive.get(nums[i + 1]);
      curr.add(nums[i]);
      numConsecutive.set(nums[i + 1], curr);
      numConsecutive.set(nums[i], numConsecutive.get(nums[i]).union(curr));
    }

    longestSoFar = Math.max(longestSoFar, numConsecutive.get(nums[i]).size());
  }

  return longestSoFar;
}

function longestConsecutiveOptimal(nums: number[]): number {
  if (nums.length === 0) return 0;

  const numSet = new Set(nums); //using set for O(1) lookups
  let longest = 0;

  //iterate through the numbers
  for (const num of nums) {
    // Check if it's the start of a sequence. If the previous number is not in the set,
    // we can start counting length of the sequence from this number
    if (!numSet.has(num - 1)) {
      let currentNum = num;
      let currentStreak = 1;

      // Count the length of the sequence
      while (numSet.has(currentNum + 1)) {
        currentNum++;
        currentStreak++;
      }

      longest = Math.max(longest, currentStreak);
    }
  }

  return longest;
}

//using the above solution on input [1,0,1,2]
// the start for the longest sequence will be 0 since (-1) is not in the set
// the current number will be 0, and the current streak will be 1
// the while loop will check if 1 is in the set, it is, so we increment the current number to 1
// and the current streak to 2
// the while loop will check if 2 is in the set, it is, so we increment the current number to 2
// and the current streak to 3
// the while loop will check if 3 is in the set, it is not, so we break out of the loop
// the longest streak is 3, so we set longest to 3
// the next number in the array is 1, but since we have already counted the sequence starting from 0
// we will not count it again
// the next number in the array is 2, but since we have already counted the sequence starting from 0
// we will not count it again
//return longest
// the time complexity is O(n) since we are iterating through the array once
// the space complexity is O(n) since we are using a set to store the numbers
