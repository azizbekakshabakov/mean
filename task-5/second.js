const fs = require("fs");
const path = require("path");

// ВСЕ ФАЙЛЫ И ПОДДИРЕКТОРИИ
const getAllFiles = function (path, allFiles) {
  files = fs.readdirSync(path);

  files.forEach(function (file) {
    if (fs.statSync(path + "/" + file).isDirectory()) {
      getAllFiles(path + "/" + file, allFiles);
    } else {
      console.log(path + "/" + file);
    }
  });
};
getAllFiles("my-directory");
