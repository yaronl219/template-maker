import React, { useState } from 'react'
import { connect } from 'react-redux';

import { Stepper, Step, StepLabel, Button } from '@material-ui/core';

import { GeneralSettings } from '../cmps/GeneralSettings';
import { FrontendSettings } from '../cmps/FrontendSettings';
import { MongoSettings } from '../cmps/MongoConnection/MongoSettings';
import { RoutesContainer } from '../cmps/RoutesCmps/RoutesContainer';
import { ProjectSummary } from '../cmps/ProjectSummary';
import { setProjectGeneralDetails, setProjectFrontendSettings, setProjectMongoSettings, setProjectApiSettings } from '../store/actions/expressProjectSettingsActions';
import { downloadService } from '../services/downloadService';



function _TemplateMaker(props) {

    const { projectSettings } = props

    const [activeStep, setActiveStep] = useState(0);
    const [lastCompletedStep, setLastCompletedStep] = useState(-1)

    const steps = ['General', 'Frontend', 'mongoDB', 'API routes', 'Summary']

    const handleNext = () => {

        if (activeStep > lastCompletedStep) return
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    function onCompleteGeneralSettings(projectName, projectAuthor) {
        props.setProjectGeneralDetails(projectName, projectAuthor)
        setLastCompletedStep(0)
    }

    function onCompleteFrontendSettings(serveStatic, frontendPort = null, frontendFolder = null, hasLogin = null) {
        props.setProjectFrontendSettings(serveStatic, frontendPort, frontendFolder, hasLogin)
        setLastCompletedStep(1)
    }

    function onCompleteMongoSettings(data) {
        props.setProjectMongoSettings(data)
        setLastCompletedStep(2)
    }

    function onCompleteApiSettings(data) {
        props.setProjectApiSettings(data)
        setLastCompletedStep(3)
    }

    async function onDownload() {
        // TODO : add loader
        await downloadService.downloadZip(projectSettings)
    }

    function renderStep() {
        const screens = [<GeneralSettings projectSettings={projectSettings} onComplete={onCompleteGeneralSettings} />,
        <FrontendSettings projectSettings={projectSettings} onComplete={onCompleteFrontendSettings} />,
        <MongoSettings projectSettings={projectSettings} onComplete={onCompleteMongoSettings} />,
        <RoutesContainer projectSettings={projectSettings} onComplete={onCompleteApiSettings} />,
        <ProjectSummary projectSettings={projectSettings} onDownload={onDownload} />
        ]
        return screens[activeStep]
    }
    return (
        <div>
            <div>
                <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <div>
                    {renderStep()}
                    <div>
                        <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                        >
                            Back
                                </Button>
                        <Button variant="contained" color="primary" onClick={handleNext}>
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    projectSettings: state.expressProjectSettingsReducer
})
const mapDispatchToProps = {
    setProjectGeneralDetails,
    setProjectFrontendSettings,
    setProjectMongoSettings,
    setProjectApiSettings
}

export const TemplateMaker = connect(mapStateToProps, mapDispatchToProps)(_TemplateMaker)

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