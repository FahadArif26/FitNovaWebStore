import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AccountDetailsForm from './AccountDetailsForm';
import PickupMethodForm from './PickupMethodForm';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        
    },
    button: {
        // background: '#FE646F',
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
    stepper: {
        alignItems: 'flex-start',
    }
}));

function getSteps() {
    return ['Account Details', 'Delivery/Pickup Method', 'Billing Information', 'Review Order'];
}


function getStepContent(step) {
    switch (step) {
        case 0:
            return (
                <AccountDetailsForm/>
            )
        case 1:
            return (
                <PickupMethodForm/>
            )
        case 2:
            return (
                <p>Add billing form</p>
            )
        case 3:
            return (
                <p>HI review thine non existent order</p>
            )
        default:
            return 'Unknown step';
    }
}

export default function VerticalLinearStepper() {

    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div className={classes.root}>
            <Stepper className={classes.appbar} activeStep={activeStep} orientation="vertical"  >
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel >{label}</StepLabel>
                        <StepContent>
                            {getStepContent(index)}
                            <div className={classes.actionsContainer}>
                                <div>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className={classes.button}
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        className={classes.button}
                                    >
                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                    </Button>
                                </div>
                            </div>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (

                <Paper square elevation={5} className={classes.resetContainer}>
                    <Typography variant="h6">
                        <Box color="#FE646F">
                            Your order has been placed !
                        </Box>
                    </Typography>
                    <Typography variant="subtitle1">
                        <Box fontWeight="fontWeightBold">
                            Confirmation Number: 5896 2233 1367 1989    
                        </Box>
                    </Typography>

                    <Typography variant="body2">Confirmation Text :)</Typography>

                    <Button onClick={handleReset} className={classes.button}>
                        Reset
                    </Button>
                </Paper>
            )}
        </div>
    );
}
