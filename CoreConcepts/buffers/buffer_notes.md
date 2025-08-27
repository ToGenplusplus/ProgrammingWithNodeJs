# Buffers

## Pre Reqs

### Charater Encodings.

- Character sets

  - letters and symbols (characters) that a writing system uses, and a representation of assigning different numbers to those characters
  - i.e Unicode or ASCII
  - To see all the charaters defined in a character set for ASCII:
    - In terminal `man ascii`
    - Notice for hexadecimal representations only 2 #'s are used
    - Which means we can only store up to 8 bits of ASCII representation\
    - ASCII is just a subset of Unicode

- Character encondings:
  - A system of assigining a character to a sequence of bytes that the computer will understand.
  - i.e UTF-8
    - defined by the Unicode standard, therefore its characters have the same #s as the Unicode.
    - 8 stands for 8 bits, which means it tries to store the characters in a sequence of 8 bits

** WE ALWAYS HAVE TO SEPCIFY THE ENCODING SYSTEM **

- our OS automatically does this for us.

### So what are Buffers

- memory container
- data structure specifically designed for binary data
- E.g
  - we can allocate a buffer of 4 bytes (32 bits) \*size is immutable
  - each element is exaclty 1 byte and cannot be changed in node
