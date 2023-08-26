const fs = require('fs');

const parseFile = (filePath ) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(data);
    });
}

module.exports = {
    parseFile
} 

