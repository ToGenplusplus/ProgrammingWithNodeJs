
#include <stdio.h>

int length(char str[]) {

    char first = str[0];
    int len = 0;

    while (first != '\0') {
        len++;
        first = str[len];
    }

    return len;
}


// start of a C program
int main (int argc, char *argv[])
{

    for (int i = 0; i < argc; i++) {
        printf("Argument %d: %s\n", i, argv[i]);
    }
    int a = 20;
    int b = 30;
    int c = a + b;

    // int -> %d, char -> %c, float -> %f, double -> %lf, string -> %s, size_t -> %zu, void -> %p

    printf("The sum of %d and %d is %d\n", a, b, c);
    fprintf(stdout, "The sum of %d and %d is %d\n", a, b, c);

    printf("Size of int is %zu bytes \n", sizeof(int));
    printf("Size of char is %zu bytes \n", sizeof(char));
    printf("Size of float is %zu bytes \n", sizeof(float));
    printf("Size of double is %zu bytes \n", sizeof(double));
    printf("Side of long is %zu bytes \n", sizeof(long));
    printf("Size of size_t is %zu bytes \n", sizeof(size_t));

    // &variable -> address of variable 
    // *(&variable) -> value of variable

    size_t t = 18446744073709551615ULL;

    printf("Value of size_t is %zu \n", t);
    printf("Addres of t is %p \n", &t);

    for (int i = 0; i < sizeof(size_t); ++i) {
        printf("Byte %d, adress %p, value %d \n", i, (void *)((char *)&t + i), *((char *)&t + i));
    }

    //String in C

    char myStr[6];

    myStr[0] = 'T';
    myStr[1] = 'e';
    myStr[2] = 's';
    myStr[3] = 't';
    myStr[4] = '\0';

    printf("String is %s \n", myStr);

    char* anotherString = "Another string";
    printf("String is %s \n", anotherString);
    printf("Length of string is %d \n", length(anotherString));
    return 0;
}
// This is a simple C program that prints "Hello, World!" to the console.