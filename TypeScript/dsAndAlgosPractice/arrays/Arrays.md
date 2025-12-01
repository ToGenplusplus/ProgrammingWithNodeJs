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

## 🧠 Array Algorithmic Patterns: Recognition Guide

| Pattern | Primary Goal | Recognition Cues & Triggers | Time Complexity |
| :--- | :--- | :--- | :--- |
| **1. 🧮 Frequency Hashing** | Count occurrences / Check uniqueness. | **"Count," "Frequency," "Occurrence," "Unique," "Most/Least Frequent."** | $O(N)$ |
| **1. 🧮 Set Hashing** | Check uniqueness. | **"Existence," "Frequency,"** of related elements | $O(N)$ |
| **2. 🧮 Canonical Grouping** | Group logically equivalent items. | **"Group," "Categorize," "Find all equivalents."** (Requires generating a standardized key, like sorting a string). | $O(N \cdot K)$ |
| **3. 🧺 Bucket Sort** | Sort by frequency/value in linear time. | **Sorting is too slow ($>O(N \log N)$)** and the sort key has a **limited, known integer range (0 to $N$)**. | $O(N)$ |
| **4. ➕ Prefix Sum / Product** | Calculate range sums/products in $O(1)$. | **"Sum of Subarray," "Range Sum," "Product Except Self,"** or any problem requiring repeated calculations over array ranges. | $O(N)$ setup, $O(1)$ query |
| **5. 🔑 Constraint Tracking** | Validate uniqueness across multiple groups. | **Grid/Board problems** where elements must be unique across **Rows, Columns, AND Sub-Sections**. | $O(N^2)$ |
| **6. 🗺️ Coordinate Mapping** | Group grid elements into fixed blocks. | **Grid iteration** requiring analysis of non-standard, fixed-size chunks (e.g., $3 \times 3$ boxes) using integer math. | $O(N^2)$ |
| **7. ↔️ Two-Pointer** | Reduce search space in sorted arrays; find pairs or manage windows. | Array is **"Sorted"** (crucial) or can be sorted; finding a **"pair"** or **"target sum"**; manipulating a **"Window"** (sliding or fixed-size). | $O(N)$ |
***

## 💡 Detailed Pattern Breakdown & Refinements

### I. Hashing & Counting Patterns

These patterns transform the array structure to simplify counting and grouping.

#### 🧮 Frequency Hashing (Counting)
* **Goal:** Quickly summarize unique elements and their counts.
* **Mechanism:** Use a **Hash Map** (`Map`) where $\text{item} \rightarrow \text{count}$.
* **Recognition:** The problem explicitly uses terms like **"count," "frequency," "occurrence," or "unique."**

#### 🔑 Set Hashing for Uniqueness and $O(1)$ Lookup

* **Goal:** Substitute the slow search of an unsorted array ($O(N)$ lookup) with the fast lookup of a hash set ($O(1)$ lookup).
* **Mechanism:** Convert the input array into a **Set**. This allows you to check if a related element ($x+1$ or $x-1$) exists in the collection in constant time.
* **Recognition Trigger:** Any problem where the core operation is **checking the existence** or **frequency** of related values (like $x+1$ or $x-1$) and an $O(N \log N)$ sorting step is forbidden or too slow.


#### 🎯 The $O(N)$ Start Condition Optimization

* **Goal:** To ensure that the tracing step (the inner `while` loop) is only executed a total of $N$ times across the entire algorithm.
* **Mechanism:** You only allow the sequence trace to begin if the current number, $x$, **is the absolute start of a sequence**.
    * **The Check:** If $x-1$ is present in the set, then $x$ is not a starter, and you immediately skip it (`continue`).
    * If $x-1$ is *not* present, then $x$ **is** the starter, and you begin the trace (the `while` loop runs). 
* **Recognition Trigger:** Look for problems where you are calculating the **length of a structure** (like a sequence, streak, or path) and a naive traversal would lead to redundant recalculations that start in the middle of an already processed structure. The solution is to mandate that work only begins at the unique **boundary condition** (the lowest/highest element).

#### 🧮 Categorization by Canonical Representation
* **Goal:** Efficiently **group** items that are logically equivalent (e.g., anagrams).
* **Key Insight:** Generate a **Canonical Key** (a unique, hashable form) for all equivalent inputs. For anagrams ("silent", "listen"), the key is the sorted string ("eilnst").
* **Recognition:** Look for the words **"group," "categorize," or "find all equivalents."** You must first define the simplest, unique key that represents equivalence.

#### 🧺 Bucket Sort (Indexing by Count)
* **Goal:** Achieve an $O(N)$ sort when standard comparison sorts are too slow.
* **Mechanism:** The **value/frequency** becomes the **index** in an auxiliary array (the **Buckets**).
* **Recognition:** Use when the value you are sorting by (the frequency or the element itself) has a **known, limited, and positive integer range** (e.g., $0$ to $N$).

---

#### ↔️ The Two-Pointer Pattern

* **Goal:** Reduce the $O(N^2)$ search space in arrays to linear $O(N)$ time by making an informed decision about the next search area in every step.
* **Mechanism:** The pattern uses two indices (pointers) that move based on a comparison with a target value or condition.
* **Recognition Trigger:** Problems involving an **already sorted array** (or one that can be sorted) where you need to find a **pair** (sum, difference, product) or manipulate a **contiguous subarray/window** (longest/shortest subarray, in-place manipulation).

