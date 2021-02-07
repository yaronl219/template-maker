import { Accordion, AccordionDetails, AccordionSummary, Checkbox, FormControlLabel } from '@material-ui/core'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { utilService } from '../../services/utilService'

export function RouteConfig({ apiName, projectSettings, onUpdateRoute, apiConfig }) {

    const possibleRoutes = ['create', 'read', 'remove', 'update']
    const [apiRoutesConfig, setApiRouteConfig] = useState({})
    const [collectionName, setCollectionName] = useState('')

    function onRouteChange(route, isRouteActivated, requiresAuth) {
        const crudOperations = { ...apiRoutesConfig }
        crudOperations[route] = (isRouteActivated) ? { requiresAuth } : null
        setApiRouteConfig(crudOperations)
        onUpdateRoute(apiName, {collectionName, crudOperations})
    }

    useEffect(() => {
        if (!projectSettings.APIs || !projectSettings.APIs[apiName] || utilService.areObjectsIdentical(projectSettings.APIs[apiName],apiRoutesConfig)) return
        setApiRouteConfig(apiConfig.crudOperations)
    }, [apiConfig])

    return (
        <div>
            <Accordion>
                <AccordionSummary>{apiName}</AccordionSummary>
                <AccordionDetails>
                    <div>
                        {possibleRoutes.map(route => <CrudRoute route={route} key={`${apiName}-${route}`} hasLogin={projectSettings.hasLogin} apiRouteConfig={apiRoutesConfig[route]} onRouteChange={onRouteChange} />)}
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

function CrudRoute({ route, apiRouteConfig, hasLogin, onRouteChange }) {
    const [isRouteActivated, setIsRouteActivated] = useState(false)
    const [requiresAuth, setRequiresAuth] = useState(false)

    useEffect(() => {
        if (!apiRouteConfig) return
        setIsRouteActivated(true)
        setRequiresAuth(!!apiRouteConfig.requiresAuth)
    }, [apiRouteConfig])

    function onToggleRouteActivated() {
        const isActivated = !isRouteActivated
        setIsRouteActivated(isActivated)
        onRouteChange(route,isActivated,requiresAuth)
    }

    function onToggleAuthRequired() {
        const isRequired = !requiresAuth
        setIsRouteActivated(isRequired)
        onRouteChange(route,isRouteActivated,isRequired)
    }

    return (
        <div>
            <Checkbox checked={isRouteActivated} onChange={onToggleRouteActivated} />
            <span>{route}</span>
            {isRouteActivated && hasLogin && (
                <div>
                    <FormControlLabel control={
                        <Checkbox checked={requiresAuth} onChange={onToggleAuthRequired} />
                    }
                        label="Route requires auth?"
                    />
                </div>
            )}
        </div>
    )
}
