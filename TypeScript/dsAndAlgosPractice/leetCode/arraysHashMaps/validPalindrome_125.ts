export function isPalindrome(s: string): boolean {
  //palindrome is a word or phrase that uses the same characters forwards and backwards
  // ex: race a car -> false, bob -> true, boa -> false
  //s is a string (type of characters?) - alphaNumeric, space, alphabets (convert each to lowercase), numers
  // s can be an empty string, s can only be 1 length
  // all of s can be in memory, size of 0 < s.length < 10 ^ 4

  //* if we see a space, skip
  //race a car - false example
  // front | rear, every iteration increase f and r if chars are the same
  /** r | r
        a | a
        c | c
        e | ''
        e | a - return false
    //race e car - true example
    // front | rear, every iteration increase f and r if chars are the same
        r | r
        a | a
        c | c
        e | ''
        e | e
        '' | '' - rear = front = '' - return true

     // "race a car"   
        front | s[front] | rear | s[rear]
        0 | r | 9| r
        1 | a | 8 | a
        2 | c | 7 | c
        3 | e | 6 | _
        3 | e | 5 | a 
     */
  if (s.length < 2) return true;

  let front = 0; // Initialize the front pointer to the start of the string
  let rear = s.length - 1; // Initialize the rear pointer to the end of the string

  // Loop until the front and rear pointers meet or cross
  while (front < rear) {
    // Skip non-alphanumeric characters
    while (front < rear && !isCharAlphaNumeric(s[front])) front++;
    while (front < rear && !isCharAlphaNumeric(s[rear])) rear--;

    // Compare characters
    if (s[front].toLowerCase() !== s[rear].toLowerCase()) return false;

    front++;
    rear--;
  }

  return true;

  // above solution time complexity is o(s) where s is the length of input string s
  // no additional memeory being used, o(1) space
}

function isCharAlphaNumeric(c: string): boolean {
  return /^[a-z0-9]$/i.test(c); // Check if the character is alphanumeric (a-z, A-Z, 0-9)
  // The 'i' flag makes the regex case-insensitive
}
