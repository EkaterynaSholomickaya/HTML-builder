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
      addAssets();
    });
  }
  // if (err.code === 'ENOENT') {
  //   console.log('Директории project-dist нет');
  // }
  else {
    addStyles();
    addAssets();
  }
});

// ------------------- функция добавления стилей -------------------------------

const addStyles = () => {
  fs.mkdir(pathDir, { recursive: true }, (err) => {
    if (err) throw err;
    console.log('Cоздаем директорию');

    // ----------------- чтение стилей для каждого файла css ------------------------

    const readStyleFile = (file, writeStream) => {
      if (file.isFile() && path.extname(file.name) == '.css') {
        const filePath = path.join(pathStyle, file.name);

        const readStream = fs.createReadStream(filePath);
        readStream.on('data', function (chunk) {
          writeStream.write(chunk.toString());
        });
      }
    };

    // --------------- чтение директории styles.css ----------------------------

    const readDir = (pathStyle) => {
      fs.readdir(pathStyle, { withFileTypes: true }, (err, data) => {
        if (err) throw err;
        const writeStream = fs.createWriteStream(pethProject);

        data.forEach((name) => {
          readStyleFile(name, writeStream);
        });
      });
    };

    fs.access(pethProject, (err) => {
      if (err) {
        readDir(pathStyle);
      } else {
        fs.rm(pethProject, { withFileTypes: true }, (err) => {
          if (err) throw err;
          readDir(pathStyle);
        });
      }
    });
  });
};

// --------------------------------- работа с папкой assets -------------------------

const addAssets = () => {
  const pathFilesDir = path.join(__dirname, 'assets');
  const pathCopyDir = path.join(__dirname, 'project-dist', 'assets');

  // fs.mkdir(pathCopyDir, { recursive: true }, (err) => {
  //   if (err) throw err;
  //   fs.readdir(pathFilesDir, (err, data) => {
  //     if (err) throw err;
  //     console.log('data----------', data);
  //   });
  // });

  fs.stat(pathCopyDir, (err) => {
    if (!err) {
      fs.rm(pathCopyDir, { recursive: true }, (err) => {
        if (err) throw err;
        copyFiles(pathFilesDir);
      });
    } /*if (err.code === 'ENOENT')*/ else {
      copyFiles(pathFilesDir);
    }
  });

  const copyFiles = (pathFilesDir) => {
    fs.mkdir(pathCopyDir, { recursive: true }, (err) => {
      if (err) throw err;
    });

    // fs.readdir(pathFilesDir, (err, data) => {
    //   if (err) throw err;
    //   console.log(data);
    // });

    fs.readdir(pathFilesDir, (err, data) => {
      if (err) throw err;
      data.forEach((name) => {
        const pathFile = path.join(pathFilesDir, name);
        const newPathFile = path.join(pathCopyDir, name);

        fs.copyFile(pathFile, newPathFile, (err) => {
          if (err) throw err;
          console.log(`Файл ${name} успешно скопирован`);
        });
      });
    });
  };
};
