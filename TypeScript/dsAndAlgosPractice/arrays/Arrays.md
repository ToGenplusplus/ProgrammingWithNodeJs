# Array:

- enables storing data in sequential blocks of memory
- O(1) 
  - retrieval of items if item location is known.
  - appending at the end of the array (majority of the time)
- O(n) 
  - for traversal, insert, deletion, operations.
- O(n logn)
  - for sorting
- Use case:
  - require data stored together in memory (cache friendlyness)
  - items are known ahead of time
  - represent multiple items of the same type in a single variable

## Problem solving:

In order to ensure you are understanding/solving the actual problem, accounting for edge cases, its important to ask
Clarification questions:

### Clarification Questions
- can the array be empty
- does the array contain duplicates
- can array[i] be null or undefined
- min <= arr.length <= max 

#### Integer Array
- is the array sorted
- range of values for array[i]
- what type of numbers are in the array (intergers, floating point)

#### String Array
- can the array contain empty strings?


## 📋 Array Algorithmic Techniques & Patterns

### 1. 🧮 Frequency Hashing (Counting)

* **Goal:** Transform a massive, repetitive input list into a concise summary of unique items and their counts.
* **Mechanism:** Use a **Hash Map** (`Map<number, number>`) to store the mapping $\text{item} \rightarrow \text{count}$.
* **Benefit:** Achieves **$O(N)$ time complexity** for the counting phase (average $O(1)$ lookups/updates).
* **Recognition:** Look for problems involving **"count," "frequency," or "occurrence"** in the input.
* **Example Problems:** `topKFrequentElements`, finding the first unique character.

---

### 2. 🧮 Categorization by Canonical Representation (Hashing/Mapping)

* **Goal:** Efficiently **group items** that are logically equivalent but physically different (like "listen" and "silent").
* **Transformation (The Key):** Create a **Canonical Representation** for each item (the single, unique, hashable form shared by all equivalent inputs).
* **Grouping (The Map):** Use a Hash Map where the Canonical Representation (the key) points to an array (the group).
* **Benefit:** Transforms potentially $O(N^2)$ checks into a linear-time grouping.
* **Recognition:** Look for the words **"group," "categorize," or "find all equivalents."** The thought process should be: "What is the simplest, unique key I can generate for every equivalent input?"
* **Example Problems:** `groupAnagrams`, grouping similar objects.

---

### 3. 🧺 Bucket Sort (Indexing by Count)

* **Goal:** Sort items based on a property (like frequency) in **linear time ($O(N)$)**, avoiding $O(N \log N)$ comparison sorting.
* **Mechanism:** Create an auxiliary array (the **Buckets**) where the array **index represents the sorting key** (the frequency), and the array **value holds the list of items** that share that key.
* **Benefit:** Achieves the optimal **$O(N)$ time complexity** when the key range is limited.
* **Recognition:** Use when the required sort key (e.g., frequency, or the value itself) has a **known, limited, and positive integer range** (e.g., 1 to $N$, where $N$ is input size).
* **Example Problems:** `topKFrequentElements`, sorting an array of 0s, 1s, and 2s (Dutch National Flag problem).

---

### 4. ➕ The Prefix Sum Pattern

* **Goal:** Calculate the sum of elements within any subarray or range in **$O(1)$ time** after an initial $O(N)$ pre-processing step.
* **Mechanism:** Create a **Prefix Sum Array (P)** where $P[i]$ stores the cumulative sum of all elements up to index $i-1$.
* **Calculation:** The sum of the subarray from index $i$ to $j$ is simply calculated as: $\text{Sum}(i, j) = P[j+1] - P[i]$.
* **Benefit:** Transforms repetitive $O(N)$ sum calculations into single **$O(1)$ subtraction operations**.
* **Recognition:** Look for problems that require querying the **"Sum of Subarray"** or **"Range Sum"** repeatedly. Also used when finding a **subarray with a target sum $K$** (in combination with a Hash Map).
* **Example Problems:** Find the subarray sum equals $K$, 2D range sum queries.

---

### 5. ✖️ The Prefix/Suffix Product Pattern

* **Goal:** Calculate the product of all elements to the left and to the right of each index $i$ in **$O(N)$ time** without using division.
* **Mechanism:** Uses two passes (Dynamic Programming/Memoization):
    1.  **First Pass (Prefix):** Create an array storing the **Product of Prefix elements** before index $i$.
    2.  **Second Pass (Suffix):** Iterate the array backward, calculating the **Suffix Product** on the fly, and multiplying it with the stored Prefix Product to get the final result.
* **Time Complexity:** $O(N)$ (Two passes over the array).
* **Space Complexity:** $O(1)$ auxiliary space (excluding the output array).
* **Example Problem:** `productExceptSelf`.

---
### Other userful tips

- can an optimal solution be found by iterating through the array from the end?
  - e.g if we needed to find the elements in an array that are greater than all the elements to the right of itself (the leaders).
- Can an optimal solution be found by revering the elements of the array?
