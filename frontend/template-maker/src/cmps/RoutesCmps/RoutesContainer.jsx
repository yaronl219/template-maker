import React, { useState } from 'react'
import { useEffect } from 'react'
import { AddRoute } from './AddRoute'
import { RouteConfig } from './RouteConfig'

export function RoutesContainer({ projectSettings, onComplete }) {

    const [apis, setApis] = useState({})

    function onAddRoute(apiName) {
        if (apiName in apis) return
        const apiState = { ...apis }
        apiState[apiName] = { crudOperations: {} }
        setApis(apiState)
    }

    function onUpdateRoute(routeName, route) {
        const apiState = {...apis}
        apiState[routeName] = route
        setApis(apiState)
        onComplete(apiState)
    }

    useEffect(() => {
        if (!projectSettings.APIs) return
        setApis(projectSettings.APIs)
    }, [projectSettings.APIs])
    
    return (
        <div className="api-routes-container">
            {Object.keys(apis).map((api, idx) => <RouteConfig key={idx} apiName={api} projectSettings={projectSettings} apiConfig={apis[api]} onUpdateRoute={onUpdateRoute} />)}
            <AddRoute onAddRoute={onAddRoute} />
        </div>
    )
}

// APIs: {
    //         templates: {
    //             // collectionName: 'products',
    //             crudOperations: {
    //                 create: {
    //                     requiresAuth: false
    //                 },
    //                 // read: {},
    //                 // remove: {
    //                 //     requiresAuth: true
    //                 // },
    //                 // update: {
    //                 //     requiresAuth: false
    //                 // }
    //             }
    //         }
    //     }