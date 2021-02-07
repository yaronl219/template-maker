import { Card, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import AddIcon from '@material-ui/icons/Add';

export function AddRoute({onAddRoute}) {

    const [isEditing, setIsEditing] = useState(false)
    const [apiName, setApiName] = useState('')

    function onBlurTextField() {
        if (!apiName) setIsEditing(false)
    }

    function onSave(ev) {
        ev.preventDefault()
        onAddRoute(apiName)
        setIsEditing(false)
        setApiName('')
    }

    return (
        <div onBlur={onBlurTextField}>
            <Card>
                {isEditing ? (<form onSubmit={onSave}>
                    <TextField autoFocus placeholder="Enter api name" value={apiName} onChange={(ev) => setApiName(ev.target.value)} />
                </form>) : (<div className="add-route-container" onClick={() => setIsEditing(true)}>
                    <AddIcon />
                    <span>Add a new api route</span>
                </div>)}
            </Card>
        </div>
    )
}
