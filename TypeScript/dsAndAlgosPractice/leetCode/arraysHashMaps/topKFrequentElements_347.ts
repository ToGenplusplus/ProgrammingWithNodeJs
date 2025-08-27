//my implementation of the top k frequent elements problem (not the most optimal)
function topKFrequent(nums: number[], k: number): number[] {
  // nums integer array
  /**
        nums
        - integers
        - sorted? - no
        -  1 <= nums.length <= 10^5
        - -10^4 <= nums[i] <= 10^4
        -
        k in range [1, # of unique elements in num]

        return an array of numbers such that each number in the array is in the top k frequent elements

        constraint:
        time complexity must be better than o (n log n) where n is the length of nums

        ex: 
        [2,1,3,1,2,1] k = 2 => [1 ,2] why? 3 1's, 2, 2's, 1, 3

        one solution is to have a map to keep track of each unique number and # of occurences
        iterate through the input nums
        store the occurences in the map

        sort the entries in the map based on # of occurences in desc order 
        return the first k keys in the map

        this solution would work but it violates our constraint of time in < o (n log n)
        because of the sorting of the entries

        [2,1,3,1,2,0] k = 3 > 2,1,3
        [2,1,3,1,8,0] k = 3 > 1, 2, 3
        nums.length = 6 - At most 6 possible distint entries, k (2) out of 6 
        occurency array = [2,3,1,0,0,0]
        Map: 2 -> 2, 1 -> 3, 3 -> 1
        2, 1, 3, 1, 2, 1

        [2,1,3,1,2,1] k = 2 [2,1]

        i | nums[i] | placement
        0, 2,  - most frequent entry
        1, 1,  - most frequent entry
        2, 3,   -most frequent entry
        3, 1, - most freuent entry | 2 becomes 2nd most frequent entry, 3 becomes 2nd most frequent entry
        4, 2, - most frequent entry | 1 becomes 2nd most frequent entry, 3 remains 2nd most frequent entry
        5, 1 - most frequent entry | 2 becomes 2nd most frequent entry, 3 becomes 3rd most frequent 

        2 , 1 , 3, 1, 2
       [2 , 1 , 3, 1, 2, 1]

     */

  if (nums.length === 1) return nums;

  const occurencesMap = new Map<number, number>();

  for (const num of nums) {
    occurencesMap.set(num, (occurencesMap.get(num) || 0) + 1);
  }

  const entries = Array.from(occurencesMap.entries())
    .sort((a, b) => b[1] - a[1])
    .map((entry) => entry[0]);

  return entries.slice(0, k);
}

function topKFrequentOptimal(nums: number[], k: number): number[] {
  if (nums.length === 1) return nums;

  // Step 1: Count frequencies
  const occurencesMap = new Map<number, number>();
  for (const num of nums) {
    occurencesMap.set(num, (occurencesMap.get(num) || 0) + 1);
  }

  // Step 2: Bucket sort based on frequencies
  // since the maximum frequency can be at most nums.length
  // and we want to use the index of the array as the frequency, we are using an array of length nums.length + 1
  // so that we can easily access the elements with the same frequency
  // and we can have a bucket for each frequency
  // for example, if we have 3 elements with frequency 2, we can store them in buckets[2]
  const buckets: number[][] = Array(nums.length + 1).fill([]);
  for (const [num, freq] of occurencesMap.entries()) {
    buckets[freq].push(num);
  }

  // Step 3: Collect top k frequent elements
  // Start from the end of the buckets array to get the most frequent elements first
  // and stop when we have k elements
  const result: number[] = [];
  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
    if (buckets[i].length > 0) {
      result.push(...buckets[i]);
    }
  }

  return result.slice(0, k);
}
/**
 * * Time complexity: O(n) for counting frequencies and O(n) for bucket sort
 * * * Space complexity: O(n) for the map and buckets
 */
