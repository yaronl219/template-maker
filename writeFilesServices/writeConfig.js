const { writeFile, createDir } = require('./fileServices')

module.exports = {
    createConfig
}

async function createConfig(projectDir, mongoConnection) {
    // create config directory
    const configDir = await createDir(projectDir, 'config')
    
    // wait until all files are created before resolving
    return new Promise((resolve, reject) => {
        Promise.all([_createIndexFile(configDir),
        _createEnvFile(configDir, 'prod', mongoConnection),
        _createEnvFile(configDir, 'dev', mongoConnection),
        ]).then(resolve)
    })
}

async function _createEnvFile(configDir, env, mongoConnection) {
    const text = `
    module.exports = ${_getMongoConnectionObject(env, mongoConnection)}
    `

    function _getMongoConnectionObject(env, mongoConnection) {
        if (!Object.values(mongoConnection).length) return '{}'
        const { mongoUser, mongoPass, dbName, clusterAddress } = mongoConnection[env]
        let mongoConnectionObject = {
            dbURL: `mongodb+srv://${mongoUser}:${mongoPass}@${clusterAddress}/?retryWrites=true&w=majority`,
            dbName
        }

        return JSON.stringify(mongoConnectionObject, null, 2)
    }

    await writeFile(configDir, `${env}.js`, text)
}

async function _createIndexFile(configDir) {
    let text = `var config;
    // keys.js - figure out what set of credentials to return
    if (process.env.NODE_ENV === 'production') {
      // we are in production - return the prod set of keys
      config = require('./prod')
    } else {
      // we are in development - return the dev keys!!!
      config = require('./dev')
    }
    
    module.exports = config`

    await writeFile(configDir, 'index.js', text)
}