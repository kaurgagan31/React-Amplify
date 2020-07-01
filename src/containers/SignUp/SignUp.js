import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Formik } from 'formik';
import { Grid, Typography, TextField, Card, CardContent, CardActions, Button, Snackbar, CircularProgress } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import useStyles from "./styles";
import * as Yup from 'yup';
import { Auth } from 'aws-amplify';

function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SignUp = () => {

        const [openModal, setModal] = useState({
                open: false,
                vertical: 'top',
                horizontal: 'center',
        });
        const [userValues, setValues] = useState({
                redirect: false,
                loading: false,
                error: false,
                errMessage: '',
                email: ''
        })
        const { vertical, horizontal, open } = openModal;
        var classes = useStyles();
        const phoneRegExp = /^[+]*((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

        const handleClose = () => {
                setModal({ ...openModal, open: false });
                setValues({ ...userValues, redirect: true });
        };

        return (
                <>
                        <h1>Register Here</h1>
                        <Formik
                                initialValues={{
                                        firstName: '', lastName: '', phone: '', email: '', password: ''
                                }}
                                validationSchema={Yup.object({
                                        firstName: Yup.string()
                                                .min(3, 'Have atleast 3 characters')
                                                .max(50, 'Must be 50 characters or less')
                                                .required('Required'),
                                        lastName: Yup.string()
                                                .max(20, 'Must be 20 characters or less'),
                                        phone: Yup.string()
                                                .matches(phoneRegExp, "Phone number is not valid")
                                                .required("Must enter a phone number"),
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
                                        let { firstName, lastName, phone, email, password } = values;
                                        setValues({ ...userValues, loading: true , errMessage: '', error: false});
                                        Auth.signUp({
                                                username: email,
                                                password,
                                                attributes: {
                                                        email,
                                                        name: `${firstName} ${lastName}`,
                                                        phone_number: phone
                                                }
                                        })
                                                .then(() => {
                                                        setValues({ ...userValues, email: email, loading: false });
                                                        setModal({ ...openModal, open: true });
                                                })
                                                .catch(err => {
                                                        setValues({ ...userValues, loading: false, error: true, errMessage: err.message });
                                                });

                                }}
                        >
                                {formik => (
                                        <Grid container direction="column" justify="space-between" alignItems="center">
                                                <Card className={classes.card}>
                                                        <form onSubmit={formik.handleSubmit}>
                                                                {userValues.error && <div className={classes.error}>
                                                                        {userValues.errMessage}</div>}
                                                                <CardContent className={classes.content}>
                                                                        <Typography variant="h6" color="primary">First Name</Typography>
                                                                        <TextField
                                                                                className={classes.formInput}
                                                                                id="firstName"
                                                                                variant="outlined"
                                                                                {...formik.getFieldProps('firstName')}
                                                                                InputProps={{
                                                                                        className: classes.input
                                                                                }}
                                                                                autoComplete="off"
                                                                        />
                                                                        {formik.touched.firstName && formik.errors.firstName ? (
                                                                                <div className={classes.error}>{formik.errors.firstName}</div>
                                                                        ) : null}
                                                                        <Typography variant="h6" color="primary">Last Name</Typography>
                                                                        <TextField
                                                                                className={classes.formInput}
                                                                                id="lastName"
                                                                                variant="outlined"
                                                                                {...formik.getFieldProps('lastName')}
                                                                                InputProps={{
                                                                                        className: classes.input
                                                                                }}
                                                                                autoComplete="off" />
                                                                        {formik.errors.lastName ? (
                                                                                <div className={classes.error}>{formik.errors.lastName}</div>
                                                                        ) : null}
                                                                        <Typography variant="h6" color="primary">Phone</Typography>
                                                                        <TextField
                                                                                className={classes.formInput}
                                                                                id="phone"
                                                                                variant="outlined"
                                                                                {...formik.getFieldProps('phone')}
                                                                                InputProps={{
                                                                                        className: classes.input
                                                                                }}
                                                                                pattern="[0-9]*"
                                                                                autoComplete="off"
                                                                                helperText="Example format, +917009876567"
                                                                        />
                                                                        {formik.touched.phone && formik.errors.phone ? (
                                                                                <div className={classes.error}>{formik.errors.phone}</div>
                                                                        ) : null}
                                                                        <Typography variant="h6" color="primary">Email</Typography>
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
                                                                        {formik.touched.password && formik.errors.password ? (
                                                                                <div className={classes.error}>{formik.errors.password}</div>
                                                                        ) : null}
                                                                </CardContent>
                                                                <CardActions className={classes.footer}>
                                                                        <Button variant="outlined" type="submit" size="large" color="secondary"  > {userValues.loading ? <CircularProgress color="secondary" /> : 'Register'}</Button>

                                                                </CardActions>
                                                        </form>
                                                </Card>
                                                <Typography variant="h6" color="initial"> <Link to="/login" style={{ textDecoration: 'none' }}>Sign In to your account here! </Link></Typography>
                                               
                                                <Snackbar
                                                        anchorOrigin={{ vertical, horizontal }}
                                                        open={open}
                                                        onClose={handleClose}
                                                        key={vertical + horizontal}
                                                >
                                                        <Alert onClose={handleClose} severity="success">
                                                                User Registered Successfully!
                                                        </Alert>
                                                </Snackbar>
                                                {userValues.error && <Alert severity="error">Oops! Something went wrong.</Alert>}
                                                {userValues.redirect && (
                                                        <Redirect
                                                                to={{
                                                                        pathname: '/verify-code',
                                                                        search: `?email=${userValues.email}`
                                                                }}
                                                        />
                                                )}
                                        </Grid>

                                )}
                        </Formik>
                </>

        );

}

export default SignUp;
