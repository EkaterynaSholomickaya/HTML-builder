const fs = require('fs');
const path = require('path');

const pathFilesDir = path.join(__dirname, 'files');
const pathCopyDir = path.join(__dirname, 'files-copy');

fs.stat(pathCopyDir, (err) => {
  if (!err) {
    console.log('Директория есть');
    fs.rm(pathCopyDir, { recursive: true }, (err) => {
      if (err) throw err;
      copyFiles(pathFilesDir);
    });
  } else if (err.code === 'ENOENT') {
    console.log('Такой директории нет');

    copyFiles(pathFilesDir);
  }
});

const copyFiles = (pathFilesDir) => {
  fs.mkdir(pathCopyDir, { recursive: true }, (err) => {
    if (err) throw err;
  });

  fs.readdir(pathFilesDir, (err, data) => {
    if (err) throw err;
    data.forEach((name) => {
      const pathFile = path.join(__dirname, 'files', name);
      const newPathFile = path.join(__dirname, 'files-copy', name);

      fs.copyFile(pathFile, newPathFile, (err) => {
        if (err) throw err;
        console.log(`Файл ${name} успешно скопирован`);
      });
    });
  });
};
