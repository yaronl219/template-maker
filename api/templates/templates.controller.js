const templatesService = require('./templates.service')
    const logger = require('../../services/logger.service')

    module.exports = {downloadZip}
    
    

    // Create
    
    async function downloadZip(req, res) {
        try {
            const file = await templatesService.createTemplateAndGetZip(req.body)
            console.log('filepath', file)
            res.download(file)
        } catch (err) {
            console.log(err)
            res.status(500).send('server error')
        }
    }

    

    
    