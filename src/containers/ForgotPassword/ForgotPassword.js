import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Grid, Typography, TextField, Card, CardContent, CardActions, Button, Snackbar, CircularProgress } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { Auth } from 'aws-amplify';
import useStyles from "./styles";

function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ForgotPassword = () => {

        const [values, setValues] = useState({
                username: '',
                loading: false,
                redirect: false,
                errorMessage: '',
                error: false
        });
        const [openModal, setModal] = useState({
                open: false,
                vertical: 'top',
                horizontal: 'center',
        });
        const { vertical, horizontal, open } = openModal;
        var classes = useStyles();

        /**Handle Input change */
        const handleChange = (event) => {
                setValues({ ...values, username: event.currentTarget.value });
        };

        /** Submit the forgot password details */
        const handleSubmit = () => {
                setValues({ ...values, loading: true });

                Auth.forgotPassword(values.username)
                        .then(data => {
                                setModal({ ...openModal, open: true });
                                setValues({ ...values, loading: false });
                        })
                        .catch(err => {
                                console.log(err);
                                setValues({ ...values, loading: false, error: true, errorMessage: "Username cannot be empty" });
                        });
        }

        /**Close the modal */
        const handleClose = () => {
                setModal({ ...openModal, open: false });
                setValues({ ...values, redirect: true });
        };

        return (
                <>
                        <h1>User Details Here</h1>
                        <Grid container direction="column" justify="space-between" alignItems="center">
                                <Card className={classes.card}>
                                        {values.error && <Typography color="secondary" variant="h6">{values.errorMessage}</Typography>}
                                        <CardContent className={classes.content}>
                                                <Typography variant="h6" color="primary">Please input your username</Typography>
                                                {values && <TextField
                                                        className={classes.formInput}
                                                        id="outlined-basic"
                                                        variant="outlined"
                                                        placeholder="Enter user email"
                                                        onChange={handleChange}
                                                        value={values.username}
                                                        autoComplete="off" />}
                                        </CardContent>
                                        <CardActions className={classes.actions}>
                                                <Button variant="outlined" color="secondary" onClick={handleSubmit} > {values.loading ? <CircularProgress color="secondary" /> : 'Confirm username'}</Button>
                                        </CardActions>

                                </Card>
                                <Typography variant="h6" color="initial"> <Link to="/login" style={{ textDecoration: 'none' }}>Ooh! Wait! I've remembered!</Link></Typography>
                                <Typography color="primary" className={classes.copyright}>
                                        © 2020 Gaganjot Kaur, All rights reserved.
                                                </Typography>
                                <Snackbar
                                        anchorOrigin={{ vertical, horizontal }}
                                        open={open}
                                        onClose={handleClose}
                                        key={vertical + horizontal}
                                >
                                        <Alert onClose={handleClose} severity="success">
                                                Account confirmed successfully!
                                                        </Alert>
                                </Snackbar>
                                {values.redirect && (
                                        <Redirect
                                                to={{
                                                        pathname: '/reset-password',
                                                        search: `?username=${values.username}`
                                                }}
                                        />
                                )}
                        </Grid>
                </>
        )
}

export default ForgotPassword;