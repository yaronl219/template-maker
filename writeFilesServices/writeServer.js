const { makeId } = require("../services/utilServices")
const { writeFile } = require("./fileServices");

module.exports = {
    writeServerJsFile
}

// await writeServerJsFile(projectDir, options.frontendFolder, options.frontendPort, options.serveStatic, options.hasLogin, )
async function writeServerJsFile(projectDir,options) {
    const {frontendFolder, frontendPort, serveStatic, hasLogin, APIs} = options

    const text = `
    const express = require('express')
    const bodyParser = require('body-parser')
    const cors = require('cors')
    const path = require('path')
    const cookieParser = require('cookie-parser')
    const session = require('express-session')

    const app = express()
    const http = require('http').createServer(app);
    
    app.use(cookieParser())
    app.use(bodyParser.json());
    app.use(session({
        secret: '${makeId(24)}',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
    }))

    ${serveStatic ? _getServeStatic(frontendFolder) : ''}
    ${_getCorsOptions(frontendPort)}
    ${options.hasLogin || Object.values(options.APIs).length ? _getApiRoutes(hasLogin,APIs) : ''}
    const logger = require('./services/logger.service')
    const port = process.env.PORT || 3030;
    http.listen(port, () => {
        logger.info('Server is running on port: ' + port)
    });

    `
    // TODO - ADD ROUTES
    await writeFile(projectDir,'server.js',text)
}

function _getApiRoutes(hasLogin,apis) {
    const apiRoutes = Object.keys(apis)
    if (hasLogin) {
        apiRoutes.push('users','auth')
    }
    
    let apiRoutesText = ''
    apiRoutes.forEach(route => {
        apiRoutesText += `const ${route}Routes = require('./api/${route}/${route}.routes') \n`
    })

    apiRoutes.forEach(route => {
        apiRoutesText += `app.use('/api/${route}', ${route}Routes)\n`
    })
    return apiRoutesText
}

function _getServeStatic(frontendFolder) {
    return `
    app.use(express.static(path.resolve(__dirname, '${frontendFolder}')));
    app.get('/**', (req, res) => {
        res.sendFile(path.join(__dirname, '${frontendFolder}', 'index.html'));
    })
    `
}

function _getCorsOptions(port) {
    return `
    if (process.env.NODE_ENV === 'development') {
        const corsOptions = {
            origin: ['http://127.0.0.1:${port}', 'http://localhost:${port}' ],
            credentials: true
        };
        app.use(cors(corsOptions));
    }
    `
}