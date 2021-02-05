const fs = require('fs');

module.exports = {
    writeFile,
    createDir
}

function writeFile(dir, filename, contents) {
    return new Promise((resolve, reject) => {
        fs.writeFile(`${dir}/${filename}`, contents, (err) => {
            if (err) {
                return reject(console.log(err));
            }
            resolve()
        });
    })
}

function createDir(path, dirName) {
    return new Promise((resolve, reject) => {
        const dir = `${path}/${dirName}`
        if (!fs.existsSync(dir)) {
            console.log('creating directory', dir)
            fs.mkdir(dir,(err) => {
                if (err) {
                    return reject(console.log(err));
                }
                resolve(dir)
            });
        } else {
            // if directory already exists - resolve with the dir name
            resolve(dir)
        }
    })
}