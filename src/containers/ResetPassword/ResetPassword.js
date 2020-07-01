import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Formik } from 'formik';
import { Grid, Avatar, Typography, TextField, Card, CardContent, CardActions, Button, Snackbar, CircularProgress } from '@material-ui/core';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import MuiAlert from '@material-ui/lab/Alert';
import useStyles from "./styles";
import * as Yup from 'yup';
// amplify
import { Auth } from 'aws-amplify';

function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ResetPassword = (props) => {

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
        const { vertical, horizontal, open } = openModal;
        var classes = useStyles();

        useEffect(() => {
                if (props.location.search) {
                        let user = props.location.search.split('=')[1];
                        setValues({ ...userValues, username: user });
                }
        }, [props]);

        const handleClose = () => {
                setModal({ ...openModal, open: false });
                setValues({ ...userValues, redirect: true });
        };
        return (
                <>
                        <Formik
                                initialValues={{
                                        code: '', newPassword: '', confirmPassword: ''
                                }}
                                validationSchema={Yup.object({
                                        code: Yup.string()
                                                .required('Verification code is required'),
                                        newPassword: Yup.string()
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
                                                ),
                                        confirmPassword: Yup.string()
                                                .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
                                })}
                                onSubmit={(values, { resetForm }) => {
                                        let { code, newPassword } = values;
                                        setValues({ ...userValues, loading: true });
                                        Auth.forgotPasswordSubmit(userValues.username.trim(), code.trim(), newPassword.trim())
                                                .then(() => {
                                                        resetForm();
                                                        setModal({ ...openModal, open: true });
                                                        setValues({ ...userValues, loading: false });
                                                })
                                                .catch(err => {
                                                        setValues({ ...userValues, loading: false });
                                                });
                                }}
                        >
                                {formik => (
                                        <Grid container direction="column" justify="space-between" alignItems="center">
                                                <Card className={classes.card}>
                                                        <form onSubmit={formik.handleSubmit}>
                                                                <CardContent className={classes.content}>
                                                                        <Grid container direction="column" justify="space-between" alignItems="center">
                                                                                <Avatar className={classes.avatar}>
                                                                                        <LockOpenIcon />
                                                                                </Avatar>
                                                                                <Typography component="h1" variant="h5">
                                                                                        Reset Password Here
                                                                        </Typography>
                                                                        </Grid>
                                                                        <Typography variant="h6" color="primary">Enter the code here</Typography>
                                                                        <TextField
                                                                                className={classes.formInput}
                                                                                id="code"
                                                                                variant="outlined"
                                                                                {...formik.getFieldProps('code')}
                                                                                InputProps={{
                                                                                        className: classes.input
                                                                                }}
                                                                                autoComplete="off"
                                                                                error={formik.touched.code && formik.errors.code ? true : false}
                                                                                placeholder="Verification code" 
                                                                        />
                                                                        {formik.touched.code && formik.errors.code ? (
                                                                                <div className={classes.error}>{formik.errors.code}</div>
                                                                        ) : null}
                                                                        <Typography variant="h6" color="primary">New Password</Typography>
                                                                        <TextField
                                                                                className={classes.formInput}
                                                                                id="newpassword"
                                                                                variant="outlined"
                                                                                type="password"
                                                                                {...formik.getFieldProps('newPassword')}
                                                                                InputProps={{
                                                                                        className: classes.input
                                                                                }}
                                                                                autoComplete="off"
                                                                                error={formik.touched.newPassword && formik.errors.newPassword ? true : false}
                                                                                placeholder="Set Password" 
                                                                        />
                                                                        {formik.touched.newPassword && formik.errors.newPassword ? (
                                                                                <div className={classes.error}>{formik.errors.newPassword}</div>
                                                                        ) : null}
                                                                        <Typography variant="h6" color="primary">Confirm Password</Typography>
                                                                        <TextField
                                                                                className={classes.formInput}
                                                                                id="confirmPassword"
                                                                                variant="outlined"
                                                                                type="password"
                                                                                {...formik.getFieldProps('confirmPassword')}
                                                                                InputProps={{
                                                                                        className: classes.input
                                                                                }}
                                                                                autoComplete="off"
                                                                                error={formik.touched.confirmPassword && formik.errors.confirmPassword ? true : false}
                                                                                placeholder="Confirm Password" 
                                                                        />
                                                                        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                                                                <div className={classes.error}>{formik.errors.confirmPassword}</div>
                                                                        ) : null}
                                                                </CardContent>
                                                                <CardActions className={classes.footer}>
                                                                        <Button fullWidth type="submit" variant="contained" size="large" color="secondary"> {userValues.loading ? <CircularProgress color="secondary" /> : 'Set Password'}</Button>
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
                                                                Password reset successfully!
                                                        </Alert>
                                                </Snackbar>
                                                {userValues.redirect && <Redirect to={{ pathname: '/login' }} />}
                                        </Grid>
                                )}

                        </Formik>

                </>
        )
}

export default ResetPassword;