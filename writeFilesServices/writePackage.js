const fs = require('fs');
const { writeFile } = require('./fileServices');

module.exports = {
    writePackageJsonFile
}

async function writePackageJsonFile(projectDir, projectName, projectAuthor,hasMongo,hasLogin) {
    
    let jsonContents = {
        "name": projectName,
        "version": "1.0.0",
        "description": "production ready server created by template-maker",
        "main": "server.js",
        "scripts": {
            "server:dev": "set NODE_ENV=development && nodemon server.js",
            "server:prod": "node server.js"
        },
        "author": projectAuthor,
        "license": "ISC",
        "dependencies": {
            "body-parser": "^1.19.0",
            "cookie-parser": "^1.4.4",
            "cors": "^2.8.5",
            "express": "^4.17.1",
            "express-session": "^1.16.2"
        }
    }
    
    if (hasLogin) {
        jsonContents.dependencies.bcrypt = '^3.0.6'
    }

    if (hasMongo) {
        jsonContents.dependencies.mongodb = '^3.2.7'
    }

    await writeFile(projectDir, 'package.json', JSON.stringify(jsonContents,null,2))
}