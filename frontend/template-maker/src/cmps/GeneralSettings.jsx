import { TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'

export function GeneralSettings(props) {

    const [projectName, setProjectName] = useState('')
    const [projectAuthor, setProjectAuthor] = useState('')
    const {onComplete} = props

    useEffect(() => {
        const {projectName, projectAuthor} = props.projectSettings
        if (projectName) setProjectName(projectName)
        if (projectAuthor) setProjectAuthor(projectAuthor)
    }, [])

    useEffect(() => {
        if (!projectName || !projectAuthor) return
        onComplete(projectName, projectAuthor)
    }, [projectName, projectAuthor])

    return (
        <div>
            <TextField value={projectName} onChange={(ev) => setProjectName(ev.target.value)} label="Project Name" />
            <TextField value={projectAuthor} onChange={(ev) => setProjectAuthor(ev.target.value)} label="Project Author" />
        </div>
    )
}
