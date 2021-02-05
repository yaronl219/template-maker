const initialState = {

}

export function expressProjectSettingsReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_PROJECT_GENERAL':
            return {
                ...state,
                projectName: action.projectName,
                projectAuthor: action.projectAuthor
            }
        case 'SET_FRONTEND_SETTINGS':
            const {serveStatic, frontendPort, frontendFolder, hasLogin} = action
            return {
                ...state,
                serveStatic,
                frontendPort,
                frontendFolder,
                hasLogin
            }
        default:
            return state
    }
}