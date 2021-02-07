const { writeFile } = require('../fileServices')

module.exports = {
    createMongoService
}

async function createMongoService(servicesDir) {
    const text =  `
    const MongoClient = require('mongodb').MongoClient;
    
    const config = require('../config')
    
    module.exports = {
        getCollection
    }
    
    // Database Name
    const dbName = config.dbName;
    
    var dbConn = null;
    
    async function getCollection(collectionName) {
        try {
            const db = await connect()
            return db.collection(collectionName);
        } catch (err) {
            console.log('cannot get collection', err)
            throw err
        }
    }
    
    async function connect() {
        if (dbConn) return dbConn;
        try {
            const client = await MongoClient.connect(config.dbURL, { useNewUrlParser: true, useUnifiedTopology: true });
            const db = client.db(dbName);
            dbConn = db;
            console.log('connected to db')
            return db;
        } catch (err) {
            console.log('Cannot Connect to DB', err)
            throw err;
        }
    }
    `

    await writeFile(servicesDir, 'db.service.js', text)
}




