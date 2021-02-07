const { createZip } = require('./compressDir');
const { writeServerJsFile } = require('./writeServer');
const { writePackageJsonFile } = require('./writePackage');
const { createDir, removeFile, removeDir } = require('./fileServices');
const { createConfig } = require('./writeConfig');
const { createServices } = require('./services/writeServices');
const { createMiddleware } = require('./writeMiddleware');
const { createApis } = require('./APIs/writeApis');

module.exports = {
    buildExpressServer
}
// // to be later replaced by a json file
optionsObject = {
    projectName: 'my-project',
    projectAuthor: 'Yaron Lipshitz',
    serveStatic: true,
    frontendPort: 3000,
    frontendFolder: 'public',
    mongoConnection: {},
    // mongoConnection: {
    //     dev: {
    //         mongoUser: 'yaronl219',
    //         mongoPass: 'zgArkG7R6ubgAhjs',
    //         dbName: 'bitcoin',
    //         clusterAddress: 'cluster0.wb3ia.mongodb.net'
    //     },
    //     prod: {
    //         mongoUser: 'yaronl219',
    //         mongoPass: 'zgArkG7R6ubgAhjs',
    //         dbName: 'bitcoin',
    //         clusterAddress: 'cluster0.wb3ia.mongodb.net'
    //     }
    // },
    hasLogin: false,
    APIs: {
        products: {
            // collectionName: 'products',
            crudOperations: {
                create: {
                    requiresAuth: false
                },
                // read: {},
                // remove: {
                //     requiresAuth: true
                // },
                // update: {
                //     requiresAuth: false
                // }
            }
        }
    }
}

async function buildExpressServer(options) {
    const startTime = Date.now()
    // console.log('dirname',__dirname)

    const projectName = `${options.projectName}-${startTime}`
    const projectDir = await createDir(`./output/tmp`, projectName)
try {

    const hasMongo = !!Object.values(options.mongoConnection).length
    
    const shouldCreateAPIs = options.hasLogin || Object.values(options.APIs).length
    
    const prms = []
    prms.push(writeServerJsFile(projectDir, options))
    prms.push(writePackageJsonFile(projectDir, options.projectName, options.projectAuthor, hasMongo, options.hasLogin))
    prms.push(createConfig(projectDir, options.mongoConnection))
    prms.push(createServices(projectDir, hasMongo))
    if (options.hasLogin) prms.push(createMiddleware(projectDir))
    if (shouldCreateAPIs) prms.push(createApis(projectDir, hasMongo, options.hasLogin, options.APIs))
    await Promise.all(prms)
    
    const zipPath = await createZip(projectDir, projectName)
    console.log('finished process in', Date.now() - startTime, 'ms')   
    _removeDirAndZip(zipPath,projectDir,1)
    return zipPath
} catch (err) {
    console.log(err)
    removeDir(projectDir)
}

}

function _removeDirAndZip(zipPath,dirPath,minutesDelay) {
    setTimeout(() => {
        removeDir(dirPath),
        removeFile(zipPath)
    }, minutesDelay*60*1000)
}

