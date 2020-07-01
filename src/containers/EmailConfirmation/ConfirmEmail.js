import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { TextField, Avatar, Card, CardContent, Button, Typography, Grid, CircularProgress, CardActions } from '@material-ui/core';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
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
                        <Card className={classes.card}>

                                <CardContent className={classes.content}>
                                        <Grid container direction="column" justify="space-between" alignItems="center">
                                                <Avatar className={classes.avatar}>
                                                        <VerifiedUserIcon />
                                                </Avatar>
                                                <Typography variant="h2">Confirm your email</Typography>
                                                <Typography variant="subtitle2">We've sent a six­ digit confirmation code</Typography>
                                        </Grid>
                                        <Typography variant="h6" color="primary">Confirmation Code</Typography>
                                        {values && <TextField
                                                className={classes.formInput}
                                                id="outlined-basic"
                                                variant="outlined"
                                                placeholder="Enter confirmation code"
                                                InputProps={{
                                                        className: classes.input
                                                }}
                                                onChange={handleChange}
                                                value={values.confirmationCode}
                                                error={values.error ? true : false}
                                                autoComplete="off" />}
                                        {values.error &&<div className={classes.error}>{values.error}</div>}
                                </CardContent>
                                <CardActions>
                                        <Button variant="contained" size="small" color="secondary" onClick={saveEmailCode} > {values.loading ? <CircularProgress color="primary" /> : 'Confirm Email'}</Button>
                                        <Button variant="contained" size="small" color="primary" onClick={resendVerification}>Resend Code</Button>
                                </CardActions>

                        </Card>
                        {values.redirect && (
                                <Redirect
                                        to={{ pathname: '/login' }}
                                />
                        )}
                </Grid>
        )
}

export default ConfirmEmail;