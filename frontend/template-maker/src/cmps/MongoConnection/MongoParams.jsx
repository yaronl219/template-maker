import { FormControl, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { useEffect } from 'react'

export function MongoParams({ env, hasDifferentEnvSettings, mongoConfig, onChangeSettings }) {

    const envName = {
        prod: "production",
        dev: "development"
    }

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [dbName, setDbName] = useState('')
    const [clusterAddress, setClusetAddres] = useState('')

    useEffect(() => {
        if (!([username, password, dbName, clusterAddress].every(i => i))) return
        onChangeSettings(env,username,password,dbName,clusterAddress)
    }, [username, password, dbName, clusterAddress])

    useEffect(() => {
        if (!mongoConfig[env]) return
        if (mongoConfig[env].mongoUser && mongoConfig[env].mongoUser !== username) setUsername(mongoConfig[env].mongoUser)
        if (mongoConfig[env].mongoPass && mongoConfig[env].mongoPass !== password) setPassword(mongoConfig[env].mongoPass)
        if (mongoConfig[env].dbName && mongoConfig[env].dbName !== dbName) setDbName(mongoConfig[env].dbName)
        if (mongoConfig[env].clusterAddress && mongoConfig[env].clusterAddress !== clusterAddress) setClusetAddres(mongoConfig[env].clusterAddress)
    }, [mongoConfig])

    return (
        <div className="mongo-env-params-container">
            <h3>Mongo Settings</h3>
            {hasDifferentEnvSettings && <h5>{envName[env]}</h5>}

            <div className="mongo-env-params">
                <FormControl>
                    <TextField required label="Username" value={username} onChange={(ev) => setUsername(ev.target.value)} />
                    <TextField required label="Password" value={password} onChange={(ev) => setPassword(ev.target.value)} />
                    <TextField required label="DB name" value={dbName} onChange={(ev) => setDbName(ev.target.value)} />
                    <TextField required label="Cluster address" value={clusterAddress} onChange={(ev) => setClusetAddres(ev.target.value)} />
                </FormControl>
            </div>
        </div>
    )
}

//     //     prod: {
//     //         mongoUser: 'yaronl219',
//     //         mongoPass: 'zgArkG7R6ubgAhjs',
//     //         dbName: 'bitcoin',
//     //         clusterAddress: 'cluster0.wb3ia.mongodb.net'
//     //     }
