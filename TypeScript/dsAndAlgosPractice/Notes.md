# Solving Data Structures and Algorithms interview questions

## Approach

1.  **Understand the Problem (Clarify)**

    - **Listen Carefully:** Pay close attention to the interviewer's description of the problem.
    - **Ask Clarifying Questions:** Don't make assumptions. Inquire about:
      - Input constraints (ranges, types, edge cases like null or empty).
      - Output format expectations.
      - Performance requirements (time and space complexity).
      - Handling of invalid input.
      - Ambiguities in the problem statement.
      - Request for examples to solidify understanding.

2.  **Plan the Approach (Strategize)**

    - **Brainstorm Potential Solutions:** Think of various ways to solve the problem, even if they aren't immediately optimal.
    - **Evaluate Approaches:** Briefly consider the time and space complexity of each potential solution.
    - **Choose the Most Promising Approach:** Explain your reasoning for selecting a particular strategy to the interviewer. This showcases your analytical skills.
    - **Outline the Steps:** Before writing code, describe the high-level steps you will take to implement your chosen solution. This helps the interviewer follow your logic.

3.  **Implement the Solution (Code)**

    - **Write Clean and Readable Code:** Use meaningful variable names, consistent indentation, and comments to explain your logic where necessary.
    - **Focus on Correctness:** Aim for a working solution first. Optimization can come later if time permits.
    - **Think Out Loud (Optional but Helpful):** Briefly explain what you are doing as you write the code. This provides insight into your real-time thought process.

4.  **Test and Debug (Verify)**

    - **Test with Various Inputs:** Consider:
      - **Main Cases:** Typical scenarios.
      - **Edge Cases:** Empty input, single element, maximum/minimum values.
      - **Error Conditions:** Invalid or unexpected input (if applicable).
    - **Walk Through Your Code:** Explain how your code would handle each test case, step by step.
    - **Identify and Fix Bugs:** If your code doesn't work correctly, explain your debugging process. How are you identifying the issue? What steps are you taking to resolve it?

5.  **Optimize (Refine)**
    - **Analyze Time and Space Complexity:** Once you have a working solution, discuss its efficiency using Big O notation.
    - **Identify Potential Optimizations:** If there are more efficient algorithms or data structures that could be used, discuss them and implement them if time allows.
    - **Consider Alternative Data Structures/Algorithms:** Explain why your initial choice was made and why an alternative might be better (or worse) in different scenarios.

## Tips

### General

- Pay attention to constraints in the problem (e.g., lowercase English letters, fixed ranges, etc.).
  - These constraints often allow you to use more efficient data structures (e.g., fixed-size arrays for character frequencies).
  - See if you can solve for each constraint seperately (see isValidaSudoku_36)
- Break down the problem into smaller sub problems and solve for those. This can help in identifying the overall solution.
- Identify key properties

  - if a problem involes sequences, ranges, or subsets, we want to identify the start and end of sequence or range to avoid redundant work

- Try come up with a Canonical representation to the problem:

  - rephrase or model the problem in a clear, standardized, and often simpler way that captures its essence and core requirements.
  - Examples:
    - Sorting strings to identify anagrams.
    - Using frequency arrays or hash maps to represent character counts.
    - Normalizing coordinates in geometry problems.

- Try and avoid nested loops.
  - Two separate for loops are better.
- Avoid redundant work
  - leverage flags, markers or conditions to skip already-processed elements
- Leverage additional space in order to improve time efficiency (if the problem constraint allows for it)

- Can an existing array be reused to optmize space complexity?

- Test your code:

  - Check for no params, 0, undefined, null, massive arrays, async code, etc... Ask the interviewer if we can make assumption about the code. Can you make the answer return
    an error? Poke holes into your solution. Are you repeating yourself?

- **Not all optimal algorithms can run in O(n) time**
  - example 3Sum - requires sorting and using the two pointer technique in a nested loop - lowerbound of O(n^2)

### Common Patterns/Techniques:

