

# Core Patterns

### Two Pointers
**Why Critical**: Optimizes O(n²) to O(n), extremely common in arrays/strings

**Essential Techniques**:
- Opposite direction (sorted arrays, palindromes)
- Same direction (in-place modifications, removing duplicates)
- Sliding window (substring/subarray problems)
- Fast/slow pointers (cycle detection, linked lists)

**Must-Solve Problems**:
- 3Sum / 4Sum
- Container With Most Water
- Trapping Rain Water
- Longest Substring Without Repeating Characters
- Minimum Window Substring

---

### Stack
**Why Critical**: Efficient for nested structures and monotonic problems

**Essential Techniques**:
- Matching/balancing (parentheses)
- Next/previous greater/smaller (monotonic stack)
- Expression evaluation
- Histogram/rectangle problems
- String manipulation (decode, simplify)

**Must-Solve Problems**:
- Valid Parentheses
- Daily Temperatures
- Largest Rectangle in Histogram
- Trapping Rain Water (stack approach)
- Decode String
- Basic Calculator II
- Remove K Digits
- Asteroid Collision

---

### Tree Traversals & Patterns
**Why Critical**: Trees are fundamental; many variants appear

**Essential Techniques**:
- Inorder, preorder, postorder (recursive & iterative)
- Level order traversal (BFS)
- Path sum problems
- Lowest common ancestor
- Tree construction from traversals
- BST properties exploitation
- Tree DP

**Must-Solve Problems**:
- Binary Tree Inorder Traversal (iterative)
- Binary Tree Level Order Traversal
- Validate Binary Search Tree
- Lowest Common Ancestor of BST
- Construct Binary Tree from Preorder and Inorder
- Path Sum II / III
- Serialize and Deserialize Binary Tree
- Maximum Path Sum (hard)
- Binary Tree Maximum Path Sum

---

### Binary Search & Variants
**Why Critical**: Goes beyond sorted array search; used for optimization problems

**Essential Techniques**:
- Classic binary search on sorted array
- Search in rotated sorted array
- Finding boundaries (first/last occurrence)
- Binary search on answer space (minimize/maximize problems)
- Binary search on 2D matrices

**Must-Solve Problems**:
- Search in Rotated Sorted Array
- Find First and Last Position of Element
- Koko Eating Bananas
- Minimum Time to Complete Trips
- Median of Two Sorted Arrays (hard)

---

### Heap (Priority Queue)
**Why Critical**: Essential for "k-th largest/smallest" and merge problems

**Essential Techniques**:
- Min heap for k largest elements
- Max heap for k smallest elements
- Two heaps (median finding)
- K-way merge
- Top k frequent elements

**Must-Solve Problems**:
- Kth Largest Element in an Array
- Top K Frequent Elements
- Merge K Sorted Lists
- Find Median from Data Stream
- K Closest Points to Origin
- Task Scheduler
- Meeting Rooms II

---

### Backtracking
**Why Critical**: Only way to generate all combinations/permutations

**Essential Techniques**:
- Subsets generation
- Permutations generation
- Combinations generation
- Constraint satisfaction (N-Queens, Sudoku)
- Path finding with exploration
- Pruning for optimization

**Must-Solve Problems**:
- Subsets / Subsets II
- Permutations / Permutations II
- Combination Sum / Combination Sum II
- Generate Parentheses
- Letter Combinations of a Phone Number
- Word Search
- N-Queens
- Palindrome Partitioning

**Backtracking Recognition**:
- "Generate all possible..."
- "Find all combinations/permutations"
- Constraint satisfaction problems
- Exploring decision trees

---

### Dynamic Programming
**Why Critical**: Most medium/hard problems involve DP; highest ROI pattern

**Essential Techniques**:
- 1D DP (Fibonacci pattern, house robber)
- 2D DP (grid problems, longest common subsequence)
- Knapsack variants (0/1, unbounded, bounded)
- Substring/subsequence problems
- State machine DP (buy/sell stock)
- Interval DP
- Top-down (memoization) vs bottom-up

**Must-Solve Problems**:
- Coin Change
- Longest Increasing Subsequence
- Longest Common Subsequence
- Edit Distance
- Word Break
- Best Time to Buy and Sell Stock (all variants)
- Unique Paths II
- Maximum Product Subarray
- Partition Equal Subset Sum
- Regular Expression Matching (hard)

