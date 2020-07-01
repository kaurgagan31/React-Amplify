import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Formik } from 'formik';
import { Grid, Avatar, Typography, TextField, Card, CardContent, CardActions, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from "./styles";
import * as Yup from 'yup';
import { Auth } from 'aws-amplify';

const Login = () => {

        const [userValues, setValues] = useState({
                username: '',
                loading: false,
                error: '',
                redirect: false
        });
        const [openDialog, setOpen] = useState(false);
        var classes = useStyles();

        const handleCloseDialog = () => {
                setOpen(false);
        }

        return (
                <>
                        <Formik
                                initialValues={{ email: '', password: '' }}
                                validationSchema={Yup.object({
                                        email: Yup.string()
                                                .email('Invalid email address')
                                                .required('Username is required'),
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
                                validateOnChange={false}
                                validateOnBlur={false}
                                onSubmit={(values, { resetForm }) => {
                                        let { email, password } = values;
                                        setValues({ ...userValues, loading: true });
                                        Auth.signIn(email, password)
                                                .then(user => {
                                                        resetForm();
                                                        localStorage.setItem('userToken', user.signInUserSession.accessToken.jwtToken);
                                                        setValues({ ...userValues, loading: false, redirect: true });
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
                                                                        <Grid container direction="column" justify="space-between" alignItems="center">
                                                                                <Avatar className={classes.avatar}>
                                                                                        <LockOutlinedIcon />
                                                                                </Avatar>
                                                                                <Typography component="h1" variant="h5">
                                                                                        Sign In
                                                                        </Typography>
                                                                        </Grid>
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
                                                                                error={formik.errors.email ? true : false}
                                                                                placeholder="Enter your username"
                                                                        />
                                                                        {formik.touched.email && formik.errors.email ? (
                                                                                <div className={classes.error}>{formik.errors.email}</div>
                                                                        ) : null}
                                                                        <Typography variant="h6" color="primary">Password</Typography>
                                                                        <TextField
                                                                                className={classes.formInput}
                                                                                id="password"
                                                                                variant="outlined"
                                                                                error={formik.errors.password ? true : false}
                                                                                type="password"
                                                                                {...formik.getFieldProps('password')}
                                                                                InputProps={{
                                                                                        className: classes.input
                                                                                }}
                                                                                autoComplete="off"
                                                                                placeholder="Enter your password"
                                                                        />
                                                                        {formik.touched.password && formik.errors.password ? (
                                                                                <div className={classes.error}>{formik.errors.password}</div>
                                                                        ) : null}
                                                                </CardContent>
                                                                <CardActions className={classes.footer}>
                                                                        <Button fullWidth type="submit" variant="contained" size="large" color="secondary"  > {userValues.loading ? <CircularProgress color="primary" /> : 'Login'}</Button>
                                                                </CardActions>
                                                        </form>
                                                </Card>
                                                <Typography variant="h6" color="initial"> <Link to="/signup" style={{ textDecoration: 'none' }}>Don't have an account? Sign Up </Link></Typography>
                                                <Typography variant="h6" color="initial"> <Link to="/forgot-password" style={{ textDecoration: 'none' }}>Forgot Password? </Link></Typography>
                                                <Dialog
                                                        open={openDialog}
                                                        onClose={() => { setOpen(false); }}
                                                        aria-labelledby="alert-dialog-title"
                                                        aria-describedby="alert-dialog-description">
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