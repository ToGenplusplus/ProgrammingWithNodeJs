/**
 Useful Information to Remember:
 'a' - ascii values is 97
 Printable ASCII characters range from 32 - 127 (95 values)
 ASCII is a proper subset of Unicode
 Unicode uses four different encoding formats:
 UTF-7 (7 bit), UTF-8 (8 bit), UTF-16 (16 bit), and UTF-32 (32 bit).
 */

export const isAlphaNumeric = (char: string) => /^[a-zA-Z0-9]$/.test(char);