**DP Recognition**:
- "Maximum/minimum/longest/shortest"
- "Count number of ways"
- "Is it possible to..."
- Optimal substructure exists
- Overlapping subproblems

---

### Graphs (BFS/DFS)
**Why Critical**: Many problems are hidden graph problems

**Essential Techniques**:
- BFS for shortest path (unweighted)
- DFS for exploring all paths
- Topological sort (course schedule, dependencies)
- Cycle detection (directed and undirected)
- Connected components (islands, provinces)
- Dijkstra's algorithm (weighted shortest path)
- Union-Find (disjoint sets)

**Must-Solve Problems**:
- Number of Islands
- Clone Graph
- Course Schedule I & II
- Word Ladder
- Surrounded Regions
- Pacific Atlantic Water Flow
- Network Delay Time
- Minimum Height Trees
- Cheapest Flights Within K Stops

**Graph Recognition**:
- Relationships between entities
- Dependencies or prerequisites
- Networks, connections, paths
- "Can reach from A to B"
- Matrix traversal problems

---

### Greedy Algorithms
**Why Critical**: Optimal for scheduling, interval, and choice problems

**Essential Techniques**:
- Interval scheduling (activity selection)
- Two-pointer greedy
- Sorting + greedy choice
- Jump game patterns
- Merging intervals

**Must-Solve Problems**:
- Jump Game I & II
- Gas Station
- Non-overlapping Intervals
- Minimum Number of Arrows to Burst Balloons
- Task Scheduler
- Partition Labels
- Meeting Rooms II (with heap)

**Greedy Recognition**:
- Local optimal leads to global optimal
- Cannot revisit decisions
- Sorting often helps
- "Minimum number of steps/operations"

---

### Trie (Prefix Tree)
**Why Critical**: Efficient for string search and prefix problems

**Essential Techniques**:
- Building trie from word list
- Prefix search
- Word search in grid (with backtracking)
- Autocomplete systems

**Must-Solve Problems**:
- Implement Trie
- Word Search II
- Design Add and Search Words Data Structure
- Replace Words


## Advanced Patterns (For Hard Problems)

### Union-Find (Disjoint Set)
**Why Critical**: Optimal for connectivity and grouping problems

**Essential Techniques**:
- Path compression
- Union by rank
- Detecting cycles in undirected graphs
- Dynamic connectivity

**Must-Solve Problems**:
- Number of Connected Components
- Redundant Connection
- Most Stones Removed with Same Row or Column
- Accounts Merge

---

### Monotonic Stack/Queue
**Why Critical**: Specialized but powerful for range queries

**Essential Techniques**:
- Monotonic increasing stack
- Monotonic decreasing stack
- Sliding window maximum (monotonic deque)

**Must-Solve Problems**:
- Daily Temperatures
- Next Greater Element II
- Sliding Window Maximum
- Largest Rectangle in Histogram
- Sum of Subarray Minimums

---

### Binary Search on Answer
**Why Critical**: Non-obvious optimization technique

**Essential Techniques**:
- Define search space (min to max possible answer)
- Write feasibility function (can we achieve with mid?)
- Minimize/maximize the answer

**Must-Solve Problems**:
- Koko Eating Bananas
- Minimum Time to Complete Trips
- Split Array Largest Sum
- Capacity To Ship Packages Within D Days
- Magnetic Force Between Two Balls

---

### Bit Manipulation
**Why Critical**: Space-efficient solutions, XOR tricks

**Essential Techniques**:
- XOR properties (a ^ a = 0, a ^ 0 = a)
- Bit masking
- Counting set bits
- Power of two checks

**Must-Solve Problems**:
- Single Number (I, II, III)
- Number of 1 Bits
- Counting Bits
- Subsets (using bitmask)
- Sum of Two Integers

---

### Prefix Sum / Cumulative Sum
**Why Critical**: Enables O(1) range queries

**Essential Techniques**:
- 1D prefix sum
- 2D prefix sum (matrices)
- Prefix sum with hash map (subarray sum equals k)

**Must-Solve Problems**:
- Subarray Sum Equals K
- Continuous Subarray Sum
- Product of Array Except Self
- Range Sum Query 2D - Immutable

---

### Topological Sort
**Why Critical**: Essential for dependency resolution

**Essential Techniques**:
- Kahn's algorithm (BFS)
- DFS-based topological sort
- Cycle detection in directed graphs

