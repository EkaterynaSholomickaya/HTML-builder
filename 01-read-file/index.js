const path = require('path');
const fs = require('fs');
const filePath = path.join(__dirname, 'text.txt');

const stream = new fs.ReadStream(filePath, { encoding: 'utf-8' });

stream.on('readable', function () {
  const data = stream.read();
  if (data) console.log(data);
});

stream.on('end', function () {
  // console.log('END');
});

// ---------------- 2 вариант --------------------------

// const readStream = fs.createReadStream(filePath);
// console.log(readStream);
// readStream.on('data', function (chunk) {
//   console.log(chunk.toString());
// });

// ------------------3 вариант ---------------------------

// fs.readFile(filePath, 'utf8', function (error, data) {
//   if (error) throw error;
//   console.log(data);
// });
