# Streams

https://nodejs.org/docs/latest-v18.x/api/stream.html#stream

- an abstract interface for working with streaming data in node js
- streams work by gathering the data in memory up to a certain chunk size in bytes defined as the `highWaterMark`. Then transfering the gathered chunk to the destination (in the case of a writable stream)
- i.e If we wanted to write to a file a million times, without streams we will end up doing 1 million write operations. Using streams depending on the chunk size we could only end up doing one write operation to the file.
