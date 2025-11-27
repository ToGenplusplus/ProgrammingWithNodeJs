/**
 * List of useful patterns and algorithms for solving problems involving arrays
 * * 1. 🧮 FREQUENCY HASHING (COUNTING):
 * - Goal: Transform a massive, repetitive input list into a concise summary of unique items and their counts.
 * - Mechanism: Use a **Hash Map** (Map<number, number>) to store the mapping { item -> count }.
 * - Benefit: Achieves **O(N) time complexity** for the counting phase (average O(1) lookups/updates).
 * - Recognition: Look for problems involving **"count," "frequency," or "occurrence"** in the input.
 * - Example problems: topKFrequentElements, finding the first unique character.
 * ---------------------------------------------------------------------
 * * 2. 🧮 Categorization by Canonical Representation (Hashing/Mapping):
 * - Goal: Efficiently **group items** that are logically equivalent but physically different (like "listen" and "silent").
 * - Transformation (The Key): Create a **Canonical Representation** for each item (the single, unique, hashable form shared by all equivalent inputs).
 * - Grouping (The Map): Use a Hash Map where the Canonical Representation (the key) points to an array (the group).
 * - Benefit: Transforms potentially O(N^2) checks into a linear-time grouping.
 * - Recognition: Look for the words **"group," "categorize," or "find all equivalents."** The thought process should be: "What is the simplest, unique key I can generate for every equivalent input?"
 * - Example problems: groupAnagrams, grouping similar objects.
 * --------------------------------------
 * * 3. 🧺 BUCKET SORT (INDEXING BY COUNT):
 * - Goal: Sort items based on a property (like frequency) in **linear time (O(N))**, avoiding O(N log N) comparison sorting.
 * - Mechanism: Create an auxiliary array (the **Buckets**) where the array **index represents the sorting key** (the frequency), and the array **value holds the list of items** that share that key.
 * - Benefit: Achieves the optimal **O(N) time complexity** when the key range is limited.
 * - Recognition: Use when the required sort key (e.g., frequency, or the value itself) has a **known, limited, and positive integer range** (e.g., 1 to N, where N is input size).
 * - Example problems: topKFrequentElements, sorting an array of 0s, 1s, and 2s (Dutch National Flag problem).
 * - Goal: Calculate the sum of elements within any subarray or range in **O(1) time** after an initial O(N) pre-processing step.
 * - Mechanism: Create a **Prefix Sum Array (P)** where P[i] stores the cumulative sum of all elements up to index i-1. 
 * ----------------------------
 * * 4. ➕ The Prefix Sum Pattern:
 * - Calculation: The sum of the subarray from index i to j is simply calculated as: **Sum(i, j) = P[j+1] - P[i]**.
 * - Benefit: Transforms repetitive O(N) sum calculations into single **O(1) subtraction operations**.
 * - Recognition: Look for problems that require querying the **"Sum of Subarray"** or **"Range Sum"** repeatedly. Also used when finding a **subarray with a target sum K** (in combination with a Hash Map).
 * - Example problems: Find the subarray sum equals K, 2D range sum queries.
 * ----------------------------
 * ➕ The Prefix/Suffix Product Pattern:
 * - Goal: Calculate the product of all elements to the left and to the right of each index 'i' in O(N) time.
 * - Mechanism: Instead of multiplying all N elements for each index (which would be O(N^2)), we use dynamic programming/memoization.
 * - First pass: create a prefix product array where answer[i] = answer[i - 1] * input[i - 1] this makes answer array the (Product of Prefix elements before arr[i])
 * - Second pass: walking the answer array back to calculate the suffix product on the fly
 * Time Complexity: O(N) (Two passes over the array).
 * Space Complexity: O(1) auxiliary space (excluding the output array).
 * - Example problems: productExceptSelf
 */