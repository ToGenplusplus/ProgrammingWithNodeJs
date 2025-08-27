/**
 * Giving: a number n - where n represents a # of stairs
 *  1 <= n <= 45
 *  Return: a number x - where x represents the # of ways to reach n either taking 1 or 2 steps at a time
 *
 * Ex
 * n | x
 * 1 | 1
 * 2 | 2 (1 + 1 or 2)
 * 3 | 3
 * 4 | 5
 * 5 | 8
 * 6 | 13
 *
 * Looks like the number of ways to reach n steps is = to # of ways to reach n- 1 steps + # of ways to reach n - 2 steps for n > 2.
 */

/**
 * Time complexity is O(n)
 * Space complexity is O(n)
 */

let cache = new Object();
cache[1] = 1;
cache[2] = 2;
cache[3] = 3;

export function climbStairs(n: number): number {
  if (n < 4) return n;

  let previous;
  let doublePrevious;
  if (!cache.hasOwnProperty(n - 1)) {
    cache[n - 1] = climbStairs(n - 1);
  }

  if (!cache.hasOwnProperty(n - 2)) {
    cache[n - 2] = climbStairs(n - 2);
  }
  previous = cache[n - 1];
  doublePrevious = cache[n - 2];
  return previous + doublePrevious;
}
