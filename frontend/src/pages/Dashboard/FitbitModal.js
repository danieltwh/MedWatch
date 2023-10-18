import * as React from 'react';
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import { Alert, Divider } from '@mui/material';
import { fitbitToken } from 'features/api';
import { useTheme } from '@emotion/react';
import themePalette from 'themes/palette';



const initialState = { code: "", clientId: "", clientSecret: "" };

const ERROR_MESSAGE = {
    missing: "Missing information",
    invalid_code: "Authorization code is invalid"
}

const FitbitModal = (props) => {
    //   const [open, setOpen] = React.useState(false);
    //   const handleOpen = () => setOpen(true);
    //   const handleClose = () => setOpen(false);
    const theme = useTheme();
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        // border: '2px solid #000',
        borderStyle: 'solid',
        borderColor: theme.palette.grey[700],
        borderWidth: "2px",
        boxShadow: 24,
        p: 3,
    };


    const [authCodeError, setAuthCodeError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const [credential, setCredential] = useState(initialState);
    const [fieldErrors, setFieldErrors] = useState(initialState);

    const clearError = () => {
        // console.log('here1')
        // if (signupError || errorMsg != "") {
        //   setSignupError(false);
        //   setErrorMsg("");

        //   setFieldErrors({ firstname: "", lastname: "", email: "", password: "", role: "" });
        //   console.log('here2')

        // }

        setAuthCodeError(false);
        setErrorMsg("");

        // setFieldErrors({ firstname: "", lastname: "", email: "", password: "", role: "" });
        setFieldErrors({ ...initialState })
    }

    const onchange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }

    var fitbitLink = "https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=23RBBT&scope=activity+cardio_fitness+electrocardiogram+heartrate+location+nutrition+oxygen_saturation+respiratory_rate+sleep+temperature+weight&state=2t2n2q2o0t0c2m3g0s1t5c3f1p1h056l"


    const handleSubmit = async (event) => {
        event.preventDefault();
        clearError();

        const data = new FormData(event.currentTarget);

        let newFieldErrors = { ...initialState };
        let hasError = false;

        console.log(data.get('code'))
        console.log(data.get('code').length)
        console.log(data.get('clientId'))

        if (data.get('code').length == 0) {
            newFieldErrors.code = ERROR_MESSAGE.missing
            hasError = true
        }

        if (hasError) {
            setAuthCodeError(true);
            setErrorMsg("Missing value");
            setFieldErrors({ ...newFieldErrors })
            return
        }

        data.append("patientId", 1)

        const resp = await fitbitToken(data);

        if (resp.status == 200) {
            props.handleClose();
        } else {
            setAuthCodeError(true);
            setErrorMsg(resp.body.detail);
        }
    }

    return (
        <div>
            <Modal
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box sx={style}>
                    <Box sx={{ my: 3, mx: 2 }}>
                        <Grid container alignItems="center">
                            <Grid item xs={12} component={Paper} elevation={6} square>
                                <Box
                                    sx={{
                                        my: 0,
                                        mx: 4,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        // height: "50px"
                                    }}
                                >
                                    <Typography sx={{ my: 2, display: "flex", alignItems: "center" }} component="h1" variant="h4">
                                        Status: Connected
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                    {/* <Typography id="modal-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>

                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography> */}

                    <Box sx={{ mx: 2, my: 1 }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Steps for Connecting Fitbit
                        </Typography>

                    </Box>

                    <Divider variant="middle" />

                    <Box sx={{ m: 2 }}>
                        <Typography sx={{ my: 2 }} id="step1" variant="body1" component="p">
                            Step 1: Click the link below and login to your Fitbit account
                        </Typography>

                        <Link href={fitbitLink}>
                            <Typography sx={{ m: 2 }}>
                                https://www.fitbit.com/oauth2/authorize
                            </Typography>
                        </Link>


                        <Divider variant="fullwidth" />
                        <Typography sx={{ my: 2 }} id="step2" variant="body1" component="p">
                            Step 2: Submit the form below
                        </Typography>
                    </Box>
                    
                    {authCodeError && <Alert sx={{m:2 }} severity="error">{errorMsg}</Alert>}
                    
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, mx: 2 }}>
                        <Grid container spacing={2} >
                            <Grid item xs={12}>
                                <TextField
                                    // margin="normal"
                                    required
                                    fullWidth
                                    id="code"
                                    label="Authorization Code"
                                    name="code"
                                    autoFocus
                                    error={fieldErrors.code.length != 0}
                                    helperText={(fieldErrors.code.length != 0) ? fieldErrors.code : ""}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    // margin="normal"
                                    fullWidth
                                    id="clientId"
                                    label="Client ID (Optional)"
                                    name="client_id"
                                    autoFocus
                                    error={fieldErrors.clientId.length != 0}
                                    helperText={(fieldErrors.clientId.length != 0) ? fieldErrors.clientId : ""}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    // margin="normal"
                                    fullWidth
                                    id="clientSecret"
                                    label="Client Secret (Optional)"
                                    name="client_secret"
                                    autoFocus
                                    error={fieldErrors.clientSecret.length != 0}
                                    helperText={(fieldErrors.clientSecret.length != 0) ? fieldErrors.clientSecret : ""}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Submit
                        </Button>
                    </Box>
                </Box>


            </Modal>
        </div>
    );
}

export default FitbitModal;