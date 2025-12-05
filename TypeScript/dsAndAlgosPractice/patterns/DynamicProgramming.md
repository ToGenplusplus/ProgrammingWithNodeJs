# Dynamic Programming & Range Patterns

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
* **Recognition:** The need to quickly look up a pre-calculated value based on its position in an array (like a sum, product, or maximum) is the primary trigger for the Prefix/Suffix Pattern.

#### **Strategy 2: When to use the PREFIX SUM HASH MAP**
* **Purpose:** To enable **$O(N)$ time complexity** for counting subarrays with a target sum $K$.
* **Mechanism:** As you iterate, use a **Hash Map** to store the frequency of *all previously seen cumulative sums*. When at index $j$, you look up how many times the **required past sum** ($\text{currentSum} - K$) has occurred. This immediately gives you the count of subarrays ending at $j$ that sum to $K$.
