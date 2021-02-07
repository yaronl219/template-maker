import { Switch } from '@material-ui/core'
import React, { useState } from 'react'
import { MongoParams } from './MongoParams'

export function MongoEnvContainer({mongoConfig, hasDifferentEnvSettings, onChangeEnvSettings, onChangeSettings}) {
    
    return (
        <div className="mongo-env-container">
            <div className="mongo-switch-container">
                <p>Use the same settings for development and production?</p>
                <Switch checked={hasDifferentEnvSettings} onChange={(ev) => onChangeEnvSettings(ev.target.checked)} />
            </div>
            <div className="mongo-envs">
                <MongoParams key="dev" env="dev" hasDifferentEnvSettings={hasDifferentEnvSettings} mongoConfig={mongoConfig} onChangeSettings={onChangeSettings} />
                {hasDifferentEnvSettings && <MongoParams key="prod" env="prod" hasDifferentEnvSettings={hasDifferentEnvSettings} mongoConfig={mongoConfig} onChangeSettings={onChangeSettings} />}
            </div>
        </div>
    )
}
