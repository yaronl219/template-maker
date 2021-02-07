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
        case 'SET_MONGO_CONNECTION':
            return {
                ...state,
                mongoConnection: action.mongoConnection
            }
        case 'SET_API_ROUTES':
            console.log(action.APIs)
            return {
                ...state,
                APIs: action.APIs
            }
        default:
            return state
    }
}