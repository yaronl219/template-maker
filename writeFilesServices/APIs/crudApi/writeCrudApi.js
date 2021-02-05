
const { createDir } = require("../../writeFile")
const { createCrudController } = require("./writeCrudController")
const { createCrudRoutes } = require("./writeCrudRoutes")
const { createCrudService } = require("./writeCrudService")

module.exports = {
    createCrudApi
}

async function createCrudApi(apiDir, apiName, hasMongo, apiObject) {
    try {
        const crudDir = await createDir(apiDir, apiName)
        const crudPrm = []
        crudPrm.push(createCrudController(crudDir,apiName,apiObject))
        crudPrm.push(createCrudRoutes(crudDir,apiName,apiObject))
        crudPrm.push(createCrudService(crudDir, hasMongo, apiName, apiObject))

        await Promise.all(crudPrm)
    } catch (err) {
        console.log(err)
    }
}
