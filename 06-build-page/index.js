const fs = require('fs');
const path = require('path');

// ----------------- блок для стилей ----------------------------------

const pathStyle = path.join(__dirname, 'styles');
const pethProject = path.join(__dirname, 'project-dist', 'style.css');

const pathFilesDir = path.join(__dirname, 'assets');
const pathCopyDir = path.join(__dirname, 'project-dist', 'assets');

// ------------------ работаем с папкой project-dist --------------------------

const pathDir = path.join(__dirname, 'project-dist');

fs.stat(pathDir, (err) => {
  if (!err) {
    fs.rm(pathDir, { recursive: true }, (err) => {
      if (err) throw err;
      addStyles();
      addAssets(pathFilesDir, pathCopyDir);
      htmlBilder();
    });
  }
  // if (err.code === 'ENOENT') {
  //   console.log('Директории project-dist нет');
  // }
  else {
    addStyles();
    addAssets(pathFilesDir, pathCopyDir);
    htmlBilder();
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

const addAssets = (pathFilesDir, pathCopyDir) => {
  fs.mkdir(pathCopyDir, { recursive: true }, (err) => {
    if (err) throw err;
  });

  fs.readdir(pathFilesDir, { withFileTypes: true }, (err, data) => {
    if (err) throw err;
    data.forEach((file) => {
      if (file.isFile()) {
        const pathFile = path.join(pathFilesDir, file.name);
        const newPathFile = path.join(pathCopyDir, file.name);

        fs.copyFile(pathFile, newPathFile, (err) => {
          if (err) throw err;
          // console.log(`Файл ${file} успешно скопирован`);
        });
      } else {
        addAssets(
          path.join(pathFilesDir, file.name),
          path.join(pathCopyDir, file.name)
        );
      }
    });
  });
};
//------------------ сборка html -----------------------------

const htmlBilder = () => {
  const templatePath = path.join(__dirname, 'template.html');
  const resultHtmlPath = path.join(__dirname, 'project-dist', 'index.html');
  const componentsPath = path.join(__dirname, 'components');

  // ----------- читаем папку компоненты ----------------------

  // fs.readdir(componentsPath, { withFileTypes: true }, (err, data) => {
  //   if (err) throw err;
  //   console.log('dannye -------', data);
  // });

  // ------------- читаем template ------------------------------------

  let resultHtml = '';

  const readSrteamTemplate = fs.createReadStream(templatePath);
  readSrteamTemplate.on('data', (chunk) => {
    resultHtml += chunk.toString();
  });

  readSrteamTemplate.on('end', () => {
    insertComponent(resultHtml);
  });

  //------------------- вставляем компоненты -----------------------------

  const insertComponent = (text) => {
    if (text.indexOf('{{') !== -1) {
      const indexEnd = text.indexOf('}}');
      const index = text.indexOf('{{');

      let component = text.slice(index + 2, indexEnd);

      const pathCurrentCompanent = path.join(
        componentsPath,
        component + '.html'
      );

      let componentInner = '';
      const readStreamComponent = fs.createReadStream(pathCurrentCompanent);
      readStreamComponent.on('data', (chunk) => {
        componentInner += chunk;
      });
      readStreamComponent.on('end', () => {
        resultHtml = resultHtml.replace(
          '{{' + component + '}}',
          componentInner
        );
        insertComponent(resultHtml);
      });
    } else {
      const writeStream = fs.createWriteStream(resultHtmlPath);
      writeStream.write(resultHtml);
    }
  };
};
