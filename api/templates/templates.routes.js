
    const express = require('express')
    
    const {downloadZip} = require('./templates.controller')

    const router = express.Router()

    
    router.post('/', downloadZip)
    
    
    

    module.exports = router