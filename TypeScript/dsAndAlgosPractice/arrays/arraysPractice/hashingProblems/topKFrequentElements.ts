
/**
 * Given an integer array nums and an integer k, return the k most frequent elements. 
 * You may return the answer in any order.
 * 
 * ex nums: [1,4,2,0,4, 2], k 2 -> [2, 4]
 *  1 <= nums.length <= 10^5
 * nums[i] range -> -104 <= nums[i] <= 104
 * is norms sorted? - no
 * how large can k be? k is in the range [1, the number of unique elements in the array]
 * what happens if all elemnts have the same frequency? - gauranteed unique
 * time constrains? must be better than O(n log n)
 * memory constraints?
 * @param nums 
 * @param k 
 */
function topKFrequent(nums: number[], k: number): number[] {
    /**
     * [1,4,2,-3,4, 2], k 2 -> [2, 4]
     * no sorting allowed (must be less than O n log n) where n is the lenght of nums
     * 
     * 
     * 2 -> 2
     * -3 -> 1
     * 1 -> 1
     * 4 -> 2
     * 
     * let maxNumSeenSoFar
     * {
     * 2 -> [2, 4]
     * 1 -> [-3, 1]
     * }
     * 
     * [1,2,1,2,1,2,3,1,3,2], k = 2
     * 1 - 4
     * 2 - 4
     * 3 - 2
     * 
     * 4 -> 1, 2
     * 2 - 3
     * */

    if (nums.length === 1) return nums

    let frequencyCounter = {}
    for (const num of nums) {
        if (!frequencyCounter[num]) {
            frequencyCounter[num] = 0
        }
        frequencyCounter[num]++
    }

    let maxFrequencySeenSoFar = -1
    let frequencyToNumMap = {}
    for (const num in Object.keys(frequencyCounter)) {
        const numFrequency = frequencyCounter[num]
        if (!frequencyToNumMap[numFrequency]) {
            frequencyToNumMap[numFrequency] = []
        }
        frequencyToNumMap[numFrequency].push(num)
        maxFrequencySeenSoFar = Math.max(maxFrequencySeenSoFar, numFrequency)
    }


    return frequencyToNumMap[maxFrequencySeenSoFar]
};

/*
 * ---------------------------------------------------------------------------------------
 * CORE ALGORITHMIC PATTERNS USED:
 *
 * 1. 🧮 FREQUENCY HASHING (COUNTING):
 * - Goal: Transform the massive, repetitive input list into a concise summary of unique items and their counts.
 * - Mechanism: Use a Hash Map (Map<number, number>) to store the mapping { item -> count }.
 * - Benefit: Achieves O(N) time complexity for the counting phase (average O(1) lookups/updates).
 * - Recognition: Look for problems involving "count," "frequency," or "occurrence" (e.g., Anagrams, unique item counting).
 *
 * 2. 🧺 BUCKET SORT (INDEXING BY COUNT):
 * - Goal: Sort the items based on their frequency in linear time (O(N)).
 * - Mechanism: Create an auxiliary array (the 'Buckets') where the array INDEX represents the frequency (the key we sort by),
 * and the VALUE holds a list of all items that share that frequency.
 * - Benefit: Avoids the O(N log N) time complexity of comparison-based sorting.
 * - Recognition: Use when the sorting key (the frequency) has a known, limited range (e.g., 1 to N, where N is input size).
 *
 * ---------------------------------------------------------------------------------------
 * Time Complexity: O(N) — Linear time due to hashing and simple array iteration.
 * Space Complexity: O(N) — For the frequency map and the bucket array.
 */
function topKFrequentCorrect(nums: number[], k: number): number[] {
    
    // 1. COUNT FREQUENCIES: O(N)
    // Map: { '1': 3, '2': 2, '3': 1 }

    const frequencyMap = new Map<number, number>()
    for (const num of nums) {
        frequencyMap.set(num,(frequencyMap.get(num) || 0 ) + 1)
    }

    // 2. BUCKET SORT / INVERSE MAPPING: O(N)
    // Create an array where the index is the frequency, and the value is a list of numbers 
    // that appear that many times. Size is nums.length + 1 because the max frequency is nums.length.
    // Buckets: [ [], [], [2], [1], []... ] where index 2 holds [2] and index 3 holds [1].

    const frequencyBuckets: number[][] = new Array(nums.length).fill([])
    for (const [num, frequency] of frequencyMap.entries()) {
        frequencyBuckets[frequency].push(num)
    }

    // 3. REVERSE TRAVERSAL & COLLECTION: O(N)
    const results: number[] = []
    // Iterate from the largest possible frequency (nums.length) down to 1.
    for (let i = frequencyBuckets.length - 1; i > 0; i-- ) {
        if (frequencyBuckets[i].length > 0) {
            results.push(...frequencyBuckets[i])
        }
    }

    // Ensure we only return exactly k elements
    return results.slice(0, k)
};

//example nums: [1,2,1,2,1,2,3,1,3,2], k = 2
function topKFrequentPractice(nums: number[], k: number): number[] {

    //use Map instead of object so we can store number as keys and is more performant
    const frequencyMap = new Map<number, number>()
    for (const num of nums) {
        frequencyMap.set(num, (frequencyMap.get(num) || 0) + 1)
    }

    //bucket sort
    // array where the index represent the frequency and the contents represent the numbers that match the frequency
    const frequencyBuckets: number[][] = new Array(nums.length).fill([])
    for (const [num, frequency] of frequencyMap.entries()) {
        frequencyBuckets[frequency].push(num)
    }

    //iterate through the frequency buckets array from the end so we start with the higher frequnency numbers
    //append those numbers to a result list
    const results: number [] = []

    for (let i = frequencyBuckets.length - 1; i > 0; i--) {
        if (frequencyBuckets[i].length > 0) {
            results.push(...frequencyBuckets[i])
        }
    } 

    //return the first k entries 
    return results.slice(0, k)
}