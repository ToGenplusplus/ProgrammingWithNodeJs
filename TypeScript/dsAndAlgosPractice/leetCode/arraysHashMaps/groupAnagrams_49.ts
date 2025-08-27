// initial approach
// function groupAnagrams(strs: string[]): string[][] {
//   // string a is an anagram of string b if the letters in string a can be rearranged to be b
//   // ex: ["eat", "tea", "able"] => [["eat", "tea"], ["able"]]

//   // possible to not have any anagrams? yup
//   // only contains 1 string, what would the response be? -> [[""]
//   // length of the strings are the same? - can be different lengths
//   // are the strings only contain alphanumeric characters? - lower case english letters

//   //

//   //  ["eat", "tea", "able", "bar", "beal"] => [["eat", "tea"], ["able", "beal"], ["bar"]]

//   /*
//     [eat, tea]
//     [able]
//     */

//   //isAnagram
//   const anagramMap = new Map<string, string[]>();

//   anagramMap.set(strs[0], [strs[0]]);

//   for (let i = 1; i < strs.length; i++) {
//     const str = strs[i];
//     let foundAnagram = false;
//     for (const val of anagramMap.keys()) {
//       if (isAnagram(val, str)) {
//         const curr = anagramMap.get(val);
//         curr.push(str);
//         anagramMap.set(val, curr);
//         foundAnagram = true;
//       }
//     }

//     if (!foundAnagram) {
//       anagramMap.set(str, [str]);
//     }
//   }

//   return Array.from(anagramMap.values());
// }

// function isAnagram(str1: string, str2: string): boolean {
//   if (str1.length !== str2.length) return false;

//   const charCount: Record<string, number> = {};

//   for (const char of str1) {
//     charCount[char] = (charCount[char] || 0) + 1;
//   }

//   for (const char of str2) {
//     if (!charCount[char]) return false;
//     charCount[char]--;
//   }

//   return true;
// }

/** More optimal approach provided by co pilot
 * Time complexity: O(n * k) where n is the number of strings and k is the maximum length of a string
 * space complexity: O(n) for the map to store the grouped anagrams
 *
 */

function groupAnagrams(strs: string[]): string[][] {
  const anagramMap = new Map<string, string[]>();

  for (const str of strs) {
    // Create a frequency-based key
    const charCount = new Array(26).fill(0); // For 26 lowercase English letters
    for (const char of str) {
      charCount[char.charCodeAt(0) - "a".charCodeAt(0)]++;
    }
    const key = charCount.join("#"); // Use "#" to separate counts for uniqueness

    // Group strings with the same frequency key
    if (!anagramMap.has(key)) {
      anagramMap.set(key, []);
    }
    anagramMap.get(key).push(str);
  }

  // Return the grouped anagrams
  return Array.from(anagramMap.values());
}
