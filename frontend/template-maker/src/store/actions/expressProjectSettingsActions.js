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

export function setProjectMongoSettings(mongoConnection) {
    return dispatch => {
        dispatch({ type: 'SET_MONGO_CONNECTION', mongoConnection })
    }
}

export function setProjectApiSettings(APIs) {
    return dispatch => {
        dispatch({ type: 'SET_API_ROUTES', APIs })
    }
}

// optionsObject = {
//     projectName: 'express-template-maker',
//     projectAuthor: 'Yaron Lipshitz',
//     serveStatic: true,
//     frontendPort: 3000,
//     frontendFolder: 'public',
//     mongoConnection: {},
//     hasLogin: false,
//     // mongoConnection: {
//     //     dev: {
//     //         mongoUser: 'yaronl219',
//     //         mongoPass: 'zgArkG7R6ubgAhjs',
//     //         dbName: 'bitcoin',
//     //         clusterAddress: 'cluster0.wb3ia.mongodb.net'
//     //     },
//     //     prod: {
//     //         mongoUser: 'yaronl219',
//     //         mongoPass: 'zgArkG7R6ubgAhjs',
//     //         dbName: 'bitcoin',
//     //         clusterAddress: 'cluster0.wb3ia.mongodb.net'
//     //     }
//     // },
//     APIs: {
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
// }