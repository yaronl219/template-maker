const { writeFile } = require("../../writeFile")

module.exports = {
    createCrudService
}

async function createCrudService(crudDir, hasMongo, apiName, apiObject ) {
    const {collectionName} = apiObject
    const {create, read, update, remove} = apiObject?.crudOperations

    // if user has marked that has mongo, but has not supplied collection name
    // behave if though there is no mongo

    if (hasMongo && !collectionName) hasMongo = false

    const text = `
    ${hasMongo ? `
    const dbService = require('../../services/db.service')
    const ObjectId = require('mongodb').ObjectId` : ''}

    ${_getModuleExport(apiObject.crudOperations)}

    ${(create) ? `
    // Create
    async function add(item) {
        ${hasMongo ? _getAddText(collectionName) : _getCustomLogicText()}
    }` : ''}
    
    ${(read) ? `
    // Read
    async function query(filteryBy = {}) {
        ${hasMongo ? _getQueryText(collectionName) : _getCustomLogicText()}
    }` : ''}

    ${(update) ? `
    // Update
    async function update(item) {
        ${hasMongo ? _getUpdateText(collectionName) : _getCustomLogicText()}
    }` : ''}

    ${(remove) ? `
    // Delete
    async function remove(${collectionName}Id) {
        ${hasMongo ? _getRemoveText(collectionName) : _getCustomLogicText()}
    }` : ''}
`

    await writeFile(crudDir, `${apiName}.service.js`, text)
}

function _getModuleExport(crudOperations) {
    moduleExportArray = []
    const operationMap = {
        create: 'add',
        read: 'query',
        update: 'update',
        remove: 'remove'
    }

    for (const operaion in crudOperations) {
        moduleExportArray.push(operationMap[operaion]) 
    }
    
    return `module.exports = {${moduleExportArray.toString()}}`
    
}

function _getCustomLogicText() {
    return '// ADD YOUR LOGIC HERE'
}

function _getUpdateText(collectionName) {
    return `
    const collection = await dbService.getCollection(${collectionName})
    item._id = ObjectId(item._id);

    try {
        await collection.replaceOne({ "_id": item._id }, { $set: item })
        return item
    } catch (err) {
        console.log(\`ERROR: cannot update \${item._id}\`)
        throw err;
    }
`
}

function _getAddText(collectionName) {
    return `
const collection = await dbService.getCollection(${collectionName})
try {
    await collection.insertOne(item);
    return item;
} catch (err) {
    console.log(\`ERROR: cannot insert item\`)
    throw err;
}
`
}

function _getRemoveText(collectionName) {
    const collectionNameId = `${collectionName}Id`

    return `
    const collection = await dbService.getCollection(${collectionName})
    try {
        await collection.deleteOne({ "_id": ObjectId(${collectionNameId}) })
    } catch (err) {
        console.log(\`ERROR: cannot remove \${${collectionNameId}}\`)
        throw err;
    }
`
}


function _getQueryText(collectionName) {
    return `
const criteria = _buildCriteria(filterBy)
const collection = await dbService.getCollection(${collectionName})
try {
    const ${collectionName} = await collection.find(criteria).toArray();
    return ${collectionName}
} catch (err) {
    console.log('ERROR: cannot find ${collectionName}')
    throw err;
}
`
}
