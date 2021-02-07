const { createDir, writeFile } = require("../fileServices")

module.exports = {
    createAuthApi
}

async function createAuthApi(apiDir) {
        try {
            const authDir = await createDir(apiDir, 'auth')
            
            const authPrm = []
            authPrm.push(_createAuthController(authDir))
            authPrm.push(_createAuthRoutes(authDir))
            authPrm.push(_createAuthService(authDir))
            
            await Promise.all(authPrm)
        } catch (err) {
            console.log(err)
        }
}

async function _createAuthService(authDir) {
    const text = `
    const bcrypt = require('bcrypt')
    const userService = require('../user/user.service')
    const logger = require('../../services/logger.service')

    const saltRounds = 10

    async function login(email, password) {
        logger.debug(\`auth.service - login with email: \${ email } \`)
        if (!email || !password) return Promise.reject('email and password are required!')

        const user = await userService.getByEmail(email)
        if (!user) return Promise.reject('Invalid email or password')
        const match = await bcrypt.compare(password, user.password)
        if (!match) return Promise.reject('Invalid email or password')

        delete user.password;
        return user;
    }

    async function signup(email, password, username) {
        logger.debug(\`auth.service - signup with email: \${email}, username: \${username} \`)
        if (!email || !password || !username) return Promise.reject('email, username and password are required!')

        const hash = await bcrypt.hash(password, saltRounds)
        return userService.add({email, password: hash, username})
    }

    module.exports = {
        signup,
        login,
    }
    `

    await writeFile(authDir, 'auth.service.js', text)
}


async function _createAuthRoutes(authDir) {
    const text = `
        const express = require('express')
        const {requireAuth}  = require('../../middlewares/requireAuth.middleware')
        const {login, signup, logout} = require('./auth.controller')

        const router = express.Router()

        router.post('/login', login)
        router.post('/signup', signup)
        router.post('/logout', requireAuth, logout)

        module.exports = router
 `

    await writeFile(authDir, 'auth.routes.js', text)
}

async function _createAuthController(authDir) {
    const text = `
    const authService = require('./auth.service')
    const logger = require('../../services/logger.service')
    
    async function login(req, res) {
        const { email, password } = req.body
        try {
            const user = await authService.login(email, password)
            req.session.user = user;
            res.json(user)
        } catch (err) {
            res.status(401).send({ error: err })
        }
    }
    
    async function signup(req, res) {
        try {
            const { email, password, username } = req.body
            logger.debug(email + ", " + username + ', ' + password)
            const account = await authService.signup(email, password, username)
            logger.debug(\`auth.route - new account created: \` + JSON.stringify(account))
            const user = await authService.login(email, password)
            req.session.user = user
            res.json(user)
        } catch (err) {
            logger.error('[SIGNUP] ' + err)
            res.status(500).send({ error: 'could not signup, please try later' })
        }
    }
    
    async function logout(req, res){
        try {
            req.session.destroy()
            res.send({ message: 'logged out successfully' })
        } catch (err) {
            res.status(500).send({ error: err })
        }
    }
    
    module.exports = {
        login,
        signup,
        logout
    }
    `

    await writeFile(authDir, 'auth.controller.js', text)
}