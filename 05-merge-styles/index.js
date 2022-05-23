const fs = require('fs');
const path = require('path');

const pathStyle = path.join(__dirname, 'styles');
const pethProject = path.join(__dirname, 'project-dist', 'bundle.css');

//обрабатываем каждый css файл
const readStyleFile = (file, writeStream) => {
  if (file.isFile() && path.extname(file.name) == '.css') {
    const filePath = path.join(pathStyle, file.name);
    // console.log(filePath);
    const readStream = fs.createReadStream(filePath);
    readStream.on('data', function (chunk) {
      writeStream.write(chunk.toString());
    });
  }
};

//читаем каталог
const readDir = (pathStyle) => {
  fs.readdir(pathStyle, { withFileTypes: true }, (err, data) => {
    if (err) throw err;
    // console.log(data);

    const writeStream = fs.createWriteStream(pethProject);

    data.forEach((name) => {
      readStyleFile(name, writeStream);
    });
  });
};

fs.access(pethProject, (err) => {
  //проверка, есть ли файл
  if (err) {
    readDir(pathStyle);
  } else {
    fs.rm(pethProject, { withFileTypes: true }, (err) => {
      if (err) throw err;
      readDir(pathStyle);
    });
  }
});

// fs.readdir(pathStyle, (err, data) => {
//   if (err) throw err;

//   fs.writeFile(pethProject, '', (err) => {
//     if (err) throw err;
//     console.log('Файл успешно создан');
//   });

//   console.log(data);
//   data.forEach((name) => {
//     readStyleFile(name);
//   });
// });
