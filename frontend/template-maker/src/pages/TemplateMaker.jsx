import React, { useState } from 'react'
import { connect } from 'react-redux';

import { Stepper, Step, StepLabel, Button } from '@material-ui/core';

import { GeneralSettings } from '../cmps/GeneralSettings';
import FrontendSettings from '../cmps/FrontendSettings';
import { MongoSettings } from '../cmps/MongoSettings';
import { RoutesSettings } from '../cmps/RoutesSettings';
import { ProjectSummary } from '../cmps/ProjectSummary';
import { setProjectGeneralDetails } from '../store/actions/expressProjectSettingsActions';



function _TemplateMaker(props) {

    const {projectSettings} = props

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
        console.log('template maker completed general settings')
        props.setProjectGeneralDetails(projectName,projectAuthor)
        setLastCompletedStep(0)
    }

    function renderStep() {
        const screens = [<GeneralSettings projectSettings={projectSettings} onComplete={onCompleteGeneralSettings} />,
        <FrontendSettings projectSettings={projectSettings} />,
        <MongoSettings projectSettings={projectSettings} onComplete={() => setLastCompletedStep(2)} />,
        <RoutesSettings projectSettings={projectSettings} onComplete={() => setLastCompletedStep(3)} />,
        <ProjectSummary projectSettings={projectSettings} onComplete={() => setLastCompletedStep(4)} />
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
    setProjectGeneralDetails
}

export const TemplateMaker = connect(mapStateToProps,mapDispatchToProps)(_TemplateMaker)

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