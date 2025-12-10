## 🧮 Hash Map / Set Pattern Recognition Framework

The Hash Map (Dictionary/Object) and Hash Set are fundamental data structures that allow for **$O(1)$ average-time complexity** for lookups, insertions, and deletions. This ability to instantly check for existence or retrieve a value is key to optimizing algorithms from $O(N^2)$ or $O(N \log N)$ down to **$O(N)$**.

| Pattern Category                  | Primary Goal                                                               | Recognition Cues & Triggers                                                                                                                           | Time Complexity |
| :-------------------------------- | :------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------- |
| **1. 🔍 Uniqueness / Existence**  | Check for duplicates or the presence of a target value in $O(1)$ time.     | **"Find Duplicates," "Unique," "Check if present,"** avoiding $O(N)$ sorting or $O(N)$ linear search.                                                 | $O(N)$          |
| **2. 📊 Frequency / Counting**    | Tally the occurrence of elements to find modes, majority, or unique items. | **"Count," "Frequency," "Occurrence," "Majority," "Most/Least Frequent."**                                                                            | $O(N)$          |
| **3. ➕ Subarray/Range Property** | Find subarrays that satisfy a sum, product, or difference condition.       | **"Subarray Sum Equals K," "Longest Substring without Repeating Characters,"** or finding elements that meet a **target difference** (e.g., Two Sum). | $O(N)$          |
| **4. 🔠 Canonical Grouping**      | Group elements that are logically equivalent but not identical in form.    | **"Group Anagrams," "Categorize," "Find all equivalents"** (Requires generating a standardized key, like sorting a string).                           | $O(N \cdot K)$  |

---

### Detailed Breakdown

#### 1. 🔍 Uniqueness and Existence (Hash Set)

This is the fastest way to confirm whether an item has been processed or if its inverse/complement exists.

- **Goal:** Substitute the slow, linear search ($O(N)$) or sorting ($O(N \log N)$) with instant lookups.
- **Mechanism:** Insert all elements into a **Hash Set**. Checking if an element is in the set takes $O(1)$ time on average.
- **Recognition Trigger:** Problems where the core operation is repeatedly **checking for the presence** of an element or trying to **filter out duplicates** in an array.
- **Example Problems:**
  - _Contains Duplicate_.
  - _Intersection of Two Arrays_.
  - _Longest Consecutive Sequence_ (using the set for $O(1)$ next-element lookups).

#### 2. 📊 Frequency and Counting (Hash Map)

Hash Maps are ideal for generating statistical data about the input in a single pass.

- **Goal:** Count occurrences of every distinct element in $O(N)$ time instead of iterating and re-counting ($O(N^2)$).
- **Mechanism:** Iterate through the array. Use the element itself as the **key** and its count as the **value** in the map.
- **Recognition Trigger:** Questions asking to find the **mode**, **majority element**, or any problem that requires knowing the **exact count** of each unique item.
- **Example Problems:**
  - _Two Sum_ (Using the map to store `value: index`).
  - _Majority Element_.
  - _First Unique Character in a String_.

#### 3. ➕ Subarray/Range Property (Prefix Sum Hashing)

This is an advanced technique that combines two patterns to solve problems in $O(N)$.

- **Goal:** Find subarrays that sum to a target $K$ or check for other cumulative properties.
- **Mechanism:** Track the cumulative sum (`currentSum`) as you traverse the array. Store the frequency of past cumulative sums (`Map<sum, count>`). To find a subarray that sums to $K$, check if the map contains the required past sum: `currentSum - K`.
- **Recognition Trigger:** Problems asking for the **"Total number of subarrays that equal $K$,"** or the **"Longest subarray with sum $K$,"** where the simple prefix sum array is insufficient.
- **Example Problems:**
  - _Subarray Sum Equals K_.
  - _Longest Substring Without Repeating Characters_ (using a map to track the _last seen index_ of a character to define the window boundary).

#### 4. 🔠 Canonical Grouping

This pattern allows grouping items that are logically the same but structurally different.

- **Goal:** Create a standardized, invariant key for groups of elements, enabling $O(1)$ insertion into the map for grouping.
- **Mechanism:** For each element, transform it into a **canonical key** (e.g., sort the characters in a string to create a key like "aet" for both "eat" and "tea"). Use this key to map to a list of original items.
- **Recognition Trigger:** Problems using phrases like **"Group," "Categorize,"** or **"Find all equivalents,"** particularly with strings where the order of characters doesn't matter.
- **Example Problems:**
  - _Group Anagrams_.
  - _Isomorphic Strings_.