**Must-Solve Problems**:
- Course Schedule I & II
- Alien Dictionary
- Minimum Height Trees
- Parallel Courses

---

### Interval Problems
**Why Critical**: Common in scheduling and meeting room problems

**Essential Techniques**:
- Sort by start time
- Sort by end time
- Merge overlapping intervals
- Interval intersection

**Must-Solve Problems**:
- Merge Intervals
- Insert Interval
- Non-overlapping Intervals
- Meeting Rooms I & II
- Interval List Intersections

---

## Pattern Recognition Framework

### Step 1: Identify Problem Type

**Array/String Problems**:
```
Subarray/substring → Sliding Window or Prefix Sum
Pairs with condition → Two Pointers or Hash Map
Next greater/smaller → Monotonic Stack
```

**Optimization Problems**:
```
Maximize/minimize → DP or Greedy or Binary Search on Answer
Count ways → DP
All possible solutions → Backtracking
```

**Graph-Related**:
```
Shortest path → BFS (unweighted) or Dijkstra (weighted)
All paths → DFS
Dependencies → Topological Sort
Connectivity → Union-Find or DFS
```

**Tree Problems**:
```
Path from root to leaf → DFS
Level-by-level → BFS
Bottom-up computation → Postorder DFS
Ancestor problems → LCA algorithms
```

### Step 2: Check Constraints

#### Time Constraints
- **O(1)**: Hash Map lookup, Array access
- **O(log n)**: Binary Search, Balanced BST operations
- **O(n)**: Single pass, Two Pointers, Sliding Window, Hash Map
- **O(n log n)**: Sorting, Heap operations
- **O(n²)**: Nested loops, some DP solutions
- **O(2ⁿ)**: Subsets, combinations (small n only)
- **O(n!)**: Permutations (very small n only)

#### Space Constraints
- **O(1) space required**: Two Pointers, In-place modifications, Bit manipulation
- **O(n) space allowed**: Hash Maps, Stacks, Queues, DP arrays
- **O(m * n) space**: 2D DP, Grid BFS/DFS

#### Input Characteristics
- **Sorted input**: Binary Search, Two Pointers, Merge patterns
- **Small input size (n ≤ 20)**: Backtracking, Brute force
- **Large input (n > 10⁶)**: Must be O(n) or O(n log n)
- **Distinct elements**: Simplifies many solutions
- **Duplicates allowed**: Need extra handling

#### Output Requirements
- **All solutions**: Backtracking, DFS
- **Count only**: DP, Math, Combinatorics
- **Optimal solution**: Greedy, DP, Binary Search
- **Any valid solution**: First-found approach, BFS

### Step 3: Look for Keywords

| Keyword | Pattern |
|---------|---------|
| "Maximum/minimum" | DP, Greedy, Binary Search on Answer |
| "Longest/shortest" | DP, Sliding Window, BFS |
| "Count number of ways" | DP, Backtracking |
| "All possible" | Backtracking, DFS |
| "Contiguous subarray" | Sliding Window, Kadane's |
| "K-th largest/smallest" | Heap, Quick Select |
| "Next greater/smaller" | Monotonic Stack |
| "Shortest path" | BFS, Dijkstra |
| "Connected components" | DFS, BFS, Union-Find |
| "In-place" | Two Pointers |
| "Without extra space" | Bit manipulation, Two Pointers |

---

## Study Plan (8-12 Weeks)

### Weeks 1-2: Foundations
- Two Pointers (20 problems)
- Sliding Window (15 problems)
- Hash Maps (15 problems)

### Weeks 3-4: Core Data Structures
- Stack (20 problems)
- Linked Lists (15 problems)
- Trees - Basic traversals (20 problems)

### Weeks 5-6: Essential Patterns
- Binary Search & variants (20 problems)
- Heap (15 problems)
- Backtracking (20 problems)

### Weeks 7-8: Dynamic Programming
- 1D DP (15 problems)
- 2D DP (15 problems)
- Advanced DP (10 problems)

### Weeks 9-10: Graphs
- BFS/DFS (20 problems)
- Topological Sort (10 problems)
- Union-Find (10 problems)

### Weeks 11-12: Advanced & Practice
- Greedy (15 problems)
- Trie (10 problems)
- Mixed practice (20 problems)
- Mock interviews

---

## Must-Solve Problems by Pattern (Top 100)

