const { writeFile } = require("../../fileServices")
const { capText } = require('../../../services/utilServices')
module.exports = {
    createCrudController
}

async function createCrudController(crudDir,apiName,apiObject) {

    const {create, read, update, remove} = apiObject?.crudOperations

    const text = `const ${apiName}Service = require('./${apiName}.service')
    const logger = require('../../services/logger.service')

    ${_getModuleExport(apiObject.crudOperations, apiName)}
    
    ${(read) ? _getReadText(apiName) : ''}

    ${(create) ? _getCreateText(apiName): ''}

    ${(update) ? _getUpdateText(apiName): ''}

    ${(remove) ? _getRemoveText(apiName): ''}
    `

    await writeFile(crudDir, `${apiName}.controller.js`, text)
}

function _getModuleExport(crudOperations,apiName) {
    moduleExportArray = []
    const singularCappedName = capText(apiName.substring(0,apiName.length-1))
    const operationMap = {
        create: `add${singularCappedName}`,
        read: `get${capText(apiName)}, get${singularCappedName}`,
        update: `update${singularCappedName}`,
        remove: `remove${singularCappedName}`
    }

    for (const operaion in crudOperations) {
        moduleExportArray.push(operationMap[operaion]) 
    }
    
    return `module.exports = {${moduleExportArray.toString()}}`
    
}

function _getRemoveText(apiName) {
    const singularName = apiName.substring(0,apiName.length-1)
    return `// Remove

    async function remove${capText(singularName)}(req, res) {
        try {
            const ${singularName} = await ${apiName}Service.remove(req.params.id)
            res.send(${singularName})
        } catch (err) {
            console.log(err)
            res.status(500).send('server error')
        }
    }`
}

function _getUpdateText(apiName) {
    const singularName = apiName.substring(0,apiName.length-1)
    return `// Update
    
    async function update${capText(singularName)}(req, res) {
        try {
            const ${singularName} = await ${apiName}Service.update(req.body)
            res.send(${singularName})
        } catch (err) {
            console.log(err)
            res.status(500).send('server error')
        }
    }`
}

function _getCreateText(apiName) {
    const singularName = apiName.substring(0,apiName.length-1)
    return `// Create
    
    async function add${capText(singularName)}(req, res) {
        try {
            const ${singularName} = await ${apiName}Service.add(req.body)
            res.send(${singularName})
        } catch (err) {
            console.log(err)
            res.status(500).send('server error')
        }
    }`
}

function _getReadText(apiName) {
    const singularName = apiName.substring(0,apiName.length-1)

    return `
    // Read

        async function get${capText(apiName)}(req, res) {
            try {
                const ${apiName} = await ${apiName}Service.query(req.query)
                res.send(${apiName})
            } catch (err) {
                console.log(err)
                res.status(500).send('server error')
            }
        }

        async function get${capText(singularName)}(req, res) {
            try {
                const ${singularName} = await ${apiName}.query({_id:req.params.id})
                res.send(${singularName})
            } catch (err) {
                console.log(err)
                res.status(500).send('server error')
            }
        }`
}

