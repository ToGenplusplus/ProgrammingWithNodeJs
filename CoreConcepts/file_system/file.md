# files

- everything on the computer, os, hard drive, ram is just a combination of files.
- Dealing with files in node:

  - node js does not directly manipulate the files on the hard drive, it has no way of doing that.
  - Instead it leverages system calls in the operating system to execute file operations
  - uses the libuv library to accomplish this.

- To do anything with a file, it first needs to be 'opened'.
  - This means the file is assgined a unique file descriptor (id)
  - allowing you to only deal with the specific file
  - \*\* remember to always close the file