- Backtracking:

  - solving problems that involve exploring all possible combinations, permutations, or subsets of a solution space
    - exaples: generating all possible permutations of a string, navigating a maze or solving a word search
  - works by:
    - exploring all possible options by recursively making choices at each step
    - If a choice leads to a valid solution, it continues exploring further.
    - If a choice leads to an invalid state, it "backtracks" by undoing the last choice and trying the next option.
  - useful when faced with problems involving:
    - small inputs
    - exploring All Combinations, Permutations, or Subsets (see generateParentheses_22)
    - solutions must satisfy specific constraints
    - decision trees
    - require optimiazation
    - cannot be solved efficiently with greedy or dynamic programming

- Hashing

  - efficent for grouping, counting, or finding relationships between elements.
    - analyze the core propetry of the input values to determine the unique keys that would satisfy the hashmap grouping:
    - For example:
      - Anagrams → Same characters with the same frequency.
      - Palindromes → Symmetry in characters.
      - Subarrays with the same sum → Prefix sums.
  - use case: checking for existence of elements efficiently

- Frequency counting:

  - Utilizes a hashmap to keep track of elements and their # of occurences in a colleciton input datastructure (such as an array);
  - Use case:
    - When the problem involves identifying the frequency of elements (e.g., most frequent, least frequent, duplicates).

- Bucket Sort:

  - used to group elements by their frequency.
  - The index of the bucket represents the frequency, and each bucket contains the elements with that frequency.
  - Use case:
    - When the range of possible frequencies is limited (e.g., bounded by the size of the input).
    - When sorting by frequency is required, but sorting the entire dataset would be too slow.
    - (example see topKFrequentElements_347)

- prefix and sum/products

  - The prefix product is the cumulative product of all elements before the current index.
  - The suffix product is the cumulative product of all elements after the current index.
  - The prefix sum in the cumulative sum of all the elements up until including the current index
  - Use case
    - problems involving "all elements except one"
    - By combining the prefix and suffix products, we can calculate the product of all elements except the current one without using division.

- Two pointer

  - How It Works
    - Initialization:Two pointers are initialized, typically at the start and/or end of the array (or string).
    - Movement: The pointers are moved based on certain conditions, such as the sum of elements, matching characters, or other criteria.
    - Termination: The process continues until the pointers meet, cross each other, or satisfy a specific condition.
  - use cases:
    - Sorted input
    - problem involving finding two elements or subsets that satisfy a condition.
    - problem involving symmetry, such as checking for palindromes or comparing elements from both ends of a structure.
    - Fixed window size or range
    - partitioning or rearranging elements based on a condition

- Sliding Window Technique

  - leverages the above Two pointer technique to create a window of elements to process at a time
  - enables efficient processing of subarrays/substrings without re-evaluating the entire entry
  - use cases:
    - finding the subarray with the largest sum
    - finding the longest substring without repeating characters

- Leverage Stack (LIFO) principle:
  - monotonic stack:
    - values in the stack are either increasing or decreasing
    - enable maintaining information about the "next greater element," "next smaller element," or similar relationships within a sequence of data in linear time, often avoiding nested loops.
  - consider using a stack when:
    - needing to process elements in reverse order of their addition?
    - needing to match or balance elements (e.g., opening and closing brackets)?
    - needing to undo or backtrack decisions?
    - there is a dependency between elements that requires hierarchical processing?
  - Look for keywords like "balanced," "nested," "dependencies," or "backtrack" in the problem description.

## Useful Algorithms to Know

### Cycles:

Floyds Algorithm - detect cycle in a linked list

### Finding shortest path in graph

Bellman ford

Dijkstra

### String search

Knuth-Morris-Pratt (KMP) algorithm

Key Idea
The KMP algorithm preprocesses the needle string to create a Longest Prefix Suffix (LPS) array. This array helps the algorithm skip unnecessary comparisons when a mismatch occurs during the search.

- Longest Prefix Suffix (LPS):
  - For each position i in the needle, the LPS array stores the length of the longest proper prefix of the substring needle[0...i] that is also a suffix of this substring.
  - The LPS array allows the algorithm to "fall back" to the next possible match in the needle without restarting the search from the beginning.

Use Case:

1. You need to find the first occurrence of a substring in a string.
2. The input size is large, and the naive approach (O(h \* n)) would be too slow.
3. You want to optimize the search process by avoiding redundant comparisons.
   See (firstOccurenceInString_28)

## Other useful information

**Logarithmic calculation**\
$log2(n)=x$ is analogous to $2^x=n$
