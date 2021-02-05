const { createZip } = require('./compressDir');
const { writeServerJsFile } = require('./writeServer');
const { writePackageJsonFile } = require('./writePackage');
const { createDir } = require('./writeFile');
const { createConfig } = require('./writeConfig');
const { createServices } = require('./services/writeServices');
const { createMiddleware } = require('./writeMiddleware');
const { createApis } = require('./APIs/writeApis');

// to be later replaced by a json file
optionsObject = {
    projectName: 'express-template-maker',
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
        templates: {
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

buildExpressServer(optionsObject)

async function buildExpressServer(options) {
    const startTime = Date.now()
    // TODO - replace 1 with timestamp
    const projectName = `${options.projectName}-${1}`
    const projectDir = await createDir(`../output/tmp`, projectName)

    const hasMongo = !!Object.values(options.mongoConnection).length

    const shouldCreateAPIs = options.hasLogin || Object.values(options.APIs).length

    await writeServerJsFile(projectDir, options)
    await writePackageJsonFile(projectDir, options.projectName, options.projectAuthor, hasMongo, options.hasLogin)
    await createConfig(projectDir, options.mongoConnection)
    await createServices(projectDir, hasMongo)
    if (options.hasLogin) await createMiddleware(projectDir)
    if (shouldCreateAPIs) await createApis(projectDir, hasMongo, options.hasLogin, options.APIs)

    // TODO - turn this to promise all then create zip
    await createZip(projectDir, projectName)
    console.log('finished process in', Date.now() - startTime, 'ms')

}

