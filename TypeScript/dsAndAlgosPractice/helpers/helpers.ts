/**
 Useful Information to Remember:
 'A' - ascii values is 65
 'a' - ascii values is 97

 Printable ASCII characters range from 32 - 127 (95 values)

 ASCII is a proper subset of Unicode
 Unicode uses four different encoding formats:
 UTF-7 (7 bit), UTF-8 (8 bit), UTF-16 (16 bit), and UTF-32 (32 bit).

 JavaScript uses 64-bit floats for numbers,
 it can safely represent integers up to 2^{53} - 1(Number.MAX_SAFE_INTEGER)

 array lengths in JS are limited to 2^{32} - 1


 ---- Array tips ----:
 new Array(10).fill(0)// initialize a new array of size 10 with all elements 0

 Array.from({ length: 10}, () => []) ; //initialize a new array of arrays of size 10
 */

export const isAlphaNumeric = (char: string) => /^[a-zA-Z0-9]$/.test(char);