### Two Pointers (10)
1. 3Sum
2. Container With Most Water
3. Trapping Rain Water
4. Remove Duplicates from Sorted Array
5. Minimum Window Substring
6. Longest Substring Without Repeating Characters
7. Valid Palindrome II
8. Linked List Cycle II
9. Sort Colors
10. Remove Nth Node From End of List

### Binary Search (8)
1. Search in Rotated Sorted Array
2. Find First and Last Position
3. Koko Eating Bananas
4. Median of Two Sorted Arrays
5. Split Array Largest Sum
6. Capacity To Ship Packages
7. Find Peak Element
8. Search a 2D Matrix II

### Dynamic Programming (15)
1. Climbing Stairs
2. Coin Change
3. Longest Increasing Subsequence
4. Longest Common Subsequence
5. Edit Distance
6. Word Break
7. House Robber I & II
8. Best Time to Buy and Sell Stock (I, II, III, IV)
9. Unique Paths II
10. Maximum Product Subarray
11. Partition Equal Subset Sum
12. Decode Ways
13. Target Sum
14. Regular Expression Matching
15. Longest Palindromic Substring

### Graphs (12)
1. Number of Islands
2. Clone Graph
3. Course Schedule I & II
4. Word Ladder
5. Pacific Atlantic Water Flow
6. Graph Valid Tree
7. Network Delay Time
8. Cheapest Flights Within K Stops
9. Minimum Height Trees
10. Word Search II
11. Surrounded Regions
12. Rotting Oranges

### Stack (8)
1. Valid Parentheses
2. Daily Temperatures
3. Largest Rectangle in Histogram
4. Trapping Rain Water (stack approach)
5. Basic Calculator II
6. Decode String
7. Remove K Digits
8. Asteroid Collision

### Heap (7)
1. Kth Largest Element
2. Top K Frequent Elements
3. Merge K Sorted Lists
4. Find Median from Data Stream
5. K Closest Points to Origin
6. Task Scheduler
7. Meeting Rooms II

### Backtracking (10)
1. Subsets I & II
2. Permutations I & II
3. Combination Sum I & II
4. Generate Parentheses
5. Letter Combinations
6. Word Search
7. N-Queens
8. Palindrome Partitioning
9. Restore IP Addresses
10. Partition to K Equal Sum Subsets

### Trees (12)
1. Binary Tree Inorder Traversal (iterative)
2. Binary Tree Level Order Traversal
3. Validate Binary Search Tree
4. Lowest Common Ancestor of BST
5. Construct Binary Tree from Preorder and Inorder
6. Path Sum II
7. Serialize and Deserialize Binary Tree
8. Binary Tree Maximum Path Sum
9. Kth Smallest Element in BST
10. Flatten Binary Tree to Linked List
11. Populating Next Right Pointers
12. Count Complete Tree Nodes

### Greedy (8)
1. Jump Game I & II
2. Gas Station
3. Non-overlapping Intervals
4. Minimum Number of Arrows
5. Partition Labels
6. Best Time to Buy and Sell Stock II
7. Task Scheduler
8. Reorganize String

### Others (10)
1. Implement Trie
2. Word Search II (Trie + Backtracking)
3. LRU Cache
4. LFU Cache
5. Design Add and Search Words
6. Sliding Window Maximum
7. Accounts Merge (Union-Find)
8. Single Number II (Bit Manipulation)
9. Subarray Sum Equals K (Prefix Sum)
10. Product of Array Except Self


### Track Progress
- Solve 2-3 problems daily
- Revisit problems after 1 week, 1 month
- Time yourself (aim for 30-35 min per medium)
- Keep a notebook of patterns and tricks

---

## Interview Strategy

### Time Management (45-60 min interview)
1. **Clarification (3-5 min)**: Ask about constraints, edge cases
2. **Approach (5-10 min)**: Discuss brute force, then optimize
3. **Coding (20-25 min)**: Write clean, working code
4. **Testing (5-10 min)**: Walk through test cases
5. **Follow-up (5-10 min)**: Discuss optimizations, variations

### Communication Framework
1. **Repeat the problem** in your own words
2. **Ask clarifying questions**:
   - Input size/range?
   - Duplicates allowed?
   - Memory constraints?
   - Edge cases?
3. **State your approach** before coding
4. **Think aloud** while coding
5. **Test with examples** (normal, edge cases)
6. **Analyze complexity** (time and space)

