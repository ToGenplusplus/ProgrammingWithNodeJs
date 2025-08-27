function longestCommonPrefix(strs: string[]): string {
  /**
      I: 
          string array
          range of strs? - 1 <= strs.length <= 200
          range of the lenght of chars in strs[i] - 0 <= strs[i].length <= 200
          what types of chars are in strs[i]? - lowercaseEnglish letters
          str[i] can be an empty string ""

      O:
          string s where s represents the longest common prefix amongst strs

      constrains:
          time complexity?
          space complexity?

      example:
          "flower","flow","flight" -> fl reasoning - each str in strs all start with fl
      example:
          ["dog","racecar","car"] -> "" all strs dont share a common prefix

      example ["dog","dogged"] -> dog

      ["dog","racecar","car"]
      iter | strs[i] | LCP
      0 | dog | ""
      1 | racecar | 

      1. One approach
          sort strs,
          iterate through sorted strs, compare each char in strs[i] with strs[i + 1]
          if chars are the same, append to a common prefix until chars are not the same
          replace with the currect LCM if this one if > 

      Time complexity of o((n log n) * s) where n = length of strs and s = length or strs[i]

      Trying to see if i can establish a pattern
      
      LCP - each string in strs has this prefix
      if one string does not match then return ""

      ["","flow","flight", "fight", "faught"]
      ["flower","flow","flight", "fight", "faught"]
      iter | strs[i] | strs[i+1] | LCM

      set our LCM to first str in strs (if LCM is an emptry string, we return it immediately)
      iterate through strs starting from index 1
      compare each character in str[i] to LCM
          if str[i] = "" return immediately
          if first character in LCM does not match first character in str[i] break loop return ""
          our new LCM would be the matching chars in str[i] to current LCM

      ["flower","flow","flight", "fight", "faught"]
      time complextiy of O(n * s)
   */

  let resultLcp = strs[0];

  for (let strsIndex = 1; strsIndex < strs.length; strsIndex++) {
    let lcpIndex = 0;
    let sIndex = 0;
    let currentLcp = "";
    const str = strs[strsIndex];

    while (lcpIndex < resultLcp.length && sIndex < str.length) {
      if (resultLcp[lcpIndex] === str[sIndex]) {
        currentLcp += str[sIndex];
      } else {
        break;
      }
      sIndex++;
      lcpIndex++;
    }
    resultLcp = currentLcp.length < resultLcp.length ? currentLcp : resultLcp;
    if (resultLcp === "") return resultLcp;
  }

  return resultLcp;
}

//more readable solution:
function longestCommonPrefixReadable(strs: string[]): string {
  if (!strs.length) return "";

  let resultLcp = strs[0]; // Start with the first string as the initial LCP

  for (let i = 1; i < strs.length; i++) {
    const str = strs[i];
    let j = 0;

    // Compare characters of resultLcp and the current string
    while (j < resultLcp.length && j < str.length && resultLcp[j] === str[j]) {
      j++;
    }

    // Update resultLcp to the common prefix found so far
    resultLcp = resultLcp.substring(0, j);

    // If at any point the LCP becomes empty, return immediately
    if (resultLcp === "") return resultLcp;
  }

  return resultLcp;
}
