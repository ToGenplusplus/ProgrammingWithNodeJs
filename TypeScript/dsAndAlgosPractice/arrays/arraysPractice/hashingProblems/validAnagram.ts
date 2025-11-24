
/**
 * given two strings s and t , write a function to determine if t is an anagram of s.
  Example 1:
    Input: s = "anagram", t = "nagaram"
    Output: true
  Example 2:
    Input: s = "rat", t = "car"
    Output: false
 * @param s 
 * @param t 
 */
function isAnagram(s: string, t: string): boolean {
    /**
     * to be an anagram
     * s and t must be the same length 
     * s and t must have the frequency of characters
     * 
     * s = "anagram", t = "nagaram"
     * iterate through s -> a 1 n 1 a 2 g 1 r 1 a 3 m 1
     * iterate through t (decrement s counter) -> n 0 a 2 g 0 a 1 r 0 a 0 m 0
     * after iterating though t, all chracter counts are 0, so therefroe anagram
     * 
     * based on this what is not anagram is:
     * if char is not in the map
     * if all char counts is not 0 
     */

    if (s.length !== t.length) return false

    let charCounter = {}

    for (let i = 0; i < s.length; i++) {
        let sChar = s[i]
        let tChar = t[i]
        if(!charCounter[sChar]) {
            charCounter[sChar] = 0
        }
        charCounter[sChar]++
        
        if (!charCounter[tChar]) {
            charCounter[tChar] = 0
        }
        charCounter[tChar]--
    }

    for (const count of Object.values(charCounter)) {
        if (count !== 0) return false;
    }
    return true;
};