### Common Mistakes to Avoid
1. Jumping to code without a clear plan
2. Not considering edge cases
3. Poor variable naming
4. Not testing the solution
5. Getting stuck on one approach
6. Not communicating thought process
7. Ignoring time/space complexity

---

## Quick Pattern Reference Card

**Print this and keep handy:**
```
ARRAY/STRING:
- Subarray → Sliding Window
- Pairs → Two Pointers
- Next greater → Stack

OPTIMIZATION:
- Max/Min → DP / Greedy / Binary Search
- Count ways → DP
- All solutions → Backtracking

GRAPH:
- Shortest path → BFS
- All paths → DFS
- Dependencies → Topological Sort
- Groups → Union-Find

TREE:
- Path → DFS
- Level → BFS
- BST → Inorder gives sorted

TIME LIMITS:
- n≤20 → O(2ⁿ)
- n≤1000 → O(n²)
- n≤10⁵ → O(n log n)
- n≤10⁶ → O(n)
```

---

## Final Tips

1. **Master fundamentals first**: Two pointers, sliding window, basic DP
2. **Recognize patterns**: 80% of problems are variations of known patterns
3. **Practice consistently**: 2-3 problems daily > 20 problems in one day
4. **Learn from solutions**: Read top-voted solutions after solving
5. **Mock interviews**: Practice under time pressure
6. **Explain your code**: Practice articulating your thought process
7. **Don't memorize**: Understand the pattern and adapt
8. **Track weak areas**: Spend extra time on difficult patterns
9. **Review regularly**: Revisit problems to reinforce patterns
10. **Stay consistent**: 8-12 weeks of focused practice is sufficient

**Remember**: Interviews test problem-solving ability and communication, not memorization. Focus on understanding patterns deeply rather than solving 500 problems superficially.

# Algorithm Compexity Analysis

## 🧠 Identifying the Theoretical Lower Bound

The lower bound, or $\Omega(f(N))$, represents the *minimum* amount of work required to solve a problem. If your current algorithm matches this bound, it means the solution cannot be significantly faster.

---

### 1. The Input/Output Bound ($\Omega(N)$)

This is the most basic lower bound, determined by the size of the data you must interact with.

* **Rule:** If you must read every single element in the input array/data structure or generate an output array of size $N$, the lower bound is $\mathbf{\Omega(N)}$ (linear time).
* **Example:** Finding the maximum element in an array requires checking all $N$ elements; thus, $O(N)$ is optimal.

---

### 2. The Sorting Bound ($\Omega(N \log N)$)

This bound applies to problems where the *ordering* of the elements is fundamentally necessary for the solution.

* **Rule:** If the problem requires you to know the entire sorted order of the elements (ranking, finding the $k$-th smallest element, or solving a problem whose most efficient solution requires a comparison sort), the lower bound is $\mathbf{\Omega(N \log N)}$.
* **Note:** This bound applies to *comparison-based* sorting algorithms. If non-comparison methods (like Bucket Sort) are applicable, $O(N)$ might be possible.

---

### 3. The Relationship/Pairing Bound ($\Omega(N^2)$)

This bound applies to problems that inherently require checking the relationship between **every possible pair** of elements.

* **Rule:** If the solution requires comparing, grouping, or combining every possible unique pair of items, the lower bound is $\mathbf{\Omega(N^2)}$, because there are $O(N^2)$ unique pairs.
* **$3$-Sum Example:** To find $a+b+c=0$, you fix $a$ (which takes $O(N)$ choices) and then search the remainder for the pair $(b, c)$. The efficient **Two-Pointer** search for $(b, c)$ takes $O(N)$, locking the total complexity at $O(N) \cdot O(N) = \mathbf{O(N^2)}$.

---

## 🛑 Practical Steps to Determine Optimality

To verify if your algorithm is truly optimal, you must determine which fundamental operation dominates the necessary work:

1.  **Identify the Necessary Work:** What is the minimal, non-negotiable step? For $3$-Sum, it's finding a relationship among three distinct elements.
2.  **Check for Reduction:** Can the problem be reduced to a known, computationally "harder" problem? (e.g., $3$-Sum reduces to a fixed element and a $2$-Sum on the remainder).
3.  **Confirm the Dominating Factor:** Since $3$-Sum relies on fixing one element ($O(N)$ choices) and then performing an $O(N)$ search (Two-Pointers) for the remaining pair, the $O(N^2)$ complexity is structurally mandated by the nature of the *triplet* relationship you must find.