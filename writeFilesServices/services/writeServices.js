const { writeFile, createDir } = require('../writeFile')
const { createLoggerService } = require('./writeLoggerService')
const { createMongoService } = require('./writeMongoService')

module.exports = {
    createServices
}

async function createServices(projectDir, hasMongo) {
    const servicesDir = await createDir(projectDir, 'services')

    await createLoggerService(servicesDir)
    if (hasMongo) {
        await createMongoService(servicesDir)
    }
}