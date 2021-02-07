import { Switch } from '@material-ui/core'
import React from 'react'
import { useState, useEffect } from 'react'
import { utilService } from '../../services/utilService'
import { MongoEnvContainer } from './MongoEnvContainer'

export function MongoSettings({ projectSettings, onComplete }) {

    const [hasMongoConnection, setHasMongoConnection] = useState(true)
    const [hasDifferentEnvSettings, setHasDifferentEnvSettings] = useState(false)
    const [mongoConnection, setMongoConnection] = useState({})

    function onChangeSettings(env, mongoUser, mongoPass, dbName, clusterAddress) {
        console.log(env, mongoUser, mongoPass, dbName, clusterAddress)
        const mongoParams = { ...mongoConnection }
        const settings = { mongoUser, mongoPass, dbName, clusterAddress }
        if (!hasDifferentEnvSettings) {
            mongoParams.prod = { ...settings }
            mongoParams.dev = { ...settings }
        } else {
            mongoParams[env] = { ...settings }
        }
        setMongoConnection(mongoParams)
    }

    useEffect(() => {
        if (hasDifferentEnvSettings || !mongoConnection.dev) return
        // if user cancels the different environments after editing
        const { mongoUser, mongoPass, dbName, clusterAddress } = mongoConnection.dev
        onChangeSettings('dev', mongoUser, mongoPass, dbName, clusterAddress)
    }, [hasDifferentEnvSettings])

    useEffect(() => {
        if (!Object.values(mongoConnection).length) return
        onComplete(mongoConnection)
    }, [mongoConnection])

    useEffect(() => {
        if (!projectSettings.mongoConnection) return
        // check if the settings for dev and prod are the same
        const { dev, prod } = projectSettings.mongoConnection
        // if they are not the same,
        if (!utilService.areObjectsIdentical(dev,prod)) setHasDifferentEnvSettings(true)

        setMongoConnection(projectSettings.mongoConnection)
    }, [])

    return (
        <div>
            <Switch checked={hasMongoConnection} onChange={(ev) => setHasMongoConnection(ev.target.checked)} />
            {hasMongoConnection && <MongoEnvContainer mongoConfig={mongoConnection} hasDifferentEnvSettings={hasDifferentEnvSettings} onChangeEnvSettings={setHasDifferentEnvSettings} onChangeSettings={onChangeSettings} />}
        </div>
    )
}

//     //     prod: {
//     //         mongoUser: 'yaronl219',
//     //         mongoPass: 'zgArkG7R6ubgAhjs',
//     //         dbName: 'bitcoin',
//     //         clusterAddress: 'cluster0.wb3ia.mongodb.net'
//     //     }
