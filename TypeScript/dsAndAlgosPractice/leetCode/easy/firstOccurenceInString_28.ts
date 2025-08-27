export function strStr(haystack: string, needle: string): number {
  /**
        I:
            two strings, needle, haystack
            lowercase english letters
            1 <= haystack.length, needle.length <= 104

        O:  
            index of needle in haystack or -1 

        Constraints

        example: 
        n: sad, hay: sadbutsad -> 0 sad occurs at index 0 and 6, first occurence is 0
        n: sad, hay:sasandsad -> 6 sad occurs at index 6

    
        n: sad, hay:sasandsad ->
        n:h
        s, s
        a, a,
        d, s -> does not match, but s is first char in needle so start reading from here again
        s, s
        a,a
        d,n -> does not match, start from the top in needle, keep going in haystack till we find a matching s
        _,d
        s,s
        a,a
        d,d - done iterating through needle, we found a match, return start index

    
        needle.length must be <= haystack.length
        iterate through haystack until we find a char such that char[i] = needle[0]
            markIndex of char[i] as startIndex
            iterate through needle & haystack while the chars are the same and still in bounds of both string lengths
            if the loop broke becuase we are at the end of needle return startIndex
            if needle broke because we are at the end of haystack return -1 or (break while loop)
            if (needle broke becuase the characters dont match)
                continue
     */

  if (!needle || !haystack || needle.length > haystack.length) return -1;

  let hayIter = 0;

  while (hayIter < haystack.length) {
    while (hayIter < haystack.length && haystack[hayIter] !== needle[0])
      hayIter++;
    if (hayIter >= haystack.length) return -1;
    let startIndex = hayIter;
    let anotherFirstLetterIndex = startIndex;
    let nIter = 0;
    while (
      hayIter < haystack.length &&
      nIter < needle.length &&
      haystack[hayIter] === needle[nIter]
    ) {
      hayIter++;
      nIter++;
      if (
        haystack[hayIter] === needle[0] &&
        anotherFirstLetterIndex === startIndex
      ) {
        anotherFirstLetterIndex = hayIter;
      }
    }
    if (nIter >= needle.length) return startIndex;
    if (anotherFirstLetterIndex !== startIndex)
      hayIter = anotherFirstLetterIndex;
    if (hayIter >= haystack.length) return -1;
  }
  return -1;
}

export function strStrOptimal(haystack: string, needle: string): number {
  if (!needle) return 0;

  const lps = buildLPS(needle);
  let i = 0; // Pointer for haystack
  let j = 0; // Pointer for needle
  /**
   * Walkthorugh: needle = "abcaby" haystack = "ababcabcaby"
   * LPS = [0, 0, 0, 1, 2, 0]
   * i =2 , j = 0
   * i = 7, j = 2
   */

  while (i < haystack.length) {
    if (haystack[i] === needle[j]) {
      i++;
      j++;
      if (j === needle.length) return i - j; // Found the match
    } else {
      if (j > 0) {
        j = lps[j - 1]; // Use LPS to skip comparisons
      } else {
        i++;
      }
    }
  }

  return -1; // No match found
}

function buildLPS(needle: string): number[] {
  const lps = new Array(needle.length).fill(0);
  let length = 0; // Length of the previous longest prefix suffix
  let i = 1;

  while (i < needle.length) {
    if (needle[i] === needle[length]) {
      // Characters match, extend the prefix suffix
      length++;
      lps[i] = length;
      i++;
    } else {
      if (length > 0) {
        // Fall back to the previous prefix suffix
        length = lps[length - 1];
      } else {
        // No prefix suffix, set LPS[i] to 0
        lps[i] = 0;
        i++;
      }
    }
  }

  return lps;
}
