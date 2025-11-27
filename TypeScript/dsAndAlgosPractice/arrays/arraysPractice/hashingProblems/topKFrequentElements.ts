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