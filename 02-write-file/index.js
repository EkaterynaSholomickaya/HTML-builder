const process = require('process');
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'text.txt');
// const arg = process.argv;
// console.log(arg);

// console.log(process);

// const a = +arg[2];
// const b = +arg[3];

// const c = a > b ? a : b;
// console.log(c);

const writeStream = fs.createWriteStream(filePath);
const stdin = process.stdin;
const stdout = process.stdout;

stdout.write('Hi!  Write text: \n');
stdin.on('data', (data) => {
  if (data.toString().trim() === 'exit') {
    console.log('Good bye');
    process.exit();
  } else {
    writeStream.write(data.toString());
    stdout.write('The text has been recorded \n');
  }

  process.on('SIGINT', () => {
    console.log('Good bye');
    process.exit();
  });
  process.on('exit', () => {
    console.log('Good bye');
  });
});
