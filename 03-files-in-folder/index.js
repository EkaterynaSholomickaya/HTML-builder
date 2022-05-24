const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'secret-folder');

// fs.readFile(filePath, 'utf-8', (err, data) => {
//   console.log(data);
// });

const options = { withFileTypes: true };
fs.readdir(filePath, options, (err, data) => {
  for (let i = 0; i < data.length; i++) {
    // if (!data[i].isDirectory())
    if (data[i].isFile()) {
      fs.stat(
        path.join(__dirname, 'secret-folder', data[i].name),
        (err, stat) => {
          if (err) throw err;
          else {
            let name = data[i].name;
            let index = name.indexOf('.');
            let ext = path.extname(name).slice(1);
            name = name.slice(0, index);
            const size = stat.size / 1024;
            // console.log('size----------', size);

            console.log(` ${name} - ${ext} - ${size}kb`);
          }
        }
      );
    }
  }
});
