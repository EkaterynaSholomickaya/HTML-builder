const fs = require('fs');
const path = require('path');

// ----------------- блок для стилей ----------------------------------

const pathStyle = path.join(__dirname, 'styles');
const pethProject = path.join(__dirname, 'project-dist', 'style.css');

// ------------------ работаем с папкой project-dist --------------------------

const pathDir = path.join(__dirname, 'project-dist');

fs.stat(pathDir, (err) => {
  if (!err) {
    fs.rm(pathDir, { recursive: true }, (err) => {
      if (err) throw err;
      addStyles();
    });
  } else if (err.code === 'ENOENT') {
    console.log('Директории project-dist нет');
  }
  addStyles();
});

const addStyles = () => {
  fs.mkdir(pathDir, { recursive: true }, (err) => {
    if (err) throw err;
    console.log('Cоздаем директорию');
  });

  const readStyleFile = (file) => {
    console.log('заашли в чтение стилей');

    if (file.isFile() && path.extname(file.name) == '.css') {
      const filePath = path.join(pathStyle, file.name);
      console.log('filePath----------------------', filePath);

      const readStream = fs.createReadStream(filePath);
      readStream.on('data', function (chunk) {
        console.log('записываем --------------------------------------------');

        //writeStream.write(chunk.toString());
      });
    }
  };

  const readDir = (pathStyle) => {
    console.log('pathStyle ------------------------------------', pathStyle);

    fs.readdir(pathStyle, { withFileTypes: true }, (err, data) => {
      if (err) throw err;
      console.log('data --------------------------', data);
      console.log('pethProject --------------------------', pethProject);
      //const writeStream = fs.createWriteStream(pethProject);

      data.forEach((name) => {
        readStyleFile(name);
      });
    });
  };

  fs.access(pethProject, (err) => {
    if (err) {
      console.log(
        'проверяем наличие файла ------------------------------------------'
      );
      readDir(pathStyle);
    } else {
      fs.rm(pethProject, { withFileTypes: true }, (err) => {
        if (err) throw err;
        console.log(
          'удаляем файл стайл ------------------------------------------'
        );
        readDir(pathStyle);
      });
    }
  });
};

//-------------------------- работа со стилями ----------------------------------

// const readStyleFile = (file, writeStream) => {
//   if (file.isFile() && path.extname(file.name) == '.css') {
//     const filePath = path.join(pathStyle, file.name);
//     const readStream = fs.createReadStream(filePath);
//     readStream.on('data', function (chunk) {
//       writeStream.write(chunk.toString());
//     });
//   }
// };

// const readDir = (pathStyle) => {
//   fs.readdir(pathStyle, { withFileTypes: true }, (err, data) => {
//     if (err) throw err;

//     const writeStream = fs.createWriteStream(pethProject);

//     data.forEach((name) => {
//       readStyleFile(name, writeStream);
//     });
//   });
// };

// fs.access(pethProject, (err) => {
//   if (err) {
//     readDir(pathStyle);
//   } else {
//     fs.rm(pethProject, { withFileTypes: true }, (err) => {
//       if (err) throw err;
//       readDir(pathStyle);
//     });
//   }
// });

// --------------------------------- работа с папкой assets -------------------------

// const pathFilesDir = path.join(__dirname, 'project-dist', 'assets');
// const pathCopyDir = path.join(__dirname, 'assets');

// fs.stat(pathCopyDir, (err) => {
//   if (!err) {
//     fs.rm(pathCopyDir, { recursive: true }, (err) => {
//       if (err) throw err;
//       copyFiles(pathFilesDir);
//     });
//   } else if (err.code === 'ENOENT') {
//     copyFiles(pathFilesDir);
//   }
// });

// const copyFiles = (pathFilesDir) => {
//   fs.mkdir(pathCopyDir, { recursive: true }, (err) => {
//     if (err) throw err;
//   });

//   fs.readdir(pathFilesDir, (err, data) => {
//     if (err) throw err;
//     data.forEach((name) => {
//       const pathFile = path.join(pathFilesDir, name);
//       const newPathFile = path.join(pathCopyDir, name);

//       fs.copyFile(pathFile, newPathFile, (err) => {
//         if (err) throw err;
//         console.log(`Файл ${name} успешно скопирован`);
//       });
//     });
//   });
// };
