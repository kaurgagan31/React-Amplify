import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { TextField, Card, CardContent, Button, Typography, Grid, CircularProgress } from '@material-ui/core';
import useStyles from "./styles";
// amplify
import { Auth } from 'aws-amplify';

const ConfirmEmail = (props) => {

        const [values, setValues] = useState({
                username: '',
                loading: false,
                confirmationCode: '',
                error: '',
                redirect: false
        });
        var classes = useStyles();

        useEffect(() => {
                if (props.location.search) {
                        let user = props.location.search.split('=')[1];
                        setValues({ ...values, username: user });
                }
        }, [props]);

        /**Input change handler */
        const handleChange = (event) => {
                setValues({ ...values, confirmationCode: event.currentTarget.value });
        };

        /** Confirm SIgnUp */
        const saveEmailCode = () => {
                // show progress spinner
                setValues({ ...values, loading: true });
                Auth.confirmSignUp(values.username, values.confirmationCode)
                        .then(() => {
                                setValues({ ...values, redirect: true });
                        })
                        .catch(err => {
                                setValues({ ...values, error: "Please enter the code here" });
                        });
        }

        /**Resend the verification Code */
        const resendVerification = () => {
                setValues({ ...values, loading: true });
                Auth.resendSignUp(values.username)
                        .then(() => {
                                setValues({ ...values, loading: false });
                        })
                        .catch(err => {
                        })
        }


        return (
                <Grid container direction="column" justify="space-between" alignItems="center">
                        <Typography variant="h2">Check your email</Typography>
                        <Typography variant="subtitle2">We've sent a six­ digit confirmation code</Typography>
                        <Card className={classes.card}>
                        {values.error && <Typography color="secondary" variant="h6">{values.error}</Typography>}
                                <CardContent className={classes.content}>
                                        <Typography variant="h6" color="primary">Confirmation Code</Typography>
                                        {values && <TextField
                                                className={classes.formInput}
                                                id="outlined-basic"
                                                variant="outlined"
                                                placeholder="Enter confirmation code"
                                                onChange={handleChange}
                                                value={values.confirmationCode}
                                                autoComplete="off" />}

                                </CardContent>
                                <Button variant="outlined" size="small" color="secondary" onClick={saveEmailCode} > {values.loading ? <CircularProgress color="secondary" /> : 'Confirm Email'}</Button>
                                <Button variant="outlined" size="small" onClick={resendVerification}>Resend Verifictaion Code</Button>
                        </Card>
                        <Typography color="primary" className={classes.copyright}>
                                © 2020 Gaganjot Kaur, All rights reserved.
                        </Typography>
                        {values.redirect && (
                                <Redirect
                                        to={{ pathname: '/login' }}
                                />
                        )}
                </Grid>
        )
}

export default ConfirmEmail;