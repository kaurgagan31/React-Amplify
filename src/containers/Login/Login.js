import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Formik } from 'formik';
import { Grid, Typography, TextField, Card, CardContent, CardActions, Button, Snackbar, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import useStyles from "./styles";
import * as Yup from 'yup';
import { Auth } from 'aws-amplify';
function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Login = () => {

        const [userValues, setValues] = useState({
                username: '',
                loading: false,
                error: '',
                redirect: false
        });
        const [openModal, setModal] = useState({
                open: false,
                vertical: 'top',
                horizontal: 'center',
        });
        const [openDialog, setOpen] = useState(false);
        const { vertical, horizontal, open } = openModal;
        var classes = useStyles();

        const handleClose = () => {
                setModal({ ...openModal, open: false });
                setValues({ ...userValues, redirect: true });
        };

        const handleCloseDialog = () => {
                setOpen(false);
        }

        return (
                <>
                        <h1>Login Here</h1>
                        <Formik
                                initialValues={{
                                        email: '', password: ''
                                }}
                                validationSchema={Yup.object({
                                        email: Yup.string()
                                                .email('Invalid email address')
                                                .required('Required'),
                                        password: Yup.string()
                                                .max(99, 'Maximum limit of 99 characters')
                                                .required("Please Enter your password")
                                                .test(
                                                        "regex",
                                                        "Password must be min 8 characters, and have 1 Special Character, 1 Uppercase, 1 Number and 1 Lowercase",
                                                        val => {
                                                                let regExp = new RegExp(
                                                                        "^(?=.*\\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$"
                                                                );
                                                                return regExp.test(val);
                                                        }
                                                )
                                                .required('Required')
                                })}
                                onSubmit={(values, { setSubmitting, resetForm, setFieldValue }) => {
                                        let { email, password } = values;
                                        setValues({ ...userValues, loading: true });
                                        Auth.signIn(email, password)
                                                .then(user => {
                                                        localStorage.setItem('userToken', user.signInUserSession.accessToken.jwtToken);
                                                        setModal({ ...openModal, open: true });
                                                        setValues({ ...userValues, loading: false });
                                                })
                                                .catch(err => {
                                                        setValues({ ...userValues, loading: false });
                                                        setOpen(true);
                                                });
                                }}>
                                {formik => (
                                        <Grid container direction="column" justify="space-between" alignItems="center">
                                                <Card className={classes.card}>
                                                        <form onSubmit={formik.handleSubmit}>
                                                                <CardContent className={classes.content}>
                                                                        <Typography variant="h6" color="primary">Username</Typography>
                                                                        <TextField
                                                                                className={classes.formInput}
                                                                                id="email"
                                                                                variant="outlined"
                                                                                {...formik.getFieldProps('email')}
                                                                                InputProps={{
                                                                                        className: classes.input
                                                                                }}
                                                                                autoComplete="off"
                                                                                 />
                                                                        {formik.touched.email && formik.errors.email ? (
                                                                                <div className={classes.error}>{formik.errors.email}</div>
                                                                        ) : null}
                                                                        <Typography variant="h6" color="primary">Password</Typography>
                                                                        <TextField
                                                                                className={classes.formInput}
                                                                                id="password"
                                                                                variant="outlined"
                                                                                type="password"
                                                                                {...formik.getFieldProps('password')}
                                                                                InputProps={{
                                                                                        className: classes.input
                                                                                }}
                                                                                autoComplete="off"
                                                                                 />
                                                                        {formik.errors.password ? (
                                                                                <div className={classes.error}>{formik.errors.password}</div>
                                                                        ) : null}
                                                                </CardContent>
                                                                <CardActions className={classes.footer}>
                                                                        <Button type="submit" variant="outlined" size="large" color="secondary"  > {userValues.loading ? <CircularProgress color="secondary" /> : 'Login'}</Button>
                                                                </CardActions>
                                                        </form>
                                                </Card>
                                                <Snackbar
                                                        anchorOrigin={{ vertical, horizontal }}
                                                        open={open}
                                                        onClose={handleClose}
                                                        key={vertical + horizontal}
                                                >
                                                        <Alert onClose={handleClose} severity="success">
                                                                User Login SUccessfully!
                                                        </Alert>
                                                </Snackbar>
                                                <Typography variant="h6" color="initial"> <Link to="/signup" style={{ textDecoration: 'none' }}>SignUp to new account </Link></Typography>
                                                <Typography variant="h6" color="initial"> <Link to="/forgot-password" style={{ textDecoration: 'none' }}>Forgot Password </Link></Typography>
                                                <Typography color="primary" className={classes.copyright}>
                                                        © 2020 Gaganjot Kaur, All rights reserved.
                                                </Typography>
                                                <Dialog
                                                        open={openDialog}
                                                        onClose={() => {
                                                                setOpen(false);
                                                        }}
                                                        aria-labelledby="alert-dialog-title"
                                                        aria-describedby="alert-dialog-description"
                                                >
                                                        <DialogTitle id="alert-dialog-title">{" Oops! Some went wrong."}</DialogTitle>
                                                        <DialogContent>
                                                                <DialogContentText id="alert-dialog-description">
                                                                        Please check your username and password
                                                                </DialogContentText>
                                                        </DialogContent>
                                                        <DialogActions>
                                                                <Button onClick={handleCloseDialog} color="primary" autoFocus>
                                                                        Ok
                                                                        </Button>
                                                        </DialogActions>
                                                </Dialog>
                                                {userValues.redirect && <Redirect to={{ pathname: '/dashboard' }} />}
                                        </Grid>
                                )}
                        </Formik>

                </>
        )
}

export default Login;