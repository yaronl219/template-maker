const { writeFile } = require("../../writeFile")
const { capText } = require('../../../services/utilServices')

module.exports = {
    createCrudRoutes
}

async function createCrudRoutes(crudDir,apiName,apiObject) {

    const {create, read, update, remove} = apiObject?.crudOperations

    const text = `
    const express = require('express')
    ${_getRequireAuth(apiObject.crudOperations)}
    ${_getImports(apiObject.crudOperations,apiName)}

    const router = express.Router()

    ${_getGetText(apiName,read)}
    ${_getPostText(apiName, create)}
    ${_getUpdateText(apiName,update)}
    ${_getDeleteText(apiName,remove)}
    

    module.exports = router`

    await writeFile(crudDir, `${apiName}.routes.js`, text)
}

function _getDeleteText(apiName,remove) {
    if (!remove) return ''
    const singularCappedName = capText(apiName.substring(0,apiName.length-1))
    return `router.delete('/', ${_getAuthString(remove)}remove${singularCappedName})`
}

function _getUpdateText(apiName,update) {
    if (!update) return ''
    const singularCappedName = capText(apiName.substring(0,apiName.length-1))
    return `router.put('/', ${_getAuthString(update)}update${singularCappedName})`
}

function _getPostText(apiName,create) {
    if (!create) return ''
    const singularCappedName = capText(apiName.substring(0,apiName.length-1))
    return `router.post('/', ${_getAuthString(create)}add${singularCappedName})`
}


function _getGetText(apiName,read) {
    if (!read) return ''
    const singularCappedName = capText(apiName.substring(0,apiName.length-1))
    return `router.get('/', ${_getAuthString(read)}get${capText(apiName)})
    router.get('/:id', ${_getAuthString(read)}get${singularCappedName})`
}

function _getAuthString(operation) {
    const {requiresAuth} = operation
    return (requiresAuth) ? 'requireAuth, ' : ''
}


function _getRequireAuth(crudOperations) {
    for (const operation in crudOperations) {
        if (crudOperations[operation].requiresAuth) {
            // if any item requires auth
            return `const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')`
        }
    }
    return ''
}

function _getImports(crudOperations,apiName) {
    importArry = []
    const singularCappedName = capText(apiName.substring(0,apiName.length-1))
    const operationMap = {
        create: `add${singularCappedName}`,
        read: `get${capText(apiName)}, get${singularCappedName}`,
        update: `update${singularCappedName}`,
        remove: `remove${singularCappedName}`
    }

    for (const operaion in crudOperations) {
        importArry.push(operationMap[operaion]) 
    }
    
    return `const {${moduleExportArray.toString()}} = require(${apiName}.controller)`
    
}