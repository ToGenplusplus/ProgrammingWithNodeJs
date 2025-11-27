
/**
 * List of useful patterns and agorithms for solving problems involving arrays
 * 
 *  1. 🧮 FREQUENCY HASHING (COUNTING):
 * - Goal: Transform the massive, repetitive input list into a concise summary of unique items and their counts.
 * - Mechanism: Use a Hash Map (Map<number, number>) to store the mapping { item -> count }.
 * - Benefit: Achieves O(N) time complexity for the counting phase (average O(1) lookups/updates).
 * - Recognition: Look for problems involving "count," "frequency," or "occurrence" (e.g., Anagrams, unique item counting).
 * - Example problems
 *      - topKFrequentElements
 * 
 *  2. 🧮 Categorization by Canonical Representation (Hashing/Mapping)
 * - Goal: The goal is to efficiently group items that are logically equivalent but physically different (like "listen" and "silent").
 * - Input: A collection of items that need grouping (e.g., words, numbers, objects).
 * - Transformation (The Key): Create a Canonical Representation for each item. This is the single, unique form that all equivalent inputs share.
 * - Grouping (The Map): Use a Hash Map where the Canonical Representation (the key) points to an array (the group).
 * - Output: Extract the values from the hash map.
 * - Benefit: Achieves O(N) time complexity (average O(1) lookups/updates).
 * - Recognition: whenever you see the word "group," "count," or "categorize" in a coding problem, 
your first thought should be: "What is the simplest, unique key I can generate for every equivalent input?
 * - Example problems
 *      - groupAnagrams
 * 
 * 3. 🧺 BUCKET SORT (INDEXING BY COUNT):
 * - Goal: Sort the items based on their frequency in linear time (O(N)).
 * - Mechanism: Create an auxiliary array (the 'Buckets') where the array INDEX represents the frequency (the key we sort by),
 * and the VALUE holds a list of all items that share that frequency.
 * - Benefit: Avoids the O(N log N) time complexity of comparison-based sorting.
 * - Recognition: Use when the sorting key (the frequency) has a known, limited range (e.g., 1 to N, where N is input size).
 * - Example problems
 *      - topKFrequentElements
 */