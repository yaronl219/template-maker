import { Checkbox, FormControl, InputLabel, MenuItem, Select, Switch, TextField } from '@material-ui/core'
import React, { useState, useEffect } from 'react'


export function FrontendSettings(props) {

    const [serveStatic, setServeStatic] = useState(true)
    const [frontendPort, setFrontendPort] = useState('3000')
    const [frontendFolder, setFrontendFolder] = useState('build')
    const [framework, setFramework] = useState('react')
    const [hasLogin, setHasLogin] = useState(false)

    const frameworkPorts = {
        react: '3000',
        angular: '4200',
        vue: '8080'
    }

    const frameworkFolders = {
        react: 'build',
        angular: 'dist',
        vue: 'dist'
    }

    useEffect(() => {
        const {hasLogin, serveStatic, frontendPort, frontendFolder} = props.projectSettings
        if (frontendPort) setFrontendPort(frontendPort)
        if (frontendFolder) setFrontendFolder(frontendFolder)
        if (typeof hasLogin !== 'undefined') setHasLogin(hasLogin)
        if (typeof serveStatic !== 'undefined') setServeStatic(serveStatic)
    }, [])

    useEffect(() => {
        if (!serveStatic) return props.onComplete(serveStatic)
        if (frontendFolder && frontendPort) props.onComplete(serveStatic, frontendPort, frontendFolder, hasLogin)

    }, [serveStatic, frontendPort, frontendFolder, hasLogin])

    function onSetServeStatic() {
        setServeStatic(!serveStatic)
    }

    function onSetFramework(ev) {
        const { value } = ev.target
        setFramework(value)
        if (!(value in frameworkPorts)) return setFrontendPort('42')
        setFrontendPort(frameworkPorts[value])
        setFrontendFolder(frameworkFolders[value])
    }

    function onChangeFrontendPort(ev) {
        const { value } = ev.target
        setFrontendPort(value)

        const framework = Object.keys(frameworkPorts).find(framework => frameworkPorts[framework] === value)
        if (!framework) setFramework('custom')
        setFramework(framework)
    }

    return (
        <div>
            <Switch checked={serveStatic} onChange={onSetServeStatic} />
            {(serveStatic) && (
                <div className="frontend-settings">
                    <FormControl>
                        <InputLabel>Framework</InputLabel>
                        <Select
                            value={framework}
                            onChange={onSetFramework}
                        >
                            <MenuItem value={'react'}>React</MenuItem>
                            <MenuItem value={'angular'}>Angular</MenuItem>
                            <MenuItem value={'vue'}>Vue</MenuItem>
                            <MenuItem value={'custom'}>Custom</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField value={frontendPort} onChange={onChangeFrontendPort} label="Frontend Port" />
                    <TextField value={frontendFolder} onChange={(ev) => setFrontendFolder(ev.target.value)} label="Frontend Folder Name" />
                    <Checkbox checked={hasLogin} onChange={(ev) => setHasLogin(ev.target.checked)} label="Has Login?" />
                </div>
            )}
        </div>
    )
}
