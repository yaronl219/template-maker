const { buildExpressServer } = require("../../writeFilesServices/buildExpressServer")



module.exports = { createTemplateAndGetZip }


// Create
async function createTemplateAndGetZip(options) {
    const path = await buildExpressServer(options)
    return path
}






