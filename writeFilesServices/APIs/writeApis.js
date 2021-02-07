const { createDir } = require('../fileServices')
const { createAuthApi } = require('./writeAuthApi')
const { createCrudApi } = require('./crudApi/writeCrudApi')


module.exports = {
    createApis
}

async function createApis(projectDir, hasMongo, hasLogin, apis) {
    const apiDir = await createDir(projectDir, 'api')

    const apiPrms = []
    if (hasLogin) {
        apiPrms.push(createAuthApi(apiDir))
        const userApi = {
                crudOperations: {
                    create: {
                        requiresAuth: false
                    },
                    read: {
                        requiresAuth: false
                    },
                    remove: {
                        requiresAuth: true
                    },
                    update: {
                        requiresAuth: true
                    }
                }
        }
        if (hasMongo) userApi.collectionName = 'users'
        apiPrms.push(createCrudApi(apiDir,'users',hasMongo,userApi))
    }

    for (const currApi in apis) {
        apiPrms.push(createCrudApi(apiDir,currApi,hasMongo,apis[currApi]))
    }

    await Promise.all(apiPrms)
}