# Miscellaneous notes

- Arrow notation:

  - `>>` shift to right
    - Takes the number to the left and shift to the right by a certain amount of bits
    - this is how division is performed
    - e.g : 10 >> 1 (same as floor (10 / 2))
      - => 10 in binary is 1010
      - => shifting to right by 1 bit => 0101 => 5
  - `<<` shift to left
    - this is how multiplication is performed

- Endianness:
  - describes the order in which computer memory stores a sequence of bytes. Endianness can be either big or small, and the adjectives refer to the value stored first.
  - Big Endian:
    - Big-endian is an order in which the big end -- the most significant value in the sequence -- is first, at the lowest storage address.
    - A big-endian computer would store the two bytes required for the hexadecimal number `4F52` as `4F52` in storage.
    - For example, if 4F is stored at storage address 1000, 52 will be at address 1001.
  - Little Endian
    - Little-endian is an order in which the little end, the least significant value in the sequence, is first
    - A big-endian computer would store the two bytes required for the hexadecimal number `4F52` as `524F` in storage with 52 at address 1000 and 4F at 1001.
