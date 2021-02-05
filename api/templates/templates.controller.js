const templatesService = require('./templates.service')
    const logger = require('../../services/logger.service')

    module.exports = {addTemplate}
    
    

    // Create
    
    async function addTemplate(req, res) {
        try {
            const template = await templatesService.add(req.body)
            res.send(template)
        } catch (err) {
            console.log(err)
            res.status(500).send('server error')
        }
    }

    

    
    