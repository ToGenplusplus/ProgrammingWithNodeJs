#include <stdio.h>
#include <stdlib.h>


int main(int argc, char *argv[]) {

    // open the output file in write mode

    char *filename = argv[1];
    FILE *outputFile = fopen(filename, "w");

    // allocate memory for the number string
    // we are allocating 10 bytes for the number string as we dont expect more than 10 characters
    // in the number string
    char * number = (char*)malloc(10 * sizeof(char));

    int index = 0;
    number[index++] = '$';
    
    // get the first character from standard input
    int c = fgetc(stdin);

    // continue reading characters until EOF (Ctrl+D) is reached
    while (c != EOF) {

        // fprintf(stdout, "%c", c);
        // if the character is a digit, store it in the number string
        if (c != ' ') {
            number[index] = c;
            index++;
        } else {
            // if we have read a number, format it
            if (index > 1) {
                // terminate the string
                number[index] = '\0';


                // write the formatted number to the file
                fprintf(outputFile, "%s ", number);
                // flush the output buffer
                // fflush(outputFile);
                // reset the index for the next number
                index = 0;
                number[index++] = '$';
            }
        }
        c = fgetc(stdin);
    }

    // realease the memory allocated for the number string
    free(number);
    // close the output file
    fclose(outputFile);
    // exit the program
    // we are using exit(0) to indicate that the program has completed successfully
    exit(0);
}