***

#### 🅰️ Converging Pointers (Finding a Pair/Target)

* **Goal:** Find a specific pair of elements in a sorted array that satisfies a target condition (e.g., $A[L] + A[R] = K$).
* **Mechanism:**
    1.  Initialize **Left** pointer ($L$) at the start and **Right** pointer ($R$) at the end. 
    2.  Pointers move **inward** toward the center.
    3.  If the current sum is **too small**, move $L$ right ($L++$) to include a **larger** number.
    4.  If the current sum is **too large**, move $R$ left ($R--$) to include a **smaller** number.
* **Recognition Trigger:** **Sorted array** problems asking to find a **pair** or target **sum/difference/product**.

***

#### 🅱️ Sliding Window / Fast & Slow Pointers

* **Goal:** Optimize the search for the longest/shortest contiguous subarray (window) that meets a condition, or perform efficient in-place array manipulation.
* **Mechanism:**
    1.  Initialize **Slow ($L$)** and **Fast ($R$)** pointers at the start. 
    2.  The **Fast ($R$) pointer** expands the window.
    3.  If the condition is violated (or met, depending on the goal), the **Slow ($L$) pointer** contracts the window or handles data modification.
* **Recognition Trigger:** Problems involving **contiguous subarrays/substrings** (Sliding Window), or **in-place manipulation** like removing duplicates, moving zeros, or resizing the array (Fast/Slow pointers).

---

### II. Dynamic Programming & Range Patterns

These patterns utilize pre-processing to speed up subsequent queries.

#### ➕ Prefix Sum / Product Patterns (Two Implementation Strategies)

| Strategy | Goal | Implementation | Recognition & Use Case |
| :--- | :--- | :--- | :--- |
| **A. Prefix Sum ARRAY** | **$O(1)$ Range Query:** Find the sum of any subarray $\text{Sum}(i, j)$ repeatedly. | Create an **Auxiliary Array** ($P$) in a single $O(N)$ pass. The formula is $\text{Sum}(i, j) = P[j] - P[i-1]$. | Look for problems asking for **"Range Sum Queries"** or **"Range Products"** multiple times after the initial setup (e.g., using a method inside a loop, or solving a **2D matrix problem**).  |
| **B. Prefix Sum HASH MAP** | **$O(N)$ Subsegment Counting:** Count the total number of subarrays that match a target value $K$. | Use a **Hash Map** (`Map<Sum, Count>`) initialized with $\{0: 1\}$. As you iterate, track the `currentSum` and check if the `requiredSum` ($\text{currentSum} - K$) exists in the map. | Look for problems asking for the **"Total number of subarrays that equal $K$"** or **"Longest subarray with sum $K$."** This is a **single-pass counting** problem. |


* **Goal:** Transform $O(N)$ range calculations into $O(1)$ lookups.
* **Recognition:** Look for problems requiring the **sum or product of many subarrays** repeatedly, or when trying to find a subarray that matches a **target sum/product**.

#### **Strategy 1: When to use the PREFIX SUM ARRAY**
* **Purpose:** To enable **$O(1)$ time complexity** for any future range query.
* **Mechanism:** Create an auxiliary array $P$ where $P[i]$ stores the cumulative sum up to index $i$.
    * To find the sum of elements in the original array from $i$ to $j$ inclusive, the formula is $\text{Sum}(i, j) = P[j] - P[i-1]$.

#### **Strategy 2: When to use the PREFIX SUM HASH MAP**
* **Purpose:** To enable **$O(N)$ time complexity** for counting subarrays with a target sum $K$.
* **Mechanism:** As you iterate, use a **Hash Map** to store the frequency of *all previously seen cumulative sums*. When at index $j$, you look up how many times the **required past sum** ($\text{currentSum} - K$) has occurred. This immediately gives you the count of subarrays ending at $j$ that sum to $K$.

---

### III. Grid & Constraint Patterns

These focus on efficient uniqueness checks and spatial indexing in 2D structures.

#### 🔑 Constraint Tracking (Set Hashing)
* **Goal:** Validate **uniqueness or repetition** across multiple groups (like Rows, Columns, and Boxes).
* **Mechanism:** Use separate **Sets** to simultaneously track the taken values for each independent constraint.
* **Recognition:** Typical in **grid/board validation problems** where multiple rules must hold true across different slices of the data (e.g., Sudoku).

#### 🗺️ Coordinate Mapping & Grouping
* **Goal:** Translate continuous $R, C$ coordinates into a discrete group ID.
* **Mechanism:** Use **integer division** (e.g., $\lfloor R/3 \rfloor$) to determine which fixed block an element belongs to.
* **Recognition:** Essential for **grid problems** when the logic must analyze or group elements into **fixed-size chunks** or blocks that are not simply a row or a column.

---

## 🚀 General Iteration Techniques

These are not patterns themselves but common optimizations used within patterns:

* **Reverse Iteration (Iterating from the End):**
    * **Goal:** Simplify logic where the current element's outcome depends on elements to its *right*.
    * **Recognition:** Look for problems like finding array **"leaders"** (elements greater than everything to their right) or performing calculations involving suffixes.

* **Reversal as a Shortcut:**
    * **Goal:** Transform a difficult suffix problem into an easier prefix problem.
    * **Recognition:** Used when iterating forward and looking backward is complicated, but **reversing the array** allows you to iterate forward and look backward with simple index math.