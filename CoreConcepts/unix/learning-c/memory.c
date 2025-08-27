
#include <stdio.h>
#include <stdlib.h>

int main () {

    int a = 35000;

    int * this = &a; // this allocates memory in the stack

    // printf("Address of this: %p\n", this);
    // printf("Values of this: %d\n", *this);

    // Stack memory -> exists only in the function
    // Heap memory -> exists until it is freed
    // Static and Global memory -> exists until the program ends

    int * allocMemory = malloc(12); // malloc allocates memory in the heap

    // int is 4 bytes, so 3 ints = 12 bytes
    for (int i = 0; i < 3; i++) {
        allocMemory[i] = 1937208183;
    }

    for (int i = 0; i < 3; i++) {
        printf("Address of allocMemory: %p\n", &allocMemory[i]);
        printf("Values of allocMemory: %d\n", allocMemory[i]);
    }


    return 0;
}