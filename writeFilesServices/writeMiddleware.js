const { writeFile, createDir } = require('./writeFile')

module.exports = {
    createMiddleware
}

async function createMiddleware(projectDir) {
    const middlewareDir = await createDir(projectDir, 'middlewares')

    const text = `
    const logger = require('../services/logger.service')

    async function requireAuth(req, res, next) {
    if (!req.session || !req.session.user) {
        res.status(401).end('Unauthorized!');
        return;
    }
    next();
    }

    async function requireAdmin(req, res, next) {
    const user = req.session.user;
    if (!user.isAdmin) {
        res.status(403).end('Unauthorized Enough..');
        return;
    }
    next();
    }


    module.exports = {
    requireAuth,
    requireAdmin
    }
`
    await writeFile(middlewareDir, 'requireAuth.middleware.js', text)
}