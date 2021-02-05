export function setProjectGeneralDetails(projectName, projectAuthor) {
    return dispatch => {
        dispatch({ type: 'SET_PROJECT_GENERAL', projectName, projectAuthor })
    }
}

export function setProjectFrontendSettings(serveStatic, frontendPort, frontendFolder, hasLogin) {
    return dispatch => {
        dispatch({ type: 'SET_FRONTEND_SETTINGS', serveStatic, frontendPort, frontendFolder, hasLogin })
    }
}