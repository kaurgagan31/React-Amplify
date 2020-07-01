import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import useStyles from "./styles";
const Footer = () => {

        var classes = useStyles();
        return (
                <>
                        <Grid container direction="column" justify="space-between" alignItems="center">
                                <Typography color="primary" className={classes.copyright}>
                                        © 2020 Gaganjot Kaur, All rights reserved.
                                </Typography>
                        </Grid>
                </>
        )
}

export default Footer;