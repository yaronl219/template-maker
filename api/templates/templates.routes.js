
    const express = require('express')
    
    const {addTemplate} = require(templates.controller)

    const router = express.Router()

    
    router.post('/', addTemplate)
    
    
    

    module.exports = router