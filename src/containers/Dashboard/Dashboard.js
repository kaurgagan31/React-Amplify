import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Typography, Card, CardContent, AppBar, Toolbar } from '@material-ui/core';
import useStyles from "./styles";
import { Auth } from 'aws-amplify';

const Dashboard = () => {

        const [redirect, setRedirect] = useState(false);
        var classes = useStyles();
        /**Function to logout  */
        const logout = () => {
                try {
                        Auth.signOut({ global: true }).then(() => {
                                localStorage.removeItem('userToken');
                                setRedirect(true);
                        });
                } catch (err) {

                }
        }

        return (
                <div>
                        <AppBar position="static" >
                                <Toolbar variant="dense" className={classes.toolbar}>
                                        <Typography variant="h6" color="inherit">
                                                Dashboard
                                        </Typography>
                                        <Typography variant="h6" color="inherit" className={classes.logout} onClick={logout}>
                                                Logout
                                        </Typography>
                                </Toolbar>
                        </AppBar>
                        <Card className={classes.card}>
                                <CardContent>
                                        <Typography variant="h2" color="secondary">Welcome to Home</Typography>
                                </CardContent>
                        </Card>
                        {redirect && <Redirect to={{ pathname: '/login' }} />}
                </div>
        )
}

export default Dashboard;

