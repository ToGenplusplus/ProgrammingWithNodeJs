# Binary numbers:

- Also known as Base2
- Represented as 0 and 1
- A bit represents a single binary number (0 or 1)
- 1 byte = 8 bits = 8 0's or 1's
- To go from base2 to base10 (i.e 1, 2 3, 4):
  - You take each 0 or 1 and multiply it by 2 \*\* i, where i represents its index/position
  - Example
  - ```
      1101
      => 1*2^3 + 1*2^2 + 0 * 2^1 + 1 * 2^0
      => 1 * 8 + 1 * 4 + 0 + 1
      => 8 + 4 + 0 + 1
      => 13
    ```
- The # at 0th position is called Least significant bit/digit
- The # at the most left postion is called the most significant bit/digit

## Calculations

## Represent floating point numbers in binary format

## Hexadecimal Numbers

- Base 16
- 0 1 2 3 4 5 6 7 8 9 A B C D E F
- case insensitive
- E.g 0x456
- The `0x` is just an indicicator to let us know that this is a hexadecimal #
- Convertion from hexadecimal to decimal
- ```
   0x456
   => 6 x 16^0 + 5 x 16^1 + 4 x 16^2
   => 6 + 80 + 1024
   => 1110
  ```
