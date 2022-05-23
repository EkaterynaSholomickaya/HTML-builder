const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'secret-folder');

// fs.readFile(filePath, 'utf-8', (err, data) => {
//   console.log(data);
// });

const options = { withFileTypes: true };
fs.readdir(filePath, options, (err, data) => {
  // console.log(data);
  for (let i = 0; i < data.length; i++) {
    // if (!data[i].isDirectory())
    if (data[i].isFile()) {
      // console.log(data[i].name);
      fs.stat(
        path.join(__dirname, 'secret-folder', data[i].name),
        (err, stat) => {
          if (err) throw err;
          else {
            let name = data[i].name;
            let index = name.indexOf('.');
            // let ext = name.slice(index + 1, name.lenght);
            let ext = path.extname(name).slice(1);
            name = name.slice(0, index);
            // console.log(ext);
            // console.log(name);
            console.log(` ${name} - ${ext} - ${stat.size}kb`);
          }
        }
      );
    }
  }
});
